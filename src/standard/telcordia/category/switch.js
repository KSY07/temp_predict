"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaSwitch = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaSwitch = {
    id: "SR332-SWITCH",
    name: "Switch",
    mainCategory: sr332_1.TelcordiaMainCategories.SWITCH,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-PUSHBUTTON",
            name: "Pushbutton",
            g_fr: () => 1.99,
            g_std: () => 1.40,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-TOGGLE",
            name: "Toggle",
            g_fr: (args) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 5.1 + 2.6 * c;
            },
            g_std: (args) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 13 + 3.2 * Math.pow(c, 2);
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-ROCKER-SLIDE",
            name: "Rocker/Slide",
            g_fr: (args) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 5.1 + 0.38 * c;
            },
            g_std: (args) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 13 + 0.068 * Math.pow(c, 2);
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-ROTARY",
            name: "Rotary",
            g_fr: (args) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 7.7 + 2.6 * c;
            },
            g_std: (args) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 30 + 3.2 * Math.pow(c, 2);
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.C,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaSwitchSpecification]
};
