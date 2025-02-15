const NotificationToastData = Java.loadClass("dev.latvian.mods.kubejs.util.NotificationToastData")


/**
 * Each key is a recipe ID, and the value is an object containing the charge details.
 * 
 * @type {Object.<string, {charge: number, max_charge: number, no_output?: boolean}>}
 * 
 * @property {number} charge - The amount of charge required per tick.
 * @property {number} max_charge - The maximum charge that can be stored.
 * @property {boolean} [no_output] - Optional flag indicating if the recipe should remove the output.
 */
const chargeMap = {
    "ftb:rift/empower1": {
        "charge": 300*20,
        "max_charge": 300*20,
    },

    "ftb:rift/empower2": {
        "charge": 600*20,
        "max_charge": 600*20, 
    },

    "ftb:rift/empower3": {
        "charge": 900*20,
        "max_charge": 900*20,
    },
    "ftb:rift/empower4": {
        "charge": 900*20,
        "max_charge": 900*20,
        "no_output": true
    }
}



ActuallyAdditionsEvents.empower(event => {
    const {level, recipeId} = event
    if (!chargeMap[recipeId]) return


    // charge the players in the area
    let range = 5
    let aabb = AABB.of(
        event.pos.x - range, 
        event.pos.y - range, 
        event.pos.z - range, 
        event.pos.x + range, 
        event.pos.y + range, 
        event.pos.z + range
    )
    level.getEntitiesWithin(aabb).forEach(entity => {
        if (entity == null) return
        if (!entity.isPlayer()) return
        chargePlayer(entity, chargeMap[recipeId])
    })


    // remove the output item if it's not a valid output
    if(chargeMap[recipeId].no_output){
        let empowerer = level.getBlock(event.pos.x, event.pos.y, event.pos.z)
        let output = empowerer.inventory.getItems()[0]
        output.shrink(1)
    }


    // spawn a lightning bolt at the position of empowerer when the recipe finishes
    event.level.spawnLightning(event.pos.x, event.pos.y, event.pos.z, true)
})



function chargePlayer(player, recipe){
    const {charge, max_charge} = recipe;
    let playerCharge =  player.persistentData.contains("rift_charge") ? player.persistentData.getInt("rift_charge") : 0;
    if(playerCharge + charge > max_charge){
        player.persistentData.putInt("rift_charge", max_charge);
        NotificationToastData.ofText(Text.translate("message.rift.charge.max", max_charge)).show();
        global.showRiftCharge(player)
        return;
    }
    player.persistentData.putInt("rift_charge", playerCharge + charge);
      NotificationToastData.ofText(Text.translate(`message.rift.charge.now`, (playerCharge + charge))).show();
    global.showRiftCharge(player)

}

// PlayerEvents.tick(event => {
//     const {player} = event
//     showRiftCharge(player)
//     if(player.age % 20 != 0) return;
// })