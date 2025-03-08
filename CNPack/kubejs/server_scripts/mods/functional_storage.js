const compactingRecipes = [
  { lower: ["ftb:stone_pebbles", 4], higher: "minecraft:cobblestone" },
  { lower: ["ftb:andesite_pebbles", 4], higher: "minecraft:andesite" },
  { lower: ["ftb:granite_pebbles", 4], higher: "minecraft:granite" },
  { lower: ["ftb:diorite_pebbles", 4], higher: "minecraft:diorite" },
  { lower: ["ftb:calcite_pebbles", 4], higher: "minecraft:calcite" },
  { lower: ["ftb:deepslate_pebbles", 4], higher: "minecraft:deepslate" },
  { lower: ["ftb:tuff_pebbles", 4], higher: "minecraft:tuff" },
  { lower: ["ftb:basalt_pebbles", 4], higher: "minecraft:basalt" },
  { lower: ["ftb:endstone_pebbles", 4], higher: "minecraft:end_stone" },
  { lower: ["ftb:netherrack_pebbles", 4], higher: "minecraft:netherrack" },
  { lower: ["ftb:sandstone_pebbles", 4], higher: "minecraft:sandstone" },
  { lower: ["ftb:red_sandstone_pebbles", 4], higher: "minecraft:red_sandstone" },
  { lower: ["ftbmaterials:copper_nugget", 9], higher: "minecraft:copper_ingot" },
  { lower: ["ftbmaterials:lapis_lazuli_chunk", 4], higher: "ftbmaterials:lapis_lazuli_cluster" },

  { lower: ["ftbmaterials:silver_cluster", 9], higher: "ftbmaterials:silver_raw_block" },
  { lower: ["ftbmaterials:tin_cluster", 9], higher: "ftbmaterials:tin_raw_block" },
  { lower: ["ftbmaterials:uranium_cluster", 9], higher: "ftbmaterials:uranium_raw_block" },
  { lower: ["ftbmaterials:platinum_cluster", 9], higher: "ftbmaterials:platinum_raw_block" },
  { lower: ["ftbmaterials:lead_cluster", 9], higher: "ftbmaterials:lead_raw_block" },
  { lower: ["ftbmaterials:nickel_cluster", 9], higher: "ftbmaterials:nickel_raw_block" },
  { lower: ["ftbmaterials:osmium_cluster", 9], higher: "ftbmaterials:osmium_raw_block" },
  { lower: ["ftbmaterials:aluminum_cluster", 9], higher: "ftbmaterials:aluminum_raw_block" },
  { lower: ["ftbmaterials:copper_cluster", 9], higher: "minecraft:raw_copper_block" },
  { lower: ["ftbmaterials:gold_cluster", 9], higher: "minecraft:raw_gold_block" },
  { lower: ["ftbmaterials:iron_cluster", 9], higher: "minecraft:raw_iron_block" },

  { lower: ["actuallyadditions:tiny_coal", 8], higher: "minecraft:coal" },
  { lower: ["actuallyadditions:tiny_charcoal", 8], higher: "minecraft:charcoal" },

  { lower: ["minecraft:clay_ball", 4], higher: "minecraft:clay" },

  { lower: ["rftoolsbase:dimensionalshard", 4], higher: "ftbmaterials:dimensional_shard_block" },

  //Oritech Small Clumps
  { lower: ["oritech:small_nickel_clump", 9], higher: "ftbmaterials:nickel_clump" },
  { lower: ["oritech:small_platinum_clump", 9], higher: "ftbmaterials:platinum_clump" },
  { lower: ["oritech:small_iron_clump", 9], higher: "ftbmaterials:iron_clump" },
  { lower: ["oritech:small_copper_clump", 9], higher: "ftbmaterials:copper_clump" },
  { lower: ["oritech:small_gold_clump", 9], higher: "ftbmaterials:gold_clump" },
];

global.resources.forEach((resource) => {
  if (!resource.toLowerCase().includes("lapis")) {
    const clusterName = "ftbmaterials:" + resource.toLowerCase() + "_cluster";
    const chunkName = "ftbmaterials:" + resource.toLowerCase() + "_chunk";
    compactingRecipes.push({ lower: [chunkName, 4], higher: clusterName });
  }
});

ServerEvents.recipes((event) => {
  compactingRecipes.forEach((recipe) => {
    const lower = Array.isArray(recipe.lower) ? recipe.lower : [recipe.lower, 1];
    const higher = Array.isArray(recipe.higher) ? recipe.higher : [recipe.higher, 1];

    event.custom({
      type: "functionalstorage:custom_compacting",
      higher_input: {
        count: higher[1],
        id: higher[0],
      },
      lower_input: {
        count: lower[1],
        id: lower[0],
      },
    });
  });

  event.remove({ id: "functionalstorage:void_upgrade" });
  event
    .shaped("functionalstorage:void_upgrade", ["O O", " D ", "O O"], {
      O: "#c:obsidians",
      D: "#functionalstorage:drawer",
    })
    .id("ftb:functionalstorage/void");

    event
    .shaped("functionalstorage:storage_controller", ["SMS", "DCD", "SMS"], {
      S: "#c:stones",
      M: "integrateddynamics:crystalized_menril_block",
      D: "#functionalstorage:drawer",
      C: "minecraft:comparator"
    })
    .id("ftb:functionalstorage/storage_controller_menril");

    event
    .shaped("functionalstorage:storage_controller", ["SMS", "DCD", "SMS"], {
      S: "#c:stones",
      M: "minecraft:end_stone_bricks",
      D: "#functionalstorage:drawer",
      C: "minecraft:comparator"
    })
    .id("ftb:functionalstorage/storage_controller_end");
    event
    .shaped("functionalstorage:storage_controller", ["SMS", "DCD", "SMS"], {
      S: "#c:stones",
      M: "replication:replica_block",
      D: "#functionalstorage:drawer",
      C: "minecraft:comparator"
    })
    .id("ftb:functionalstorage/storage_controller_replica");


  event
    .shapeless("functionalstorage:void_upgrade", ["#functionalstorage:drawer", "#c:crops/cactus"])
    .id("ftb:functionalstorage/void_from_cactus");
});
