const bannerColors = [
  "white",
  "orange",
  "magenta",
  "light_blue",
  "yellow",
  "lime",
  "pink",
  "gray",
  "light_gray",
  "cyan",
  "purple",
  "blue",
  "brown",
  "green",
  "red",
  "black",
];

LootJS.lootTables((event) => {
  // Add String To Banner
  bannerColors.forEach((color) => {
    event
      .getLootTable(`minecraft:blocks/${color}_banner`)
      .clear()
      .createPool((pool) => {
        pool.addEntry(LootEntry.of("minecraft:string").setCount([1, 2]).matchMainHand("#c:tools/shear"));
      })
      .createPool((pool) => {
        pool.addEntry(LootEntry.of(`minecraft:${color}_banner`).matchMainHand(ItemFilter.not("#c:tools/shear")));
      });
  });
});
