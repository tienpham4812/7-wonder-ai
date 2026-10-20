/**
 * 7 Wonders - Scoring Engine
 * Computes official game scoring across all 7 categories:
 * 1. Military Victory Points
 * 2. Treasury Coins (1 VP per 3 coins)
 * 3. Wonder Stages VP
 * 4. Civilian Structures (Blue)
 * 5. Scientific Structures (Green) - with optimal wild science solver
 * 6. Commercial Structures (Yellow)
 * 7. Guilds (Purple)
 */

export class ScoringEngine {
  /**
   * Computes the full score breakdown for a player.
   * @param {Object} player The player state
   * @param {Object} leftNeighbor The left neighbor player state
   * @param {Object} rightNeighbor The right neighbor player state
   * @returns {Object} Score breakdown and total VP
   */
  static calculateScore(player, leftNeighbor = null, rightNeighbor = null) {
    const military = this.calculateMilitary(player);
    const treasury = this.calculateTreasury(player);
    const wonder = this.calculateWonder(player);
    const civilian = this.calculateCivilian(player);
    const science = this.calculateScience(player);
    const commercial = this.calculateCommercial(player);
    const guilds = this.calculateGuilds(player, leftNeighbor, rightNeighbor);

    const total = military.vp + treasury.vp + wonder.vp + civilian.vp + science.vp + commercial.vp + guilds.vp;

    return {
      playerId: player.id,
      playerName: player.name,
      military,
      treasury,
      wonder,
      civilian,
      science,
      commercial,
      guilds,
      total,
      coins: player.coins || 0
    };
  }

  static calculateMilitary(player) {
    const wins = player.militaryTokens?.wins || [];
    const defeats = player.militaryTokens?.defeats || 0;
    const winPoints = wins.reduce((sum, token) => sum + token, 0);
    const lossPoints = defeats * -1;
    const vp = winPoints + lossPoints;

    return {
      vp,
      winsCount: wins.length,
      winPoints,
      defeatsCount: defeats,
      lossPoints
    };
  }

  static calculateTreasury(player) {
    const coins = player.coins || 0;
    const vp = Math.floor(coins / 3);
    return {
      vp,
      coins,
      remainder: coins % 3
    };
  }

  static calculateWonder(player) {
    let vp = 0;
    const stages = player.wonderBoard?.stages || [];
    const builtCount = player.wonderStagesBuilt || 0;

    for (let i = 0; i < builtCount; i++) {
      const stage = stages[i];
      if (stage?.reward?.vp) {
        vp += stage.reward.vp;
      }
    }

    return {
      vp,
      stagesBuilt: builtCount,
      totalStages: stages.length
    };
  }

  static calculateCivilian(player) {
    const blueCards = (player.city || []).filter(c => c.type === 'blue');
    const vp = blueCards.reduce((sum, c) => sum + (c.benefit?.vp || 0), 0);
    return {
      vp,
      cardsCount: blueCards.length
    };
  }

  /**
   * Calculates science score with exact optimal assignment for any wild science symbols.
   */
  static calculateScience(player) {
    const greenCards = (player.city || []).filter(c => c.type === 'green');
    let compass = 0;
    let gear = 0;
    let tablet = 0;

    greenCards.forEach(c => {
      const sym = c.benefit?.symbol;
      if (sym === 'compass') compass++;
      else if (sym === 'gear') gear++;
      else if (sym === 'tablet') tablet++;
    });

    // Check for wild science from wonder or guild cards
    let wildCount = 0;

    // Babylon Wonder wild science
    if (player.wonderBoard?.id === 'babylon') {
      const builtCount = player.wonderStagesBuilt || 0;
      for (let i = 0; i < builtCount; i++) {
        if (player.wonderBoard.stages[i]?.reward?.science_wild) {
          wildCount += player.wonderBoard.stages[i].reward.science_wild;
        }
      }
    }

    // Scientists Guild wild science
    const purpleCards = (player.city || []).filter(c => c.type === 'purple');
    purpleCards.forEach(c => {
      if (c.benefit?.science_wild) {
        wildCount += c.benefit.science_wild;
      }
    });

    // Find best combination of wild assignments
    const best = this.findOptimalScience(compass, gear, tablet, wildCount);

    return {
      vp: best.vp,
      compass: best.compass,
      gear: best.gear,
      tablet: best.tablet,
      completeSets: best.sets,
      setsPoints: best.sets * 7,
      squaredPoints: best.squared,
      wildAssigned: wildCount
    };
  }

