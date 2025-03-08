//priority: 1000

ServerEvents.recipes((event) => {
  //Alternative Recipe for the Campfire using a Straw Bale
  event
    .shaped(Item.of("mininggadgets:upgrade_empty", 4), ["CDC", "CUC", "CCC"], {
      C: "#c:ingots/compressed_iron",
      U: "#pneumaticcraft:upgrade_components",
      D: "#c:ingots/adamant",
    })
    .id("ftb:mining_gadgets_upgrade");

});
