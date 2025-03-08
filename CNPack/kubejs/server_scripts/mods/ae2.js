ServerEvents.recipes((event) => {
  //Replacing Energy Acceptor Recipe to Avoid Recipe Conflicts
  event.replaceInput({ id: "ae2:network/blocks/energy_energy_acceptor" }, "#c:ingots/iron", "#c:plates/iron");

  // Silicon from Any Type of Quartz
  event.smelting("ae2:silicon", "#ae2:all_quartz_dust").cookingTime(200).id("ftb:ae2/smelting/quartz_to_silicon");
  event.blasting("ae2:silicon", "#ae2:all_quartz_dust").cookingTime(200).id("ftb:ae2/blasting/quartz_to_silicon");
  event.replaceInput(
    { id: "mekanism:compat/ae2/certus_quartz_dust_to_silicon" },
    "ae2:certus_quartz_dust",
    "#ae2:all_quartz_dust"
  );

  //Adding Extra methods of obtaining Sky Stone Dust ============================================

  //Also Tweaking Existing Recipes to accept any Sky Stone Block
  let sky_stone_dust_recipe_ids = ["mekanism:compat/ae2/sky_stone_to_dust", "occultism:crushing/sky_stone_dust"];

  sky_stone_dust_recipe_ids.forEach((id) => {
    event.replaceInput({ id: id }, "ae2:sky_stone_block", "#c:sky_stones");
  });

  event
    .custom({
      type: "enderio:sag_milling",
      bonus: "none",
      energy: 2400,
      input: {
        tag: "c:sky_stones",
      },
      outputs: [
        {
          item: {
            count: 1,
            id: "ae2:sky_dust",
          },
        },
      ],
    })
    .id("ftb:enderio/sag_milling/skystone");

  event
    .custom({
      type: "oritech:grinder",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: "c:sky_stones",
        },
      ],
      results: [
        {
          count: 1,
          id: "ae2:sky_dust",
        },
      ],
      time: 200,
    })
    .id("ftb:oritech/grinder/skystone");

  event
    .custom({
      type: "oritech:pulverizer",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          tag: "c:sky_stones",
        },
      ],
      results: [
        {
          count: 1,
          id: "ae2:sky_dust",
        },
      ],
      time: 200,
    })
    .id("ftb:oritech/pulverizer/skystone");

  event
    .custom({
      type: "ae2:inscriber",
      ingredients: {
        middle: {
          item: "mekanism:dirty_netherite_scrap",
        },
      },
      mode: "inscribe",
      result: {
        count: 1,
        id: "minecraft:netherite_scrap",
      },
    })
    .id("ftb:ae2/netherite_scrap");
});
