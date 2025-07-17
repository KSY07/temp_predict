import { TelcordiaBasicSpecifications, TelcordiaInductorSpecifications } from "../specifications";
import { TelcordiaCategory, TelcordiaElectricalStressCurves, TelcordiaTempStressCurves, TelcordiaMainCategories } from "../sr332";

// INDUCTOR Specifications
export type TelcordiaInductorSpecifications = {
    inductance?: number; // in Henries
    power?: number; // in Watts
}

export const TelcordiaTransformerInductor: TelcordiaCategory = {
    id: "SR332-INDUCTOR-TRANSFORMER",
    name: "TRANSFORMER",
    mainCategory: TelcordiaMainCategories.INDUCTOR,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-TRANSFORMER-PULSE",
            name: "Pulse",
            g_fr: (args?: Record<string, any>) => {
                const voltage = args?.operatingVoltage || 0;
                return voltage < 5 ? 3.0 : 9.8;
            },
            g_std: (args?: Record<string, any>) => {
                const voltage = args?.operatingVoltage || 0;
                return voltage < 5 ? 0.90 : 6.9;
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-TRANSFORMER-AUDIO",
            name: "Audio",
            g_fr: () => 2.1,
            g_std: () => 0.78,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-TRANSFORMER-POWER",
            name: "Power (> 1W)",
            g_fr: () => 5.0,
            g_std: () => 2.0,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-TRANSFORMER-RADIO_FREQUENCY",
            name: "Radio Frequency",
            g_fr: () => 4.6,
            g_std: () => 1.74,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaInductorSpecifications]
}

export const TelcordiaCoilInductor: TelcordiaCategory = {
    id: "SR332-INDUCTOR-COIL",
    name: "COIL",
    mainCategory: TelcordiaMainCategories.INDUCTOR,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-COIL-LOAD_COIL",
            name: "Load Coil",
            g_fr: () => 0.90,
            g_std: () => 0.30,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-COIL-POWER_FILTER",
            name: "Power Filter",
            g_fr: () => 0.24,
            g_std: () => 0.07,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-COIL-RADIO_FREQUENCY_FIXED",
            name: "Radio Frequency, Fixed",
            g_fr: () => 0.11,
            g_std: () => 0.02,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-COIL-RADIO_FREQUENCY_VARIABLE",
            name: "Radio Frequency, Variable",
            g_fr: () => 1.7,
            g_std: () => 0.58,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-COIL-FERRITE_BEADS",
            name: "Ferrite Beads",
            g_fr: () => 0.1,
            g_std: () => 0.07,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        },
        {
            mainCategory: TelcordiaMainCategories.INDUCTOR,
            id: "SR332-INDUCTOR-COIL-CHIP_CERAMIC_FILTER",
            name: "Chip/Ceramic Filter",
            g_fr: () => 0.1,
            g_std: () => 0.07,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.A,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaInductorSpecifications]
}

export const TelcordiaInductor: TelcordiaCategory = {
    id: "SR332-INDUCTOR",
    name: "Inductor",
    mainCategory: TelcordiaMainCategories.INDUCTOR,
    subCategories: [TelcordiaTransformerInductor, TelcordiaCoilInductor]
}