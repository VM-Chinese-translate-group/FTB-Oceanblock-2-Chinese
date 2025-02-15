// priority: 200
ServerEvents.recipes((event) => {
  event
    .custom({
      type: "nautec:item_transformation",
      duration: 100,
      ingredient: {
        item: "ftb:nautical_eye",
      },
      purity: 3.0,
      result: {
        count: 1,
        id: "ftb:ancient_eye",
      },
    })
    .id("ftb:nautec/item_transformation/ancient_eye");

  event
    .custom({
      type: "nautec:item_transformation",
      duration: 100,
      ingredient: {
        item: "integrateddynamics:proto_chorus",
      },
      purity: 3.0,
      result: {
        count: 1,
        id: "minecraft:chorus_fruit",
      },
    })
    .id("ftb:nautec/item_transformation/chorus_fruit");

  event
    .custom({
      type: "nautec:item_transformation",
      duration: 100,
      ingredient: {
        item: "minecraft:compass",
      },
      purity: 3.0,
      result: {
        count: 1,
        id: "explorerscompass:explorerscompass",
      },
    })
    .id("ftb:nautec/item_transformation/compass");

  event
    .custom({
      type: "nautec:mixing",
      duration: 100,
      fluid_ingredient: {
        amount: 1000,
        id: "justdirethings:polymorphic_fluid_source",
      },
      fluid_result: {},
      ingredients: [
        {
          count: 1,
          item: "justdirethings:gooblock_tier2",
        },
        {
          item: "ftb:abyssal_pearl",
        },
      ],
      result: {
        count: 1,
        id: "justdirethings:gooblock_tier3",
      },
    })
    .id("ftb:nautec/mixing/gooblock_tier3");

  event
    .custom({
      type: "nautec:mixing",
      duration: 100,
      fluid_ingredient: {
        amount: 500,
        id: "pneumaticcraft:ethanol",
      },
      ingredients: [
        {
          item: "immersiveengineering:dust_saltpeter",
        },
        {
          item: "minecraft:redstone",
        },
      ],
      fluid_result: {
        amount: 8000,
        id: "pneumaticcraft:oil",
      },
      result: {},
    })
    .id("ftb:nautec/mixing/oil");

    event
    .custom({
      type: "nautec:mixing",
      duration: 100,
      fluid_ingredient: {
        amount: 500,
        id: "actuallyadditions:refined_canola_oil",
      },
      ingredients: [
        {
          item: "actuallyadditions:empowered_canola_seed",
        }
      ],
      fluid_result: {
        amount: 8000,
        id: "pneumaticcraft:oil",
      },
      result: {},
    })
    .id("ftb:nautec/mixing/oil2");

  event
    .shaped("nautec:mixer", ["GAG", "GEG", "GCG"], {
      G: "nautec:polished_prismarine",
      A: "ftbstuff:cast_iron_gear",
      C: "nautec:aquarine_steel_ingot",
      E: "oritech:motor",
    })
    .id("ftb:nautec_mixer");
});
