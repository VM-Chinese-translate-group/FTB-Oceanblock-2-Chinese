let removeRecipesByIdOri = [
  "oritech:nickel_ingot_from_blasting_nickel_dust",
  "oritech:nickel_ingot_from_blasting_raw_nickel",
  "oritech:nickel_ingot_from_smelting_nickel_dust",
  "oritech:nickel_ingot_from_smelting_raw_nickel",
  "oritech:platinum_ingot",
  "oritech:pulverizer/dust/copper",
  "oritech:pulverizer/dust/gold",
  "oritech:pulverizer/dust/iron",
  "oritech:pulverizer/dust/nickel",
  "oritech:pulverizer/dust/platinum",
  "oritech:pulverizer/dust/steel",
  "oritech:pulverizer/dust/biosteel",
  "oritech:pulverizer/ore/copper",
  "oritech:pulverizer/ore/gold",
  "oritech:pulverizer/ore/iron",
  "oritech:pulverizer/ore/nickel",
  "oritech:pulverizer/ore/platinum",
  "oritech:pulverizer/raw/copper",
  "oritech:pulverizer/raw/gold",
  "oritech:pulverizer/raw/iron",
  "oritech:pulverizer/raw/nickel",
  "oritech:pulverizer/raw/platinum",
  "oritech:silicon_blockblockinv",
  "oritech:silicon_blockblock",
  "oritech:pulverizer/dust/quartz",
  "oritech:copper_ingot",
];

const materialTypesOri = {
  ores: [
    "aluminum",
    "lead",
    "nickel",
    "osmium",
    "platinum",
    "silver",
    "tin",
    "uranium",
    ["copper", "minecraft"],

    ["gold", "minecraft"],
    ["iron", "minecraft"],
  ],
  ingots: ["bronze", "electrum", "invar", "steel"],
  gems: ["diamond", "quartz"],
  other: [["occultism:iesnium_ingot", "occultism:iesnium_dust"]],
};

ServerEvents.recipes((event) => {
  removeRecipesByIdOri.forEach((recipe) => {
    event.remove({ id: recipe });
  });
});

ServerEvents.recipes((event) => {
  // (Ores) / (Raw Materials)
  materialTypesOri.ores.forEach((oreType) => {
    let material = Array.isArray(oreType) ? oreType[0] : oreType;
    let modPrefix = Array.isArray(oreType) ? oreType[1] : "ftbmaterials";
    const id = modPrefix === "ftbmaterials" ? `${modPrefix}:${material}_raw_ore` : `${modPrefix}:raw_${material}`;

    // Ores
    event
      .custom({
        type: "oritech:pulverizer",
        fluidInputAmount: 0,
        fluidInputVariant: "minecraft:empty",
        fluidOutputAmount: 0,
        fluidOutputVariant: "minecraft:empty",
        ingredients: [
          {
            tag: `c:ores/${material}`,
          },
        ],
        results: [
          {
            count: 2,
            id: id,
          },
        ],
        time: 300,
      })
      .id(`ftb:ores/${material}`);

    let newId = `${modPrefix}:${material}_nugget`;
    if (material == "copper") {
      modPrefix = "ftbmaterials";
    }

    // Raw Materials
    event
      .custom({
        type: "oritech:pulverizer",
        fluidInputAmount: 0,
        fluidInputVariant: "minecraft:empty",
        fluidOutputAmount: 0,
        fluidOutputVariant: "minecraft:empty",
        ingredients: [
          {
            tag: `c:raw_materials/${material}`,
          },
        ],
        results: [
          {
            count: 1,
            id: `ftbmaterials:${material}_dust`,
          },
          {
            count: 3,
            id: `${modPrefix}:${material}_nugget`,
          },
        ],
        time: 300,
      })
      .id(`ftb:raw_materials/${material}`);
  });

  // Dusts (Ingots)
  materialTypesOri.ores.concat(materialTypesOri.ingots).forEach((type) => {
    let material = Array.isArray(type) ? type[0] : type;
    event.custom({
      type: "oritech:pulverizer",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: `c:ingots/${material}`,
        },
      ],
      results: [
        {
          count: 1,
          id: `ftbmaterials:${material}_dust`,
        },
      ],
      time: 300,
    });
  });

  // Dusts (Gems)
  materialTypesOri.gems.forEach((gem) => {
    event.custom({
      type: "oritech:pulverizer",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: `c:gems/${gem}`,
        },
      ],
      results: [
        {
          count: 1,
          id: `ftbmaterials:${gem}_dust`,
        },
      ],
      time: 300,
    });
  });

  materialTypesOri.other.forEach((gem) => {
    event.custom({
      type: "oritech:pulverizer",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          item: gem[0],
        },
      ],
      results: [
        {
          count: 1,
          id: gem[1],
        },
      ],
      time: 300,
    });
  });

  const clumpsTypes = ["nickel", "platinum", "iron", "copper", "gold"];
  clumpsTypes.forEach((clump) => {
    const id = `oritech:${clump}_clump`;
    event.replaceOutput({ id: id }, id, `ftbmaterials:${clump}_cluster`);
  });
});
