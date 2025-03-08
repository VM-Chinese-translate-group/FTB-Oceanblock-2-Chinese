const powerTiers = ["basic", "hardened", "blazing", "niotic", "spirited", "nitro"];

ServerEvents.recipes((event) => {
  powerTiers.forEach((tier) => {
    event.replaceInput(
      { id: `powah:crafting/ender_gate_${tier}` },
      `powah:energy_cable_${tier}`,
      `powah:capacitor_${tier}`
    );
  });

  event.replaceInput(
    { id: `powah:crafting/ender_gate_starter` },
    `powah:energy_cable_starter`,
    `powah:capacitor_basic_tiny`
  );
});
