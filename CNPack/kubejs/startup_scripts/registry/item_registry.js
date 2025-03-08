// priority: 100
StartupEvents.registry("item", (event) => {
  // Emergency Rations
  global.food.forEach((t) => {
    event
      .create(`ftb:food_canned_${t[0].toLowerCase()}_open`)
      .displayName(`Emergency Ration (${t[1]} Flavor)`)
      .tooltip(Text.translate("item.ftb.food_canned.tooltip"))
      .food((food) => {
        food.nutrition(4).saturation(0.4);
      });
  });

  //Pebbles
  global.pebbles.forEach((pebble) => {
    event.create("ftb:" + pebble.toLowerCase().replace(" ", "_") + "_pebbles").displayName(pebble + " Pebbles");
  });

  // Random Items
  event.create("ftb:kelp_goo").displayName("Kelp Resin");
  event.create("ftb:stacked_netherite").displayName("Netherite Scrappy Alloy");
  event.create("ftb:barrel_smasher").displayName("Barrel Smasher");
  event.create("ftb:abyssal_pearl").displayName("§5Abyssal Pearl§f").tooltip(Text.translate("item.ftb.abyssal_pearl.tooltip"));
  // Remove as not needed ATM
  // event.create("ftb:kelp_plastic").displayName("Kelp Plastic");

  //GPS
  event
    .create("ftb:gps")
    .displayName("Ship Commlink")
    .tooltip(Text.translate("item.ftb.gps.tooltip"))  
    .maxStackSize(1);

  //GPS
  event
    .create("ftb:gps_broken")
    .displayName("Broken Ship Commlink")
    .tooltip(Text.translate("item.ftb.gps_broken.tooltip"))
    .maxStackSize(1);

  //Magma Droplet
  event.create("ftb:magma_droplet").displayName("Magma Droplet");

  //Abyssal shard
  event.create("ftb:abyssal_fragment").displayName("Abyssal Fragment");

  //rift charge meter
  event
    .create("ftb:rift_charge_meter")
    .displayName("Rift Charge Meter")
    .tooltip(Text.translate("item.ftb.rift_charge_meter.tooltip"))
    .maxStackSize(1)
    .use((level, player, hand) => {
      try {
        global.showRiftCharge(player);
      } catch (e) {
        console.log(e);
      }
      return true;
    });

  event
    .create("ftb:heart_of_the_rift")
    .displayName("Heart of the Rift")
    .tooltip(Text.translate("item.ftb.heart_of_the_rift.tooltip"))
    .maxStackSize(1)
    .rarity("epic");

  event
    .create("ftb:rift_attenuation_crystal")
    .displayName("Rift Attenuation Crystal")
    .tooltip(Text.translate("item.ftb.rift_attenuation_crystal.tooltip"))
    .maxStackSize(4)
    .rarity("uncommon");
  event
    .create("ftb:enhanced_rift_attenuation_crystal")
    .displayName("Enhanced Rift Attenuation Crystal")
    .tooltip(Text.translate("item.ftb.enhanced_rift_attenuation_crystal.tooltip"))
    .maxStackSize(4)
    .rarity("rare");
  event
    .create("ftb:ultimate_rift_attenuation_crystal")
    .displayName("Ultimate Rift Attenuation Crystal")
    .tooltip(Text.translate("item.ftb.ultimate_rift_attenuation_crystal.tooltip"))
    .maxStackSize(4)
    .rarity("epic");
  event.create("ftb:charged_prosperity_seed").displayName("Charged Prosperity Seed");
  event.create("ftb:charged_voidflame_seed").displayName("Charged Voidflame Seed");
  event.create("ftb:empowered_rift_seed").displayName("Empowered Rift Seed");
  event.create("ftb:blank_sherd").displayName("Blank Sherd");

  event.create('ftb:creative_portal_switcher')
    .displayName('Creative Portal Switcher')
    event.create('ftb:rift_charge').displayName("Rift Charge").tooltip([Text.translate("item.ftb.rift_charge.tooltip")]);

  event.create('ftb:rift_weaver_disc').displayName(`In the Depths Below`).jukeboxPlayable("ftb:rift_weaver_boss", true).rarity('epic');
  event.create('ftb:mystic_depths_disc').displayName(`Mystic Depths`).rarity("epic").jukeboxPlayable("ftb:mystic_depths", true);


  event.create("ftb:abyssal_archives_log1").displayName(`Abyssal Archives - Log #001`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log1", true).texture("minecraft:item/music_disc_5")
    event.create("ftb:abyssal_archives_log2").displayName(`Abyssal Archives - Log #002`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log2", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log3").displayName(`Abyssal Archives - Log #003`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log3", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log4").displayName(`Abyssal Archives - Log #004`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log4", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log5").displayName(`Abyssal Archives - Log #005`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log5", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log6").displayName(`Abyssal Archives - Log #006`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log6", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log7").displayName(`Abyssal Archives - Log #007`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log7", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log8").displayName(`Abyssal Archives - Log #008`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log8", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log9").displayName(`Abyssal Archives - Log #009`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log9", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log10").displayName(`Abyssal Archives - Log #010`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log10", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log11").displayName(`Abyssal Archives - Log #011`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log11", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log12").displayName(`Abyssal Archives - Log #012`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log12", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log13").displayName(`Abyssal Archives - Log #013`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log13", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log14").displayName(`Abyssal Archives - Log #014`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log14", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log15").displayName(`Abyssal Archives - Log #015`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log15", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log16").displayName(`Abyssal Archives - Log #016`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log16", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log17").displayName(`Abyssal Archives - Log #017`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log17", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_log18").displayName(`Abyssal Archives - Log #018`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_log18", true).texture("minecraft:item/music_disc_5");
    event.create("ftb:abyssal_archives_thankyou").displayName(`Abyssal Archives - Thank You`).rarity("epic").jukeboxPlayable("ftb:abyssal_archives_thankyou", true).texture("minecraft:item/music_disc_5");
  
});
