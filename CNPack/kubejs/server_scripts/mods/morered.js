const jumboFurnaceRecipes = [
  {
    output: "enderio:redstone_alloy_ingot",
    ingredients: [{ tag: "c:ingots/iron" }, { tag: "c:dusts/redstone", count: 4 }],
    experience: 0.15,
    id: "morered:red_alloy_ingot_from_jumbo_smelting",
  },
];

ServerEvents.recipes((event) => {
  jumboFurnaceRecipes.forEach((recipe) => {
    event
      .custom({
        type: "jumbofurnace:jumbo_smelting",
        ingredients: recipe.ingredients,
        results: [{ id: recipe.output }],
        experience: recipe.experience,
      })
      .id(recipe.id);
  });
});
