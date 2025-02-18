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
    let sPData = player.getServer().persistentData;
    if(!sPData.portals[teamId].position){
        let portalBlock = Item.of("ftb:portal_holder").getBlock().defaultBlockState()
        let kuLevel = new Ku.Level(player.getLevel());
        const locations = kuLevel.findBlockWithinRadius(portalBlock, new BlockPos(spawnPos.x, spawnPos.y-270, spawnPos.z), 150, false);
        portalCenter = global.findCenterBlockPos(locations)
        console.log(`Portal center found at ${portalCenter.x}, ${portalCenter.y}, ${portalCenter.z}`)
        sPData.portals[teamId].position = {x: portalCenter.x, y: portalCenter.y, z: portalCenter.z}
    }    

    global.forceChunkload(player, spawnPos, 2, false)
    return new BlockPos(sPData.portals[teamId].position.x, sPData.portals[teamId].position.y, sPData.portals[teamId].position.z)
}

global.getBaseDetails = (server, teamId) => {
    const baseManager = $BaseInstanceManager.get(server)
    let baseDetails = baseManager.getBaseForTeamId(teamId)
    return baseDetails
}

global.createPortalData = (server, teamId, player) => {
    let sPData = server.persistentData;
    console.log(`Creating portal data for team ${teamId}`)
    sPData.portals = sPData.portals ?? {}
    sPData.portals[teamId] = sPData.portals[teamId] ?? {}
    sPData.portals[teamId].active = true
    if(sPData.portals[teamId].getDouble('timer') == 0) sPData.portals[teamId].timer = 20*60*20
    console.log(`Portal data created for team ${teamId}`)
    console.log(player)
    if(player){
        let portalCenter = global.findPortalCenter(player, teamId)
        console.log(`Setting PortalCenter in sPData: ${portalCenter}`)
        if(!sPData.portals[teamId].position) sPData.portals[teamId].position = {x: portalCenter.x, y: portalCenter.y, z: portalCenter.z}
    }
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
global.setWaypoint = (player, name, pos, dimension) => {
    dimension = dimension ?? 'minecraft:overworld'
    let command = `execute as ${player.username} run ftbchunks waypoint add ${name} ${pos.x} ${pos.y} ${pos.z} ${dimension}`
    player.getServer().runCommand(command)
} 

global.findCenterBlockPos = (positions) => {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    for (let pos of positions) {
        minX = Math.min(minX, pos.x);
        maxX = Math.max(maxX, pos.x);
        minY = Math.min(minY, pos.y);
        maxY = Math.max(maxY, pos.y);
        minZ = Math.min(minZ, pos.z);
        maxZ = Math.max(maxZ, pos.z);
    }

    const centerX = Math.floor((minX + maxX) / 2);
    const centerY = maxY;
    const centerZ = Math.floor((minZ + maxZ) / 2);

    return new BlockPos(centerX, centerY, centerZ);
}