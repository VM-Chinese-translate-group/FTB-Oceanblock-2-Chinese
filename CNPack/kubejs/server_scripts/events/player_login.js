  // /give @p eccentrictome:tome[eccentrictome:mod_list={immersiveengineering:[{count:1,id:"immersiveengineering:manual"}],ars_nouveau:[{count:1,id:"ars_nouveau:worn_notebook"}],pneumaticcraft:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"pneumaticcraft:book"}}],laserio:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"laserio:laseriobook"}}],industrialforegoing:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"industrialforegoing:industrial_foregoing"}}],powah:[{count:1,id:"powah:book"}],modularrouters:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"modularrouters:book"}}],buildinggadgets2:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"buildinggadgets2:buildinggadgets2book"}}],actuallyadditions:[{count:1,id:"actuallyadditions:booklet"}],sushigocrafting:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"sushigocrafting:sushigocrafting"}}],bigreactors:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"bigreactors:erguide"}}],justdirethings:[{count:1,id:"patchouli:guide_book",components:{"patchouli:book":"justdirethings:justdirethingsbook"}}]}]

  PlayerEvents.loggedIn((event) => {
    const { player, server } = event;

    if (!player.stages.has("start")){
      player.stages.add("start");
      server.scheduleInTicks(20, (_) => {
        player.setPos(0, 206, 0);
        server.runCommand(`/tp ${player.username} 0 206 0`);
        server.runCommand(`/setworldspawn 0 206 0`)
        server.runCommand(`/ftbteambases setlobbypos 0 206 0`)
      });
    }
    if (!player.stages.has("fix_spawn")){
      player.stages.add("fix_spawn");
      server.runCommand(`/ftbteambases setlobbypos 0 206 0`)
    }

    if (!player.stages.has("starting_items")){
      player.stages.add("starting_items");
      player.give(Item.of('ftbquests:book'));
    }

    if (!player.stages.has("before_cobble") && 
    !player.stages.has("after_cobble") &&
    !player.stages.has("after_nether") &&
    !player.stages.has("after_depth") &&
    !player.stages.has("after_rift")) 
      player.stages.add("before_cobble");


      // Custom Streamer Trophy and Lines
    if(Object.keys(streamers).includes(player.username)){
      if(!player.stages.has("streamer")){
        player.stages.add("streamer");
        streamers[player.username].items.forEach(item => {
          player.give(item);
        });
        streamers[player.username].lines.forEach(line => {
          player.tell(`[§6Feed The Beast§r] ${line}`);
        });
      }
    }

  });



  // Add more streamers here
  // Doesn't seem to require localization support
  const streamers = {
    "Matrixis": {
      items: [ 'obtrophies:display_trophy[obtrophies:display_trophy_info={display:"oritech:banana"}]'],
      lines: ["A special Trophy for our dearest Streaming Partner!", "With love from the FTB Team"],
    },
    "MCTCReese": {
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"minecraft:cactus"}]'],
      lines: ["A special Trophy for our dearest Streaming Partner!", "With love from the FTB Team"],
    },
    "AlfredGG": {
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"gag:no_solicitors"}]'],
      lines: ["A special Trophy for our most favorite Questbook Designer!", "With love from the FTB Team (and even more from Tazz)"],
    },
    "TheonlyTazz":{
      items: ['64x minecraft:cactus'],
      lines: ["TEST YOUR FLIPPING SCRIPTS U BAFOON"]
    },
    "ChosenArchitect":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"ars_nouveau:creative_spell_book"}]'],
      lines: ["A special Trophy for our dearest Streaming Partner!", "With love from the FTB Team"],
    },
    "ectorvynk":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"mysticalagradditions:inferium_apple"}]'],
      lines: ["A special Trophy for our dearest Streaming Partner!", "With love from the FTB Team"],
    },
    "Lashmak":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"ftbstuff:purple_barrel"}]'],
      lines: ["Lord of Darkness!", "A Special Trophy just for you!", "With love from the FTB Team"],
    },
    "Threefold":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"ftb:rift_weaver_disc"}]'],
      lines: ["A special Trophy just for you!", "With love from Tazz"],
    },
    "SystemCollapse":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"ae2:singularity"}]'],
      lines: ["A special Trophy just for you!", "With love from the FTB Team"],
    },
    "Vlofast":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"minecraft:cauldron"}]'],
      lines: ["A special Trophy just for you!", "With love from the FTB Team"],
    },
    "Joprebond":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"ars_nouveau:frostaya_pod"}]'],
      lines: ["A special Trophy just for you!", "With love from the FTB Team"],
    },
    "reninsane":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"minecraft:cake"}]'],
      lines: ["A special Trophy just for you!", "With love from the FTB Team"],
    },
    "MrButton_": {
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"oritech:tech_button"}]'],
      lines: ["A special Button (Trophy) just for you!", "With love from the FTB Team"],
    },
    "generikb": {
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"sushigocrafting:shrimp"}]'],
      lines: ["A special Trophy just for you!", "With love from Tazz"],
    },
    "direwolf20":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"justdirethings:celestigem_paxel"}]'],
      lines: ["A special Trophy just for you!", "With love from the FTB Team"],
    },
    "ellelapsus":{
      items: ['obtrophies:display_trophy[obtrophies:display_trophy_info={display:"bhc:red_heart"}]'],
      lines: ["A special Trophy just for you!", "With love <3"],
    },
    "MiyoshiEira":{
      items: ['obtrophies:trophy[obtrophies:trophy_info={entity:"minecraft:wolf"},rarity="uncommon"]'],
      lines: ["A special Trophy just for you!", "永遠の友情に乾杯!"],
    },
    "AlpDerps":{
      items: ['minecraft:cake'],
      lines: ["Here, have a Cake!", "With love from Tazz"],
    }
  }