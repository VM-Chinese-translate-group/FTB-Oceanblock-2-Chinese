// priority: 101

const removeTagsAndHide = [
  "bigreactors:yellorium_ingot",
  "actuallyadditions:rice_seeds",
  "actuallyadditions:rice",
  "mysticalagriculture:enchanter",
  "bigreactors:deepslate_yellorite_ore",
  "bigreactors:raw_yellorium_block",
  "bigreactors:raw_yellorium",
  "bigreactors:yellorium_block",
  "brickfurnace:brick_smoker",
  "enderio:silicon",
  "morered:red_alloy_ingot",
  "nautec:cast_iron_ingot",
  "nautec:cast_iron_nugget",
  "mekanism:block_fluorite",
  "mekanism:fluorite_gem",
  "oritech:coal_dust",
  "oritech:deepslate_nickel_ore",
  "oritech:deepslate_platinum_ore",
  "oritech:electrum_block",
  "oritech:electrum_dust",
  "oritech:electrum_ingot",
  "oritech:endstone_platinum_ore",
  "oritech:nickel_block",
  "oritech:nickel_ingot",
  "oritech:nickel_ore",
  "oritech:platinum_block",
  "oritech:platinum_ingot",
  "oritech:quartz_dust",
  "oritech:raw_nickel_block",
  "oritech:raw_nickel",
  "oritech:raw_platinum_block",
  "oritech:silicon_block",
  "oritech:silicon",
  "oritech:steel_block",
  "oritech:steel_dust",
  "oritech:steel_dust",
  "oritech:steel_ingot",
  "sushigocrafting:rice_seeds",
  "sushigocrafting:rice",
  "utilitarian:tiny_charcoal",
  "utilitarian:tiny_coal",
  "powah:furnator_starter",
  "powah:furnator_basic",
  "powah:furnator_hardened",
  "powah:furnator_blazing",
  "powah:furnator_niotic",
  "powah:furnator_spirited",
  "powah:furnator_nitro",
  "powah:magmator_starter",
  "powah:magmator_basic",
  "powah:magmator_hardened",
  "powah:magmator_blazing",
  "mysticalagriculture:flight_augment",
  "powah:magmator_niotic",
  "powah:magmator_spirited",
  "powah:magmator_nitro",
  "powah:thermo_generator_starter",
  "powah:thermo_generator_basic",
  "powah:thermo_generator_hardened",
  "powah:thermo_generator_blazing",
  "powah:thermo_generator_niotic",
  "powah:thermo_generator_spirited",
  "powah:thermo_generator_nitro",
  "powah:reactor_starter",
  "powah:reactor_basic",
  "powah:reactor_hardened",
  "powah:reactor_blazing",
  "powah:reactor_niotic",
  "powah:reactor_spirited",
  "powah:reactor_nitro",
  "powah:dry_ice",
  "powah:deepslate_uraninite_ore_poor",
  "powah:deepslate_uraninite_ore",
  "powah:deepslate_uraninite_ore_dense",
  "powah:uraninite_ore_poor",
  "powah:uraninite_ore",
  "powah:uraninite_ore_dense",
  "powah:uraninite_raw",
  "powah:uraninite",
  "pickletweaks:grass_fiber_mesh",
  "pickletweaks:mesh",
  "pickletweaks:reinforced_mesh",
  "farmingforblockheads:market",
  "rftoolspower:coalgenerator",
  "immersiveengineering:alloybrick",
  "immersiveengineering:slab_alloybrick",
  "immersiveengineering:raw_nickel",
  "oritech:basic_generator_block",
  "mysticalagriculture:diamond_sickle",
  "mysticalagriculture:watering_can",
  "mysticalagriculture:diamond_scythe",
  "extendedcrafting:handheld_table",
  "oritech:raw_silicon",
  "bigreactors:graphite_ingot",
  "oritech:biosteel_block",
  "oritech:biosteel_ingot",
  "oritech:biosteel_dust",
  "pneumaticcraft:advanced_air_compressor",
  "pneumaticcraft:advanced_liquid_compressor",
  "pneumaticcraft:air_compressor",
  "pneumaticcraft:electrostatic_compressor",
  "pneumaticcraft:liquid_compressor",
  "pneumaticcraft:manual_compressor",
  "pneumaticcraft:solar_compressor",
  "pneumaticcraft:thermal_compressor",
  "pneumaticcraft:plastic",
  "mekanism:hdpe_elytra",
  "immersiveengineering:blastbrick",
  "immersiveengineering:slab_blastbrick",
  "powah:solar_panel_starter",
  "powah:solar_panel_basic",
  "powah:solar_panel_hardened",
  "powah:solar_panel_blazing",
  "powah:solar_panel_niotic",
  "powah:solar_panel_spirited",
  "powah:solar_panel_nitro",
  "powah:energy_discharger_starter",
  "powah:energy_discharger_basic",
  "powah:energy_discharger_hardened",
  "powah:energy_discharger_blazing",
  "powah:energy_discharger_niotic",
  "powah:energy_discharger_spirited",
  "powah:energy_discharger_nitro",
  "mekanism:tin_ore",
  "mekanism:deepslate_tin_ore",
  "mekanism:osmium_ore",
  "mekanism:deepslate_osmium_ore",
  "mekanism:uranium_ore",
  "mekanism:deepslate_uranium_ore",
  "mekanism:lead_ore",
  "mekanism:deepslate_lead_ore",
  "mekanism:fluorite_ore",
  "mekanism:deepslate_fluorite_ore",
  "immersiveengineering:ore_aluminum",
  "immersiveengineering:deepslate_ore_aluminum",
  "immersiveengineering:ore_lead",
  "immersiveengineering:deepslate_ore_lead",
  "immersiveengineering:ore_silver",
  "immersiveengineering:deepslate_ore_silver",
  "immersiveengineering:ore_nickel",
  "immersiveengineering:deepslate_ore_nickel",
  "immersiveengineering:ore_uranium",
  "immersiveengineering:deepslate_ore_uranium",
  "occultism:silver_ore",
  "occultism:silver_ore_deepslate",
  "bigreactors:yellorite_ore",
  "bigreactors:anglesite_ore",
  "bigreactors:benitoite_ore",
  "rftoolsbase:dimensionalshard_overworld",
  "rftoolsbase:dimensionalshard_nether",
  "oritech:deepslate_uranium_ore",
  "ftbstuff:acacia_water_strainer",
  "ftbstuff:birch_water_strainer",
  "ftbstuff:cherry_water_strainer",
  "ftbstuff:crimson_water_strainer",
  "ftbstuff:jungle_water_strainer",
  "ftbstuff:mangrove_water_strainer",
  "ftbstuff:oak_water_strainer",
  "ftbstuff:dark_oak_water_strainer",
  "ftbstuff:warped_water_strainer",
  "ftbmaterials:brass_raw_ore",
  "ftbmaterials:brass_raw_block",
  "pneumaticcraft:harvesting_drone",
  "oritech:crop_filter_addon",
  "actuallyadditions:farmer",
  "enderio:primitive_alloy_smelter",
  "powah:energy_cable_starter",
  "powah:energy_cable_basic",
  "powah:energy_cable_hardened",
  "ae2wtlib:magnet_card",
  "powah:energy_cable_blazing",
  "powah:energy_cable_niotic",
  "powah:energy_cable_spirited",
  "powah:energy_cable_nitro",
  "immersiveengineering:dust_wood",
  "actuallyadditions:oil_generator",
  "actuallyadditions:coal_generator",
  "actuallyadditions:leaf_generator",
  "enderio:stirling_generator",
  "integrateddynamics:coal_generator",
  "justdirethings:generatort1",
  "rftoolspower:endergenic",
  "rftoolspower:pearl_injector",
  "rftoolspower:blazing_agitator",
  "oritech:bio_generator_block",
  "enderio:energetic_photovoltaic_module",
  "enderio:pulsating_photovoltaic_module",
  "enderio:vibrant_photovoltaic_module",
  "mekanism:hydrofluoric_acid_bucket",
  "ftbmaterials:fluorite_cluster",
  "ftbmaterials:fluorite_chunk",
  "mekanism:reprocessed_fissile_fragment",
  "mysticalagriculture:inferium_helmet",
  "mysticalagriculture:inferium_chestplate",
  "mysticalagriculture:inferium_leggings",
  "mysticalagriculture:inferium_boots",
  "mysticalagriculture:prudentium_helmet",
  "mysticalagriculture:prudentium_leggings",
  "mysticalagriculture:prudentium_chestplate",
  "mysticalagriculture:prudentium_boots",
  "mysticalagriculture:tertium_helmet",
  "mysticalagriculture:tertium_chestplate",
  "mysticalagriculture:tertium_leggings",
  "mysticalagriculture:tertium_boots",
  "mysticalagriculture:imperium_helmet",
  "mysticalagriculture:imperium_chestplate",
  "mysticalagriculture:imperium_leggings",
  "mysticalagriculture:imperium_boots",
  "mysticalagriculture:supremium_helmet",
  "mysticalagriculture:supremium_chestplate",
  "mysticalagriculture:supremium_boots",
  "mysticalagriculture:supremium_leggings",
  "mysticalagriculture:awakened_supremium_helmet",
  "mysticalagriculture:awakened_supremium_chestplate",
  "mysticalagriculture:awakened_supremium_leggings",
  "mysticalagriculture:awakened_supremium_boots",
  "mysticalagriculture:mining_aoe_ii_augment",
  "mysticalagriculture:attack_aoe_i_augment",
  "mysticalagriculture:tilling_aoe_ii_augment",
  "mysticalagriculture:pathing_aoe_iii_augment",
  "mysticalagriculture:weakness_resistance_augment",
  "mysticalagriculture:slowness_resistance_augment",
  "mysticalagriculture:absorption_iv_augment",
  "mysticalagriculture:poison_resistance_augment",
  "mysticalagriculture:jump_boost_iii_augment",
  "mysticalagriculture:absorption_i_augment",
  "mysticalagriculture:health_boost_i_augment",
  "mysticalagriculture:luck_i_augment",
  "mysticalagriculture:pathing_aoe_i_augment",
  "mysticalagriculture:nausea_resistance_augment",
  "mysticalagriculture:water_breathing_augment",
  "mysticalagriculture:night_vision_augment",
  "mysticalagriculture:water_breathing_augment",
  "mysticalagriculture:absorption_ii_augment",
  "mysticalagriculture:jump_boost_i_augment",
  "mysticalagriculture:health_boost_ii_augment",
  "mysticalagriculture:speed_i_augment",
  "mysticalagriculture:mining_aoe_i_augment",
  "mysticalagriculture:tilling_aoe_i_augment",
  "mysticalagriculture:pathing_aoe_ii_augment",
  "mysticalagriculture:blindness_resistance_augment",
  "mysticalagriculture:absorption_iii_augment",
  "mysticalagriculture:luck_ii_augment",
  "mysticalagriculture:fire_resistance_augment",
  "mysticalagriculture:jump_boost_ii_augment",
  "mysticalagriculture:step_assist_augment",
  "mysticalagriculture:health_boost_iii_augment",
  "mysticalagriculture:strength_i_augment",
  "mysticalagriculture:speed_ii_augment",
  "mysticalagriculture:haste_i_augment",
  "mysticalagriculture:no_fall_damage_augment",
  "mysticalagriculture:slow_falling_augment",
  "mysticalagriculture:tilling_aoe_iv_augment",
  "mysticalagriculture:mining_aoe_ii_augment",
  "mysticalagriculture:tilling_aoe_ii_augment",
  "mysticalagriculture:attack_aoe_i_augment",
  "mysticalagriculture:pathing_aoe_iii_augment",
  "mysticalagriculture:weakness_resistance_augment",
  "mysticalagriculture:slowness_resistance_augment",
  "mysticalagriculture:absorption_iv_augment",
  "mysticalagriculture:poison_resistance_augment",
  "mysticalagriculture:jump_boost_iii_augment",
  "mysticalagriculture:health_boost_iv_augment",
  "mysticalagriculture:strength_ii_augment",
  "mysticalagriculture:speed_iii_augment",
  "mysticalagriculture:haste_ii_augment",
  "mysticalagriculture:mining_aoe_iii_augment",
  "mysticalagriculture:attack_aoe_ii_augment",
  "mysticalagriculture:tilling_aoe_iii_augment",
  "mysticalagriculture:pathing_aoe_iv_augment",
  "mysticalagriculture:mining_fatigue_resistance_augment",
  "mysticalagriculture:hunger_resistance_augment",
  "mysticalagriculture:absorption_v_augment",
  "mysticalagriculture:luck_iii_augment",
  "mysticalagriculture:wither_resistance_augment",
  "mysticalagriculture:health_boost_v_augment",
  "mysticalagriculture:strength_iii_augment",
  "mysticalagriculture:haste_iii_augment",
  "mysticalagriculture:mining_aoe_iv_augment",
  "mysticalagriculture:attack_aoe_iii_augment",
  "extendedcrafting:recipe_maker",
  "extendedcrafting:flux_star",
  "extendedcrafting:the_ultimate_component",
  "extendedcrafting:crystaltine_component",
  "extendedcrafting:enhanced_ender_component",
  "extendedcrafting:ender_component",
  "extendedcrafting:enhanced_redstone_component",
  "extendedcrafting:redstone_component",
  "extendedcrafting:enhanced_redstone_catalyst",
  "extendedcrafting:ender_catalyst",
  "extendedcrafting:enhanced_ender_catalyst",
  "extendedcrafting:crystaltine_catalyst",
  "extendedcrafting:the_ultimate_catalyst",
  "extendedcrafting:basic_component",
  "extendedcrafting:advanced_component",
  "extendedcrafting:elite_component",
  "extendedcrafting:ultimate_component",
  "extendedcrafting:redstone_catalyst",
  "extendedcrafting:ultimate_catalyst",
  "extendedcrafting:elite_catalyst",
  "extendedcrafting:advanced_catalyst",
  "extendedcrafting:basic_catalyst",
  "extendedcrafting:black_iron_slate",
  "extendedcrafting:the_ultimate_nugget",
  "extendedcrafting:crystaltine_nugget",
  "extendedcrafting:enhanced_redstone_nugget",
  "extendedcrafting:redstone_nugget",
  "extendedcrafting:black_iron_nugget",
  "extendedcrafting:the_ultimate_ingot",
  "extendedcrafting:crystaltine_ingot",
  "extendedcrafting:enhanced_redstone_ingot",
  "extendedcrafting:redstone_ingot",
  "extendedcrafting:black_iron_ingot",
  "extendedcrafting:frame",
  "extendedcrafting:flux_star_block",
  "extendedcrafting:the_ultimate_block",
  "extendedcrafting:crystaltine_block",
  "extendedcrafting:enhanced_redstone_ingot_block",
  "extendedcrafting:redstone_ingot_block",
  "extendedcrafting:black_iron_block",
  "extendedcrafting:luminessence_block",
  "extendedcrafting:luminessence",
  "ftbstuff:tube",
  "immersiveengineering:armor_steel_boots",
  "immersiveengineering:armor_steel_leggings",
  "immersiveengineering:armor_steel_chestplate",
  "immersiveengineering:armor_steel_helmet",
  "oritech:nickel_clump",
  "oritech:platinum_clump",
  "oritech:iron_clump",
  "oritech:copper_clump",
  "oritech:gold_clump",
  "enderio:flour",
  "mekanism:sps_port",
  "mekanism:sps_casing",
  "mekanism:supercharged_coil",
  "metalbarrels:wood_to_obsidian",
  "metalbarrels:silver_to_diamond",
  "metalbarrels:silver_to_netherite",
  "metalbarrels:wood_to_netherite",
  "metalbarrels:wood_to_diamond",
  "metalbarrels:copper_to_obsidian",
  "metalbarrels:copper_to_silver",
  "metalbarrels:iron_to_diamond",
  "metalbarrels:silver_to_obsidian",
  "metalbarrels:silver_to_gold",
  "metalbarrels:copper_to_netherite",
  "metalbarrels:gold_to_obsidian",
  "metalbarrels:wood_to_gold",
  "metalbarrels:gold_to_netherite",
  "metalbarrels:iron_to_obsidian",
  "metalbarrels:wood_to_silver",
  "metalbarrels:iron_to_netherite",
  "metalbarrels:iron_to_silver",
  "metalbarrels:copper_to_gold",
  "metalbarrels:obsidian_to_netherite",
  "metalbarrels:copper_to_diamond",
  "metalbarrels:diamond_to_netherite",
  "metalbarrels:wood_to_crystal",
  "metalbarrels:copper_to_crystal",
  "metalbarrels:iron_to_crystal",
  "metalbarrels:silver_to_crystal",
  "metalbarrels:gold_to_crystal",
  "metalbarrels:silver_barrel",
  "extendedae:threshold_export_bus",
  "extendedae:assembler_matrix_frame",
  "extendedae:assembler_matrix_wall",
  "extendedae:assembler_matrix_glass",
  "extendedae:assembler_matrix_pattern",
  "extendedae:assembler_matrix_crafter",
  "extendedae:assembler_matrix_speed",
  "extendedae:pattern_provider_upgrade",
  "extendedae:ex_pattern_provider_part",
  "extendedae:ex_pattern_provider",
];

