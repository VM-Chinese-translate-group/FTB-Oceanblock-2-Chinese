const $BaseInstanceManager = Java.loadClass("dev.ftb.mods.ftbteambases.data.bases.BaseInstanceManager")
const $TeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
const $RiftRegionManager = Java.loadClass("dev.ftb.mods.ftbrifthelper.RiftRegionManager");

const trophyOffsets = [
    [5, 2, 1], [5, 2, -1],
    [1, 2, 5], [-1, 2, 5],
    [-5, 2, 1], [-5, 2, -1],
    [1, 2, -5], [-1, 2, -5],
    [4, 3, 4], [4, 3, -4],
    [-4, 3, 4], [-4, 3, -4]
]

BlockEvents.placed(['obtrophies:display_trophy', 'obtrophies:trophy'], event => {
    const {player, block, level, server} = event
    let team = $TeamsAPI.api().getManager().getTeamForPlayer(player).get();
    let portalCenter = global.findPortalCenter(player, team.id)
    if(portalCenter == null) {
        player.tell(Text.translate("message.trophy.portal"))
        return;
    }
    const displayTrophies = [
        'ftbstuff:pump',
        'nautec:prismarine_crystal',
        'oritech:accelerator_controller',
        'justdirethings:time_crystal_block',
        'justdirethings:polymorphic_fluid_bucket',
        'replication:replicator',
        'advanced_ae:quantum_core',
        'actuallyadditions:empowered_diamatine_crystal_block',
        'ftb:heart_of_the_rift',
    ];
    const entityTrophies =[
        // 'obtrophies:trophy[obtrophies:trophy_info={entity:"cataclysm:the_leviathan"},rarity="rare"]',
        "cataclysm:the_leviathan",
        "ftboceanmobs:rift_weaver",
        "cataclysm:ignis",
    ]

    let trophyPositions = trophyOffsets.map(offset => new BlockPos(portalCenter.x + offset[0], portalCenter.y + offset[1], portalCenter.z + offset[2]))
    let onTrophySpot = false;
    trophyPositions.forEach(trophyPos => {
        if(trophyPos.equals(block.pos)) onTrophySpot = true;
    })
    if(!onTrophySpot) return;

    // return early if the portal is already active
    if(level.getBlock(portalCenter.offset(2, 0, 0)).id == 'minecraft:bedrock') return;

    let allTrophies = false;
    trophyOffsets.forEach(offset => {
        let trophyPos = new BlockPos(portalCenter.x + offset[0], portalCenter.y + offset[1], portalCenter.z + offset[2])
        let trophy = event.level.getBlock(trophyPos)
        switch (trophy.id) {
            case 'obtrophies:display_trophy':
                const display = trophy.getEntityData()['display']['display'];
                const index1 = displayTrophies.indexOf(display);
                if (index1 > -1) {
                    displayTrophies.splice(index1, 1);
                }
                break;
            case 'obtrophies:trophy':
                const entity = trophy.getEntityData()['components']['obtrophies:trophy_info']['entity'];
                const index2 = entityTrophies.indexOf(entity);
                if (index2 > -1) {
                    entityTrophies.splice(index2, 1);
                }
                break;
            default:
                event.server.runCommandSilent(`execute positioned ${trophyPos.x} ${trophyPos.y+1} ${trophyPos.z} run particle cataclysm:soul_lava ${trophyPos.x} ${trophyPos.y} ${trophyPos.z} 0.1 0.1 0.1 0 50`)
                break;
        }
    })

    if (displayTrophies.length === 0 && entityTrophies.length === 0) {
        allTrophies = true;
    }

    // return early if not all trophies are placed
    if(!allTrophies) return;
    let fireworks = `execute in ${player.level.dimension} positioned ${portalCenter.x+3} ${portalCenter.y-1} ${portalCenter.z+3} run summon firework_rocket ~ ~1 ~ {LifeTime:15,FireworksItem:{id:firework_rocket,components:{fireworks:{flight_duration:1.5,explosions:[{shape:star,has_twinkle:1b,has_trail:1b,colors:[I;11546150,8439583],fade_colors:[I;16351261,16701501]}]}}}}`
    // Fireworks for first time completion
    server.scheduleInTicks(170, (_) => {
        server.runCommandSilent(`execute in ${player.level.dimension} positioned ${portalCenter.x} ${portalCenter.y + 1} ${portalCenter.z} run summon firework_rocket ~ ~1 ~ {LifeTime:20,FireworksItem:{id:firework_rocket,components:{fireworks:{flight_duration:1.5,explosions:[{shape:creeper,has_twinkle:1b,has_trail:1b,colors:[I;11546150,8439583]}]}}}}`)
    })
    server.scheduleInTicks(180, (_) => {
        server.runCommandSilent(fireworks)
        server.runCommandSilent(fireworks)
        server.runCommandSilent(fireworks)
        server.runCommandSilent(fireworks)
    })
    


    let iterations = 40
    // Particle effects
    for (let i = 0; i < iterations; i++) {
        let red = Math.random() * 0.5 + 0.5;
        let green = Math.random() * 0.5 + 0.5;
        let blue = Math.random() * 0.5 + 0.5;
        server.scheduleInTicks((i * 5), (_) => server.runCommandSilent(`execute at ${player.username} run particle minecraft:entity_effect{color:[${red},${green},${blue},1.0]} ${portalCenter.x + 0.5} ${portalCenter.y + 1} ${portalCenter.z + 0.5} 0 0 0 0.5 100 force`))
    }

    // Change the portal blocks and spawn it
    server.scheduleInTicks(iterations*5 + 20, (_) => {
        swapPortal(level, portalCenter, 'minecraft:bedrock', 'justdirethings:portal_fluid_block')

    })
})


