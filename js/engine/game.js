/**
 * 7 Wonders - Core Game Engine
 * Manages ages, rounds, simultaneous draft phases, neighbor trading,
 * military conflicts, wonder progression, and game completion.
 */

import { WONDERS } from '../data/wonders.js';
import { CARDS, GUILD_CARDS } from '../data/cards.js';
import { AI_PERSONALITIES } from '../data/personalities.js';
import { TradeSolver } from './trade.js';
import { AIEngine } from './ai.js';
import { ScoringEngine } from './scoring.js';

export class GameEngine {
  constructor(options = {}) {
    this.playerCount = options.playerCount || 4;
    this.humanWonderId = options.humanWonderId || 'rhodes';
    this.wonderSide = options.wonderSide || 'A';
    this.humanPlayerName = options.humanPlayerName || 'You';
    this.aiSpeed = options.aiSpeed || 'normal'; // 'fast' | 'normal' | 'step'

    this.currentAge = 1;
    this.currentTurn = 1;
    this.state = 'INITIAL'; // 'SETUP' | 'DRAFT' | 'RESOLVING' | 'MILITARY' | 'FINISHED'
    this.players = [];
    this.hands = [];
    this.discardPile = [];
    this.militaryHistory = [];
    this.gameLog = [];
    this.turnDecisions = [];
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  log(msg, type = 'info') {
    const entry = {
      text: msg,
      type,
      age: this.currentAge,
      turn: this.currentTurn,
      timestamp: new Date().toLocaleTimeString()
    };
    this.gameLog.unshift(entry);
    this.emit('log', entry);
  }

  /**
   * Initializes players, wonder boards, and begins Age I.
   */
  startNewGame() {
    this.players = [];
    this.discardPile = [];
    this.militaryHistory = [];
    this.gameLog = [];
    this.currentAge = 1;
    this.currentTurn = 1;

    // Pick wonders
    const wonderKeys = Object.keys(WONDERS);
    let chosenWonders = [this.humanWonderId];
    const availableWonders = wonderKeys.filter(k => k !== this.humanWonderId);
    this.shuffle(availableWonders);

    for (let i = 1; i < this.playerCount; i++) {
      chosenWonders.push(availableWonders[i - 1]);
    }

    // Assign AI personalities
    const shuffledAI = [...AI_PERSONALITIES];
    this.shuffle(shuffledAI);

    for (let i = 0; i < this.playerCount; i++) {
      const wonderKey = chosenWonders[i];
      const wonderDef = WONDERS[wonderKey];
      const stages = this.wonderSide === 'B' ? wonderDef.sideB.stages : wonderDef.sideA.stages;

      const player = {
        id: i === 0 ? 'human' : `ai_${i}`,
        index: i,
        name: i === 0 ? this.humanPlayerName : shuffledAI[i - 1].name,
        isHuman: i === 0,
        personality: i === 0 ? null : shuffledAI[i - 1],
        wonderBoard: {
          id: wonderKey,
          name: wonderDef.name,
          city: wonderDef.city,
          resource: wonderDef.resource,
          image: wonderDef.image,
          side: this.wonderSide,
          stages: stages
        },
        coins: 3, // Each player begins with 3 coins
        city: [],
        wonderStagesBuilt: 0,
        wonderTuckedCards: [],
        militaryTokens: {
          wins: [],
          defeats: 0
        },
        hasFreeBuildAvailable: false
      };

      this.players.push(player);
    }

    this.log(`Game started with ${this.playerCount} players. Welcome to the Ancient World!`, 'system');
    this.startAge(1);
  }

  /**
   * Starts a new Age (deals 7 cards to each player).
   */
  startAge(age) {
    this.currentAge = age;
    this.currentTurn = 1;
    this.state = 'DRAFT';

    // Reset per-age wonder perks if any
    this.players.forEach(p => {
      // Olympia Side A stage 2 allows 1 free build per age
      if (p.wonderBoard?.id === 'olympia' && p.wonderBoard?.side === 'A' && p.wonderStagesBuilt >= 2) {
        p.hasFreeBuildAvailable = true;
      }
    });

    // Build age deck
    const ageCards = CARDS.filter(c => c.age === age && c.minPlayers <= this.playerCount);

    // If Age III, add (playerCount + 2) random Guild cards
    if (age === 3) {
      const guilds = [...GUILD_CARDS];
      this.shuffle(guilds);
      const selectedGuilds = guilds.slice(0, this.playerCount + 2);
      ageCards.push(...selectedGuilds);
    }

    this.shuffle(ageCards);

    // Deal 7 cards to each player
    this.hands = [];
    for (let i = 0; i < this.playerCount; i++) {
      const hand = ageCards.slice(i * 7, (i + 1) * 7);
      this.hands.push(hand);
    }

    this.log(`Beginning Age ${age}. Hands dealt (7 cards each). Draft direction: ${age === 2 ? 'Right (Counter-Clockwise)' : 'Left (Clockwise)'}`, 'system');
    this.emit('ageStarted', { age: this.currentAge });
    this.emit('turnStarted', { turn: this.currentTurn, age: this.currentAge });
  }

  getLeftNeighbor(playerIndex) {
    // Left neighbor is (i - 1 + N) % N in clockwise seating
    const idx = (playerIndex - 1 + this.playerCount) % this.playerCount;
    return this.players[idx];
  }

  getRightNeighbor(playerIndex) {
    // Right neighbor is (i + 1) % N in clockwise seating
    const idx = (playerIndex + 1) % this.playerCount;
    return this.players[idx];
  }

  /**
   * Called when human player submits their decision for the turn.
   * @param {Object} humanChoice { action: 'build'|'wonder'|'discard', cardId, trade }
   */
  submitHumanChoice(humanChoice) {
    if (this.state !== 'DRAFT') return;

    this.turnDecisions = [];

    // Find human's selected card
    const humanHand = this.hands[0];
    const card = humanHand.find(c => c.id === humanChoice.cardId);
    if (!card) {
      console.error('Selected card not in human hand:', humanChoice.cardId);
      return;
    }

    this.turnDecisions[0] = {
      playerIndex: 0,
      player: this.players[0],
      action: humanChoice.action,
      card,
      trade: humanChoice.trade || null,
      useFreeOlympia: !!humanChoice.useFreeOlympia
    };

    // Calculate all AI decisions
    for (let i = 1; i < this.playerCount; i++) {
      const bot = this.players[i];
      const botHand = this.hands[i];
      const leftNeighbor = this.getLeftNeighbor(i);
      const rightNeighbor = this.getRightNeighbor(i);

      const decision = AIEngine.chooseAction(bot, botHand, leftNeighbor, rightNeighbor, this.currentAge, this.currentTurn);
      this.turnDecisions[i] = {
        playerIndex: i,
        player: bot,
        action: decision.action,
        card: decision.card,
        trade: decision.trade || null,
        stageNumber: decision.stageNumber || null
      };
    }

    // Resolve all plays simultaneously
    this.resolveTurn();
  }

  /**
   * Resolves simultaneous actions for all players.
   */
  resolveTurn() {
    this.state = 'RESOLVING';
    const roundSummary = [];

    // 1. Process trade payments first
    this.turnDecisions.forEach(dec => {
      const p = dec.player;
      if (dec.trade && dec.trade.totalCost > 0) {
        const leftN = this.getLeftNeighbor(dec.playerIndex);
        const rightN = this.getRightNeighbor(dec.playerIndex);

        if (dec.trade.leftCost > 0) {
          p.coins -= dec.trade.leftCost;
          leftN.coins += dec.trade.leftCost;
          this.log(`${p.name} paid ${dec.trade.leftCost} coins to ${leftN.name} for trade resources.`, 'trade');
        }
        if (dec.trade.rightCost > 0) {
          p.coins -= dec.trade.rightCost;
          rightN.coins += dec.trade.rightCost;
          this.log(`${p.name} paid ${dec.trade.rightCost} coins to ${rightN.name} for trade resources.`, 'trade');
        }
      }
    });

    // 2. Execute actions
    this.turnDecisions.forEach(dec => {
      const p = dec.player;
      const card = dec.card;
      const hand = this.hands[dec.playerIndex];

      // Remove chosen card from hand
      const cardIdx = hand.findIndex(c => c.id === card.id);
      if (cardIdx !== -1) {
        hand.splice(cardIdx, 1);
      }

      if (dec.action === 'build') {
        // Direct coin cost on card
        if (card.cost?.coins) {
          p.coins -= card.cost.coins;
        }

        // Olympia perk check
        if (dec.useFreeOlympia) {
          p.hasFreeBuildAvailable = false;
        }

        p.city.push(card);

        // Immediate rewards on yellow cards
        if (card.benefit?.coins) {
          p.coins += card.benefit.coins;
        }
        if (card.benefit?.coinsPerNeighborCard) {
          const lCount = (this.getLeftNeighbor(dec.playerIndex)?.city || []).filter(c => c.type === card.benefit.coinsPerNeighborCard.type).length;
          const rCount = (this.getRightNeighbor(dec.playerIndex)?.city || []).filter(c => c.type === card.benefit.coinsPerNeighborCard.type).length;
          const ownCount = (p.city || []).filter(c => c.type === card.benefit.coinsPerNeighborCard.type).length;
          const totalCards = lCount + rCount + (card.benefit.coinsPerNeighborCard.ownBonus ? ownCount : 0);
          const gained = totalCards * (card.benefit.coinsPerNeighborCard.multiplier || 1);
          p.coins += gained;
          this.log(`${p.name} gained ${gained} coins from ${card.name}.`, 'reward');
        }
        if (card.benefit?.coinsPerOwnCard) {
          const ownCount = (p.city || []).filter(c => c.type === card.benefit.coinsPerOwnCard.type).length;
          const gained = ownCount * card.benefit.coinsPerOwnCard.coins;
          p.coins += gained;
        }
        if (card.benefit?.coinsPerWonderStage) {
          const gained = p.wonderStagesBuilt * card.benefit.coinsPerWonderStage.coins;
          p.coins += gained;
        }

        this.log(`${p.name} constructed ${card.name} (${card.type.toUpperCase()}).`, 'build');
        roundSummary.push({ player: p.name, action: 'Constructed', item: card.name, color: card.type });

      } else if (dec.action === 'wonder') {
        p.wonderStagesBuilt++;
        p.wonderTuckedCards.push(card);
        const stage = p.wonderBoard.stages[p.wonderStagesBuilt - 1];

        // Apply instant rewards
        if (stage?.reward?.coins) {
          p.coins += stage.reward.coins;
          this.log(`${p.name} gained ${stage.reward.coins} coins from Wonder Stage ${p.wonderStagesBuilt}!`, 'reward');
        }

        this.log(`${p.name} built Wonder Stage ${p.wonderStagesBuilt}! (${stage?.desc || ''})`, 'wonder');
        roundSummary.push({ player: p.name, action: 'Built Wonder Stage', item: `Stage ${p.wonderStagesBuilt}`, color: 'gold' });

      } else if (dec.action === 'discard') {
        p.coins += 3;
        this.discardPile.push(card);
        this.log(`${p.name} discarded ${card.name} for 3 coins.`, 'discard');
        roundSummary.push({ player: p.name, action: 'Discarded for 3 Coins', item: card.name, color: 'gray' });
      }
    });

    this.emit('roundResolved', { roundSummary, decisions: this.turnDecisions });

    // 3. Check turn advancement or Age Military Conflict
    if (this.currentTurn < 6) {
      // Pass hands
      this.passHands();
      this.currentTurn++;
      this.state = 'DRAFT';
      this.emit('turnStarted', { turn: this.currentTurn, age: this.currentAge });
    } else {
      // Turn 6 finished: discard remaining 7th card for all players
      this.players.forEach((p, idx) => {
        // Babylon Side B stage 2 perk allows playing 7th card
        const hasBabylonPlaySeventh = p.wonderBoard?.id === 'babylon' && p.wonderBoard?.side === 'B' && p.wonderStagesBuilt >= 2;
        if (!hasBabylonPlaySeventh && this.hands[idx].length > 0) {
          const leftover = this.hands[idx].pop();
          this.discardPile.push(leftover);
          this.log(`${p.name} discarded the final 7th card (${leftover.name}) to the discard pile.`, 'system');
        }
      });

      // End of Age: Resolve Military Conflicts!
      this.resolveMilitaryConflicts();
    }
  }

  /**
   * Passes hands between players.
   * Age I: Clockwise (to player on left, i -> (i - 1 + N) % N)
   * Age II: Counter-Clockwise (to player on right, i -> (i + 1) % N)
   * Age III: Clockwise
   */
  passHands() {
    const newHands = new Array(this.playerCount);
    const passLeft = this.currentAge !== 2;

    for (let i = 0; i < this.playerCount; i++) {
      if (passLeft) {
        // Cards pass clockwise to left neighbor
        const targetIdx = (i - 1 + this.playerCount) % this.playerCount;
        newHands[targetIdx] = this.hands[i];
      } else {
        // Cards pass counter-clockwise to right neighbor
        const targetIdx = (i + 1) % this.playerCount;
        newHands[targetIdx] = this.hands[i];
      }
    }

    this.hands = newHands;
  }

  /**
   * Resolves end of Age military battles with both neighbors.
   */
  resolveMilitaryConflicts() {
    this.state = 'MILITARY';
    const age = this.currentAge;
    const winValue = age === 1 ? 1 : (age === 2 ? 3 : 5);
    const battles = [];

    // Each player evaluates battle against their left neighbor and right neighbor
    for (let i = 0; i < this.playerCount; i++) {
      const p = this.players[i];
      const leftN = this.getLeftNeighbor(i);
      const rightN = this.getRightNeighbor(i);

      const pShields = AIEngine.countShields(p);
      const leftShields = AIEngine.countShields(leftN);
      const rightShields = AIEngine.countShields(rightN);

      // Battle vs Left Neighbor
      let leftResult = 'tie';
      if (pShields > leftShields) {
        p.militaryTokens.wins.push(winValue);
        leftResult = 'win';
      } else if (pShields < leftShields) {
        p.militaryTokens.defeats++;
        leftResult = 'loss';
      }

      // Battle vs Right Neighbor
      let rightResult = 'tie';
      if (pShields > rightShields) {
        p.militaryTokens.wins.push(winValue);
        rightResult = 'win';
      } else if (pShields < rightShields) {
        p.militaryTokens.defeats++;
        rightResult = 'loss';
      }

      battles.push({
        player: p,
        shields: pShields,
        leftNeighbor: leftN,
        leftShields,
        leftResult,
        rightNeighbor: rightN,
        rightShields,
        rightResult,
        winValue
      });

      this.log(`Age ${age} Conflict: ${p.name} (${pShields} shields) vs Left ${leftN.name} (${leftShields} shields) -> ${leftResult.toUpperCase()}, vs Right ${rightN.name} (${rightShields} shields) -> ${rightResult.toUpperCase()}`, 'military');
    }

    this.militaryHistory.push({ age, battles });
    this.emit('militaryResolved', { age, battles, winValue });
  }

  /**
   * Advances to next Age or finishes game.
   */
  advanceAfterMilitary() {
    if (this.currentAge < 3) {
      this.startAge(this.currentAge + 1);
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    this.state = 'FINISHED';

    // Calculate final scores for all players
    const scorecards = this.players.map((p, idx) => {
      const leftN = this.getLeftNeighbor(idx);
      const rightN = this.getRightNeighbor(idx);
      return ScoringEngine.calculateScore(p, leftN, rightN);
    });

    // Rank players: primary total VP, tiebreaker coins
    scorecards.sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return b.coins - a.coins;
    });

    this.log(`Game Finished! Winner: ${scorecards[0].playerName} with ${scorecards[0].total} Victory Points!`, 'system');
    this.emit('gameFinished', { scorecards, winner: scorecards[0] });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
