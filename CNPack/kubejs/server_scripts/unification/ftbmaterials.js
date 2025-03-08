const materialData = {
  resources: [
    "aluminum",
    "bronze",
    "coal",
    "copper",
    "diamond",
    "emerald",
    "electrum",
    "constantan",
    "gold",
    "invar",
    "iron",
    "lapis",
    "lead",
    "nickel",
    "osmium",
    "platinum",
    "redstone",
    "silver",
    "steel",
    "tin",
    "uranium",
    "quartz",
    "obsidian",
    "graphite",
  ],
  type: ["end_ore"],
  types: [
    {
      type: "wire",
      material: [
        "nickel",
        "obsidian",
        "osmium",
        "quartz",
        "silver",
        "tin",
        "uranium",
        "redstone",
        "dimensional_shard",
        "platinum",
        "iron",
        "invar",
        "gold",
        "diamond",
        "bronze",
        "emerald",
        "graphite",
        "constantan",
      ],
    },
    {
      type: "rod",
      material: ["gold", "lead", "osmium", "tin", "uranium", "platinum", "nickel", "quartz", "obsidian", "constantan"],
    },
    {
      type: "gear",
      material: [
        "lead",
        "nickel",
        "osmium",
        "silver",
        "tin",
        "uranium",
        "platinum",
        "nickel",
        "aluminum",
        "quartz",
        "obsidian",
        "graphite",
        "constantan",
      ],
    },
    {
      type: "gem",
      material: ["gold", "silver", "dimensional_shard"],
    },
    {
      type: "blade",
      material: ["aluminum"],
    },
    {
      type: "deepslate_ore",
      material: ["quartz"],
    },
    {
      type: "plate",
      material: ["quartz", "obsidian", "graphite"],
    },
    {
      type: "shard",
      material: ["quartz", "diamond"],
    },
    {
      type: "nugget",
      material: ["quartz", "diamond"],
    },
    {
      type: "clump",
      material: ["quartz"],
    },
    {
      type: "end_ore",
      material: ["quartz"],
    },
    {
      type: "dirty_dust",
      material: ["quartz"],
    },
    {
      type: "dust",
      material: ["graphite"],
    },
  ],
};

ServerEvents.tags("item", function (event) {
  global.materialTypes.forEach((materials) => {
    materials.materials.forEach(function (material) {
      if (!materialData.resources.includes(material) || materialData.type.includes(materials.type)) {
        const itemID = "ftbmaterials:" + material + "_" + materials.type;
        event.add("c:hidden_from_recipe_viewers", itemID);
      }
    });

    event.add("c:hidden_from_recipe_viewers", ["ftbmaterials:dimensional_shard_end_ore", "ftbmaterials:coal_end_ore"]);
  });

  materialData.types.forEach((type) => {
    type.material.forEach((material) => {
      const itemID = "ftbmaterials:" + material + "_" + type.type;
      event.add("c:hidden_from_recipe_viewers", itemID);
    });
  });

  event.remove("c:hidden_from_recipe_viewers", [
    "ftbmaterials:lapis_lazuli_nether_ore",
    "ftbmaterials:quartz_deepslate_ore",
  ]);
});

const types = {
  ingots: [
    "aluminum",
    "lead",
    "nickel",
    "osmium",
    "silver",
    "tin",
    "uranium",
    "platinum",
    ["iron", "minecraft"],
    ["copper", "minecraft"],
    ["gold", "minecraft"],
  ],
  gems: [
    ["coal", "minecraft"],
    ["redstone", "minecraft"],
    ["emerald", "minecraft"],
    ["diamond", "minecraft"],
  ],
};

ServerEvents.recipes((event) => {
  types.ingots.forEach((ingot) => {
    const modPrefix = Array.isArray(ingot) ? ingot[1] : "ftbmaterials";
    const material = Array.isArray(ingot) ? ingot[0] : ingot;

    event.smelting(`${modPrefix}:${material}_ingot`, `#c:ores/${material}`).xp(1.0).cookingTime(200);
    event.blasting(`${modPrefix}:${material}_ingot`, `#c:ores/${material}`).xp(1.0).cookingTime(100);
  });

  types.gems.forEach((gem) => {
    const modPrefix = Array.isArray(gem) ? gem[1] : "minecraft";
    const material = Array.isArray(gem) ? gem[0] : gem;
    const output = Array.isArray(material) ? material[1] : material;

    event.smelting(`${modPrefix}:${output}`, `#c:ores/${material}`).xp(1.0).cookingTime(200);
    event.blasting(`${modPrefix}:${output}`, `#c:ores/${material}`).xp(1.0).cookingTime(100);
  });

  event.smelting(`minecraft:lapis_lazuli`, `#c:ores/lapis`).xp(1.0).cookingTime(200);
  event.blasting(`minecraft:lapis_lazuli`, `#c:ores/lapis`).xp(1.0).cookingTime(100);

  event.smelting(`rftoolsbase:dimensionalshard`, `#c:ores/dimensional_shard`).xp(1.0).cookingTime(200);
  event.blasting(`rftoolsbase:dimensionalshard`, `#c:ores/dimensional_shard`).xp(1.0).cookingTime(100);
});
