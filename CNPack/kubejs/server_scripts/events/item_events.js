ItemEvents.rightClicked('ftb:gps', event => {
  const { player, item, hand, server } = event;
  if (hand != "MAIN_HAND") return;

  let message = new ImmersiveMessage(player);
  if (!player.stages.has("ftbchunks_mapping")) {
    player.stages.add("ftbchunks_mapping");
    message.setMessage("GPS Link Established!");
  } else {
    player.stages.remove("ftbchunks_mapping");
    message.setMessage("GPS Link Disconnected!");
  }
  message.send();
  player.swing();
  player.addItemCooldown(item.id, 100);

    
});
  