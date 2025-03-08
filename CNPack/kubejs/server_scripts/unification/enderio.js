// priority: 50
const RESOURCE_TYPES_ENDERIO = {
  minecraft: ["iron", "gold", "copper"],
  ftbmaterials: ["silver", "nickel", "lead", "osmium", "tin", "uranium", "aluminum"],
};

/**
 * Recipe variations for SAG Mill processing.
 */
const SAG_MILL_VARIATIONS = [
  ["iron", "tin", 0.5],
  ["gold", "copper", 0.2],
  ["copper", "gold", 0.12],
];

/**
 * Smelting recipes for EnderIO alloy smelter.
 */
const ENDERIO_SMELTING_RECIPES = [
  [["dusts/"], ["gold", "copper", "iron"], "minecraft", "ingot"],
  [["raw_materials/"], ["lead", "osmium", "tin", "uranium", "nickel", "silver", "aluminum"], "ftbmaterials", "ingot"],
  [
    ["storage_blocks/raw_"],
    ["lead", "osmium", "tin", "uranium", "nickel", "silver", "aluminum"],
    "ftbmaterials",
    "block",
  ],
];

/**
 *
 */
const OTHER_SAG_MILL = [
  ["c:ingots/adamant", "oritech:adamant_dust"],
  ["c:ingots/duratium", "oritech:duratium_dust"],
  ["c:ingots/energite", "oritech:energite_dust"],
  ["c:ingots/iesnium", "occultism:iesnium_dust"],
];

/**
 * Recipes to remove from EnderIO.
 */
const RECIPES_TO_REMOVE = [
  "enderio:iron_gear",
  "enderio:item.minecraft.copper_ingot_from_blasting",
  "enderio:item.minecraft.copper_ingot_from_smelting",
  "enderio:item.minecraft.gold_ingot_from_blasting",
  "enderio:item.minecraft.gold_ingot_from_smelting",
  "enderio:item.minecraft.iron_ingot_from_blasting",
  "enderio:item.minecraft.iron_ingot_from_smelting",
  "enderio:sag_milling/iron",
];

// Main event handler for recipes
ServerEvents.recipes((event) => {
  // Remove unwanted recipes
  event.remove(RECIPES_TO_REMOVE);

  // Add alloy smelting recipes
  ENDERIO_SMELTING_RECIPES.forEach(([tags, types, modID, outputType]) => {
    tags.forEach((tag) => {
      types.forEach((type) => {
        enderIOBasicAlloySmeltingRecipe(
          event,
          `c:${tag}${type}`,
          `${modID}:${type}_${outputType}`,
          `ftbmaterials:enderio/alloy_smelting/${tag}${type}`
        );
      });
    });
  });

  // Add SAG milling recipes for FTB materials
  RESOURCE_TYPES_ENDERIO.ftbmaterials.forEach((material) => {
    enderIOBasicSagMillingRecipe(
      event,
      `c:raw_materials/${material}`,
      [
        [`ftbmaterials:${material}_dust`, 1],
        [`ftbmaterials:${material}_dust`, 1, 0.25],
      ],
      `ftbmaterials:enderio/sag_mill/raw_materials/${material}`,
      true
    );

    enderIOBasicSagMillingRecipe(
      event,
      `c:ores/${material}`,
      [
        [`ftbmaterials:${material}_raw_ore`, 1],
        [`ftbmaterials:${material}_raw_ore`, 1, 0.33],
      ],
      `ftbmaterials:enderio/sag_mill/ores/${material}`,
      true
    );

    enderIOBasicAlloySmeltingRecipe(
      event,
      `c:dusts/${material}`,
      `ftbmaterials:${material}_ingot`,
      `ftbmaterials:enderio/alloy_smelter/dust/${material}`
    );
  });

  OTHER_SAG_MILL.forEach((recipe) => {
    enderIOBasicSagMillingRecipe(
      event,
      recipe[0],
      [[recipe[1], 1]],
      `ftbmaterials:enderio/sag_mill/other/${recipe[1].split(":")[1]}`,
      false
    );
  });

  // Add specific SAG milling recipe variations
  SAG_MILL_VARIATIONS.forEach(([input, extraOutput, extraChance]) => {
    enderIOBasicSagMillingRecipe(
      event,
      `c:raw_materials/${input}`,
      [
        [`ftbmaterials:${input}_dust`, 1],
        [`ftbmaterials:${input}_dust`, 1, 0.25],
        [`ftbmaterials:${extraOutput}_dust`, 1, extraChance],
      ],
      `enderio:sag_milling/raw_${input}`,
      true
    );
  });

  // Add default SAG milling recipes
  // Combine the arrays without using the spread operator
  const allMaterials = RESOURCE_TYPES_ENDERIO.minecraft.concat(RESOURCE_TYPES_ENDERIO.ftbmaterials);

  allMaterials.forEach((material) => {
    enderIOBasicSagMillingRecipe(
      event,
      `c:ingots/${material}`,
      [[`ftbmaterials:${material}_dust`, 1, 1]],
      `ftbmaterials:enderio/sag_mill/ingot/${material}`,
      false
    );
  });

  // Add custom clay SAG milling recipe
  enderIOBasicSagMillingRecipe(
    event,
    "c:storage_blocks/clay",
    [
      ["minecraft:clay_ball", 2],
      ["minecraft:clay_ball", 1, 0.1],
      ["ae2:silicon", 2, 0.8],
    ],
    "enderio:sag_milling/clay",
    true
  );
});
