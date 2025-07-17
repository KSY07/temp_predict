"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaOptoElectronic = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaOptoElectronic = {
    id: "SR332-OPTO-ELECTRONIC",
    name: "Opto-Electronic",
    mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
    subCategories: [
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PUMP-LASER",
            name: "Pump Laser",
            g_fr: (args) => {
                const outputPower = args?.outputPower || 50; // mW
                if (outputPower <= 90)
                    return 500;
                if (outputPower <= 150)
                    return 900;
                return 1000;
            },
            g_std: (args) => {
                const outputPower = args?.outputPower || 50; // mW
                if (outputPower <= 90)
                    return 400;
                if (outputPower <= 150)
                    return 730;
                return 810;
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: specifications_1.TelcordiaOptoElectronicPumpLaserSpecification
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-TRANSCEIVER-SFP",
            name: "Transceiver SFP",
            g_fr: (args) => {
                const dataRate = args?.dataRate || 5; // Gbps
                if (dataRate < 10)
                    return 50;
                if (dataRate < 40)
                    return 100;
                return 250;
            },
            g_std: (args) => {
                const dataRate = args?.dataRate || 5; // Gbps
                if (dataRate < 10)
                    return 20;
                if (dataRate < 40)
                    return 35;
                return 170;
            },
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: specifications_1.TelcordiaOptoElectronicTransceiverSFPSpecification
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-LED",
            name: "Single LED",
            g_fr: () => 0.25,
            g_std: () => 0.18,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PHOTOTRANSISTOR",
            name: "Phototransistor",
            g_fr: () => 31,
            g_std: () => 22,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PHOTODIODE",
            name: "Photodiode",
            g_fr: () => 7.7,
            g_std: () => 5.5,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-ISOLATOR-PHOTODIODE",
            name: "Single Isolator/Photodiode",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-ISOLATOR-PHOTOTRANSISTOR",
            name: "Single Isolator/Phototransistor",
            g_fr: () => 2.1,
            g_std: () => 0.71,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-ISOLATOR-LSR",
            name: "Single Isolator/LSR",
            g_fr: () => 10,
            g_std: () => 7.3,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DUAL-ISOLATOR-PHOTODIODE",
            name: "Dual Isolator/Photodiode",
            g_fr: () => 10,
            g_std: () => 7.3,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DUAL-ISOLATOR-PHOTOTRANSISTOR",
            name: "Dual Isolator/Phototransistor",
            g_fr: () => 3.7,
            g_std: () => 2.9,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DUAL-ISOLATOR-LSR",
            name: "Dual Isolator/LSR",
            g_fr: () => 21,
            g_std: () => 15,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DFB-LASER",
            name: "DFB Laser",
            g_fr: () => 100,
            g_std: () => 81,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-EML-UNCOOLED",
            name: "EML Uncooled",
            g_fr: () => 110,
            g_std: () => 89,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-EML-COOLED",
            name: "EML Cooled",
            g_fr: () => 300,
            g_std: () => 240,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-CW-LASER-IC",
            name: "CW Laser IC",
            g_fr: () => 150,
            g_std: () => 120,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PIN-DIODE",
            name: "PIN Diode",
            g_fr: () => 150,
            g_std: () => 120,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: sr332_1.TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-APD",
            name: "APD",
            g_fr: () => 200,
            g_std: () => 160,
            tempCurve: () => sr332_1.TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        }
    ],
    specificationList: specifications_1.TelcordiaBasicSpecifications
};
