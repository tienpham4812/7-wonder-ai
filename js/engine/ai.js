/**
 * 7 Wonders - AI Decision Engine
 * Evaluates hand options, bot personality weights, military competition,
 * science synergy, economic engines, and tactical hate-drafting.
 */

import { TradeSolver } from './trade.js';
import { ScoringEngine } from './scoring.js';

export class AIEngine {
  /**
   * Chooses the optimal turn action for an AI bot.
   * @param {Object} bot AI player state
   * @param {Array} hand Current card hand
   * @param {Object} leftNeighbor Left neighbor
   * @param {Object} rightNeighbor Right neighbor
   * @param {number} currentAge Current age (1, 2, or 3)
   * @param {number} currentTurn Current turn (1 to 6)
   * @returns {Object} Action choice { action: 'build'|'wonder'|'discard', card, trade, reason }
   */
  static chooseAction(bot, hand, leftNeighbor, rightNeighbor, currentAge, currentTurn) {
    const weights = bot.personality?.weights || {
      military: 1.2,
      science: 1.2,
      civilian: 1.2,
      commercial: 1.2,
      guilds: 1.5,
      wonder: 1.3,
      resources: 1.4
    };

    const evaluatedActions = [];

    // Evaluate Wonder Stage option once
    const wonderEval = TradeSolver.evaluateWonderStage(bot, leftNeighbor, rightNeighbor);
    let wonderStageUtility = -999;
    if (wonderEval.canBuild) {
      wonderStageUtility = this.evaluateWonderStageBenefit(bot, wonderEval.stageSpec, wonderEval.tradeCost, weights, currentAge);
    }

    // Evaluate each card in hand
    hand.forEach(card => {
      // 1. Evaluate Direct Build
      const buildEval = TradeSolver.evaluateCardBuild(bot, card, leftNeighbor, rightNeighbor);
      if (buildEval.canBuild) {
        const buildUtility = this.evaluateCardValue(bot, card, buildEval, leftNeighbor, rightNeighbor, currentAge, weights);
        evaluatedActions.push({
          action: 'build',
          card,
          trade: buildEval.bestTrade,
          tradeCost: buildEval.tradeCost,
          isFreeChain: buildEval.isFreeChain,
          utility: buildUtility,
          summary: `Build ${card.name}`
        });
      }

      // 2. Evaluate Wonder Construction using this card as foundation
      if (wonderEval.canBuild) {
        // We slightly discount discarding a useful card to wonder
        const sacrificePenalty = (card.type === 'green' || card.type === 'purple') ? 1.5 : 0;
        evaluatedActions.push({
          action: 'wonder',
          card,
          stageNumber: wonderEval.stageNumber,
          trade: wonderEval.bestTrade,
          tradeCost: wonderEval.tradeCost,
          utility: wonderStageUtility - sacrificePenalty,
          summary: `Construct Wonder Stage ${wonderEval.stageNumber} with ${card.name}`
        });
      }

      // 3. Evaluate Discard for 3 Coins
      const hateDraftScore = this.evaluateHateDraftValue(card, bot, leftNeighbor, rightNeighbor, currentAge);
      const coinNeedBonus = bot.coins < 2 ? 3.0 : (bot.coins < 4 ? 1.2 : 0.5);
      const discardUtility = 1.0 + coinNeedBonus + hateDraftScore;

      evaluatedActions.push({
        action: 'discard',
        card,
        trade: null,
        tradeCost: 0,
        utility: discardUtility,
        summary: `Discard ${card.name} for 3 coins`
      });
    });

    // Sort by highest utility
    evaluatedActions.sort((a, b) => b.utility - a.utility);

    // Pick top decision
    const chosen = evaluatedActions[0] || {
      action: 'discard',
      card: hand[0],
      trade: null,
      tradeCost: 0,
      utility: 0,
      summary: `Discard ${hand[0]?.name || 'card'} for 3 coins`
    };

    return chosen;
  }

