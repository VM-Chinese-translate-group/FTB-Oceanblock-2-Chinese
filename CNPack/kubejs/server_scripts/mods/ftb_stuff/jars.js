/* Temperatures: "chilled", "normal" (Default), "hot", "superheated" */
const jarRecipes = [
  {
    inputFluids: [["minecraft:lava"]],
    inputItems: [["minecraft:redstone"]],
    outputItems: [["minecraft:netherrack", 16]],
    temperature: "superheated",
    recipeName: "netherrack",
  },
  {
    inputFluids: [["minecraft:lava"]],
    inputItems: [["minecraft:glowstone"]],
    outputItems: [["minecraft:end_stone"]],
    recipeName: "glowstone",
  },
  {
    inputFluids: [["minecraft:lava", 8000]],
    inputItems: [["minecraft:glowstone", 8]],
    outputItems: [["minecraft:end_stone", 8]],
    recipeName: "glowstone_16",
  },
  {
    inputItems: [
      ["minecraft:sand", 1],
      ["minecraft:bone_meal", 1],
    ],
    outputItems: [["utilitarian:snad", 1]],
    recipeName: "snad",
  },
  {
    inputItems: [
      ["minecraft:red_sand", 1],
      ["minecraft:bone_meal", 1],
    ],
    outputItems: [["utilitarian:red_snad", 1]],
    recipeName: "redsnad",
  },

  {
    inputItems: [["#minecraft:saplings", 8]],
    outputItems: [["minecraft:dirt"]],
    recipeName: "dirt_saplings",
  },
  {
    inputItems: [
      ["minecraft:sand", 8],
      ["enderio:grains_of_infinity", 1],
    ],
    outputItems: [["minecraft:suspicious_sand", 8]],
    recipeName: "suspicious_sand",
  },
  {
    inputItems: [
      ["minecraft:gravel", 8],
      ["enderio:grains_of_infinity", 1],
    ],
    outputItems: [["minecraft:suspicious_gravel", 8]],
    recipeName: "suspicious_gravel",
  },
  {
    inputItems: [["#c:seeds", 8]],
    outputItems: [["minecraft:dirt"]],
    recipeName: "dirt_seeds",
  },
  {
    inputItems: [["#minecraft:saplings", 64]],
    outputItems: [["minecraft:dirt", 8]],
    recipeName: "dirt_saplings_8",
  },
  {
    inputItems: [["#c:seeds", 64]],
    outputItems: [["minecraft:dirt", 8]],
    recipeName: "dirt_seed_8",
  },
  {
    inputFluids: [["minecraft:lava"], ["justdirethings:polymorphic_fluid_source"]],
    outputItems: [["minecraft:basalt", 16]],
    recipeName: "basalt",
  },
  {
    inputFluids: [["justdirethings:refined_t4_fluid_source", 500]],
    inputItems: [["#c:dusts/adamant"]],
    temperature: "superheated",
    outputItems: [["ftbmaterials:platinum_raw_ore", 1]],
    recipeName: "platinum_from_adamant",
  },
  {
    inputFluids: [["justdirethings:polymorphic_fluid_source", 500]],
    inputItems: [["#c:gems/black_quartz"], ["justdirethings:coal_t1"]],
    temperature: "superheated",
    outputItems: [["replication:raw_replica", 2]],
    recipeName: "replica_ore",
  },
  {
    inputItems: [["#minecraft:sand"], ["#c:gravels"]],
    inputFluids: [["minecraft:water"]],
    outputItems: [["minecraft:clay_ball", 32]],
    recipeName: "clay",
  },
  {
    inputFluids: [["minecraft:water"]],
    outputItems: [["minecraft:ice"]],
    temperature: "chilled",
    recipeName: "ice",
  },
  {
    inputItems: [["#c:cobblestones"]],
    outputFluids: [["minecraft:lava"]],
    temperature: "hot",
    recipeName: "cobblestone",
  },
  {
    inputItems: [["mysticalagriculture:prosperity_shard", 4], ["#c:seeds"]],
    outputItems: [["mysticalagriculture:prosperity_seed_base"]],
    recipeName: "prosperity_shard",
  },
  {
    inputItems: [
      ["mysticalagriculture:prosperity_shard", 64],
      ["#c:seeds", 16],
    ],
    outputItems: [["mysticalagriculture:prosperity_seed_base", 16]],
    recipeName: "prosperity_shard_16",
  },
  {
    inputFluids: [["justdirethings:polymorphic_fluid_source", 100]],
    inputItems: [["#c:sands"]],
    outputItems: [["minecraft:soul_sand"]],
    recipeName: "soul_sand",
  },
  {
    inputItems: [["#c:cobblestones", 8], ["mysticalagriculture:soulium_dust"]],
    outputItems: [["mysticalagriculture:soulstone_cobble", 9]],

    recipeName: "soulstone_cobblestone",
  },
  {
    inputItems: [["#c:ingots/iron"], ["#minecraft:coals"]],
    outputItems: [["ftbstuff:cast_iron_ingot"]],
    temperature: "hot",
    recipeName: "castiron",
  },
  {
    inputItems: [["#c:ingots/iron", 16], ["#minecraft:coals"]],
    outputItems: [["ftbstuff:cast_iron_ingot", 16]],
    temperature: "superheated",
    recipeName: "castiron_16",
  },
  {
    inputFluids: [["minecraft:water", 125]],
    outputItems: [["mekanism:salt"]],
    temperature: "hot",
    recipeName: "salt",
  },
  {
    inputFluids: [["minecraft:water"]],
    inputItems: [["mekanism:salt", 4]],
    outputFluids: [["nautec:saltwater"]],
    recipeName: "salt_water",
  },

  {
    inputFluids: [["minecraft:water"], ["minecraft:lava"]],
    outputItems: [["minecraft:obsidian"]],
    recipeName: "obsidian",
  },
  {
    inputFluids: [["minecraft:lava", 250]],
    inputItems: [["ae2:sky_dust"], ["minecraft:redstone"]],
    outputItems: [["fluxnetworks:flux_dust"]],
    temperature: "superheated",
    recipeName: "flux_dust",
  },
  {
    inputFluids: [["justdirethings:refined_t3_fluid_source", 1000]],
    inputItems: [["ftb:charged_prosperity_seed"]],
    outputItems: [["ftb:charged_voidflame_seed"]],
    temperature: "superheated",
    recipeName: "charged_voidflame_seed",
  },
];

