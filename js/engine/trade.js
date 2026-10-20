/**
 * 7 Wonders - Resource & Trade Solver
 * Accurately calculates resource satisfaction, flexible slash allocation,
 * and optimal (cheapest) neighbor trading costs according to official rules.
 */

export class TradeSolver {
  /**
   * Checks if player can build a card and finds the cheapest trade combination.
   * @param {Object} player Active player
   * @param {Object} card Target card
   * @param {Object} leftNeighbor Left neighbor player
   * @param {Object} rightNeighbor Right neighbor player
   * @returns {Object} Resolution details
   */
  static evaluateCardBuild(player, card, leftNeighbor = null, rightNeighbor = null) {
    // 1. Duplicate check: cannot build card with identical name
    const alreadyBuilt = (player.city || []).some(c => c.name === card.name);
    if (alreadyBuilt) {
      return {
        canBuild: false,
        reason: 'duplicate',
        message: `Already constructed ${card.name} in your city.`
      };
    }

    // 2. Olympia Side A free build perk check
    if (player.hasFreeBuildAvailable) {
      return {
        canBuild: true,
        isFreeOlympia: true,
        coinCost: 0,
        tradeCost: 0,
        totalCoinsNeeded: 0,
        bestTrade: { leftCost: 0, rightCost: 0, totalCost: 0, leftPurchases: {}, rightPurchases: {} },
        selfSufficient: true
      };
    }

    // 3. Free chaining check
    if (card.freeWith && card.freeWith.length > 0) {
      const match = (player.city || []).find(c => card.freeWith.includes(c.name));
      if (match) {
        return {
          canBuild: true,
          isFreeChain: true,
          chainSource: match.name,
          coinCost: 0,
          tradeCost: 0,
          totalCoinsNeeded: 0,
          bestTrade: { leftCost: 0, rightCost: 0, totalCost: 0, leftPurchases: {}, rightPurchases: {} },
          selfSufficient: true
        };
      }
    }

    // 4. Resource / Coin evaluation
    const directCoinCost = card.cost?.coins || 0;
    if (player.coins < directCoinCost) {
      return {
        canBuild: false,
        reason: 'insufficient_coins',
        message: `Requires ${directCoinCost} coins (you have ${player.coins}).`
      };
    }

    const resourceCost = { ...(card.cost || {}) };
    delete resourceCost.coins;

    const tradeResult = this.solveRequirements(player, resourceCost, leftNeighbor, rightNeighbor);

    if (!tradeResult.achievable) {
      return {
        canBuild: false,
        reason: 'insufficient_resources',
        message: 'Missing required resources or neighbors do not produce them.',
        missing: tradeResult.missing
      };
    }

    const totalCoinsNeeded = directCoinCost + tradeResult.cheapestTrade.totalCost;
    if (player.coins < totalCoinsNeeded) {
      return {
        canBuild: false,
        reason: 'cannot_afford_trade',
        message: `Trade requires ${tradeResult.cheapestTrade.totalCost} coins (plus ${directCoinCost} direct cost), but you have ${player.coins} coins.`,
        tradeCost: tradeResult.cheapestTrade.totalCost,
        totalCoinsNeeded
      };
    }

    return {
      canBuild: true,
      isFreeChain: false,
      coinCost: directCoinCost,
      tradeCost: tradeResult.cheapestTrade.totalCost,
      totalCoinsNeeded,
      bestTrade: tradeResult.cheapestTrade,
      selfSufficient: tradeResult.cheapestTrade.totalCost === 0
    };
  }

  /**
   * Checks if player can construct next stage of wonder.
   */
  static evaluateWonderStage(player, leftNeighbor = null, rightNeighbor = null) {
    const stages = player.wonderBoard?.stages || [];
    const nextStageIdx = player.wonderStagesBuilt || 0;

    if (nextStageIdx >= stages.length) {
      return {
        canBuild: false,
        reason: 'wonder_completed',
        message: 'All wonder stages have already been built.'
      };
    }

    const stage = stages[nextStageIdx];
    const resourceCost = { ...(stage.cost || {}) };
    const directCoinCost = resourceCost.coins || 0;
    delete resourceCost.coins;

    const tradeResult = this.solveRequirements(player, resourceCost, leftNeighbor, rightNeighbor);

    if (!tradeResult.achievable) {
      return {
        canBuild: false,
        stageNumber: nextStageIdx + 1,
        stageSpec: stage,
        reason: 'insufficient_resources',
        missing: tradeResult.missing
      };
    }

    const totalCoinsNeeded = directCoinCost + tradeResult.cheapestTrade.totalCost;
    if (player.coins < totalCoinsNeeded) {
      return {
        canBuild: false,
        stageNumber: nextStageIdx + 1,
        stageSpec: stage,
        reason: 'cannot_afford_trade',
        tradeCost: tradeResult.cheapestTrade.totalCost,
        totalCoinsNeeded
      };
    }

    return {
      canBuild: true,
      stageNumber: nextStageIdx + 1,
      stageSpec: stage,
      tradeCost: tradeResult.cheapestTrade.totalCost,
      totalCoinsNeeded,
      bestTrade: tradeResult.cheapestTrade,
      selfSufficient: tradeResult.cheapestTrade.totalCost === 0
    };
  }

