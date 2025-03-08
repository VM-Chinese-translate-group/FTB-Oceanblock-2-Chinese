PlayerEvents.tick((event) => {
    const {player, server, level} = event
    if(server.getTickCount() % 40 != 0) return;

    let rift_charge_meter_slot = player.nbt["neoforge:attachments"]["curios:inventory"]["Curios"][1]["StacksHandler"]["Stacks"]["Items"][0]
    if(!rift_charge_meter_slot) return
    let rift_charge_meter = rift_charge_meter_slot["id"]
    if(rift_charge_meter != "ftb:rift_charge_meter") return

    global.showRiftCharge(player); 
})