const pickle_cobblestones = [
  "pickletweaks:white_cobblestone",
  "pickletweaks:orange_cobblestone",
  "pickletweaks:magenta_cobblestone",
  "pickletweaks:light_blue_cobblestone",
  "pickletweaks:yellow_cobblestone",
  "pickletweaks:lime_cobblestone",
  "pickletweaks:pink_cobblestone",
  "pickletweaks:gray_cobblestone",
  "pickletweaks:light_gray_cobblestone",
  "pickletweaks:cyan_cobblestone",
  "pickletweaks:purple_cobblestone",
  "pickletweaks:blue_cobblestone",
  "pickletweaks:brown_cobblestone",
  "pickletweaks:green_cobblestone",
  "pickletweaks:red_cobblestone",
  "pickletweaks:black_cobblestone",
];

const removeEnchants = [
  "pneumaticcraft:pneumatic_boots",
  "pneumaticcraft:pneumatic_chestplate",
  "pneumaticcraft:pneumatic_helmet",
  "pneumaticcraft:pneumatic_leggings",
];

const hideOnly = [
  "#minecraft:boats",
  "enderio:powdered_obsidian",
  "mekanism:dust_obsidian",
  "occultism:obsidian_dust",
  "oritech:still_oil_bucket",
  "pneumaticcraft:plastic_bucket",
  "mekanism:hdpe_sheet",
  "ars_nouveau:glyph_crush",
  "immersiveengineering:plantoil_bucket",
  "immersiveengineering:biodiesel_bucket",
  "immersiveengineering:ethanol_bucket",
  "mysticalagradditions:awakened_supremium_paxel",
  "mysticalagradditions:imperium_paxel",
  "mysticalagradditions:supremium_paxel",
  "mysticalagradditions:prudentium_paxel",
  "mysticalagradditions:tertium_paxel",
  "mysticalagriculture:prudentium_sword",
  "mysticalagriculture:prudentium_pickaxe",
  "mysticalagriculture:prudentium_shovel",
  "mysticalagriculture:prudentium_axe",
  "mysticalagriculture:prudentium_hoe",
  "mysticalagriculture:prudentium_bow",
  "mysticalagriculture:prudentium_crossbow",
  "mysticalagriculture:prudentium_shears",
  "mysticalagriculture:prudentium_sickle",
  "mysticalagriculture:prudentium_scythe",
  "mysticalagriculture:tertium_sword",
  "mysticalagriculture:tertium_pickaxe",
  "mysticalagriculture:supremium_scythe",
  "mysticalagriculture:awakened_supremium_sword",
  "mysticalagriculture:awakened_supremium_pickaxe",
  "mysticalagriculture:awakened_supremium_shovel",
  "mysticalagriculture:awakened_supremium_axe",
  "mysticalagriculture:awakened_supremium_hoe",
  "mysticalagriculture:awakened_supremium_bow",
  "mysticalagriculture:awakened_supremium_shears",
  "mysticalagriculture:awakened_supremium_crossbow",
  "mysticalagriculture:tertium_shovel",
  "mysticalagriculture:tertium_axe",
  "mysticalagriculture:tertium_hoe",
  "mysticalagriculture:tertium_bow",
  "mysticalagriculture:tertium_crossbow",
  "mysticalagriculture:tertium_shears",
  "mysticalagriculture:tertium_sickle",
  "mysticalagriculture:imperium_sword",
  "mysticalagriculture:tertium_scythe",
  "mysticalagriculture:imperium_pickaxe",
  "mysticalagriculture:imperium_shovel",
  "mysticalagriculture:imperium_axe",
  "mysticalagriculture:imperium_hoe",
  "mysticalagriculture:imperium_bow",
  "mysticalagriculture:imperium_crossbow",
  "mysticalagriculture:imperium_shears",
  "mysticalagriculture:imperium_sickle",
  "mysticalagriculture:imperium_scythe",
  "mysticalagriculture:supremium_sword",
  "mysticalagriculture:supremium_pickaxe",
  "mysticalagriculture:supremium_shovel",
  "mysticalagriculture:supremium_axe",
  "mysticalagriculture:supremium_hoe",
  "mysticalagriculture:supremium_bow",
  "mysticalagriculture:supremium_crossbow",
  "mysticalagriculture:supremium_shears",
  "mysticalagriculture:supremium_sickle",
  "mysticalagriculture:awakened_supremium_scythe",
  "mysticalagriculture:awakened_supremium_sickle"
];

