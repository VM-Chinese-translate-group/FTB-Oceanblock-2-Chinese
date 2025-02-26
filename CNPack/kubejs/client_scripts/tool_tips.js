const tooltips = [
  {
    item: "ftb:abyssal_fragment",
    text: Text.translate("tooltip.ftb.abyssal_fragment").green(),
  },
  {
    item: "minecraft:soul_lantern",
    text: Text.translate("tooltip.minecraft.soul_lantern").green(),
  },
  {
    item: "brickfurnace:brick_furnace",
    text: Text.translate("tooltip.brickfurnace.brick_furnace").aqua(),
  },
  {
    item: "brickfurnace:brick_blast_furnace",
    text: Text.translate("tooltip.brickfurnace.brick_blast_furnace").aqua(),
  },
  {
    item: "oritech:plastic_sheet",
    text: Text.translate("tooltip.oritech.plastic_sheet").aqua(),
  },
  {
    item: "pneumaticcraft:ingot_iron_compressed",
    text: Text.translate(
      "tooltip.pneumaticcraft.ingot_iron_compressed"
    ).green(),  
  },
  {
    item: "ftbstuff:stone_cobblestone_generator",
    text: Text.translate("tooltip.ftbstuff.stone_cobblestone_generator")
      .gold()
      .append(
        Text.translate(`tooltip.cobblestone_generator.persec.cobble`).gray()
      ),
  },
  {
    item: "ftbstuff:iron_cobblestone_generator",
    text: Text.translate("tooltip.ftbstuff.iron_cobblestone_generator")
      .gold()
      .append(
        Text.translate(`tooltip.cobblestone_generator.persec.cobble`).gray()
      ),
  },
  {
    item: "ftbstuff:gold_cobblestone_generator",
    text: Text.translate("tooltip.ftbstuff.gold_cobblestone_generator")
      .gold()
      .append(
        Text.translate(`tooltip.cobblestone_generator.persec.cobble`).gray()
      ),
  },
  {
    item: "ftbstuff:diamond_cobblestone_generator",
    text: Text.translate("tooltip.ftbstuff.diamond_cobblestone_generator")
      .gold()
      .append(
        Text.translate(`tooltip.cobblestone_generator.persec.cobble`).gray()
      ),
  },
  {
    item: "ftbstuff:netherite_cobblestone_generator",
    text: Text.translate("tooltip.ftbstuff.netherite_cobblestone_generator")
      .gold()
      .append(
        Text.translate(`tooltip.cobblestone_generator.persec.cobble`).gray()
      ),
  },
  {
    item: "oritech:lava_generator_block",
    text: Text.translate("tooltip.oritech.boiler")
      .gold()
  },
  {
    item: "justdirethings:time_crystal_budding_block",
    text: Text.translate(
      "tooltip.justdirethings.time_crystal_budding_block"
    ).gray(),
  },
  {
    item: "justdirethings:time_crystal_budding_block",
    text: Text.translate("tooltip.justdirethings.time_crystal_budding_block.1"),
  },
  {
    item: "justdirethings:time_crystal_budding_block",
    text: Text.translate("tooltip.justdirethings.time_crystal_budding_block.2"),
  },
  {
    item: "justdirethings:time_crystal_budding_block",
    text: Text.translate("tooltip.justdirethings.time_crystal_budding_block.3")
      .green()
      .append(
        Text.translate(
          "tooltip.justdirethings.time_crystal_budding_block.4"
        ).gray()
      )
      .append(
        Text.translate(
          "tooltip.justdirethings.time_crystal_budding_block.5"
        ).red()
      )
      .append(
        Text.translate(
          "tooltip.justdirethings.time_crystal_budding_block.6"
        ).gray()
      )
      .append(
        Text.translate(
          "tooltip.justdirethings.time_crystal_budding_block.7"
        ).blue()
      ),
    shift: true,
  },
  {
    item: "actuallyadditions:coffee_beans",
    text: Text.translate("tooltip.actuallyadditions.coffee_beans").gold(),
  },
  {
    item: "rusticdelight:coffee_beans",
    text: Text.translate("tooltip.rusticdelight.coffee_beans").gold(),
  },
  {
    item: "mob_grinding_utils:golden_egg",
    text: Text.translate("tooltip.mob_grinding_utils.golden_egg").aqua(),
  },
  {
    item: "justdirethings:coal_t1",
    text: Text.translate('tooltip.justdirethings.coal_t1').aqua(),
  },
  {
    item: "justdirethings:coal_t2",
    text: Text.translate('tooltip.justdirethings.coal_t2').aqua(),
  },
  {
    item: "justdirethings:coal_t3",
    text: Text.translate('tooltip.justdirethings.coal_t3').aqua(),
  },
  {
    item: "justdirethings:coal_t4",
    text: Text.translate('tooltip.justdirethings.coal_t4').aqua(),
  },
];

