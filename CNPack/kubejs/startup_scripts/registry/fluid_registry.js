// const $KubeFluidType = Java.loadClass("dev.latvian.mods.kubejs.fluid.FluidTypeBuilder")
StartupEvents.registry("fluid", (event) => {

    event.create('ftb:molten_cast_iron')
    .displayName("Molten Cast Iron")        
    .stillTexture("ftb:fluid/cast_iron_still")          
    .flowingTexture("ftb:fluid/cast_iron_flow")          
    .noBucket()
    .noBlock()
    .tint(0xafb4bf)
    event.create('ftb:molten_copper_alloy')
    .displayName("Molten Copper Alloy")        
    .stillTexture("ftb:fluid/cast_iron_still")          
    .flowingTexture("ftb:fluid/cast_iron_flow")          
    .noBucket()
    .noBlock()
    .tint(0xcb673a)

});