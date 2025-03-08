// Guaranteed Block Drops
BlockEvents.broken((event) => {
  const player = event.player;
  const block = event.block;

  if (player == null) return;

  const blockRewards = [
    {
      tag: "ftbstuff:barrel/metal",
      stage: "flint",
      item: "minecraft:flint",
      amount: 6,
    },
    {
      tag: "ftbstuff:barrel/wooden",
      stage: "bamboo",
      item: "minecraft:bamboo",
      amount: 8,
    },
    {
      blockID: "ftbstuff:green_barrel",
      stage: "copper_wire",
      item: "ftbmaterials:copper_wire",
      amount: 4,
    },
  ];

  for (const reward of blockRewards) {
    if (((reward.tag && block.hasTag(reward.tag)) || reward.blockID === block.id) && !player.stages.has(reward.stage)) {
      block.popItem(Item.of(reward.item, reward.amount));
      player.stages.add(reward.stage);
    }
  }
});
