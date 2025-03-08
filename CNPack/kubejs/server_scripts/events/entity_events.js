EntityEvents.spawned("minecraft:eye_of_ender", (event) => {
    const { entity, server } = event;
    let dimension = entity.level.dimension;
    entity.customName = {"translate":"entity.ender_eye.name"};
    server.scheduleInTicks(4 * 20, (_) => {
      const { x, y, z } = entity;
      entity.kill();
      let command = `execute in ${dimension} run particle minecraft:reverse_portal ${Math.floor(x)} ${Math.floor(
        y
      )} ${Math.floor(z)} 0 0 0 0.8 50 force`;
      server.runCommandSilent(command);
    });
  });

  EntityEvents.beforeHurt("ftboceanmobs:rift_weaver", (event) => {
    const { entity, source } = event;

    if (!source.getActual() || source.getActual().type != "minecraft:player") return;
    let player = source.getActual();
    if(!player.isPlayer()) return;
    if(player.isCreative()) return;
    if(!global.isInArena(player)) 
      {
        player.tell(Text.translate("message.ftboceanmobs.rift_weaver"));
        event.cancel()
      }
  })