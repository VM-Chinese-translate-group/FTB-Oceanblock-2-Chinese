// priority: 101

/**
 * Dripper Recipes
 *
 * Item input, Fluid input, Item output, Fluid amount, Chance
 *
 * @type {[string, string, string, number, number]}
 */
const dripperRecipes = [
  ["minecraft:dirt", "minecraft:water", "minecraft:clay", 100, 0.2],
  ["ftbstuff:compressed_cobblestone", "minecraft:water", "minecraft:iron_ore", 1000, 0.15],
  ["ftbstuff:compressed_cobblestone_2", "minecraft:water", "minecraft:gold_ore", 1000, 0.1],
  ["ftbstuff:compressed_cobblestone_3", "minecraft:water", "minecraft:diamond_ore", 1000, 0.03],
  ["minecraft:iron_block", "minecraft:lava", "ftbstuff:cast_iron_block", 1000, 0.08],
  ["minecraft:magma_block", "minecraft:lava", "ftbstuff:blue_magma_block", 1000, 0.05],
  ['ftbstuff:compressed_netherrack', "justdirethings:polymorphic_fluid_source", "minecraft:nether_quartz_ore", 250, 0.12],
];

ServerEvents.recipes((event) => {
  dripperRecipes.forEach(([itemInput, fluidInput, itemOutput, fluidAmount, chance]) => {
    event
      .custom({
        type: "ftbstuff:dripper",
        chance: chance,
        input: itemInput,
        output: itemOutput,
        fluid: {
          amount: fluidAmount,
          id: fluidInput,
        },
      })
      .id(`ftb:stuff/dripper/${itemOutput.split(":")[1]}`);
  });
});
