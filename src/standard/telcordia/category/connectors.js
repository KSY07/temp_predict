"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaConnector = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaConnector = {
    id: "SR332-CONNECTOR",
    name: "Connector",
    mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
            id: "SR332-CONNECTOR-GENERAL_PURPOSE_POWER",
            name: "General Purpose, Power",
            g_fr: (args) => {
                const pins = args?.pins || 4;
                return pins * 2.2; // FITs per pin: 2.2
            },
            g_std: (args) => {
                const pins = args?.pins || 4;
                return pins * 1.2; // FITs per pin: 1.2
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1, // πS = 1 for all connectors
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
            id: "SR332-CONNECTOR-COAXIAL_ELECTRIC",
            name: "Coaxial, Electric",
            g_fr: () => 0.29, // Fixed value, not pin-dependent
            g_std: () => 0.10,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
            id: "SR332-CONNECTOR-OPTICAL",
            name: "Optical",
            g_fr: (args) => {
                const pins = args?.pins || 2;
                return pins * 30; // FITs per pin: 30
            },
            g_std: (args) => {
                const pins = args?.pins || 2;
                return pins * 9.5; // FITs per pin: 9.5
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
            id: "SR332-CONNECTOR-MULTI_PIN",
            name: "Multi-Pin",
            g_fr: (args) => {
                const pins = args?.pins || 8;
                return pins * 0.040; // FITs per pin: 0.040
            },
            g_std: (args) => {
                const pins = args?.pins || 8;
                return pins * 0.010; // FITs per pin: 0.010
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
            id: "SR332-CONNECTOR-PRINTED_BOARD_EDGE",
            name: "Printed Board, Edge",
            g_fr: (args) => {
                const pins = args?.pins || 20;
                return pins * 0.13; // FITs per pin: 0.13
            },
            g_std: (args) => {
                const pins = args?.pins || 20;
                return pins * 0.088; // FITs per pin: 0.088
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
            id: "SR332-CONNECTOR-RIBBON_CABLE",
            name: "Ribbon Cable",
            g_fr: (args) => {
                const pins = args?.pins || 16;
                return pins * 0.10; // FITs per pin: 0.10
            },
            g_std: (args) => {
                const pins = args?.pins || 16;
                return pins * 0.073; // FITs per pin: 0.073
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.CONNECTOR,
            id: "SR332-CONNECTOR-IC_SOCKET",
            name: "IC Socket",
            g_fr: (args) => {
                const pins = args?.pins || 14;
                return pins * 0.10; // FITs per pin: 0.10
            },
            g_std: (args) => {
                const pins = args?.pins || 14;
                return pins * 0.047; // FITs per pin: 0.047
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaConnectorSpecifications]
};
