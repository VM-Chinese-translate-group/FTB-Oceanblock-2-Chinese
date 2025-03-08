const recipesToRemove = [
  "minecraft:iron_ingot_from_blasting_raw_iron",
  "minecraft:iron_ingot_from_smelting_raw_iron",
  "minecraft:copper_ingot_from_blasting_raw_copper",
  "minecraft:copper_ingot_from_smelting_raw_copper",
  "minecraft:gold_ingot_from_blasting_raw_gold",
  "minecraft:gold_ingot_from_smelting_raw_gold",
];

const smeltNuggets = [
  ["copper", "ftbmaterials"],
  ["gold", "minecraft"],
  ["iron", "minecraft"],
  ["lead", "ftbmaterials"],
  ["nickel", "ftbmaterials"],
  ["osmium", "ftbmaterials"],
  ["platinum", "ftbmaterials"],
  ["silver", "ftbmaterials"],
  ["tin", "ftbmaterials"],
  ["uranium", "ftbmaterials"],
  ["aluminum", "ftbmaterials"],
];

const woodSlabsToFull = ["oak", "spruce", "birch", "jungle", "acacia", "dark_oak", "warped", "crimson"];
const stoneSlabsToFull = [
  "cobblestone",
  "stone",
  "mossy_cobblestone",
  "smooth_stone",
  "granite",
  "cobbled_deepslate",
  "polished_deepslate",
  "polished_tuff",
  "diorite",
  "andesite",
  "blackstone",
  "polished_granite",
  "polished_diorite",
  "polished_andesite",
  "smooth_sandstone",
  "smooth_red_sandstone",
  "smooth_quartz",
  "prismarine",
  "dark_prismarine",
  "cut_sandstone",
  "cut_red_sandstone",
];


