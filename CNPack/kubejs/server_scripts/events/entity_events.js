EntityEvents.spawned("minecraft:eye_of_ender", (event) => {
    const { entity, server } = event;
    let dimension = entity.level.dimension;
    entity.customName = Text.translate("entity.ender_eye.name").toJson();
    server.scheduleInTicks(4 * 20, (_) => {
      const { x, y, z } = entity;
      entity.kill();
      let command = `execute in ${dimension} run particle minecraft:reverse_portal ${Math.floor(x)} ${Math.floor(
        y
      )} ${Math.floor(z)} 0 0 0 0.8 50 force`;
      server.runCommandSilent(command);
    });
  });