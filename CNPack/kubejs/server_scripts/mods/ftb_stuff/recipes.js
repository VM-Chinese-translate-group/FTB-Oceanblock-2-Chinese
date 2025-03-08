// priority: 200

ServerEvents.recipes((event) => {
  // Cobblestone Gens
  event
    .shaped(Item.of("ftbstuff:stone_cobblestone_generator", 1), ["CCC", "LGW", "CCC"], {
      C: "ftbstuff:compressed_cobblestone",
      L: "#c:buckets/lava",
      W: "#c:buckets/water",
      G: "#c:glass_blocks",
    })
    .id("ftbstuff:cobble_gen_tier_cobblestone");

  event
    .shaped(Item.of("ftbstuff:iron_cobblestone_generator", 1), [" I ", "IGI", " I "], {
      I: "ftbstuff:cast_iron_ingot",
      G: "ftbstuff:stone_cobblestone_generator",
    })
    .id("ftbstuff:cobble_gen_tier_iron");

  event
    .custom({
      type: "ftbstuff:jar",
      input_items: [
        { item: "ftbstuff:iron_cobblestone_generator", count: 1 },
        { item: "minecraft:gold_ingot", count: 4 },
      ],
      output_items: [{ id: "ftbstuff:gold_cobblestone_generator", count: 1 }],
      temperature: "hot",
      time: 200,
    })
    .id("ftbstuff:cobble_gen_tier_gold");

  event
    .custom({
      energy: 50000,
      experience: 0.1,
      is_smelting: false,
      inputs: [
        {
          item: "ftbstuff:gold_cobblestone_generator",
          count: 1,
        },
        {
          item: "minecraft:diamond",
          count: 1,
        },
      ],
      output: {
        id: "ftbstuff:diamond_cobblestone_generator",
        count: 1,
      },
      type: "enderio:alloy_smelting",
    })
    .id("ftbstuff:cobble_gen_tier_diamond");

  event
    .custom({
      type: "oritech:foundry",
      fluidInputAmount: 0,
      fluidInputVariant: "minecraft:empty",
      fluidOutputAmount: 0,
      fluidOutputVariant: "minecraft:empty",
      ingredients: [
        {
          count: 1,
          item: "ftbstuff:gold_cobblestone_generator",
        },
        {
          count: 1,
          tag: "c:gems/diamond",
        },
      ],
      results: [
        {
          count: 1,
          id: "ftbstuff:diamond_cobblestone_generator",
        },
      ],
      time: 500,
    })
    .id("ftb:foundry_alloying/cobblegen");

  // Water Pump
  event.remove({ id: "ftbstuff:pump" });
  event
    .shaped(Item.of("ftbstuff:pump", 1), ["CCC", "CGC", "PPP"], {
      C: "ftbstuff:cast_iron_ingot",
      G: "#c:gears/wood",
      P: "#minecraft:planks",
    })
    .id("ftb:cast_iron_blast_furnace");

  event
    .shaped("ftbstuff:iron_mesh", ["SIS", "IMI", "SIS"], {
      S: "minecraft:string",
      I: "minecraft:iron_ingot",
      M: "ftbstuff:cloth_mesh",
    })
    .id("ftbstuff:iron_mesh");
  event
    .shaped("ftbstuff:gold_mesh", ["SIS", "IMI", "SIS"], {
      S: "minecraft:string",
      I: "minecraft:gold_ingot",
      M: "ftbstuff:iron_mesh",
    })
    .id("ftbstuff:gold_mesh");
  event
    .shaped("ftbstuff:diamond_mesh", ["SIS", "IMI", "SIS"], {
      S: "#c:rods/steel",
      I: "minecraft:diamond",
      M: "ftbstuff:gold_mesh",
    })
    .id("ftbstuff:diamond_mesh");
  event
    .shaped("ftbstuff:blazing_mesh", ["SIS", "IMI", "SIS"], {
      S: "ars_nouveau:magebloom_fiber",
      I: "minecraft:blaze_rod",
      M: "ftbstuff:diamond_mesh",
    })
    .id("ftbstuff:blazing_mesh");

  //Repaired comlink
  event
    .shaped(Item.of("ftb:gps", 1), ["AB", "CC"], {
      A: "ftb:gps_broken",
      B: "#c:slime_balls",
      C: "#c:wires",
    })
    .id("ftb:repair_gps");

  //smelt wires to nuggets
  const smeltWires = [["aluminum"], ["copper"], ["electrum"], ["lead"], ["steel"]];

  smeltWires.forEach((recipe) => {
    event.smelting(`ftbmaterials:${recipe[0]}_nugget`, `#c:wires/${recipe[0]}`).id(`ftb:smelting/wires/${recipe[0]}`);
  });
});
