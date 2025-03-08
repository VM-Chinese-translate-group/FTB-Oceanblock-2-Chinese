function setupCommand(e, ctx) {
  var source = ctx.getSource();
  if (!source) console.log("invalid source");

  var player = source.getPlayerOrException();

  if (!player) console.log("invalid player");

  if (!player.persistentData) console.log("invalid persistent data");

  var pData = player.persistentData;
  var disabledEvents = pData.disabledEvents;

  if (e.disableStage && !player.stages.has(e.disableStage)) {
    source.sendSuccess(Text.of(["You have not unlocked disabling this event yet!"]).red(), false);
    return 0;
  }
  if (disabledEvents) {
    let disabledEventsList = [];
    for (let i = 0; i < disabledEvents.length; i++) {
      if (e.name == disabledEvents[i]) {
        pData.disabledEvents = disabledEventsList.filter((item) => item !== e.name);
        source.sendSuccess(Text.of(["Toggled " + e.displayName + " Event on"]).green(), false);
        return 1;
      }
    }

    pData.disabledEvents.push(e.name);
    source.sendSuccess(Text.of(["Toggled " + e.displayName + " Event off"]).green(), false);
    return 1;


  } else {
    pData.disabledEvents = [e.name];
    source.sendSuccess(Text.of(["Toggled " + e.displayName + " Event off"]).green(), false);
    return 1;
  }
}

