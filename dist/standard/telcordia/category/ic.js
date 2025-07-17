"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaICCategories = exports.TelcordiaMicroprocessor = exports.TelcordiaROM = exports.TelcordiaRAM = exports.TelcordiaDigitalIC = exports.TelcordiaAnalogIC = void 0;
const sr332_1 = require("../sr332");
const specifications_1 = require("../specifications");
exports.TelcordiaAnalogIC = {
    id: "SR332-IC-ANALOG",
    name: "Analog IC",
    mainCategory: sr332_1.TelcordiaMainCategories.IC,
    g_fr: (args) => {
        const transistors = args?.numberOfTransistors || 20;
        if (transistors <= 860) {
            // Use lookup table for standard ranges from Table 8-5
            if (transistors <= 32)
                return 1.2;
            if (transistors <= 90)
                return 2.1;
            if (transistors <= 170)
                return 3.0;
            if (transistors <= 260)
                return 3.4;
            if (transistors <= 360)
                return 4.1;
            if (transistors <= 470)
                return 4.9;
            if (transistors <= 590)
                return 5.3;
            if (transistors <= 720)
                return 5.9;
            if (transistors <= 860)
                return 6.2;
        }
        // Formula for > 860 transistors: λG = 0.33 × T^0.440
        return 0.33 * Math.pow(transistors, 0.440);
    },
    g_std: (args) => {
        // First calculate g_fr with same args
        const transistors = args?.numberOfTransistors || 20;
        let lambdaG;
        if (transistors <= 860) {
            // Use lookup table for standard ranges from Table 8-5
            if (transistors <= 32)
                lambdaG = 1.2;
            else if (transistors <= 90)
                lambdaG = 2.1;
            else if (transistors <= 170)
                lambdaG = 3.0;
            else if (transistors <= 260)
                lambdaG = 3.4;
            else if (transistors <= 360)
                lambdaG = 4.1;
            else if (transistors <= 470)
                lambdaG = 4.9;
            else if (transistors <= 590)
                lambdaG = 5.3;
            else if (transistors <= 720)
                lambdaG = 5.9;
            else if (transistors <= 860)
                lambdaG = 6.2;
            else
                lambdaG = 0.33 * Math.pow(transistors, 0.440);
        }
        else {
            lambdaG = 0.33 * Math.pow(transistors, 0.440);
        }
        return 0.707 * lambdaG; // σG = 0.707 × λG
    },
    tempCurve: () => sr332_1.TelcordiaTempStressCurves._9,
    elecCurve: () => 1, // πS = 1 for all ICs
    specificationList: specifications_1.TelcordiaAnalogICSpecifications
};
exports.TelcordiaDigitalIC = {
    id: "SR332-IC-DIGITAL",
    name: "Digital IC",
    mainCategory: sr332_1.TelcordiaMainCategories.IC,
    g_fr: (args) => {
        const gates = args?.numberOfGates || 100;
        const tech = args?.technology || 'CMOS';
        switch (tech) {
            case 'Bipolar':
                // λG = Exp[0.0445 - ln(G) + 0.0268(ln(G))²]
                const lnG = Math.log(gates);
                return Math.exp(0.0445 - lnG + 0.0268 * Math.pow(lnG, 2));
            case 'NMOS':
                // λG = 4.40 × (G + 100)^0.243
                return 4.40 * Math.pow(gates + 100, 0.243);
            case 'CMOS':
                // λG = Exp[0.55 + 0.0549ln(G) + 0.00227(ln(G))²]
                const lnGCmos = Math.log(gates);
                return Math.exp(0.55 + 0.0549 * lnGCmos + 0.00227 * Math.pow(lnGCmos, 2));
            default:
                return 1.0;
        }
    },
    g_std: (args) => {
        const gates = args?.numberOfGates || 100;
        const tech = args?.technology || 'CMOS';
        // First calculate lambdaG
        let lambdaG;
        switch (tech) {
            case 'Bipolar':
                const lnG = Math.log(gates);
                lambdaG = Math.exp(0.0445 - lnG + 0.0268 * Math.pow(lnG, 2));
                break;
            case 'NMOS':
                lambdaG = 4.40 * Math.pow(gates + 100, 0.243);
                break;
            case 'CMOS':
                const lnGCmos = Math.log(gates);
                lambdaG = Math.exp(0.55 + 0.0549 * lnGCmos + 0.00227 * Math.pow(lnGCmos, 2));
                break;
            default:
                lambdaG = 1.0;
        }
        switch (tech) {
            case 'Bipolar':
                // σG = λG × [0.690 + 0.126ln(G) - 0.0118(ln(G))²]
                const lnG = Math.log(gates);
                const factor = 0.690 + 0.126 * lnG - 0.0118 * Math.pow(lnG, 2);
                return lambdaG * factor;
            case 'NMOS':
                // σG = 0.707 × λG
                return 0.707 * lambdaG;
            case 'CMOS':
                // σG = λG × [0.513 - 0.0383ln(G) + 0.00187(ln(G))²]
                const lnGCmos = Math.log(gates);
                const factorCmos = 0.513 - 0.0383 * lnGCmos + 0.00187 * Math.pow(lnGCmos, 2);
                return lambdaG * factorCmos;
            default:
                return 0.707 * lambdaG;
        }
    },
    tempCurve: (args) => {
        const tech = args?.technology || 'CMOS';
        switch (tech) {
            case 'Bipolar': return sr332_1.TelcordiaTempStressCurves._6;
            case 'NMOS': return sr332_1.TelcordiaTempStressCurves._8;
            case 'CMOS': return sr332_1.TelcordiaTempStressCurves._8;
            default: return sr332_1.TelcordiaTempStressCurves._8;
        }
    },
    elecCurve: () => 1,
    specificationList: specifications_1.TelcordiaDigitalICSpecifications
};
exports.TelcordiaRAM = {
    id: "SR332-IC-RAM",
    name: "Random Access Memory",
    mainCategory: sr332_1.TelcordiaMainCategories.IC,
    g_fr: (args) => {
        const density = args?.densityMegabits || 1;
        const tech = args?.technology || 'Static_CMOS';
        switch (tech) {
            case 'Static_Bipolar':
                // λG = 12.69 × (1024B + 0.25)^0.378
                return 12.69 * Math.pow(1024 * density + 0.25, 0.378);
            case 'Static_NMOS':
                // λG = 2.0 × (1024B + 0.25)^0.321
                return 2.0 * Math.pow(1024 * density + 0.25, 0.321);
            case 'Static_CMOS':
                // λG = Exp[2.2 + 0.141ln(B) + 0.00442(ln(B))²]
                const lnB = Math.log(density);
                return Math.exp(2.2 + 0.141 * lnB + 0.00442 * Math.pow(lnB, 2));
            case 'Dynamic_NMOS':
            case 'Dynamic_CMOS':
                // λG = Exp[1.56 + 0.151ln(B) + 0.00287(ln(B))²]
                const lnBDyn = Math.log(density);
                return Math.exp(1.56 + 0.151 * lnBDyn + 0.00287 * Math.pow(lnBDyn, 2));
            default:
                return 1.0;
        }
    },
    g_std: (args) => {
        const density = args?.densityMegabits || 1;
        const tech = args?.technology || 'Static_CMOS';
        // First calculate lambdaG
        let lambdaG;
        switch (tech) {
            case 'Static_Bipolar':
                lambdaG = 12.69 * Math.pow(1024 * density + 0.25, 0.378);
                break;
            case 'Static_NMOS':
                lambdaG = 2.0 * Math.pow(1024 * density + 0.25, 0.321);
                break;
            case 'Static_CMOS':
                const lnB = Math.log(density);
                lambdaG = Math.exp(2.2 + 0.141 * lnB + 0.00442 * Math.pow(lnB, 2));
                break;
            case 'Dynamic_NMOS':
            case 'Dynamic_CMOS':
                const lnBDyn = Math.log(density);
                lambdaG = Math.exp(1.56 + 0.151 * lnBDyn + 0.00287 * Math.pow(lnBDyn, 2));
                break;
            default:
                lambdaG = 1.0;
        }
        switch (tech) {
            case 'Static_Bipolar':
            case 'Static_NMOS':
                return 0.707 * lambdaG;
            case 'Static_CMOS':
                const lnB = Math.log(density);
                const factor = 0.284 + 0.00441 * lnB + 0.0112 * Math.pow(lnB, 2);
                return lambdaG * factor;
            case 'Dynamic_NMOS':
            case 'Dynamic_CMOS':
                const lnBDyn = Math.log(density);
                const factorDyn = 0.371 - 0.0186 * lnBDyn + 0.00652 * Math.pow(lnBDyn, 2);
                return lambdaG * factorDyn;
            default:
                return 0.707 * lambdaG;
        }
    },
    tempCurve: (args) => {
        const density = args?.densityMegabits || 1;
        const tech = args?.technology || 'Static_CMOS';
        switch (tech) {
            case 'Static_Bipolar':
                return density > 0.00224 ? sr332_1.TelcordiaTempStressCurves._6 : sr332_1.TelcordiaTempStressCurves._7;
            case 'Static_NMOS':
            case 'Static_CMOS':
            case 'Dynamic_NMOS':
            case 'Dynamic_CMOS':
                return density > 0.038 ? sr332_1.TelcordiaTempStressCurves._8 : sr332_1.TelcordiaTempStressCurves._9;
            default:
                return sr332_1.TelcordiaTempStressCurves._8;
        }
    },
    elecCurve: () => 1,
    specificationList: specifications_1.TelcordiaRAMICSpecifications
};
exports.TelcordiaROM = {
    id: "SR332-IC-ROM",
    name: "Read Only Memory",
    mainCategory: sr332_1.TelcordiaMainCategories.IC,
    g_fr: (args) => {
        const density = args?.densityKilobits || 64;
        const tech = args?.technology || 'CMOS';
        switch (tech) {
            case 'Bipolar':
                // λG = Exp[1.04 + 0.754ln(B) + 0.00288(ln(B))²]
                const lnB = Math.log(density);
                return Math.exp(1.04 + 0.754 * lnB + 0.00288 * Math.pow(lnB, 2));
            case 'NMOS':
                // λG = 5.84 × (B + 0.25)^0.248
                return 5.84 * Math.pow(density + 0.25, 0.248);
            case 'CMOS':
                // λG = 1.60 × (B + 0.25)^0.237
                return 1.60 * Math.pow(density + 0.25, 0.237);
            default:
                return 1.0;
        }
    },
    g_std: (args) => {
        const density = args?.densityKilobits || 64;
        const tech = args?.technology || 'CMOS';
        // First calculate lambdaG
        let lambdaG;
        switch (tech) {
            case 'Bipolar':
                const lnB = Math.log(density);
                lambdaG = Math.exp(1.04 + 0.754 * lnB + 0.00288 * Math.pow(lnB, 2));
                break;
            case 'NMOS':
                lambdaG = 5.84 * Math.pow(density + 0.25, 0.248);
                break;
            case 'CMOS':
                lambdaG = 1.60 * Math.pow(density + 0.25, 0.237);
                break;
            default:
                lambdaG = 1.0;
        }
        switch (tech) {
            case 'Bipolar':
                const lnB = Math.log(density);
                const factor = 0.413 - 0.0364 * lnB + 0.00709 * Math.pow(lnB, 2);
                return lambdaG * factor;
            case 'NMOS':
            case 'CMOS':
                return 0.707 * lambdaG;
            default:
                return 0.707 * lambdaG;
        }
    },
    tempCurve: (args) => {
        const density = args?.densityKilobits || 64;
        const tech = args?.technology || 'CMOS';
        switch (tech) {
            case 'Bipolar':
                return sr332_1.TelcordiaTempStressCurves._6;
            case 'NMOS':
            case 'CMOS':
                return density > 38 ? sr332_1.TelcordiaTempStressCurves._10 : sr332_1.TelcordiaTempStressCurves._9;
            default:
                return sr332_1.TelcordiaTempStressCurves._9;
        }
    },
    elecCurve: () => 1,
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaROMICSpecifications]
};
exports.TelcordiaMicroprocessor = {
    id: "SR332-IC-MICROPROCESSOR",
    name: "Microprocessor",
    mainCategory: sr332_1.TelcordiaMainCategories.IC,
    g_fr: (args) => {
        const tech = args?.technology || 'CMOS';
        switch (tech) {
            case 'Bipolar':
                const gatesBipolar = args?.numberOfGates || 1000;
                // λG = 1.71 × (G + 100)^0.235
                return 1.71 * Math.pow(gatesBipolar + 100, 0.235);
            case 'NMOS':
                const gatesNMOS = args?.numberOfGates || 1000;
                // λG = 3.25 × (G + 100)^0.332
                return 3.25 * Math.pow(gatesNMOS + 100, 0.332);
            case 'CMOS':
                const busWidth = args?.busWidth || 16;
                // λG = Exp[1.20 + 0.0442ln(B) + 0.154(ln(B))²]
                const lnB = Math.log(busWidth);
                return Math.exp(1.20 + 0.0442 * lnB + 0.154 * Math.pow(lnB, 2));
            default:
                return 1.0;
        }
    },
    g_std: (args) => {
        const tech = args?.technology || 'CMOS';
        // First calculate lambdaG
        let lambdaG;
        switch (tech) {
            case 'Bipolar':
                const gatesBipolar = args?.numberOfGates || 1000;
                lambdaG = 1.71 * Math.pow(gatesBipolar + 100, 0.235);
                break;
            case 'NMOS':
                const gatesNMOS = args?.numberOfGates || 1000;
                lambdaG = 3.25 * Math.pow(gatesNMOS + 100, 0.332);
                break;
            case 'CMOS':
                const busWidth = args?.busWidth || 16;
                const lnB = Math.log(busWidth);
                lambdaG = Math.exp(1.20 + 0.0442 * lnB + 0.154 * Math.pow(lnB, 2));
                break;
            default:
                lambdaG = 1.0;
        }
        switch (tech) {
            case 'Bipolar':
            case 'NMOS':
                return 0.707 * lambdaG;
            case 'CMOS':
                const busWidth = args?.busWidth || 16;
                const lnB = Math.log(busWidth);
                const factor = 2.88 - 1.89 * lnB + 0.374 * Math.pow(lnB, 2);
                return lambdaG * factor;
            default:
                return 0.707 * lambdaG;
        }
    },
    tempCurve: (args) => {
        const tech = args?.technology || 'CMOS';
        switch (tech) {
            case 'Bipolar': return sr332_1.TelcordiaTempStressCurves._6;
            case 'NMOS': return sr332_1.TelcordiaTempStressCurves._8;
            case 'CMOS': return sr332_1.TelcordiaTempStressCurves._8;
            default: return sr332_1.TelcordiaTempStressCurves._8;
        }
    },
    elecCurve: () => 1,
    specificationList: [...specifications_1.TelcordiaBasicSpecifications, ...specifications_1.TelcordiaMicroprocessorSpecifications]
};
exports.TelcordiaICCategories = {
    id: "SR332-IC",
    name: "IC (Integrated Circuit)",
    mainCategory: sr332_1.TelcordiaMainCategories.IC,
    subCategories: [exports.TelcordiaAnalogIC, exports.TelcordiaDigitalIC, exports.TelcordiaRAM, exports.TelcordiaROM, exports.TelcordiaMicroprocessor]
};
