const airDropLoot = {
  pools: [
    {
      stage: "before_cobble",
      entries: [
        ["minecraft:dirt", 100, [8, 12]],
        ["minecraft:sweet_berries", 90, [6, 8]],
        ["minecraft:flint", 90, [4, 10]],
        ["minecraft:stick", 90, [8, 12]],
        ["immersiveengineering:concrete", 50, [12, 16]],
        ["minecraft:string", 90, [8, 12]],
        ["supplementaries:confetti_popper", 30, [6, 8]],
        ["minecraft:golden_carrot", 30, [3, 5]],
        ["utilitarian:angel_block", 20, [1, 1]],
        ["ironchest:copper_chest", 20, [1, 1]],
        ["pickletweaks:watering_can", 20, [1, 1]],
        ["pickletweaks:stone_sickle", 20, [1, 1]],
        ["crafting_on_a_stick:crafting_table", 20, [1, 1]],
        ["minecraft:tnt", 30, [1, 2]],
        ["ceramicbucket:unfired_clay_bucket", 20, [1, 1]],
        ["rechiseled:chisel", 20, [1, 1]],
        ["minecraft:music_disc_far", 10, [1, 1]],
        ["minecraft:music_disc_creator_music_box", 10, [1, 1]],
        ["pocketstorage:psu_1", 10, [1, 1]],
        ["mob_grinding_utils:ender_inhibitor_off", 20, [1, 1]],
        ["dummmmmmy:target_dummy", 20, [1, 1]],
        ["mob_grinding_utils:monocle", 20, [1, 1]],
        ["ftbstuff:compressed_cobblestone_3", 30, [1, 3]],
        ["chipped:carpenters_table", 20, [1, 1]],
        ["minecraft:wind_charge", 40, [6, 8]],
        ["occultism:large_candle_black", 20, [1, 1]],
        ["occultism:large_candle_purple", 20, [1, 1]],
        ["mysticalagriculture:inferium_farmland", 20, [1, 1]],
        ["ars_nouveau:magebloom_crop", 30, [2, 4]],
        ["minecraft:music_disc_relic", 10, [1, 1]],
        ["farmersdelight:melon_juice", 20, [1, 1]],
        ["sushigocrafting:cleaver_knife", 20, [1, 1]],
        ["sophisticatedbackpacks:stonecutter_upgrade", 20, [1, 1]],
        ["immersiveengineering:ersatz_leather", 20, [1, 1]],
        ["constructionstick:iron_stick", 20, [1, 1]],
        ["torchmaster:dreadlamp", 20, [1, 1]],
        ["mob_grinding_utils:golden_egg", 20, [1, 1]],
        ["rusticdelight:coffee_beans", 30, [2, 3]],
        ["actuallyadditions:flax_seeds", 30, [2, 3]],
        ["actuallyadditions:canola_seeds", 30, [2, 3]],
        ["occultism:datura_seeds", 30, [2, 3]],
        ["minecraft:experience_bottle", 40, [2, 4]],
        ["gag:fishing_dynamite", 35, [3, 4]],
        ["ars_nouveau:frostaya_pod", 20, [1, 1]],
        ["pneumaticcraft:bandage", 20, [1, 1]],
        ["occultism:large_candle", 20, [1, 1]],
        ["minecraft:redstone", 30, [1, 3]],
        ["immersiveengineering:seed", 35, [3, 4]],
        [Item.of('minecraft:goat_horn[instrument="minecraft:seek_goat_horn"]'), 20, [1, 1]],
        [Item.of('minecraft:lingering_potion[potion_contents={potion:"minecraft:water_breathing"}]'), 20, [1, 1]],
        [
          Item.of(
            'relics:springy_boot{"relics:data":{abilities:{abilities:{bounce:{extender:{cooldown:0,cooldownCap:0,ticking:1b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{power:{initialValue:0.42721d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          10,
          [1, 1],
        ],
        [
          Item.of(
            'relics:jellyfish_necklace{"relics:data":{abilities:{abilities:{paralysis:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:0},points:0,research:{links:{},researched:0b},stats:{duration:{initialValue:1.10699d}}},shock:{extender:{cooldown:0,cooldownCap:0,ticking:1b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{damage:{initialValue:1.65801d}}},unsinkable:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          10,
          [1, 1],
        ],
        [
          Item.of(
            'relics:hunter_belt{"relics:data":{abilities:{abilities:{slots:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{charm:{initialValue:1.48036d}}},training:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{damage:{initialValue:1.94828d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          10,
          [1, 1],
        ],
      ],
    },
    {
      stage: "after_cobble",
      entries: [
        ["pneumaticcraft:pressure_gauge", 15, [1, 1]],
        ["pocketstorage:psu_1", 20, [1, 1]],
        ["constructionstick:template_battery", 20, [1, 1]],
        ["occultism:storage_stabilizer_tier2", 18, [1, 1]],
        ["occultism:stable_wormhole", 18, [1, 1]],
        ["ars_nouveau:amethyst_golem_charm", 25, [1, 1]],
        ["torchmaster:feral_flare_lantern", 22, [1, 1]],
        ["ae2:fluix_smart_cable", 25, [1, 1]],
        ["minecraft:glowstone_dust", 30, [1, 1]],
        ["ars_nouveau:glyph_harvest", 30, [1, 1]],
        ["ars_nouveau:glyph_evaporate", 30, [1, 1]],
        ["ars_nouveau:glyph_fell", 30, [1, 1]],
        ["ars_nouveau:glyph_craft", 30, [1, 1]],
        ["ars_nouveau:glyph_light", 30, [1, 1]],
        ["ars_nouveau:glyph_bubble", 30, [1, 1]],
        ["ars_nouveau:glyph_underfoot", 30, [1, 1]],
        ["integrateddynamics:variable", 25, [1, 1]],
        ["integrateddynamics:cable", 40, [4, 8]],
        ["integratedterminals:part_terminal_storage", 15, [1, 1]],
        ["mysticalagriculture:inferium_essence", 35, [1, 1]],
        ["minecraft:honey_bottle", 40, [3, 4]],
        ["minecraft:bee_spawn_egg", 10, [1, 1]],
        ["constructionstick:diamond_stick", 30, [1, 1]],
        ["ars_nouveau:mendosteen_pod", 20, [1, 1]],
        ["pneumaticcraft:unassembled_pcb", 25, [1, 1]],
        ["ae2:capacity_card", 15, [1, 1]],
        ["enderio:extraction_speed_upgrade_1", 25, [1, 1]],
        ["simplylight:edge_light", 35, [1, 1]],
        ["laserio:card_energy", 30, [1, 1]],
        ["laserio:card_fluid", 30, [1, 1]],
        ["laserio:card_item", 30, [1, 1]],
        ["laserio:laser_node", 30, [1, 1]],
        ["laserio:laser_connector", 30, [1, 1]],
        ["justdirethings:pocket_generator", 20, [1, 1]],
        ["actuallyadditions:ring", 20, [1, 1]],
        ["actuallyadditions:fermenting_barrel", 20, [1, 1]],
        ["actuallyadditions:coffee_beans", 40, [1, 1]],
        ["ars_nouveau:source_berry_pie", 40, [1, 1]],
        ["ars_nouveau:source_berry_roll", 40, [1, 1]],
        ["ars_nouveau:glyph_gust", 35, [1, 1]],
        ["ars_nouveau:glyph_pickup", 35, [1, 1]],
        ["elevatorid:elevator_white", 30, [1, 1]],
        ["ironchest:diamond_to_crystal_chest_upgrade", 25, [1, 1]],
        ["ae2:quartz_fiber", 30, [1, 1]],
        ["functionalstorage:copper_upgrade", 25, [1, 1]],
        ["charginggadgets:charging_station", 20, [1, 1]],
        ["mekanism:industrial_alarm", 40, [1, 1]],
        ["rftoolspower:cell1", 25, [1, 1]],
        ["justdirethings:upgrade_jumpboost", 30, [1, 1]],
        ["minecraft:brewing_stand", 40, [1, 1]],
        ["simplemagnets:basicmagnet", 30, [1, 1]],
        ["sophisticatedbackpacks:refill_upgrade", 30, [1, 1]],
        ["cookingforblockheads:cow_jar", 15, [1, 1]],
        ["minecraft:quartz", 50, [4, 6]],
        ["ae2:certus_quartz_dust", 50, [2, 3]],
        ["replication:raw_replica", 20, [1, 1]],
        ["replication:matter_network_pipe", 20, [1, 1]],
        ["minecraft:experience_bottle", 50, [1, 1]],
        ["oritech:banana", 50, [1, 1]],
        ["farmingforblockheads:feeding_trough", 25, [1, 1]],
        ["oritech:small_tank_block", 25, [1, 1]],
        ["oritech:ceiling_light", 30, [1, 1]],
        ["oritech:tech_lever", 30, [1, 1]],
        ["oritech:tech_button", 30, [1, 1]],
        ["ftbmaterials:silver_cluster", 35, [12, 24]],
        ["ftbstuff:cast_iron_ingot", 35, [7, 12]],
        ["ftbmaterials:gold_cluster", 35, [12, 15]],
        ["justdirethings:coal_t1", 50, [3, 4]],
        ["minecraft:wind_charge", 50, [1, 1]],
        ["ftbmaterials:osmium_cluster", 35, [12, 16]],
        ["farmingforblockheads:red_fertilizer", 40, [8, 12]],
        ["ftbmaterials:nickel_cluster", 35, [16, 24]],
        ["ftbmaterials:lead_cluster", 35, [16, 24]],
        ["ftbmaterials:diamond_cluster", 20, [4, 8]],
        ["ftbmaterials:copper_cluster", 50, [18, 24]],
        ["ftbmaterials:iron_cluster", 50, [12, 16]],
        ["minecraft:golden_carrot", 40, [12, 16]],
        ["actuallyadditions:drill_light_blue", 15, [1, 1]],
        ["actuallyadditions:teleport_staff", 15, [1, 1]],
        ["buildinggadgets2:gadget_building", 15, [1, 1]],
        ["ftbstuff:diamond_hammer", 20, [1, 1]],
        ["ftbstuff:netherite_hammer", 15, [1, 1]],
        ["relics:infinity_ham", 10, [1, 1]],
        ["relics:wool_mitten", 10, [1, 1]],
        ["relics:amphibian_boot", 10, [1, 1]],
        ["relics:roller_skates", 10, [1, 1]],
      ],
    },
    {
      stage: "after_nether",
      entries: [
        ["torchmaster:megatorch", 20, [1, 1]],
        ["enderio:dark_steel_ingot", 40, [4, 8]],
        ["occultism:iesnium_ingot", 35, [2, 4]],
        ["mekanism:steel_casing", 30, [2, 3]],
        ["pocketstorage:psu_2", 15, [1, 1]],
        ["mysticalagriculture:silicon_seeds", 25, [1, 2]],
        ["ae2:fluid_cell_housing", 15, [1, 1]],
        ["appmek:chemical_cell_housing", 15, [1, 1]],
        ["ftbmaterials:gold_cluster", 50, [32, 48]],
        ["ftbmaterials:iron_cluster", 60, [48, 64]],
        ["morered:red_alloy_wire", 45, [18, 24]],
        ["minecraft:golden_carrot", 40, [18, 24]],
        ["pneumaticcraft:ingot_iron_compressed", 35, [4, 8]],
        ["ftbmaterials:redstone_cluster", 55, [24, 32]],
        ["ftbmaterials:emerald_cluster", 30, [12, 24]],
        ["mekanism:basic_universal_cable", 30, [3, 8]],
        ["ftbmaterials:diamond_cluster", 25, [6, 18]],
        ["justdirethings:coal_t3", 20, [2, 4]],
        ["mob_grinding_utils:saw_upgrade_sharpness", 10, [1, 1]],
        ["mob_grinding_utils:saw_upgrade_looting", 10, [1, 1]],
        ["functionalstorage:diamond_upgrade", 15, [1, 1]],
        ["functionalstorage:copper_upgrade", 20, [1, 1]],
        ["justdirethings:ferricore_block", 15, [1, 1]],
        ["pneumaticcraft:security_upgrade", 15, [1, 1]],
        ["oritech:machine_core_3", 10, [1, 1]],
        ["justdirethings:polymorphic_catalyst", 10, [1, 1]],
        ["justdirethings:creaturecatcher", 10, [1, 1]],
        ["enderstorage:ender_tank", 25, [1, 1]],
        ["enderstorage:ender_chest", 25, [1, 1]],
        ["oritech:machine_speed_addon", 20, [1, 1]],
        ["justdirethings:upgrade_smelter", 10, [1, 1]],
        ["ae2:certus_quartz_sword", 10, [1, 1]],
        ["functionalstorage:netherite_upgrade", 10, [1, 1]],
        ["ars_nouveau:apprentice_spell_book", 15, [1, 1]],
        ["mysticalagriculture:prudentium_essence", 20, [1, 1]],
        ["mekanism:thermal_evaporation_block", 15, [1, 1]],
        ["immersiveengineering:thermoelectric_generator", 20, [1, 1]],
        ["minecraft:magma_cream", 15, [1, 1]],
        ["ae2:fluix_crystal", 20, [1, 1]],
        ["rftoolspower:cell2", 15, [1, 1]],
        ["sophisticatedbackpacks:advanced_restock_upgrade", 20, [1, 1]],
        [Item.of("justdirethings:portalgun[justdirethings:forge_energy=100000]"), 10, [1, 1]],
        ["pneumaticcraft:regulator_tube_module", 10, [1, 1]],
        ["pneumaticcraft:speed_upgrade", 20, [1, 1]],
        ["pneumaticcraft:item_life_upgrade", 15, [1, 1]],
        ["pneumaticcraft:volume_upgrade", 15, [1, 1]],
        ["ars_nouveau:blue_archwood_sapling", 15, [1, 1]],
        ["ars_nouveau:bastion_pod", 10, [1, 1]],
        ["mekanism:cardboard_box", 15, [1, 1]],
        ["mysticalagriculture:fluix_seeds", 10, [1, 1]],
        ["ae2:speed_card", 20, [1, 1]],
        ["ae2:cell_component_1k", 15, [1, 1]],
        ["constructionstick:netherite_stick", 10, [1, 1]],
        ["arseng:source_cell_housing", 15, [1, 1]],
        ["ae2:item_cell_housing", 10, [1, 1]],
        ["ars_nouveau:glyph_invisibility", 10, [1, 1]],
        ["ars_nouveau:glyph_heal", 10, [1, 1]],
        ["ars_nouveau:glyph_flare", 10, [1, 1]],
        ["ars_nouveau:glyph_conjure_water", 10, [1, 1]],
        ["ars_nouveau:ritual_flight", 10, [1, 1]],
        ["enderio:pulsating_photovoltaic_module", 15, [1, 1]],
        ["ars_nouveau:green_archwood_sapling", 15, [1, 1]],
        ["ars_nouveau:red_archwood_sapling", 15, [1, 1]],
        ["oritech:magnetic_coil", 10, [1, 1]],
        ["oritech:motor", 10, [1, 1]],
        ["pickletweaks:diamond_apple", 10, [1, 1]],
        ["mysticalagradditions:tertium_paxel", 10, [1, 1]],
        ["pneumaticcraft:module_expansion_card", 10, [1, 1]],
        ["ars_nouveau:purple_archwood_sapling", 10, [1, 1]],
        ["pneumaticcraft:armor_upgrade", 10, [1, 1]],
        ["pneumaticcraft:gun_ammo_freezing", 10, [1, 1]],
        ["pneumaticcraft:gun_ammo_ap", 10, [1, 1]],
        ["starbunclemania:glyph_place_fluid", 10, [1, 1]],
        ["minecraft:experience_bottle", 10, [1, 1]],
        ["sushigocrafting:tuna_gunkan", 10, [1, 1]],
        [
          Item.of(
            'relics:bastion_ring{"relics:data":{abilities:{abilities:{compass:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{}},trade:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:0},points:0,research:{links:{},researched:0b},stats:{rolls:{initialValue:0.73123d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          10,
          [1, 1],
        ],
        [
          Item.of(
            'relics:magma_walker{"relics:data":{abilities:{abilities:{heat_resistance:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{}},pace:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{time:{initialValue:37.32897d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          10,
          [1, 1],
        ],
        [
          Item.of(
            'relics:rage_glove{"relics:data":{abilities:{abilities:{phlebotomy:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:0},points:0,research:{links:{},researched:0b},stats:{attack_speed:{initialValue:0.00581d},heal:{initialValue:2.0E-4d},movement_speed:{initialValue:0.02398d}}},rage:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{dealt_damage:{initialValue:0.02802d},duration:{initialValue:2.90706d},incoming_damage:{initialValue:0.03733d}}},spurt:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:0},points:0,research:{links:{},researched:0b},stats:{cooldown:{initialValue:17.53791d},damage:{initialValue:0.21716d},distance:{initialValue:7.44288d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          10,
          [1, 1],
        ],
        [
          Item.of(
            'relics:leather_belt{"relics:data":{abilities:{abilities:{slots:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{charm:{initialValue:2.24528d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          10,
          [1, 1],
        ],
      ],
    },
    {
      stage: "after_depth",
      entries: [
        ["justdirethings:coal_t3", 30, [4, 8]],
        ["minecraft:diamond", 80, [12, 24]],
        ["ftbmaterials:uranium_ingot", 20, [2, 8]],
        ["ftbmaterials:aluminum_ingot", 40, [16, 48]],
        ["ftbmaterials:osmium_ingot", 35, [12, 18]],
        ["ftbmaterials:tin_ingot", 45, [24, 32]],
        ["minecraft:iron_ingot", 50, [18, 48]],
        ["minecraft:gold_ingot", 60, [24, 64]],
        ["minecraft:copper_ingot", 70, [64, 64]],
        ["ars_nouveau:glyph_lightning", 15, [1, 1]],
        ["ars_nouveau:glyph_orbit", 15, [1, 1]],
        ["ars_nouveau:glyph_split", 15, [1, 1]],
        ["ars_nouveau:bombegranate_pod", 15, [1, 1]],
        ["pickletweaks:emerald_apple", 30, [1, 1]],
        ["mysticalagriculture:tertium_essence", 25, [1, 1]],
        ["minecraft:experience_bottle", 35, [4, 8]],
        ["mekanism:basic_tier_installer", 30, [1, 1]],
        ["powah:player_transmitter_blazing", 20, [1, 1]],
        ["justdirethings:upgrade_hammer", 20, [1, 1]],
        ["rftoolspower:cell3", 25, [1, 1]],
        ["minecraft:totem_of_undying", 40, [1, 1]],
        ["ae2:item_storage_cell_16k", 50, [1, 1]],
        ["functionalstorage:diamond_upgrade", 40, [1, 1]],
        ["minecraft:netherite_ingot", 80, [4, 8]],
        ["oritech:machine_speed_addon", 20, [1, 1]],
        ["justdirethings:blazegold_block", 10, [1, 1]],
        ["mysticalagriculture:prudentium_farmland", 15, [1, 1]],
        ["mekanism:upgrade_energy", 30, [1, 1]],
        ["rftoolspower:cell1", 25, [1, 1]],
        ["mekanism:upgrade_speed", 30, [1, 1]],
        ["mysticalagriculture:redstone_seeds", 45, [2, 3]],
        ["mysticalagriculture:nether_seeds", 50, [4, 8]],
        ["mysticalagriculture:sheep_seeds", 20, [1, 1]],
        ["mysticalagriculture:turtle_seeds", 25, [3, 4]],
        ["mysticalagriculture:honey_seeds", 30, [1, 2]],
        ["mysticalagriculture:dye_seeds", 35, [2, 3]],
        ["pocketstorage:psu_3", 20, [1, 1]],
        ["occultism:storage_stabilizer_tier3", 30, [1, 1]],
        ["occultism:iesnium_ingot", 35, [4, 8]],
        ["oritech:adamant_ingot", 20, [2, 4]],
        ["ftbmaterials:platinum_ingot", 25, [1, 1]],
        ["constructionstick:template_unbreakable", 10, [1, 1]],
        ["bigreactors:anglesite_crystal", 15, [1, 1]],
        ["bigreactors:benitoite_crystal", 15, [1, 1]],
        ["minecraft:echo_shard", 20, [1, 1]],
        ["functionalstorage:netherite_upgrade", 20, [1, 1]],
        ["enderio:vibrant_photovoltaic_module", 25, [1, 1]],
        ["pneumaticcraft:solar_compressor", 25, [1, 1]],
        ["ars_nouveau:glyph_blink", 10, [1, 1]],
        ["ars_nouveau:glyph_summon_undead", 10, [1, 1]],
        ["ars_nouveau:glyph_glide", 10, [1, 1]],
        ["enderio:extraction_speed_upgrade_3", 25, [1, 1]],
        ["ae2:cell_component_4k", 50, [1, 1]],
        [
          Item.of(
            'relics:phantom_boot{"relics:data":{abilities:{abilities:{bridge:{extender:{cooldown:0,cooldownCap:0,ticking:1b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{duration:{initialValue:0.28457d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          30,
          [1, 1],
        ],
        [
          Item.of(
            'relics:reflection_necklace{"relics:data":{abilities:{abilities:{explode:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{capacity:{initialValue:53.08528d},damage:{initialValue:0.36911d},stun:{initialValue:0.13318d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          30,
          [1, 1],
        ],
        [
          Item.of(
            'relics:ice_skates{"relics:data":{abilities:{abilities:{ram:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:0},points:0,research:{links:{},researched:0b},stats:{damage:{initialValue:0.082d}}},skating:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{duration:{initialValue:40.62721d},speed:{initialValue:0.01553d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          30,
          [1, 1],
        ],
        [
          Item.of(
            'relics:drowned_belt{"relics:data":{abilities:{abilities:{anchor:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{sinking:{initialValue:4.22307d},slowness:{initialValue:0.39271d}}},pressure:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{damage:{initialValue:1.61176d}}},riptide:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{cooldown:{initialValue:9.11758d}}},slots:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{charm:{initialValue:1.5189d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          20,
          [1, 1],
        ],
        [
          Item.of(
            'relics:aqua_walker{"relics:data":{abilities:{abilities:{walking:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{time:{initialValue:57.08805d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          20,
          [1, 1],
        ],
        [
          Item.of(
            'relics:midnight_robe{"relics:data":{abilities:{abilities:{backstab:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{damage:{initialValue:1.40247d},distance:{initialValue:15.4659d}}},vanish:{extender:{cooldown:0,cooldownCap:0,ticking:1b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{light:{initialValue:1.53007d},speed:{initialValue:0.1421d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          30,
          [1, 1],
        ],
      ],
    },
    {
      stage: "after_rift",
      entries: [
        ["fluxnetworks:flux_plug", 20, [1, 1]],
        ["fluxnetworks:flux_point", 20, [1, 1]],
        ["oritech:big_solar_panel_block", 35, [1, 1]],
        ["entangled:block", 30, [1, 1]],
        ["rftoolspower:dimensionalcell_advanced", 40, [1, 1]],
        ["minecraft:diamond", 50, [1, 1]],
        ["rftoolsbase:dimensionalshard", 30, [1, 1]],
        ["pneumaticcraft:creative_compressed_iron_block", 25, [1, 1]],
        ["oritech:heisenberg_compensator", 30, [1, 1]],
        ["actuallyadditions:empowered_diamatine_crystal", 30, [1, 1]],
        ["actuallyadditions:empowered_emeradic_crystal", 30, [1, 1]],
        ["fluxnetworks:gargantuan_flux_storage", 40, [1, 1]],
        ["megacells:bulk_cell_component", 30, [1, 1]],
        ["oritech:plutonium_pellet", 25, [1, 1]],
        ["oritech:unholy_intelligence", 25, [1, 1]],
        ["oritech:fluxite", 30, [1, 1]],
        ["bigreactors:cyanite_ingot", 20, [1, 1]],
        ["bigreactors:blutonium_ingot", 25, [1, 1]],
        ["oritech:overcharged_crystal", 35, [1, 1]],
        ["ae2wtlib:quantum_bridge_card", 30, [1, 1]],
        ["bigreactors:ludicrite_ingot", 25, [1, 1]],
        ["bigreactors:inanite_ingot", 20, [1, 1]],
        ["bigreactors:magentite_ingot", 20, [1, 1]],
        ["merequester:requester", 30, [1, 1]],
        ["mysticalagradditions:awakened_supremium_paxel", 50, [1, 1]],
        ["mysticalagriculture:awakened_supremium_sword", 50, [1, 1]],
        ["mysticalagriculture:awakened_supremium_hoe", 45, [1, 1]],
        ["mysticalagriculture:awakened_supremium_axe", 45, [1, 1]],
        ["mysticalagriculture:awakened_supremium_shovel", 45, [1, 1]],
        ["bigreactors:reinforced_reactorcasing", 35, [1, 1]],
        ["bigreactors:reinforced_reactorglass", 35, [1, 1]],
        ["bigreactors:reinforced_turbinerotorbearing", 30, [1, 1]],
        ["bigreactors:reinforced_turbinecasing", 30, [1, 1]],
        ["bigreactors:reinforced_turbineglass", 30, [1, 1]],
        ["advanced_ae:quantum_alloy", 40, [1, 1]],
        ["ae2:singularity", 50, [1, 1]],
        ["mysticalagriculture:imperium_essence", 30, [1, 1]],
        ["enderio:extraction_speed_upgrade_4", 35, [1, 1]],
        ["ae2:cell_component_16k", 40, [1, 1]],
        ["pocketstorage:psu_4", 30, [1, 1]],
        ["occultism:storage_stabilizer_tier4", 40, [1, 1]],
        ["justdirethings:time_crystal", 40, [1, 1]],
        ["oritech:duratium_ingot", 20, [1, 1]],
        ["oritech:prometheum_ingot", 25, [1, 1]],
        ["actuallyadditions:empowered_void_crystal", 30, [1, 1]],
        ["minecraft:experience_bottle", 25, [1, 1]],
        ["functionalstorage:water_generator_upgrade", 25, [1, 1]],
        [
          Item.of(
            'mekanism:advanced_fluid_tank[mekanism:fluids={fluid_tanks:[{amount:64000,id:"justdirethings:refined_t4_fluid_source"}]},block_entity_data={delay:0,edit_mode:0,fluid_tanks:[{stored:{amount:64000,id:"justdirethings:refined_t4_fluid_source"},tank:0b}],id:"mekanism:advanced_fluid_tank"},mekanism:owner=[I;1322214020,-1310177861,-1296886500,-1782337265]]'
          ),
          25,
          [1, 1],
        ],
        [
          Item.of(
            'mekanism:advanced_fluid_tank[mekanism:fluids={fluid_tanks:[{amount:64000,id:"oritech:still_fuel"}]},block_entity_data={delay:0,edit_mode:0,fluid_tanks:[{stored:{amount:64000,id:"oritech:still_fuel"},tank:0b}],id:"mekanism:advanced_fluid_tank"},mekanism:owner=[I;1322214020,-1310177861,-1296886500,-1782337265]]'
          ),
          25,
          [1, 1],
        ],
        [
          Item.of(
            'relics:chorus_inhibitor{"relics:data":{abilities:{abilities:{blink:{extender:{cooldown:0,cooldownCap:0,ticking:0b},lock:{breaks:5},points:0,research:{links:{},researched:0b},stats:{cooldown:{initialValue:5.93395d},distance:{initialValue:25.30701d}}}}},leveling:{experience:0,level:0,luck:0,points:0}}}'
          ),
          25,
          [1, 1],
        ],
      ],
    },
  ],
};

LootJS.lootTables((event) => {
  event.create("ftbstuff:blocks/raft_crate").createPool((poolName) => {
    poolName.rolls([3, 4]); // Set rolls once

    const stageLevels = {
      before_cobble: 0,
      after_cobble: 1,
      after_nether: 2,
      after_depth: 3,
      after_rift: 4,
    };

    airDropLoot.pools.forEach((pool) => {
      const { stage, entries } = pool;

      // Assign a numeric value to the pool stage
      let poolStageLevel = stageLevels[stage] ?? 0; // Default to 0 if missing

      entries.forEach(([itemID, weight, [min, max]]) => {
        let entry = LootEntry.of(itemID).setCount([min, max]).withWeight(weight);

        if (stage) {
          entry = entry.matchPlayerCustom((player) => {
            let playerStageLevel = 0;

            // Determine the player's exact current stage
            for (let s in stageLevels) {
              if (player.stages.has(s) && stageLevels[s] > playerStageLevel) {
                playerStageLevel = stageLevels[s];
              }
            }

            console.log(`Player current stage: ${playerStageLevel}, Checking loot for stage: ${poolStageLevel}`);

            // Only allow loot from the exact stage the player is currently in
            return playerStageLevel === poolStageLevel;
          });
        }

        //console.log(`Adding item ${itemID} for stage ${stage} with weight ${weight} (min: ${min}, max: ${max})`);
        poolName.addEntry(entry);
      });
    });
  });
});
