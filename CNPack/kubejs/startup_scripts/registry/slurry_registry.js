const $Slurry = Java.loadClass("mekanism.api.chemical.Chemical");
const $SlurryBuilder = Java.loadClass("mekanism.api.chemical.ChemicalBuilder");

/**
 * @type {[string, color]}
 */
const missingSlurry = [
  ["nickel", 0xbcb040],
  ["platinum", 0xcacfd8],
  ["silver", 0xe9e7de],
  ["aluminum", 0xbacfdf],
];

StartupEvents.registry("mekanism:chemical", (event) => {
  missingSlurry.forEach(([ore, color]) => {
    event.createCustom(
      `ftb:${ore}_dirty`,
      () => new $Slurry($SlurryBuilder.cleanSlurry().tint(color).ore(`kubejs:ore/${ore}`))
    );
    event.createCustom(
      `ftb:${ore}_clean`,
      () => new $Slurry($SlurryBuilder.cleanSlurry().tint(color).ore(`kubejs:ore/${ore}`))
    );
  });
});
