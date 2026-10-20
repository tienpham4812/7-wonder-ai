/**
 * 7 Wonders - AI Personalities Database
 * Distinct AI personalities with unique strategic preferences and decision weightings.
 */

export const AI_PERSONALITIES = [
  {
    id: 'alexander',
    name: 'Alexander',
    title: 'The Great Conqueror',
    avatar: '⚔️',
    quote: 'There is nothing impossible to him who will try.',
    weights: {
      military: 2.8,
      science: 0.8,
      civilian: 1.1,
      commercial: 1.0,
      guilds: 1.3,
      wonder: 1.4,
      resources: 1.2
    },
    hateDraftRate: 0.75,
    description: 'Relentless militarist who prioritizes red cards to overwhelm both neighbors every Age.'
  },
  {
    id: 'aristotle',
    name: 'Aristotle',
    title: 'The Philosopher Master',
    avatar: '📜',
    quote: 'Knowing yourself is the beginning of all wisdom.',
    weights: {
      military: 0.7,
      science: 3.2,
      civilian: 1.0,
      commercial: 1.1,
      guilds: 1.4,
      wonder: 1.1,
      resources: 1.3
    },
    hateDraftRate: 0.6,
    description: 'Science visionary who obsessively collects matching sets and deep single-symbol stacks.'
  },
  {
    id: 'croesus',
    name: 'Croesus',
    title: 'The Gold Tycoon',
    avatar: '🪙',
    quote: 'Gold speaks with an eloquence greater than ten thousand orators.',
    weights: {
      military: 1.0,
      science: 1.0,
      civilian: 1.2,
      commercial: 2.7,
      guilds: 1.6,
      wonder: 1.3,
      resources: 1.5
    },
    hateDraftRate: 0.5,
    description: 'Mercantile oligarch who amasses immense treasury, trade discounts, and commerce combos.'
  },
  {
    id: 'pericles',
    name: 'Pericles',
    title: 'The Golden Statesman',
    avatar: '🏛️',
    quote: 'What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others.',
    weights: {
      military: 1.0,
      science: 1.2,
      civilian: 2.7,
      commercial: 1.2,
      guilds: 1.7,
      wonder: 1.4,
      resources: 1.3
    },
    hateDraftRate: 0.55,
    description: 'Civic master who builds prestigious blue temples, monuments, and chain hierarchies for huge VP.'
  },
  {
    id: 'imhotep',
    name: 'Imhotep',
    title: 'The Grand Architect',
    avatar: '📐',
    quote: 'To build something eternal is to touch the realm of the gods.',
    weights: {
      military: 1.1,
      science: 1.1,
      civilian: 1.4,
      commercial: 1.2,
      guilds: 1.4,
      wonder: 3.0,
      resources: 1.8
    },
    hateDraftRate: 0.5,
    description: 'Architectural genius who rushes wonder stages ahead of schedule and hoards raw building materials.'
  },
  {
    id: 'cleopatra',
    name: 'Cleopatra',
    title: 'The Opportunistic Queen',
    avatar: '👑',
    quote: 'I will not be triumphed over.',
    weights: {
      military: 1.5,
      science: 1.5,
      civilian: 1.6,
      commercial: 1.5,
      guilds: 2.0,
      wonder: 1.8,
      resources: 1.4
    },
    hateDraftRate: 0.85,
    description: 'Sharp, adaptive strategist who counter-picks opponents, hate-drafts key cards, and secures maximum net VP.'
  }
];
