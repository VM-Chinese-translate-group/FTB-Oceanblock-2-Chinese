ItemEvents.rightClicked('ftb:gps', event => {
  const { player, item, hand, server } = event;
  if (hand != "MAIN_HAND") return;

  let message = new ImmersiveMessage(player);
  if (!player.stages.has("ftbchunks_mapping")) {
    player.stages.add("ftbchunks_mapping");
    message.setMessage("GPS链接已建立！");
  } else {
    player.stages.remove("ftbchunks_mapping");
    message.setMessage("GPS链接已断开！");
  }
  message.send();
  player.swing();
  player.addItemCooldown(item.id, 100);

    
});
  