  /**
   * Core algorithm: Solves for player's flexible slash resources + neighbor trade.
   */
  static solveRequirements(player, requiredResources, leftNeighbor, rightNeighbor) {
    const rawTypes = ['wood', 'stone', 'ore', 'clay'];
    const goodsTypes = ['glass', 'loom', 'papyrus'];

    // 1. Collect player's fixed production
    const ownFixed = { wood: 0, stone: 0, ore: 0, clay: 0, glass: 0, loom: 0, papyrus: 0 };

    // Base wonder resource
    if (player.wonderBoard?.resource) {
      ownFixed[player.wonderBoard.resource] = (ownFixed[player.wonderBoard.resource] || 0) + 1;
    }

    // Built fixed cards
    (player.city || []).forEach(card => {
      if (card.benefit?.produces) {
        card.benefit.produces.forEach(res => {
          ownFixed[res] = (ownFixed[res] || 0) + 1;
        });
      }
    });

    // 2. Collect player's flexible slash production (e.g. Caravansery, Forum, Alexandria wonder)
    const ownSlashes = [];
    (player.city || []).forEach(card => {
      if (card.benefit?.producesSlash) {
        ownSlashes.push([...card.benefit.producesSlash]);
      }
    });

    // Alexandria wonder stages slash benefits
    if (player.wonderBoard?.id === 'alexandria') {
      const built = player.wonderStagesBuilt || 0;
      for (let i = 0; i < built; i++) {
        const stage = player.wonderBoard.stages[i];
        if (stage?.reward?.raw_wild) {
          ownSlashes.push([...rawTypes]);
        }
        if (stage?.reward?.goods_wild) {
          ownSlashes.push([...goodsTypes]);
        }
      }
    }

    // 3. Collect neighbor fixed production available for trade
    const leftTradeAvailable = this.getNeighborTradeProduction(leftNeighbor);
    const rightTradeAvailable = this.getNeighborTradeProduction(rightNeighbor);

    // 4. Trade discount rates for player
    const discounts = this.getPlayerTradeDiscounts(player);

    // 5. Calculate deficit after fixed resources
    const needed = {};
    for (const [res, count] of Object.entries(requiredResources)) {
      if (count > 0) {
        needed[res] = Math.max(0, count - (ownFixed[res] || 0));
      }
    }

    // Check if fully satisfied by fixed resources alone
    const remainingDeficit = Object.values(needed).reduce((sum, n) => sum + n, 0);
    if (remainingDeficit === 0) {
      return {
        achievable: true,
        cheapestTrade: { leftCost: 0, rightCost: 0, totalCost: 0, leftPurchases: {}, rightPurchases: {} }
      };
    }

    // 6. Branch and bound to allocate player's slashes first, then purchase remaining from neighbors
    const validTrades = [];

    const recurseSlash = (slashIndex, currentNeeded) => {
      const currentSum = Object.values(currentNeeded).reduce((a, b) => a + b, 0);
      if (currentSum === 0) {
        // Satisfied completely with slashes!
        validTrades.push({ leftCost: 0, rightCost: 0, totalCost: 0, leftPurchases: {}, rightPurchases: {} });
        return;
      }

      if (slashIndex >= ownSlashes.length) {
        // All slashes used, now must solve remaining deficit via neighbor trade
        const tradeOption = this.solveNeighborPurchases(currentNeeded, leftTradeAvailable, rightTradeAvailable, discounts);
        if (tradeOption.achievable) {
          validTrades.push(tradeOption.trade);
        }
        return;
      }

      const options = ownSlashes[slashIndex];
      // Try assigning this slash to any resource that is currently needed
      let matchedAny = false;
      for (const res of options) {
        if ((currentNeeded[res] || 0) > 0) {
          matchedAny = true;
          const nextNeeded = { ...currentNeeded, [res]: currentNeeded[res] - 1 };
          recurseSlash(slashIndex + 1, nextNeeded);
        }
      }

      // Also try not assigning this slash (or assigning to something not in needed) if needed is not matched
      if (!matchedAny) {
        recurseSlash(slashIndex + 1, currentNeeded);
      }
    };

    recurseSlash(0, needed);

    if (validTrades.length === 0) {
      return {
        achievable: false,
        missing: needed
      };
    }

    // Sort to find cheapest trade
    validTrades.sort((a, b) => a.totalCost - b.totalCost);

    return {
      achievable: true,
      cheapestTrade: validTrades[0]
    };
  }

