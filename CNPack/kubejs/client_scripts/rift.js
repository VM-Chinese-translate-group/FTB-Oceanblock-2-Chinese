ClientEvents.tick(event => {
    let currentScreen = Client.getCurrentScreen();
    if (currentScreen == null) return;
    if (event.player.getLevel().getDimension() != "ftb:the_rift") return;

    let blockedScreens = [
        "de.mari_023.ae2wtlib",
        "enderstorage:ender_item_storage",
        "ars_nouveau:storage_lectern",
        "ae2:basic_cell_chest",
        "ae2wtlib",
        "ae2"

    ];

    if (blockedScreens.some(screen => String(currentScreen).includes(screen))) {
        Client.player.tell(Text.translate("message.ftb.the_rift.blocked_screen"));
        Client.setCurrentScreen(null);
    }
});
