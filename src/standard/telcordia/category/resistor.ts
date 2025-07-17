import { TelcordiaCategory, TelcordiaElectricalStressCurves, TelcordiaTempStressCurves, TelcordiaMainCategories } from '../sr332';
import { TelcordiaFixedResistorSpecifications, TelcordiaVariableResistorSpecifications, TelcordiaResisotrNetworkSpecification, TelcordiaBasicSpecifications } from "../specifications";

// RESISTOR Specifications
export type TelcordiaResistorSpecifications = {
    resistance?: number; // in Ohms
    appliedPower?: number; // in Watts
    ratedPower?: number; // in Watts
}

export const TelcordiaFixedResistor: TelcordiaCategory = {
    id: "SR332-RESISTOR-FIXED",
    name: "FIXED",
    mainCategory: TelcordiaMainCategories.RESISTOR,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-COMPOSITION",
            name: "Composition",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.18 : 2.1; // ≤ 1 MEGOHM: 0.18, > 1 MEGOHM: 2.1
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.13 : 1.5; // ≤ 1 MEGOHM: 0.13, > 1 MEGOHM: 1.5
            },
            tempCurve: () => TelcordiaTempStressCurves._6,
            elecCurve: () => TelcordiaElectricalStressCurves.D,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-FILM",
            name: "Film (Carbon, Oxide, Metal)",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.08 : 0.24; // ≤ 1 MEGOHM: 0.08, > 1 MEGOHM: 0.24
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.02 : 0.07; // ≤ 1 MEGOHM: 0.02, > 1 MEGOHM: 0.07
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-FILM_POWER",
            name: "Film, Power (> 1W)",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.30 : 0.71; // ≤ 1 MEGOHM: 0.30, > 1 MEGOHM: 0.71
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 0.22 : 0.49; // ≤ 1 MEGOHM: 0.22, > 1 MEGOHM: 0.49
            },
            tempCurve: () => TelcordiaTempStressCurves._1,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-WIREWOUND_ACCURATE",
            name: "Wirewound, Accurate",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 8.2 : 21; // ≤ 1 MEGOHM: 8.2, > 1 MEGOHM: 21
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 1000000 ? 5.8 : 15; // ≤ 1 MEGOHM: 5.8, > 1 MEGOHM: 15
            },
            tempCurve: () => TelcordiaTempStressCurves._2,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-WIREWOUND_POWER_LEAD",
            name: "Wirewound, Power, Lead Mounted",
            g_fr: () => 0.80,
            g_std: () => 0.25,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.D,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-FIXED-WIREWOUND_POWER_CHASSIS",
            name: "Wirewound, Power, Chassis Mounted",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.D,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaFixedResistorSpecifications]
}

export const TelcordiaVariableResistor: TelcordiaCategory = {
    id: "SR332-RESISTOR-VARIABLE",
    name: "VARIABLE",
    mainCategory: TelcordiaMainCategories.RESISTOR,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_FILM",
            name: "Non-wirewound Film",
            g_fr: () => 7.3,
            g_std: () => 3.1,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.B,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_LOW_PRECISION_CARBON",
            name: "Non-wirewound Low Precision, Carbon",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 18 : 28; // ≤ 200K OHM: 18, > 200K OHM: 28
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 13 : 20; // ≤ 200K OHM: 13, > 200K OHM: 20
            },
            tempCurve: () => TelcordiaTempStressCurves._4,
            elecCurve: () => TelcordiaElectricalStressCurves.B,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_PRECISION",
            name: "Non-wirewound Precision",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 13 : 20; // ≤ 200K OHM: 13, > 200K OHM: 20
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 9.1 : 14; // ≤ 200K OHM: 9.1, > 200K OHM: 14
            },
            tempCurve: () => TelcordiaTempStressCurves._4,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-NON_WIREWOUND_TRIMMER",
            name: "Non-wirewound Trimmer",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 13 : 20; // ≤ 200K OHM: 13, > 200K OHM: 20
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 200000 ? 9.1 : 14; // ≤ 200K OHM: 9.1, > 200K OHM: 14
            },
            tempCurve: () => TelcordiaTempStressCurves._2,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_HIGH_POWER",
            name: "Wirewound High Power",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 87 : 150; // ≤ 5K OHM: 87, > 5K OHM: 150
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 62 : 110; // ≤ 5K OHM: 62, > 5K OHM: 110
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.B,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_LEADSCREW",
            name: "Wirewound Leadscrew",
            g_fr: () => 13,
            g_std: () => 9.1,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_PRECISION",
            name: "Wirewound Precision",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 100000 ? 100 : 160; // ≤ 100K OHM: 100, > 100K OHM: 160
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 100000 ? 73 : 120; // ≤ 100K OHM: 73, > 100K OHM: 120
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.RESISTOR,
            id: "SR332-RESISTOR-VARIABLE-WIREWOUND_SEMI_PRECISION",
            name: "Wirewound Semi-Precision",
            g_fr: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 44 : 76; // ≤ 5K OHM: 44, > 5K OHM: 76
            },
            g_std: (args?: Record<string, any>) => {
                const resistance = args?.resistance || 0;
                return resistance <= 5000 ? 31 : 54; // ≤ 5K OHM: 31, > 5K OHM: 54
            },
            tempCurve: () => TelcordiaTempStressCurves._4,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaVariableResistorSpecifications]
}

export const TelcordiaResistorNetwork: TelcordiaCategory = {
    id: "SR332-RESISTOR-NETWORK",
    name: "RESISTOR NETWORK",
    mainCategory: TelcordiaMainCategories.RESISTOR,
    g_fr: (args?: Record<string, any>) => {
        const resistors = args?.resistors || 4;
        return 0.05 * resistors; // λG = 0.05 × N
    },
    g_std: (args?: Record<string, any>) => {
        const resistors = args?.resistors || 4;
        return 0.02 * resistors; // σG = 0.02 × N
    },
    tempCurve: () => TelcordiaTempStressCurves._3,
    elecCurve: () => TelcordiaElectricalStressCurves.C,
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaResisotrNetworkSpecification]
}

export const TelcordiaResistor: TelcordiaCategory = {
    id: "SR332-RESISTOR",
    name: "Resistor",
    mainCategory: TelcordiaMainCategories.RESISTOR,
    subCategories: [TelcordiaFixedResistor, TelcordiaVariableResistor, TelcordiaResistorNetwork]
}