  /**
   * Finds optimal purchase combination from left and right neighbors for remaining deficit.
   */
  static solveNeighborPurchases(needed, leftAvail, rightAvail, discounts) {
    const rawTypes = ['wood', 'stone', 'ore', 'clay'];
    let leftCost = 0;
    let rightCost = 0;
    const leftPurchases = {};
    const rightPurchases = {};

    const currentLeftAvail = { ...leftAvail };
    const currentRightAvail = { ...rightAvail };

    for (const [res, count] of Object.entries(needed)) {
      if (count <= 0) continue;

      for (let i = 0; i < count; i++) {
        const isRaw = rawTypes.includes(res);
        const lAvail = currentLeftAvail[res] || 0;
        const rAvail = currentRightAvail[res] || 0;

        if (lAvail <= 0 && rAvail <= 0) {
          // Cannot purchase this resource from either neighbor!
          return { achievable: false };
        }

        // Determine cost to buy from left vs right
        let lPrice = 2;
        let rPrice = 2;

        if (isRaw) {
          if (discounts.leftRaw) lPrice = 1;
          if (discounts.rightRaw) rPrice = 1;
        } else {
          if (discounts.bothGoods) {
            lPrice = 1;
            rPrice = 1;
          }
        }

        // Pick neighbor with cheaper price, or whichever has stock
        if (lAvail > 0 && rAvail > 0) {
          if (lPrice <= rPrice) {
            currentLeftAvail[res]--;
            leftCost += lPrice;
            leftPurchases[res] = (leftPurchases[res] || 0) + 1;
          } else {
            currentRightAvail[res]--;
            rightCost += rPrice;
            rightPurchases[res] = (rightPurchases[res] || 0) + 1;
          }
        } else if (lAvail > 0) {
          currentLeftAvail[res]--;
          leftCost += lPrice;
          leftPurchases[res] = (leftPurchases[res] || 0) + 1;
        } else if (rAvail > 0) {
          currentRightAvail[res]--;
          rightCost += rPrice;
          rightPurchases[res] = (rightPurchases[res] || 0) + 1;
        }
      }
    }

    return {
      achievable: true,
      trade: {
        leftCost,
        rightCost,
        totalCost: leftCost + rightCost,
        leftPurchases,
        rightPurchases
      }
    };
  }

  /**
   * Only fixed brown and gray cards + wonder base can be traded by neighbors.
   */
  static getNeighborTradeProduction(neighbor) {
    const prod = { wood: 0, stone: 0, ore: 0, clay: 0, glass: 0, loom: 0, papyrus: 0 };
    if (!neighbor) return prod;

    // Wonder base resource
    if (neighbor.wonderBoard?.resource) {
      prod[neighbor.wonderBoard.resource] = (prod[neighbor.wonderBoard.resource] || 0) + 1;
    }

    // Built fixed brown and gray cards
    (neighbor.city || []).forEach(card => {
      if ((card.type === 'brown' || card.type === 'gray') && card.benefit?.produces) {
        card.benefit.produces.forEach(res => {
          prod[res] = (prod[res] || 0) + 1;
        });
      }
    });

    return prod;
  }

  static getPlayerTradeDiscounts(player) {
    const discounts = {
      leftRaw: false,
      rightRaw: false,
      bothGoods: false
    };

    (player.city || []).forEach(card => {
      if (card.benefit?.tradeDiscount === 'left_raw') discounts.leftRaw = true;
      if (card.benefit?.tradeDiscount === 'right_raw') discounts.rightRaw = true;
      if (card.benefit?.tradeDiscount === 'both_goods') discounts.bothGoods = true;
    });

    return discounts;
  }
}