const allow_carryon = [
  "enderstorage:ender_chest",
  "enderio:vacuum_chest",
  "ironchest:trapped_gold_chest",
  "ironchest:trapped_dirt_chest",
  "starbunclemania:star_bin",
  "ironchest:trapped_obsidian_chest",
  "ironchest:iron_chest",
  "ironchest:trapped_crystal_chest",
  "ironchest:trapped_copper_chest",
  "ironchest:trapped_diamond_chest",
  "ironchest:dirt_chest",
  "ironchest:trapped_iron_chest",
  "ironchest:obsidian_chest",
  "ironchest:crystal_chest",
  "ironchest:copper_chest",
  "ironchest:diamond_chest",
  "ironchest:gold_chest",
  "sushigocrafting:fermentation_barrel",
  "immersiveengineering:metal_barrel",
  "immersiveengineering:wooden_barrel",
  "immersiveengineering:crate",
  "immersiveengineering:reinforced_crate",
  "nautec:crate",
  "nautec:rusty_crate",
];

ServerEvents.tags("item", (event) => {
  const shards = event.get("mekanism:shards").getObjectIds();
  shards.forEach((shard) => {
    event.add("c:shards", shard);
  });
  event.add("c:ingots/yellorium", "ftbmaterials:uranium_ingot");
  removeTagsAndHide.forEach((id) => {
    event.removeAllTagsFrom(id);
    event.add("c:hidden_from_recipe_viewers", id);
  });

  allow_carryon.forEach((id) => event.add("c:allow_carryon", id));

  hideOnly.forEach((id) => event.add("c:hidden_from_recipe_viewers", id));

  removeEnchants.forEach((id) => {
    event.removeAllTagsFrom(id);
  });
  event.add("minecraft:trimmable_armor", removeEnchants);

  event.add("c:pncboots", "pneumaticcraft:pneumatic_boots");
  event.add("c:pncchestplate", "pneumaticcraft:pneumatic_chestplate");
  event.add("c:pnchelmet", "pneumaticcraft:pneumatic_helmet");
  event.add("c:pncleggings", "pneumaticcraft:pneumatic_leggings");

  //Kelp Plastic Tag
  event.add("oceanblock:plastics", "industrialforegoing:plastic");
  event.add("oceanblock:plastics", "oceanblock:kelp_plastic");

  // Making Chipped Cobblestone more Compatible with other Recipes.
  const cobblestones = event.get("chipped:cobblestone").getObjectIds();
  (cobblestones && pickle_cobblestones).forEach((cobblestone) => {
    event.add("minecraft:stone_crafting_materials", cobblestone);
    event.add("minecraft:stone_tool_materials", cobblestone);
    event.add("mekanism:stone_crafting_materials", cobblestone);
  });

  global.resources.forEach((t) => {
    const itemID = "ftbmaterials:" + t.toLowerCase() + "_cluster";
    event.add(`c:raw_materials`, itemID);
    event.add(`c:raw_materials/${t.toLowerCase()}`, itemID);
  });

  event.add("minecraft:enchantable/mining", [
    "ftbstuff:stone_hammer",
    "ftbstuff:iron_hammer",
    "ftbstuff:gold_hammer",
    "ftbstuff:diamond_hammer",
    "ftbstuff:netherite_hammer",
  ]);

  event.add("minecraft:enchantable/durability", [
    "ftbstuff:stone_hammer",
    "ftbstuff:iron_hammer",
    "ftbstuff:gold_hammer",
    "ftbstuff:diamond_hammer",
    "ftbstuff:netherite_hammer",
  ]);

  event.add("c:sticks", ["minecraft:stick"]);

  //Adding this tag back since some recipes apparently use it.
  event.add(`c:obsidian`, "minecraft:obsidian");

  //Adding the PNC Plastic Tag for Oritech's Plastic
  event.add("pneumaticcraft:plastic_sheets", "oritech:plastic_sheet");

  //Expanding the All Quartz Tag
  event.add("ae2:all_quartz_dust", "ftbmaterials:quartz_dust");

  event.add("c:raw_materials/lapis_lazuli", "ftbmaterials:lapis_lazuli_cluster");
  event.add("curios:rift_charge_meter", "ftb:rift_charge_meter");
  event.add("curios:belt", "minecraft:soul_lantern");
  event.add("curios:charm", "minecraft:soul_lantern");

  event.add("minecraft:piglin_loved", [
    "justdirethings:blazegold_helmet",
    "justdirethings:blazegold_chestplate",
    "justdirethings:blazegold_leggings",
    "justdirethings:blazegold_boots",
    "sophisticatedbackpacks:gold_backpack",
  ]);

  event.add("minecraft:pickaxes", "#ftbstuff:hammers");

  event.add("c:crops/rice", "sushigocrafting:rice");

  //Creating a Tag for Sag Milling Stone without Deepslate to avoid recipe conflicts.
  event.add("ftb:non_deep_stones", [
    "minecraft:stone",
    "minecraft:granite",
    "minecraft:polished_granite",
    "minecraft:diorite",
    "minecraft:polished_diorite",
    "minecraft:andesite",
    "minecraft:polished_andesite",
    "minecraft:tuff",
    "minecraft:infested_stone",
    "minecraft:infested_cobblestone",
    "pneumaticcraft:compressed_stone",
    "pneumaticcraft:reinforced_stone",
  ]);

  event.add("replication:cant_be_scanned", "enderio:conduit");
  event.add("replication:cant_be_disintegrated", "enderio:conduit");
});

