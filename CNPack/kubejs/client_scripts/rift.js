ClientEvents.tick(event => {
    let currentScreen = Client.getCurrentScreen()
    if(currentScreen == null) return;
    if(event.player.getLevel().getDimension() != "ftb:the_rift") return;
    if (String(currentScreen).includes("de.mari_023.ae2wtlib")) {
        Client.player.tell(Text.translate("message.ftb.the_rift.mari_023"))
        Client.setCurrentScreen(null)
    }
})