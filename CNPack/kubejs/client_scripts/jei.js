RecipeViewerEvents.removeEntries("item", (event) => {
  event.remove("ceramicbucket:ceramic_bucket");
});

RecipeViewerEvents.addEntries("item", (event) => {
  event.add("ceramicbucket:ceramic_bucket");
});

RecipeViewerEvents.removeCategories((event) => {
  event.remove("brickfurnace:blasting");
  event.remove("brickfurnace:smelting");
  event.remove("brickfurnace:smoking");
});
