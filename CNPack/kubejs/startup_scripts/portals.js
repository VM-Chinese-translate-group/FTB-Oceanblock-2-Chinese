let $DyeColor = Java.loadClass("net.minecraft.world.item.DyeColor");
let $TeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const CustomPortalBuilder = Java.loadClass("net.kyrptonaught.customportalapi.api.CustomPortalBuilder");
const SHOULDTP = Java.loadClass("net.kyrptonaught.customportalapi.util.SHOULDTP");
const $RiftConfig = Java.loadClass("dev.ftb.mods.ftbrifthelper.Config");



StartupEvents.postInit((event) => {

    CustomPortalBuilder.beginPortal()
    ["frameBlock(net.minecraft.resources.ResourceLocation)"]

    ($ResourceLocation.parse("ftb:portal_holder")) // Frame Block
        .destDimID($ResourceLocation.parse("ftb:the_rift")) // Destination
        .lightWithFluid($ResourceLocation.parse("justdirethings:portal_fluid_source")) // FLUID
        .flatPortal()
        .registerBeforeTPEvent(entity => {
            if (entity.isPlayer()) global.handleTeleport(entity);
            return SHOULDTP.CANCEL_TP;
        })
        .registerPortal();

    CustomPortalBuilder.beginPortal()
        ["frameBlock(net.minecraft.resources.ResourceLocation)"]

        ($ResourceLocation.parse("minecraft:bedrock")) // Frame Block
            .destDimID($ResourceLocation.parse("ftb:home")) // Destination
            .lightWithFluid($ResourceLocation.parse("justdirethings:portal_fluid_source")) // FLUID
            .flatPortal()
            .registerPortal();

});


global.handleTeleport = (entity) => {
    let dimension = entity.getLevel().getDimension();
    let command;
    let team = $TeamsAPI.api().getManager().getTeamForPlayer(entity).get();
    switch (dimension) {
        case "minecraft:overworld":
            try{
                if(global.isRiftPending(team)){
                    console.log(`Rift is pending, cancelling teleport`)
                    new ImmersiveMessage(entity, "message.rift.unstable").send();
                    return;
                }
                else{
                    global.createPortalData(entity.getServer(), team.id)
                    entity.getServer().scheduleInTicks(5*20, () => {
                        global.refreshRiftRegion(team)
                    })
                }

            }catch(e){
                console.error(e)
            }
            command = `ftbrifthelper send_to_rift ${entity.username} 1`
            break;
        case "ftb:the_rift":
            try{
                let sPData = entity.getServer().persistentData;
                if(!team) return;
                console.log(`teleporting ${entity.getDisplayName().getString()} to home`)

                sPData.portals = sPData.portals ?? {}
                console.log(`checking if portal is active`)
                // if(!sPData.portals[team.id].getBoolean('active')) return;
                console.log(`checking if portal has a timer`)
                if(sPData.portals[team.id].getDouble('timer') > 0){
                    sPData.portals[team.id].putDouble('timer', 1)
                }
                global.refreshRiftRegion(team)
            }catch(e){
                console.error(e)
            }
            command = `execute as ${entity.username} run ftbteambases home`
            console.log(`running command ${command}`)
            break;
    }
    entity.getServer().runCommandSilent(command);
}