const notWater = ["oritech:still_oil", "oritech:still_fuel"];

ServerEvents.tags("fluid", (event) => {
  notWater.forEach((fluid) => {
    event.remove("minecraft:water", fluid);
  });

  event.add("c:algae", "nautec:electrolyte_algae_serum");

  //Part of Oil Unification
  event.add("c:hidden_from_recipe_viewers", [
    "oritech:still_oil",
    "mekansim:hydrofluoric_acid",
    "immersiveengineering:high_powered_biodiesel",
    "pneumaticcraft:kersoene",
    "pneumaticcraft:diesel",
    "pneumaticcraft:gasoline",
    "mekanism:uranium_hexafluoride",
    "mekanism:hydrofluoric_acid",
    "mysticalaggadditions:molten_supremium",
    "mysticalaggadditions:molten_inferium",
    "mysticalaggadditions:molten_prudentium",
    "mysticalaggadditions:molten_tertium",
    "mysticalaggadditions:molten_soulium",
    "bigreactors:yellorium",
    "productivemetalworks:molten_brass_bucket",
  ]);

  event.add("c:turbofuel", "oritech:still_fuel");
  event.add("c:oil", "pneumaticcraft:oil");
  event.add("c:t1fuel", "justdirethings:refined_t2_fluid_source");
  event.add("c:t2fuel", "justdirethings:refined_t3_fluid_source");
  event.add("c:t3fuel", "justdirethings:refined_t4_fluid_source");

  //Part of Plastic Unification
  event.removeAllTagsFrom("pneumaticcraft:plastic");
  event.add("c:hidden_from_recipe_viewers", "pneumaticcraft:plastic");

  //Part of Plant/Vegetal Oil Unification
  event.add("c:plantoil", "pneumaticcraft:vegetable_oil");
  event.removeAllTagsFrom("immersiveengineering:plantoil");
  event.add("c:hidden_from_recipe_viewers", "immersiveengineering:plantoil");

  //Part of Bio Diesel Unification
  event.add("c:biodiesel", "pneumaticcraft:biodiesel");
  event.removeAllTagsFrom("immersiveengineering:biodiesel");
  event.add("c:hidden_from_recipe_viewers", "immersiveengineering:biodiesel");

  //Part of Ethanol Unification
  event.add("c:ethanol", "pneumaticcraft:ethanol");
  event.removeAllTagsFrom("immersiveengineering:ethanol");
  event.add("c:hidden_from_recipe_viewers", "immersiveengineering:ethanol");

  event.remove("c:yellorium", ["bigreactors:yellorium", "bigreactors:yellorium_flowing"]);
  event.add("c:yellorium", "productivemetalworks:molten_uranium");
});

