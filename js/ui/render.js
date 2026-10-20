/**
 * 7 Wonders - Dynamic UI Renderer
 * Renders hand cards, player city, wonder boards, neighbor trade docks,
 * conflict resolutions, and victory podium.
 */

import { TradeSolver } from '../engine/trade.js';
import { ScoringEngine } from '../engine/scoring.js';
import { AIEngine } from '../engine/ai.js';

export class UIRenderer {
  constructor(game, sound) {
    this.game = game;
    this.sound = sound;
    this.selectedCard = null;
    this.selectedTrade = null;
    this.inspectingPlayerIdx = 0;
  }

  /**
   * Main render refresh.
   */
  render() {
    this.renderHeader();
    this.renderNeighbors();
    this.renderWonderBoard();
    this.renderCity();
    this.renderHand();
    this.renderInspectTabs();
  }

  renderHeader() {
    const ageEl = document.getElementById('hud-age');
    const turnEl = document.getElementById('hud-turn');
    const dirEl = document.getElementById('hud-direction');

    if (ageEl) ageEl.textContent = `Age ${this.toRoman(this.game.currentAge)}`;
    if (turnEl) turnEl.textContent = `Turn ${this.game.currentTurn} / 6`;

    if (dirEl) {
      if (this.game.currentAge === 2) {
        dirEl.innerHTML = `<span class="dir-icon">➡️</span> Pass Right`;
        dirEl.title = 'Passing counter-clockwise to your right neighbor';
      } else {
        dirEl.innerHTML = `<span class="dir-icon">⬅️</span> Pass Left`;
        dirEl.title = 'Passing clockwise to your left neighbor';
      }
    }

    const human = this.game.players[0];
    if (human) {
      const coinsEl = document.getElementById('hud-coins');
      const shieldsEl = document.getElementById('hud-shields');
      const vpEl = document.getElementById('hud-vp');
      const sciEl = document.getElementById('hud-science');

      if (coinsEl) coinsEl.textContent = human.coins;

      const shields = AIEngine.countShields(human);
      if (shieldsEl) shieldsEl.textContent = shields;

      const leftN = this.game.getLeftNeighbor(0);
      const rightN = this.game.getRightNeighbor(0);
      const currentScore = ScoringEngine.calculateScore(human, leftN, rightN);

      if (vpEl) vpEl.textContent = `${currentScore.total} VP`;
      if (sciEl) {
        sciEl.textContent = `${currentScore.science.completeSets} sets (${currentScore.science.vp} pts)`;
      }
    }
  }

  renderNeighbors() {
    const leftN = this.game.getLeftNeighbor(0);
    const rightN = this.game.getRightNeighbor(0);

    const leftBox = document.getElementById('neighbor-left-dock');
    const rightBox = document.getElementById('neighbor-right-dock');

    if (leftBox && leftN) {
      leftBox.innerHTML = this.buildNeighborDockHTML(leftN, 'Left Neighbor', 'left');
    }

    if (rightBox && rightN) {
      rightBox.innerHTML = this.buildNeighborDockHTML(rightN, 'Right Neighbor', 'right');
    }
  }

  buildNeighborDockHTML(neighbor, label, side) {
    const shields = AIEngine.countShields(neighbor);
    const tradeAvail = TradeSolver.getNeighborTradeProduction(neighbor);
    const tradeBadges = Object.entries(tradeAvail)
      .filter(([_, count]) => count > 0)
      .map(([res, count]) => `<span class="trade-badge res-${res}" title="${count} ${res}">${this.getResourceIcon(res)} ${count}</span>`)
      .join('');

    return `
      <div class="neighbor-card" onclick="window.app.inspectPlayer(${neighbor.index})">
        <div class="neighbor-header">
          <span class="neighbor-avatar">${neighbor.personality?.avatar || '🏛️'}</span>
          <div class="neighbor-meta">
            <span class="neighbor-label">${label}</span>
            <strong class="neighbor-name">${neighbor.name}</strong>
          </div>
        </div>
        <div class="neighbor-wonder-strip" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('${neighbor.wonderBoard.image}')">
          <span>${neighbor.wonderBoard.name}</span>
          <span class="stage-tag">Stage ${neighbor.wonderStagesBuilt}/${neighbor.wonderBoard.stages.length}</span>
        </div>
        <div class="neighbor-stats">
          <span title="Coins">🪙 ${neighbor.coins}</span>
          <span title="Shields">⚔️ ${shields}</span>
          <span title="City cards">🏛️ ${neighbor.city.length}</span>
        </div>
        <div class="neighbor-trade-section">
          <small>Fixed Trade Goods:</small>
          <div class="neighbor-trade-badges">
            ${tradeBadges || '<span class="empty-trade">None</span>'}
          </div>
        </div>
      </div>
    `;
  }

