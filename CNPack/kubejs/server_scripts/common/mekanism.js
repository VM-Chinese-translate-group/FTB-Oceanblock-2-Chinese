/**
 * Create basic injecting recipe
 *
 * @param {any} event KubeJS recipe event
 * @param {string} itemInputTagName
 * @param {number} itemInputAmount
 * @param {string} chemicalInputName
 * @param {number} chemicalInputAmount
 * @param {string} outputItemName
 * @param {number} outputItemAmount
 * @param {string} id
 */
function mekanismBasicInjectingRecipe(
  event,
  itemInputTagName,
  itemInputAmount,
  chemicalInputName,
  chemicalInputAmount,
  outputItemName,
  outputItemAmount,
  id
) {
  event
    .custom({
      type: "mekanism:injecting",
      item_input: {
        count: itemInputAmount,
        tag: itemInputTagName,
      },
      chemical_input: {
        amount: chemicalInputAmount,
        chemical: chemicalInputName,
      },
      output: {
        count: outputItemAmount,
        id: outputItemName,
      },
      per_tick_usage: true,
    })
    .id(id);
}

/**
 * Create basic purifying recipe
 *
 * @param {any} event KubeJS recipe event
 * @param {string} itemInputTagName
 * @param {number} itemInputAmount
 * @param {string} chemicalInputName
 * @param {number} chemicalInputAmount
 * @param {string} outputItemName
 * @param {number} outputItemAmount
 * @param {string} id
 */
function mekanismBasicPurifyingRecipe(
  event,
  itemInputTagName,
  itemInputAmount,
  chemicalInputName,
  chemicalInputAmount,
  outputItemName,
  outputItemAmount,
  id
) {
  event
    .custom({
      type: "mekanism:purifying",
      item_input: {
        amount: itemInputAmount,
        tag: itemInputTagName,
      },
      chemical_input: {
        amount: chemicalInputAmount,
        chemical: chemicalInputName,
      },
      output: {
        count: outputItemAmount,
        id: outputItemName,
      },
      per_tick_usage: true,
    })
    .id(id);
}

/**
 * Create basic crushing recipe
 *
 * @param {any} event KubeJS recipe event
 * @param {string} inputItemTagName
 * @param {string} outputItemName
 * @param {amount} outputAmount
 * @param {string} id
 */
function mekanismBasicCrushingRecipe(event, inputItemTagName, outputItemName, outputAmount, id) {
  event
    .custom({
      type: "mekanism:crushing",
      input: {
        count: 1,
        tag: inputItemTagName,
      },
      output: {
        count: outputAmount,
        id: outputItemName,
      },
    })
    .id(id);
}

/**
 * Create basic enriching recipe
 *
 * @param {any} event KubeJS recipe event
 * @param {string} inputItemTagName
 * @param {amount} inputAmount
 * @param {string} outputItemAmount
 * @param {amount} outputAmount
 * @param {string} id
 */
function mekanismBasicEnrichingRecipe(event, inputItemTagName, inputAmount, outputItemAmount, outputAmount, id) {
  event
    .custom({
      type: "mekanism:enriching",
      input: {
        count: inputAmount,
        tag: inputItemTagName,
      },
      output: {
        count: outputAmount,
        id: outputItemAmount,
      },
    })
    .id(id);
}

/**
 * Create basic combining recipe
 *
 * @param {any} event KubeJS recipe event
 * @param {string} mainInputTagName
 * @param {number} mainInputAmount
 * @param {string} extraInputTagName
 * @param {number} extraInputAmount
 * @param {string} outputItemName
 * @param {number} outputAmount
 * @param {string} id
 */
function mekanismBasicCombiningRecipe(
  event,
  mainInputTagName,
  mainInputAmount,
  extraInputTagName,
  extraInputAmount,
  outputItemName,
  outputAmount,
  id
) {
  event
    .custom({
      type: "mekanism:combining",
      extra_input: {
        count: extraInputAmount,
        tag: extraInputTagName,
      },
      main_input: {
        count: mainInputAmount,
        tag: mainInputTagName,
      },
      output: {
        count: outputAmount,
        id: outputItemName,
      },
    })
    .id(id);
}

/**
 * Create basic crystallizing recipe
 *
 * @param {*} event KubeJS recipe event
 * @param {string} inputChemicalName
 * @param {number} inputAmount
 * @param {string} outputItemName
 * @param {number} outputAmount
 * @param {string} id
 */
function mekanismBasicCrystallizingRecipe(event, inputChemicalName, inputAmount, outputItemName, outputAmount, id) {
  event
    .custom({
      type: "mekanism:crystallizing",
      input: {
        amount: inputAmount,
        chemical: inputChemicalName,
      },
      output: {
        count: outputAmount,
        id: outputItemName,
      },
    })
    .id(id);
}

/**
 * Create basic washing recipe
 *
 * @param {any} event KubeJS recipe event
 * @param {string} fluidInputTag
 * @param {number} fluidInputAmount
 * @param {string} chemicalInputName
 * @param {number} chemicalInputAmount
 * @param {string} outputChemicalName
 * @param {number} outputChemicalAmount
 * @param {string} id
 */
function mekanismBasicWashingRecipe(
  event,
  fluidInputTag,
  fluidInputAmount,
  chemicalInputName,
  chemicalInputAmount,
  outputChemicalName,
  outputChemicalAmount,
  id
) {
  event
    .custom({
      type: "mekanism:washing",
      chemical_input: {
        amount: chemicalInputAmount,
        chemical: chemicalInputName,
      },
      fluid_input: {
        amount: fluidInputAmount,
        tag: fluidInputTag,
      },
      output: {
        amount: outputChemicalAmount,
        id: outputChemicalName,
      },
    })
    .id(id);
}

/**
 * Create basic dissolution recipe
 *
 * @param {any} event KubeJS recipe event
 * @param {string} itemInputTagName
 * @param {number} itemInputAmount
 * @param {string} chemicalInputName
 * @param {number} chemicalInputAmount
 * @param {string} outputChemicalName
 * @param {number} outputItemAmount
 * @param {string} id
 */
function mekanismBasicDissolutionRecipe(
  event,
  itemInputTagName,
  itemInputAmount,
  chemicalInputName,
  chemicalInputAmount,
  outputChemicalName,
  outputAmount,
  id
) {
  event
    .custom({
      type: "mekanism:dissolution",
      chemical_input: {
        amount: chemicalInputAmount,
        chemical: chemicalInputName,
      },
      item_input: {
        count: itemInputAmount,
        tag: itemInputTagName,
      },
      output: {
        amount: outputAmount,
        id: outputChemicalName,
      },
      per_tick_usage: true,
    })
    .id(id);
}

/**
 * Adds a basic smelting recipe.
 *
 * @param {event} event
 * @param {string} itemInputTag
 * @param {string} itemOutputId
 * @param {number} itemOutputAmount
 * @param {string} id
 */
function mekanismBasicSmeltingRecipe(event, itemInputTag, itemOutputId, itemOutputAmount, id) {
  event
    .custom({
      type: "mekanism:smelting",
      input: {
        count: 1,
        tag: itemInputTag,
      },
      output: {
        count: itemOutputAmount,
        id: itemOutputId,
      },
    })
    .id(id);
}
