/**
 *
 */
const sluiceDrops = [
  {
    inputItem: "minecraft:dirt",
    meshes: [
      {
        meshType: "cloth",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:pumpkin_seeds", 0.15],
          ["minecraft:wheat_seeds", 0.15],
          ["minecraft:melon_seeds", 0.15],
          ["minecraft:beetroot_seeds", 0.15],
          ["minecraft:cocoa_beans", 0.15],
          ["minecraft:bamboo", 0.15],
          ["minecraft:sugar_cane", 0.15],
          ["minecraft:sweet_berries", 0.15],
          ["integrateddynamics:menril_sapling", 0.15],
          ["rusticdelight:cotton_seeds", 0.15],
          ["rusticdelight:bell_pepper_seeds", 0.15],
          ["rusticdelight:coffee_beans", 0.15],
          ["farmersdelight:cabbage_seeds", 0.15],
          ["farmersdelight:tomato_seeds", 0.15],
          ["jags:grass_seed", 0.15],
          ["sushigocrafting:cucumber_seeds", 0.15],
          ["sushigocrafting:soy_seeds", 0.15],
          ["sushigocrafting:wasabi_seeds", 0.15],
          ["sushigocrafting:sesame_seeds", 0.15],
          ["immersiveengineering:seed", 0.15],
        ],
      },
      {
        meshType: "iron",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:oak_sapling", 0.2],
          ["minecraft:spruce_sapling", 0.2],
          ["minecraft:birch_sapling", 0.2],
          ["minecraft:jungle_sapling", 0.2],
          ["minecraft:acacia_sapling", 0.2],
          ["minecraft:dark_oak_sapling", 0.2],
          ["minecraft:cherry_sapling", 0.2],
          ["integrateddynamics:menril_sapling", 0.2],
          //["ars_nouveau:blue_archwood_sapling", 0.1],
          //["ars_nouveau:red_archwood_sapling", 0.1],
          //["ars_nouveau:purple_archwood_sapling", 0.1],
          //["ars_nouveau:green_archwood_sapling", 0.1],
        ],
      },
    ],
  },
  {
    inputItem: "minecraft:gravel",
    meshes: [
      {
        meshType: "cloth",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:copper_chunk", 0.54],
          ["actuallyadditions:tiny_coal", 0.5],
          ["ftbmaterials:iron_chunk", 0.44],
          ["minecraft:flint", 0.17],
          ["ftbmaterials:tin_chunk", 0.08],
          ["ftbmaterials:lead_chunk", 0.07],
          ["ftbmaterials:osmium_chunk", 0.06],
        ],
      },
      {
        meshType: "iron",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:iron_chunk", 0.54],
          ["actuallyadditions:tiny_coal", 0.5],
          ["ftbmaterials:copper_chunk", 0.44],
          ["minecraft:flint", 0.22],
          ["minecraft:coal", 0.2],
          ["ftbmaterials:aluminum_chunk", 0.13],
          ["ftbmaterials:tin_chunk", 0.12],
          ["ftbmaterials:lead_chunk", 0.1],
          ["ftbmaterials:osmium_chunk", 0.09],
        ],
      },
      {
        meshType: "gold",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:iron_chunk", 0.64],
          ["actuallyadditions:tiny_coal", 0.6],
          ["ftbmaterials:copper_chunk", 0.54],
          ["minecraft:coal", 0.25],
          ["mysticalagriculture:inferium_essence", 0.2],
          ["ftbmaterials:lapis_lazuli_chunk", 0.16],
          ["ftbmaterials:aluminum_chunk", 0.16],
          ["ftbmaterials:tin_chunk", 0.15],
          ["ftbmaterials:lead_chunk", 0.15],
          ["ftbmaterials:osmium_chunk", 0.14],
          ["ftb:deepslate_pebbles", 0.12],
          ["ftbmaterials:emerald_chunk", 0.04],
          ["ftbmaterials:diamond_chunk", 0.06],
        ],
      },
      {
        meshType: "diamond",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:iron_chunk", 0.69],
          ["ftbmaterials:copper_chunk", 0.59],
          ["minecraft:coal", 0.3],
          ["mysticalagriculture:inferium_essence", 0.3],
          ["ftbmaterials:lapis_lazuli_chunk", 0.21],
          ["ftbmaterials:lead_chunk", 0.2],
          ["ftbmaterials:aluminum_chunk", 0.2],
          ["ftbmaterials:tin_chunk", 0.2],
          ["ftbmaterials:osmium_chunk", 0.19],
          ["ftb:deepslate_pebbles", 0.17],
          ["ftbmaterials:emerald_chunk", 0.08],
          ["ftbmaterials:diamond_chunk", 0.12],
        ],
      },
      {
        meshType: "blazing",
        fluidType: "minecraft:lava",
        drops: [
          ["minecraft:iron_ingot", 0.69],
          ["minecraft:copper_ingot", 0.59],
          ["minecraft:lapis_lazuli", 0.21],
          ["ftbmaterials:lead_ingot", 0.2],
          ["ftbmaterials:aluminum_ingot", 0.2],
          ["ftbmaterials:tin_ingot", 0.2],
          ["ftbmaterials:osmium_ingot", 0.19],
          ["minecraft:emerald", 0.08],
          ["minecraft:diamond", 0.06],
        ],
      },
    ],
  },
  {
    inputItem: "c:sands",
    meshes: [
      {
        meshType: "cloth",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:copper_chunk", 0.43],
          ["ftbmaterials:iron_chunk", 0.33],
          ["ftbmaterials:tin_chunk", 0.09],
          ["ftbmaterials:aluminum_chunk", 0.08],
          ["ftbmaterials:silver_chunk", 0.07],
          ["ftbmaterials:gold_chunk", 0.06],
          ["ftbmaterials:lead_chunk", 0.06],
          ["ftbmaterials:nickel_chunk", 0.06],
          ["ftbmaterials:osmium_chunk", 0.05],
        ],
      },
      {
        meshType: "iron",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:copper_chunk", 0.43],
          ["ftbmaterials:iron_chunk", 0.33],
          ["ftbmaterials:tin_chunk", 0.12],
          ["ftbmaterials:silver_chunk", 0.12],
          ["ftbmaterials:aluminum_chunk", 0.12],
          ["ftbmaterials:gold_chunk", 0.09],
          ["ftbmaterials:lead_chunk", 0.09],
          ["ftbmaterials:nickel_chunk", 0.09],
          ["ftbmaterials:osmium_chunk", 0.08],
        ],
      },
      {
        meshType: "gold",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:copper_chunk", 0.63],
          ["ftbmaterials:iron_chunk", 0.53],
          ["ftbmaterials:silver_chunk", 0.15],
          ["ftbmaterials:aluminum_chunk", 0.15],
          ["ftbmaterials:gold_chunk", 0.13],
          ["ftbmaterials:tin_chunk", 0.13],
          ["ftbmaterials:nickel_chunk", 0.13],
          ["ftbmaterials:lead_chunk", 0.12],
          ["mysticalagriculture:prosperity_shard", 0.12],
          ["ftbmaterials:osmium_chunk", 0.12],
        ],
      },
      {
        meshType: "diamond",
        fluidType: "minecraft:water",
        drops: [
          ["ftbmaterials:copper_chunk", 0.7],
          ["ftbmaterials:iron_chunk", 0.63],
          ["mysticalagriculture:prosperity_shard", 0.19],
          ["ftbmaterials:aluminum_chunk", 0.18],
          ["ftbmaterials:gold_chunk", 0.18],
          ["ftbmaterials:silver_chunk", 0.17],
          ["ftbmaterials:nickel_chunk", 0.16],
          ["ftbmaterials:osmium_chunk", 0.16],
          ["ftbmaterials:lead_chunk", 0.15],
          ["ftbmaterials:tin_chunk", 0.15],
        ],
      },
      {
        meshType: "blazing",
        fluidType: "minecraft:lava",
        drops: [
          ["minecraft:copper_ingot", 0.7],
          ["minecraft:iron_ingot", 0.63],
          ["ftbmaterials:aluminum_ingot", 0.18],
          ["minecraft:gold_ingot", 0.18],
          ["ftbmaterials:silver_ingot", 0.17],
          ["ftbmaterials:nickel_ingot", 0.16],
          ["ftbmaterials:osmium_ingot", 0.16],
          ["ftbmaterials:lead_ingot", 0.15],
          ["ftbmaterials:tin_ingot", 0.15],
        ],
      },
    ],
  },
  {
    inputItem: "ftbstuff:dust",
    meshes: [
      {
        meshType: "cloth",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:bone_meal", 0.11],
          ["ftbmaterials:silver_chunk", 0.05],
          ["ftbmaterials:gold_chunk", 0.04],
          ["ftbmaterials:nickel_chunk", 0.04],
        ],
      },
      {
        meshType: "iron",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:bone_meal", 0.16],
          ["minecraft:gunpowder", 0.09],
          ["immersiveengineering:dust_saltpeter", 0.08],
          ["ftbmaterials:silver_chunk", 0.08],
          ["ftbmaterials:gold_chunk", 0.07],
          ["ftbmaterials:nickel_chunk", 0.07],
        ],
      },
      {
        meshType: "gold",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:bone_meal", 0.21],
          ["minecraft:gunpowder", 0.14],
          ["ftbmaterials:silver_chunk", 0.13],
          ["immersiveengineering:dust_saltpeter", 0.13],
          ["ftbmaterials:gold_chunk", 0.11],
          ["ftbmaterials:redstone_chunk", 0.11],
          ["ftbmaterials:nickel_chunk", 0.11],
        ],
      },
      {
        meshType: "diamond",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:bone_meal", 0.25],
          ["ftbmaterials:redstone_chunk", 0.21],
          ["minecraft:gunpowder", 0.19],
          ["ftbmaterials:gold_chunk", 0.16],
          ["immersiveengineering:dust_saltpeter", 0.15],
          ["ftbmaterials:silver_chunk", 0.15],
          ["ftbmaterials:nickel_chunk", 0.14],
        ],
      },
      {
        meshType: "blazing",
        fluidType: "minecraft:lava",
        drops: [
          ["minecraft:redstone", 0.25],
          ["minecraft:gold_ingot", 0.22],
          ["ftbmaterials:silver_ingot", 0.21],
          ["ftbmaterials:nickel_ingot", 0.14],
        ],
      },
    ],
  },
  {
    inputItem: "ftbstuff:crushed_basalt",
    meshes: [
      {
        meshType: "gold",
        fluidType: "minecraft:lava",
        drops: [
          ["minecraft:netherrack", 0.6],
          ["mekanism:dirty_netherite_scrap", 0.02],
        ],
      },
      {
        meshType: "diamond",
        fluidType: "minecraft:lava",
        drops: [
          ["minecraft:netherrack", 0.4],
          ["mekanism:dirty_netherite_scrap", 0.04],
        ],
      },
      {
        meshType: "blazing",
        fluidType: "minecraft:lava",
        drops: [["minecraft:ancient_debris", 0.05]],
      },
    ],
  },
  {
    inputItem: "ftbstuff:crushed_netherrack",
    meshes: [
      {
        meshType: "gold",
        fluidType: "minecraft:lava",
        drops: [
          ["mysticalagriculture:soulium_dust", 0.27],
          ["minecraft:glowstone_dust", 0.17],
          ["ftbmaterials:quartz_chunk", 0.24],
        ],
      },
      {
        meshType: "diamond",
        fluidType: "minecraft:lava",
        drops: [
          ["mysticalagriculture:soulium_dust", 0.27],
          ["minecraft:glowstone_dust", 0.14],
          ["ftbmaterials:quartz_chunk", 0.42],
          ["minecraft:blaze_powder", 0.15],
        ],
      },
      {
        meshType: "blazing",
        fluidType: "minecraft:lava",
        drops: [
          ["mysticalagriculture:soulium_dust", 0.4],
          ["minecraft:glowstone_dust", 0.17],
          ["minecraft:quartz", 0.5],
          ["actuallyadditions:black_quartz", 0.08],
          ["minecraft:blaze_powder", 0.15],
        ],
      },
    ],
  },
  {
    inputItem: "minecraft:suspicious_sand",
    meshes: [
      {
        meshType: "gold",
        fluidType: "minecraft:water",
        drops: [
          ["ftb:blank_sherd", 0.2],
          ["minecraft:brick", 0.2],
          ["minecraft:stick", 0.2],
          ["minecraft:emerald", 0.01],
          ["minecraft:gold_nugget", 0.1],
          ["minecraft:coal", 0.1],
          ["irons_jewelry:ruby", 0.025],
          ["irons_jewelry:sapphire", 0.025],
          ["irons_jewelry:topaz", 0.025],
          ["irons_jewelry:moonstone", 0.025],
          ["irons_jewelry:peridot", 0.025],
          ["irons_jewelry:onyx", 0.025],
          ["irons_jewelry:garnet", 0.025],
        ],
      },
      {
        meshType: "diamond",
        fluidType: "minecraft:water",
        drops: [
          ["ftb:blank_sherd", 0.2],
          ["minecraft:brick", 0.2],
          ["minecraft:stick", 0.2],
          ["minecraft:emerald", 0.01],
          ["minecraft:gold_nugget", 0.1],
          ["minecraft:coal", 0.1],
          ["minecraft:music_disc_relic", 0.01],
          ["irons_jewelry:ruby", 0.05],
          ["irons_jewelry:sapphire", 0.05],
          ["irons_jewelry:topaz", 0.05],
          ["irons_jewelry:moonstone", 0.05],
          ["irons_jewelry:peridot", 0.05],
          ["irons_jewelry:onyx", 0.05],
          ["irons_jewelry:garnet", 0.05],
        ],
      },
    ],
  },
  {
    inputItem: "minecraft:suspicious_gravel",
    meshes: [
      {
        meshType: "gold",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:brick", 0.2],
          ["minecraft:stick", 0.2],
          ["minecraft:emerald", 0.01],
          ["minecraft:gold_nugget", 0.1],
          ["minecraft:coal", 0.1],
          ["ftb:blank_sherd", 0.05],
          ["minecraft:sniffer_egg", 0.01],
        ],
      },
      {
        meshType: "diamond",
        fluidType: "minecraft:water",
        drops: [
          ["minecraft:brick", 0.2],
          ["minecraft:stick", 0.2],
          ["minecraft:emerald", 0.01],
          ["minecraft:gold_nugget", 0.1],
          ["minecraft:coal", 0.1],
          ["ftb:blank_sherd", 0.1],
          ["minecraft:music_disc_relic", 0.01],
          ["minecraft:sniffer_egg", 0.05],
        ],
      },
      {
        meshType: "gold",
        fluidType: "minecraft:lava",
        drops: [
          ["minecraft:wayfinder_armor_trim_smithing_template", 0.05],
          ["minecraft:raiser_armor_trim_smithing_template", 0.05],
          ["minecraft:shaper_armor_trim_smithing_template", 0.05],
          ["minecraft:host_armor_trim_smithing_template", 0.05],
          ["minecraft:sentry_armor_trim_smithing_template", 0.05],
          ["minecraft:vex_armor_trim_smithing_template", 0.05],
          ["minecraft:wild_armor_trim_smithing_template", 0.05],
        ],
      },
    ],
  },
];

ServerEvents.recipes((event) => {
  sluiceDrops.forEach((dropConfig) => {
    const { inputItem, meshes } = dropConfig;

    meshes.forEach((meshConfig) => {
      const { meshType, fluidType, drops } = meshConfig;

      const recipeId = `ftbstuff:sluice/${inputItem.replace(":", "_")}_${meshType}_${fluidType.replace(":", "_")}`;

      const input = inputItem.startsWith("c") ? { tag: inputItem } : { item: inputItem };

      event
        .custom({
          type: "ftbstuff:sluice",
          fluid: {
            amount: 250,
            fluid: fluidType,
          },
          input: input,
          mesh_types: [meshType],
          results: drops.map(([dropItem, chance]) => ({
            chance: chance,
            item: {
              count: 1,
              id: dropItem,
            },
          })),
          max_results: 2,
        })
        .id(recipeId);
    });
  });
});
