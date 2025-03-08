ServerEvents.recipes((event) => {
  event
    .custom({
      type: "oritech:assembler",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          item: "powah:steel_energized",
        },
        {
          tag: "c:plates/lead",
        },
        {
          tag: "c:ingots/graphite",
        },
        {
          tag: "c:ingots/graphite",
        },
      ],
      results: [
        {
          count: 8,
          id: "bigreactors:basic_reactorcasing",
        },
      ],
      time: 160,
    })
    .id("ftb:oritech/assembler/basic_reactorcasing");

    event
    .custom({
      type: "oritech:foundry",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          count: 1,
          item: "bigreactors:basic_reactorcasing",
        },
        {
          count: 1,
          item: "ftbmaterials:osmium_plate",
        },
      ],
      results: [
        {
          count: 1,
          id: "bigreactors:reinforced_reactorcasing",
        },
      ],
      time: 100,
    })
    .id("ftb:foundry_alloying/reactor_casing");

    event.custom({
      "type": "enderio:alloy_smelting",
      "energy": 4800,
      "experience": 0.3,
      "inputs": [
        {
          "count": 1,
          "item": "bigreactors:basic_reactorcasing"
        },
        {
          "count": 1,
          "item": "ftbmaterials:osmium_plate"
        }
      ],
      "output": {
        "count": 1,
        "id": "bigreactors:reinforced_reactorcasing"
      }
    }).id("ftb:alloy_smelting/reinforced_reactorcasing");

});
