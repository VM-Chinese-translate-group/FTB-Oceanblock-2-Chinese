let $Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");
let $CalculatePlayerTurnEvent = Java.loadClass("net.neoforged.neoforge.client.event.CalculatePlayerTurnEvent");
let riftContainerWhitelist = [
  "minecraft:chest",
  "minecraft:barrel"
]
let riftItemBlacklist = [
  "mekanism:cardboard_box",
  'buildinggadgets2:gadget_cut_paste', 
  'enderstorage:ender_pouch', 
  'justdirethings:portalgun', 
  'justdirethings:portalgun_v2', 
  'buildinggadgets2:gadget_building', 
  'buildinggadgets2:gadget_exchanging', 
  'buildinggadgets2:gadget_copy_paste', 
  'buildinggadgets2:gadget_destruction',
  "mekanism:personal_chest",
  'integratedterminals:terminal_storage_portable'
]



const breakableBlocks = [
]
Ingredient.of(/justdirethings:time_crystal.*/).itemIds.toArray().forEach(id => {
  breakableBlocks.push(id)
})
Ingredient.of(/ftbstuff:.*/).itemIds.toArray().forEach(id => {
  breakableBlocks.push(id)
})


let $dc = Java.loadClass("net.minecraft.core.component.DataComponents");
let $lore = Java.loadClass("net.minecraft.world.item.component.ItemLore");
let $container = Java.loadClass("net.minecraft.world.item.component.ItemContainerContents");
let $backpackWrapper = Java.loadClass("net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper.BackpackWrapper");
let $itemStack = Java.loadClass("net.minecraft.world.item.ItemStack");
let $sophisticatedInvProvider = Java.loadClass("net.p3pp3rf1y.sophisticatedbackpacks.util.PlayerInventoryProvider")

BlockEvents.broken(event => {
  const { player, block } = event;
  // Early return if the player is not in the rift
  if(!player) return;
  if(player.isCreative() || player.isSpectator()) return;
  if(player.level.dimension.path != "the_rift") return;

  // Early return if the block is in the whitelist
  if(breakableBlocks.includes(block.id.toString())) return;


  player.tell(Text.translate("message.rift.blockBreak").darkPurple())
  event.cancel();
})

ItemEvents.rightClicked(event => {
  if (event.level.dimension.path != "the_rift" || event.player.isCreative() || event.player.isSpectator())
    return;

  if (riftItemBlacklist.includes(event.getItem().id)) {
    event.player.tell(Text.translate("message.rift.itemUse").darkPurple())
    event.cancel();
  }
})

BlockEvents.rightClicked(event => {
  if (event.level.dimension.path != "the_rift" || event.player.isCreative() || event.player.isSpectator())
    return;
  
  if (event.player.mainHandItem?.id == "mekanism:cardboard_box" || event.player.offHandItem?.id == "mekanism:cardboard_box") {
    event.player.tell(Text.translate("message.rift.cardboardUse").darkPurple())
    event.cancel();
  }

  if (event.getBlock().getEntity() != null && !riftContainerWhitelist.includes(event.getBlock().id.toString())) {
    event.player.tell(Text.translate("message.rift.itemUse").darkPurple())
    event.cancel();
  }
})

