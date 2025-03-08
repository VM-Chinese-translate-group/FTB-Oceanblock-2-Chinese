// priority: 100002
/**
 * Create mining lens recipe
 *
 * @param {any} event
 * @param {string} oreID
 * @param {number} weight
 * @param {string} ingredientTag
 * @param {string} id
 */
function actuallyadditionsMiningLensRecipe(event, oreID, weight, inputBlock, id) {
  event
    .custom({
      type: "actuallyadditions:mining_lens",
      ingredient: {
        item: inputBlock,
      },
      result: {
        count: 1,
        id: oreID,
      },
      weight: weight,
    })
    .id(id);
}
