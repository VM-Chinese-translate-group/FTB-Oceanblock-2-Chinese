// priority: 100002

function createEnchantedBookString(enchantment, level) {
  return `minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:${enchantment}":${level}}}]`;
}

function createToolString(toolName, enchantments) {
  const enchantmentString = Object.entries(enchantments)
    .map(([enchantment, level]) => `"minecraft:${enchantment}":${level}`)
    .join(", ");

  return `${toolName}[enchantments={levels:{${enchantmentString}}}]`;
}

function capitalizeAndReplaceUnderscores(input) {
  return input
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ImmersiveMessage(player, message){
  return global.ImmersiveMessage(player, message);
}




function checkJDTArmor(player){
  let [boots, leggings, chest, head] = player.getArmorSlots()

  const armors = {
    "ferricore": 5, 
    "blazegold": 10,
    "celestigem": 25, 
    "eclipsealloy": 50
  }

  for (const [key, value] of Object.entries(armors)) {
    if (
      boots.id.includes(key) &&
      leggings.id.includes(key) &&
      chest.id.includes(key) &&
      head.id.includes(key)
    ) {
      return value;
    }
  }
  return 0;
}
