"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../src/standard/telcordia/category");
const sr332_1 = require("../../src/standard/telcordia/sr332");
console.log('=== Available Telcordia Categories ===\n');
console.log(`Total categories available: ${category_1.TelcordiaCategories.length}\n`);
category_1.TelcordiaCategories.forEach((category, index) => {
    console.log(`${index + 1}. Category ID: ${category.id}`);
    console.log(`   Name: ${category.name}`);
    console.log(`   Main Category: ${sr332_1.TelcordiaMainCategories[category.mainCategory]} (${category.mainCategory})`);
    if (category.specificationList && category.specificationList.length > 0) {
        console.log(`   Specifications (${category.specificationList.length}):`);
        category.specificationList.forEach((spec, specIndex) => {
            console.log(`     ${specIndex + 1}. ${spec.name} (${spec.key}) - ${spec.type}${spec.unit ? ` [${spec.unit}]` : ''}`);
        });
    }
    if (category.subCategories && category.subCategories.length > 0) {
        console.log(`   Sub-categories (${category.subCategories.length}):`);
        category.subCategories.forEach((subCat, subIndex) => {
            console.log(`     ${subIndex + 1}. ${subCat.name} (${subCat.id})`);
        });
    }
    console.log('');
});
console.log('\n=== Category IDs for Easy Reference ===');
category_1.TelcordiaCategories.forEach((category, index) => {
    console.log(`${index + 1}. "${category.id}" - ${category.name}`);
});
