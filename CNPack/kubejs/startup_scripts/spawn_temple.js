// NativeEvents.onEvent(
//   "dev.ftb.mods.ftbteams.api.event.TeamCreatedEvent.TeamCreatedEvent",
//   (event) => {
//     global.teamBaseCreation(event);
//   }
// );

// global.teamBaseCreation = (event) => {
//   try {
//     for (let i in event) console.log(`TEAMBASE EVENT: ${i}`);  // Testing for what we have in the event

//     const player = event.getCreator();
//     const level = player.level;
//		player.getServer().scheduleInTicks(20, _ => {
//     		global.spawnTemple(player, level);
//		})

//   } catch (e) {
//     console.error(e);
//   }
// };

// const TempleSettings = {
//   height: -55,
//   structure: "ftb:overworld/underwater/portal_temple_2",
// };
// global.spawnTemple = (player, level) => {
//   const kuLevel = new Ku.Level(level);
//   kuLevel.spawnStructure(
//     TempleSettings.structure,
//     new BlockPos(player.x, TempleSettings.height, player.z)
//   );
// };
