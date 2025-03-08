NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.MobDespawnEvent", (event) => {
  global.handleAngler(event);
});
NativeEvents.onEvent("net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent", (event) => {
  try {
    if (event.entity == null) return;
    if (!event.entity.isPlayer()) return;
    event.entity.stages.sync();
    if(event.getFrom() != "ftb:the_rift") return;
    global.refreshRiftRegion(global.getTeam(event.entity));
  } catch (e) {
    console.log(e);
  }
});

NativeEvents.onEvent(
  "net.neoforged.neoforge.event.entity.EntityTravelToDimensionEvent", (event) => {
    global.handleDimensionTeleport(event);
  }
)

NativeEvents.onEvent("net.neoforged.neoforge.event.level.BlockEvent$BlockToolModificationEvent", event => {
  global.handleToolModification(event);
})

const $CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi");

global.handleDimensionTeleport = (event) => {
  const { entity } = event;
  if (entity == null) return;
  if (!entity.isPlayer()) return;
  if (event.getDimension() != "minecraft:the_nether") return;
  let inv = $CuriosApi.getCuriosInventory(entity);
  if (inv == null) return;

  let lantern = inv.get().isEquipped("minecraft:soul_lantern");
  if (!lantern && !entity.isCreative()) {
    try {
      entity.getServer().runCommand(
        `/immersivemessages sendcustom ${entity
          .getDisplayName()
          .getString()} {y:50,size:1.5,sound:2,shake:1,color:"#3a1466",wave:1} 4 ` + "Equip the soul lantern on your belt to pass between worlds!"
      );
      event.setCanceled(true);
    } catch (e) {
      console.log(e);
    }
  }
};
global.handleAngler = (event) => {
  const { entity, level } = event;
  try {
    if (!(entity.getType() == "cataclysm:deepling_angler" || entity.getType() == "cataclysm:lionfish")) return;

    let range = 5;
    let aabb = AABB.of(
      entity.x - range,
      entity.y - range,
      entity.z - range,
      entity.x + range,
      entity.y + range,
      entity.z + range
    );
    level.getEntitiesWithin(aabb).forEach((entity) => {
      if (entity == null) return;
      if (entity.getType() != "minecraft:item" || !entity.isInWater()) return;

      let item = entity.getItem();
      if (item.id == "minecraft:lead") {
        // console.log(`Discarding ${item.id} at ${Math.floor(entity.x)}, ${Math.floor(entity.y)}, ${Math.floor(entity.z)}`);
        entity.discard();
      }
    });
  } catch (e) {
    console.error(e);
  }
};

global.handleToolModification = (event) => {
  try{
    if(event.getHeldItemStack().item.id == "minecraft:wooden_hoe") event.setCanceled(true);
  }catch(e){
    console.error(e);
  }
}