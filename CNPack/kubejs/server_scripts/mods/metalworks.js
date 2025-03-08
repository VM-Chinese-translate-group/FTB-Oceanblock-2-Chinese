//Recipes for Custom Items
const casts = [
  ["c:gears", "productivemetalworks:gear_cast"],
  ["c:gems", "productivemetalworks:gem_cast"],
  ["c:plates", "productivemetalworks:plate_cast"],
  ["c:rods", "productivemetalworks:rod_cast"],
  ["c:ingots", "productivemetalworks:ingot_cast"],
  ["c:nuggets", "productivemetalworks:nugget_cast"],
];

/**
 * An array of casting recipes for various items and fluids.
 * Each recipe is represented as an array of objects with the following properties:
 *
 * @type {Array<Array<Object>>}
 * @property {Object} 0 - The output item of the casting recipe.
 * @property {string} 0.item - The item ID of the output item.
 * @property {number} [0.count=1] - The quantity of the output item.
 *
 * @property {Object} 1 - The input fluid for the casting recipe.
 * @property {string} 1.fluid - The fluid ID of the input fluid.
 * @property {number} 1.amount - The amount of the input fluid in millibuckets.
 *
 * @property {Object} 2 - The cast or block used in the casting recipe.
 * @property {string} [2.item] - The item ID of the cast used in the recipe.
 * @property {boolean} [2.consume=false] - Whether the cast is consumed during the casting process.
 * @property {boolean} [2.block=false] - Whether the output is a block.
 */
const casting = [
  [
    { item: "ftbmaterials:copper_nugget", count: 1 },
    { fluid: "productivemetalworks:molten_copper", amount: 90 },
    { item: "productivemetalworks:nugget_cast", consume: false },
  ],
  [
    { item: "ftbmaterials:netherite_nugget", count: 1 },
    { fluid: "productivemetalworks:molten_netherite", amount: 90 },
    { item: "productivemetalworks:nugget_cast", consume: false },
  ],
  [
    { item: "enderio:copper_alloy_ingot", count: 1 },
    { fluid: "ftb:molten_copper_alloy", amount: 90 },
    { item: "productivemetalworks:ingot_cast", consume: false },
  ],
  [
    { item: "enderio:copper_alloy_nugget", count: 1 },
    { fluid: "ftb:molten_copper_alloy", amount: 10 },
    { item: "productivemetalworks:nugget_cast", consume: false },
  ],
  [
    { item: "enderio:copper_alloy_block", count: 1 },
    { fluid: "ftb:molten_copper_alloy", amount: 810 },
    { block: true },
  ],
  [
    { item: "ftbstuff:cast_iron_ingot", count: 1 },
    { fluid: "ftb:molten_cast_iron", amount: 90 },
    { item: "productivemetalworks:ingot_cast", consume: false },
  ],
  [
    { item: "ftbstuff:cast_iron_nugget", count: 1 },
    { fluid: "ftb:molten_cast_iron", amount: 10 },
    { item: "productivemetalworks:nugget_cast", consume: false },
  ],
  [{ item: "ftbstuff:cast_iron_block", count: 1 }, { fluid: "ftb:molten_cast_iron", amount: 810 }, { block: true }],
  [
    { item: "ae2:silicon" },
    { fluid: "productivemetalworks:molten_quartz", amount: 90 },
    { item: "productivemetalworks:nugget_cast", consume: false },
  ],
  [
    { item: "enderio:fused_quartz", count: 1 },
    { fluid: "productivemetalworks:molten_quartz", amount: 360 },
    { item: "minecraft:glass", consume: true, block: true },
  ],
  [
    { item: "enderio:fused_quartz_e", count: 1 },
    { fluid: "productivemetalworks:molten_quartz", amount: 360 },
    { item: "minecraft:glowstone", consume: true, block: true },
  ],
  [
    { item: "ftbmaterials:copper_plate", count: 1 },
    { fluid: "productivemetalworks:molten_copper", amount: 90 },
    { item: "productivemetalworks:plate_cast", consume: false },
  ],
  [
    { item: "minecraft:quartz_block", count: 1 },
    { fluid: "productivemetalworks:molten_quartz", amount: 360 },
    { block: true },
  ],
  [
    { item: "minecraft:quartz", count: 1 },
    { fluid: "productivemetalworks:molten_quartz", amount: 90 },
    { item: "productivemetalworks:gem_cast", consume: false },
  ],
  //  Disabled Cause of Broken Numbers.
  // [
  //   { item: "integrateddynamics:crystalized_menril_chunk", count: 1 },
  //   { fluid: "integrateddynamics:menril_resin", amount: 90 },
  //   { item: "productivemetalworks:nugget_cast", consume: false },
  // ],
  [
    { item: "integrateddynamics:crystalized_menril_block", count: 1 },
    { fluid: "integrateddynamics:menril_resin", amount: 1000 },
    { block: true },
  ],
  [
    { item: "integratedterminals:menril_glass", count: 1 },
    { fluid: "integrateddynamics:menril_resin", amount: 1000 },
    { item: "minecraft:glass", consume: true, block: true },
  ],

  //Adding more Constantan Recipes ================================================================

  [
    { item: "ftbmaterials:constantan_block", count: 1 },
    { fluid: "productivemetalworks:molten_constantan", amount: 810 },
    { block: true },
  ],
  [
    { item: "ftbmaterials:constantan_nugget", count: 1 },
    { fluid: "productivemetalworks:molten_constantan", amount: 10 },
    { item: "productivemetalworks:nugget_cast", consume: false },
  ],
  [
    { item: "ftbmaterials:constantan_plate", count: 1 },
    { fluid: "productivemetalworks:molten_constantan", amount: 90 },
    { item: "productivemetalworks:plate_cast", consume: false },
  ],

  // ==============================================================================================

];

