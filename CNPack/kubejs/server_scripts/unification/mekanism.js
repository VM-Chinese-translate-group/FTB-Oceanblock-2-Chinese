const kubejsPrefix = "ftb";

let removeRecipesByIdMek = [
  "mekanism:processing/lead/ingot/from_ore_smelting",
  "mekanism:processing/osmium/ingot/from_raw_blasting",
  "mekanism:processing/osmium/ingot/from_raw_smelting",
  "mekanism:processing/tin/ingot/from_raw_smelting",
  "mekanism:processing/tin/ingot/from_raw_blasting",
  "mekanism:processing/uranium/ingot/from_ore_blasting",
  "mekanism:processing/uranium/ingot/from_ore_smelting",
  "mekanism:processing/tin/ingot/from_ore_blasting",
  "mekanism:processing/tin/ingot/from_ore_smelting",
  "mekanism:processing/osmium/ingot/from_ore_blasting",
  "mekanism:processing/osmium/ingot/from_ore_smelting",
  "mekanism:processing/lead/ingot/from_ore_blasting",
];

/**
 *
 */
const resourceTypes = {
  minecraft: ["iron", "gold", "copper"],
  mekanism: ["lead", "osmium", "tin", "uranium"],
  ftbmaterials: ["silver", "nickel", "platinum", "nickel", "aluminum"],
};

/**
 * Mekanism itemID, FTB itemID
 *
 * @type {[string, string]}
 */
const materialTypes = [
  ["ingot", "ingot"],
  ["nugget", "nugget"],
  ["block", "block"],
  ["block_raw", "raw_block"],
  ["raw", "raw_ore"],
  ["crystal", "crystal"],
  ["shard", "shard"],
  ["clump", "clump"],
  ["dirty_dust", "dirty_dust"],
  ["dust", "dust"],
  ["ore", "stone_ore"],
  ["deepslate", "deepslate"],
];

const oreTypes = [
  ["", "stone"],
  ["deepslate_", "deepslate"],
];

/**
 * Tag Suffix, Item Input Amount, Chemical Input Amount, Item Output Amount
 * @type {[string, number, number, number]}
 */
const recipeVariationsInjecting = [
  ["ores/", 1, 1, 4],
  ["crystals/", 1, 1, 1],
  ["storage_blocks/raw_", 1, 2, 24],
  ["raw_materials/", 3, 1, 8],
];

/**
 * Tag Suffix, Item Input Amount, Chemical Input Amount, Item Output Amount
 * @type {[string, number, number, number]}
 */
const recipeVariationsPurifying = [
  ["ores/", 1, 1, 4],
  ["shards/", 1, 1, 1],
  ["crystals/", 1, 1, 1],
  ["storage_blocks/raw_", 1, 2, 24],
  ["raw_materials/", 3, 1, 8],
];

/**
 * Input tag suffix, Output item type
 * @type {[string, string]}
 */
const recipeVariationsCrushing = [
  ["ingots/", "dust"],
  ["clumps/", "dirty_dust"],
];

/**
 * Tag Suffix, Item input amount, Item output amount
 * @type {[string, number, number]}
 */
const recipeVariationsEnriching = [
  ["dirty_dusts/", 1, 1],
  ["ores/", 1, 2],
  ["storage_blocks/raw_", 1, 12],
  ["raw_materials/", 3, 4],
];

/**
 * Tag Suffix, Item input amount, Output item type
 * @type {[string, string]}
 */
const recipeVariationsCombining = [
  ["cobblestones/normal", "stone_ore"],
  ["cobblestones/deepslate", "deepslate_ore"],
];

/**
 * Tag Suffix, Item input amount, Chemical input amount, Output amount
 * @type {[string, number, number, number]}
 */
const recipeVariationsDissolution = [
  ["ores/", 1, 1, 1000],
  ["storage_blocks/raw_", 1, 2, 6000],
  ["raw_materials/", 3, 1, 2000],
];

const otherCrushingRecipes = [
  ["c:ingots/adamant", "oritech:adamant_dust"],
  ["c:ingots/duratium", "oritech:duratium_dust"],
  ["c:ingots/energite", "oritech:energite_dust"],
  ["c:ingots/iesnium", "occultism:iesnium_dust"],
];