  static findOptimalScience(c, g, t, wild) {
    let bestScore = -1;
    let bestResult = { compass: c, gear: g, tablet: t, sets: 0, squared: 0, vp: 0 };

    // Generate all splits of `wild` among 3 symbols
    for (let wc = 0; wc <= wild; wc++) {
      for (let wg = 0; wg <= wild - wc; wg++) {
        const wt = wild - wc - wg;
        const totalC = c + wc;
        const totalG = g + wg;
        const totalT = t + wt;

        const sets = Math.min(totalC, totalG, totalT);
        const squared = (totalC * totalC) + (totalG * totalG) + (totalT * totalT);
        const vp = squared + (sets * 7);

        if (vp > bestScore) {
          bestScore = vp;
          bestResult = {
            compass: totalC,
            gear: totalG,
            tablet: totalT,
            sets,
            squared,
            vp
          };
        }
      }
    }

    return bestResult;
  }

  static calculateCommercial(player) {
    let vp = 0;
    const yellowCards = (player.city || []).filter(c => c.type === 'yellow');
    const city = player.city || [];

    yellowCards.forEach(card => {
      const b = card.benefit;
      if (!b) return;

      // Haven: 1 VP per brown card
      if (b.coinsPerOwnCard?.type === 'brown') {
        const brownCount = city.filter(c => c.type === 'brown').length;
        vp += brownCount * (b.coinsPerOwnCard.vp || 0);
      }
      // Lighthouse: 1 VP per yellow card
      if (b.coinsPerOwnCard?.type === 'yellow') {
        const yellowCount = city.filter(c => c.type === 'yellow').length;
        vp += yellowCount * (b.coinsPerOwnCard.vp || 0);
      }
      // Chamber of Commerce: 2 VP per gray card
      if (b.coinsPerOwnCard?.type === 'gray') {
        const grayCount = city.filter(c => c.type === 'gray').length;
        vp += grayCount * (b.coinsPerOwnCard.vp || 0);
      }
      // Arena: 1 VP per built wonder stage
      if (b.coinsPerWonderStage) {
        const stagesBuilt = player.wonderStagesBuilt || 0;
        vp += stagesBuilt * (b.coinsPerWonderStage.vp || 0);
      }
    });

    return {
      vp,
      cardsCount: yellowCards.length
    };
  }

  static calculateGuilds(player, leftNeighbor, rightNeighbor) {
    let vp = 0;
    const purpleCards = (player.city || []).filter(c => c.type === 'purple');
    const leftCity = leftNeighbor?.city || [];
    const rightCity = rightNeighbor?.city || [];
    const ownCity = player.city || [];

    const evaluateGuild = (card) => {
      const b = card.benefit;
      if (!b) return 0;
      let cardVp = 0;

      // Cards per neighbor structure color
      if (b.vpPerNeighborCard) {
        const targetType = b.vpPerNeighborCard.type;
        const multiplier = b.vpPerNeighborCard.multiplier || 1;
        const leftMatch = leftCity.filter(c => c.type === targetType).length;
        const rightMatch = rightCity.filter(c => c.type === targetType).length;
        cardVp += (leftMatch + rightMatch) * multiplier;
      }

      // Defeat tokens in neighbor cities
      if (b.vpPerNeighborDefeat) {
        const leftDefeats = leftNeighbor?.militaryTokens?.defeats || 0;
        const rightDefeats = rightNeighbor?.militaryTokens?.defeats || 0;
        cardVp += (leftDefeats + rightDefeats) * b.vpPerNeighborDefeat;
      }

      // Own card types (Shipowners Guild: brown, gray, purple)
      if (b.vpPerOwnCardTypes) {
        const types = b.vpPerOwnCardTypes.types || [];
        const multiplier = b.vpPerOwnCardTypes.multiplier || 1;
        const count = ownCity.filter(c => types.includes(c.type)).length;
        cardVp += count * multiplier;
      }

      // Wonder stages in own and neighbor cities (Builders Guild)
      if (b.vpPerWonderStages) {
        const ownStages = player.wonderStagesBuilt || 0;
        const leftStages = leftNeighbor?.wonderStagesBuilt || 0;
        const rightStages = rightNeighbor?.wonderStagesBuilt || 0;
        const multiplier = b.vpPerWonderStages.multiplier || 1;
        cardVp += (ownStages + leftStages + rightStages) * multiplier;
      }

      return cardVp;
    };

    purpleCards.forEach(card => {
      vp += evaluateGuild(card);
    });

    // Olympia Side B copy guild ability check
    if (player.wonderBoard?.side === 'B' && player.wonderStagesBuilt >= 3) {
      const neighborGuilds = [
        ...(leftCity.filter(c => c.type === 'purple')),
        ...(rightCity.filter(c => c.type === 'purple'))
      ];
      let maxCopiedVp = 0;
      neighborGuilds.forEach(g => {
        const copyVal = evaluateGuild(g);
        if (copyVal > maxCopiedVp) maxCopiedVp = copyVal;
      });
      vp += maxCopiedVp;
    }

    return {
      vp,
      cardsCount: purpleCards.length
    };
  }
}
