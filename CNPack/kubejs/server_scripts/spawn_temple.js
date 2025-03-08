// const TempleSettings = {
//   height: -55,
//   structure: "ftb:overworld/underwater/portal_temple",
// };

// ItemEvents.rightClicked("minecraft:debug_stick", (event) => {
//   const { player, level } = event;

//   // This needs to be moved to after Base Creation
//   const kuLevel = new Ku.Level(player.level);
//   kuLevel.spawnStructure(
//     TempleSettings.structure,
//     new BlockPos(player.x, TempleSettings.height, player.z)
//   );

//   player.tell(
//     `Spawning Temple at ${player.x}, ${TempleSettings.height}, ${player.z}`
//   );
// });