const clusters = [
  { cluster: "iron", ingot: "iron_ingot", namespace: "minecraft" },
  { cluster: "copper", ingot: "copper_ingot", namespace: "minecraft" },
  { cluster: "gold", ingot: "gold_ingot", namespace: "minecraft" },
  { cluster: "redstone", ingot: "redstone", namespace: "minecraft", amount: 6 },
  { cluster: "lapis_lazuli", ingot: "lapis_lazuli", block: "minecraft:lapis_block", namespace: "minecraft", amount: 1 },
  { cluster: "quartz", ingot: "quartz", namespace: "minecraft", superheatedAmount: 4 },
  { cluster: "diamond", ingot: "diamond", namespace: "minecraft" },
  { cluster: "emerald", ingot: "emerald", namespace: "minecraft" },
  { cluster: "lead", ingot: "lead_ingot", namespace: "ftbmaterials" },
  { cluster: "nickel", ingot: "nickel_ingot", namespace: "ftbmaterials" },
  { cluster: "osmium", ingot: "osmium_ingot", namespace: "ftbmaterials" },
  { cluster: "aluminum", ingot: "aluminum_ingot", namespace: "ftbmaterials" },
  { cluster: "uranium", ingot: "uranium_ingot", namespace: "ftbmaterials" },
  { cluster: "tin", ingot: "tin_ingot", namespace: "ftbmaterials" },
  { cluster: "silver", ingot: "silver_ingot", namespace: "ftbmaterials" },
  { cluster: "platinum", ingot: "platinum_ingot", namespace: "ftbmaterials" },
];

