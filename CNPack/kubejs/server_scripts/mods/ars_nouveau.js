const crushRecipes = [
  [
    "c:gravels",
    [
      ["minecraft:dirt", 1.0],
      ["minecraft:flint", 0.02],
    ],
  ],
  ["minecraft:dirt", [["minecraft:sand", 1.0]]],
  ["minecraft:sand", [["ftbstuff:dust", 1.0]]],
];

ServerEvents.recipes((event) => {
  event.remove({ id: "ars_nouveau:gravel" });

  crushRecipes.forEach((recipe, index) => {
    const inputTag = recipe[0];
    const outputs = recipe[1].map(([outputId, chance]) => ({
      chance: chance,
      maxRange: 1,
      stack: {
        count: 1,
        id: outputId,
      },
    }));

    event
      .custom({
        type: "ars_nouveau:crush",
        input: {
          tag: inputTag,
        },
        output: outputs,
      })
      .id(`ftb:ars/crushing/recipe_${index}`);
  });

  event
    .custom({
      type: "ars_nouveau:enchanting_apparatus",
      keepNbtOfReagent: false,
      pedestalItems: [
        {
          tag: "c:dusts/quartz",
        },
        {
          tag: "c:dusts/quartz",
        },
        {
          tag: "rftoolsbase:shards",
        },
        {
          item: "minecraft:sculk",
        },
      ],
      reagent: {
        item: "minecraft:amethyst_shard",
      },
      result: {
        count: 1,
        id: "minecraft:echo_shard",
      },
      sourceCost: 0,
    })
    .id("ftb:ars/enchanting_apparatus/echo_shard");

  //Custom Laser Recipe to get Archwood

  // Custom Laser Recipe to get Archwood

  let archwood_list = [
    [
      "minecraft:crimson_fungus",
      "ars_nouveau:red_archwood_sapling",
      "minecraft:crimson_stem",
      "ars_nouveau:red_archwood_log",
      "minecraft:nether_wart_block",
      "ars_nouveau:red_archwood_leaves",
    ],
    [
      "ars_nouveau:red_archwood_sapling",
      "ars_nouveau:purple_archwood_sapling",
      "ars_nouveau:red_archwood_log",
      "ars_nouveau:purple_archwood_log",
      "ars_nouveau:red_archwood_leaves",
      "ars_nouveau:purple_archwood_leaves",
    ],
    [
      "ars_nouveau:purple_archwood_sapling",
      "ars_nouveau:blue_archwood_sapling",
      "ars_nouveau:purple_archwood_log",
      "ars_nouveau:blue_archwood_log",
      "ars_nouveau:purple_archwood_leaves",
      "ars_nouveau:blue_archwood_leaves",
    ],
    [
      "ars_nouveau:blue_archwood_sapling",
      "ars_nouveau:green_archwood_sapling",
      "ars_nouveau:blue_archwood_log",
      "ars_nouveau:green_archwood_log",
      "ars_nouveau:blue_archwood_leaves",
      "ars_nouveau:green_archwood_leaves",
    ],
    [
      "ars_nouveau:green_archwood_sapling",
      "minecraft:crimson_fungus",
      "ars_nouveau:green_archwood_log",
      "minecraft:crimson_stem",
      "ars_nouveau:green_archwood_leaves",
      "minecraft:nether_wart_block",
    ],
  ];

  archwood_list.forEach((entry) => {
    for (let i = 0; i < entry.length; i += 2) {
      let input = entry[i];
      let output = entry[i + 1];
      let outputNameSplit = output.split(":");
      let outputName = outputNameSplit[1];

      event
        .custom({
          type: "actuallyadditions:laser",
          energy: 60,
          ingredient: {
            item: input,
          },
          result: {
            id: output,
          },
        })
        .id(`ftb:actuallyadditions/atomic_reconstructor/${outputName}`);
    }
  });

  event
    .custom({
      type: "ars_nouveau:enchanting_apparatus",
      keepNbtOfReagent: false,
      pedestalItems: [
        {
          tag: "c:gems/diamond",
        },
        {
          tag: "c:gems/diamond",
        },
        {
          tag: "c:gems/diamond",
        },
        {
          item: "minecraft:torch",
        },
        {
          item: "minecraft:torch",
        },
        {
          item: "minecraft:torch",
        },
      ],
      reagent: {
        item: "ars_nouveau:red_archwood_sapling",
      },
      result: {
        count: 1,
        id: "torchmaster:megatorch",
      },
      sourceCost: 0,
    })
    .id("ftb:ars/enchanting_apparatus/megatorch");

  event
    .shaped(Item.of("ars_nouveau:ritual_awakening", 1), ["SGS", "GPG", "SGS"], {
      S: "#c:stones",
      G: "ars_nouveau:source_gem",
      P: "ftb:abyssal_fragment",
    })
    .id("ftb:awakened_ritual");

  event
    .custom({
      type: "ars_nouveau:imbuement",
      input: {
        item: "mysticalagriculture:prosperity_seed_base",
      },
      output: {
        count: 1,
        id: "mob_grinding_utils:nutritious_chicken_feed",
      },
      pedestalItems: [],
      source: 500,
    })
    .id("ftb:imbuement/prosperity_seed_base");

    event
    .custom({
      type: "ars_nouveau:imbuement",
      input: {
        item: "mysticalagriculture:soulium_seed_base",
      },
      output: {
        count: 1,
        id: "mob_grinding_utils:gm_chicken_feed_cursed",
      },
      pedestalItems: [],
      source: 500,
    })
    .id("ftb:imbuement/soulium_seed_base");
    



    event
    .custom({
      type: "ars_nouveau:enchanting_apparatus",
      keepNbtOfReagent: false,
      pedestalItems: [
        {
          item: 'ars_nouveau:source_gem',
        },
        {
          item: 'ars_nouveau:source_gem',
        },
        {
          item: 'ars_nouveau:source_gem',
        },
        {
          item: 'ars_nouveau:source_gem',
        },
      ],
      reagent: {
        item: 'minecraft:sweet_berries',
      },
      result: {
        count: 1,
        id: 'ars_nouveau:sourceberry_bush',
      },
      sourceCost: 0,
    })
    .id("ftb:ars/enchanting_apparatus/sourceberry_bush");


});
