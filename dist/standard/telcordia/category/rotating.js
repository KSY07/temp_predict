"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaRotating = void 0;
const specifications_1 = require("../specifications");
const sr332_1 = require("../sr332");
// ROTATING DEVICES - Currently no specifications defined in specifications.ts
exports.TelcordiaRotating = {
    id: "SR332-ROTATING",
    name: "Rotating Device",
    mainCategory: sr332_1.TelcordiaMainCategories.ROTATING,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.ROTATING,
            id: "SR332-ROTATING-MOTOR",
            name: "Motor",
            g_fr: () => 5.1, // Placeholder values - update when specifications are available
            g_std: () => 3.6,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.ROTATING,
            id: "SR332-ROTATING-GENERATOR",
            name: "Generator",
            g_fr: () => 7.7,
            g_std: () => 5.5,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications]
};
