ServerEvents.recipes((event) => {
  event.remove({ id: /minecraft:.*_from_(smelting|blasting)_.*_ore/ });
});
