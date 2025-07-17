"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaRelay = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaRelay = {
    id: "SR332-RELAY",
    name: "Relay",
    mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-GENERAL-PURPOSE",
            name: "General Purpose",
            g_fr: () => 1.9,
            g_std: () => 1.9,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-CONTACTOR",
            name: "Contactor",
            g_fr: () => 140,
            g_std: () => 98,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-LATCHING",
            name: "Latching",
            g_fr: () => 3.9,
            g_std: () => 2.3,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-REED",
            name: "Reed",
            g_fr: () => 26,
            g_std: () => 18,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-THERMAL-BIMETAL",
            name: "Thermal/Bimetal",
            g_fr: () => 26,
            g_std: () => 18,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-MERCURY",
            name: "Mercury",
            g_fr: () => 26,
            g_std: () => 18,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-SOLID-STATE",
            name: "Solid State",
            g_fr: () => 21,
            g_std: () => 6.9,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaRelaySpecifications]
};
