/**
 * 7 Wonders - Card Database
 * Authentic cards and distributions for Ages I, II, and III.
 * Supports scaling from 3 to 7 players with authentic chaining trees and costs.
 */

export const CARDS = [
  // ==================== AGE I ====================
  // Raw Materials (Brown)
  {
    id: 'lumber_yard_1_3',
    name: 'Lumber Yard',
    age: 1,
    type: 'brown',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['wood'] },
    desc: 'Produces 1 Wood'
  },
  {
    id: 'lumber_yard_1_4',
    name: 'Lumber Yard',
    age: 1,
    type: 'brown',
    minPlayers: 4,
    cost: {},
    benefit: { produces: ['wood'] },
    desc: 'Produces 1 Wood'
  },
  {
    id: 'stone_pit_1_3',
    name: 'Stone Pit',
    age: 1,
    type: 'brown',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['stone'] },
    desc: 'Produces 1 Stone'
  },
  {
    id: 'stone_pit_1_5',
    name: 'Stone Pit',
    age: 1,
    type: 'brown',
    minPlayers: 5,
    cost: {},
    benefit: { produces: ['stone'] },
    desc: 'Produces 1 Stone'
  },
  {
    id: 'clay_pool_1_3',
    name: 'Clay Pool',
    age: 1,
    type: 'brown',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['clay'] },
    desc: 'Produces 1 Clay'
  },
  {
    id: 'clay_pool_1_5',
    name: 'Clay Pool',
    age: 1,
    type: 'brown',
    minPlayers: 5,
    cost: {},
    benefit: { produces: ['clay'] },
    desc: 'Produces 1 Clay'
  },
  {
    id: 'ore_vein_1_3',
    name: 'Ore Vein',
    age: 1,
    type: 'brown',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['ore'] },
    desc: 'Produces 1 Ore'
  },
  {
    id: 'ore_vein_1_4',
    name: 'Ore Vein',
    age: 1,
    type: 'brown',
    minPlayers: 4,
    cost: {},
    benefit: { produces: ['ore'] },
    desc: 'Produces 1 Ore'
  },
  {
    id: 'tree_farm_1_6',
    name: 'Tree Farm',
    age: 1,
    type: 'brown',
    minPlayers: 6,
    cost: { coins: 1 },
    benefit: { producesSlash: ['wood', 'clay'] },
    desc: 'Produces 1 Wood OR 1 Clay'
  },
  {
    id: 'excavation_1_4',
    name: 'Excavation',
    age: 1,
    type: 'brown',
    minPlayers: 4,
    cost: { coins: 1 },
    benefit: { producesSlash: ['stone', 'clay'] },
    desc: 'Produces 1 Stone OR 1 Clay'
  },
  {
    id: 'clay_pit_1_3',
    name: 'Clay Pit',
    age: 1,
    type: 'brown',
    minPlayers: 3,
    cost: { coins: 1 },
    benefit: { producesSlash: ['clay', 'ore'] },
    desc: 'Produces 1 Clay OR 1 Ore'
  },
  {
    id: 'timber_yard_1_3',
    name: 'Timber Yard',
    age: 1,
    type: 'brown',
    minPlayers: 3,
    cost: { coins: 1 },
    benefit: { producesSlash: ['stone', 'wood'] },
    desc: 'Produces 1 Stone OR 1 Wood'
  },
  {
    id: 'forest_cave_1_5',
    name: 'Forest Cave',
    age: 1,
    type: 'brown',
    minPlayers: 5,
    cost: { coins: 1 },
    benefit: { producesSlash: ['wood', 'ore'] },
    desc: 'Produces 1 Wood OR 1 Ore'
  },
  {
    id: 'mine_1_6',
    name: 'Mine',
    age: 1,
    type: 'brown',
    minPlayers: 6,
    cost: { coins: 1 },
    benefit: { producesSlash: ['ore', 'stone'] },
    desc: 'Produces 1 Ore OR 1 Stone'
  },

  // Manufactured Goods (Gray)
  {
    id: 'loom_1_3',
    name: 'Loom',
    age: 1,
    type: 'gray',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['loom'] },
    desc: 'Produces 1 Loom'
  },
  {
    id: 'loom_1_6',
    name: 'Loom',
    age: 1,
    type: 'gray',
    minPlayers: 6,
    cost: {},
    benefit: { produces: ['loom'] },
    desc: 'Produces 1 Loom'
  },
  {
    id: 'glassworks_1_3',
    name: 'Glassworks',
    age: 1,
    type: 'gray',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['glass'] },
    desc: 'Produces 1 Glass'
  },
  {
    id: 'glassworks_1_6',
    name: 'Glassworks',
    age: 1,
    type: 'gray',
    minPlayers: 6,
    cost: {},
    benefit: { produces: ['glass'] },
    desc: 'Produces 1 Glass'
  },
  {
    id: 'press_1_3',
    name: 'Press',
    age: 1,
    type: 'gray',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['papyrus'] },
    desc: 'Produces 1 Papyrus'
  },
  {
    id: 'press_1_6',
    name: 'Press',
    age: 1,
    type: 'gray',
    minPlayers: 6,
    cost: {},
    benefit: { produces: ['papyrus'] },
    desc: 'Produces 1 Papyrus'
  },

  // Civilian Structures (Blue)
  {
    id: 'baths_1_3',
    name: 'Baths',
    age: 1,
    type: 'blue',
    minPlayers: 3,
    cost: { stone: 1 },
    benefit: { vp: 3 },
    chainsTo: ['Aqueduct'],
    desc: '3 Victory Points (Chains to Aqueduct)'
  },
  {
    id: 'baths_1_7',
    name: 'Baths',
    age: 1,
    type: 'blue',
    minPlayers: 7,
    cost: { stone: 1 },
    benefit: { vp: 3 },
    chainsTo: ['Aqueduct'],
    desc: '3 Victory Points (Chains to Aqueduct)'
  },
  {
    id: 'altar_1_3',
    name: 'Altar',
    age: 1,
    type: 'blue',
    minPlayers: 3,
    cost: {},
    benefit: { vp: 2 },
    chainsTo: ['Temple'],
    desc: '2 Victory Points (Chains to Temple)'
  },
  {
    id: 'altar_1_5',
    name: 'Altar',
    age: 1,
    type: 'blue',
    minPlayers: 5,
    cost: {},
    benefit: { vp: 2 },
    chainsTo: ['Temple'],
    desc: '2 Victory Points (Chains to Temple)'
  },
  {
    id: 'theater_1_3',
    name: 'Theater',
    age: 1,
    type: 'blue',
    minPlayers: 3,
    cost: {},
    benefit: { vp: 2 },
    chainsTo: ['Statue'],
    desc: '2 Victory Points (Chains to Statue)'
  },
  {
    id: 'theater_1_6',
    name: 'Theater',
    age: 1,
    type: 'blue',
    minPlayers: 6,
    cost: {},
    benefit: { vp: 2 },
    chainsTo: ['Statue'],
    desc: '2 Victory Points (Chains to Statue)'
  },
  {
    id: 'pawnbroker_1_4',
    name: 'Pawnbroker',
    age: 1,
    type: 'blue',
    minPlayers: 4,
    cost: {},
    benefit: { vp: 3 },
    desc: '3 Victory Points'
  },
  {
    id: 'pawnbroker_1_7',
    name: 'Pawnbroker',
    age: 1,
    type: 'blue',
    minPlayers: 7,
    cost: {},
    benefit: { vp: 3 },
    desc: '3 Victory Points'
  },

  // Commercial Structures (Yellow)
  {
    id: 'tavern_1_4',
    name: 'Tavern',
    age: 1,
    type: 'yellow',
    minPlayers: 4,
    cost: {},
    benefit: { coins: 5 },
    desc: 'Gain 5 Coins immediately'
  },
  {
    id: 'tavern_1_5',
    name: 'Tavern',
    age: 1,
    type: 'yellow',
    minPlayers: 5,
    cost: {},
    benefit: { coins: 5 },
    desc: 'Gain 5 Coins immediately'
  },
  {
    id: 'tavern_1_7',
    name: 'Tavern',
    age: 1,
    type: 'yellow',
    minPlayers: 7,
    cost: {},
    benefit: { coins: 5 },
    desc: 'Gain 5 Coins immediately'
  },
  {
    id: 'east_trading_post_1_3',
    name: 'East Trading Post',
    age: 1,
    type: 'yellow',
    minPlayers: 3,
    cost: {},
    benefit: { tradeDiscount: 'right_raw' },
    chainsTo: ['Forum'],
    desc: 'Buy raw materials from right neighbor for 1 coin (Chains to Forum)'
  },
  {
    id: 'east_trading_post_1_7',
    name: 'East Trading Post',
    age: 1,
    type: 'yellow',
    minPlayers: 7,
    cost: {},
    benefit: { tradeDiscount: 'right_raw' },
    chainsTo: ['Forum'],
    desc: 'Buy raw materials from right neighbor for 1 coin (Chains to Forum)'
  },
  {
    id: 'west_trading_post_1_3',
    name: 'West Trading Post',
    age: 1,
    type: 'yellow',
    minPlayers: 3,
    cost: {},
    benefit: { tradeDiscount: 'left_raw' },
    chainsTo: ['Forum'],
    desc: 'Buy raw materials from left neighbor for 1 coin (Chains to Forum)'
  },
  {
    id: 'west_trading_post_1_7',
    name: 'West Trading Post',
    age: 1,
    type: 'yellow',
    minPlayers: 7,
    cost: {},
    benefit: { tradeDiscount: 'left_raw' },
    chainsTo: ['Forum'],
    desc: 'Buy raw materials from left neighbor for 1 coin (Chains to Forum)'
  },
  {
    id: 'marketplace_1_3',
    name: 'Marketplace',
    age: 1,
    type: 'yellow',
    minPlayers: 3,
    cost: {},
    benefit: { tradeDiscount: 'both_goods' },
    chainsTo: ['Caravansery'],
    desc: 'Buy manufactured goods from neighbors for 1 coin (Chains to Caravansery)'
  },
  {
    id: 'marketplace_1_6',
    name: 'Marketplace',
    age: 1,
    type: 'yellow',
    minPlayers: 6,
    cost: {},
    benefit: { tradeDiscount: 'both_goods' },
    chainsTo: ['Caravansery'],
    desc: 'Buy manufactured goods from neighbors for 1 coin (Chains to Caravansery)'
  },

  // Military Structures (Red)
  {
    id: 'stockade_1_3',
    name: 'Stockade',
    age: 1,
    type: 'red',
    minPlayers: 3,
    cost: { wood: 1 },
    benefit: { shields: 1 },
    desc: '1 Military Shield'
  },
  {
    id: 'stockade_1_7',
    name: 'Stockade',
    age: 1,
    type: 'red',
    minPlayers: 7,
    cost: { wood: 1 },
    benefit: { shields: 1 },
    desc: '1 Military Shield'
  },
  {
    id: 'barracks_1_3',
    name: 'Barracks',
    age: 1,
    type: 'red',
    minPlayers: 3,
    cost: { ore: 1 },
    benefit: { shields: 1 },
    desc: '1 Military Shield'
  },
  {
    id: 'barracks_1_5',
    name: 'Barracks',
    age: 1,
    type: 'red',
    minPlayers: 5,
    cost: { ore: 1 },
    benefit: { shields: 1 },
    desc: '1 Military Shield'
  },
  {
    id: 'guard_tower_1_3',
    name: 'Guard Tower',
    age: 1,
    type: 'red',
    minPlayers: 3,
    cost: { clay: 1 },
    benefit: { shields: 1 },
    desc: '1 Military Shield'
  },
  {
    id: 'guard_tower_1_4',
    name: 'Guard Tower',
    age: 1,
    type: 'red',
    minPlayers: 4,
    cost: { clay: 1 },
    benefit: { shields: 1 },
    desc: '1 Military Shield'
  },

  // Scientific Structures (Green)
  {
    id: 'apothecary_1_3',
    name: 'Apothecary',
    age: 1,
    type: 'green',
    minPlayers: 3,
    cost: { loom: 1 },
    benefit: { symbol: 'compass' },
    chainsTo: ['Stables', 'Dispensary'],
    desc: 'Compass Science Symbol (Chains to Stables, Dispensary)'
  },
  {
    id: 'apothecary_1_5',
    name: 'Apothecary',
    age: 1,
    type: 'green',
    minPlayers: 5,
    cost: { loom: 1 },
    benefit: { symbol: 'compass' },
    chainsTo: ['Stables', 'Dispensary'],
    desc: 'Compass Science Symbol (Chains to Stables, Dispensary)'
  },
  {
    id: 'workshop_1_3',
    name: 'Workshop',
    age: 1,
    type: 'green',
    minPlayers: 3,
    cost: { glass: 1 },
    benefit: { symbol: 'gear' },
    chainsTo: ['Archery Range', 'Laboratory'],
    desc: 'Gear Science Symbol (Chains to Archery Range, Laboratory)'
  },
  {
    id: 'workshop_1_7',
    name: 'Workshop',
    age: 1,
    type: 'green',
    minPlayers: 7,
    cost: { glass: 1 },
    benefit: { symbol: 'gear' },
    chainsTo: ['Archery Range', 'Laboratory'],
    desc: 'Gear Science Symbol (Chains to Archery Range, Laboratory)'
  },
  {
    id: 'scriptorium_1_3',
    name: 'Scriptorium',
    age: 1,
    type: 'green',
    minPlayers: 3,
    cost: { papyrus: 1 },
    benefit: { symbol: 'tablet' },
    chainsTo: ['Courthouse', 'Library'],
    desc: 'Tablet Science Symbol (Chains to Courthouse, Library)'
  },
  {
    id: 'scriptorium_1_4',
    name: 'Scriptorium',
    age: 1,
    type: 'green',
    minPlayers: 4,
    cost: { papyrus: 1 },
    benefit: { symbol: 'tablet' },
    chainsTo: ['Courthouse', 'Library'],
    desc: 'Tablet Science Symbol (Chains to Courthouse, Library)'
  },


  // ==================== AGE II ====================
  // Raw Materials (Brown)
  {
    id: 'sawmill_2_3',
    name: 'Sawmill',
    age: 2,
    type: 'brown',
    minPlayers: 3,
    cost: { coins: 1 },
    benefit: { produces: ['wood', 'wood'] },
    desc: 'Produces 2 Wood'
  },
  {
    id: 'sawmill_2_4',
    name: 'Sawmill',
    age: 2,
    type: 'brown',
    minPlayers: 4,
    cost: { coins: 1 },
    benefit: { produces: ['wood', 'wood'] },
    desc: 'Produces 2 Wood'
  },
  {
    id: 'quarry_2_3',
    name: 'Quarry',
    age: 2,
    type: 'brown',
    minPlayers: 3,
    cost: { coins: 1 },
    benefit: { produces: ['stone', 'stone'] },
    desc: 'Produces 2 Stone'
  },
  {
    id: 'quarry_2_4',
    name: 'Quarry',
    age: 2,
    type: 'brown',
    minPlayers: 4,
    cost: { coins: 1 },
    benefit: { produces: ['stone', 'stone'] },
    desc: 'Produces 2 Stone'
  },
  {
    id: 'brickyard_2_3',
    name: 'Brickyard',
    age: 2,
    type: 'brown',
    minPlayers: 3,
    cost: { coins: 1 },
    benefit: { produces: ['clay', 'clay'] },
    desc: 'Produces 2 Clay'
  },
  {
    id: 'brickyard_2_4',
    name: 'Brickyard',
    age: 2,
    type: 'brown',
    minPlayers: 4,
    cost: { coins: 1 },
    benefit: { produces: ['clay', 'clay'] },
    desc: 'Produces 2 Clay'
  },
  {
    id: 'foundry_2_3',
    name: 'Foundry',
    age: 2,
    type: 'brown',
    minPlayers: 3,
    cost: { coins: 1 },
    benefit: { produces: ['ore', 'ore'] },
    desc: 'Produces 2 Ore'
  },
  {
    id: 'foundry_2_4',
    name: 'Foundry',
    age: 2,
    type: 'brown',
    minPlayers: 4,
    cost: { coins: 1 },
    benefit: { produces: ['ore', 'ore'] },
    desc: 'Produces 2 Ore'
  },

  // Manufactured Goods (Gray)
  {
    id: 'loom_2_3',
    name: 'Loom',
    age: 2,
    type: 'gray',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['loom'] },
    desc: 'Produces 1 Loom'
  },
  {
    id: 'loom_2_5',
    name: 'Loom',
    age: 2,
    type: 'gray',
    minPlayers: 5,
    cost: {},
    benefit: { produces: ['loom'] },
    desc: 'Produces 1 Loom'
  },
  {
    id: 'glassworks_2_3',
    name: 'Glassworks',
    age: 2,
    type: 'gray',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['glass'] },
    desc: 'Produces 1 Glass'
  },
  {
    id: 'glassworks_2_5',
    name: 'Glassworks',
    age: 2,
    type: 'gray',
    minPlayers: 5,
    cost: {},
    benefit: { produces: ['glass'] },
    desc: 'Produces 1 Glass'
  },
  {
    id: 'press_2_3',
    name: 'Press',
    age: 2,
    type: 'gray',
    minPlayers: 3,
    cost: {},
    benefit: { produces: ['papyrus'] },
    desc: 'Produces 1 Papyrus'
  },
  {
    id: 'press_2_5',
    name: 'Press',
    age: 2,
    type: 'gray',
    minPlayers: 5,
    cost: {},
    benefit: { produces: ['papyrus'] },
    desc: 'Produces 1 Papyrus'
  },

  // Civilian Structures (Blue)
  {
    id: 'aqueduct_2_3',
    name: 'Aqueduct',
    age: 2,
    type: 'blue',
    minPlayers: 3,
    cost: { stone: 3 },
    freeWith: ['Baths'],
    benefit: { vp: 5 },
    desc: '5 Victory Points (Free with Baths)'
  },
  {
    id: 'aqueduct_2_7',
    name: 'Aqueduct',
    age: 2,
    type: 'blue',
    minPlayers: 7,
    cost: { stone: 3 },
    freeWith: ['Baths'],
    benefit: { vp: 5 },
    desc: '5 Victory Points (Free with Baths)'
  },
  {
    id: 'temple_2_3',
    name: 'Temple',
    age: 2,
    type: 'blue',
    minPlayers: 3,
    cost: { wood: 1, clay: 1, glass: 1 },
    freeWith: ['Altar'],
    benefit: { vp: 4 },
    chainsTo: ['Pantheon'],
    desc: '4 Victory Points (Free with Altar, Chains to Pantheon)'
  },
  {
    id: 'temple_2_6',
    name: 'Temple',
    age: 2,
    type: 'blue',
    minPlayers: 6,
    cost: { wood: 1, clay: 1, glass: 1 },
    freeWith: ['Altar'],
    benefit: { vp: 4 },
    chainsTo: ['Pantheon'],
    desc: '4 Victory Points (Free with Altar, Chains to Pantheon)'
  },
  {
    id: 'statue_2_3',
    name: 'Statue',
    age: 2,
    type: 'blue',
    minPlayers: 3,
    cost: { ore: 2, wood: 1 },
    freeWith: ['Theater'],
    benefit: { vp: 4 },
    chainsTo: ['Gardens'],
    desc: '4 Victory Points (Free with Theater, Chains to Gardens)'
  },
  {
    id: 'statue_2_7',
    name: 'Statue',
    age: 2,
    type: 'blue',
    minPlayers: 7,
    cost: { ore: 2, wood: 1 },
    freeWith: ['Theater'],
    benefit: { vp: 4 },
    chainsTo: ['Gardens'],
    desc: '4 Victory Points (Free with Theater, Chains to Gardens)'
  },
  {
    id: 'courthouse_2_3',
    name: 'Courthouse',
    age: 2,
    type: 'blue',
    minPlayers: 3,
    cost: { clay: 2, loom: 1 },
    freeWith: ['Scriptorium'],
    benefit: { vp: 4 },
    desc: '4 Victory Points (Free with Scriptorium)'
  },
  {
    id: 'courthouse_2_5',
    name: 'Courthouse',
    age: 2,
    type: 'blue',
    minPlayers: 5,
    cost: { clay: 2, loom: 1 },
    freeWith: ['Scriptorium'],
    benefit: { vp: 4 },
    desc: '4 Victory Points (Free with Scriptorium)'
  },

  // Commercial Structures (Yellow)
  {
    id: 'forum_2_3',
    name: 'Forum',
    age: 2,
    type: 'yellow',
    minPlayers: 3,
    cost: { clay: 2 },
    freeWith: ['East Trading Post', 'West Trading Post'],
    benefit: { producesSlash: ['glass', 'loom', 'papyrus'] },
    chainsTo: ['Haven'],
    desc: 'Produces 1 Glass, Loom, OR Papyrus each turn (Free with Trading Post, Chains to Haven)'
  },
  {
    id: 'forum_2_6',
    name: 'Forum',
    age: 2,
    type: 'yellow',
    minPlayers: 6,
    cost: { clay: 2 },
    freeWith: ['East Trading Post', 'West Trading Post'],
    benefit: { producesSlash: ['glass', 'loom', 'papyrus'] },
    chainsTo: ['Haven'],
    desc: 'Produces 1 Glass, Loom, OR Papyrus each turn (Free with Trading Post, Chains to Haven)'
  },
  {
    id: 'forum_2_7',
    name: 'Forum',
    age: 2,
    type: 'yellow',
    minPlayers: 7,
    cost: { clay: 2 },
    freeWith: ['East Trading Post', 'West Trading Post'],
    benefit: { producesSlash: ['glass', 'loom', 'papyrus'] },
    chainsTo: ['Haven'],
    desc: 'Produces 1 Glass, Loom, OR Papyrus each turn (Free with Trading Post, Chains to Haven)'
  },
  {
    id: 'caravansery_2_3',
    name: 'Caravansery',
    age: 2,
    type: 'yellow',
    minPlayers: 3,
    cost: { wood: 2 },
    freeWith: ['Marketplace'],
    benefit: { producesSlash: ['wood', 'stone', 'ore', 'clay'] },
    chainsTo: ['Lighthouse'],
    desc: 'Produces 1 Wood, Stone, Ore, OR Clay each turn (Free with Marketplace, Chains to Lighthouse)'
  },
  {
    id: 'caravansery_2_5',
    name: 'Caravansery',
    age: 2,
    type: 'yellow',
    minPlayers: 5,
    cost: { wood: 2 },
    freeWith: ['Marketplace'],
    benefit: { producesSlash: ['wood', 'stone', 'ore', 'clay'] },
    chainsTo: ['Lighthouse'],
    desc: 'Produces 1 Wood, Stone, Ore, OR Clay each turn (Free with Marketplace, Chains to Lighthouse)'
  },
  {
    id: 'caravansery_2_6',
    name: 'Caravansery',
    age: 2,
    type: 'yellow',
    minPlayers: 6,
    cost: { wood: 2 },
    freeWith: ['Marketplace'],
    benefit: { producesSlash: ['wood', 'stone', 'ore', 'clay'] },
    chainsTo: ['Lighthouse'],
    desc: 'Produces 1 Wood, Stone, Ore, OR Clay each turn (Free with Marketplace, Chains to Lighthouse)'
  },
  {
    id: 'vineyard_2_3',
    name: 'Vineyard',
    age: 2,
    type: 'yellow',
    minPlayers: 3,
    cost: {},
    benefit: { coinsPerNeighborCard: { type: 'brown', multiplier: 1, ownBonus: 1 } },
    desc: 'Gain 1 Coin per raw material card built by you and your neighbors'
  },
  {
    id: 'vineyard_2_6',
    name: 'Vineyard',
    age: 2,
    type: 'yellow',
    minPlayers: 6,
    cost: {},
    benefit: { coinsPerNeighborCard: { type: 'brown', multiplier: 1, ownBonus: 1 } },
    desc: 'Gain 1 Coin per raw material card built by you and your neighbors'
  },
  {
    id: 'bazaar_2_4',
    name: 'Bazaar',
    age: 2,
    type: 'yellow',
    minPlayers: 4,
    cost: {},
    benefit: { coinsPerNeighborCard: { type: 'gray', multiplier: 2, ownBonus: 2 } },
    desc: 'Gain 2 Coins per manufactured goods card built by you and your neighbors'
  },
  {
    id: 'bazaar_2_7',
    name: 'Bazaar',
    age: 2,
    type: 'yellow',
    minPlayers: 7,
    cost: {},
    benefit: { coinsPerNeighborCard: { type: 'gray', multiplier: 2, ownBonus: 2 } },
    desc: 'Gain 2 Coins per manufactured goods card built by you and your neighbors'
  },

  // Military Structures (Red)
  {
    id: 'walls_2_3',
    name: 'Walls',
    age: 2,
    type: 'red',
    minPlayers: 3,
    cost: { stone: 3 },
    benefit: { shields: 2 },
    chainsTo: ['Fortifications'],
    desc: '2 Military Shields (Chains to Fortifications)'
  },
  {
    id: 'walls_2_7',
    name: 'Walls',
    age: 2,
    type: 'red',
    minPlayers: 7,
    cost: { stone: 3 },
    benefit: { shields: 2 },
    chainsTo: ['Fortifications'],
    desc: '2 Military Shields (Chains to Fortifications)'
  },
  {
    id: 'stables_2_3',
    name: 'Stables',
    age: 2,
    type: 'red',
    minPlayers: 3,
    cost: { clay: 1, wood: 1, ore: 1 },
    freeWith: ['Apothecary'],
    benefit: { shields: 2 },
    desc: '2 Military Shields (Free with Apothecary)'
  },
  {
    id: 'stables_2_5',
    name: 'Stables',
    age: 2,
    type: 'red',
    minPlayers: 5,
    cost: { clay: 1, wood: 1, ore: 1 },
    freeWith: ['Apothecary'],
    benefit: { shields: 2 },
    desc: '2 Military Shields (Free with Apothecary)'
  },
  {
    id: 'archery_range_2_3',
    name: 'Archery Range',
    age: 2,
    type: 'red',
    minPlayers: 3,
    cost: { wood: 2, ore: 1 },
    freeWith: ['Workshop'],
    benefit: { shields: 2 },
    desc: '2 Military Shields (Free with Workshop)'
  },
  {
    id: 'archery_range_2_6',
    name: 'Archery Range',
    age: 2,
    type: 'red',
    minPlayers: 6,
    cost: { wood: 2, ore: 1 },
    freeWith: ['Workshop'],
    benefit: { shields: 2 },
    desc: '2 Military Shields (Free with Workshop)'
  },
  {
    id: 'training_ground_2_4',
    name: 'Training Ground',
    age: 2,
    type: 'red',
    minPlayers: 4,
    cost: { ore: 2, wood: 1 },
    benefit: { shields: 2 },
    chainsTo: ['Circus'],
    desc: '2 Military Shields (Chains to Circus)'
  },
  {
    id: 'training_ground_2_6',
    name: 'Training Ground',
    age: 2,
    type: 'red',
    minPlayers: 6,
    cost: { ore: 2, wood: 1 },
    benefit: { shields: 2 },
    chainsTo: ['Circus'],
    desc: '2 Military Shields (Chains to Circus)'
  },
  {
    id: 'training_ground_2_7',
    name: 'Training Ground',
    age: 2,
    type: 'red',
    minPlayers: 7,
    cost: { ore: 2, wood: 1 },
    benefit: { shields: 2 },
    chainsTo: ['Circus'],
    desc: '2 Military Shields (Chains to Circus)'
  },

  // Scientific Structures (Green)
  {
    id: 'dispensary_2_3',
    name: 'Dispensary',
    age: 2,
    type: 'green',
    minPlayers: 3,
    cost: { ore: 2, glass: 1 },
    freeWith: ['Apothecary'],
    benefit: { symbol: 'compass' },
    chainsTo: ['Arena', 'Lodge'],
    desc: 'Compass Science Symbol (Free with Apothecary, Chains to Arena, Lodge)'
  },
  {
    id: 'dispensary_2_4',
    name: 'Dispensary',
    age: 2,
    type: 'green',
    minPlayers: 4,
    cost: { ore: 2, glass: 1 },
    freeWith: ['Apothecary'],
    benefit: { symbol: 'compass' },
    chainsTo: ['Arena', 'Lodge'],
    desc: 'Compass Science Symbol (Free with Apothecary, Chains to Arena, Lodge)'
  },
  {
    id: 'laboratory_2_3',
    name: 'Laboratory',
    age: 2,
    type: 'green',
    minPlayers: 3,
    cost: { clay: 2, papyrus: 1 },
    freeWith: ['Workshop'],
    benefit: { symbol: 'gear' },
    chainsTo: ['Siege Workshop', 'Observatory'],
    desc: 'Gear Science Symbol (Free with Workshop, Chains to Siege Workshop, Observatory)'
  },
  {
    id: 'laboratory_2_5',
    name: 'Laboratory',
    age: 2,
    type: 'green',
    minPlayers: 5,
    cost: { clay: 2, papyrus: 1 },
    freeWith: ['Workshop'],
    benefit: { symbol: 'gear' },
    chainsTo: ['Siege Workshop', 'Observatory'],
    desc: 'Gear Science Symbol (Free with Workshop, Chains to Siege Workshop, Observatory)'
  },
  {
    id: 'library_2_3',
    name: 'Library',
    age: 2,
    type: 'green',
    minPlayers: 3,
    cost: { stone: 2, loom: 1 },
    freeWith: ['Scriptorium'],
    benefit: { symbol: 'tablet' },
    chainsTo: ['Senate', 'University'],
    desc: 'Tablet Science Symbol (Free with Scriptorium, Chains to Senate, University)'
  },
  {
    id: 'library_2_6',
    name: 'Library',
    age: 2,
    type: 'green',
    minPlayers: 6,
    cost: { stone: 2, loom: 1 },
    freeWith: ['Scriptorium'],
    benefit: { symbol: 'tablet' },
    chainsTo: ['Senate', 'University'],
    desc: 'Tablet Science Symbol (Free with Scriptorium, Chains to Senate, University)'
  },
  {
    id: 'school_2_3',
    name: 'School',
    age: 2,
    type: 'green',
    minPlayers: 3,
    cost: { wood: 1, papyrus: 1 },
    benefit: { symbol: 'tablet' },
    chainsTo: ['Academy', 'Study'],
    desc: 'Tablet Science Symbol (Chains to Academy, Study)'
  },
  {
    id: 'school_2_7',
    name: 'School',
    age: 2,
    type: 'green',
    minPlayers: 7,
    cost: { wood: 1, papyrus: 1 },
    benefit: { symbol: 'tablet' },
    chainsTo: ['Academy', 'Study'],
    desc: 'Tablet Science Symbol (Chains to Academy, Study)'
  },


  // ==================== AGE III ====================
  // Civilian Structures (Blue)
  {
    id: 'pantheon_3_3',
    name: 'Pantheon',
    age: 3,
    type: 'blue',
    minPlayers: 3,
    cost: { clay: 2, ore: 1, glass: 1, papyrus: 1, loom: 1 },
    freeWith: ['Temple'],
    benefit: { vp: 7 },
    desc: '7 Victory Points (Free with Temple)'
  },
  {
    id: 'pantheon_3_6',
    name: 'Pantheon',
    age: 3,
    type: 'blue',
    minPlayers: 6,
    cost: { clay: 2, ore: 1, glass: 1, papyrus: 1, loom: 1 },
    freeWith: ['Temple'],
    benefit: { vp: 7 },
    desc: '7 Victory Points (Free with Temple)'
  },
  {
    id: 'gardens_3_3',
    name: 'Gardens',
    age: 3,
    type: 'blue',
    minPlayers: 3,
    cost: { clay: 2, wood: 1 },
    freeWith: ['Statue'],
    benefit: { vp: 5 },
    desc: '5 Victory Points (Free with Statue)'
  },
  {
    id: 'gardens_3_4',
    name: 'Gardens',
    age: 3,
    type: 'blue',
    minPlayers: 4,
    cost: { clay: 2, wood: 1 },
    freeWith: ['Statue'],
    benefit: { vp: 5 },
    desc: '5 Victory Points (Free with Statue)'
  },
  {
    id: 'town_hall_3_3',
    name: 'Town Hall',
    age: 3,
    type: 'blue',
    minPlayers: 3,
    cost: { stone: 2, ore: 1, glass: 1 },
    benefit: { vp: 6 },
    desc: '6 Victory Points'
  },
  {
    id: 'town_hall_3_5',
    name: 'Town Hall',
    age: 3,
    type: 'blue',
    minPlayers: 5,
    cost: { stone: 2, ore: 1, glass: 1 },
    benefit: { vp: 6 },
    desc: '6 Victory Points'
  },
  {
    id: 'town_hall_3_6',
    name: 'Town Hall',
    age: 3,
    type: 'blue',
    minPlayers: 6,
    cost: { stone: 2, ore: 1, glass: 1 },
    benefit: { vp: 6 },
    desc: '6 Victory Points'
  },
  {
    id: 'palace_3_3',
    name: 'Palace',
    age: 3,
    type: 'blue',
    minPlayers: 3,
    cost: { stone: 1, wood: 1, ore: 1, clay: 1, glass: 1, loom: 1, papyrus: 1 },
    benefit: { vp: 8 },
    desc: '8 Victory Points'
  },
  {
    id: 'palace_3_7',
    name: 'Palace',
    age: 3,
    type: 'blue',
    minPlayers: 7,
    cost: { stone: 1, wood: 1, ore: 1, clay: 1, glass: 1, loom: 1, papyrus: 1 },
    benefit: { vp: 8 },
    desc: '8 Victory Points'
  },
  {
    id: 'senate_3_3',
    name: 'Senate',
    age: 3,
    type: 'blue',
    minPlayers: 3,
    cost: { wood: 2, stone: 1, ore: 1 },
    freeWith: ['Library'],
    benefit: { vp: 6 },
    desc: '6 Victory Points (Free with Library)'
  },
  {
    id: 'senate_3_5',
    name: 'Senate',
    age: 3,
    type: 'blue',
    minPlayers: 5,
    cost: { wood: 2, stone: 1, ore: 1 },
    freeWith: ['Library'],
    benefit: { vp: 6 },
    desc: '6 Victory Points (Free with Library)'
  },

  // Commercial Structures (Yellow)
  {
    id: 'haven_3_3',
    name: 'Haven',
    age: 3,
    type: 'yellow',
    minPlayers: 3,
    cost: { wood: 1, ore: 1, loom: 1 },
    freeWith: ['Forum'],
    benefit: { coinsPerOwnCard: { type: 'brown', coins: 1, vp: 1 } },
    desc: 'Gain 1 Coin & 1 VP per brown card in your city (Free with Forum)'
  },
  {
    id: 'haven_3_4',
    name: 'Haven',
    age: 3,
    type: 'yellow',
    minPlayers: 4,
    cost: { wood: 1, ore: 1, loom: 1 },
    freeWith: ['Forum'],
    benefit: { coinsPerOwnCard: { type: 'brown', coins: 1, vp: 1 } },
    desc: 'Gain 1 Coin & 1 VP per brown card in your city (Free with Forum)'
  },
  {
    id: 'lighthouse_3_3',
    name: 'Lighthouse',
    age: 3,
    type: 'yellow',
    minPlayers: 3,
    cost: { stone: 1, glass: 1 },
    freeWith: ['Caravansery'],
    benefit: { coinsPerOwnCard: { type: 'yellow', coins: 1, vp: 1 } },
    desc: 'Gain 1 Coin & 1 VP per yellow card in your city (Free with Caravansery)'
  },
  {
    id: 'lighthouse_3_6',
    name: 'Lighthouse',
    age: 3,
    type: 'yellow',
    minPlayers: 6,
    cost: { stone: 1, glass: 1 },
    freeWith: ['Caravansery'],
    benefit: { coinsPerOwnCard: { type: 'yellow', coins: 1, vp: 1 } },
    desc: 'Gain 1 Coin & 1 VP per yellow card in your city (Free with Caravansery)'
  },
  {
    id: 'chamber_of_commerce_3_4',
    name: 'Chamber of Commerce',
    age: 3,
    type: 'yellow',
    minPlayers: 4,
    cost: { clay: 2, papyrus: 1 },
    benefit: { coinsPerOwnCard: { type: 'gray', coins: 2, vp: 2 } },
    desc: 'Gain 2 Coins & 2 VP per gray card in your city'
  },
  {
    id: 'chamber_of_commerce_3_6',
    name: 'Chamber of Commerce',
    age: 3,
    type: 'yellow',
    minPlayers: 6,
    cost: { clay: 2, papyrus: 1 },
    benefit: { coinsPerOwnCard: { type: 'gray', coins: 2, vp: 2 } },
    desc: 'Gain 2 Coins & 2 VP per gray card in your city'
  },
  {
    id: 'arena_3_3',
    name: 'Arena',
    age: 3,
    type: 'yellow',
    minPlayers: 3,
    cost: { stone: 2, ore: 1 },
    freeWith: ['Dispensary'],
    benefit: { coinsPerWonderStage: { coins: 3, vp: 1 } },
    desc: 'Gain 3 Coins & 1 VP per built wonder stage in your city (Free with Dispensary)'
  },
  {
    id: 'arena_3_5',
    name: 'Arena',
    age: 3,
    type: 'yellow',
    minPlayers: 5,
    cost: { stone: 2, ore: 1 },
    freeWith: ['Dispensary'],
    benefit: { coinsPerWonderStage: { coins: 3, vp: 1 } },
    desc: 'Gain 3 Coins & 1 VP per built wonder stage in your city (Free with Dispensary)'
  },
  {
    id: 'arena_3_7',
    name: 'Arena',
    age: 3,
    type: 'yellow',
    minPlayers: 7,
    cost: { stone: 2, ore: 1 },
    freeWith: ['Dispensary'],
    benefit: { coinsPerWonderStage: { coins: 3, vp: 1 } },
    desc: 'Gain 3 Coins & 1 VP per built wonder stage in your city (Free with Dispensary)'
  },

  // Military Structures (Red)
  {
    id: 'fortifications_3_3',
    name: 'Fortifications',
    age: 3,
    type: 'red',
    minPlayers: 3,
    cost: { ore: 3, stone: 1 },
    freeWith: ['Walls'],
    benefit: { shields: 3 },
    desc: '3 Military Shields (Free with Walls)'
  },
  {
    id: 'fortifications_3_7',
    name: 'Fortifications',
    age: 3,
    type: 'red',
    minPlayers: 7,
    cost: { ore: 3, stone: 1 },
    freeWith: ['Walls'],
    benefit: { shields: 3 },
    desc: '3 Military Shields (Free with Walls)'
  },
  {
    id: 'circus_3_4',
    name: 'Circus',
    age: 3,
    type: 'red',
    minPlayers: 4,
    cost: { stone: 3, ore: 1 },
    freeWith: ['Training Ground'],
    benefit: { shields: 3 },
    desc: '3 Military Shields (Free with Training Ground)'
  },
  {
    id: 'circus_3_5',
    name: 'Circus',
    age: 3,
    type: 'red',
    minPlayers: 5,
    cost: { stone: 3, ore: 1 },
    freeWith: ['Training Ground'],
    benefit: { shields: 3 },
    desc: '3 Military Shields (Free with Training Ground)'
  },
  {
    id: 'circus_3_6',
    name: 'Circus',
    age: 3,
    type: 'red',
    minPlayers: 6,
    cost: { stone: 3, ore: 1 },
    freeWith: ['Training Ground'],
    benefit: { shields: 3 },
    desc: '3 Military Shields (Free with Training Ground)'
  },
  {
    id: 'arsenal_3_3',
    name: 'Arsenal',
    age: 3,
    type: 'red',
    minPlayers: 3,
    cost: { wood: 2, ore: 1, loom: 1 },
    benefit: { shields: 3 },
    desc: '3 Military Shields'
  },
  {
    id: 'arsenal_3_4',
    name: 'Arsenal',
    age: 3,
    type: 'red',
    minPlayers: 4,
    cost: { wood: 2, ore: 1, loom: 1 },
    benefit: { shields: 3 },
    desc: '3 Military Shields'
  },
  {
    id: 'arsenal_3_7',
    name: 'Arsenal',
    age: 3,
    type: 'red',
    minPlayers: 7,
    cost: { wood: 2, ore: 1, loom: 1 },
    benefit: { shields: 3 },
    desc: '3 Military Shields'
  },
  {
    id: 'siege_workshop_3_3',
    name: 'Siege Workshop',
    age: 3,
    type: 'red',
    minPlayers: 3,
    cost: { clay: 3, wood: 1 },
    freeWith: ['Laboratory'],
    benefit: { shields: 3 },
    desc: '3 Military Shields (Free with Laboratory)'
  },
  {
    id: 'siege_workshop_3_5',
    name: 'Siege Workshop',
    age: 3,
    type: 'red',
    minPlayers: 5,
    cost: { clay: 3, wood: 1 },
    freeWith: ['Laboratory'],
    benefit: { shields: 3 },
    desc: '3 Military Shields (Free with Laboratory)'
  },

  // Scientific Structures (Green)
  {
    id: 'lodge_3_3',
    name: 'Lodge',
    age: 3,
    type: 'green',
    minPlayers: 3,
    cost: { clay: 2, loom: 1, papyrus: 1 },
    freeWith: ['Dispensary'],
    benefit: { symbol: 'compass' },
    desc: 'Compass Science Symbol (Free with Dispensary)'
  },
  {
    id: 'lodge_3_6',
    name: 'Lodge',
    age: 3,
    type: 'green',
    minPlayers: 6,
    cost: { clay: 2, loom: 1, papyrus: 1 },
    freeWith: ['Dispensary'],
    benefit: { symbol: 'compass' },
    desc: 'Compass Science Symbol (Free with Dispensary)'
  },
  {
    id: 'observatory_3_3',
    name: 'Observatory',
    age: 3,
    type: 'green',
    minPlayers: 3,
    cost: { ore: 2, glass: 1, loom: 1 },
    freeWith: ['Laboratory'],
    benefit: { symbol: 'gear' },
    desc: 'Gear Science Symbol (Free with Laboratory)'
  },
  {
    id: 'observatory_3_7',
    name: 'Observatory',
    age: 3,
    type: 'green',
    minPlayers: 7,
    cost: { ore: 2, glass: 1, loom: 1 },
    freeWith: ['Laboratory'],
    benefit: { symbol: 'gear' },
    desc: 'Gear Science Symbol (Free with Laboratory)'
  },
  {
    id: 'university_3_3',
    name: 'University',
    age: 3,
    type: 'green',
    minPlayers: 3,
    cost: { wood: 2, papyrus: 1, glass: 1 },
    freeWith: ['Library'],
    benefit: { symbol: 'tablet' },
    desc: 'Tablet Science Symbol (Free with Library)'
  },
  {
    id: 'university_3_4',
    name: 'University',
    age: 3,
    type: 'green',
    minPlayers: 4,
    cost: { wood: 2, papyrus: 1, glass: 1 },
    freeWith: ['Library'],
    benefit: { symbol: 'tablet' },
    desc: 'Tablet Science Symbol (Free with Library)'
  },
  {
    id: 'academy_3_3',
    name: 'Academy',
    age: 3,
    type: 'green',
    minPlayers: 3,
    cost: { stone: 3, glass: 1 },
    freeWith: ['School'],
    benefit: { symbol: 'compass' },
    desc: 'Compass Science Symbol (Free with School)'
  },
  {
    id: 'academy_3_7',
    name: 'Academy',
    age: 3,
    type: 'green',
    minPlayers: 7,
    cost: { stone: 3, glass: 1 },
    freeWith: ['School'],
    benefit: { symbol: 'compass' },
    desc: 'Compass Science Symbol (Free with School)'
  },
  {
    id: 'study_3_3',
    name: 'Study',
    age: 3,
    type: 'green',
    minPlayers: 3,
    cost: { wood: 1, papyrus: 1, loom: 1 },
    freeWith: ['School'],
    benefit: { symbol: 'gear' },
    desc: 'Gear Science Symbol (Free with School)'
  },
  {
    id: 'study_3_5',
    name: 'Study',
    age: 3,
    type: 'green',
    minPlayers: 5,
    cost: { wood: 1, papyrus: 1, loom: 1 },
    freeWith: ['School'],
    benefit: { symbol: 'gear' },
    desc: 'Gear Science Symbol (Free with School)'
  }
];

