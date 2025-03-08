const $EnchantmentHelper = Java.loadClass("net.minecraft.world.item.enchantment.EnchantmentHelper");
const $ItemEnchants = Java.loadClass("net.minecraft.world.item.enchantment.ItemEnchantments");

ServerEvents.recipes(event => {
    // Correctly define the Soulbound book
    const soulbound_book = 'minecraft:enchanted_book[stored_enchantments={levels:{"soulbound:soulbound":1}}]';
    event.shapeless('pneumaticcraft:pneumatic_chestplate[enchantments={levels:{"soulbound:soulbound":1}}]', ['#c:pncchestplate', soulbound_book]).modifyResult('soulbound_transfer').id('ftb:chest_soulbound_transfer');
    event.shapeless('pneumaticcraft:pneumatic_boots[enchantments={levels:{"soulbound:soulbound":1}}]', ['#c:pncboots', soulbound_book]).modifyResult('soulbound_transfer').id('ftb:boots_soulbound_transfer');
    event.shapeless('pneumaticcraft:pneumatic_leggings[enchantments={levels:{"soulbound:soulbound":1}}]', ['#c:pncleggings', soulbound_book]).modifyResult('soulbound_transfer').id('ftb:leggings_soulbound_transfer');
    event.shapeless('pneumaticcraft:pneumatic_helmet[enchantments={levels:{"soulbound:soulbound":1}}]', ['#c:pnchelmet', soulbound_book]).modifyResult('soulbound_transfer').id('ftb:helmet_soulbound_transfer');
    event.shapeless('minecraft:soul_lantern[enchantments={levels:{"soulbound:soulbound":1}}]', ['minecraft:soul_lantern', soulbound_book]).modifyResult('soulbound_transfer').id('ftb:soul_lantern_soulbound_transfer');
});

// Modify the recipe result to add enchantments while keeping all components
ServerEvents.modifyRecipeResult('soulbound_transfer', (event) => {
    
    let grid = event.grid;

    // Find the base armor piece
    let chest = grid.find('pneumaticcraft:pneumatic_chestplate');
    let boots = grid.find('pneumaticcraft:pneumatic_boots');
    let leggings = grid.find('pneumaticcraft:pneumatic_leggings');
    let helmet = grid.find('pneumaticcraft:pneumatic_helmet');
    let soulLantern = grid.find('minecraft:soul_lantern');
    let baseArmor;
    switch (true) {
        case chest && !chest.isEmpty():
            baseArmor = chest;
            break;
        case boots && !boots.isEmpty():
            baseArmor = boots;
            break;
        case leggings && !leggings.isEmpty():
            baseArmor = leggings;
            break;
        case helmet && !helmet.isEmpty():
            baseArmor = helmet;
            break;
        case soulLantern && !soulLantern.isEmpty():
            baseArmor = soulLantern;
            break;
        default:
            return;
    }

    let soulboundBook = grid.find('minecraft:enchanted_book');
    // Get the components patch safely
    let bookPatch = soulboundBook.getComponentsPatch();
    if (!bookPatch) return;
    let storedEnchants = bookPatch.get('minecraft:stored_enchantments');
    if (!storedEnchants) return;
    // console.log(storedEnchants.get().entrySet()[0])
    // if(!storedEnchants.get().entrySet()[0].toString().contains("soulbound:soulbound")) return;

    let result = baseArmor.copy();
    $EnchantmentHelper.setEnchantments(result, storedEnchants.get());
    event.success(result);

});
