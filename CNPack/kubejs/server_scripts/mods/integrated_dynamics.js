ServerEvents.recipes((event) => {

    //Adding a Squeezing Recipe for Menril Leaves.
    event.custom({
        "type": "integrateddynamics:mechanical_squeezer",
        "input_item": {
          "item": "integrateddynamics:menril_leaves"
        },
        "output_fluid": {
          "id": "integrateddynamics:menril_resin",
          "amount": 50
        },
        "duration": 10
    }).id("ftb:menril_leaves_mechanical_squeezing")

    event.custom({
        "type": "integrateddynamics:squeezer",
        "input_item": {
          "item": "integrateddynamics:menril_leaves"
        },
        "output_fluid": {
          "id": "integrateddynamics:menril_resin",
          "amount": 50
        }
    }).id("ftb:menril_leaves_squeezing")

    //QOL Recipes to Convert Variables
    event.shapeless("1x integrateddynamics:variable_transformer_output", ["supplementaries:soap","integrateddynamics:variable_transformer_input"]).id("ftb:integrated_dynamics/output_variable_qol");
    event.shapeless("1x integrateddynamics:variable_transformer_input", ["minecraft:slime_ball","integrateddynamics:variable_transformer_output"]).id("ftb:integrated_dynamics/input_variable_qol");
    event.shapeless("4x integrateddynamics:variable_transformer_output", ["supplementaries:soap","integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input"]).id("ftb:integrated_dynamics/output_variable_qol_2");
    event.shapeless("4x integrateddynamics:variable_transformer_input", ["minecraft:slime_ball","integrateddynamics:variable_transformer_output", "integrateddynamics:variable_transformer_output", "integrateddynamics:variable_transformer_output", "integrateddynamics:variable_transformer_output"]).id("ftb:integrated_dynamics/input_variable_qol_2");
      
  });