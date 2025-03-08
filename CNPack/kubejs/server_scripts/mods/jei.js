//Hiding Recipe Categories

let recipe_categories = [
    "ars_nouveau:crush",
];

RecipeViewerEvents.removeCategories(event => {
    recipe_categories.forEach(categorie => {
        event.remove(categorie)
    });
})