const alloying = [
  // [output, input1, input2]
  [
    { item: "ftb:molten_copper_alloy", amount: 1 },
    { tag: "c:molten_copper", amount: 1 },
    { tag: "c:molten_quartz", amount: 1 },
  ],
];
const melting = [
  ["ftbstuff:cast_iron_ingot", 90, "ftb:molten_cast_iron"],
  ["ftbstuff:cast_iron_nugget", 10, "ftb:molten_cast_iron"],
  ["ftbstuff:cast_iron_block", 810, "ftb:molten_cast_iron"],
  ["ftbstuff:cast_iron_gear", 360, "ftb:molten_cast_iron"],
  ["enderio:copper_alloy_ingot", 90, "ftb:molten_copper_alloy"],
  ["enderio:copper_alloy_nugget", 10, "ftb:molten_copper_alloy"],
  ["enderio:copper_alloy_block", 810, "ftb:molten_copper_alloy"],
  ["minecraft:quartz", 90, "productivemetalworks:molten_quartz"],
  ["#chipped:quartz_block", 360, "productivemetalworks:molten_quartz"],
  ["#c:dusts/quartz", 90, "productivemetalworks:molten_quartz"],
  //['integrateddynamics:crystalized_menril_chunk', 90, 'integrateddynamics:menril_resin'], Disabled Cause of Broken Numbers.
  ["integrateddynamics:crystalized_menril_block", 1000, "integrateddynamics:menril_resin"],
  ["integrateddynamics:crystalized_menril_brick", 1000, "integrateddynamics:menril_resin"],
  ["#integrateddynamics:menril_logs", 1000, "integrateddynamics:menril_resin"],
  ["integrateddynamics:menril_planks", 250, "integrateddynamics:menril_resin"],
  ["integrateddynamics:menril_leaves", 50, "integrateddynamics:menril_resin"],
];
const balancing = {
  rods: 45, // 2 rods per ingot
  plates: 90, // 1 plate per ingot
};

ServerEvents.recipes((event) => {
  alloying.forEach(([output, input1, input2]) => {
    event
      .custom({
        type: "productivemetalworks:fluid_alloying",
        fluids: [input1, input2],
        result: {
          amount: output.amount,
          id: output.item,
        },
        speed: 4,
      })
      .id(`productivemetalworks:alloying/${output.item.split(":")[1]}`);
  });

  casts.forEach(([tag, result]) => {
    event
      .custom({
        type: "productivemetalworks:item_casting",
        cast: {
          tag: tag,
        },
        consume_cast: true,
        fluid: {
          amount: 360,
          fluid: "ftb:molten_cast_iron",
        },
        result: {
          count: 1,
          id: result,
        },
      })
      .id(`productivemetalworks:casting/cast/${result.split(":")[1].split("_")[0]}`);
  });

  casting.forEach(([output, input, cast]) => {
    cast.consume = cast.consume ?? false;
    input.amount = input.amount ?? 90;
    output.count = output.count ?? 1;
    cast.item = cast.item ?? [];
    let type = cast.block ? "productivemetalworks:block_casting" : "productivemetalworks:item_casting";
    event
      .custom({
        type: type,
        cast: {
          item: cast.item,
        },
        consume_cast: cast.consume,
        fluid: {
          amount: input.amount,
          fluid: input.fluid,
        },
        result: {
          count: output.count,
          id: output.item,
        },
      })
      .id(`productivemetalworks:casting/${output.item.split(":")[1]}`);
  });

  melting.forEach(([input, amount, fluid]) => {
    let ingredient = { item: input };
    if (input.includes("#")) {
      ingredient = { tag: input.split("#")[1] };
    }
    event
      .custom({
        type: "productivemetalworks:item_melting",
        ingredient: ingredient,
        maximum_temperature: 0,
        minimum_temperature: 1000,
        result: [
          {
            amount: amount,
            id: fluid,
          },
        ],
      })
      .id(`productivemetalworks:melting/${input.split(":")[1]}`);
  });

  for (const [type, amount] of Object.entries(balancing)) {
    event.forEachRecipe({ id: new RegExp(`productivemetalworks:casting/${type}`) }, (recipe) => {
      let r = JSON.parse(recipe.json);
      r.fluid.amount = amount;
      event.custom(r).id(recipe.getId());
    });

    event.forEachRecipe({ id: new RegExp(`productivemetalworks:melting/${type}`) }, (recipe) => {
      let r = JSON.parse(recipe.json);
      r.result[0].amount = amount;
      event.custom(r).id(recipe.getId());
    });
  }
});
