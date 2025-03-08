let removeRecipesByIdIE = [
  "immersiveengineering:smelting/ingot_aluminum_from_blasting",
  "immersiveengineering:smelting/ingot_aluminum_from_blasting2",
  "immersiveengineering:smelting/ingot_aluminum_from_blasting3",
  "immersiveengineering:smelting/ingot_aluminum",
  "immersiveengineering:smelting/ingot_aluminum2",
  "immersiveengineering:smelting/ingot_aluminum3",
  "immersiveengineering:smelting/ingot_lead_from_blasting",
  "immersiveengineering:smelting/ingot_lead_from_blasting2",
  "immersiveengineering:smelting/ingot_lead_from_blasting3",
  "immersiveengineering:smelting/ingot_lead",
  "immersiveengineering:smelting/ingot_lead2",
  "immersiveengineering:smelting/ingot_lead3",
  "immersiveengineering:smelting/ingot_nickel_from_blasting",
  "immersiveengineering:smelting/ingot_nickel_from_blasting2",
  "immersiveengineering:smelting/ingot_nickel_from_blasting3",
  "immersiveengineering:smelting/ingot_nickel",
  "immersiveengineering:smelting/ingot_nickel2",
  "immersiveengineering:smelting/ingot_nickel3",
  "immersiveengineering:smelting/ingot_silver_from_blasting",
  "immersiveengineering:smelting/ingot_silver_from_blasting2",
  "immersiveengineering:smelting/ingot_silver_from_blasting3",
  "immersiveengineering:smelting/ingot_silver",
  "immersiveengineering:smelting/ingot_silver2",
  "immersiveengineering:smelting/ingot_silver3",
  "immersiveengineering:smelting/ingot_uranium_from_blasting",
  "immersiveengineering:smelting/ingot_uranium_from_blasting2",
  "immersiveengineering:smelting/ingot_uranium_from_blasting3",
  "immersiveengineering:smelting/ingot_uranium",
  "immersiveengineering:smelting/ingot_uranium2",
  "immersiveengineering:smelting/ingot_uranium3",
  "immersiveengineering:crafting/raw_nickel_to_raw_block_nickel",
];

ServerEvents.recipes((event) => {
  //removals
  removeRecipesByIdIE.forEach((recipe) => {
    event.remove({ id: recipe });
  });
});
