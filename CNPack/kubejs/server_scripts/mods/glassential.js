// priority: 982

let glass_trapdoors = [
  ["glassential:black_glass_trapdoor", "connectedglass:borderless_glass_black"],
  ["glassential:blue_glass_trapdoor", "connectedglass:borderless_glass_blue"],
  ["glassential:brown_glass_trapdoor", "connectedglass:borderless_glass_brown"],
  ["glassential:cyan_glass_trapdoor", "connectedglass:borderless_glass_cyan"],
  ["glassential:gray_glass_trapdoor", "connectedglass:borderless_glass_gray"],
  ["glassential:green_glass_trapdoor", "connectedglass:borderless_glass_green"],
  ["glassential:light_blue_glass_trapdoor", "connectedglass:borderless_glass_light_blue"],
  ["glassential:light_gray_glass_trapdoor", "connectedglass:borderless_glass_light_gray"],
  ["glassential:lime_glass_trapdoor", "connectedglass:borderless_glass_lime"],
  ["glassential:magenta_glass_trapdoor", "connectedglass:borderless_glass_magenta"],
  ["glassential:orange_glass_trapdoor", "connectedglass:borderless_glass_orange"],
  ["glassential:pink_glass_trapdoor", "connectedglass:borderless_glass_pink"],
  ["glassential:purple_glass_trapdoor", "connectedglass:borderless_glass_purple"],
  ["glassential:red_glass_trapdoor", "connectedglass:borderless_glass_red"],
  ["glassential:tinted_glass_trapdoor", "connectedglass:tinted_borderless_glass"],
  ["glassential:white_glass_trapdoor", "connectedglass:borderless_glass_white"],
  ["glassential:yellow_glass_trapdoor", "connectedglass:borderless_glass_yellow"],
];

ServerEvents.recipes((event) => {
  glass_trapdoors.forEach((trapdoor) => {
    if (global.debug) {
      console.log(`Processing trapdoor: ${trapdoor[0]}`);
    }
    event.stonecutting(`${trapdoor[0]}`, `${trapdoor[1]}`);
  });
});
