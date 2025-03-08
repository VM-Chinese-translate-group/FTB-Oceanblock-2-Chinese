ServerEvents.recipes((event) => { 

    //Replacing Timber Frame Recipe to Avoid Recipe Conflicts
    event.replaceInput({ id: "supplementaries:timber_frame"}, '#c:rods/wooden', "#c:rods/treated_wood")

    //Adding a Hammering Recipe from Coal and Charcoal to Ash
    event.custom({ type: "farmersdelight:cutting", ingredients: [{ tag: "minecraft:coals" }], result: [{ item: { count: 1, id: "supplementaries:ash" } }], sound: { sound_id: "minecraft:block.anvil.land" }, tool: { tag: "ftbstuff:hammers" },}).id("ftb:hammering/cutting_board/coals_to_ash");
    event.custom({ type: "farmersdelight:cutting", ingredients: [{ item: "mekanism:block_charcoal" }], result: [{ item: { count: 9, id: "supplementaries:ash" } }], sound: { sound_id: "minecraft:block.anvil.land" }, tool: { tag: "ftbstuff:hammers" },}).id("ftb:hammering/cutting_board/charcoal_block_to_ash");
    event.custom({ type: "farmersdelight:cutting", ingredients: [{ item: "minecraft:coal_block" }], result: [{ item: { count: 9, id: "supplementaries:ash" } }], sound: { sound_id: "minecraft:block.anvil.land" }, tool: { tag: "ftbstuff:hammers" },}).id("ftb:hammering/cutting_board/coal_block_to_ash");
    event.custom({ type: "farmersdelight:cutting", ingredients: [{ item: "minecraft:coal_block" }], result: [{ item: { count: 9, id: "supplementaries:ash" } }], sound: { sound_id: "minecraft:block.anvil.land" }, tool: { tag: "ftbstuff:hammers" },}).id("ftb:hammering/cutting_board/coal_block_to_ash");

});
