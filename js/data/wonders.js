/**
 * 7 Wonders - Wonder Boards Data
 * Features Rhodes, Alexandria, Ephesus, Babylon, Olympia, Halicarnassus, and Giza.
 * Both Side A and Side B are fully supported with official abilities.
 */

export const WONDERS = {
  rhodes: {
    id: 'rhodes',
    name: 'The Colossus of Rhodes',
    city: 'Rhodes',
    resource: 'ore',
    image: 'assets/wonders/rhodes.jpg',
    description: 'A colossal bronze statue of the sun god Helios, guardian of the Aegean sea and military might.',
    sideA: {
      stages: [
        {
          stage: 1,
          cost: { wood: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { clay: 3 },
          reward: { shields: 2 },
          desc: '2 Military Shields'
        },
        {
          stage: 3,
          cost: { ore: 4 },
          reward: { vp: 7 },
          desc: '7 Victory Points'
        }
      ]
    },
    sideB: {
      stages: [
        {
          stage: 1,
          cost: { stone: 3 },
          reward: { vp: 3, shields: 1, coins: 3 },
          desc: '3 VP, 1 Shield, 3 Coins'
        },
        {
          stage: 2,
          cost: { ore: 4 },
          reward: { vp: 4, shields: 1, coins: 4 },
          desc: '4 VP, 1 Shield, 4 Coins'
        }
      ]
    }
  },

  alexandria: {
    id: 'alexandria',
    name: 'The Lighthouse of Alexandria',
    city: 'Alexandria',
    resource: 'glass',
    image: 'assets/wonders/alexandria.jpg',
    description: 'A towering marble beacon guiding Mediterranean merchants with unparalleled trade versatility.',
    sideA: {
      stages: [
        {
          stage: 1,
          cost: { stone: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { ore: 2 },
          reward: { raw_wild: 1 },
          desc: 'Choice of 1 Raw Material each turn (Wood, Stone, Ore, Clay)'
        },
        {
          stage: 3,
          cost: { glass: 2 },
          reward: { vp: 7 },
          desc: '7 Victory Points'
        }
      ]
    },
    sideB: {
      stages: [
        {
          stage: 1,
          cost: { clay: 2 },
          reward: { raw_wild: 1 },
          desc: 'Choice of 1 Raw Material each turn (Wood, Stone, Ore, Clay)'
        },
        {
          stage: 2,
          cost: { wood: 2 },
          reward: { goods_wild: 1 },
          desc: 'Choice of 1 Manufactured Good each turn (Glass, Loom, Papyrus)'
        },
        {
          stage: 3,
          cost: { stone: 3 },
          reward: { vp: 7 },
          desc: '7 Victory Points'
        }
      ]
    }
  },

  ephesus: {
    id: 'ephesus',
    name: 'The Temple of Artemis in Ephesus',
    city: 'Ephesus',
    resource: 'papyrus',
    image: 'assets/wonders/ephesus.jpg',
    description: 'A magnificent Ionic sanctuary adorned with gold statues, overflowing with treasures and divine prosperity.',
    sideA: {
      stages: [
        {
          stage: 1,
          cost: { stone: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { wood: 2 },
          reward: { coins: 9, vp: 4 },
          desc: 'Gain 9 Coins immediately + 4 Victory Points'
        },
        {
          stage: 3,
          cost: { papyrus: 2 },
          reward: { vp: 7 },
          desc: '7 Victory Points'
        }
      ]
    },
    sideB: {
      stages: [
        {
          stage: 1,
          cost: { stone: 2 },
          reward: { coins: 4, vp: 2 },
          desc: 'Gain 4 Coins + 2 VP'
        },
        {
          stage: 2,
          cost: { wood: 2 },
          reward: { coins: 4, vp: 3 },
          desc: 'Gain 4 Coins + 3 VP'
        },
        {
          stage: 3,
          cost: { glass: 1, loom: 1, papyrus: 1 },
          reward: { coins: 4, vp: 5 },
          desc: 'Gain 4 Coins + 5 VP'
        }
      ]
    }
  },

  babylon: {
    id: 'babylon',
    name: 'The Hanging Gardens of Babylon',
    city: 'Babylon',
    resource: 'clay',
    image: 'assets/wonders/babylon.jpg',
    description: 'Cascading terraced gardens and botanical wonders nurturing ancient Mesopotamian sciences.',
    sideA: {
      stages: [
        {
          stage: 1,
          cost: { clay: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { wood: 3 },
          reward: { science_wild: 1 },
          desc: '1 Wild Science Symbol (Compass, Gear, or Tablet of choice)'
        },
        {
          stage: 3,
          cost: { clay: 4 },
          reward: { vp: 7 },
          desc: '7 Victory Points'
        }
      ]
    },
    sideB: {
      stages: [
        {
          stage: 1,
          cost: { loom: 1, clay: 1 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { wood: 2, glass: 1 },
          reward: { play_seventh: true },
          desc: 'Play both last cards of each Age instead of discarding'
        },
        {
          stage: 3,
          cost: { clay: 3, papyrus: 1 },
          reward: { science_wild: 1 },
          desc: '1 Wild Science Symbol'
        }
      ]
    }
  },

  olympia: {
    id: 'olympia',
    name: 'The Statue of Zeus at Olympia',
    city: 'Olympia',
    resource: 'wood',
    image: 'assets/wonders/olympia.jpg',
    description: 'The golden chryselephantine enthroned Zeus, granting divine favor and architect mastery.',
    sideA: {
      stages: [
        {
          stage: 1,
          cost: { wood: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { stone: 2 },
          reward: { free_build_per_age: true },
          desc: 'Build 1 card for free each Age'
        },
        {
          stage: 3,
          cost: { ore: 2 },
          reward: { vp: 7 },
          desc: '7 Victory Points'
        }
      ]
    },
    sideB: {
      stages: [
        {
          stage: 1,
          cost: { wood: 2 },
          reward: { commerce_discount: true, vp: 2 },
          desc: '2 VP and discount on neighbor trading'
        },
        {
          stage: 2,
          cost: { stone: 2 },
          reward: { vp: 5 },
          desc: '5 Victory Points'
        },
        {
          stage: 3,
          cost: { ore: 2, loom: 1 },
          reward: { copy_guild: true },
          desc: 'Copy 1 Guild card from either neighbor at end of game'
        }
      ]
    }
  },

  halicarnassus: {
    id: 'halicarnassus',
    name: 'The Mausoleum at Halicarnassus',
    city: 'Halicarnassus',
    resource: 'loom',
    image: 'assets/wonders/halicarnassus.jpg',
    description: 'An immortal tomb of marble and statues, capable of reclaiming lost treasures from the discard pile.',
    sideA: {
      stages: [
        {
          stage: 1,
          cost: { clay: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { ore: 3 },
          reward: { resurrect_discard: true },
          desc: 'Look through discard pile and build 1 card immediately for free'
        },
        {
          stage: 3,
          cost: { loom: 2 },
          reward: { vp: 7 },
          desc: '7 Victory Points'
        }
      ]
    },
    sideB: {
      stages: [
        {
          stage: 1,
          cost: { ore: 2 },
          reward: { vp: 2, resurrect_discard: true },
          desc: '2 VP + Build 1 card from discard pile for free'
        },
        {
          stage: 2,
          cost: { clay: 3 },
          reward: { vp: 1, resurrect_discard: true },
          desc: '1 VP + Build 1 card from discard pile for free'
        },
        {
          stage: 3,
          cost: { glass: 1, papyrus: 1, loom: 1 },
          reward: { resurrect_discard: true },
          desc: 'Build 1 card from discard pile for free'
        }
      ]
    }
  },

  giza: {
    id: 'giza',
    name: 'The Pyramids of Giza',
    city: 'Giza',
    resource: 'stone',
    image: 'assets/wonders/giza.jpg',
    description: 'The eternal limestone and gold monuments of Pharaohs, yielding legendary victory prestige.',
    sideA: {
      stages: [
        {
          stage: 1,
          cost: { stone: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { wood: 3 },
          reward: { vp: 5 },
          desc: '5 Victory Points'
        },
        {
          stage: 3,
          cost: { clay: 4 },
          reward: { vp: 7 },
          desc: '7 Victory Points (Total 15 VP)'
        }
      ]
    },
    sideB: {
      stages: [
        {
          stage: 1,
          cost: { wood: 2 },
          reward: { vp: 3 },
          desc: '3 Victory Points'
        },
        {
          stage: 2,
          cost: { stone: 3 },
          reward: { vp: 5 },
          desc: '5 Victory Points'
        },
        {
          stage: 3,
          cost: { clay: 3 },
          reward: { vp: 5 },
          desc: '5 Victory Points'
        },
        {
          stage: 4,
          cost: { stone: 4, papyrus: 1 },
          reward: { vp: 7 },
          desc: '7 Victory Points (Total 20 VP)'
        }
      ]
    }
  }
};