clusters.forEach((type) => {
  const { cluster, ingot, block, namespace, amount, superheatedAmount } = type;

  const blockName = block ? block : `${namespace}:${ingot.split("_")[0]}_block`;
  const amountOut = amount ? amount : 1;
  const superheatedamount = superheatedAmount ? superheatedAmount : 9;

  jarRecipes.push({
    inputItems: [[`#c:raw_materials/${cluster}`]],
    outputItems: [[`${namespace}:${ingot}`, amountOut]],
    temperature: "hot",
    recipeName: `${cluster}`,
  });
  jarRecipes.push({
    inputItems: [[`#c:raw_materials/${cluster}`, superheatedamount]],
    outputItems: [[blockName, amountOut]],
    temperature: "superheated",
    recipeName: `${cluster}_block`,
  });
});

ServerEvents.recipes((event) => {
  jarRecipes.forEach((recipe) => {
    event
      .custom({
        type: "ftbstuff:jar",
        input_fluids: recipe.inputFluids
          ? recipe.inputFluids.map(([fluid, amount]) => ({
              fluid: fluid,
              amount: amount !== undefined ? amount : 1000,
            }))
          : [],
        input_items: recipe.inputItems
          ? recipe.inputItems.map(([item, count]) =>
              item && item.startsWith("#")
                ? { tag: item.slice(1), count: count !== undefined ? count : 1 }
                : { item: item, count: count !== undefined ? count : 1 }
            )
          : [],
        output_fluids: recipe.outputFluids
          ? recipe.outputFluids.map(([fluid, amount]) => ({
              id: fluid,
              amount: amount !== undefined ? amount : 1000,
            }))
          : [],
        output_items: recipe.outputItems
          ? recipe.outputItems.map(([id, count]) => ({
              id: id,
              count: count !== undefined ? count : 1,
            }))
          : [],
        temperature: recipe.temperature !== undefined ? recipe.temperature : "normal",
        time: recipe.time !== undefined ? recipe.time : 200,
      })
      .id(`ftbstuff:jars/${recipe.recipeName}`);
  });

  event
    .custom({
      type: "ftbstuff:jar",
      input_fluids: [
        {
          amount: 250,
          fluid: "integrateddynamics:menril_resin",
        },
      ],
      input_items: [
        {
          count: 4,
          item: "justdirethings:coal_t1",
        },
        {
          count: 1,
          item: "ftb:abyssal_pearl",
        },
      ],
      output_items: [
        {
          count: 1,
          id: "gateways:gate_pearl",
          components: {
            "gateways:gateway": "gateways:basic/enderman",
          },
        },
      ],
      temperature: "chilled",
    })
    .id("ftbstuff:jars/gate_pearl");

  event
    .custom({
      type: "ftbstuff:jar",
      input_fluids: [
        {
          amount: 500,
          fluid: "justdirethings:polymorphic_fluid_source",
        },
      ],
      input_items: [
        {
          count: 4,
          item: "oritech:wither_crop_block",
        },
        {
          count: 1,
          item: "minecraft:writable_book",
        },
      ],
      output_items: [
        {
          count: 1,
          id: "minecraft:enchanted_book",
          components: {
            "minecraft:stored_enchantments": {
              levels: {
                "soulbound:soulbound": 1,
              },
            },
          },
        },
      ],
      temperature: "superheated",
    })
    .id("ftbstuff:jars/gate_soulbound");

  /*  {
    inputFluids: [["justdirethings:polymorphic_fluid_source", 500]],
    inputItems: [["#c:gems/black_quartz"], ["justdirethings:coal_t1"]],
    temperature: "superheated",
    outputItems: [["replication:raw_replica", 2]],
    recipeName: "replica_ore",
  },  */
});
