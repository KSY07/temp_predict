"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaTransistor = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaTransistor = {
    id: "SR332-TRANSISTOR",
    name: "Transistor",
    mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-SILICON-NPN-PNP",
            name: "Silicon NPN/PNP",
            g_fr: (args) => {
                const ratedPower = args?.ratedPower || 0;
                if (ratedPower <= 0.6)
                    return 0.69;
                if (ratedPower <= 6)
                    return 1.77;
                return 7.7;
            },
            g_std: (args) => {
                const ratedPower = args?.ratedPower || 0;
                if (ratedPower <= 0.6)
                    return 0.31;
                if (ratedPower <= 6)
                    return 1.02;
                return 2.3;
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-GERMANIUM-NPN",
            name: "Germanium NPN",
            g_fr: (args) => {
                const ratedPower = args?.ratedPower || 0;
                if (ratedPower <= 0.6)
                    return 31;
                if (ratedPower <= 6)
                    return 46;
                return 77;
            },
            g_std: (args) => {
                const ratedPower = args?.ratedPower || 0;
                if (ratedPower <= 0.6)
                    return 22;
                if (ratedPower <= 6)
                    return 33;
                return 55;
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-GERMANIUM-PNP",
            name: "Germanium PNP",
            g_fr: (args) => {
                const ratedPower = args?.ratedPower || 0;
                if (ratedPower <= 0.6)
                    return 10;
                if (ratedPower <= 6)
                    return 15;
                return 28;
            },
            g_std: (args) => {
                const ratedPower = args?.ratedPower || 0;
                if (ratedPower <= 0.6)
                    return 7.3;
                if (ratedPower <= 6)
                    return 11;
                return 20;
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-FET-SILICON-LINEAR",
            name: "FET Silicon Linear",
            g_fr: () => 11,
            g_std: () => 3.9,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-FET-SWITCH",
            name: "FET Switch",
            g_fr: () => 3.44,
            g_std: () => 0.75,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-FET-HIGH-FREQUENCY",
            name: "FET High Frequency",
            g_fr: () => 9.3,
            g_std: () => 4.9,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-GAAS-LOW-NOISE",
            name: "GaAs Low Noise",
            g_fr: () => 51,
            g_std: () => 36,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-GAAS-DRIVER",
            name: "GaAs Driver",
            g_fr: () => 360,
            g_std: () => 250,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-PHEMT-SWITCH",
            name: "pHEMT Switch",
            g_fr: () => 2.02,
            g_std: () => 0.43,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-UNIJUNCTION",
            name: "Unijunction",
            g_fr: () => 93,
            g_std: () => 65,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._4,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-MICROWAVE-PULSE",
            name: "Microwave Pulse",
            g_fr: () => 570,
            g_std: () => 400,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-MICROWAVE-CW",
            name: "Microwave CW",
            g_fr: () => 1100,
            g_std: () => 800,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-RF-INGAP-GAAS-SIGE-HBT",
            name: "RF InGaP/GaAs/SiGe HBT",
            g_fr: () => 3.2,
            g_std: () => 0.5,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.TRANSISTOR,
            id: "SR332-TRANSISTOR-RF-LDMOS",
            name: "RF LDMOS",
            g_fr: () => 3.68,
            g_std: () => 0.47,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => sr332_1.TelcordiaElectricalStressCurves.E,
        }
    ],
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaTransistorSpecifications]
};
