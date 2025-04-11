// priority: 10000
let $EntityGetter = Java.loadClass("net.minecraft.world.level.EntityGetter");
const $BaseInstanceManager = Java.loadClass("dev.ftb.mods.ftbteambases.data.bases.BaseInstanceManager")
let $TeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
const $RiftHelperUtil = Java.loadClass("dev.ftb.mods.ftbrifthelper.RiftHelperUtil");
const $RiftRegionManager = Java.loadClass("dev.ftb.mods.ftbrifthelper.RiftRegionManager");
const $Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");
let $Player = Java.loadClass("net.minecraft.world.entity.player.Player");
let $Team = Java.loadClass("dev.ftb.mods.ftbteams.api.Team");
// let $ImmersiveMessage = Java.loadClass('toni.immersivemessages.api.ImmersiveMessage')
// let $SoundEffect = Java.loadClass('toni.immersivemessages.api.SoundEffect')
// let $ImmersiveColor = Java.loadClass("toni.immersivemessages.util.ImmersiveColor");
// let $ImmersiveFont = Java.loadClass("toni.immersivemessages.ImmersiveFont");
const $TextColor = Java.loadClass("net.minecraft.network.chat.TextColor");
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
    if(!sPData.portals) sPData.portals = {}
    if(!sPData.portals[teamId]) sPData.portals[teamId] = {}
    
    if(!sPData.portals[teamId]?.position){
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
    // console.log(`Creating portal data for team ${teamId}`)
    sPData.portals = sPData.portals ?? {}
    sPData.portals[teamId] = sPData.portals[teamId] ?? {}
    sPData.portals[teamId].active = true
    if(sPData.portals[teamId].getDouble('timer') == 0) sPData.portals[teamId].timer = 20*60*20
    // console.log(`Portal data created for team ${teamId}`)
    // console.log(player)
    if(player){
        let portalCenter = global.findPortalCenter(player, teamId)
        // console.log(`Setting PortalCenter in sPData: ${portalCenter}`)
        if(!sPData.portals[teamId].position) sPData.portals[teamId].position = {x: portalCenter.x, y: portalCenter.y, z: portalCenter.z}
    }
}

global.forceChunkload = (player, pos, chunkRadius, load) => {
    let command = `forceload ${load ? 'add' : 'remove'} ${pos.x + chunkRadius*16} ${pos.z + chunkRadius*16} ${pos.x - chunkRadius*16} ${pos.z - chunkRadius*16}`
    player.getServer().runCommandSilent(command)
}


global.getArenaCenter = (player) => {
    let team = global.getTeam(player);
    let riftSpawnOffset = new BlockPos(0, 83, 272)
    let arenaMiddleOffset = new BlockPos(0, 33, -550)
    let pos = global.getBaseDetails(player.getServer(), team.id).map(base => base.extents().start()).get().getBlockPos(riftSpawnOffset)
    return pos.offset(arenaMiddleOffset)
}


global.isInArena = (entity) =>{
    let { x, y, z } = global.getArenaCenter(entity)
    return entity.distanceToSqr(new $Vec3(x, y, z)) < 64*64
}

