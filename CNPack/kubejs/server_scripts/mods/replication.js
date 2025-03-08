const matterValues = [
  {
    itemID: "justdirethings:ferricore_ingot",
    metallic: 18,
  },
  {
    itemID: "justdirethings:blazegold_ingot",
    metallic: 18,
    precious: 18,
  },
  {
    itemID: "justdirethings:celestigem",
    precious: 72,
  },
  {
    itemID: "justdirethings:eclipsealloy_ingot",
    metallic: 72,
    precious: 216,
    nether: 144,
  },
  {
    itemID: "pneumaticcraft:upgrade_matrix",
    precious: 1,
    organic: 1,
    earth: 1,
  },
  {
    itemID: ["pneumaticcraft:ingot_iron_compressed", "ftbstuff:cast_iron_ingot"],
    metallic: 9,
  },
  {
    itemID: [
      "ftbmaterials:quartz_dust",
      "ae2:certus_quartz_crystal",
      "ae2:certus_quartz_dust",
      "ae2:charged_certus_quartz_crystal",
      "ae2:printed_calculation_processor",
    ],
    precious: 4,
    nether: 2,
  },
  {
    itemID: "ae2:sky_dust",
    earth: 4,
    organic: 4,
  },
  {
    itemID: ["ae2:fluix_crystal", "ae2:fluix_dust"],
    precious: 5,
    nether: 2,
    earth: 1,
  },
  {
    itemID: "ae2:printed_silicon",
    precious: 4,
    nether: 2,
  },
  {
    itemID: "ae2:printed_logic_processor",
    precious: 9,
    metallic: 9,
  },
  {
    itemID: "ae2:printed_engineering_processor",
    precious: 36,
  },
  {
    itemID: "mysticalagriculture:inferium_essence",
    earth: 8,
  },
  {
    itemID: "mysticalagriculture:prosperity_shard",
    earth: 2,
    organic: 2,
  },
  {
    itemID: "ae2:engineering_processor",
    organic: 42,
    earth: 2,
    nether: 2,
  },
  {
    itemID: "ae2:calculation_processor",
    organic: 10,
    nether: 4,
    earth: 2,
  },
  {
    itemID: "ae2:logic_processor",
    organic: 15,
    metallic: 9,
    earth: 2,
    nether: 2,
  },
  {
    itemID: [
      "ftbmaterials:aluminum_ingot",
      "ftbmaterials:invar_ingot",
      "ftbmaterials:lead_ingot",
      "ftbmaterials:nickel_ingot",
      "ftbmaterials:osmium_ingot",
      "ftbmaterials:silver_ingot",
      "ftbmaterials:steel_ingot",
      "ftbmaterials:tin_ingot",
      "ftbmaterials:bronze_ingot",
      "ftbmaterials:electrum_ingot",
    ],
    metallic: 9,
  },
  {
    itemID: "oritech:adamant_ingot",
    precious: 36,
    metallic: 9,
  },
];

ServerEvents.recipes((event) => {
  matterValues.forEach((matter) => {
    const matterTypes = [];

    if (matter.organic) matterTypes.push({ type: "replication:organic", amount: matter.organic });
    if (matter.nether) matterTypes.push({ type: "replication:nether", amount: matter.nether });
    if (matter.metallic) matterTypes.push({ type: "replication:metallic", amount: matter.metallic });
    if (matter.earth) matterTypes.push({ type: "replication:earth", amount: matter.earth });
    if (matter.ender) matterTypes.push({ type: "replication:ender", amount: matter.ender });
    if (matter.precious) matterTypes.push({ type: "replication:precious", amount: matter.precious });
    if (matter.quantum) matterTypes.push({ type: "replication:quantum", amount: matter.quantum });
    if (matter.living) matterTypes.push({ type: "replication:living", amount: matter.living });

    const itemIDs = Array.isArray(matter.itemID) ? matter.itemID : [matter.itemID];

    // Loop through each item ID
    itemIDs.forEach((itemID) => {
      if (matterTypes.length > 0) {
        event.custom({
          type: "replication:matter_value",
          input: {
            item: itemID,
          },
          matter: matterTypes,
        });
      }
    });
  });
});
