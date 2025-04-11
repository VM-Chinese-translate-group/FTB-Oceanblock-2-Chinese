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
    let range = 128
    let player = event.getPlayer() ?? level.getNearestPlayer(event.pos.x, event.pos.y, event.pos.z, range, false)
    let team = global.getTeam(player);
    
    let teamMembers = team.getOnlineMembers()
    teamMembers.forEach(member => {
        if (member.getLevel().dimension.getPath() != "the_rift"){
            chargePlayer(member, chargeMap[recipeId])
        }
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
    if(playerCharge >= max_charge){
        new ImmersiveMessage(player, "message.rift.charge.max").send()
        global.showRiftCharge(player)
        return;
    }

    let actualCharge = playerCharge + charge > max_charge ? max_charge : playerCharge + charge;
    player.persistentData.putInt("rift_charge", actualCharge);
    global.showRiftCharge(player)
}

