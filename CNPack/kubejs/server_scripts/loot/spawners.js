const spawnersLoot = {
  pools: [
    {
      name: "ftb:spawners/nether",
      always: [
        ["minecraft:netherite_upgrade_smithing_template", 1, [1, 1]],
        ["sophisticatedbackpacks:magnet_upgrade", 1, [1, 1]],
        ["actuallyadditions:black_quartz", 1, [6, 16]],
      ],
      entries: [
        ["actuallyadditions:black_quartz", 1, [4, 6]],
        ["minecraft:netherite_scrap", 20, [1, 2]],
        ["minecraft:gold_block", 71, [1, 2]],
        ["minecraft:ender_pearl", 105, [1, 4]],
        ["minecraft:quartz", 71, [4, 12]],
        ["minecraft:netherite_ingot", 20, [1, 1]],
        ["minecraft:wither_rose", 100, [1, 2]],
        ["replication:replica_ingot", 71, [1, 2]],
        ["mininggadgets:upgrade_freezing", 40, [1, 1]],
        ["pneumaticcraft:item_life_upgrade", 40, [1, 1]],
        ["mekanism:upgrade_energy", 40, [1, 1]],
        ["minecraft:diamond", 40, [1, 2]],
        ["minecraft:gold_ingot", 71, [3, 8]],
        ["actuallyadditions:ring_of_growth[actuallyadditions:energy=1000000]", 40, [1, 1]],
        ["mekanism:upgrade_speed", 40, [1, 1]],
        ["fluxnetworks:flux_core", 100, [1, 1]],
      ],
    },
    {
      name: "ftb:spawners/underwater_dome",
      always: [
        ["elytra", 1, [1, 1]],
        ["minecraft:heart_of_the_sea", 1, [1, 1]],
      ],
      entries: [
        ["bhc:green_heart_canister", 81, [1, 1]],
        ["minecraft:enchanted_golden_apple", 16, [1, 1]],
        ["minecraft:shulker_shell", 33, [1, 2]],
        ["minecraft:breeze_rod", 81, [1, 1]],
        ["minecraft:phantom_membrane", 81, [2, 5]],
        ["minecraft:nautilus_shell", 81, [2, 4]],
        ["torchmaster:megatorch", 81, [1, 1]],
        ["sophisticatedbackpacks:everlasting_upgrade", 33, [1, 1]],
        ["sophisticatedbackpacks:smithing_upgrade", 33, [1, 1]],
        ["minecraft:sea_lantern", 81, [2, 5]],
        ["minecraft:amethyst_shard", 81, [3, 6]],
        ["minecraft:turtle_scute", 81, [1, 2]],
        ["mysticalagriculture:tertium_fishing_rod", 81, [1, 1]],
        ["mysticalagriculture:fish_essence", 57, [2, 5]],
      ],
    },
    {
      name: "ftb:spawners/sculk",
      always: [
        ["minecraft:sculk", 1, [2, 6]],
        ["minecraft:sculk_catalyst", 1, [1, 1]],
        ["minecraft:disc_fragment_5", 1, [1, 3]],
        ["minecraft:echo_shard", 1, [1, 2]],
      ],
      entries: [
        ["minecraft:diamond", 27, [1, 2]],
        ["minecraft:ender_pearl", 62, [1, 4]],
        ["mininggadgets:upgrade_silk", 27, [1, 1]],
        ["ars_nouveau:glyph_lightning", 68, [1, 1]],
        ["ars_nouveau:glyph_summon_undead", 68, [1, 1]],
        ["ars_nouveau:glyph_wall", 68, [1, 1]],
        ["mininggadgets:upgrade_range_3", 27, [1, 1]],
        ["occultism:storage_stabilizer_tier3", 68, [1, 1]],
        ["minecraft:sculk", 68, [2, 6]],
        ["minecraft:enchanted_golden_apple", 14, [1, 1]],
        ["minecraft:sculk_shrieker", 68, [1, 1]],
        ["minecraft:heavy_core", 68, [1, 1]],
        [
          'hostilenetworks:data_model[hostilenetworks:data_model="hostilenetworks:ender_dragon",hostilenetworks:data=1254]',
          68,
          [1, 1],
        ],
        ["mysticalagradditions:imperium_paxel", 68, [1, 1]],
        ["mininggadgets:upgrade_fortune_3", 27, [1, 1]],
      ],
    },
    {
      name: "ftb:spawners/shadow",
      always: [
        ["ftb:abyssal_fragment", 1, [1, 2]],
        ["minecraft:ender_pearl", 1, [1, 4]],
      ],
      entries: [
        ["minecraft:diamond", 38, [1, 2]],
        ["minecraft:ender_pearl", 96, [1, 4]],
        ["minecraft:enchanted_golden_apple", 77, [1, 1]],
        ['irons_jewelry:recipe{"irons_jewelry:stored_pattern":"irons_jewelry:improved_gemset_ring"}', 19, [1, 1]],
        ['irons_jewelry:recipe{"irons_jewelry:stored_pattern":"irons_jewelry:stalwart_ring"}', 19, [1, 1]],
        ['irons_jewelry:recipe{"irons_jewelry:stored_pattern":"irons_jewelry:tearstone_ring"}', 19, [1, 1]],
        ["functionalstorage:ender_drawer", 38, [1, 1]],
        ["mysticalagriculture:prudentium_essence", 38, [2, 4]],
        ["minecraft:gold_ingot", 67, [3, 8]],
        ["mysticalagriculture:inferium_essence", 67, [6, 16]],
        ["ars_nouveau:source_gem", 67, [2, 4]],
        ["irons_jewelry:sapphire", 67, [1, 1]],
        ["irons_jewelry:ruby", 67, [1, 1]],
        ["irons_jewelry:peridot", 67, [1, 1]],
        ["irons_jewelry:onyx", 67, [1, 1]],
        ["irons_jewelry:garnet", 67, [1, 1]],
        ["minecraft:prismarine_shard", 101, [3, 8]],
        ["occultism:tallow", 96, [2, 5]],
        // [
        //   Item.of(`minecraft:sea_pickle`, 1).withCustomName("Eldritch Pickle").enchant("minecraft:unbreaking", 10).enchant("ftboceanmobs:rift_disruptor", 5),
        //   10,
        //   [1, 1],
        // ],
      ],
    },
    {
      name: "ftb:spawners/nether_island",
      always: [
        ["minecraft:quartz", 1, [3, 8]],
        ["minecraft:soul_soil", 1, [3, 6]],
        ["minecraft:ender_pearl", 1, [1, 4]],
      ],
      entries: [
        ["minecraft:quartz", 60, [3, 8]],
        ["minecraft:soul_soil", 89, [3, 6]],
        ["minecraft:ender_pearl", 85, [1, 4]],
        ["sophisticatedbackpacks:advanced_feeding_upgrade", 34, [1, 1]],
        ["minecraft:crimson_fungus", 85, [2, 5]],
        ["minecraft:ghast_tear", 85, [1, 2]],
        ["minecraft:diamond", 34, [1, 2]],
        ["rftoolsbase:dimensionalshard", 85, [1, 2]],
        ["enderio:dark_steel_ingot", 60, [1, 2]],
        ["minecraft:netherite_ingot", 17, [1, 1]],
        ["pneumaticcraft:armor_upgrade", 34, [1, 1]],
        ["pneumaticcraft:speed_upgrade", 34, [1, 1]],
        ["mob_grinding_utils:xp_solidifier_upgrade", 34, [1, 1]],
        ["modularrouters:speed_upgrade", 34, [1, 1]],
        ["mysticalagradditions:tertium_paxel", 85, [1, 1]],
        ["justdirethings:coal_t2", 85, [2, 5]],
        ["mysticalagriculture:blaze_essence", 60, [3, 6]],
      ],
    },
  ],
};

LootJS.lootTables((event) => {
  spawnersLoot.pools.forEach((pool) => {
    let table = event.create(pool.name).createPool((poolName) => {
      pool.entries.forEach(([itemID, weight, [min, max]]) => {
        let entry = LootEntry.of(itemID).setCount([min, max]).withWeight(weight);
        poolName.addEntry(entry);
      });

      poolName.rolls([4, 5]);
    });

    pool.always.forEach(([itemID, _, [min, max]]) => {
      table.createPool((alwaysPool) => {
        let entry = LootEntry.of(itemID).setCount([min, max]);
        alwaysPool.addEntry(entry);
        alwaysPool.rolls(1);
      });
    });
  });
});


