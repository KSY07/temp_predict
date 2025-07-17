"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaMicrowave = void 0;
const specifications_1 = require("../specifications");
const sr332_1 = require("../sr332");
exports.TelcordiaMicrowave = {
    id: "SR332-MICROWAVE",
    name: "Microwave Element",
    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE",
            name: "Coaxial and Waveguide",
            subCategories: [
                {
                    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-LOAD",
                    name: "Load",
                    g_fr: () => 7.7,
                    g_std: () => 5.5,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                },
                {
                    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-ATTENUATOR",
                    name: "Attenuator",
                    subCategories: [
                        {
                            mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                            id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-ATTENUATOR-FIXED",
                            name: "Fixed",
                            g_fr: () => 3.8,
                            g_std: () => 2.3,
                            tempCurve: () => 1,
                            elecCurve: () => 1,
                        },
                        {
                            mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                            id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-ATTENUATOR-VARIABLE",
                            name: "Fixed",
                            g_fr: () => 1.81,
                            g_std: () => 0.55,
                            tempCurve: () => 1,
                            elecCurve: () => 1,
                        },
                    ]
                }
            ]
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-FIXED_ELEMENTS",
            name: "Fixed Elements",
            subCategories: [
                {
                    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-FIXED_ELEMENTS-DIRECTIONAL_COUPLERS",
                    name: "Directional Couplers",
                    g_fr: () => 1.11,
                    g_std: () => 0.78,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                },
                {
                    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-FIXED_ELEMENTS-FIXED_STUBS",
                    name: "Fixed Stubs",
                    g_fr: () => 5.1,
                    g_std: () => 3.6,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                },
                {
                    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-FIXED_ELEMENTS-CAVITIES",
                    name: "CAVITIES",
                    g_fr: () => 5.1,
                    g_std: () => 3.6,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                }
            ]
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-VARIABLE_ELEMENTS",
            name: "Variable Elements",
            subCategories: [
                {
                    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-VARIABLE_ELEMENTS-TUNED_STUBS",
                    name: "Tuned Stubs",
                    g_fr: () => 51,
                    g_std: () => 36,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                },
                {
                    mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-VARIABLE_ELEMENTS-TUNED_CAVITIES",
                    name: "Tuned Cavities",
                    g_fr: () => 11,
                    g_std: () => 4.1,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                }
            ]
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-FERRITE_DEVICES_TRANSMIT",
            name: "Ferrite Devices (Transmit)",
            g_fr: () => 100,
            g_std: () => 73,
            tempCurve: () => 1,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-FERRITE_DEVICES_RECEIVE",
            name: "Ferrite Devices (Receive)",
            g_fr: () => 51,
            g_std: () => 36,
            tempCurve: () => 1,
            elecCurve: () => 1,
        }
    ],
    specificationList: specifications_1.TelcordiaBasicSpecifications
};