ServerEvents.tags("mekanism:chemical", (event) => {
  event.add("c:hidden_from_recipe_viewers", [
    "mekanism:hydrofluoric_acid",
    "mekanism:uranium_hexafluoride",
    "mekanism:fissile_fuel",
  ]);
});

ServerEvents.tags("block_entity_type", (event) => {
  allow_carryon.forEach((id) => event.add("c:allow_carryon", id));
});

ServerEvents.tags("block", (event) => {
  event.removeAllTagsFrom([
    "ftbstuff:white_barrel",
    "ftbstuff:green_barrel",
    "ftbstuff:blue_barrel",
    "ftbstuff:purple_barrel",
    "ftbstuff:red_barrel",
    "ftbstuff:black_barrel",
    "ftbstuff:golden_barrel",
    "ftbstuff:small_crate",
    "ftbstuff:crate",
    "ftbstuff:pulsating_crate",
  ]);

  allow_carryon.forEach((id) => event.add("c:allow_carryon", id));

  event.add("ftbstuff:barrel", [
    "ftbstuff:white_barrel",
    "ftbstuff:green_barrel",
    "ftbstuff:blue_barrel",
    "ftbstuff:purple_barrel",
    "ftbstuff:red_barrel",
    "ftbstuff:black_barrel",
    "ftbstuff:golden_barrel",
    "ftbstuff:small_crate",
    "ftbstuff:crate",
    "ftbstuff:pulsating_crate",
  ]);

  event.add("ftbultimine:excluded_blocks", "#ftbstuff:barrel");

  event.add("ftbstuff:barrel/metal", [
    "ftbstuff:white_barrel",
    "ftbstuff:green_barrel",
    "ftbstuff:blue_barrel",
    "ftbstuff:purple_barrel",
    "ftbstuff:red_barrel",
    "ftbstuff:black_barrel",
    "ftbstuff:golden_barrel",
  ]);

  event.add("ftbstuff:barrel/wooden", ["ftbstuff:small_crate", "ftbstuff:crate", "ftbstuff:pulsating_crate"]);

  global.compressables.forEach((item) => {
    let maxLevel = 3;
    for (let i = 1; i <= maxLevel; i++) {
      let compressedType = i === 1 ? `ftbstuff:compressed_${item}` : `ftbstuff:compressed_${item}_${i}`;
      event.remove("minecraft:needs_stone_tool", compressedType);
    }
  });

  event.add("c:relocation_not_supported", ["#ftbstuff:barrel", "minecraft:trial_spawner"]);

  event.add("mekanism:cardboard_blacklist", ["nautec:prismarine_crystal_part", "nautec:prismarine_crystal"]);
});

