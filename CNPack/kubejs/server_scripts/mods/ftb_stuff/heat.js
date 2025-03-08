ServerEvents.recipes((event) => {
  event.remove("ftbstuff:temperature_source/beacon");

  event
    .custom({
      type: "ftbstuff:temperature_source",
      blockstate: "torchmaster:megatorch",
      display_item: {
        count: 1,
        id: "torchmaster:megatorch",
      },
      efficiency: 8.0,
      temperature: "hot",
    })
    .id("ftb:stuff/temperature/magatorch");

  event
    .custom({
      type: "ftbstuff:temperature_source",
      blockstate: "minecraft:beacon",
      display_item: {
        count: 1,
        id: "minecraft:beacon",
      },
      efficiency: 8.0,
      temperature: "superheated",
    })
    .id("ftb:stuff/temperature/beacon");

  event
    .custom({
      type: "ftbstuff:temperature_source",
      blockstate: "starbunclemania:source_fluid_block[level=0]",
      display_item: {
        count: 1,
        id: "starbunclemania:source_fluid_bucket",
      },
      efficiency: 8.0,
      temperature: "chilled",
    })
    .id("ftb:stuff/temperature/source");

  event
    .custom({
      type: "ftbstuff:temperature_source",
      blockstate: "minecraft:fire[east=false,north=false,south=false,up=false,west=false]",
      display_item: {
        components: {
          "minecraft:custom_name": '{"translate":"block.minecraft.fire"}',
        },
        count: 1,
        id: "minecraft:flint_and_steel",
      },
      efficiency: 0.75,
      temperature: "hot",
    })
    .id("ftbstuff:temperature_source/fire");

  event
    .custom({
      type: "ftbstuff:temperature_source",
      blockstate: "ftbstuff:creative_high_temperature_source",
      display_item: {
        count: 1,
        id: "ftbstuff:creative_high_temperature_source",
      },
      efficiency: 100.0,
      temperature: "superheated",
    })
    .id("ftbstuff:temperature_source/creative_high");

  event
    .custom({
      type: "ftbstuff:temperature_source",
      blockstate: "ftbstuff:creative_low_temperature_source",
      display_item: {
        count: 1,
        id: "ftbstuff:creative_low_temperature_source",
      },
      efficiency: 100.0,
      temperature: "hot",
    })
    .id("ftbstuff:temperature_source/creative_low");

  event
    .custom({
      type: "ftbstuff:temperature_source",
      blockstate: "ftbstuff:creative_subzero_temperature_source",
      display_item: {
        count: 1,
        id: "ftbstuff:creative_subzero_temperature_source",
      },
      efficiency: 100.0,
      temperature: "chilled",
    })
    .id("ftbstuff:temperature_source/creative_subzero");
});
