"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaThermistor = void 0;
const specifications_1 = require("../specifications");
const sr332_1 = require("../sr332");
exports.TelcordiaThermistor = {
    id: "SR332-THERMISTOR",
    name: "Thermistor",
    mainCategory: sr332_1.TelcordiaMainCategories.THERMISTOR,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-BEAD",
            name: "Bead",
            g_fr: () => 2.1,
            g_std: () => 1.5,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-DISK",
            name: "Disk",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-ROD",
            name: "Rod",
            g_fr: () => 7.7,
            g_std: () => 5.5,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-PPTC",
            name: "PPTC",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications]
};