global.spawnRiftWeaver = (player, teamId, item) => {
    let server = player.getServer()
    if(!server.persistentData.portals) server.persistentData.portals = {}
    if(!server.persistentData.portals[teamId]) server.persistentData.portals[teamId] = {}

    const { x, y, z } = global.getArenaCenter(player)

    // Check if rift weaver is already spawned
    let spawned = false
    player.getLevel().getEntities().forEach(entity => {
        console.log(entity.getType().toString())
        if(entity.getType().toString() == 'ftboceanmobs:rift_weaver' && entity.distanceToSqr(new $Vec3(x,y,z)) < 32*32){
            new ImmersiveMessage(player, "message.ftboceanmobs.rift_weaver_spawn").setColor("#AA00AA").send()
            player.addItemCooldown(item.id, 50)
            spawned = true
        }
    })
    if(spawned) return;

    // Check if player is within 32 block radius of the arena
    if (player.distanceToSqr(new $Vec3(x,y,z)) > 32*32) {
        console.log(`Player is not within 32 block radius of ${x}, ${y}, ${z}`);
        // player.getServer().runCommand(
        //     `/immersivemessages sendcustom ${player
        //     .getDisplayName()
        //     .getString()} {y:50,size:1.1,sound:1,color:"#AA00AA"} 4 You are not close enough to the Rift Arena!`
        // )
        new ImmersiveMessage(
            player,
            "message.rift.arena"
        )
            .setColor("#AA00AA")
            .send();
        return;
    }

    // only remove item if not creative
    if(!player.isCreative()) {
        item.count--
    }

    // Add cooldown for all team members
    let teamMembers = global.getTeamMembers(player)
    teamMembers.forEach(member => {
        try{
            let teammember = player.getLevel().getPlayerByUUID(member)
            if(teammember) teammember.addItemCooldown(item.id, 200)
        }catch(e){
            console.log(`Could not add cooldown for ${member}, maybe they are offline?`)
        }
    })


    // Actual Spawning of the Rift Weaver
    let iterations = 25
    // Particle effects
    for (let i = 0; i < iterations; i++) {
        server.scheduleInTicks((i * 5), (_) => server.runCommandSilent(`execute in ftb:the_rift positioned ${x} ${y+1} ${z} run particle cataclysm:soul_lava ${x} ${y} ${z} 0.5 1 0.5 0 150`))
    }
    server.scheduleInTicks(23*5 + 5, (_) => {
        server.runCommandSilent(`execute in ftb:the_rift positioned ${x} ${y} ${z} run summon ftboceanmobs:rift_weaver`)
        server.runCommandSilent(`execute in ftb:the_rift run playsound ftboceanmobs:minotaur_idle music @p[x=${x}, y=${y}, z=${z}, distance=..512]`)
})
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
global.getTeamMembers = (arg) => {
    switch (true) {
        case (arg instanceof $Team):
            return arg.getMembers();
        case (arg instanceof $Player):
            return global.getTeamMembers(global.getTeam(arg));
        default:
            return [];
    }
}

global.getOtherTeamMembers = (player) => {
    let team = global.getTeam(player);
    let members = global.getTeamMembers(team);
    return members.filter(member => member != player);
}

global.setWaypoint = (player, name, pos, dimension) => {
    dimension = dimension ?? 'minecraft:overworld'
    let command = `execute as ${player.username} run ftbchunks waypoint add ${name} ${pos.x} ${pos.y} ${pos.z} ${dimension}`
    // console.log(command)
    player.getServer().runCommandSilent(command)
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

global.refreshRiftRegion = (team) => {
    console.log(`adding pending refresh for team ${team.id}`)
    $RiftRegionManager.getInstance().addPendingRefresh(team.id)
    console.log(`added pending refresh for team ${team.id}`)
}

global.isRiftPending = (team) => {
    let teams = $RiftRegionManager.getInstance().getPendingRefresh();
    teams = teams.toArray().map(team => team.toString())
    return teams.includes(team.id.toString())
}

global.showRiftCharge = (player) => {
    let charge = player.persistentData.contains("rift_charge") ? player.persistentData.getInt("rift_charge") : 0;
    const maxTime = 900*20;
    const percentage = Math.max(0, Math.min(100, Math.floor((charge / maxTime) * 100)));
    const barLength = 20;
    const filledLength = Math.floor((percentage / 100) * barLength);
    const emptyLength = barLength - filledLength;
    const bar = "█".repeat(filledLength) + "░".repeat(emptyLength);
    try {
        player.sendSystemMessage({ translate: "message.rift.charge", with: [bar, percentage], color: "white" }, true)
    } catch (e) {}
  };
  

/**
* Creates an instance of ImmersiveMessage.
* 
* has default values for all properties
*/
global.ImmersiveMessage = (player, message) => {
    return new ImmersiveMessage(player, message);
}

function ImmersiveMessage(player, message)
    {
        this.player = player;
        this.message = message ?? "";
        this.duration = 3;
        this.color = "#FFFFFF";
        this.position = "BOTTOM_CENTER";

    
        this.setMessage = (message) => {
            this.message = message;
            return this;
        }

        this.setColor = (color) => {
            this.color = color;
            return this;
        }

        this.setDuration = (duration) => {
            this.duration = duration;
            return this;
        }

        this.setPosition = (position) => {
            this.position = position;
            return this;
        }
    
    
        this.send = () => {
            this.player.getServer().runCommandSilent(
                `/pop create ${this.player.username} ${this.position} ${this.duration} {"translate": "${this.message}", "color": "${this.color}"}`
            );
        }
}