ServerEvents.commandRegistry((event) => {
  const { commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions } = event;
  const EventSettingsArgs = {
    timer: Arguments.INTEGER,
    timerDelay: Arguments.INTEGER,
    debug: Arguments.BOOLEAN,
    maxAttempts: Arguments.INTEGER,
    timeCooldown: Arguments.INTEGER,
  };
  event.register(
    Commands.literal("events").then(
      Commands.literal("statistics")
        .requires((src) => src.hasPermission(3))
        .executes(function (ctx) {
          const source = ctx.getSource();
          let statistics = ctx.source.getServer().getPersistentData().statistics;
          if (!statistics) {
            source.sendSuccess(Text.of(["No statistics found!"]).red(), false);
            return 0;
          }

          let text = [];
          text.push("Total Events Triggered: " + statistics.totalEvents);
          text.push("==============================");
          Object.keys(statistics.failure).forEach(function (key) {
            text.push("Total " + key + " Events Failed: " + statistics.failure[key]);
          });
          text.push("==============================");
          Object.keys(statistics.success).forEach(function (key) {
            let event = ftbEvents.find((e) => e.name == key);
            text.push("Total " + event.displayName + " Events Succeeded: " + statistics.success[key]);
          });
          source.sendSuccess(Text.of([text.join("\n")]), false);
          return 1;
        })
        .then(
          Commands.literal("reset")
            .requires((src) => src.hasPermission(3))
            .executes(function (ctx) {
              const source = ctx.getSource();
              let statistics = ctx.source.getServer().getPersistentData().statistics;
              if (!statistics) {
                source.sendSuccess(Text.of(["No statistics found!"]).red(), false);
                return 0;
              }
              statistics.totalEvents = 0;
              statistics.failure = {};
              statistics.success = {};
              source.sendSuccess(Text.of(["Statistics reset"]).green(), false);
              return 1;
            })
        )
    )
  );

  event.register(
    Commands.literal("spawn")
      .executes(function (ctx) {
        ctx.getSource().getPlayer().runCommandSilent("/ftbteambases lobby")
        return 1;
      })
  );

  event.register(
    Commands.literal("lobby")
      .executes(function (ctx) {
        ctx.getSource().getPlayer().runCommandSilent("/ftbteambases lobby")
        return 1;
      })
  );

  event.register(
    Commands.literal("ftbrifthelper")
    .then(
      Commands.literal("riftime")
      .requires((src) => src.hasPermission(3))
      .then(
        Commands.literal("set")
        .then(
          Commands.argument("time", Arguments.INTEGER.create(event))
          .then(
            Commands.argument("player", Arguments.PLAYER.create(event))
            .executes(function (ctx) {
              const time = Arguments.INTEGER.getResult(ctx, "time");
              const player = Arguments.PLAYER.getResult(ctx, "player");
              player.persistentData.putInt("rift_charge", time*20);
              new ImmersiveMessage(player, "裂隙计时器已设置为" + time + "秒！").send();
              return 1;
            })
          )
        )
      )
      .then(
        Commands.literal("add")
        .then(
          Commands.argument("time", Arguments.INTEGER.create(event))
          .then(
            Commands.argument("player", Arguments.PLAYER.create(event))
            .executes(function (ctx) {
              const time = Arguments.INTEGER.getResult(ctx, "time");
              const player = Arguments.PLAYER.getResult(ctx, "player");
              let timer = player.persistentData.contains("rift_charge") ? player.persistentData.getInt("rift_charge") : 20 * 5;
              
              player.persistentData.putInt("rift_charge", Math.max(0, (timer + time * 20) > 24000 ? 24000 : timer + time));
              new ImmersiveMessage(player, "裂隙计时器已增加" + (time/20).toFixed(0) + "秒！").send();
              return 1;
            })
          )
        )
      )
      .then(
        Commands.literal("clear")
        .then(
          Commands.argument("player", Arguments.PLAYER.create(event))
          .executes(function (ctx) {
            const player = Arguments.PLAYER.getResult(ctx, "player");
            player.persistentData.putInt("rift_charge", 0);
            new ImmersiveMessage(player, "裂隙计时器已清空！").send();
            return 1;
          })
        )
      )

    )
    .then(Commands.literal("kick_from_rift")
    .requires((src) => src.hasPermission(3))
    .then(Commands.argument("player", Arguments.PLAYER.create(event))
      .executes(function (ctx) {
        const player = Arguments.PLAYER.getResult(ctx, "player");
        if(!player) return 0;
        if(!player.isPlayer()) {
          console.log("Invalid player");
          return 0;}
        const team = global.getTeam(player);
        global.refreshRiftRegion(team);
        player.tell(Text.translate("command.rift.reset").getString());
        return 1
      })
      .then(Commands.argument("Kick Team from Rift? (initiate refresh)", Arguments.BOOLEAN.create(event))
        .executes(function (ctx) {
          const player = Arguments.PLAYER.getResult(ctx, "player");
          if(!player) return 0;
          if(!player.isPlayer()) {
            console.log("Invalid player");
            return 0;}
          const team = global.getTeam(player);
          global.refreshRiftRegion(team);
          team.getOnlineMembers().forEach((member) => { 
            if(member.level.dimension.toString() == 'ftb:the_rift') {
              member.getServer().runCommandSilent(`execute as ${member.username} run ftbteambases home`)
            }
          })
          player.tell(Text.translate("command.rift.reset").getString());
          return 1
        })
      )
    )
  )
);
  /*
  event.register(
    Commands.literal("home")
      .executes(function (ctx) {
        ctx.getSource().getPlayer().runCommand("/ftbteambases home")
        return 1;
      })
  );*/

  ftbEvents.forEach((ftbEvent) => {
    event.register(
      Commands.literal("events")
        .then(
          Commands.literal("toggle").then(
            Commands.literal(ftbEvent.name).executes(function (ctx) {
              setupCommand(ftbEvent, ctx);
              return 1;
            })
          )
        )
        .then(
          Commands.literal("force")
            .requires((src) => src.hasPermission(3))
            .then(
              Commands.literal("ftbskies:random")
                .then(
                  Commands.argument("target", Arguments.PLAYER.create(event))
                    .executes(function (ctx) {
                      const target = Arguments.PLAYER.getResult(ctx, "target");
                      var source = ctx.getSource();
                      if (!source) console.log("invalid source");
                      if (!target) target = source.getPlayerOrException();
                      if (!target) console.log("invalid Target");
                      let chosenEvent =
                        ftbEvents[Object.keys(ftbEvents)[Math.floor(Math.random() * Object.keys(ftbEvents).length)]];
                      let spawnFound = checkForSize(chosenEvent, target, 1000, true);
                      if (!spawnFound && chosenEvent.size >= 0) {
                        source.sendSuccess(
                          Text.of(["Spawn not found for " + chosenEvent.displayName + " Event"]).red(),
                          false
                        );
                        return 0;
                      }
                      chosenEvent.execute(ctx, target, spawnFound);
                      source.sendSuccess(
                        Text.of(["Forced " + chosenEvent.displayName + " Event for " + target.username]).green(),
                        false
                      );
                      return 1;
                    })
                    .then(
                      Commands.argument("viewername", Arguments.STRING.create(event)).executes(function (ctx) {
                        const target = Arguments.PLAYER.getResult(ctx, "target");
                        var source = ctx.getSource();
                        if (!source) console.log("invalid source");
                        if (!target) target = source.getPlayerOrException();
                        if (!target) console.log("invalid target");
                        let chosenEvent =
                          ftbEvents[Object.keys(ftbEvents)[Math.floor(Math.random() * Object.keys(ftbEvents).length)]];

                        let location = target.blockPosition;
                        if (!location) {
                          console.log("invalid location");
                          return 0;
                        }

                        let name = Arguments.STRING.getResult(ctx, "viewername");
                        let spawnFound = checkForSize(chosenEvent, target, 100, true);
                        if (!spawnFound && chosenEvent.size >= 0) {
                          source.sendSuccess(
                            Text.of(["Spawn not found for " + chosenEvent.displayName + " Event"]).red(),
                            false
                          );
                          return 0;
                        }
                        chosenEvent.execute(ctx, target, spawnFound, name);
                        // source.sendSuccess(Text.of(["You have been forced into a " + chosenEvent.displayName + " Event by " + name]).green(), false);
                        return 1;
                      })
                    )
                )
                .executes(function (ctx) {
                  var source = ctx.getSource();
                  if (!source) console.log("invalid source");
                  let target = source.getPlayerOrException();
                  if (!target) console.log("invalid target");

                  let chosenEvent =
                    ftbEvents[Object.keys(ftbEvents)[Math.floor(Math.random() * Object.keys(ftbEvents).length)]];
                  let spawnFound = checkForSize(chosenEvent, target, 10, true);
                  if (!spawnFound && chosenEvent.size >= 0) {
                    source.sendSuccess(
                      Text.of(["Spawn not found for " + chosenEvent.displayName + " Event"]).red(),
                      false
                    );
                    return 0;
                  }
                  chosenEvent.execute(ctx, target, spawnFound);
                  source.sendSuccess(Text.of(["Forced " + chosenEvent.displayName + " Event"]).green(), false);
                  return 1;
                })
            )
            .then(
              Commands.literal(ftbEvent.name).then(
                Commands.argument("target", Arguments.PLAYER.create(event))
                  .executes(function (ctx) {
                    const target = Arguments.PLAYER.getResult(ctx, "target");
                    var source = ctx.getSource();
                    if (!source) console.log("invalid source");
                    if (!target) target = source.getPlayerOrException();
                    if (!target) console.log("invalid Target");
                    let chosenEvent = ftbEvent;

                    let spawnFound = checkForSize(chosenEvent, target, 100, true);
                    if (!spawnFound && chosenEvent.size >= 0) {
                      source.sendSuccess(
                        Text.of(["Spawn not found for " + chosenEvent.displayName + " Event"]).red(),
                        false
                      );
                      return 0;
                    }
                    chosenEvent.execute(ctx, target, spawnFound);

                    source.sendSuccess(
                      Text.of(["Forced " + chosenEvent.displayName + " Event for " + target.username]).green(),
                      false
                    );
                    return 1;
                  })
                  .then(
                    Commands.argument("viewername", Arguments.STRING.create(event)).executes(function (ctx) {
                      const target = Arguments.PLAYER.getResult(ctx, "target");

                      var source = ctx.getSource();
                      if (!source) console.log("invalid source");
                      if (!target) target = source.getPlayerOrException();
                      if (!target) console.log("invalid target");

                      let chosenEvent = ftbEvent;
                      let location = target.blockPosition;
                      if (!location) {
                        console.log("invalid location");
                        return 0;
                      }

                      let name = Arguments.STRING.getResult(ctx, "viewername");
                      let spawnFound = checkForSize(chosenEvent, target, 100, true);
                      if (!spawnFound && chosenEvent.size >= 0) {
                        source.sendSuccess(
                          Text.of(["Spawn not found for " + chosenEvent.displayName + " Event"]).red(),
                          false
                        );
                        return 0;
                      }
                      chosenEvent.execute(ctx, target, spawnFound, name);
                      // source.sendSuccess(Text.of(["You have been forced into a " + chosenEvent.displayName + " Event by " + name]).green(), false);
                      return 1;
                    })
                  )
                  .executes(function (ctx) {
                    var source = ctx.getSource();
                    if (!source) console.log("invalid source");
                    let target = source.getPlayerOrException();
                    if (!target) console.log("invalid target");

                    let chosenEvent =
                      ftbEvents[Object.keys(ftbEvents)[Math.floor(Math.random() * Object.keys(ftbEvents).length)]];
                    let spawnFound = checkForSize(chosenEvent, target, 10, true);
                    if (!spawnFound && chosenEvent.size >= 0) {
                      source.sendSuccess(
                        Text.of(["Spawn not found for " + chosenEvent.displayName + " Event"]).red(),
                        false
                      );
                      return 0;
                    }
                    chosenEvent.execute(ctx, target, spawnFound);
                    source.sendSuccess(Text.of(["Forced " + chosenEvent.displayName + " Event"]).green(), false);
                    return 1;
                  })
              )
            )
        )
        .then(
          Commands.literal("settings").then(
            Commands.literal("list").executes(function (ctx) {
              const source = ctx.getSource();
              let player = source.getPlayerOrException();
              let server = source.getServer();
              let sPData = server.getPersistentData();
              let eventSettings = sPData.event_settings;
              let text = [];
              Object.keys(eventSettings).forEach(function (key) {
                text.push(key + ": " + eventSettings[key]);
              });
              source.sendSuccess(Text.of([text.join("\n")]), false);
              return 1;
            })
          )
        )
    );
  });
  Object.keys(EventSettingsArgs).forEach(function (key) {
    event.register(
      Commands.literal("events").then(
        Commands.literal("settings").then(
          Commands.literal("set")
            .requires((src) => src.hasPermission(3))
            .then(
              Commands.literal(key).then(
                Commands.argument(key, EventSettingsArgs[key].create(event)).executes(function (ctx) {
                  const source = ctx.getSource();
                  let server = source.getServer();
                  let sPData = server.getPersistentData();
                  let eventSettings = sPData.event_settings;
                  let argument = EventSettingsArgs[key].getResult(ctx, key);
                  eventSettings[key] = argument;
                  source.sendSuccess(Text.of([key + " set to " + argument]).green(), false);
                  return 1;
                })
              )
            )
        )
      )
    );
  });
});

