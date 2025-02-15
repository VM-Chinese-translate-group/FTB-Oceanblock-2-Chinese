ServerEvents.recipes((event) => {
    // Coke Oven Block
    event.replaceInput({ id: "immersiveengineering:crafting/cokebrick" }, "#c:sandstone/blocks", "ftb:magma_droplet");
    event.replaceInput(
      { id: "immersiveengineering:crafting/ersatz_leather" },
      "minecraft:honeycomb",
      "minecraft:honey_bottle"
    );
  
    // Fuel definitions
    const fuels = [
      { fluidTag: "c:t1fuel", burnTime: 180 },
      { fluidTag: "c:t2fuel", burnTime: 225 },
      { fluidTag: "c:t3fuel", burnTime: 300 }
    ];
  
    // Iterate over fuels and add them
    fuels.forEach(fuel => {
      let cleanTag = fuel.fluidTag.split(":").pop();
      event.custom({
        type: "immersiveengineering:generator_fuel",
        burnTime: fuel.burnTime,
        fluidTag: fuel.fluidTag
      }).id("ftb:immersiveengineering/fuelgen/" + cleanTag);
    });

    //More Options to get Coke Dust (honestly, I prefer pepsi...)
    let ie_coke_dust_recipes = [
      ["c:storage_blocks/coal_coke", "immersiveengineering:dust_coke", 9],
      ["c:coal_coke", "immersiveengineering:dust_coke", 1]
    ];
    
    ie_coke_dust_recipes.forEach(coke => {
      let inputName = coke[0].includes(":") ? coke[0].split(":")[1] : coke[0];
      let outputName = coke[1].includes(":") ? coke[1].split(":")[1] : coke[1];
    
      enderIOBasicSagMillingRecipe(event, coke[0], [[coke[1], coke[2]]], `ftb:sag_milling/${inputName}_to_${outputName}`);
      event.custom({
        "type": "oritech:pulverizer",
        "fluidInputAmount": 0,
        "fluidInputVariant": "minecraft:empty",
        "fluidOutputAmount": 0,
        "fluidOutputVariant": "minecraft:empty",
        "ingredients": [
          {
            "tag": coke[0]
          }
        ],
        "results": [
          {
            "count": coke[2],
            "id": coke[1]
          }
        ],
        "time": 200
      }).id(`ftb:oritech/pulverizer/${inputName}_to_${outputName}`);

    });
    

  });
  