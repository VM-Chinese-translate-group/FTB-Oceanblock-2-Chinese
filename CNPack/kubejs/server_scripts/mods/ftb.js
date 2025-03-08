const twoByTwo = ["II", "II"];

ServerEvents.recipes((event) => {
  let pebble_recipes = [
    ["ftb:stone_pebbles", "minecraft:cobblestone"],
    ["ftb:andesite_pebbles", "minecraft:andesite"],
    ["ftb:granite_pebbles", "minecraft:granite"],
    ["ftb:diorite_pebbles", "minecraft:diorite"],
    ["ftb:calcite_pebbles", "minecraft:calcite"],
    ["ftb:deepslate_pebbles", "minecraft:deepslate"],
    ["ftb:tuff_pebbles", "minecraft:tuff"],
    ["ftb:basalt_pebbles", "minecraft:basalt"],
    ["ftb:endstone_pebbles", "minecraft:end_stone"],
    ["ftb:netherrack_pebbles", "minecraft:netherrack"],
    ["ftb:red_sandstone_pebbles", "minecraft:red_sandstone"],
    ["ftb:sandstone_pebbles", "minecraft:sandstone"],
  ];

  pebble_recipes.forEach((recipe) => {
    let pebbleName = recipe[0].split(":")[1].toLowerCase();
    event
      .shaped(`${recipe[1]}`, twoByTwo, { I: `${recipe[0]}` })
      .id(`ftbmaterials:ftb/pebbles/${pebbleName}_compressing`);
  });

  //Making Kelp Resin
  event.custom({
    type: "farmersdelight:cooking",
    cookingtime: 1200,
    experience: 0.35,
    ingredients: [
      {
        item: "minecraft:kelp",
      },
      {
        item: "minecraft:kelp",
      },
      {
        item: "minecraft:kelp",
      },
      {
        item: "minecraft:kelp",
      },
      {
        item: "minecraft:kelp",
      },
      {
        item: "minecraft:kelp",
      },
    ],
    recipe_book_tab: "misc",
    result: {
      count: 2,
      id: "ftb:kelp_goo",
    },
  });

  //Nautical Eye
  event
    .shaped("ftb:nautical_eye", [" G ", "GEG", " G "], {
      G: "minecraft:prismarine_shard",
      E: "minecraft:ender_eye",
    })
    .id("ftb:nautical_eye");

  //Abyssal Eye
  event
    .shaped("ftb:abyssal_pearl", [" G ", "GEG", " G "], {
      G: "ftb:abyssal_fragment",
      E: "minecraft:ender_pearl",
    })
    .id("ftb:abyssal_pearl");

  //rusty gear
  event
    .shapeless("nautec:rusty_gear", ["nautec:air_bottle", "pneumaticcraft:compressed_iron_gear"])
    .id("ftb:rusty_gear");

  //broken whisk
  event.shapeless("nautec:broken_whisk", ["nautec:cast_iron_rod", "3x #c:wires/steel"]).id("ftb:broken_whisk");

  //burn coil
  event
    .shapeless("nautec:burnt_coil", ["2x #c:ingots/cast_iron", "#c:rods/blaze", "#c:dusts/prismarine"])
    .id("ftb:burnt_coil");

  //ancient valve
  event
    .shapeless("nautec:ancient_valve", [
      "minecraft:netherite_scrap",
      "pneumaticcraft:turbine_rotor",
      "2x #c:dusts/prismarine",
    ])
    .id("ftb:ancient_valve");

  //Magma Droplet
  event.shapeless("9x ftb:magma_droplet", "minecraft:magma_block").id("ftb:magma_droplet");
  event.shaped("minecraft:magma_block", ["III", "III", "III"], { I: "ftb:magma_droplet" }).id("ftb:magma_block");

  //wither rose
  event
    .custom({
      type: "occultism:spirit_fire",
      ingredient: {
        item: "minecraft:poppy",
      },
      result: {
        count: 1,
        id: "minecraft:wither_rose",
      },
    })
    .id("ftb:wither_rose");

  // Extend Craft
  event
    .shaped("extendedcrafting:auto_ender_crafter", ["SMS", "MEM", "SMS"], {
      E: "extendedcrafting:ender_crafter",
      S: "nautec:aquarine_steel_ingot",
      M: "pneumaticcraft:upgrade_matrix",
    })
    .id("ftb:ender_craft_auto");

  event.replaceInput({ id: "advanced_ae:swim_speed_card" }, "minecraft:oak_boat", "justaraftmod:bamboo_raft");

  //Adding uses to the Dimensional Shard Block ====================================================

  // # First, Decompressing Recipes!
  event
    .shapeless(Item.of("rftoolsbase:dimensionalshard", 4), ["1x ftbmaterials:dimensional_shard_block"])
    .id("ftb:shapeless_decompressing/dimensional_shard_block");
  event
    .custom({
      type: "farmersdelight:cutting",
      ingredients: [{ item: "ftbmaterials:dimensional_shard_block" }],
      result: [{ item: { count: 4, id: "rftoolsbase:dimensionalshard" } }],
      tool: { type: "farmersdelight:item_ability", action: "pickaxe_dig" },
    })
    .id("ftb:cutting/dimensional_shard_block");
  event
    .custom({
      type: "immersiveengineering:crusher",
      energy: 3200,
      input: { item: "ftbmaterials:dimensional_shard_block" },
      result: { basePredicate: { item: "rftoolsbase:dimensionalshard" }, count: 4 },
    })
    .id("ftb:crusher/dimensional_shard_block");

  // # Second, Compressing Recipes! (There's also a compacting drawer recipe added in functional_storage.js)
  event
    .shaped(Item.of("ftbmaterials:dimensional_shard_block", 1), ["DD", "DD"], {
      D: "rftoolsbase:dimensionalshard",
    })
    .id("ftb:shaped_compressing/dimensional_shard_block");

  // ==============================================================================================

  //Making the Sluice a Wooden Sluice instead of exclusively Oak.
  event.replaceInput({ id: "ftbstuff:oak_sluice" }, "minecraft:oak_log", "#minecraft:logs");

  event.replaceInput([{ id: "toolbelt:pouch" }, { id: "toolbelt:belt" }], "minecraft:leather", "#c:leathers");
});