// Complete Guild Cards (Purple)
export const GUILD_CARDS = [
  {
    id: 'workers_guild',
    name: 'Workers Guild',
    age: 3,
    type: 'purple',
    cost: { ore: 2, clay: 1, stone: 1, wood: 1 },
    benefit: { vpPerNeighborCard: { type: 'brown', multiplier: 1 } },
    desc: '1 VP for each Raw Material (Brown) in neighbor cities'
  },
  {
    id: 'craftsmens_guild',
    name: 'Craftsmens Guild',
    age: 3,
    type: 'purple',
    cost: { ore: 2, clay: 2 },
    benefit: { vpPerNeighborCard: { type: 'gray', multiplier: 2 } },
    desc: '2 VP for each Manufactured Good (Gray) in neighbor cities'
  },
  {
    id: 'magistrates_guild',
    name: 'Magistrates Guild',
    age: 3,
    type: 'purple',
    cost: { wood: 3, stone: 1, loom: 1 },
    benefit: { vpPerNeighborCard: { type: 'blue', multiplier: 1 } },
    desc: '1 VP for each Civilian Structure (Blue) in neighbor cities'
  },
  {
    id: 'spies_guild',
    name: 'Spies Guild',
    age: 3,
    type: 'purple',
    cost: { clay: 3, glass: 1 },
    benefit: { vpPerNeighborCard: { type: 'red', multiplier: 1 } },
    desc: '1 VP for each Military Structure (Red) in neighbor cities'
  },
  {
    id: 'philosophers_guild',
    name: 'Philosophers Guild',
    age: 3,
    type: 'purple',
    cost: { clay: 3, loom: 1, papyrus: 1 },
    benefit: { vpPerNeighborCard: { type: 'green', multiplier: 1 } },
    desc: '1 VP for each Scientific Structure (Green) in neighbor cities'
  },
  {
    id: 'traders_guild',
    name: 'Traders Guild',
    age: 3,
    type: 'purple',
    cost: { loom: 1, papyrus: 1, glass: 1 },
    benefit: { vpPerNeighborCard: { type: 'yellow', multiplier: 1 } },
    desc: '1 VP for each Commercial Structure (Yellow) in neighbor cities'
  },
  {
    id: 'strategists_guild',
    name: 'Strategists Guild',
    age: 3,
    type: 'purple',
    cost: { ore: 2, loom: 1, papyrus: 1 },
    benefit: { vpPerNeighborDefeat: 1 },
    desc: '1 VP for each Defeat Token in neighbor cities'
  },
  {
    id: 'shipowners_guild',
    name: 'Shipowners Guild',
    age: 3,
    type: 'purple',
    cost: { wood: 3, glass: 1, papyrus: 1 },
    benefit: { vpPerOwnCardTypes: { types: ['brown', 'gray', 'purple'], multiplier: 1 } },
    desc: '1 VP for each Brown, Gray, and Purple card in your own city'
  },
  {
    id: 'builders_guild',
    name: 'Builders Guild',
    age: 3,
    type: 'purple',
    cost: { stone: 2, clay: 2, glass: 1 },
    benefit: { vpPerWonderStages: { multiplier: 1 } },
    desc: '1 VP for each Wonder Stage completed in your city and neighbor cities'
  },
  {
    id: 'scientists_guild',
    name: 'Scientists Guild',
    age: 3,
    type: 'purple',
    cost: { wood: 2, ore: 2, papyrus: 1 },
    benefit: { science_wild: 1 },
    desc: 'Counts as 1 Wild Science symbol of your choice at game end'
  }
];
