const lens_ores = [
  {
    namespace: "minecraft",
    ores: [
      {
        name: "coal",
        weight: 5000,
        overrides: {
          blacklisted: ["nether"],
        },
      },
      { name: "copper", weight: 5000 },
      { name: "iron", weight: 3000 },
      { name: "gold", weight: 500 },
      {
        name: "lapis",
        weight: 250,
        overrides: {
          blacklisted: ["nether"],
        },
      },
      {
        name: "lapis_lazuli",
        weight: 250,
        overrides: {
          blacklisted: ["stone"],
        },
      },
      { name: "redstone", weight: 200 },
      { name: "diamond", weight: 50 },
      { name: "emerald", weight: 30 },
      {
        name: "ancient_debris",
        weight: 10,
        overrides: {
          custom_namespace: true,
          blacklisted: ["stone", "deepslate"],
        },
      },
      {
        name: "nether_quartz_ore",
        weight: 3000,
        overrides: {
          custom_namespace: true,
          blacklisted: ["stone", "deepslate"],
        },
      },
    ],
  },
  {
    namespace: "ftbmaterials",
    ores: [
      { name: "osmium", weight: 3000 },
      { name: "lead", weight: 2000 },
      { name: "tin", weight: 2000 },
      { name: "silver", weight: 1000 },
      { name: "uranium", weight: 500 },
      { name: "aluminum", weight: 500 },
    ],
    stone_ore: "stone",
  },
  {
    namespace: "actuallyadditions",
    ores: [
      {
        name: "black_quartz_ore",
        weight: 3000,
        overrides: {
          custom_namespace: true,
          blacklisted: ["nether", "deepslate"],
        },
      },
    ],
  },
  {
    namespace: "occultism",
    ores: [
      {
        name: "iesnium_ore",
        weight: 250,
        overrides: {
          custom_namespace: true,
          blacklisted: ["stone", "deepslate"],
        },
      },
    ],
  },
];

ServerEvents.recipes((event) => {
  event.remove({ type: "actuallyadditions:mining_lens" });

  lens_ores.forEach((mod) => {
    mod.ores.forEach((ore) => {
      if (!ore.overrides || !ore.overrides.blacklisted.includes("stone")) {
        const outputIdStone =
          ore.overrides && ore.overrides.custom_namespace
            ? `${mod.namespace}:${ore.name}`
            : `${mod.namespace}:${ore.name}${mod.stone_ore ? `_${mod.stone_ore}` : ""}_ore`;
        actuallyadditionsMiningLensRecipe(
          event,
          outputIdStone,
          ore.weight,
          "minecraft:stone",
          `ftb:aa/laser/ores/stone/${ore.name}`
        );
      }

      if (!ore.overrides || !ore.overrides.blacklisted.includes("nether")) {
        const outputIdNether =
          ore.overrides && ore.overrides.custom_namespace
            ? `${mod.namespace}:${ore.name}`
            : `ftbmaterials:${ore.name}_nether_ore`;
        actuallyadditionsMiningLensRecipe(
          event,
          outputIdNether,
          ore.weight,
          "minecraft:netherrack",
          `ftb:aa/laser/ores/netherrack/${ore.name}`
        );
      }
    });
  });
});
