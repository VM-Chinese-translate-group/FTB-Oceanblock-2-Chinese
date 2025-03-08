// priority: 100000

/**
 * Adds a basic SAG milling recipe.
 */

function enderIOBasicSagMillingRecipe(event, itemInputTag, outputItems, id, bonus) {
  if (!Array.isArray(outputItems)) {
    console.error(`[SAG Milling Recipe]: outputItems is not an array for recipe ${id}.`);
    return;
  }

  if (outputItems.length > 4) {
    console.warn(`[SAG Milling Recipe]: Too many output items for recipe ${id}. Max is 4.`);
    return;
  }

  const outputs = [];
  for (const item of outputItems) {
    if (!Array.isArray(item) || item.length < 2) {
      console.error(`[SAG Milling Recipe]: Invalid output item format in recipe ${id}: ${JSON.stringify(item)}`);
      return;
    }

    const itemID = item[0];
    const count = item[1];
    const chanceRoll = item.length > 2 ? item[2] : 1;

    outputs.push({
      chance: chanceRoll,
      item: {
        id: itemID,
        count: count,
      },
    });
  }
  if (global.debug) {
    console.log("adding sag mill recipe", itemInputTag, outputs, id);
  }

  const recipe = {
    type: "enderio:sag_milling",
    energy: 2400,
    input: { tag: itemInputTag },
    outputs: outputs,
  };

  if (bonus === false) {
    recipe.bonus = "none";
  }

  event.custom(recipe).id(id);
}

/**
 * Adds a basic alloy smelting recipe.
 */
function enderIOBasicAlloySmeltingRecipe(event, inputTag, outputItem, id) {
  const outputID = Array.isArray(outputItem) ? outputItem[0] : outputItem;
  const outputAmount = Array.isArray(outputItem) ? outputItem[1] : 1;

  event
    .custom({
      type: "enderio:alloy_smelting",
      energy: 1500,
      experience: 0.35,
      is_smelting: true,
      inputs: [{ tag: inputTag, count: 1 }],
      output: { id: outputID, count: outputAmount },
    })
    .id(id);
}
