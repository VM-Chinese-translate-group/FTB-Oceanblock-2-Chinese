// const blacklistedMobs = [ 
//     "minecraft:pillager", 
//     "minecraft:evoker", 
//     "minecraft:wandering_trader"
// ]
// EntityEvents.checkSpawn(blacklistedMobs, (event) => {
//     const {type, entity, level} = event;
//     const debug = false;
//     if(type == "COMMAND" || type == "SPAWN_EGG" || type == 'TRIAL_SPAWNER' || type == "MOB_SUMMONED") return;
    
//     if (debug) console.log(`Checking spawn for ${entity.getType()} at ${entity.x}, ${entity.y}, ${entity.z} in ${level.dimension}`)
//     event.cancel();

// });