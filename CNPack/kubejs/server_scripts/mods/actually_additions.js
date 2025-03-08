ServerEvents.recipes((event) => {
  //Unifying Rice
  event.replaceInput({ id: "actuallyadditions:rice_dough" }, "actuallyadditions:rice", "#c:crops/rice");
  event.replaceInput({ id: "actuallyadditions:rice_paper" }, "actuallyadditions:rice", "#c:crops/rice");

  event.recipes.actuallyadditions
    .laser("ftb:charged_prosperity_seed", "mysticalagriculture:prosperity_seed_base")
    .id("ftb:charged_prosperity_seed");

  // ftb:charged_voidflame_seed

  //ftb:empowered_rift_seed  // ITEMS ARE PLACEHOLDERS!
  event.recipes.actuallyadditions
    .empowering(
      "ftb:empowered_rift_seed",
      "ftb:charged_voidflame_seed",
      [
        "extendedcrafting:ender_star",
        "extendedcrafting:ender_star",
        "extendedcrafting:ender_star",
        "extendedcrafting:ender_star",
      ],
      250000,
      Color.RED.argb,
      60
    )
    .id("ftb:empowered_rift_seed");

    event.recipes.actuallyadditions
    .empowering(
      "ftb:heart_of_the_rift",
      "ftb:ultimate_rift_attenuation_crystal",
      [
        "ftb:abyssal_pearl",
        "mekanism:teleportation_core",
        "oritech:prometheum_ingot",
        "extendedcrafting:enhanced_ender_ingot",
      ],
      500000,
      Color.DARK_PURPLE.argb,
      60
    )
    .id("ftb:heart_of_the_rift");

    event
    .custom({
      type: "actuallyadditions:empowering",
      base: {
        item: "ftbstuff:diamond_cobblestone_generator",
      },
      color: 163162163,
      energy: 50000,
      modifiers: [
        {
          tag: "c:ingots/netherite",
        },
        {
          item: "justdirethings:celestigem",
        },
        {
          tag: "chipped:deepslate",
        },
        {
          tag: "chipped:deepslate",
        },
      ],
      result: {
        count: 1,
        id: "ftbstuff:netherite_cobblestone_generator",
      },
      time: 500,
    })
    .id("ftbstuff:cobble_gen_tier_netherite");

    event.recipes.actuallyadditions
    .empowering(
      Item.of("ftb:rift_attenuation_crystal",4),
      "ftb:abyssal_pearl",
      [
        "oritech:heisenberg_compensator",
        "oritech:prometheum_ingot",
        "minecraft:echo_shard",
        "mekanism:teleportation_core",
      ],
      250000,
      Color.DARK_GREEN.argb,
      60
    )
    .id("ftb:rift/empower1");

    event.recipes.actuallyadditions
    .empowering(
      Item.of("ftb:enhanced_rift_attenuation_crystal",4),
      "ftb:rift_attenuation_crystal",
      [
        "enderio:ender_crystal",
        "justdirethings:time_crystal",
        "occultism:afrit_essence",
        "rftoolsbase:infused_diamond",
      ],
      500000,
      Color.GREEN.argb,
      60
    )
    .id("ftb:rift/empower2");

    event.recipes.actuallyadditions
    .empowering(
      Item.of("ftb:ultimate_rift_attenuation_crystal",4),
      "ftb:enhanced_rift_attenuation_crystal",
      [
        "oritech:prometheum_ingot",
        "justdirethings:time_crystal_block",
        "extendedcrafting:enhanced_ender_ingot",
        "enderio:clayed_glowstone",
      ],
      2500000,
      Color.AQUA.argb,
      60
    )
    .id("ftb:rift/empower3");

    event.recipes.actuallyadditions
    .empowering(
      "ftb:rift_charge",
      "ftb:ultimate_rift_attenuation_crystal",
      [
        "minecraft:ender_pearl",
        "minecraft:ender_pearl",
        "minecraft:ender_pearl",
        "minecraft:ender_pearl",
      ],
      500000,
      Color.BLACK.argb,
      10
    )
    .id("ftb:rift/empower4");

  //AA Coffee can now be Roasted
  event.campfireCooking("rusticdelight:roasted_coffee_beans", "actuallyadditions:coffee_beans", 0.0, 600).id("ftb:cooking/aa_coffee_beans");
  event.smoking("rusticdelight:roasted_coffee_beans", "actuallyadditions:coffee_beans").xp(0.35).id("ftb:smoking/aa_coffee_beans");
  event.smelting("rusticdelight:roasted_coffee_beans", "actuallyadditions:coffee_beans").xp(0.35).id("ftb:smelting/aa_coffee_beans");

});