ItemEvents.modifyTooltips((event) => {
  tooltips.forEach((tooltip) => {
    event.add(tooltip.item, tooltip.shift ? { shift: true } : {}, tooltip.text);
  });

  event.modify("mekanism:module_elytra_unit", (tooltip) => {
    tooltip.removeLine(1);
    tooltip.insert(1, Text.translate("tooltip.mekanism.module_elytra_unit"));
  });

  event.modify(`obtrophies:display_trophy`, (b) => b.dynamic(`streamertrophy`));

  event.modify(
    ["mekanism:jetpack", "mekanism:jetpack_armored", "oritech:jetpack", "oritech:exo_jetpack", "ftb:rift_charge"],
    { shift: false },
    (tooltip) => {
      tooltip.insert(1, Text.translate("tooltip.mekanism.jetpack.1").gray());
    }
  );
  event.modify(
    ["mekanism:jetpack", "mekanism:jetpack_armored", "oritech:jetpack", "oritech:exo_jetpack"],
    { shift: true },
    (tooltip) => {
      tooltip.insert(1, Text.translate("tooltip.mekanism.jetpack.2").red());
    }
  );
  event.modify("ftb:rift_charge", { shift: true }, (tooltip) => {
    tooltip.insert(1, Text.translate("tooltip.ftb.rift_charge.1").darkGray());
    tooltip.insert(2, Text.translate("tooltip.ftb_rift_charge.2").darkGray());
  });
});

const trophyTooltips = {
  "minecraft:cactus": "tooltip.streamertrophy.minecraft_cactus",
  "oritech:banana": "tooltip.streamertrophy.oritech_banana",
  "ars_nouveau:creative_spell_book":
    "tooltip.streamertrophy.ars_nouveau_creative_spell_book",
  "mysticalagradditions:inferium_apple":
    "tooltip.streamertrophy.mysticalagradditions_inferium_apple",
  "ftbstuff:purple_barrel": "tooltip.streamertrophy.ftbstuff_purple_barrel",
  "ftb:rift_weaver_disc": "tooltip.streamertrophy.ftb_rift_weaver_disc",
  "ae2:singularity": "tooltip.streamertrophy.ae2_singularity",
  "minecraft:cauldron": "tooltip.streamertrophy.minecraft_cauldron",
  "ars_nouveau:frostaya_pod": "tooltip.streamertrophy.ars_nouveau_frostaya_pod",
  "gag:no_solicitors": "tooltip.streamertrophy.gag_no_solicitors",
  "oritech:tech_button": "tooltip.streamertrophy.oritech_tech_button",
  "sushigocrafting:shrimp": "tooltip.streamertrophy.sushigocrafting_shrimp",
  "nautec:anchor": "tooltip.streamertrophy.nautec_anchor",
  "supplementaries:statue": "tooltip.streamertrophy.supplementaries_statue",
  'actuallyadditions:engineers_goggles': "tooltip.streamertrophy.actuallyadditions_engineers_goggles",
};

ItemEvents.dynamicTooltips("streamertrophy", (event) => {
  const { item } = event;
  Object.entries(trophyTooltips).forEach(([key, value]) => {
    if (item.getComponentsPatch().get("obtrophies:display_trophy_info").get().displayItem().id == key) {
      event.add(Text.translate(value).green());
      event.add(Text.translate("tooltip.streamertrophy").gray());
    }
  });
});

const riftCrystalInformation = [
  "Rift Attenuation Crystals are used to stabilize Players Rifts.",
  " ",
  "Standing near the Empowerer when it finishes its craft will up any nearby Player's Charge.",
  " ",
  "Every Rift Attenuation Crystal has a limited amount of energy and is capped at their respective time limit.",
];
RecipeViewerEvents.addInformation("item", (event) => {
  event.add(
    /ftb:(.*)attenuation_crystal/,
    Text.translate("info.ftb.attenuation_crystal")
  );});
