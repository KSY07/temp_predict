"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaMiscellaneous = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaMiscellaneous = {
    id: "SR332-MISCELLANEOUS",
    name: "Miscellaneous",
    mainCategory: sr332_1.TelcordiaMainCategories.MISCELLANEOUS,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-VIBRATOR",
            name: "Vibrator",
            g_fr: (args) => {
                const frequency = args?.frequency || 60;
                return frequency === 120 ? 10 : 5.1; // 120 Hz: 10, Others: 5.1
            },
            g_std: (args) => {
                const frequency = args?.frequency || 60;
                return frequency === 120 ? 7.3 : 3.6; // 120 Hz: 7.3, Others: 3.6
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
            specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaMiscellaneousVibratorSpecifications]
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-CIRCUIT-BREAKER",
            name: "Circuit Breaker",
            g_fr: (args) => {
                const type = args?.type || 0; // 0: Protection-Only, 1: Power On/Off
                return type === 0 ? 26 : 130; // Protection-Only: 26, Power On/Off: 130
            },
            g_std: (args) => {
                const type = args?.type || 0;
                return type === 0 ? 18 : 92; // Protection-Only: 18, Power On/Off: 92
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
            specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaMiscellaneousCircuitBreakerSpecifications]
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-FUSE",
            name: "Fuse",
            g_fr: () => 2.1,
            g_std: () => 1.5,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
            specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaMiscellaneousFuseSpecifications]
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-LAMP-INCANDESCENT",
            name: "Lamp, Incandescent",
            g_fr: () => 610,
            g_std: () => 430,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => 1,
            specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaMiscellaneousLampIncandescentSpecifications]
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-POWER-MODULE",
            name: "Power Module",
            g_fr: (args) => {
                const type = args?.type || 0; // 0: DC-DC Board Mounted, 1: AC/DC Power Supply
                return type === 0 ? 31 : 46; // DC-DC: 31, AC/DC: 46
            },
            g_std: (args) => {
                const type = args?.type || 0;
                return type === 0 ? 22 : 33; // DC-DC: 22, AC/DC: 33
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._9,
            elecCurve: () => 1,
            specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaMiscellaneousPowerModuleSpecifications]
        }
    ]
};
