//priority: 100
const ftbEvents = [airDropEvent];

const defaultSettings = {
  timer: 0, //initial timer
  timerDelay: 1000, //time in ticks for the event to trigger
  debug: false, //debug mode
  maxAttempts: 10, //max attempts to find a spawn location
  chance: 0.4, //chance of no event for the player this time
  timeCooldown: 92000, //time in ticks to check if a player has had an event recently
};

const overrideExistingSettings = false;
if (overrideExistingSettings) {
  server.persistentData.eventSettings = defaultSettings;
}

ServerEvents.loaded((event) => {
  let sPData = event.server.persistentData;

  if (!sPData.contains("event_settings"))
    sPData.put("event_settings", NBT.toTagCompound(defaultSettings))

  if (!sPData.contains("statistics"))
    sPData.put("statistics", NBT.toTagCompound({
      totalEvents: 0,
      success: {},
      failure: {},
    }))
});

PlayerEvents.tick((event) => {
  let timer =  event.player.persistentData.contains("raft_timer") ? event.player.persistentData.getInt("raft_timer") : 60000;
  event.player.persistentData.putInt("raft_timer", timer + 1);
});

ServerEvents.tick((event) => {
  let pdata = event.server.persistentData.getCompound("event_settings");
  let timer = pdata.getInt("timer");

  pdata.putInt("timer", timer + 1);

  if ((timer + 1) > pdata.getInt("timerDelay")) {
    eventSystem(event);
    pdata.putInt("timer", 0);
  }

  // airdrop removal timer
  if (event.server.persistentData.contains("landed_airdrops")) {
    var landed = event.server.persistentData.getList("landed_airdrops", 10);
    var toRemove = [];
    var i = 0;

    landed.forEach((drop) => {
      var airdropTimer = drop.contains("timer") ? drop.getInt("timer") : 0;
      drop.putInt("timer", airdropTimer + 1);

      if (airdropTimer > 20 * 60 * 15) {
        toRemove.push(i);

        var blocks = drop.getList("blocks", 10);
        var level = event.server.overworld();

        blocks.forEach(blockInfo => {
          var x = blockInfo.getInt("x")
          var y = blockInfo.getInt("y")
          var z = blockInfo.getInt("z")
          var id = blockInfo.getString("id")

          var block = level.getBlock(x, y, z)
          if (block.id.toString() == id) {
            level.setBlockAndUpdate(block.pos, Blocks.AIR.defaultBlockState());
          } else {
            console.log(`[Airdrop Remover] Block at ${x}, ${y}, ${z} named '${block.id}' does not match '${id}'! Not replacing!`)
          }
        })
      }

      i++;
    })

    toRemove.forEach((i) => {
      landed.remove(i)
    })

    event.server.persistentData.put("landed_airdrops", landed);
  }
});

