/**
 * 7 Wonders - Main Application Controller
 * Coordinates game engine, UI rendering, sound effects, and user interactions.
 */

import { GameEngine } from './engine/game.js';
import { sound } from './audio.js';
import { UIRenderer } from './ui/render.js';
import { ModalController } from './ui/modals.js';
import { TradeSolver } from './engine/trade.js';

class AppController {
  constructor() {
    this.game = new GameEngine({
      playerCount: 4,
      humanWonderId: 'rhodes',
      wonderSide: 'A',
      humanPlayerName: 'You'
    });

    this.sound = sound;
    this.renderer = new UIRenderer(this.game, this.sound);
    this.modals = new ModalController(this.game, this.sound, this.renderer);

    this.bindGameEvents();
    this.bindUIControls();
  }

  init() {
    this.game.startNewGame();
    this.renderer.render();
  }

  bindGameEvents() {
    this.game.on('ageStarted', (data) => {
      this.sound.playCardDeal();
      this.showToast(`Starting Age ${this.renderer.toRoman(data.age)}! 7 cards dealt.`);
      this.renderer.render();
    });

    this.game.on('turnStarted', (data) => {
      this.sound.playCardDeal();
      this.renderer.render();
    });

    this.game.on('roundResolved', (data) => {
      this.renderer.render();
    });

    this.game.on('militaryResolved', (data) => {
      this.modals.showMilitaryModal(data);
    });

    this.game.on('gameFinished', (data) => {
      this.modals.showEndGameModal(data);
    });

    this.game.on('log', (entry) => {
      this.appendLogEntry(entry);
    });
  }

  bindUIControls() {
    // Sound FX Button
    const muteBtn = document.getElementById('btn-toggle-sound');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = this.sound.toggleMute();
        muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
        muteBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
      });
    }

    // Lyre Music Button
    const musicBtn = document.getElementById('btn-toggle-music');
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        const isPlaying = this.sound.toggleAmbientMusic();
        musicBtn.classList.toggle('active-music', isPlaying);
        musicBtn.innerHTML = isPlaying ? '🎵 Ancient Lyre (Playing)' : '🎵 Ambient Lyre (Off)';
      });
    }

    // Rules Guide Button
    const rulesBtn = document.getElementById('btn-open-rules');
    if (rulesBtn) {
      rulesBtn.addEventListener('click', () => this.modals.showRulesModal());
    }

    // Settings Button
    const settingsBtn = document.getElementById('btn-open-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.modals.showSettingsModal());
    }

    // New Game / Restart Quick Button
    const restartBtn = document.getElementById('btn-quick-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (confirm('Start a fresh new game with current settings?')) {
          this.game.startNewGame();
          this.renderer.render();
        }
      });
    }

    // Action Modal Execution Buttons
    const btnBuild = document.getElementById('btn-action-build');
    const btnWonder = document.getElementById('btn-action-wonder');
    const btnDiscard = document.getElementById('btn-action-discard');
    const btnCancelModal = document.getElementById('btn-close-action-modal');

    if (btnBuild) {
      btnBuild.addEventListener('click', () => this.executeAction('build'));
    }
    if (btnWonder) {
      btnWonder.addEventListener('click', () => this.executeAction('wonder'));
    }
    if (btnDiscard) {
      btnDiscard.addEventListener('click', () => this.executeAction('discard'));
    }
    if (btnCancelModal) {
      btnCancelModal.addEventListener('click', () => this.renderer.closeCardActionModal());
    }

    // Modal overlay backdrop click to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.add('hidden');
          this.renderer.selectedCard = null;
        }
      });
    });

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(#military-conflict-modal)').forEach(overlay => {
          overlay.classList.add('hidden');
        });
        this.renderer.selectedCard = null;
      }
    });

    // Unlock Web Audio context on first user interaction
    window.addEventListener('click', () => {
      this.sound.ensureContext();
    }, { once: true });
  }

  selectCard(cardId) {
    const humanHand = this.game.hands[0] || [];
    const card = humanHand.find(c => c.id === cardId);
    if (!card) return;

    this.sound.playCardDeal();
    this.renderer.openCardActionModal(card);
  }

  executeAction(actionType) {
    const card = this.renderer.selectedCard;
    if (!card) return;

    const human = this.game.players[0];
    const leftN = this.game.getLeftNeighbor(0);
    const rightN = this.game.getRightNeighbor(0);

    let trade = null;

    if (actionType === 'build') {
      const buildEval = TradeSolver.evaluateCardBuild(human, card, leftN, rightN);
      if (!buildEval.canBuild) return;
      trade = buildEval.bestTrade;
      this.sound.playCardBuild();
    } else if (actionType === 'wonder') {
      const wonderEval = TradeSolver.evaluateWonderStage(human, leftN, rightN);
      if (!wonderEval.canBuild) return;
      trade = wonderEval.bestTrade;
      this.sound.playWonderFanfare();
    } else if (actionType === 'discard') {
      this.sound.playCoinClink();
    }

    this.renderer.closeCardActionModal();

    // Human makes move
    this.game.submitHumanChoice({
      action: actionType,
      cardId: card.id,
      trade
    });
  }

  inspectPlayer(playerIdx) {
    this.renderer.inspectingPlayerIdx = playerIdx;
    this.renderer.renderCity();
    this.renderer.renderInspectTabs();
  }

  showToast(message) {
    const toast = document.getElementById('game-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2800);
  }

  appendLogEntry(entry) {
    const logList = document.getElementById('game-log-list');
    if (!logList) return;

    const li = document.createElement('li');
    li.className = `log-item log-${entry.type}`;
    li.innerHTML = `<span class="log-time">[A${entry.age}:T${entry.turn}]</span> ${entry.text}`;

    logList.insertBefore(li, logList.firstChild);

    // Limit to 50 entries
    if (logList.children.length > 50) {
      logList.removeChild(logList.lastChild);
    }
  }
}

// Instantiate global app controller
window.app = new AppController();
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
