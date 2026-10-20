/**
 * 7 Wonders - Modals & Overlays Controller
 * Military Conflict resolution, End-Game Scorecard Podium, Rules Guide, and Settings.
 */

import { WONDERS } from '../data/wonders.js';

export class ModalController {
  constructor(game, sound, renderer) {
    this.game = game;
    this.sound = sound;
    this.renderer = renderer;
  }

  showMilitaryModal(data) {
    const modalEl = document.getElementById('military-conflict-modal');
    if (!modalEl) return;

    this.sound.playWarHorn();

    const titleEl = document.getElementById('military-modal-title');
    const contentEl = document.getElementById('military-battles-list');

    if (titleEl) {
      titleEl.textContent = `Age ${this.renderer.toRoman(data.age)} Military Conflicts`;
    }

    if (contentEl) {
      contentEl.innerHTML = data.battles.map(b => {
        const p = b.player;
        const lRes = b.leftResult === 'win' ? `<span class="win-token">+${data.winValue} VP</span>` : (b.leftResult === 'loss' ? '<span class="loss-token">-1 VP</span>' : '<span class="tie-token">Tie (0)</span>');
        const rRes = b.rightResult === 'win' ? `<span class="win-token">+${data.winValue} VP</span>` : (b.rightResult === 'loss' ? '<span class="loss-token">-1 VP</span>' : '<span class="tie-token">Tie (0)</span>');

        return `
          <div class="military-battle-card ${p.isHuman ? 'human-battle-card' : ''}">
            <div class="battle-player-badge">
              <span>${p.personality?.avatar || '👤'}</span>
              <strong>${p.name}</strong>
              <span class="battle-shields">⚔️ ${b.shields} Shields</span>
            </div>
            <div class="battle-neighbors-clash">
              <div class="clash-side">
                <small>vs Left (${b.leftNeighbor.name} ⚔️${b.leftShields}):</small>
                <div>${lRes}</div>
              </div>
              <div class="clash-side">
                <small>vs Right (${b.rightNeighbor.name} ⚔️${b.rightShields}):</small>
                <div>${rRes}</div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    modalEl.classList.remove('hidden');
  }

  closeMilitaryModal() {
    const modalEl = document.getElementById('military-conflict-modal');
    if (modalEl) modalEl.classList.add('hidden');
    this.game.advanceAfterMilitary();
    this.renderer.render();
  }

  showEndGameModal(data) {
    const modalEl = document.getElementById('end-game-modal');
    if (!modalEl) return;

    this.sound.playWonderFanfare();

    const winner = data.winner;
    const winnerBanner = document.getElementById('endgame-winner-banner');
    if (winnerBanner) {
      winnerBanner.innerHTML = `
        <div class="winner-trophy">🏆</div>
        <h2>${winner.playerName} is Victorious!</h2>
        <p class="winner-sub">Grand Total: <strong>${winner.total} Victory Points</strong> (${winner.coins} gold tiebreaker)</p>
      `;
    }

    // Render Podium for Top 3
    const podiumEl = document.getElementById('endgame-podium');
    if (podiumEl) {
      const top3 = data.scorecards.slice(0, 3);
      const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean); // 2nd, 1st, 3rd

      podiumEl.innerHTML = podiumOrder.map(sc => {
        const rank = data.scorecards.indexOf(sc) + 1;
        const rankMedal = rank === 1 ? '🥇 1st' : (rank === 2 ? '🥈 2nd' : '🥉 3rd');
        const heightClass = rank === 1 ? 'podium-first' : (rank === 2 ? 'podium-second' : 'podium-third');

        return `
          <div class="podium-pillar ${heightClass}">
            <div class="podium-avatar">${sc.playerId === 'human' ? '👑' : '🏛️'}</div>
            <div class="podium-name">${sc.playerName}</div>
            <div class="podium-score">${sc.total} VP</div>
            <div class="podium-rank">${rankMedal}</div>
          </div>
        `;
      }).join('');
    }

    // Render Full Breakdown Table
    const tableEl = document.getElementById('endgame-scorecard-table');
    if (tableEl) {
      tableEl.innerHTML = `
        <thead>
          <tr>
            <th>Player</th>
            <th title="Military Victory & Defeat tokens">⚔️ Military</th>
            <th title="1 VP per 3 coins">🪙 Treasury</th>
            <th title="Wonder stages completed">🌟 Wonder</th>
            <th title="Civilian blue structures">🏛️ Civilian</th>
            <th title="Science symbols sets & squares">📜 Science</th>
            <th title="Commercial structures">⚖️ Commerce</th>
            <th title="Guild cards">👑 Guilds</th>
            <th class="th-total">Total VP</th>
          </tr>
        </thead>
        <tbody>
          ${data.scorecards.map((sc, rank) => `
            <tr class="${sc.playerId === 'human' ? 'row-human' : ''} ${rank === 0 ? 'row-winner' : ''}">
              <td>
                <strong>${rank + 1}. ${sc.playerName}</strong>
                ${sc.playerId === 'human' ? '<span class="you-tag">YOU</span>' : ''}
              </td>
              <td>${sc.military.vp}</td>
              <td>${sc.treasury.vp} <small>(${sc.coins}g)</small></td>
              <td>${sc.wonder.vp}</td>
              <td>${sc.civilian.vp}</td>
              <td>${sc.science.vp} <small>(${sc.science.completeSets}s)</small></td>
              <td>${sc.commercial.vp}</td>
              <td>${sc.guilds.vp}</td>
              <td class="td-total"><strong>${sc.total}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      `;
    }

    modalEl.classList.remove('hidden');
  }

  closeEndGameModal() {
    const modalEl = document.getElementById('end-game-modal');
    if (modalEl) modalEl.classList.add('hidden');
  }

  showRulesModal() {
    const modalEl = document.getElementById('rules-guide-modal');
    if (modalEl) modalEl.classList.remove('hidden');
  }

  closeRulesModal() {
    const modalEl = document.getElementById('rules-guide-modal');
    if (modalEl) modalEl.classList.add('hidden');
  }

  showSettingsModal() {
    const modalEl = document.getElementById('settings-modal');
    if (!modalEl) return;

    // Populate current settings
    const pCountInput = document.getElementById('setting-player-count');
    const wonderSelect = document.getElementById('setting-wonder-select');
    const sideSelect = document.getElementById('setting-wonder-side');
    const aiSpeedSelect = document.getElementById('setting-ai-speed');

    if (pCountInput) pCountInput.value = this.game.playerCount;
    if (sideSelect) sideSelect.value = this.game.wonderSide;
    if (aiSpeedSelect) aiSpeedSelect.value = this.game.aiSpeed;

    if (wonderSelect) {
      wonderSelect.innerHTML = Object.entries(WONDERS).map(([key, w]) => `
        <option value="${key}" ${key === this.game.humanWonderId ? 'selected' : ''}>${w.name} (${w.city})</option>
      `).join('');
    }

    modalEl.classList.remove('hidden');
  }

  closeSettingsModal() {
    const modalEl = document.getElementById('settings-modal');
    if (modalEl) modalEl.classList.add('hidden');
  }

  saveSettingsAndRestart() {
    const pCountInput = document.getElementById('setting-player-count');
    const wonderSelect = document.getElementById('setting-wonder-select');
    const sideSelect = document.getElementById('setting-wonder-side');
    const aiSpeedSelect = document.getElementById('setting-ai-speed');

    if (pCountInput) this.game.playerCount = parseInt(pCountInput.value, 10) || 4;
    if (wonderSelect) this.game.humanWonderId = wonderSelect.value;
    if (sideSelect) this.game.wonderSide = sideSelect.value;
    if (aiSpeedSelect) this.game.aiSpeed = aiSpeedSelect.value;

    this.closeSettingsModal();
    this.game.startNewGame();
    this.renderer.render();
  }
}