ServerEvents.recipes((event) => {
  removeRecipesByIdMek.forEach((recipe) => {
    event.remove({ id: recipe });
  });
  const replaceTypes = resourceTypes.mekanism.concat(resourceTypes.minecraft);

  event.replaceOutput(
    { id: "mekanism:processing/fluorite/to_ore" },
    "mekanism:fluorite_ore",
    "ftbmaterials:fluorite_stone_ore"
  );

  event.replaceOutput(
    { id: "mekanism:processing/fluorite/to_deepslate_ore" },
    "mekanism:deepslate_fluorite_ore",
    "ftbmaterials:fluorite_deepslate_ore"
  );

  replaceTypes.forEach((type) => {
    materialTypes.forEach(([mekName, ftbName]) => {
      event.replaceInput({ mod: "mekanism" }, `mekanism:${mekName}_${type}`, `ftbmaterials:${type}_${ftbName}`);
      event.replaceOutput({ mod: "mekanism" }, `mekanism:${mekName}_${type}`, `ftbmaterials:${type}_${ftbName}`);
    });
  });

  resourceTypes.mekanism.forEach((type) => {
    oreTypes.forEach(([mekName, ftbName]) => {
      event.replaceInput({ mod: "mekanism" }, `mekanism:${mekName}${type}_ore`, `ftbmaterials:${type}_${ftbName}_ore`);
      event.replaceOutput({ mod: "mekanism" }, `mekanism:${mekName}${type}_ore`, `ftbmaterials:${type}_${ftbName}_ore`);
    });
  });

  // Adds non Mekanism material types to the ore processing chain
  resourceTypes.ftbmaterials.forEach((name) => {
    // Injecting Recipes
    recipeVariationsInjecting.forEach(([type, inputAmount, chemicalInputAmount, outputAmount]) => {
      mekanismBasicInjectingRecipe(
        event,
        `c:${type}${name}`,
        inputAmount,
        "mekanism:hydrogen_chloride",
        chemicalInputAmount,
        `ftbmaterials:${name}_shard`,
        outputAmount,
        `ftbmaterials:mekanism/${name}/shard/from_${type}`
      );
    });

    // Purifying Recipes
    recipeVariationsPurifying.forEach(([type, inputAmount, chemicalInputAmount, outputAmount]) => {
      mekanismBasicPurifyingRecipe(
        event,
        `c:${type}${name}`,
        inputAmount,
        "mekanism:oxygen",
        chemicalInputAmount,
        `ftbmaterials:${name}_clump`,
        outputAmount,
        `ftbmaterials:mekanism/${name}/clump/from_${type}`
      );
    });

    // Crushing Recipes
    recipeVariationsCrushing.forEach(([tag, type]) => {
      mekanismBasicCrushingRecipe(
        event,
        `c:${tag}${name}`,
        `ftbmaterials:${name}_${type}`,
        1,
        `ftbmaterials:mekanism/${name}/${type}/from_clump`
      );
    });

    // Enriching Recipes
    recipeVariationsEnriching.forEach(([type, inputAmount, outputAmount]) => {
      mekanismBasicEnrichingRecipe(
        event,
        `c:${type}${name}`,
        inputAmount,
        `ftbmaterials:${name}_dust`,
        outputAmount,
        `ftbmaterials:mekanism/${name}/dust/from_${type}`
      );
    });

    // Combing Recipes
    recipeVariationsCombining.forEach(([tag, type]) => {
      mekanismBasicCombiningRecipe(
        event,
        `c:raw_materials/${name}`,
        8,
        `c:${tag}`,
        1,
        `ftbmaterials:${name}_${type}`,
        1,
        `ftbmaterials:mekanism/${name}/ore/${type}`
      );
    });

    // Crystallizing Recipes
    mekanismBasicCrystallizingRecipe(
      event,
      `${kubejsPrefix}:${name}_clean`,
      200,
      `ftbmaterials:${name}_crystal`,
      1,
      `ftbmaterials:mekanism/${name}/crystal/from`
    );

    // Washing Recipes
    mekanismBasicWashingRecipe(
      event,
      "minecraft:water",
      5,
      `${kubejsPrefix}:${name}_dirty`,
      1,
      `${kubejsPrefix}:${name}_clean`,
      1,
      `ftbmaterials:mekanism/${name}/slurry/clean`
    );

    // Dissolution Recipes
    recipeVariationsDissolution.forEach(([tag, itemInputAmount, chemicalInputAmount, outputAmount]) => {
      mekanismBasicDissolutionRecipe(
        event,
        `c:${tag}${name}`,
        itemInputAmount,
        "mekanism:sulfuric_acid",
        chemicalInputAmount,
        `${kubejsPrefix}:${name}_dirty`,
        outputAmount,
        `ftbmaterials:mekanism/${name}/slurry/dirty/from_${tag}`
      );
    });
  });

  otherCrushingRecipes.forEach((recipe) => {
    mekanismBasicCrushingRecipe(
      event,
      recipe[0],
      recipe[1],
      1,
      `ftbmaterials:mekanism/crushing/${recipe[1].split(":")[1]}`
    );
  });
});
