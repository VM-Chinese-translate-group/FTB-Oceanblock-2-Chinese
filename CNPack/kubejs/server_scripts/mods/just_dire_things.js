const direGooRecipes = [
  //[input, output, craftingDuration, tierRequirement]
  ["ftbstuff:cast_iron_block", "pneumaticcraft:compressed_iron_block", 2400, 2],
  ["minecraft:water", "minecraft:ice", 600, 1],
  ["minecraft:ice", "minecraft:packed_ice", 600, 2],
  ["minecraft:packed_ice", "minecraft:blue_ice", 600, 3],
  ["minecraft:sugar_cane", "minecraft:cactus", 1200, 1],
  ["justdirethings:gooblock_tier1", "justdirethings:gooblock_tier2", 2400, 2],
  ["justdirethings:gooblock_tier2", "justdirethings:gooblock_tier3", 2400, 3],
  ["justdirethings:gooblock_tier3", "justdirethings:gooblock_tier4", 2400, 4],
];

ServerEvents.recipes((event) => {
  direGooRecipes.forEach(([input, output, craftingDuration, tierRequirement]) => {
    event.custom({
      type: "justdirethings:goospread",
      craftingDuration: craftingDuration,
      id: `justdirethings:${output.split(":")[1]}`,
      input: {
        Name: input,
      },
      output: {
        Name: output,
      },
      tierRequirement: tierRequirement,
    });
  });

  //Tweaking Voidshimmer Goo Recipe
  event.replaceInput({ id: "justdirethings:gooblock_tier3" }, "minecraft:dragon_breath", "ftb:abyssal_pearl");

  //Tweaking Shadowpulse Goo Recipe
  event.replaceInput(
    { id: "justdirethings:gooblock_tier4" },
    "minecraft:sculk_shrieker",
    "extendedcrafting:ender_star"
  );

  event
    .custom({
      type: "justdirethings:fluiddrop",
      catalyst: "minecraft:ice",
      id: "ftb:justdirethings/snow_block",
      input: {
        Name: "justdirethings:polymorphic_fluid_block",
        Properties: {
          level: "0",
        },
      },
      output: {
        Name: "minecraft:snow_block",
      },
    })
    .id("ftb:justdirethings/snow_block");

  //Tweaking Creative Flight Upgrade Recipe
  event
    .shaped(Item.of("justdirethings:upgrade_flight", 1), ["PTP", "FUF", "PTP"], {
      U: "justdirethings:upgrade_blank",
      P: "minecraft:phantom_membrane",
      F: "minecraft:feather",
      T: "justdirethings:time_crystal",
    })
    .id("ftb:justdirethings/upgrade_flight");

  event.replaceInput(
    { id: "justdirethings:portalgun" },
    "justdirethings:blazegold_ingot",
    "justdirethings:eclipsealloy_ingot"
  );
});
