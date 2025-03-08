// priority: 101

const removePneumaticCraft = [
  "pneumaticcraft:air_conditioning_upgrade",
  "pneumaticcraft:coordinate_tracker_upgrade",
  "pneumaticcraft:elytra_upgrade",
  "pneumaticcraft:ender_visor_upgrade",
  "pneumaticcraft:gilded_upgrade",
  "pneumaticcraft:search_upgrade",
  "pneumaticcraft:jet_boots_upgrade_3",
  "pneumaticcraft:jet_boots_upgrade_2",
  "pneumaticcraft:jet_boots_upgrade_4",
  "pneumaticcraft:jet_boots_upgrade_1",
  "pneumaticcraft:jet_boots_upgrade_5",
  "pneumaticcraft:jumping_upgrade_3",
  "pneumaticcraft:jumping_upgrade_2",
  "pneumaticcraft:jumping_upgrade_4",
  "pneumaticcraft:jumping_upgrade_1",
  "pneumaticcraft:radiation_shielding_upgrade",
  "pneumaticcraft:stomp_upgrade",
  "pneumaticcraft:thaumcraft_upgrade",
];

ServerEvents.tags("item", (event) => {
  removePneumaticCraft.forEach((id) => {
    event.removeAllTagsFrom(id);
    event.add("c:hidden_from_recipe_viewers", id);
    event.add("pneumaticcraft:armor_upgrade_blacklist", id);
  });

  event.remove("minecraft:chest_armour", "pneumaticcraft:pneumatic_chestplate");
  event.remove("minecraft:chest_armour", "pickletweaks:flint_chestplate");
  event.remove("pneumaticcraft:upgrade_components", "minecraft:lapis_lazuli");


  event.add("pneumaticcraft:armor_upgrade_blacklist", [
    "pneumaticcraft:block_tracker_upgrade",
    "pneumaticcraft:entity_tracker_upgrade",
    "pneumaticcraft:magnet_upgrade",
    "pneumaticcraft:muffler_upgrade",
    "pneumaticcraft:range_upgrade",
    "pneumaticcraft:speed_upgrade",
  ]);
});

ServerEvents.recipes((event) => {
  removePneumaticCraft.forEach((id) => {
    event.remove({ output: id });
  });

  event.replaceInput({ id: 'pneumaticcraft:armor_upgrade'}, 'minecraft:diamond', 'oritech:adamant_ingot')
  
  event
    .shaped(Item.of("pneumaticcraft:scuba_upgrade", 1), ["ABA", "CDC", "AEA"], {
      A: "justdirethings:ferricore_ingot",
      B: "pneumaticcraft:air_canister",
      C: "enderio:fused_quartz",
      D: "pneumaticcraft:upgrade_matrix",
      E: "pneumaticcraft:compressed_iron_gear",
    })
    .id("ftb:scuba");

    event
    .shaped(Item.of("pnc_ocean_addons:depth_upgrade_1", 1), ["ABA", "CDC", "ACA"], {
      A: "oritech:adamant_ingot",
      B: "immersiveengineering:electron_tube",
      C: "enderio:energetic_alloy_ingot",
      D: "pneumaticcraft:upgrade_matrix"
    })
    .id("ftb:mk1");    

    event
    .shaped(Item.of("pnc_ocean_addons:depth_upgrade_2", 1), ["ABA", "CDC", "AEA"], {
      A: "justdirethings:eclipsealloy_ingot",
      B: "mekanism:alloy_atomic",
      C: "enderio:energetic_alloy_ingot",
      D: "pnc_ocean_addons:depth_upgrade_1",
      E: 'oritech:flux_gate'
    })
    .id("ftb:mk2");


    event
    .shaped(Item.of("pneumaticcraft:flux_compressor", 1), ["ABC", "ADE", "AFC"], {
      A: "enderio:copper_alloy_nugget",
      B: "ftbmaterials:invar_gear",
      C: "immersiveengineering:electron_tube",
      D: "bigreactors:basic_turbinerotorbearing",
      E: 'pneumaticcraft:advanced_pressure_tube',
      F: 'minecraft:blast_furnace'
    })
    .id("ftb:flux_compressor");    

    
    event
    .shaped(Item.of("pneumaticcraft:reinforced_pressure_tube", 8), ["AAA", "ABA", "AAA"], {
      A: "pneumaticcraft:pressure_tube",
      B: "#c:ingots/steel"
    })
    .id("ftb:reinforced_pressure_tube");    

    event
    .shaped(Item.of("pneumaticcraft:advanced_pressure_tube", 8), ["AAA", "ABA", "AAA"], {
      A: "pneumaticcraft:reinforced_pressure_tube",
      B: "#c:ingots/adamant"
    })
    .id("ftb:advanced_pressure_tube");

    let plastic_unified_recipes = [
      "pneumaticcraft:jackhammer",
      "pneumaticcraft:classify_filter"
    ];

    plastic_unified_recipes.forEach(recipe => {
        event.replaceInput({ id: recipe }, "pneumaticcraft:plastic", "#pneumaticcraft:plastic_sheets")
    });

    //Making Armor Upgrade a bit more Expensive.
    event.custom({
      type: "oritech:assembler",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: "nautec:aquarine_steel",
        },
        {
          tag: "c:gems/diamond",
        },
        {
          tag: "c:gems/diamond",
        },
        {
          tag: "c:gems/diamond",
        },
      ],
      results: [
        {
          count: 1,
          id: "pneumaticcraft:armor_upgrade",
        },
      ],
      time: 200,
    }).id("ftb:oritech/assembler/pneumaticcraft/armor_upgrade");

});
