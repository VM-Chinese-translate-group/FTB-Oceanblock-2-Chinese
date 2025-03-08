let removeRecipesByNauTech = [
  "minecraft:cast_iron_nugget_to_ingot",
  "nautec:cast_iron_nugget",
  "minecraft:cast_iron_ingot_blasting",
];

ServerEvents.recipes((event) => {
  removeRecipesByNauTech.forEach((recipe) => {
    event.remove({ id: recipe });
  });

  event.replaceInput(
    [{ id: "nautec:deep_sea_drain_wall" }, { id: "nautec:cast_iron_rod" }, { id: "nautec:deep_sea_drain" }],
    "nautec:cast_iron_ingot",
    "ftbstuff:cast_iron_ingot"
  );

  event.replaceInput(
    [{ id: "nautec:nautec_guide" }, { id: "nautec:whisk" }],
    "nautec:cast_iron_nugget",
    "ftbstuff:cast_iron_nugget"
  );
});