PlayerEvents.tick((event) => {
  var isInRift = event.level.dimension.path == "the_rift"
  if (!isInRift) {
    var wasInRift = event.player.persistentData.contains("isInRift") ? event.player.persistentData.getBoolean("isInRift") : false;
    if (wasInRift) {
      clearRiftLootTags(event.player)
      event.player.persistentData.putBoolean("isInRift", false)
    }

    return;
  }

  event.player.persistentData.putBoolean("isInRift", true)

  if (event.player.isCreative() || event.player.isSpectator())
    return;

  let timer =  event.player.persistentData.contains("rift_charge") ? event.player.persistentData.getInt("rift_charge") : 20*5;
  let chance = checkJDTArmor(event.player);
  if (Math.random() * 100 < chance) {
    // console.log("JDT Armor saved the player from losing time in the rift!")
    return;
  }
  event.player.persistentData.putInt("rift_charge", Math.max(0, timer - 1));

  if (timer <= 0)
  {
    dropRiftLoot(event.player)
    kickFromRift(event.player)
    event.player.tell(Text.translate("message.rift.reject").darkPurple())
  }
  else {
    // rift countdown timer
    var timeLeft = timer
    if (timeLeft > 20 * 60)
    {
      if (timeLeft % (20 * 60) == 0) {
        var minutesLeft = (timeLeft / 20) / 60;
        new ImmersiveMessage(event.player, `你还能在裂隙中停留${minutesLeft}分钟！`)
          .setColor("#AA00AA")
          .setDuration(5)
          .send()
      }
    } else if (timeLeft > 20 * 10) {
      if (timeLeft % (20 * 15) == 0) {

        new ImmersiveMessage(event.player, `你还能在裂隙中停留${(timeLeft / 20)}秒！`)
        .setColor("#AA00AA")
        .setDuration(4)
        .send()

          .setColor("#AA00AA")
          .setDuration(4)
          .send();

      }
    } else {
      if (timeLeft > 0 && timeLeft % 20 == 0) {
        event.player.tell(
          Text.translate(
            "message.rift.timeLeft",
            timeLeft / 20,
            timeLeft / 20 == 1
              ? Text.translate("message.rift.timeLeft.second")
              : Text.translate("message.rift.timeLeft.seconds")
          ).darkPurple()
        );      }
    }
  }
});


function kickFromRift(player) {
  global.setRiftTimer(player, 1)
  player.getServer().runCommandSilent(`/execute as ${player.username} run ftbteambases home`)

}

function dropRiftLoot(player) {
  const toRemove = [];

  player.getInventory().items.forEach(item => {
    if (!isRiftLoot(item))
    {
      checkShulker(item, player, true)
      return;
    }

    player.drop(item, true, true)
    item.onDroppedByPlayer(player);
    toRemove.push(item);
  })

  toRemove.forEach((item) => {
    player.getInventory().removeItem(item)
  })

  $sophisticatedInvProvider.get().runOnBackpacks(player, (backpack, inventoryHandlerName, identifier, slot) => {
    checkBackpack(backpack, player, true)
    return false
  })
}


function clearRiftLootTags(player) {
  const toRemove = [];

  player.getInventory().items.forEach(item => {
    if (!isRiftLoot(item))
    {
      checkShulker(item, player, false)
      return;
    }

    toRemove.push(item);
  })

  toRemove.forEach((item) => {
    player.getInventory().removeItem(item)
    player.give(item.getItem().getDefaultInstance().copyWithCount(item.count))
  })

  $sophisticatedInvProvider.get().runOnBackpacks(player, (backpack, inventoryHandlerName, identifier, slot) => {
    checkBackpack(backpack, player, false)
    return false
  })
}

function checkBackpack(item, player, doRemove) {
  if (item.idLocation.namespace != "sophisticatedbackpacks" || !item.idLocation.path.endsWith("backpack"))
    return;

  var wrapper = $backpackWrapper.fromStack(item);
  var inv = wrapper.getInventoryHandler();
  var slots = inv.getSlots();

  for (let i = 0; i < slots; ++i) {
    var stack = inv.getStackInSlot(i);

    if (isRiftLoot(stack))
    {
      if (doRemove) {
        player.drop(stack, true, true)
        inv.setStackInSlot(i, $itemStack.EMPTY);
      } else {
        var newitem = stack.getItem().getDefaultInstance().copyWithCount(stack.count)
        inv.setStackInSlot(i, newitem);
      }
    }
  }
}