ServerEvents.recipes((event) => {
  //Alternative Recipe for the Campfire using a Straw Bale
  event
    .shaped(Item.of("minecraft:campfire", 1), [" S ", "SBS", "LLL"], {
      S: "#c:rods/wooden",
      B: "farmersdelight:straw_bale",
      L: "#minecraft:logs",
    })
    .id("ftb:campfire_with_straw");

  //The Flint and Steel Recipe now Requires Cast Iron.
  event.replaceInput({ id: "minecraft:flint_and_steel" }, "minecraft:iron_ingot", "ftbstuff:cast_iron_ingot");

  event.replaceInput({ id: "minecraft:comparator" }, "minecraft:quartz", "minecraft:copper_ingot");

  //trident
  let trident =
    'minecraft:trident[enchantments={levels:{"minecraft:riptide":3}},apothic_attributes:bonus_attribute_modifiers={modifiers:[{amount:4.0d,id:"apothic_attributes:command_generated_-2086828863",operation:"add_value",slot:"mainhand",type:"minecraft:generic.water_movement_efficiency"}]},repair_cost=1]';
  event
    .shaped(Item.of(trident, 1), [" PP", " SP", "S  "], {
      S: "#nautec:aquarine_steel",
      P: "#c:dusts/prismarine",
    })
    .id("ftb:trident");

  event
    .shaped(Item.of("minecraft:heart_of_the_sea", 1), ["WEW", "EPE", "WEW"], {
      E: "mysticalagriculture:water_essence",
      P: "ftb:abyssal_pearl",
      W: "ars_nouveau:water_essence",
    })
    .id("ftb:heart_of_the_sea");

  event
    .shaped(Item.of("minecraft:soul_torch", 4), [" A ", " B ", " C "], {
      A: "#c:coal",
      B: "minecraft:polished_blackstone_brick_wall",
      C: "minecraft:soul_sand",
    })
    .id("ftb:soul_torch");

  event.remove({ output: "#minecraft:boats" });

  recipesToRemove.forEach((recipe) => {
    event.remove({ id: recipe });
  });

  event.smelting("minecraft:slime_ball", "ftb:kelp_goo").id("ftb:smelting/slime_ball");
  event.smelting("ftbstuff:cast_iron_ingot", "mekanism:enriched_iron").id("ftb:smelting/cast_iron_ingot");
  smeltNuggets.forEach((recipe) => {
    event
      .smelting(`${recipe[1]}:${recipe[0]}_nugget`, `ftbmaterials:${recipe[0]}_chunk`)
      .xp(0.25)
      .cookingTime(200)
      .id(`ftb:smelting/nugget/${recipe[0]}`);
  });

  smeltNuggets.forEach((recipe) => {
    event
      .blasting(`${recipe[1]}:${recipe[0]}_nugget`, `ftbmaterials:${recipe[0]}_chunk`)
      .xp(0.25)
      .cookingTime(100)
      .id(`ftb:blasting/nugget/${recipe[0]}`);
  });

  //Adding a Recipe for Chorus Flowers
  event
    .custom({
      type: "mysticalagriculture:infusion",
      input: {
        tag: "minecraft:flowers",
      },
      ingredients: [
        {
          item: "mysticalagriculture:nature_essence",
        },
        {
          item: "minecraft:chorus_fruit",
        },
        {
          item: "mysticalagriculture:nature_essence",
        },
        {
          item: "minecraft:chorus_fruit",
        },
        {
          item: "mysticalagriculture:nature_essence",
        },
        {
          item: "minecraft:chorus_fruit",
        },
        {
          item: "mysticalagriculture:nature_essence",
        },
        {
          item: "minecraft:chorus_fruit",
        },
      ],
      result: {
        id: "minecraft:chorus_flower",
      },
    })
    .id("ftb:minecraft/crops/chorus_flower");

  woodSlabsToFull.forEach((input) => {
    event
      .shaped(Item.of(`minecraft:${input}_planks`), ["W", "W"], {
        W: `minecraft:${input}_slab`,
      })
      .id(`ftb:minecraft/slabs/${input}`);
  });

  stoneSlabsToFull.forEach((input) => {
    event
      .shaped(Item.of(`minecraft:${input}`), ["S", "S"], {
        S: `minecraft:${input}_slab`,
      })
      .id(`ftb:minecraft/slabs/${input}`);
  });

  //Mushroom Conversion using Occultism's Spirit Fire

  let mushroom_list = [
    ["chipped:brown_mushroom", "minecraft:warped_fungus"],
    ["chipped:red_mushroom", "minecraft:crimson_fungus"],
  ];

  mushroom_list.forEach((mushroom) => {
    let mushroom_output_split = mushroom[1].split(":");
    let output_name = mushroom_output_split[1];

    event
      .custom({
        type: "occultism:spirit_fire",
        ingredient: {
          tag: mushroom[0],
        },
        result: {
          count: 1,
          id: mushroom[1],
        },
      })
      .id("ftb:occultism/spirit_fire/mushroom_conversion/" + output_name);
  });

  event.smelting("ftbmaterials:graphite_ingot", "#c:coal").id("ftb:smelting/graphite");

  //Making Pink Petals accessible through cutting Cherry Leaves
  event
    .custom({
      type: "farmersdelight:cutting",
      ingredients: [
        {
          item: "minecraft:cherry_leaves",
        },
      ],
      result: [
        {
          item: {
            count: 4,
            id: "minecraft:pink_petals",
          },
        },
      ],
      tool: {
        tag: "c:tools/knife",
      },
    })
    .id("ftb:farmersdelight/cutting_board/pink_petals");

  //Adding a Recipe for Saddles
  event
    .shaped(Item.of("minecraft:saddle", 1), ["LLL", "S S", "P P"], {
      L: "#c:leathers",
      S: "minecraft:lead",
      P: "ftbmaterials:iron_plate",
    })
    .id("minecraft:saddle");

  event.shaped("supplementaries:rope", ["S", "S", "S"], { S: "minecraft:string" }).id("ftb:rope");
  
});
