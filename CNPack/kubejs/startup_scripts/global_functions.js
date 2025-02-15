// priority: 10000
const $BaseInstanceManager = Java.loadClass("dev.ftb.mods.ftbteambases.data.bases.BaseInstanceManager")
const $TeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
const $RiftHelperUtil = Java.loadClass("dev.ftb.mods.ftbrifthelper.RiftHelperUtil");
const $RiftRegionManager = Java.loadClass("dev.ftb.mods.ftbrifthelper.RiftRegionManager");
const $Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");
/* 
* Find the portal center
* This function will find the portal center based on the marker entity
* 
*/
global.findPortalCenter = (player, teamId) => {
    teamId = teamId || $TeamsAPI.api().getManager().getTeamForPlayer(player).get().id;

    let portalCenter;
    let baseDetails = global.getBaseDetails(player.getServer(), teamId)
    let spawnPos = baseDetails.get().spawnPos()
    console.log(`Finding portal center for team ${teamId} at ${spawnPos.x}, ${spawnPos.y}, ${spawnPos.z}`)
    global.forceChunkload(player, spawnPos, 2, true)
    let aabb = AABB.of(spawnPos.x-150, spawnPos.y-270, spawnPos.z-150, spawnPos.x+150, spawnPos.y-200, spawnPos.z+150)
    // Find the portal center
    player.getServer().getLevel('minecraft:overworld').getEntitiesWithin(aabb).forEach(entity => {
        if (entity == null) return
        if(entity.type == "minecraft:marker"){
            console.log(`Found marker entity at ${entity.x}, ${entity.y}, ${entity.z}`)
            portalCenter = new BlockPos(entity.x, entity.y, entity.z)
        }
    })
    global.forceChunkload(player, spawnPos, 2, false)
    return portalCenter;
}

global.getBaseDetails = (server, teamId) => {
    const baseManager = $BaseInstanceManager.get(server)
    let baseDetails = baseManager.getBaseForTeamId(teamId)
    return baseDetails
}

global.createPortalData = (server, teamId) => {
    let sPData = server.persistentData;
    sPData.portals = sPData.portals ?? {}
    sPData.portals[teamId] = sPData.portals[teamId] ?? {}
    sPData.portals[teamId].active = true
    if(sPData.portals[teamId].getDouble('timer') == 0) sPData.portals[teamId].timer = 20*60*20
}

global.forceChunkload = (player, pos, chunkRadius, load) => {
    let command = `forceload ${load ? 'add' : 'remove'} ${pos.x + chunkRadius*16} ${pos.z + chunkRadius*16} ${pos.x - chunkRadius*16} ${pos.z - chunkRadius*16}`
    player.getServer().runCommandSilent(command)
}

global.spawnRiftWeaver = (player, teamId, item) => {
    let server = player.getServer()
    if(!server.persistentData.portals) server.persistentData.portals = {}
    if(!server.persistentData.portals[teamId]) server.persistentData.portals[teamId] = {}
    if(server.persistentData.portals[teamId].getBoolean('rift_weaver_spawn')) return;
    let regionCoords = $RiftRegionManager.getInstance().getRegionsForTeam(teamId)
    let region = regionCoords[2]
    // region * 512 + chunk + block
    let x = region.x() * 512 + 31*16 + 15
    let z = region.z() * 512 + 14*16 + 9
    let y = 120

    server.persistentData.portals[teamId].setBoolean('rift_weaver_spawn', true)
    if (player.distanceToSqr(new $Vec3(x,y,z)) > 32*32) {
        console.log(`Player is not within 32 block radius of ${x}, ${y}, ${z}`);
        player.level.runCommand(
            `/immersivemessages sendcustom ${player
            .getDisplayName()
            .getString()} {y:50,size:1.1,sound:1,color:"#AA00AA"} 4 ` + Text.translate("message.rift.arena").getString()
        )
        return;
    }
    if(!player.isCreative()) item.count--

    let iterations = 25
    // Particle effects
    for (let i = 0; i < iterations; i++) {
        server.scheduleInTicks((i * 5), (_) => server.runCommandSilent(`execute in ftb:the_rift positioned ${x} ${y+1} ${z} run particle cataclysm:soul_lava ${x} ${y} ${z} 0.5 1 0.5 0 150`))
    }
    server.scheduleInTicks(23*5 + 5, (_) => {
        server.runCommandSilent(`execute in ftb:the_rift positioned ${x} ${y} ${z} run summon ftboceanmobs:rift_weaver`)
        server.runCommandSilent(`execute in ftb:the_rift run playsound ftboceanmobs:minotaur_idle music @p[x=${x}, y=${y}, z=${z}, distance=..512]`)
})


    console.log(`Region coordinates: ${x}, ${z}`)
}

global.setRiftTimer = (player, timer) => {
    const sPData = player.getServer().persistentData;
    const team = $TeamsAPI.api().getManager().getTeamForPlayer(player).get();
    if (!team) return false
    sPData.portals[team.id].putDouble('timer', timer)
    return true
}

global.getTeam = (player) => {
    return $TeamsAPI.api().getManager().getTeamForPlayer(player).get();
}