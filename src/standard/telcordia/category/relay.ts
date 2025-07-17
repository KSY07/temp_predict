import { TelcordiaCategory, TelcordiaElectricalStressCurves, TelcordiaTempStressCurves, TelcordiaMainCategories } from "../sr332";
import { TelcordiaBasicSpecifications, TelcordiaRelaySpecifications } from "../specifications";

export type TelcordiaRelaySpecifications = {
    type: 'General_Purpose' | 'Contactor' | 'Latching' | 'Reed' | 'Thermal_Bimetal' | 'Mercury' | 'Solid_State';
    contactCurrent?: number; // for electrical stress
    ratedCurrent?: number; // for electrical stress
}

export const TelcordiaRelay: TelcordiaCategory = {
    id: "SR332-RELAY",
    name: "Relay",
    mainCategory: TelcordiaMainCategories.RELAY,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-GENERAL-PURPOSE",
            name: "General Purpose",
            g_fr: () => 1.9,
            g_std: () => 1.9,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-CONTACTOR",
            name: "Contactor",
            g_fr: () => 140,
            g_std: () => 98,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-LATCHING",
            name: "Latching",
            g_fr: () => 3.9,
            g_std: () => 2.3,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-REED",
            name: "Reed",
            g_fr: () => 26,
            g_std: () => 18,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-THERMAL-BIMETAL",
            name: "Thermal/Bimetal",
            g_fr: () => 26,
            g_std: () => 18,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-MERCURY",
            name: "Mercury",
            g_fr: () => 26,
            g_std: () => 18,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.RELAY,
            id: "SR332-RELAY-SOLID-STATE",
            name: "Solid State",
            g_fr: () => 21,
            g_std: () => 6.9,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaRelaySpecifications]
}