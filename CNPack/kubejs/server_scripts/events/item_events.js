ItemEvents.rightClicked('ftb:gps', event => {
  const { player, item, hand, server } = event;
  if (hand != "MAIN_HAND") return;

  let message = new ImmersiveMessage(player);
  if (!player.stages.has("ftbchunks_mapping")) {
    player.stages.add("ftbchunks_mapping");
    message.setMessage("message.ftb_gps.established");
  } else {
    player.stages.remove("ftbchunks_mapping");
    message.setMessage("message.ftb_gps.disconnected");
  }
  message.send();
  player.swing();
  player.addItemCooldown(item.id, 100);

    
});
  