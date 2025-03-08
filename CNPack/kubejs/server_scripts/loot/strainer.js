const lootStrainer = [
  {
    id: "ftb:custom/water_strainer_test",
    pools: [
      {
        pool_name: "pebbles",
        weight: 85,
        entries: [
          ["ftb:stone_pebbles", 25, [1, 1]],
          ["ftb:andesite_pebbles", 15, [1, 1]],
          ["ftb:granite_pebbles", 15, [1, 1]],
          ["ftb:diorite_pebbles", 15, [1, 1]],
          ["ftb:sandstone_pebbles", 15, [1, 1]],
          ["ftb:red_sandstone_pebbles", 15, [1, 1]],
        ],
      },
      {
        pool_name: "food",
        weight: 5,
        entries: [
          ["minecraft:cod", 50, [1, 1]],
          ["minecraft:salmon", 50, [1, 1]],
        ],
      },
      {
        pool_name: "sapling",
        weight: 10,
        entries: [
          ["minecraft:oak_sapling", 70, [1, 1]],
          ["minecraft:spruce_sapling", 5, [1, 1]],
          ["minecraft:birch_sapling", 5, [1, 1]],
          ["minecraft:jungle_sapling", 5, [1, 1]],
          ["minecraft:acacia_sapling", 5, [1, 1]],
          ["minecraft:dark_oak_sapling", 5, [1, 1]],
          ["minecraft:cherry_sapling", 5, [1, 1]],
        ],
      },
    ],
  },
];

LootJS.lootTables((event) => {
  lootStrainer.forEach((barrelType) => {
    const { id, pools } = barrelType;

    pools.forEach((pool) => {
      const { pool_name, entries } = pool;

      // Create a new loot table for each pool within the strainer
      event.create(`${id}_${pool_name}`).createPool((poolName) => {
        entries.forEach(([itemID, entryWeight, [min, max]]) => {
          poolName.addEntry(LootEntry.of(itemID).setCount([min, max]).withWeight(entryWeight)).name("Strainer");
        });
      });
    });

    // Use the `create` method directly on the `event` object
    event.create(id).createPool((poolName) => {
      pools.forEach((pool) => {
        poolName.addEntry(LootEntry.reference(`${id}_${pool.pool_name}`).withWeight(pool.weight)).name(pool.pool_name);
      });
    });
  });
});
