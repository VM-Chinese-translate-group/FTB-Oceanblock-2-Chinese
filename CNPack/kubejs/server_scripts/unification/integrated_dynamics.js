ServerEvents.recipes((event) => {
  // Recipe Replacement
  event.remove({ id: "integrateddynamics:mechanical_squeezer/ore/dust_obsidian" });
  event
    .custom({
      type: "integrateddynamics:mechanical_squeezer",
      input_item: {
        item: "minecraft:obsidian",
      },
      output_items: [
        {
          item: {
            id: "ftbmaterials:obsidian_dust",
            count: 2,
          },
        },
      ],
      duration: 60,
    })
    .id("ftb:integrateddynamics/mechanical_squeezer/ore/dust_obsidian");

  event.remove({ id: "integrateddynamics:squeezer/ore/dust_obsidian" });
  event
    .custom({
      type: "integrateddynamics:squeezer",
      input_item: {
        item: "minecraft:obsidian",
      },
      output_items: [
        {
          item: {
            id: "ftbmaterials:obsidian_dust",
            count: 1,
          },
        },
      ],
    })
    .id("ftb:integrateddynamics/squeezer/ore/dust_obsidian");
});