ServerEvents.tags("worldgen/biome", (event) => {
  event.add("ftb:below_ocean", [
    "minecraft:deep_frozen_ocean",
    "minecraft:deep_cold_ocean",
    "minecraft:deep_lukewarm_ocean",
    "minecraft:deep_ocean",
  ]);

  event.add("ftb:above_ocean", [
    "minecraft:cold_ocean",
    "minecraft:frozen_ocean",
    "minecraft:lukewarm_ocean",
    "minecraft:ocean",
    "minecraft:warm_ocean",
    "ftb:aquabound_expanse",
  ]);

  event.add("ftb:nether", ["ftb:infernal_abyss"]);

  event.add("ftb:rift", ["ftb:rift", "minecraft:the_void"]);
});

ServerEvents.tags("painting_variant", (event) => {
  event.add("ftbstuff:drops_with_variant", ["ftb:oceanblock", "ftb:oceanblock_night", "minecraft:bust"]);
});

//Also Removing Recipes for what's in 'removeTagsAndHide'.
ServerEvents.recipes((event) => {
  removeTagsAndHide.forEach((recipe) => {
    event.remove({ output: recipe });
  });
});

ServerEvents.tags("worldgen/structure", (event) => {
  event.add("ftb:oceanlegendlocator", "nautec:ruins_1");
});

