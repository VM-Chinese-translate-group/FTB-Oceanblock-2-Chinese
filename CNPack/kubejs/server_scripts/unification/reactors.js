let removeRecipesByIdReactors = [
  "bigreactors:blasting/yellorium_from_raw",
  "bigreactors:smelting/yellorium_from_raw",
  "bigreactors:blasting/yellorium_from_ore",
];

ServerEvents.recipes((event) => {
  //removals
  removeRecipesByIdReactors.forEach((recipe) => {
    event.remove({ id: recipe });
  });
});