  renderWonderBoard() {
    const human = this.game.players[0];
    if (!human) return;

    const boardEl = document.getElementById('wonder-board-container');
    if (!boardEl) return;

    const wonder = human.wonderBoard;
    const stages = wonder.stages;
    const builtCount = human.wonderStagesBuilt;

    const stagesHTML = stages.map((st, idx) => {
      const isBuilt = idx < builtCount;
      const isNext = idx === builtCount;
      const tuckedCard = human.wonderTuckedCards[idx];

      const costBadges = Object.entries(st.cost || {})
        .map(([res, cnt]) => `<span class="cost-pill res-${res}">${this.getResourceIcon(res)} ${cnt}</span>`)
        .join(' ');

      return `
        <div class="wonder-stage-slot ${isBuilt ? 'stage-built' : (isNext ? 'stage-next' : 'stage-locked')}">
          <div class="stage-header">
            <span class="stage-num">Stage ${idx + 1}</span>
            ${isBuilt ? '<span class="stage-status-badge">✓ Completed</span>' : (isNext ? '<span class="stage-status-badge next-badge">Ready</span>' : '')}
          </div>
          <div class="stage-cost-box">
            ${costBadges || '<span>Free</span>'}
          </div>
          <div class="stage-benefit-box">
            <span class="stage-desc">${st.desc}</span>
          </div>
          ${isBuilt && tuckedCard ? `
            <div class="tucked-card-preview" title="Built with ${tuckedCard.name}">
              📜 Foundation: ${tuckedCard.name}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    boardEl.innerHTML = `
      <div class="wonder-hero-banner" style="background-image: linear-gradient(to top, rgba(15,18,25,0.95) 15%, rgba(15,18,25,0.4)), url('${wonder.image}')">
        <div class="wonder-hero-content">
          <div class="wonder-title-row">
            <h2>${wonder.name}</h2>
            <span class="wonder-city-tag">${wonder.city} • Side ${wonder.side}</span>
          </div>
          <div class="wonder-base-resource">
            <span>Base Production:</span>
            <span class="res-pill-large res-${wonder.resource}">${this.getResourceIcon(wonder.resource)} 1 ${this.capitalize(wonder.resource)}</span>
          </div>
        </div>
      </div>
      <div class="wonder-stages-grid">
        ${stagesHTML}
      </div>
    `;
  }

  renderCity() {
    const player = this.game.players[this.inspectingPlayerIdx] || this.game.players[0];
    const cityEl = document.getElementById('player-city-columns');
    if (!cityEl) return;

    const categories = [
      { type: 'brown', title: 'Raw Materials', icon: '🪵' },
      { type: 'gray', title: 'Manufactured Goods', icon: '🏺' },
      { type: 'blue', title: 'Civilian Structures', icon: '🏛️' },
      { type: 'yellow', title: 'Commercial Structures', icon: '🪙' },
      { type: 'red', title: 'Military Structures', icon: '⚔️' },
      { type: 'green', title: 'Scientific Structures', icon: '📜' },
      { type: 'purple', title: 'Guilds', icon: '👑' }
    ];

    cityEl.innerHTML = categories.map(cat => {
      const cards = (player.city || []).filter(c => c.type === cat.type);
      const cardsHTML = cards.map(c => `
        <div class="city-card-item card-${c.type}" title="${c.desc || c.name}">
          <div class="city-card-name">${c.name}</div>
          <div class="city-card-benefit">${this.formatCardBenefitShort(c)}</div>
        </div>
      `).join('');

      return `
        <div class="city-column col-${cat.type}">
          <div class="city-col-header">
            <span>${cat.icon} ${cat.title}</span>
            <span class="col-count">${cards.length}</span>
          </div>
          <div class="city-col-cards">
            ${cardsHTML || '<div class="city-col-empty">None built</div>'}
          </div>
        </div>
      `;
    }).join('');

    const cityTitleEl = document.getElementById('city-owner-title');
    if (cityTitleEl) {
      cityTitleEl.textContent = player.isHuman ? 'Your Built City' : `${player.name}'s City Inspection`;
    }
  }

  renderHand() {
    const handEl = document.getElementById('draft-cards-row');
    if (!handEl) return;

    if (this.game.state !== 'DRAFT') {
      handEl.innerHTML = `<div class="hand-waiting-message">Resolving actions...</div>`;
      return;
    }

    const human = this.game.players[0];
    const hand = this.game.hands[0] || [];
    const leftN = this.game.getLeftNeighbor(0);
    const rightN = this.game.getRightNeighbor(0);

    if (hand.length === 0) {
      handEl.innerHTML = `<div class="hand-waiting-message">No cards in hand.</div>`;
      return;
    }

    handEl.innerHTML = hand.map(card => {
      const buildEval = TradeSolver.evaluateCardBuild(human, card, leftN, rightN);
      const isSelected = this.selectedCard && this.selectedCard.id === card.id;

      let badgeClass = 'badge-can-build';
      let badgeText = 'Free';

      if (!buildEval.canBuild) {
        if (buildEval.reason === 'duplicate') {
          badgeClass = 'badge-duplicate';
          badgeText = 'Already Built';
        } else if (buildEval.reason === 'cannot_afford_trade') {
          badgeClass = 'badge-unaffordable';
          badgeText = `Need ${buildEval.totalCoinsNeeded}g`;
        } else {
          badgeClass = 'badge-unaffordable';
          badgeText = 'Missing Resources';
        }
      } else {
        if (buildEval.isFreeChain) {
          badgeClass = 'badge-free-chain';
          badgeText = `🔗 Free (${buildEval.chainSource})`;
        } else if (buildEval.tradeCost > 0) {
          badgeClass = 'badge-needs-trade';
          badgeText = `Trade: ${buildEval.tradeCost}g`;
        } else if (card.cost?.coins) {
          badgeClass = 'badge-can-build';
          badgeText = `${card.cost.coins}g`;
        } else if (Object.keys(card.cost || {}).length > 0) {
          badgeClass = 'badge-can-build';
          badgeText = 'Affordable';
        } else {
          badgeClass = 'badge-free';
          badgeText = 'Free';
        }
      }

      const costBadges = this.formatCostHTML(card.cost);

      return `
        <div class="wonder-card card-${card.type} ${isSelected ? 'card-selected' : ''}" 
             onclick="window.app.selectCard('${card.id}')"
             data-card-id="${card.id}">
          <div class="card-top-bar">
            <span class="card-cost-row">${costBadges || '<span class="free-cost">Free</span>'}</span>
            <span class="card-chain-pill">${card.freeWith ? '🔗' : ''}</span>
          </div>
          <div class="card-art-box">
            <div class="card-icon-art">${this.getCardArtIcon(card)}</div>
          </div>
          <div class="card-info-box">
            <h4 class="card-title">${card.name}</h4>
            <p class="card-effect-desc">${card.desc}</p>
          </div>
          <div class="card-footer-badge ${badgeClass}">
            ${badgeText}
          </div>
        </div>
      `;
    }).join('');
  }

  renderInspectTabs() {
    const tabsEl = document.getElementById('player-tabs-bar');
    if (!tabsEl) return;

    tabsEl.innerHTML = this.game.players.map(p => {
      const isSelected = p.index === this.inspectingPlayerIdx;
      return `
        <button class="player-tab-btn ${isSelected ? 'active-tab' : ''}" onclick="window.app.inspectPlayer(${p.index})">
          <span>${p.personality?.avatar || '👤'}</span>
          <span>${p.name} ${p.isHuman ? '(You)' : ''}</span>
        </button>
      `;
    }).join('');
  }

  /**
   * Opens the action modal for the selected card.
   */
  openCardActionModal(card) {
    this.selectedCard = card;
    const modalEl = document.getElementById('card-action-modal');
    if (!modalEl) return;

    const human = this.game.players[0];
    const leftN = this.game.getLeftNeighbor(0);
    const rightN = this.game.getRightNeighbor(0);

    const buildEval = TradeSolver.evaluateCardBuild(human, card, leftN, rightN);
    const wonderEval = TradeSolver.evaluateWonderStage(human, leftN, rightN);

    const titleEl = document.getElementById('modal-card-title');
    const descEl = document.getElementById('modal-card-desc');
    const costBox = document.getElementById('modal-card-costs');
    const chainsBox = document.getElementById('modal-card-chains');

    if (titleEl) titleEl.textContent = card.name;
    if (descEl) descEl.textContent = card.desc;

    if (costBox) {
      let costDetail = this.formatCostHTML(card.cost) || '<span>None (Free)</span>';
      if (buildEval.canBuild && buildEval.tradeCost > 0) {
        costDetail += `
          <div class="trade-cost-breakdown">
            <strong>Optimal Trade:</strong>
            ${buildEval.bestTrade.leftCost > 0 ? `<span>Left (${leftN.name}): ${buildEval.bestTrade.leftCost} coins</span>` : ''}
            ${buildEval.bestTrade.rightCost > 0 ? `<span>Right (${rightN.name}): ${buildEval.bestTrade.rightCost} coins</span>` : ''}
            <em>Total trade cost: ${buildEval.tradeCost} coins</em>
          </div>
        `;
      }
      costBox.innerHTML = costDetail;
    }

    if (chainsBox) {
      let chainText = '';
      if (card.freeWith && card.freeWith.length > 0) {
        chainText += `<p>🔗 Built free if you already own: <strong>${card.freeWith.join(', ')}</strong></p>`;
      }
      if (card.chainsTo && card.chainsTo.length > 0) {
        chainText += `<p>✨ Unlocks free in future ages: <strong>${card.chainsTo.join(', ')}</strong></p>`;
      }
      chainsBox.innerHTML = chainText || '<p>No chaining connections.</p>';
    }

    // Configure Buttons
    const btnBuild = document.getElementById('btn-action-build');
    const btnWonder = document.getElementById('btn-action-wonder');
    const btnDiscard = document.getElementById('btn-action-discard');

    if (btnBuild) {
      btnBuild.disabled = !buildEval.canBuild;
      if (!buildEval.canBuild) {
        btnBuild.innerHTML = `<span>🏛️ Cannot Build</span> <small>${buildEval.message || ''}</small>`;
      } else if (buildEval.isFreeChain) {
        btnBuild.innerHTML = `<span>🏛️ Build for Free!</span> <small>Chained from ${buildEval.chainSource}</small>`;
      } else if (buildEval.tradeCost > 0) {
        btnBuild.innerHTML = `<span>🏛️ Build via Trade</span> <small>Costs ${buildEval.totalCoinsNeeded} coins total</small>`;
      } else {
        btnBuild.innerHTML = `<span>🏛️ Build Structure</span> <small>Direct resources available</small>`;
      }
    }

    if (btnWonder) {
      btnWonder.disabled = !wonderEval.canBuild;
      if (!wonderEval.canBuild) {
        btnWonder.innerHTML = `<span>🌟 Wonder Unavailable</span> <small>${wonderEval.message || 'Cannot afford stage'}</small>`;
      } else if (wonderEval.tradeCost > 0) {
        btnWonder.innerHTML = `<span>🌟 Build Wonder Stage ${wonderEval.stageNumber}</span> <small>Requires ${wonderEval.tradeCost} trade coins</small>`;
      } else {
        btnWonder.innerHTML = `<span>🌟 Build Wonder Stage ${wonderEval.stageNumber}</span> <small>Cost satisfied</small>`;
      }
    }

    if (btnDiscard) {
      btnDiscard.innerHTML = `<span>🪙 Discard Card</span> <small>Gain +3 Coins immediately</small>`;
    }

    modalEl.classList.remove('hidden');
  }

  closeCardActionModal() {
    const modalEl = document.getElementById('card-action-modal');
    if (modalEl) modalEl.classList.add('hidden');
    this.selectedCard = null;
  }

  /**
   * Formats cost object to HTML badges.
   */
  formatCostHTML(cost) {
    if (!cost) return '';
    const badges = [];

    if (cost.coins) {
      badges.push(`<span class="cost-pill res-coin">🪙 ${cost.coins}</span>`);
    }

    for (const [res, count] of Object.entries(cost)) {
      if (res === 'coins' || count <= 0) continue;
      for (let i = 0; i < count; i++) {
        badges.push(`<span class="cost-pill res-${res}">${this.getResourceIcon(res)}</span>`);
      }
    }

    return badges.join(' ');
  }

  formatCardBenefitShort(c) {
    if (c.benefit?.produces) return c.benefit.produces.map(r => this.getResourceIcon(r)).join(' ');
    if (c.benefit?.producesSlash) return c.benefit.producesSlash.map(r => this.getResourceIcon(r)).join('/');
    if (c.benefit?.vp) return `+${c.benefit.vp} VP`;
    if (c.benefit?.shields) return `⚔️ ${c.benefit.shields}`;
    if (c.benefit?.symbol) return `📜 ${this.capitalize(c.benefit.symbol)}`;
    if (c.benefit?.coins) return `🪙 +${c.benefit.coins}`;
    if (c.benefit?.tradeDiscount) return '🪙 Trade Discount';
    return c.desc || '';
  }

  getResourceIcon(res) {
    const icons = {
      wood: '🪵',
      stone: '🪨',
      ore: '⛏️',
      clay: '🧱',
      glass: '🍶',
      loom: '🧵',
      papyrus: '📜',
      coin: '🪙'
    };
    return icons[res] || res;
  }

  getCardArtIcon(c) {
    switch (c.type) {
      case 'brown': return '🪵';
      case 'gray': return '🏺';
      case 'blue': return '🏛️';
      case 'yellow': return '⚖️';
      case 'red': return '🛡️';
      case 'green':
        if (c.benefit?.symbol === 'compass') return '🧭';
        if (c.benefit?.symbol === 'gear') return '⚙️';
        if (c.benefit?.symbol === 'tablet') return '📜';
        return '🔬';
      case 'purple': return '👑';
      default: return '📜';
    }
  }

  toRoman(num) {
    const roman = ['0', 'I', 'II', 'III', 'IV'];
    return roman[num] || num;
  }

  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