function checkForSize(chosenEvent, chosenPlayer, maxAttempts, debug) {
  if (chosenEvent.size >= 0 && chosenEvent.minDistance && chosenEvent.maxDistance) {
    //10 Tries to find random location for the event to happen.
    let tries = 0;
    let spawnFound;
    let playerPos = new BlockPos(chosenPlayer.x, chosenPlayer.y, chosenPlayer.z);
    if(chosenEvent.displayName == "airdrop") {
      playerPos = new BlockPos(chosenPlayer.x, 192, chosenPlayer.z);
    }
    while (tries < maxAttempts && !spawnFound) {
      let randomLoc = new Ku.Level(chosenPlayer.getLevel()).getRandomLocation(
        playerPos,
        chosenEvent.minDistance,
        chosenEvent.maxDistance
      );

      if (debug && !spawnFound) console.log("Checking spawn location for event:" + chosenEvent.name);

      let spawnCheck = checkSpawnLocation(
        chosenPlayer.getLevel(),
        randomLoc,
        chosenEvent.size,
        chosenEvent.checkBlocks,
        chosenEvent.requireBlockBelow
      );
      if (spawnCheck.okay) {
        spawnFound = { pos: randomLoc, locationInfo: spawnCheck };
        return spawnFound;
      } else {
        tries++;
      }
    }
  } else {
    return null;
  }
}

