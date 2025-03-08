ServerEvents.recipes((event) => {
  //Grass Fiber from Seagrass
  event.shapeless(
    Item.of("pickletweaks:grass_fiber", 3), // arg 1: output
    ["3x minecraft:seagrass"]
  );

  //Grass Fiber from Kelp
  event.shapeless(
    Item.of("pickletweaks:grass_fiber", 1), // arg 1: output
    ["3x minecraft:kelp"]
  );

  event.remove({ id: "pickletweaks:mesh" });
  event.remove({ id: "pickletweaks:mesh_gravel" });

  //Alternate Recipe for Grass Fiber by using a Cutting Board
  event.custom({
    type: "farmersdelight:cutting",
    ingredients: [{ item: "minecraft:seagrass" }],
    result: [{ item: { count: 3, id: "pickletweaks:grass_fiber" } }],
    sound: { sound_id: "minecraft:item.axe.strip" },
    tool: { tag: "c:tools/knife" },
  });
  event.custom({
    type: "farmersdelight:cutting",
    ingredients: [{ item: "minecraft:kelp" }],
    result: [{ item: { count: 2, id: "pickletweaks:grass_fiber" } }],
    sound: { sound_id: "minecraft:item.axe.strip" },
    tool: { tag: "c:tools/knife" },
  });
  event.custom({
    type: "farmersdelight:cutting",
    ingredients: [{ item: "minecraft:short_grass" }],
    result: [{ item: { count: 2, id: "pickletweaks:grass_fiber" } }],
    sound: { sound_id: "minecraft:item.axe.strip" },
    tool: { tag: "c:tools/knife" },
  });
  event.custom({
    type: "farmersdelight:cutting",
    ingredients: [{ item: "minecraft:tall_grass" }],
    result: [{ item: { count: 2, id: "pickletweaks:grass_fiber" } }],
    sound: { sound_id: "minecraft:item.axe.strip" },
    tool: { tag: "c:tools/knife" },
  });
});
