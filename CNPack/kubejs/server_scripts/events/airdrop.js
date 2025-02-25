//priority: 800

const airDropEvent = {
  name: "oceanblock:airdrop",
  displayName: "airdrop",
  description: "airdrop",
  chance: 1.0,
  minDistance: 48,
  maxDistance: 128,
  size: 10,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: "minecraft:water",
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,
  priority: 800,

  execute(event, player, location, name) {
    let eventServer = player.getServer();
    var offset = location.pos.subtract(player.blockPosition());

    let relative = { message: "", blocks: 0 };
    if (Math.abs(offset.z) > Math.abs(offset.x)) {
      relative.blocks = Math.abs(offset.z);
      relative.message = offset.z > 0 ? Text.translate("warning.airdrop.incoming.south") : Text.translate("warning.airdrop.incoming.north");
    } else {
      relative.blocks = Math.abs(offset.x);
      relative.message = offset.x > 0 ? Text.translate("warning.airdrop.incoming.east") : Text.translate("warning.airdrop.incoming.west");
    }

    new ImmersiveMessage(player, Text.translate("message.airdrop.incoming").getString())
      .setDuration(23)
      .send();

    player.tell(Text.translate("warning.airdrop.incoming", relative.blocks , relative.message));

    let spawned = false;

    const level = player.getLevel();

    const structureManager = level.getStructureManager();
    const raft = structureManager.getOrCreate("ftb:overworld/airdrops/basic_raft");

    const palettes = raft.getPalettes();

    let blocks = [];

    for (let i = 0; i < palettes.size(); i++) {
      for (let j = 0; j < palettes[i].blocks().size(); j++) {
        let blck = palettes[i].blocks()[j];
        blocks.push({ pos: blck.pos(), state: blck.state() });
      }
    }

    let entities = [];
    let startTime = eventServer.getTickCount();
    
    //Cleanup old airdrops
    
    level.getEntities().forEach((entity) => {
      if(entity.getType().toString() == 'minecraft:block_display' && entity.tickCount > 20*60*2){
        entity.discard();
      }
    })

    for (let i = 0; i < blocks.length; i++) {
      let blockData = blocks[i];
      if (!blockData || blockData.state.id == "minecraft:air") continue;

      let entity = level.createEntity("minecraft:block_display");

      let stateNBT = NBT.toTagCompound({});
      let propsNBT = NBT.toTagCompound({});

      blockData.state.getProperties().forEach((property) => {
        propsNBT.putString(property.name, property.value(blockData.state).value().toString());
      });

      stateNBT.put("Name", blockData.state.id);
      stateNBT.put("Properties", propsNBT);

      entity.setNbt({
        block_state: stateNBT,
        Motion: [0, -0.1, 0],
        view_range: NBT.intTag(9999),
        teleport_duration: NBT.intTag(20),
        tags: NBT.stringTag("airdrop"),
      });

      entity.x = blockData.pos.x + location.pos.x;
      entity.y = blockData.pos.y + 192 + 48;
      entity.z = blockData.pos.z + location.pos.z;
      entity.spawn();

      entities.push({
        block: blockData,
        falling: entity,
      });
    }

    let handler = entities[0];
    const $Double = Java.loadClass("java.lang.Double");

    let checkPositionInterval = setInterval(() => {
      try {
        entities.forEach((entity) => {
          let entPos = entity.falling.position();
          entity.falling["moveTo(double,double,double)"](
            new $Double(entPos.x + 0),
            new $Double(entPos.y - 0.1),
            new $Double(entPos.z + 0)
          );
        });

        let y = handler.falling.position().y;

        if (y < 190.5) {
          if (!spawned) {
            spawned = true;
            new ImmersiveMessage(player, Text.translate("message.airdrop.landed").getString())
            .setDuration(5)
            .setColor("#ff0000")
            .send();

            var placedBlocks = [];
            entities.forEach((entity) => {
              var blockpos = entity.block.pos.offset(location.pos.x, 192, location.pos.z);
              let block = level.getBlock(blockpos.x, blockpos.y, blockpos.z);

              if (block.id == "minecraft:air") {
                level.setBlockAndUpdate(blockpos, entity.block.state);
                placedBlocks.push({x: blockpos.x, y: blockpos.y, z: blockpos.z, id: entity.block.state.id});

                if (entity.block.state.id == "minecraft:chest") {
                  let block = level.getBlock(blockpos);
                  block.setEntityData({ LootTable: "ftbstuff:blocks/raft_crate" });
                }
              }

              entity.falling.discard();
              clearInterval(checkPositionInterval);
            });

            if (!eventServer.persistentData.contains("landed_airdrops"))
              eventServer.persistentData.put("landed_airdrops", NBT.listTag());

            var list = eventServer.persistentData.getList("landed_airdrops", 10)
            var airdropTag = NBT.toTagCompound({})
            var blocksTag = NBT.listTag()

            airdropTag.putInt("timer", 0);
            placedBlocks.forEach(block => {
              var blockTag = NBT.toTagCompound({})

              blockTag.putInt("x", block.x)
              blockTag.putInt("y", block.y)
              blockTag.putInt("z", block.z)
              blockTag.putString("id", block.id)

              blocksTag.add(blockTag)
            })

            airdropTag.put("blocks", blocksTag);
            list.add(airdropTag)

            // console.log("landed_airdrops")
            // console.log(list)
            // console.log(eventServer)
            // console.log(eventServer.persistentData)
            eventServer.persistentData.put("landed_airdrops", list);
          }
        }

        if (eventServer.getTickCount() - startTime >= 20*60*3) {
          console.log("Airdrop did not land! Clearing anyway...");
          clearInterval(checkPositionInterval);
          entities.forEach((entity) => {
            if (entity && entity.falling) entity.falling.discard();
          });
        }
      } catch (error) {
        // console.error(error);
        clearInterval(checkPositionInterval);
        entities.forEach((entity) => {
          if (entity && entity.falling) entity.falling.discard();
        });
      }
    }, 50);
  },
};