ServerEvents.tags("worldgen/structure_set", (event) => {
  event.add("ftb:deepwater", ["minecraft:ancient_cities", "nautec:ruins_1"]);
});

const chunksEntityWhitelist = [
  "hpm:corvette_steamship",
  "hpm:corvettesteamshipdamaged",
  "hpm:cutter",
  "hpm:raft",
  "hpm:shipwreckedraft",
  "hpm:shipwreckeswashbuckler",
  "hpm:swashbuckler",
  "hpm:swashbucklerupgraded",
  "hpm:wreckedswashbucklerupgrade",
  "hpm:cutter_pirate",
  "hpm:cutter_piratewreck",
  "hpm:cutter_wreckback",
  "hpm:cutter_wreckfront",
  "hpm:cutter_piratedamaged",
  "hpm:cutterdamaged",
  "hpm:cuttermilitarised",
  "hpm:cuttermilitariseddamaged",
  "justaraftmod:raft",
];

ServerEvents.tags("entity_type", (event) => {
  event.add("mob_grinding_utils:no_dreadful_spawn", "minecraft:slime");
  chunksEntityWhitelist.forEach((entity) => {
    event.add("ftbchunks:entity_interact_whitelist", entity);
  });

  [
    "minecraft:cow",
    "minecraft:sheep",
    "minecraft:chicken",
    "minecraft:pig",
    "minecraft:horse",
    "minecraft:donkey",
  ].forEach((entity) => {
    event.add("mob_grinding_utils:no_delightful_spawn", entity);
  });
});