function checkShulker(item, player, doRemove) {
  if (item.getComponents().has($dc.CONTAINER))
  {
    var containerContents = item.getComponents().get($dc.CONTAINER);
    var toKeep = [];
    var copy = containerContents.nonEmptyItemsCopy();

    copy.forEach(item => {
      if (!item.getComponents().has($dc.LORE))
      {
        toKeep.push(item);
        return;
      }

      var lore = item.getComponents().get($dc.LORE);
      if (lore.lines().isEmpty())
      {
        toKeep.push(item);
        return;
      }

      var text = lore.lines()[0].getString();
      if (text != "Rift Loot")
      {
        toKeep.push(item);
        return;
      }

      if (doRemove) {
        player.drop(item, true, true)
        item.onDroppedByPlayer(player);
      } else {
        var newitem = item.getItem().getDefaultInstance().copyWithCount(item.count);
        toKeep.push(newitem);
      }
    })

    item.set($dc.CONTAINER, $container.fromItems(toKeep));
  }
}


function isRiftLoot(item) {
  if (!item.getComponents().has($dc.LORE))
    return false;

  const lore = item.getComponents().get($dc.LORE);
  if (lore.lines().isEmpty())
    return false;

  const text = lore.lines()[0].getString();
  return text == "Rift Loot";
}

LootJS.modifiers(event => {
  const $dc = Java.loadClass("net.minecraft.core.component.DataComponents");
  const $lore = Java.loadClass("net.minecraft.world.item.component.ItemLore");

  event.addTableModifier(/.*/).customAction((context, loot) => {
    const attacker = context.getKillerPlayer();
    if (attacker == null)
      return;

    if (attacker.isFakePlayer && attacker.isFakePlayer())
      return;

    if (attacker.level.dimension.path != "the_rift")
      return;

    loot.forEach(item => {
      if (item.id.includes("shulker_box"))
        return;

      item.set($dc.LORE, new $lore(["Rift Loot"]))
    })
  });
})

PlayerEvents.tick(event => {
  const { player, server, level } = event;
  if (level.dimension.path != "the_rift") return;
  if (player.isCreative() || player.isSpectator()) return;

  // Disable Creative Flight in the Rift
  if (player.getAbilities().flying) {
    player.abilities.mayfly = false
    player.abilities.flying = false
    new ImmersiveMessage(player, "禁止在裂隙中飞行！")
      .setColor("#AA0000")
      .setDuration(5)
      .send();
    player.onUpdateAbilities()
  }


  // Check every Second for Jetpacks and Disrupt them
  if(server.getTickCount() % 20 != 0) return;
  let chest = player.getArmorSlots()[2]
  switch(chest.id){
    case 'oritech:jetpack':
    case 'oritech:exo_jetpack':
      handleOriTechJetpacks(chest, player)
      break;
    case 'mekanism:jetpack':
    case 'mekanism:jetpack_armored':
    case 'mekanism:mekasuit_bodyarmor':
      handleMekJetpacks(chest, player)
      break;
  }
})


function handleOriTechJetpacks(chest, player){
  let chestItem = chest.item
  let energyStorage = chestItem.getStorage(chest).getAmount()
  if(energyStorage == 0) return;
  console.log(energyStorage)
  let using = chestItem.tryUseEnergy(chest, energyStorage, player)
  
  if(using){
    new ImmersiveMessage(player, "裂隙扰乱了你喷气背包中的能量！")
    .setColor("#AA0000")
    .send()

      .setColor("#AA0000")
      .send();
  }
}
const $Capabilities = Java.loadClass("mekanism.common.capabilities.Capabilities");
function handleMekJetpacks(chest, player){
  let stored;
  const gasHandlerItem = $Capabilities.CHEMICAL.getCapability(chest);
  if (gasHandlerItem != null && gasHandlerItem.getChemicalTanks() > 0) {
      stored = gasHandlerItem.getChemicalInTank(0);
  }
  if(stored.getAmount() == 0) return;
  stored.setAmount(0);
  new ImmersiveMessage(player, "裂隙扰乱了你喷气背包中的能量！")
  .setColor("#AA0000")
  .send()
}