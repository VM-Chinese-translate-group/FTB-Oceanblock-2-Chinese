FTBQuestsEvents.customReward("366CDD79C2D07926", event =>{
    const {reward, level, player, server} = event
    const {tags} = reward

    let team = global.getTeam(player)
    console.log(team)

    let portalCenter = global.findPortalCenter(player, team.id)
    global.setWaypoint(player, 'Rift-Portal', portalCenter)
})
