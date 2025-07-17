"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaCapacitor = exports.TelcordiaVariableCapacitor = exports.TelcordiaFixedCapacitor = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaFixedCapacitor = {
    id: "SR332-CAPACITOR-FIXED",
    name: "FIXED",
    mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-PAPER",
            name: "Paper",
            g_fr: () => 5.1, // λG from Table 8-1
            g_std: () => 3.6, // σG from Table 8-1
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._2,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-PAPER_PLASTIC",
            name: "Paper/Plastic",
            g_fr: () => 0.76,
            g_std: () => 0.24,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._2,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-PLASTIC",
            name: "Plastic",
            g_fr: () => 0.46,
            g_std: () => 0.13,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-MICA",
            name: "Mica",
            g_fr: () => 0.44,
            g_std: () => 0.30,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.G,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-GLASS",
            name: "Glass",
            g_fr: () => 0.55,
            g_std: () => 0.33,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.G,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-CERAMIC",
            name: "Ceramic",
            g_fr: () => 0.10,
            g_std: () => 0.01,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._1,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.H,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-TANTALUM_SOLID",
            name: "Tantalum, Solid",
            g_fr: (args) => {
                if (args?.packaging === 'Hermetic')
                    return 0.95;
                return 0.19;
            },
            g_std: (args) => {
                if (args?.packaging === 'Hermetic')
                    return 0.23;
                return 0.13;
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-ALUMINUM_ELECTROLYTIC",
            name: "Aluminum, Electrolytic",
            g_fr: (args) => {
                const capacitance = args?.capacitance || 0;
                return capacitance < 400 ? 0.73 : 1.5; // < 400 μF: 0.73, ≥ 400 μF: 1.5
            },
            g_std: (args) => {
                const capacitance = args?.capacitance || 0;
                return capacitance < 400 ? 0.17 : 0.5; // < 400 μF: 0.17, ≥ 400 μF: 0.5
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-SILICON_CHIP",
            name: "Silicon Chip",
            g_fr: () => 1.0,
            g_std: () => 4.4,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.G,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-MOS_CHIP",
            name: "MOS or Chip",
            g_fr: () => 0.41,
            g_std: () => 0.19,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.G,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaCapacitorSpecification]
};
exports.TelcordiaVariableCapacitor = {
    id: "SR332-CAPACITOR-VARIABLE",
    name: "VARIABLE",
    mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-AIR_TRIMMER",
            name: "Air, Trimmer",
            g_fr: () => 8.0,
            g_std: () => 3.8,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._5,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.H,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-CERAMIC",
            name: "Ceramic",
            g_fr: () => 4.0,
            g_std: () => 1.9,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-PISTON_GLASS",
            name: "Piston, Glass",
            g_fr: () => 1.5,
            g_std: () => 1.1,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._5,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.H,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-VACUUM",
            name: "Vacuum",
            g_fr: () => 13,
            g_std: () => 9.1,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._2,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.I,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaCapacitorSpecification]
};
exports.TelcordiaCapacitor = {
    id: "SR332-CAPACITOR",
    name: "Capacitor",
    mainCategory: sr332_1.TelcordiaMainCategories.CAPACITOR,
    subCategories: [exports.TelcordiaFixedCapacitor, exports.TelcordiaVariableCapacitor]
};
