"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaResistor = exports.TelcordiaResistorNetwork = exports.TelcordiaVariableResistor = exports.TelcordiaFixedResistor = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaFixedResistor = {
    id: "SR332-RESISTOR-FIXED",
    name: "FIXED",
    mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-COMPOSITION",
            name: "Composition",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.18 : 2.1; // ≤ 1 MEGOHM: 0.18, > 1 MEGOHM: 2.1
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.13 : 1.5; // ≤ 1 MEGOHM: 0.13, > 1 MEGOHM: 1.5
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._6,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.D,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-FILM",
            name: "Film (Carbon, Oxide, Metal)",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.08 : 0.24; // ≤ 1 MEGOHM: 0.08, > 1 MEGOHM: 0.24
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.02 : 0.07; // ≤ 1 MEGOHM: 0.02, > 1 MEGOHM: 0.07
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-FILM_POWER",
            name: "Film, Power (> 1W)",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.30 : 0.71; // ≤ 1 MEGOHM: 0.30, > 1 MEGOHM: 0.71
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.22 : 0.49; // ≤ 1 MEGOHM: 0.22, > 1 MEGOHM: 0.49
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._1,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-WIREWOUND_ACCURATE",
            name: "Wirewound, Accurate",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 8.2 : 21; // ≤ 1 MEGOHM: 8.2, > 1 MEGOHM: 21
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 5.8 : 15; // ≤ 1 MEGOHM: 5.8, > 1 MEGOHM: 15
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._2,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-WIREWOUND_POWER_LEAD",
            name: "Wirewound, Power, Lead Mounted",
            g_fr: () => 0.80,
            g_std: () => 0.25,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.D,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-WIREWOUND_POWER_CHASSIS",
            name: "Wirewound, Power, Chassis Mounted",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.D,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaFixedResistorSpecifications]
};
exports.TelcordiaVariableResistor = {
    id: "SR332-RESISTOR-VARIABLE",
    name: "VARIABLE",
    mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_FILM",
            name: "Non-wirewound Film",
            g_fr: () => 7.3,
            g_std: () => 3.1,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.B,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_LOW_PRECISION_CARBON",
            name: "Non-wirewound Low Precision, Carbon",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 18 : 28; // ≤ 200K OHM: 18, > 200K OHM: 28
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 13 : 20; // ≤ 200K OHM: 13, > 200K OHM: 20
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.B,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_PRECISION",
            name: "Non-wirewound Precision",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 13 : 20; // ≤ 200K OHM: 13, > 200K OHM: 20
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 9.1 : 14; // ≤ 200K OHM: 9.1, > 200K OHM: 14
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_TRIMMER",
            name: "Non-wirewound Trimmer",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 13 : 20; // ≤ 200K OHM: 13, > 200K OHM: 20
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 9.1 : 14; // ≤ 200K OHM: 9.1, > 200K OHM: 14
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._2,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_HIGH_POWER",
            name: "Wirewound High Power",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 87 : 150; // ≤ 5K OHM: 87, > 5K OHM: 150
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 62 : 110; // ≤ 5K OHM: 62, > 5K OHM: 110
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.B,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_LEADSCREW",
            name: "Wirewound Leadscrew",
            g_fr: () => 13,
            g_std: () => 9.1,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_PRECISION",
            name: "Wirewound Precision",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 100000 ? 100 : 160; // ≤ 100K OHM: 100, > 100K OHM: 160
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 100000 ? 73 : 120; // ≤ 100K OHM: 73, > 100K OHM: 120
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_SEMI_PRECISION",
            name: "Wirewound Semi-Precision",
            g_fr: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 44 : 76; // ≤ 5K OHM: 44, > 5K OHM: 76
            },
            g_std: (args) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 31 : 54; // ≤ 5K OHM: 31, > 5K OHM: 54
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaVariableResistorSpecifications]
};
exports.TelcordiaResistorNetwork = {
    id: "SR332-RESISTOR-NETWORK",
    name: "RESISTOR NETWORK",
    mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
    g_fr: (args) => {
        const resistors = args?.resistors || 4;
        return 0.05 * resistors; // λG = 0.05 × N
    },
    g_std: (args) => {
        const resistors = args?.resistors || 4;
        return 0.02 * resistors; // σG = 0.02 × N
    },
    tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
    elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaResisotrNetworkSpecification]
};
exports.TelcordiaResistor = {
    id: "SR332-RESISTOR",
    name: "Resistor",
    mainCategory: sr332_1.TelcordiaMainCategories.RESISTOR,
    subCategories: [exports.TelcordiaFixedResistor, exports.TelcordiaVariableResistor, exports.TelcordiaResistorNetwork]
};
