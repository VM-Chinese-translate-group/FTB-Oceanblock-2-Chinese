const recipesToRemoveMaterials = [
  // Need Powered Furnace to smelt raw ores in this pack
  "ftbmaterials:aluminum_ingot_from_blasting_aluminum_raw_ore",
  "ftbmaterials:aluminum_ingot_from_smelting_aluminum_raw_ore",
  "ftbmaterials:lead_ingot_from_blasting_lead_raw_ore",
  "ftbmaterials:lead_ingot_from_smelting_lead_raw_ore",
  "ftbmaterials:nickel_ingot_from_blasting_nickel_raw_ore",
  "ftbmaterials:nickel_ingot_from_smelting_nickel_raw_ore",
  "ftbmaterials:osmium_ingot_from_blasting_osmium_raw_ore",
  "ftbmaterials:osmium_ingot_from_smelting_osmium_raw_ore",
  "ftbmaterials:platinum_ingot_from_blasting_platinum_raw_ore",
  "ftbmaterials:platinum_ingot_from_smelting_platinum_raw_ore",
  "ftbmaterials:silver_ingot_from_blasting_silver_raw_ore",
  "ftbmaterials:silver_ingot_from_smelting_silver_raw_ore",
  "ftbmaterials:tin_ingot_from_blasting_tin_raw_ore",
  "ftbmaterials:tin_ingot_from_smelting_tin_raw_ore",
  "ftbmaterials:uranium_ingot_from_blasting_uranium_raw_ore",
  "ftbmaterials:uranium_ingot_from_smelting_uranium_raw_ore",
  "oritech:platinum_ingot_from_blasting_raw_platinum",
  "oritech:platinum_ingot_from_smelting_raw_platinum",
];

ServerEvents.recipes((event) => {
  recipesToRemoveMaterials.forEach((recipe) => {
    event.remove({ id: recipe });
  });

  event.smelting("ftbmaterials:invar_ingot", "ftbmaterials:invar_dust", 1.0, 10);
  event.blasting("ftbmaterials:invar_ingot", "ftbmaterials:invar_dust", 1.0, 10);
  event.smelting("ftbmaterials:platinum_ingot", "ftbmaterials:platinum_dust", 1.0, 10);
  event.blasting("ftbmaterials:platinum_ingot", "ftbmaterials:platinum_dust", 1.0, 10);

  //Readding Steel Block Recipe without using Tagged Steel Ingots, should fix the conflict with Bio-Steel
  event.replaceInput({ id: "ftbmaterials:steel_block"}, '#c:ingots/steel', "ftbmaterials:steel_ingot")
});
