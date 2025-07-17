import { TelcordiaCategory, TelcordiaElectricalStressCurves, TelcordiaTempStressCurves, TelcordiaMainCategories } from '../sr332';
import { TelcordiaBasicSpecifications, TelcordiaDiodeSpecifications } from "../specifications";

// DIODE Specifications
export type TelcordiaDiodeSpecifications = {
    ratedVoltage?: number; // in Volts
    ratedCurrent?: number; // in Amperes
}

export const TelcordiaDiode: TelcordiaCategory = {
    id: "SR332-DIODE",
    name: "Diode",
    mainCategory: TelcordiaMainCategories.DIODE,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-SILICON_GENERAL_PURPOSE",
            name: "Silicon General Purpose",
            g_fr: (args?: Record<string, any>) => {
                const ratedCurrent = args?.ratedCurrent || 0;
                return ratedCurrent <= 20 ? 0.33 : 4.6;
            },
            g_std: (args?: Record<string, any>) => {
                const ratedCurrent = args?.ratedCurrent || 0;
                return ratedCurrent <= 20 ? 0.23 : 3.3;
            },
            tempCurve: () => TelcordiaTempStressCurves._4,
            elecCurve: () => TelcordiaElectricalStressCurves.F,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-SILICON_MICROWAVE_DETECTOR",
            name: "Silicon Microwave Detector",
            g_fr: () => 51,
            g_std: () => 36,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.F,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-SILICON_MICROWAVE_MIXER",
            name: "Silicon Microwave Mixer",
            g_fr: () => 1.42,
            g_std: () => 0.71,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.F,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-VOLTAGE_REGULATOR",
            name: "Voltage Regulator",
            g_fr: (args?: Record<string, any>) => {
                const ratedPower = args?.ratedPower || 0;
                return ratedPower <= 1.5 ? 0.90 : 9.3;
            },
            g_std: (args?: Record<string, any>) => {
                const ratedPower = args?.ratedPower || 0;
                return ratedPower <= 1.5 ? 0.64 : 2.8;
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-THYRISTOR",
            name: "Thyristor",
            g_fr: (args?: Record<string, any>) => {
                const ratedCurrent = args?.ratedCurrent || 0;
                return ratedCurrent <= 1 ? 13 : 72;
            },
            g_std: (args?: Record<string, any>) => {
                const ratedCurrent = args?.ratedCurrent || 0;
                return ratedCurrent <= 1 ? 5.2 : 23;
            },
            tempCurve: () => TelcordiaTempStressCurves._4,
            elecCurve: () => TelcordiaElectricalStressCurves.F,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-TVS_SURGE_SUPPRESSOR",
            name: "TVS Surge Suppressor",
            g_fr: () => 2.55,
            g_std: () => 0.81,
            tempCurve: () => TelcordiaTempStressCurves._4,
            elecCurve: () => TelcordiaElectricalStressCurves.F,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-VARACTOR_STEP_RECOVERY_TUNNEL",
            name: "Varactor, Step Recovery, Tunnel",
            g_fr: () => 13,
            g_std: () => 8.3,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.H,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-VARISTOR_SILICON_CARBIDE",
            name: "Varistor, Silicon Carbide",
            g_fr: () => 7.8,
            g_std: () => 2.6,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.DIODE,
            id: "SR332-DIODE-VARISTOR_METAL_OXIDE",
            name: "Varistor, Metal Oxide",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaDiodeSpecifications]
}