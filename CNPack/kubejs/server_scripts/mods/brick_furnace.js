ServerEvents.recipes(event => {

    // Removing the Recipe of the Smoker, as it is disabled.
    event.remove({ output: "brickfurnace:brick_smoker" })

    //Recipe for the Cast Iron Furnace
    event.remove({ id: "brickfurnace:brick_furnace" })
    event.shaped(Item.of('brickfurnace:brick_furnace', 1), 
    [
        "COC", 
        "OFO", 
        "COC"
    ], {
        C: 'ftbstuff:cast_iron_ingot',
        O: 'ftbstuff:compressed_cobblestone',
        F: 'minecraft:furnace'
    }).id("ftb:cast_iron_furnace");

    //Recipe for the Cast Iron Blast Furnace
    event.remove({ id: "brickfurnace:brick_blast_furnace" })
    event.shaped(Item.of('brickfurnace:brick_blast_furnace', 1), 
    [
        "CCC", 
        "CFC", 
        "SSS"
    ], {
        C: 'ftbstuff:cast_iron_ingot',
        F: 'minecraft:blast_furnace',
        S: 'minecraft:smooth_stone'
    }).id("ftb:cast_iron_blast_furnace_recipe");

})
