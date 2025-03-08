const addMekFurnaceRecipes = [
  ["c:raw_materials/iron", ["minecraft:iron_ingot", 1]],
  ["c:raw_materials/gold", ["minecraft:gold_ingot", 1]],
  ["c:raw_materials/copper", ["minecraft:copper_ingot", 1]],
  ["c:raw_materials/aluminum", ["ftbmaterials:aluminum_ingot", 1]],
  ["c:raw_materials/lead", ["ftbmaterials:lead_ingot", 1]],
  ["c:raw_materials/nickel", ["ftbmaterials:nickel_ingot", 1]],
  ["c:raw_materials/osmium", ["ftbmaterials:osmium_ingot", 1]],
  ["c:raw_materials/silver", ["ftbmaterials:silver_ingot", 1]],
  ["c:raw_materials/uranium", ["ftbmaterials:uranium_ingot", 1]],
  ["c:raw_materials/platinum", ["ftbmaterials:platinum_ingot", 1]],
  ["c:raw_materials/tin", ["ftbmaterials:tin_ingot", 1]],
];

ServerEvents.recipes((event) => {
  addMekFurnaceRecipes.forEach((recipe) => {
    const safeId = recipe[0].replace("c:raw_materials/", "").replace(/[:/]/g, "_");

    mekanismBasicSmeltingRecipe(event, recipe[0], recipe[1][0], recipe[1][1], `ftb:mekanism/smelt/${safeId}`);
  });

  global.materials.forEach((material) => {
    let materialId = material[0];
    const itemID = materialId.includes(":") ? materialId : `minecraft:${materialId}`;
    let materialName = materialId.includes(":") ? materialId.split(":")[1] : materialId;

    if (material === "mekanism:fluorite_gem") {
      materialId = "mekanism:fluorite";
      materialName = "fluorite";
    }

    mekanismBasicSmeltingRecipe(
      event,
      `c:clusters/${materialName}`,
      itemID,
      material[1],
      `ftb:mekanism/smelt/cluster/${materialName}`
    );
  });

  event.replaceOutput({ id: "mekanism:enriching/hdpe_sheet" }, "mekanism:hdpe_sheet", "oritech:plastic_sheet");

  //Replacing Plutonium and Polonium Pellets
  let radioactive_recipe_ids = [
    "mekanism:qio_drive_time_dilating",
    "mekanism:qio_drive_hyper_dense",
    "mekanism:qio_drive_supermassive",
    "mekanism:module_frost_walker_unit",
    "mekanism:module_jetpack_unit",
    "mekanism:module_elytra_unit",
    "mekanism:module_nutritional_injection_unit",
    "mekanism:module_inhalation_purification_unit",
    "mekanism:modification_station",
    "mekanism:module_silk_touch_unit",
    "mekanism:module_hydrostatic_repulsor_unit",
    "mekanism:module_fortune_unit",
    "mekanism:module_blasting_unit",
    "mekanism:mekasuit_pants",
    "mekanism:module_vision_enhancement_unit",
    "mekanism:mekasuit_boots",
    "mekanism:module_vein_mining_unit",
    "mekanism:module_soul_surfer_unit",
    "mekanism:module_hydraulic_propulsion_unit",
    "mekanism:module_locomotive_boosting_unit",
    "mekanism:meka_tool",
    "mekanism:module_gyroscopic_stabilization_unit",
    "mekanism:module_motorized_servo_unit",
    "mekanism:module_magnetic_attraction_unit",
    "mekanism:mekasuit_bodyarmor",
    "mekanism:mekasuit_helmet",
    "mekanism:portable_qio_dashboard",
    "mekanism:module_charge_distribution_unit"
  ];

  radioactive_recipe_ids.forEach(recipe => {
    event.replaceInput({ id: recipe, input: "#c:pellets/polonium"}, "#c:pellets/polonium", "oritech:enderic_compound");
    event.replaceInput({ id: recipe , input: "#c:pellets/plutonium"}, "#c:pellets/plutonium", "actuallyadditions:diamatine_crystal");
  });

  let hdpe_sheet_recipes = [
    "mekanism:module_color_modulation_unit",
    "mekanism:sps_casing",
    "mekanism:module_attack_amplification_unit",
    "mekanism:module_radiation_shielding_unit",
    "mekanism:mekasuit_bodyarmor",
    "mekanism:modification_station",
    "mekanism:solar_neutron_activator",
    "mekanism:module_laser_dissipation_unit",
    "mekanism:mekasuit_helmet",
    "mekanism:module_electrolytic_breathing_unit",
    "mekanism:module_base",
    "mekanism:module_geiger_unit",
    "mekanism:mekasuit_pants",
    "mekanism:module_shearing_unit",
    "mekanism:module_energy_unit",
    "mekanism:module_excavation_escalation_unit",
    "mekanism:mekasuit_boots",
    "mekanism:module_farming_unit",
    "mekanism:meka_tool",
    "mekanism:module_dosimeter_unit",
    "mekanism_lasers:ore_generator",
  ];

  hdpe_sheet_recipes.forEach((recipe) => {
    event.replaceInput({ id: recipe }, "mekanism:hdpe_sheet", "oritech:plastic_sheet");
  });

  //Also Replacing the HDPE Elytra in the Elytra Module
  event.replaceInput({ id: "mekanism:module_elytra_unit" }, "mekanism:hdpe_elytra", "minecraft:elytra");

  event.replaceInput({id: "mekanism:metallurgic_infuser"}, "ftbmaterials:osmium_ingot", "ftbmaterials:steel_ingot")
  event.replaceInput({id: "mekanism:tier_installer/basic"}, "#minecraft:planks", "oritech:machine_core_4")
  event.replaceInput({id: "mekanism:tier_installer/advanced"}, "#minecraft:planks", "oritech:machine_core_5")
  event.replaceInput({id: "mekanism:tier_installer/elite"}, "#minecraft:planks", "oritech:machine_core_6")
  event.replaceInput({id: "mekanism:tier_installer/ultimate"}, "#minecraft:planks", "oritech:machine_core_7")

  event.forEachRecipe({id: new RegExp(`mekanism:factory\/(.*)\/(.*)`)}, recipe => {
    let result = recipe.getOriginalRecipeResult();
    let input = recipe.getOriginalRecipe().getIngredients()[4];
    let tier = recipe.getId().split("/")[1];
    event.shapeless(result, [input.getItemIds()[0], `mekanism:${tier}_tier_installer`]).id(recipe.getId());
  });

  //Adding Meka Processing Compat to Clusters that for some reason don't have.
  
  // Enriching ====================================================================================

  let non_native_compat_clusters_enriching = [
    ["c:clusters/lead", "ftbmaterials:lead_dust"],
    ["c:clusters/tin", "ftbmaterials:tin_dust"],
    ["c:clusters/osmium", "ftbmaterials:osmium_dust"],
    ["c:clusters/uranium", "ftbmaterials:uranium_dust"],
  ];

  non_native_compat_clusters_enriching.forEach(cluster => {
    event.custom({"type":"mekanism:enriching","input":{"count":3,"tag": cluster[0] },"output":{"count":4,"id": cluster[1] }}).id("ftb:mekanism/enriching/" + cluster[0].split(":")[1]);
  });
  
  // Combining to Ore =============================================================================

  let non_native_compat_clusters_combining = [
    ["c:clusters/lead", "ftbmaterials:lead_deepslate_ore"],
    ["c:clusters/tin", "ftbmaterials:tin_deepslate_ore"],
    ["c:clusters/osmium", "ftbmaterials:osmium_deepslate_ore"],
    ["c:clusters/uranium", "ftbmaterials:uranium_deepslate_ore"],
    
    ["c:clusters/lead", "ftbmaterials:lead_stone_ore"],
    ["c:clusters/tin", "ftbmaterials:tin_stone_ore"],
    ["c:clusters/osmium", "ftbmaterials:osmium_stone_ore"],
    ["c:clusters/uranium", "ftbmaterials:uranium_stone_ore"],
  ];
  
  non_native_compat_clusters_combining.forEach(cluster => {
    if (cluster[1].includes("stone")) {
      event.custom({"type":"mekanism:combining","extra_input":{"count":1,"tag":"c:cobblestones/normal"},"main_input":{"count":8,"tag": cluster[0] },"output":{"count":1,"id": cluster[1] }}).id("ftb:mekanism/combining/stone/" + cluster[0].split(":")[1]);
    } else {
      event.custom({"type":"mekanism:combining","extra_input":{"count":1,"tag":"c:cobblestones/deepslate"},"main_input":{"count":8,"tag": cluster[0] },"output":{"count":1,"id": cluster[1] }}).id("ftb:mekanism/combining/deepslate/" + cluster[0].split(":")[1]);
    }
  });
  
  // Dissolution ==================================================================================

  let non_native_compat_clusters_dissolution = [
    ["c:clusters/lead", "mekanism:dirty_lead"],
    ["c:clusters/tin", "mekanism:dirty_tin"],
    ["c:clusters/osmium", "mekanism:dirty_osmium"],
    ["c:clusters/uranium", "mekanism:dirty_uranium"],
  ];

  non_native_compat_clusters_dissolution.forEach(cluster => {
    event.custom({"type":"mekanism:dissolution","chemical_input":{"amount":1,"chemical":"mekanism:sulfuric_acid"},"item_input":{"count":3,"tag": cluster[0] },"output":{"amount":2000,"id": cluster[1] },"per_tick_usage":true}).id("ftb:mekanism/dissolution/dirty/" + cluster[0].split(":")[1]);
  });
  
  // Injection ====================================================================================

  let non_native_compat_clusters_injection = [
    ["c:clusters/lead", "ftbmaterials:lead_shard"],
    ["c:clusters/tin", "ftbmaterials:tin_shard"],
    ["c:clusters/osmium", "ftbmaterials:osmium_shard"],
    ["c:clusters/uranium", "ftbmaterials:uranium_shard"],
  ];

  non_native_compat_clusters_injection.forEach(cluster => {
    event.custom({"type":"mekanism:injecting","chemical_input":{"amount":1,"chemical":"mekanism:hydrogen_chloride"},"item_input":{"count":3,"tag": cluster[0] },"output":{"count":8,"id": cluster[1] },"per_tick_usage":true}).id("ftb:mekanism/injection/" + cluster[0].split(":")[1]);
  });
  
  // Purification =================================================================================

  let non_native_compat_clusters_purification = [
    ["c:clusters/lead", "ftbmaterials:lead_clump"],
    ["c:clusters/tin", "ftbmaterials:tin_clump"],
    ["c:clusters/osmium", "ftbmaterials:osmium_clump"],
    ["c:clusters/uranium", "ftbmaterials:uranium_clump"],
  ];

  non_native_compat_clusters_purification.forEach(cluster => {
    event.custom({"type":"mekanism:purifying","chemical_input":{"amount":1,"chemical":"mekanism:oxygen"},"item_input":{"count":1,"tag": cluster[0] },"output":{"count":2,"id": cluster[1] },"per_tick_usage":true}).id("ftb:mekanism/injection/" + cluster[0].split(":")[1]);
  });

  // ==============================================================================================

});