  /**
   * Computes strategic utility of building a specific card.
   */
  static evaluateCardValue(bot, card, buildEval, leftNeighbor, rightNeighbor, currentAge, weights) {
    let utility = 0;

    // Penalty for coin expenditure on trade
    const coinCost = (buildEval.coinCost || 0) + (buildEval.tradeCost || 0);
    utility -= coinCost * 0.75;

    // Bonus for free chaining
    if (buildEval.isFreeChain) {
      utility += 1.2;
    }

    switch (card.type) {
      case 'brown':
      case 'gray': {
        // High utility in Age 1, moderate in Age 2, very low in Age 3
        const ageMultiplier = currentAge === 1 ? 2.5 : (currentAge === 2 ? 1.0 : 0.2);
        const resourceWeight = weights.resources || 1.3;
        const producesCount = card.benefit?.produces?.length || (card.benefit?.producesSlash ? 1.3 : 1);
        utility += producesCount * 2.2 * ageMultiplier * resourceWeight;
        break;
      }

      case 'red': {
        const shields = card.benefit?.shields || 1;
        const currentShields = this.countShields(bot);
        const leftShields = this.countShields(leftNeighbor);
        const rightShields = this.countShields(rightNeighbor);

        // Win tokens: Age 1 = +1, Age 2 = +3, Age 3 = +5
        const ageWinVp = currentAge === 1 ? 2 : (currentAge === 2 ? 4 : 6);
        let contestValue = 0;

        // Will these shields turn a defeat into a tie or victory?
        if (currentShields <= leftShields && currentShields + shields > leftShields) {
          contestValue += ageWinVp;
        }
        if (currentShields <= rightShields && currentShields + shields > rightShields) {
          contestValue += ageWinVp;
        }

        // General military deterrence
        utility += (shields * 2.0 + contestValue) * (weights.military || 1.2);
        break;
      }

      case 'green': {
        // Science delta calculation
        const currentScience = ScoringEngine.calculateScience(bot).vp;
        const simBot = {
          ...bot,
          city: [...(bot.city || []), card]
        };
        const nextScience = ScoringEngine.calculateScience(simBot).vp;
        const scienceDelta = nextScience - currentScience;

        utility += scienceDelta * 1.5 * (weights.science || 1.2);
        break;
      }

      case 'blue': {
        const vp = card.benefit?.vp || 0;
        utility += vp * 1.3 * (weights.civilian || 1.2);
        break;
      }

      case 'yellow': {
        const b = card.benefit;
        let commScore = 0;

        if (b?.coins) commScore += b.coins * 0.8;
        if (b?.tradeDiscount) commScore += (currentAge === 1 ? 3.0 : 1.5);
        if (b?.producesSlash) commScore += (currentAge === 1 ? 4.0 : 2.5);

        // Cards that pay out based on neighbor or own cards
        if (b?.coinsPerNeighborCard) {
          const lCount = (leftNeighbor?.city || []).filter(c => c.type === b.coinsPerNeighborCard.type).length;
          const rCount = (rightNeighbor?.city || []).filter(c => c.type === b.coinsPerNeighborCard.type).length;
          const ownCount = (bot.city || []).filter(c => c.type === b.coinsPerNeighborCard.type).length;
          const totalCards = lCount + rCount + (b.coinsPerNeighborCard.ownBonus ? ownCount : 0);
          commScore += totalCards * (b.coinsPerNeighborCard.multiplier || 1) * 0.8;
        }

        if (b?.coinsPerOwnCard) {
          const ownCount = (bot.city || []).filter(c => c.type === b.coinsPerOwnCard.type).length;
          commScore += ownCount * (b.coinsPerOwnCard.vp + b.coinsPerOwnCard.coins * 0.5);
        }

        if (b?.coinsPerWonderStage) {
          const built = bot.wonderStagesBuilt || 0;
          commScore += built * (b.coinsPerWonderStage.vp + b.coinsPerWonderStage.coins * 0.5);
        }

        utility += commScore * (weights.commercial || 1.2);
        break;
      }

      case 'purple': {
        const currentGuildVp = ScoringEngine.calculateGuilds(bot, leftNeighbor, rightNeighbor).vp;
        const simBot = {
          ...bot,
          city: [...(bot.city || []), card]
        };
        const nextGuildVp = ScoringEngine.calculateGuilds(simBot, leftNeighbor, rightNeighbor).vp;
        const guildDelta = nextGuildVp - currentGuildVp;

        utility += guildDelta * 1.6 * (weights.guilds || 1.4);
        break;
      }
    }

    return utility;
  }

  static evaluateWonderStageBenefit(bot, stageSpec, tradeCost, weights, currentAge) {
    let utility = 0;
    utility -= tradeCost * 0.75;

    const reward = stageSpec?.reward;
    if (reward) {
      if (reward.vp) utility += reward.vp * 1.4;
      if (reward.shields) utility += reward.shields * 3.0 * (weights.military || 1.2);
      if (reward.coins) utility += reward.coins * 0.7;
      if (reward.science_wild) utility += 5.0 * (weights.science || 1.2);
      if (reward.raw_wild || reward.goods_wild) utility += (currentAge === 1 ? 4.5 : 2.5);
      if (reward.free_build_per_age) utility += 4.0;
      if (reward.resurrect_discard) utility += 3.5;
    }

    return utility * (weights.wonder || 1.3);
  }

  static evaluateHateDraftValue(card, bot, leftNeighbor, rightNeighbor, currentAge) {
    if (currentAge !== 3) return 0; // Hate drafting is most meaningful in Age 3

    const hateDraftRate = bot.personality?.hateDraftRate || 0.5;
    let denialValue = 0;

    // Check if neighbor is heavily into science and this card would give them huge points
    [leftNeighbor, rightNeighbor].forEach(neighbor => {
      if (!neighbor) return;
      if (card.type === 'green') {
        const nScore = ScoringEngine.calculateScience(neighbor).vp;
        const simNeighbor = { ...neighbor, city: [...(neighbor.city || []), card] };
        const simScore = ScoringEngine.calculateScience(simNeighbor).vp;
        const potentialGain = simScore - nScore;
        if (potentialGain >= 7) {
          denialValue += potentialGain * 0.6;
        }
      }
    });

    return denialValue * hateDraftRate;
  }

  static countShields(player) {
    if (!player) return 0;
    let shields = 0;
    (player.city || []).forEach(c => {
      if (c.benefit?.shields) shields += c.benefit.shields;
    });

    // Wonder shields
    const stages = player.wonderBoard?.stages || [];
    const built = player.wonderStagesBuilt || 0;
    for (let i = 0; i < built; i++) {
      if (stages[i]?.reward?.shields) {
        shields += stages[i].reward.shields;
      }
    }

    return shields;
  }
}
