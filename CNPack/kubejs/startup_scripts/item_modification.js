ItemEvents.modification(event => {

    //Increasing Stacksizes

    let increasing_stacksizes = [
        "minecraft:ender_pearl",
        "minecraft:egg",
        "minecraft:snowball",
        "farmersdelight:nether_salad"
    ];

    increasing_stacksizes.forEach(item => {
        event.modify(item, item => {
          item.maxStackSize = 64
        }) 
    });
  
})