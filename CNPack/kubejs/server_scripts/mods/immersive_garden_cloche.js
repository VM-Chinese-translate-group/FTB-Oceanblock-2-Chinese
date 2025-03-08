ServerEvents.recipes(function (event) {
  event.remove({ type: "immersiveengineering:cloche" });

  // Define the cloche soils array to be used for both cloche and stem recipes.
  var clocheSoils = [
    { item: "minecraft:dirt", time: 640 },
    { item: "farmersdelight:rich_soil", time: 400 },
    { item: "justdirethings:goosoil_tier1", time: 160 },
    { item: "justdirethings:goosoil_tier2", time: 120 },
    { item: "justdirethings:goosoil_tier3", time: 80 },
    { item: "justdirethings:goosoil_tier4", time: 40 },
    { item: "mysticalagriculture:inferium_farmland", time: 400 },
    { item: "mysticalagriculture:prudentium_farmland", time: 240 },
    { item: "mysticalagriculture:tertium_farmland", time: 200 },
    { item: "mysticalagriculture:imperium_farmland", time: 160 },
    { item: "mysticalagriculture:supremium_farmland", time: 80 },
    { item: "mysticalagradditions:insanium_farmland", time: 40 },
  ];

  // Helper function to remove any bracketed portion from an item ID.
  function cleanItemId(item) {
    var idx = item.indexOf("[");
    if (idx !== -1) {
      return item.substring(0, idx);
    }
    return item;
  }

  // ---------------------------------------------------------------------------
  // Helper: add a cloche recipe for all soils in clocheSoils.
  // ---------------------------------------------------------------------------
  function addClocheRecipe(clocheInput, clocheOutput, clocheOutputCount, clocheBlockRenderer, clocheRenderMethod) {
    var outputParts = clocheOutput.split(":");
    var clocheOutputName = outputParts[1];

    // Loop over the cloche soils array.
    for (var i = 0; i < clocheSoils.length; i++) {
      var soilData = clocheSoils[i];
      event
        .custom({
          type: "immersiveengineering:cloche",
          input: { item: clocheInput },
          render: { type: clocheRenderMethod, block: clocheBlockRenderer },
          results: [{ basePredicate: { item: clocheOutput }, count: clocheOutputCount }],
          soil: { item: soilData.item },
          time: soilData.time,
        })
        .id("ftb:cloche/" + cleanItemId(clocheOutputName) + "_from_" + cleanItemId(soilData.item).split(":")[1]);
      //console.log("Added cloche recipe id: " + "ftb:cloche/" + clocheOutputName + "_from_" + cleanItemId(soilData.item).split(":")[1]);
    }
  }

  // ---------------------------------------------------------------------------
  // List of cloche recipes
  // Format: [clocheInput, clocheOutput, clocheOutputCount, clocheBlockRenderer, clocheRenderMethod]
  // ---------------------------------------------------------------------------
  var clocheRecipes = [
    // Immersive Engineering
    [
      "immersiveengineering:seed",
      "immersiveengineering:hemp_fiber",
      2,
      "immersiveengineering:hemp",
      "immersiveengineering:crop",
    ],

    // Farmer's Delight
    ["farmersdelight:tomato_seeds", "farmersdelight:tomato", 2, "farmersdelight:tomatoes", "immersiveengineering:crop"],
    ["farmersdelight:rice", "farmersdelight:rice", 1, "farmersdelight:rice_panicles", "immersiveengineering:crop"],
    [
      "farmersdelight:cabbage_seeds",
      "farmersdelight:cabbage",
      1,
      "farmersdelight:cabbages",
      "immersiveengineering:crop",
    ],
    ["farmersdelight:onion", "farmersdelight:onion", 2, "farmersdelight:onions", "immersiveengineering:crop"],

    // Vanilla Crops
    [
      "minecraft:sweet_berries",
      "minecraft:sweet_berries",
      2,
      "minecraft:sweet_berry_bush",
      "immersiveengineering:crop",
    ],
    ["minecraft:glow_berries", "minecraft:glow_berries", 1, "minecraft:cave_vines", "immersiveengineering:crop"],
    ["minecraft:potato", "minecraft:potato", 1, "minecraft:potatoes", "immersiveengineering:crop"],
    ["minecraft:carrot", "minecraft:carrot", 1, "minecraft:carrots", "immersiveengineering:crop"],
    ["minecraft:beetroot_seeds", "minecraft:beetroot", 2, "minecraft:beetroots", "immersiveengineering:crop"],
    [
      "minecraft:torchflower_seeds",
      "minecraft:torchflower",
      1,
      "minecraft:torchflower_crop",
      "immersiveengineering:crop",
    ],

    // Vanilla Nature
    ["minecraft:wheat_seeds", "minecraft:wheat", 1, "minecraft:wheat", "immersiveengineering:crop"],
    ["minecraft:red_mushroom", "minecraft:red_mushroom", 1, "minecraft:red_mushroom", "immersiveengineering:generic"],
    [
      "minecraft:crimson_fungus",
      "minecraft:crimson_fungus",
      1,
      "minecraft:crimson_fungus",
      "immersiveengineering:generic",
    ],
    [
      "minecraft:brown_mushroom",
      "minecraft:brown_mushroom",
      1,
      "minecraft:brown_mushroom",
      "immersiveengineering:generic",
    ],
    [
      "minecraft:warped_fungus",
      "minecraft:warped_fungus",
      1,
      "minecraft:warped_fungus",
      "immersiveengineering:generic",
    ],
    ["minecraft:chorus_flower", "minecraft:chorus_fruit", 1, "minecraft:chorus_flower", "immersiveengineering:generic"],
    ["minecraft:cocoa_beans", "minecraft:cocoa_beans", 1, "minecraft:cocoa", "immersiveengineering:crop"],
    ["minecraft:nether_wart", "minecraft:nether_wart", 1, "minecraft:nether_wart", "immersiveengineering:generic"],
    ["minecraft:cactus", "minecraft:cactus", 1, "minecraft:cactus", "immersiveengineering:generic"],
    ["minecraft:bamboo", "minecraft:bamboo", 1, "minecraft:bamboo", "immersiveengineering:stacking"],
    ["minecraft:sugar_cane", "minecraft:sugar_cane", 1, "minecraft:sugar_cane", "immersiveengineering:generic"],
    ["minecraft:moss_block", "minecraft:moss_block", 1, "minecraft:moss_block", "immersiveengineering:generic"],
    ["minecraft:short_grass", "minecraft:short_grass", 1, "minecraft:short_grass", "immersiveengineering:generic"],
    ["minecraft:fern", "minecraft:fern", 1, "minecraft:fern", "immersiveengineering:generic"],

    // Vanilla Flowers
    ["minecraft:pink_tulip", "minecraft:pink_tulip", 1, "minecraft:pink_tulip", "immersiveengineering:generic"],
    ["minecraft:rose_bush", "minecraft:rose_bush", 1, "minecraft:rose_bush", "immersiveengineering:generic"],
    ["minecraft:cornflower", "minecraft:cornflower", 1, "minecraft:cornflower", "immersiveengineering:generic"],
    ["minecraft:wither_rose", "minecraft:wither_rose", 1, "minecraft:wither_rose", "immersiveengineering:generic"],
    ["minecraft:white_tulip", "minecraft:white_tulip", 1, "minecraft:white_tulip", "immersiveengineering:generic"],
    ["minecraft:peony", "minecraft:peony", 1, "minecraft:peony", "immersiveengineering:generic"],
    ["minecraft:orange_tulip", "minecraft:orange_tulip", 1, "minecraft:orange_tulip", "immersiveengineering:generic"],
    ["minecraft:poppy", "minecraft:poppy", 1, "minecraft:poppy", "immersiveengineering:generic"],
    ["minecraft:dandelion", "minecraft:dandelion", 1, "minecraft:dandelion", "immersiveengineering:generic"],
    ["minecraft:sunflower", "minecraft:sunflower", 1, "minecraft:sunflower", "immersiveengineering:generic"],
    ["minecraft:red_tulip", "minecraft:red_tulip", 1, "minecraft:red_tulip", "immersiveengineering:generic"],
    ["minecraft:allium", "minecraft:allium", 1, "minecraft:allium", "immersiveengineering:generic"],
    ["minecraft:blue_orchid", "minecraft:blue_orchid", 1, "minecraft:blue_orchid", "immersiveengineering:generic"],
    [
      "minecraft:lily_of_the_valley",
      "minecraft:lily_of_the_valley",
      1,
      "minecraft:lily_of_the_valley",
      "immersiveengineering:generic",
    ],
    ["minecraft:oxeye_daisy", "minecraft:oxeye_daisy", 1, "minecraft:oxeye_daisy", "immersiveengineering:generic"],
    ["minecraft:lilac", "minecraft:lilac", 1, "minecraft:lilac", "immersiveengineering:generic"],
    ["minecraft:azure_bluet", "minecraft:azure_bluet", 1, "minecraft:azure_bluet", "immersiveengineering:generic"],

    // Ars Crops
    [
      "ars_nouveau:magebloom_crop",
      "ars_nouveau:magebloom",
      1,
      "ars_nouveau:magebloom_crop",
      "immersiveengineering:crop",
    ],
    [
      "ars_nouveau:sourceberry_bush",
      "ars_nouveau:sourceberry_bush",
      1,
      "ars_nouveau:sourceberry_bush",
      "immersiveengineering:crop",
    ],
    ["ars_nouveau:bastion_pod", "ars_nouveau:bastion_pod", 1, "ars_nouveau:bastion_pod", "immersiveengineering:crop"],
    [
      "ars_nouveau:frostaya_pod",
      "ars_nouveau:frostaya_pod",
      1,
      "ars_nouveau:frostaya_pod",
      "immersiveengineering:crop",
    ],
    [
      "ars_nouveau:bombegranate_pod",
      "ars_nouveau:bombegranate_pod",
      1,
      "ars_nouveau:bombegranate_pod",
      "immersiveengineering:crop",
    ],
    [
      "ars_nouveau:mendosteen_pod",
      "ars_nouveau:mendosteen_pod",
      1,
      "ars_nouveau:mendosteen_pod",
      "immersiveengineering:crop",
    ],

    // Actually Additions
    [
      "actuallyadditions:coffee_beans",
      "actuallyadditions:coffee_beans",
      1,
      "actuallyadditions:coffee",
      "immersiveengineering:crop",
    ],
    [
      "actuallyadditions:canola_seeds",
      "actuallyadditions:canola",
      1,
      "actuallyadditions:canola",
      "immersiveengineering:crop",
    ],
    ["actuallyadditions:flax_seeds", "supplementaries:flax", 1, "actuallyadditions:flax", "immersiveengineering:crop"],

    // Occultism
    ["occultism:datura_seeds", "occultism:datura", 1, "occultism:datura", "immersiveengineering:crop"],

    // Sushi go Crafting
    [
      "sushigocrafting:sesame_seeds",
      "sushigocrafting:sesame_seeds",
      1,
      "sushigocrafting:sesame_crop",
      "immersiveengineering:crop",
    ],
    [
      "sushigocrafting:wasabi_seeds",
      "sushigocrafting:wasabi_root",
      1,
      "sushigocrafting:wasabi_crop",
      "immersiveengineering:crop",
    ],
    [
      "sushigocrafting:soy_seeds",
      "sushigocrafting:soy_bean",
      1,
      "sushigocrafting:soy_crop",
      "immersiveengineering:crop",
    ],
    [
      "sushigocrafting:cucumber_seeds",
      "sushigocrafting:cucumber",
      1,
      "sushigocrafting:cucumber_crop",
      "immersiveengineering:crop",
    ],

    // Rustic Delight
    [
      "rusticdelight:bell_pepper_seeds",
      "rusticdelight:bell_pepper_green",
      1,
      "rusticdelight:bell_peppers",
      "immersiveengineering:crop",
    ],
    ["rusticdelight:cotton_seeds", "rusticdelight:cotton_boll", 2, "rusticdelight:cotton", "immersiveengineering:crop"],
  ];

  // ---------------------------------------------------------------------------
  // Add mystical agriculture recipes by iterating over a list of crop types.
  // Each mystical recipe follows the pattern:
  //   mysticalagriculture:{type}_seeds → mysticalagriculture:{type}_essence,
  //   using mysticalagriculture:{type}_crop as the block.
  // ---------------------------------------------------------------------------
  var mysticalSeeds = [
    "soulium",
    "air",
    "earth",
    "water",
    "fire",
    "inferium",
    "stone",
    "dirt",
    "wood",
    "ice",
    "deepslate",
    "nature",
    "dye",
    "nether",
    "coal",
    "coral",
    "honey",
    "amethyst",
    "hop_graphite",
    "peridot",
    "sapphire",
    "ruby",
    "uranium",
    "nickel",
    "experience",
    "end",
    "lapis_lazuli",
    "obsidian",
    "redstone",
    "glowstone",
    "nether_quartz",
    "copper",
    "iron",
    "menril",
    "grains_of_infinity",
    "saltpeter",
    "sulfur",
    "silicon",
    "fluix",
    "rubber",
    "armadillo",
    "cow",
    "pig",
    "chicken",
    "sheep",
    "turtle",
    "gold",
    "certus_quartz",
    "sky_stone",
    "lead",
    "silver",
    "zinc",
    "tin",
    "rabbit",
    "prismarine",
    "osmium",
    "fluorite",
    "diamond",
    "emerald",
    "netherite",
    "platinum",
    "iridium",
    "cyanite",
    "uraninite",
    "nether_star",
    "dragon_egg",
    "creeper",
    "skeleton",
    "zombie",
    "aluminum",
    "slime",
    "squid",
    "fish",
    "spider",
    "graphite",
    "bronze",
    "redstone_alloy",
    "copper_alloy",
    "pulsating_alloy",
    "dark_steel",
    "constantan",
    "soularium",
    "conductive_alloy",
    "end_steel",
    "vibrant_alloy",
    "wither_skeleton",
    "compressed_iron",
    "refined_obsidian",
    "refined_glowstone",
    "energetic_alloy",
    "enderman",
    "breeze",
    "blaze",
    "ghast",
    "invar",
    "steel",
    "electrum",
  ];

  // For each mystical seed type, push a new recipe into clocheRecipes.
  for (var m = 0; m < mysticalSeeds.length; m++) {
    var type = mysticalSeeds[m];
    clocheRecipes.push([
      "mysticalagriculture:" + type + "_seeds",
      "mysticalagriculture:" + type + "_essence",
      1,
      "mysticalagriculture:" + type + "_crop",
      "immersiveengineering:crop",
    ]);
  }

  // Loop over recipes and add them
  for (var j = 0; j < clocheRecipes.length; j++) {
    var recipe = clocheRecipes[j];
    addClocheRecipe(recipe[0], recipe[1], recipe[2], recipe[3], recipe[4]);
  }

  // ---------------------------------------------------------------------------
  // Helper: add a stem-based recipe (for pumpkin and melon)
  // ---------------------------------------------------------------------------
  function addStemRecipe(seed, crop, stem, attachedStem, soilItem, time) {
    event.custom({
      type: "immersiveengineering:cloche",
      input: { item: seed },
      render: {
        type: "immersiveengineering:stem",
        attachedStem: attachedStem,
        crop: crop,
        stem: stem,
      },
      results: [{ item: crop }, { item: seed }],
      soil: { item: soilItem },
      time: time,
    });
  }

  // Use the clocheSoils array for stem recipes.
  for (var k = 0; k < clocheSoils.length; k++) {
    var soilData = clocheSoils[k];
    var soilItem = soilData.item;
    var time = soilData.time;

    addStemRecipe(
      "minecraft:melon_seeds",
      "minecraft:melon",
      "minecraft:melon_stem",
      "minecraft:attached_melon_stem",
      soilItem,
      time
    );
    addStemRecipe(
      "minecraft:pumpkin_seeds",
      "minecraft:pumpkin",
      "minecraft:pumpkin_stem",
      "minecraft:attached_pumpkin_stem",
      soilItem,
      time
    );
  }

  //add custom coffee seed variant due to name duplication
  for (var i = 0; i < clocheSoils.length; i++) {
    var soilData = clocheSoils[i];
    event
      .custom({
        type: "immersiveengineering:cloche",
        input: { item: "rusticdelight:coffee_beans" },
        render: { type: "immersiveengineering:crop", block: "rusticdelight:coffee" },
        results: [
          { basePredicate: { item: "rusticdelight:coffee_beans" }, count: 2 },
          { item: "rusticdelight:coffee_beans" },
        ],
        soil: { item: soilData.item },
        time: soilData.time,
      })
      .id("ftb:cloche/alternate_coffee_from_rusticdelights/" + cleanItemId(soilData.item).split(":")[1]);
  }
  event
    .shapeless(Item.of("sushigocrafting:sesame_seed[sushigocrafting:amount=50]"), ["sushigocrafting:sesame_seeds"])
    .id("ftb:crafting/sesame_seed");
});
