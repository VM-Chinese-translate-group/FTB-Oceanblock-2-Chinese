const speedModify = [
  {
    speed: 1,
    blocks: [
      "ftbstuff:white_barrel",
      "ftbstuff:green_barrel",
      "ftbstuff:blue_barrel",
      "ftbstuff:purple_barrel",
      "ftbstuff:red_barrel",
      "ftbstuff:black_barrel",
      "ftbstuff:golden_barrel",
      "ftbstuff:small_crate",
      "ftbstuff:crate",
      "ftbstuff:pulsating_crate",
    ],
  },
  {
    speed: 5,
    blocks: [
      [
        "ftbstuff:creative_low_temperature_source",
        "ftbstuff:creative_high_temperature_source",
        "ftbstuff:creative_subzero_temperature_source",
      ],
    ],
  },
];

BlockEvents.modification((event) => {
  speedModify.forEach((blocks) => {
    blocks.blocks.forEach((block) => {
      event.modify(block, (modification) => {
        modification.destroySpeed = blocks.speed;
      });
    });
  });
});
