ServerEvents.recipes((event) => {
  //Moving IE Alloy Kiln Recipes to the Foundry / Alloy Smelter from OriTech
  //Bronze just can't be made here due to require amount of inputs and some recipes may not be as efficient as done in other machines.
  //Why this device doesn't allow more than 1 input? -_-

  let kiln_recipes = [
    [1, "c:ingots/copper", 1, "c:ingots/zinc", 2, "ftbmaterials:brass_ingot", 200],
    [1, "c:ingots/iron", 1, "c:ingots/nickel", 1, "ftbmaterials:invar_ingot", 200],
    [1, "c:ingots/copper", 1, "c:ingots/nickel", 2, "ftbmaterials:constantan_ingot", 200],
    [1, "c:ingots/silver", 1, "c:ingots/gold", 2, "ftbmaterials:electrum_ingot", 200],
    [1, "c:glass_blocks", 1, "c:dusts/iron", 1, "immersiveengineering:insulating_glass", 200],
    [1, "c:coal_coke", 1, "c:ingots/iron", 1, "ftbmaterials:steel_ingot", 500],
    [1, "c:ingots/steel", 1, "c:obsidian", 1, "enderio:dark_steel_ingot", 200],
  ];

  kiln_recipes.forEach((recipe) => {
    let output_split = recipe[5].split(":");
    let output_name = output_split[1];
    let time_ticks = recipe[6];

    event
      .custom({
        type: "oritech:foundry",
        fluidInputAmount: 0,
        fluidInputVariant: "minecraft:empty",
        fluidOutputAmount: 0,
        fluidOutputVariant: "minecraft:empty",
        ingredients: [
          {
            count: recipe[0],
            tag: recipe[1],
          },
          {
            count: recipe[2],
            tag: recipe[3],
          },
        ],
        results: [
          {
            count: recipe[4],
            id: recipe[5],
          },
        ],
        time: time_ticks,
      })
      .id("ftb:foundry_alloying/" + output_name);

    event
      .custom({
        type: "oritech:foundry",
        fluidInputAmount: 0,
        fluidInputVariant: "minecraft:empty",
        fluidOutputAmount: 0,
        fluidOutputVariant: "minecraft:empty",
        ingredients: [
          {
            count: recipe[2],
            tag: recipe[3],
          },
          {
            count: recipe[0],
            tag: recipe[1],
          },
        ],
        results: [
          {
            count: recipe[4],
            id: recipe[5],
          },
        ],
        time: time_ticks,
      })
      .id("ftb:foundry_alloying/inverse/" + output_name);
  });

  //Machine Core 2 Requires the First Tier
  event.replaceInput({ id: "oritech:crafting/core2" }, "minecraft:lapis_lazuli", "oritech:machine_core_1");
  event.replaceInput({ id: "oritech:crafting/core2alt" }, "minecraft:lapis_lazuli", "oritech:machine_core_1");

  event.replaceInput({ id: "oritech:crafting/fluidpipe" }, "ae2:silicon", "enderio:conduit_binder");

  //Replacing Basic Generator in Recipes with Machine Cores
  let generator_ids = [
    "oritech:crafting/solar",
    "oritech:crafting/lavagen",
    "oritech:crafting/fuelgen",
    "oritech:crafting/steamgen",
  ];

  generator_ids.forEach((recipe) => {
    event.replaceInput({ id: recipe }, "oritech:basic_generator_block", "oritech:machine_core_2");
  });

  event
    .custom({
      type: "oritech:particle_collision",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          item: "justdirethings:time_crystal",
        },
        {
          tag: "c:gems/fluix",
        },
      ],
      results: [
        {
          count: 4,
          id: "mekanism:pellet_antimatter",
        },
      ],
      time: 500,
    })
    .id("ftb:oritech/particle_collision/antimatter");

  //Tweaking Bio Generator Recipe
  event
    .shaped(Item.of("oritech:bio_generator_block", 1), ["SSS", "SRS", "CFC"], {
      C: "oritech:magnetic_coil",
      F: "oritech:machine_core_2",
      S: "#c:ingots/adamant",
      R: "#c:chests",
    })
    .id("ftb:oritech/crafting/biogen");

  //wrench
  event
    .shaped(Item.of("oritech:wrench", 1), [" N ", " IN", "N  "], {
      I: "#c:ingots/iron",
      N: "#c:ingots/nickel",
    })
    .id("ftb:oritech/wrench");

  //
  event
    .shaped(Item.of("oritech:centrifuge_block", 1), ["BBB", "MAM", "ECE"], {
      B: "minecraft:glass_bottle",
      M: "oritech:motor",
      A: "#c:ingots/adamant",
      E: "#c:circuits/elite",
      C: "#oritech:plating",
    })
    .id("ftb:oritech/centrifuge");

  //Tweaking Boiler Recipe
  event
    .shaped(Item.of("oritech:steam_boiler_addon", 1), ["PPP", "PCP", "SLS"], {
      P: "oritech:fluid_pipe",
      C: "#c:ingots/copper_alloy",
      S: "#c:ingots/invar",
      L: "#oritech:plating",
    })
    .id("ftb:oritech/crafting/addon/steamboiler");

  //Reading Oritech's Tech Door Recipe so it avoids a conflict with IE.
  event
    .shaped(Item.of("oritech:tech_door", 1), ["SS ", "CC ", "SS "], {
      C: "#c:ingots/copper",
      S: "#c:ingots/steel",
    })
    .id("ftb:oritech/crafting/techdoor");

  //Fixing Addon Speed Recipe
  event.replaceInput({ id: "oritech:crafting/addon/speed" }, "oritech:biosteel_ingot", "#c:ingots/steel");

  event
    .shaped(Item.of("oritech:magnetic_coil", 1), ["   ", "ABA", "   "], {
      A: "#c:wires/electrum",
      B: "#c:ingots/invar",
    })
    .id("ftb:oritech/coil");

  //Adding a Fragmenting Forge for Iesnium -> Platinum
  event
    .custom({
      type: "oritech:grinder",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: "c:ingots/iesnium",
        },
      ],
      results: [
        {
          count: 1,
          id: "ftbmaterials:platinum_cluster",
        },
        {
          count: 2,
          id: "ftbmaterials:platinum_chunk",
        },
      ],
      time: 200,
    })
    .id("ftb:oritech/grinder/iesnium_ingot");

  event.replaceInput(
    { mod: "oritech", type: "minecraft:crafting_shaped", input: "#c:wires" },
    "#c:wires",
    "oritech:insulated_wire"
  );

  //Oritech's Motor now requires Ferricore instead of Steel
  event.replaceInput({ id: "oritech:motor/motorcraft" }, "#c:ingots/steel", "justdirethings:ferricore_ingot");

  //Oritech's Reinforced Copper Plating now requires Invar instead of Steel and Copper Alloy instead of Normal Copper
  event.replaceInput({ id: "oritech:crafting/plating" }, "#c:ingots/steel", "#c:ingots/invar");
  event.replaceInput({ id: "oritech:crafting/plating" }, "#c:ingots/copper", "#c:ingots/copper_alloy");

  //Oritech's  Steam Engine now requires Copper Alloy
  event.replaceInput({ id: "oritech:crafting/steamgen" }, "#c:ingots/copper", "#c:ingots/copper_alloy");

  event
    .custom({
      type: "oritech:assembler",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: "c:dusts/wood",
        },
        {
          tag: "c:dusts/wood",
        },
        {
          tag: "c:dusts/wood",
        },
        {
          tag: "c:dusts/wood",
        },
      ],
      results: [
        {
          count: 1,
          id: "mekanism:cardboard_box",
        },
      ],
      time: 160,
    })
    .id("ftb:oritech/assembler/cardboard_box");

  event
    .custom({
      type: "oritech:assembler",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          item: "actuallyadditions:empowered_void_crystal",
        },
        {
          tag: "c:skulls",
        },
        {
          item: "ftb:abyssal_pearl",
        },
        {
          tag: "c:ingots/eclipsealloy",
        },
      ],
      results: [
        {
          count: 1,
          id: "minecraft:dragon_head",
        },
      ],
      time: 160,
    })
    .id("ftb:oritech/assembler/dragon_head");

  event
    .custom({
      type: "oritech:centrifuge_fluid",
      fluidInputAmount: 20250,
      fluidInputVariant: "mekanism:sulfuric_acid",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: "c:dusts/lead",
        },
      ],
      results: [
        {
          count: 4,
          id: "bigreactors:anglesite_crystal",
        },
      ],
      time: 200,
    })
    .id("ftb:oritech/centrifuge/anglesite_crystal");

  event
    .custom({
      type: "oritech:centrifuge_fluid",
      fluidInputAmount: 20250,
      fluidInputVariant: "justdirethings:polymorphic_fluid_source",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: "c:dusts/aluminum",
        },
      ],
      results: [
        {
          count: 4,
          id: "bigreactors:benitoite_crystal",
        },
      ],
      time: 200,
    })
    .id("ftb:oritech/centrifuge/benitoite_crystal");

  //fuels
  event
    .custom({
      type: "oritech:fuel_generator",
      fluidInputAmount: 8100,
      fluidInputVariant: "justdirethings:refined_t2_fluid_source",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [],
      results: [],
      time: 160,
    })
    .id("ftb:oritech/fuelgen/t2");

  event
    .custom({
      type: "oritech:fuel_generator",
      fluidInputAmount: 8100,
      fluidInputVariant: "justdirethings:refined_t3_fluid_source",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [],
      results: [],
      time: 240,
    })
    .id("ftb:oritech/fuelgen/t3");

  event
    .custom({
      type: "oritech:fuel_generator",
      fluidInputAmount: 8100,
      fluidInputVariant: "justdirethings:refined_t4_fluid_source",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [],
      results: [],
      time: 480,
    })
    .id("ftb:oritech/fuelgen/t4");

  let oritech_clump_recipes = [
    ["oritech:small_nickel_clump", "ftbmaterials:nickel_clump"],
    ["oritech:small_platinum_clump", "ftbmaterials:platinum_clump"],
    ["oritech:small_iron_clump", "ftbmaterials:iron_clump"],
    ["oritech:small_copper_clump", "ftbmaterials:copper_clump"],
    ["oritech:small_gold_clump", "ftbmaterials:gold_clump"],
  ];

  oritech_clump_recipes.forEach((clump) => {
    event
      .shaped(Item.of(clump[1], 1), ["PPP", "PPP", "PPP"], {
        P: clump[0],
      })
      .id("ftb:oritech/small_to_normal_" + clump[1].split(":")[1]);
  });

  //Nerfing Netherite Ingot Recipe ==============================================================
  //By making it use 4 Scraps instead of only 1.
  event
    .custom({
      type: "enderio:alloy_smelting",
      energy: 4800,
      experience: 0.3,
      inputs: [
        {
          count: 4,
          item: "minecraft:netherite_scrap",
        },
      ],
      output: {
        count: 1,
        id: "ftb:stacked_netherite",
      },
    })
    .id("ftb:alloying/stacked_netherite");

  // ==============================================================================================
});