ItemEvents.rightClicked("ftb:creative_portal_switcher", event => {
    const {player, level, hand, item} = event
    if(hand != "MAIN_HAND") return; 
    let team = $TeamsAPI.api().getManager().getTeamForPlayer(player).get();
    let pPortal = player.getServer().persistentData.portals[team.id].position
    let portalCenter = global.findPortalCenter(player, team.id)
    if(portalCenter == null) {
        player.tell(Text.translate("message.trophy.portal"))
        return
    }
    switch(level.getBlock(portalCenter.offset(2, 0, 0)).id){
        case 'minecraft:bedrock':
            swapPortal(level, portalCenter, 'ftb:portal_holder', 'air')
            break;
        case 'ftb:portal_holder':
            swapPortal(level, portalCenter, 'minecraft:bedrock', 'justdirethings:portal_fluid_block')
            break;
    }
    player.addItemCooldown(item.id, 20)
    player.swing()
})

ItemEvents.rightClicked("ftb:heart_of_the_rift", event => {
    const {player, level, hand, item} = event
    if(hand != "MAIN_HAND") return; 
    let team = $TeamsAPI.api().getManager().getTeamForPlayer(player).get();
    global.spawnRiftWeaver(player, team.id, item)
})

ServerEvents.tick(event => {  
    const {server} = event
    let sPData = server.persistentData;
    sPData.portals = sPData.portals ?? {}
        Object.keys(sPData.portals).forEach(teamId => {
            if(!sPData.portals[teamId].getBoolean('active')) return;
            // console.log(`Portal for team ${teamId} is active: ${sPData.portals[teamId].getDouble('timer')}`)
            sPData.portals[teamId].putDouble('timer', sPData.portals[teamId].getDouble('timer') - 1)
            if(sPData.portals[teamId].getDouble('timer') <= 0){
                sPData.portals[teamId].putBoolean('active', false)
                sPData.portals[teamId].putBoolean('rift_weaver_spawn', false)

                let team = $TeamsAPI.api().getManager().getTeamByID(teamId).get()
                let onlineMembers = team.getOnlineMembers();
                $RiftRegionManager.getInstance().addPendingRefresh(team.id)

                if(onlineMembers.length == 0) return;

                server.scheduleInTicks(40, (_) => {
                    let portalCenter = global.findPortalCenter(onlineMembers[0], team.id)
                    swapPortal(server.getLevel('minecraft:overworld'), portalCenter, 'ftb:portal_holder', 'air')
                    // console.log(`Portal for team ${teamId} is deactivated`)
                })
            }     
        })
})







/* 
* Portal swapping function
* To Rift: swapPortal(level, portalCenter, 'ftb:portal_holder', 'justdirethings:portal_fluid_block')
* To Home Portal: swapPortal(level, portalCenter, 'minecraft:bedrock', 'justdirethings:polymorphic_fluid_block')
*/
function swapPortal(level, portalCenter, frameBlock, fluid){
    let portalFrameBlocks = [
        new BlockPos(portalCenter.x + 2, portalCenter.y, portalCenter.z),
        new BlockPos(portalCenter.x + 2, portalCenter.y, portalCenter.z + 1),
        new BlockPos(portalCenter.x + 2, portalCenter.y, portalCenter.z - 1),

        new BlockPos(portalCenter.x - 2, portalCenter.y, portalCenter.z),
        new BlockPos(portalCenter.x - 2, portalCenter.y, portalCenter.z + 1),
        new BlockPos(portalCenter.x - 2, portalCenter.y, portalCenter.z - 1),
        
        new BlockPos(portalCenter.x, portalCenter.y, portalCenter.z + 2),
        new BlockPos(portalCenter.x + 1, portalCenter.y, portalCenter.z + 2),
        new BlockPos(portalCenter.x - 1, portalCenter.y, portalCenter.z + 2),
        
        new BlockPos(portalCenter.x, portalCenter.y, portalCenter.z - 2),
        new BlockPos(portalCenter.x + 1, portalCenter.y, portalCenter.z - 2),
        new BlockPos(portalCenter.x - 1, portalCenter.y, portalCenter.z - 2),
    ]
    let portalBlocks = [
        new BlockPos(portalCenter.x + 1, portalCenter.y, portalCenter.z),
        new BlockPos(portalCenter.x - 1, portalCenter.y, portalCenter.z),
        new BlockPos(portalCenter.x, portalCenter.y, portalCenter.z + 1),
        new BlockPos(portalCenter.x, portalCenter.y, portalCenter.z - 1),
        new BlockPos(portalCenter.x + 1, portalCenter.y, portalCenter.z + 1),
        new BlockPos(portalCenter.x - 1, portalCenter.y, portalCenter.z + 1),
        new BlockPos(portalCenter.x + 1, portalCenter.y, portalCenter.z - 1),
        new BlockPos(portalCenter.x - 1, portalCenter.y, portalCenter.z - 1),
        new BlockPos(portalCenter.x, portalCenter.y, portalCenter.z),
    ]
    portalBlocks.forEach(blockPos => {
        level.getBlock(blockPos).set('minecraft:air')
    })
    portalFrameBlocks.forEach(blockPos => {
        level.getBlock(blockPos).set('air')
        level.getBlock(blockPos).offset(0,0,0).set(frameBlock)
    })
    level.getBlock(portalBlocks[0]).set(fluid)
    
}