function eventSystem(event, forceEvent) {
  forceEvent = forceEvent ?? false;
  const { server } = event;

  let eventSettings = server.persistentData.getCompound("event_settings");
  let chance = eventSettings.getDouble("chance");
  let Statistics = server.persistentData.getCompound("statistics");

  var debug = eventSettings.getBoolean("debug");
  var ran = Math.random();

  let maxAttempts = eventSettings.contains("maxAttempts") ? eventSettings.getInt("maxAttempts") : 10;
  let timeCooldown = eventSettings.contains("timeCooldown") ? eventSettings.getInt("timeCooldown") : 100;

  //Get all player
  var players = server.players;
  if (players.length === 0) {
    //If no players return
    if (debug) console.log("No players found for events");
    return;
  }

  //Choose a player to do the event for
  var chosenPlayer = players[Math.floor(Math.random() * players.length)];
  if (chosenPlayer.isCreative() || chosenPlayer.isSpectator()) {
    //Check players gamemode, so we only do this on players in survival.
    if (debug)
      console.log("Player is create or spectator, exiting");
    return;
  }

  //Check if player is alive.
  if (!chosenPlayer.alive) {
    if (debug) console.log("Player is dead");
    return;
  }

  //Check persistent data is available
  if (!chosenPlayer.persistentData) {
    if (debug) console.log("Player missing persistent Data");
    return;
  }

  //If player had an event happen within the last 15min do nothing
  var chosenPlayerTimer = chosenPlayer.persistentData.getInt("raft_timer");
  if (chosenPlayerTimer < timeCooldown && !forceEvent) {
    if (debug) console.log(`Player has had an event recently, skipping ${chosenPlayerTimer} < ${timeCooldown}`);
    return;
  }

  Statistics.putInt("totalEvents", Statistics.getInt("totalEvents")+1);

  //Creates a list of events the user player has disabled.
  var disabledEvents = [];
  if (chosenPlayer.persistentData.disabledEvents) {
    for (let i = 0; i < chosenPlayer.persistentData.disabledEvents.length; i++) {
      disabledEvents.push(chosenPlayer.persistentData.disabledEvents[i].toString());
    }
  }

  var filteredEvents = ftbEvents.filter(
    (e) => ran <= e.chance && !disabledEvents.includes(`"${e.name}"`)
  );

  //Choose an event from the filtered list
  var chosenEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];

  // If no event return
  if (!chosenEvent) {
    if (debug) console.log("no event was chosen, returning");
    Statistics.failure.putInt("No Event", Statistics.failure.getInt("No Event")+1);
    // Statistics.failure["No Event"] = Statistics.failure["No Event"] ? Statistics.failure["No Event"] + 1 : 1;
    return;
  }

  let level = chosenPlayer.getLevel();
  let playerPos = new BlockPos(chosenPlayer.x, chosenPlayer.y, chosenPlayer.z);

  if (event.server.getOverworld() != chosenPlayer.level || (Math.abs(playerPos.x) < 1000 && Math.abs(playerPos.z) < 1000))
  {
    Statistics.failure.putInt("Near Base", Statistics.failure.getInt("Near Base") + 1);
    return;
  }

  //Check for required biomes
  if (chosenEvent.requiredBiomes && chosenEvent.requiredBiomes.length > 0) {
    let biomeHolder = chosenPlayer.level.minecraftLevel.getBiome(chosenPlayer.getBlock().getPos());
    let foundBiome = chosenEvent.requiredBiomes.find((e) => biomeHolder.is(e));

    if (!foundBiome) {
      if (debug) console.log("Required biome not found, returning");
      Statistics.failure.putInt("Required Biome", Statistics.failure.getInt("Required Biome")+1);
      // Statistics.failure["Required Biome"] = Statistics.failure["Required Biome"] ? Statistics.failure["Required Biome"] + 1 : 1;
      return;
    }
  }


  if (chosenEvent.stage && !chosenPlayer.stages.has(chosenEvent.stage)) {
    if (debug) console.log("Player does not have required stage for event, returning");
    chosenPlayer.persistentData.putInt("raft_timer", timeCooldown); //reset their event timer since no event was able to trigger
    Statistics.failure.putInt("Missing Stage", Statistics.failure.getInt("Missing Stage")+1);
    return;
  }

  if (chosenEvent.size >= 0 && chosenEvent.minDistance && chosenEvent.maxDistance) {
    //10 Tries to find random location for the event to happen.
    let tries = 0;
    let spawnFound;

    while (tries < maxAttempts && !spawnFound) {
      let randomLoc = new Ku.Level(chosenPlayer.getLevel()).getRandomLocation(
        playerPos,
        chosenEvent.minDistance,
        chosenEvent.maxDistance
      );

      randomLoc = new BlockPos(randomLoc.x, 191, randomLoc.z);

      if (debug && !spawnFound)
        console.log("Checking spawn location for event! :" + chosenEvent.name);

      var corners = [
        randomLoc.offset(0, 0, 0),
        randomLoc.offset(8, 0, 0),
        randomLoc.offset(-8, 0, 0),
        randomLoc.offset(0, 0, 8),
        randomLoc.offset(0, 0, -8),
        randomLoc.offset(16, 0, 16),
        randomLoc.offset(-16, 0, 16),
        randomLoc.offset(16, 0, -16),
        randomLoc.offset(-16, 0, -16)
      ];

      let flag = false;
      corners.forEach(corner => {
        // check if water on surface
        if (level.getBlock(corner).blockState.block.id != "minecraft:water") {
          flag = true;
          return;
        }

        // check an 16 block column in each corner to make sure nothing is obstructing
        for (let i = 1; i < 16; i++) {
          if (level.getBlock(corner.offset(0, i, 0)).blockState.block.id != "minecraft:air") {
            flag = true;
            return;
          }
        }
      })

      if (flag)
      {
        tries++;
      } else {
        if(Math.abs(randomLoc.x) - Math.abs(playerPos.x) > 132 || Math.abs(randomLoc.z) - Math.abs(playerPos.z) > 132) return;
        spawnFound = { pos: randomLoc, locationInfo: null };
        console.log("spawnFound !! :" + randomLoc);
        tries = maxAttempts;
      }
    }

    if (debug && !spawnFound) {
      console.log("Spawn not found for event");
      chosenPlayer.tell("§cCould not find spawn location for airdrop!")
      Statistics.failure.putInt("Spawn not found", Statistics.failure.getInt("Spawn not found")+1);
      // Statistics.failure["Spawn not found"] = Statistics.failure["Spawn not found"] ? Statistics.failure["Spawn not found"] + 1 : 1;
      chosenPlayer.persistentData.putInt("raft_timer", Math.floor(Math.random() * 20000));

      return
    }


    //If event and player has been chosen, start the event and restart players timer
    if (chosenEvent && chosenPlayer && spawnFound) {
      chosenEvent.execute(event, chosenPlayer, spawnFound);
      chosenPlayer.persistentData.putInt("raft_timer", Math.floor(Math.random() * 20000));
      Statistics.success.putInt(chosenEvent.name, Statistics.success.getInt(chosenEvent.name)+1);
      // Statistics.success[chosenEvent.name] = Statistics.success[chosenEvent.name] ? Statistics.success[chosenEvent.name] + 1 : 1;
    }
  } else {
    //If event and player has been chosen, start the event and restart players timer
    if (chosenEvent && chosenPlayer) {
      chosenPlayer.persistentData.putInt("raft_timer", Math.floor(Math.random() * 2000));
      Statistics.failure.putInt(chosenEvent.name, Statistics.failure.getInt(chosenEvent.name)+1);
      // Statistics.success[chosenEvent.name] = Statistics.success[chosenEvent.name] ? Statistics.success[chosenEvent.name] + 1 : 1;
    }
  }
}
