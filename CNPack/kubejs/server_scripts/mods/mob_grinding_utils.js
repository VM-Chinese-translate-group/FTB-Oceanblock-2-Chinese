//priority: 1000

ServerEvents.recipes((event) => {

  //Tweaking the Tinted Glass Recipe
  event.replaceInput(
    { id: "mob_grinding_utils:recipe_tintedglass" },
    "minecraft:coal",
    "justdirethings:coal_t2"
  );
  
});
  