EntityEvents.death("minecraft:player", (event) => {
  const { entity, source } = event;
  let pData = entity.persistentData;
  if (!pData.lastDeath) pData.lastDeath = {};
  pData.lastDeath = {
    time: Date.now(),
    position: entity.blockPosition,
    x: entity.x,
    y: entity.y,
    z: entity.z,
    cooldown: pData.lastDeath.cooldown ?? 0,
    dimension: entity.getLevel().getDimension().toString(),
  };
});

ServerEvents.command(event => {
  const { input, source } = event;
  let player = event.getParseResults().getContext().getSource().getPlayer();

  if(!player) return;

  // Always create PortalData for the player
  if(input.contains('ftbrifthelper send_to_rift')){
    global.createPortalData(player.getServer(), global.getTeam(player).id), player}


  switch(input){
    case 'back': return checkForSoulLantern(event, player);
    case 'lobby':
    case 'spawn': return checkForDimensionToSpawn(event, player);
  }

})

function checkForSoulLantern(event, player) {
  if(player.isCreative()) return;

  let pData = player.persistentData;
  if(!pData.lastDeath)  return 

  let lastDeath = pData.lastDeath;
  let dimension = lastDeath.getString('dimension');

  if(dimension != 'minecraft:the_nether') return 
  
  let inv = $CuriosApi.getCuriosInventory(player);
  if (inv == null) return;

  let lantern = inv.get().isEquipped("minecraft:soul_lantern");
  if (lantern) return
  new ImmersiveMessage(player, "将灵魂灯笼系在腰间，即可穿梭世界！")
    .setColor("#bc82ff")
    .setWave(true)
    .setDuration(4)
    .send();

  event.cancel()
}

function checkForDimensionToSpawn(event, player){
  if(player.getLevel().getDimension().toString() == 'ftb:the_rift'){
    if(player.isCreative()) return;
    new ImmersiveMessage(player, "裂隙的能量干扰了传送！")
      .setColor("#bc82ff")
      .setWave(true)
      .setDuration(4)
      .send();
    event.cancel()
    return;
  }
  console.log(`teleport to spawn: ${player.username}`)
  player.getServer().runCommandSilent(`execute in minecraft:overworld run tp ${player.username} 0 206 0`)
  event.cancel()
}