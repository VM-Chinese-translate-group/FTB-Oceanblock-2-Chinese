// priority: 200
ServerEvents.recipes((event) => {

  //Barrels =======================================================================================
  event.shaped(Item.of("metalbarrels:copper_barrel", 1), 
  ["CCC", "CSC", "CCC"], {
      C: "#c:ingots/copper",
      S: "minecraft:barrel"
  }).id("ftb:copper_barrel");

  event.shaped(Item.of("metalbarrels:iron_barrel", 1), 
  ["CCC", "CSC", "CCC"], {
      C: "#c:ingots/iron",
      S: "metalbarrels:copper_barrel"
  }).id("ftb:iron_barrel");

  event.shaped(Item.of("metalbarrels:gold_barrel", 1), 
  ["CCC", "CSC", "CCC"], {
      C: "#c:ingots/gold",
      S: "metalbarrels:iron_barrel"
  }).id("ftb:gold_barrel");

  event.shaped(Item.of("metalbarrels:diamond_barrel", 1), 
  [" C ", "CSC", " C "], {
      C: "#c:gems/diamond",
      S: "metalbarrels:gold_barrel"
  }).id("ftb:diamond_barrel");

  event.shaped(Item.of("metalbarrels:obsidian_barrel", 1), 
  ["CCC", "CSC", "CCC"], {
      C: "#chipped:obsidian",
      S: "metalbarrels:diamond_barrel"
  }).id("ftb:obsidian_barrel");

  //Upgrades Recipes ==============================================================================

  let storage_upgades = [
    ['metalbarrels:wood_to_copper', 'ironchest:wood_to_copper_chest_upgrade'],
    ['metalbarrels:wood_to_iron', 'ironchest:wood_to_iron_chest_upgrade'],
    ['metalbarrels:copper_to_iron', 'ironchest:copper_to_iron_chest_upgrade'],
    ['metalbarrels:iron_to_gold', 'ironchest:iron_to_gold_chest_upgrade'],
    ['metalbarrels:gold_to_diamond', 'ironchest:gold_to_diamond_chest_upgrade'],
    ['metalbarrels:diamond_to_obsidian', 'ironchest:diamond_to_obsidian_chest_upgrade'],
    ['metalbarrels:diamond_to_crystal', 'ironchest:diamond_to_crystal_chest_upgrade'],
  ];

  storage_upgades.forEach(upgrade => {
    event.shapeless(upgrade[0], [upgrade[1]]);
    event.shapeless(upgrade[1], [upgrade[0]]);
  });

});
