const checkSpawnLocation = (level, pos, size, checkBlocks, requireBlockBelow) => {
  let blocks = new Ku.Level(level).seekCollectionOfBlocks(
    pos,
    size,
    (pos) => checkBlocks.includes(level.getBlock(pos).blockState.block.id),
    requireBlockBelow ? (pos) => level.getBlock(pos).blockState.block.id == requireBlockBelow : null
  );
  return {
    okay: blocks.length > 0,
    blocks: Ku.Streams.mapToBlock(level, blocks),
  };
};

const clearLocation = (locationInfo, level) => {
  locationInfo.blocks.forEach((block) => {
    if (block.id !== "minecraft:air") {
      level.getBlock(block.pos.x, block.pos.y, block.pos.z).set("minecraft:air");
    }
  });
};

const restoreLocation = (locationInfo, level) => {
  locationInfo.blocks.forEach((block) => {
    if (block.id !== "minecraft:air") {
      var b = level.getBlock(block.pos.x, block.pos.y, block.pos.z);
      if (b.id === "minecraft:air") {
        b.set(block);
      }
    }
  });
};

function checkForBlockInCube(targetBlock, level, cubeSize, sx, sy, sz) {
  let found = "";

  for (let x = -Math.abs(cubeSize); x <= cubeSize; x++) {
    if (found != "") break;

    for (let y = -Math.abs(cubeSize); y <= cubeSize; y++) {
      if (found != "") break;

      for (let z = -Math.abs(cubeSize); z <= cubeSize; z++) {
        if (found != "") break;

        let block = level.getBlock(sx + x, sy + y, sz + z);
        if (block.id == targetBlock) {
          found = block;
        }
      }
    }
  }
  return found;
}

const message = (event, message) => {
  event.player.sendSystemMessage(message, true);
};

const error = (event, message) => {
  event.player.sendSystemMessage({ text: "⚠ " + message, color: "red" }, true);
};

const success = (event, message) => {
  event.player.sendSystemMessage({ text: "✔ " + message, color: "green" }, true);
};

const returnBlock = (event, block) => {
  event.server.schedule(1, (_) => {
    event.player.getInventory().placeItemBackInInventory(block);
  });
};


