ServerEvents.recipes((event) => {
  //Straw from Sapplings
  event.custom({
    type: "farmersdelight:cutting",
    ingredients: [
      {
        tag: "minecraft:saplings",
      },
    ],
    result: [
      {
        item: {
          count: 1,
          id: "farmersdelight:straw",
        },
      },
    ],
    sound: {
      sound_id: "minecraft:item.axe.strip",
    },
    tool: {
      tag: "c:tools/knife",
    },
  });

  //Nerfing the Rope Recipe
  event.remove({ output: "farmersdelight:rope" });
  event
    .shaped(Item.of("farmersdelight:rope", 2), ["S  ", "S  "], {
      S: "farmersdelight:straw",
    })
    .id("ftb:rope");

    event
    .shaped(Item.of("farmersdelight:cooking_pot", 1), ["CSC", "CBC", "CCC"], {
      C: "#c:bricks",
      S: "minecraft:wooden_shovel",
      B: "minecraft:water_bucket",
    })
    .id("ftb:cooking_pot");

    event
    .shaped(Item.of("farmersdelight:cooking_pot", 1), ["CSC", "CBC", "CCC"], {
      C: "#c:bricks",
      S: "minecraft:wooden_shovel",
      B: "ceramicbucket:ceramic_bucket",
    })
    .id("ftb:cooking_pot_clay");


  //Adding a Extra Cotton -> String Recipe rewarding the use of a Cutting Board.
  event.custom({
    type: "farmersdelight:cutting",
    ingredients: [
      {
        tag: "c:crops/cotton",
      },
    ],
    result: [
      {
        item: {
          count: 3,
          id: "minecraft:string",
        },
      },
    ],
    sound: {
      sound_id: "minecraft:entity.sheep.shear",
    },
    tool: {
      tag: "c:tools/shear",
    },
  });

  event
    .custom({
      type: "farmersdelight:cooking",
      container: {
        count: 1,
        id: "minecraft:glass_bottle",
      },
      experience: 1.0,
      ingredients: [
        {
          item: "minecraft:sugar",
        },
        {
          item: "minecraft:sugar",
        },
        {
          item: "minecraft:sugar",
        },
      ],
      recipe_book_tab: "drinks",
      result: {
        count: 1,
        id: "minecraft:honey_bottle",
      },
    })
    .id("ftb:honeyfromsugar");

  //Quartz Dust in the Cutting Board
  event.custom({
    type: "farmersdelight:cutting",
    ingredients: [
      {
        tag: "c:gems/quartz",
      },
    ],
    result: [
      {
        item: {
          count: 1,
          id: "ftbmaterials:quartz_dust",
        },
      },
    ],
    sound: {
      sound_id: "minecraft:block.anvil.land",
    },
    tool: {
      tag: "ftbstuff:hammers",
    },
  });

  //Tweaking Dough Recipe to use Flour.
  //And Also making it more rewarding to Smelt Bread from Dough (recipes tweaked through datapack override).
  event.replaceInput({ id: "farmersdelight:wheat_dough_from_water" }, "minecraft:wheat", "pneumaticcraft:wheat_flour");
  event.replaceInput({ id: "farmersdelight:wheat_dough_from_eggs" }, "minecraft:wheat", "pneumaticcraft:wheat_flour");
  event.custom({ type: "farmersdelight:cutting", ingredients: [{ item: "minecraft:hay_block" }], result: [{ item: { count: 9, id: "pneumaticcraft:wheat_flour" } }], sound: { sound_id: "minecraft:block.anvil.land" }, tool: { tag: "ftbstuff:hammers" },}).id("ftb:hammering/cutting_board/hay_bale_to_flour");
  event.custom({ type: "farmersdelight:cutting", ingredients: [{ item: "minecraft:wheat" }], result: [{ item: { count: 1, id: "pneumaticcraft:wheat_flour" } }], sound: { sound_id: "minecraft:block.anvil.land" }, tool: { tag: "ftbstuff:hammers" },}).id("ftb:hammering/cutting_board/wheat_to_flour");

  //Adding a Ars Recipe to get Onions
  event.custom({
    "type": "ars_nouveau:enchanting_apparatus",
    "keepNbtOfReagent": false,
    "pedestalItems": [
      {
        "item": "minecraft:allium"
      },
      {
        "item": "minecraft:allium"
      },
      {
        "item": "minecraft:allium"
      },
      {
        "item": "minecraft:allium"
      },
      {
        "item": "minecraft:potato"
      },
      {
        "item": "minecraft:potato"
      },
      {
        "item": "minecraft:potato"
      },
      {
        "item": "minecraft:potato"
      },
    ],
    "reagent": {
      "item": "ars_nouveau:earth_essence"
    },
    "result": {
      "count": 1,
      "id": "farmersdelight:wild_onions"
    },
    "sourceCost": 0
  })

});
