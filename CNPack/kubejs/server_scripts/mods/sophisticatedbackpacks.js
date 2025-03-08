// priority: 101

const removeSophisticatedCraft = [
  "sophisticatedbackpacks:advanced_deposit_upgrade",
  "sophisticatedbackpacks:advanced_pickup_upgrade",
  "sophisticatedbackpacks:advanced_pump_upgrade",
  "sophisticatedbackpacks:advanced_tool_swapper_upgrade",
  "sophisticatedbackpacks:anvil_upgrade",
  "sophisticatedbackpacks:auto_blasting_upgrade",
  "sophisticatedbackpacks:auto_smelting_upgrade",
  "sophisticatedbackpacks:auto_smoking_upgrade",
  "sophisticatedbackpacks:battery_upgrade",
  "sophisticatedbackpacks:blasting_upgrade",
  "sophisticatedbackpacks:deposit_upgrade",
  "sophisticatedbackpacks:inception_upgrade",
  "sophisticatedbackpacks:pickup_upgrade",
  "sophisticatedbackpacks:pump_upgrade",
  "sophisticatedbackpacks:smelting_upgrade",
  "sophisticatedbackpacks:smoking_upgrade",
  "sophisticatedbackpacks:stack_upgrade_tier_3",
  "sophisticatedbackpacks:stack_upgrade_tier_4",
  "sophisticatedbackpacks:stack_upgrade_omega_tier",
  "sophisticatedbackpacks:tank_upgrade",
  "sophisticatedbackpacks:tool_swapper_upgrade",
  "sophisticatedbackpacks:xp_pump_upgrade",
  "sophisticatedbackpacks:infinity_upgrade",
  "sophisticatedbackpacks:survival_infinity_upgrade",
];

ServerEvents.tags("item", (event) => {
  removeSophisticatedCraft.forEach((id) => {
    //event.removeAllTagsFrom(id);
    event.add("c:hidden_from_recipe_viewers", id);
  });
});

ServerEvents.recipes((event) => {
  removeSophisticatedCraft.forEach((id) => {
    event.remove({ output: id });
  });

  event
    .shapeless("sophisticatedbackpacks:stack_upgrade_tier_2", "sophisticatedbackpacks:stack_upgrade_tier_3")
    .id("ftb:tier_2");
});
