import { TelcordiaCategory, TelcordiaElectricalStressCurves, TelcordiaTempStressCurves, TelcordiaMainCategories } from '../sr332';
import { TelcordiaBasicSpecifications, TelcordiaSwitchSpecification } from "../specifications";

export type TelcordiaSwitchSpecifications = {
    type: 'Pushbutton' | 'Toggle' | 'Rocker_Slide' | 'Rotary';
    numberOfPoles: number;
    numberOfThrows: number;
    contactCurrent?: number; // for electrical stress
    ratedCurrent?: number; // for electrical stress
}

export const TelcordiaSwitch: TelcordiaCategory = {
    id: "SR332-SWITCH",
    name: "Switch",
    mainCategory: TelcordiaMainCategories.SWITCH,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-PUSHBUTTON",
            name: "Pushbutton",
            g_fr: () => 1.99,
            g_std: () => 1.40,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-TOGGLE",
            name: "Toggle",
            g_fr: (args?: Record<string, any>) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 5.1 + 2.6 * c;
            },
            g_std: (args?: Record<string, any>) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 13 + 3.2 * Math.pow(c, 2);
            },
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-ROCKER-SLIDE",
            name: "Rocker/Slide",
            g_fr: (args?: Record<string, any>) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 5.1 + 0.38 * c;
            },
            g_std: (args?: Record<string, any>) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 13 + 0.068 * Math.pow(c, 2);
            },
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        },
        {
            mainCategory: TelcordiaMainCategories.SWITCH,
            id: "SR332-SWITCH-ROTARY",
            name: "Rotary",
            g_fr: (args?: Record<string, any>) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 7.7 + 2.6 * c;
            },
            g_std: (args?: Record<string, any>) => {
                const poles = args?.numberOfPoles || 1;
                const throws = args?.numberOfThrows || 1;
                const c = poles * throws;
                return 30 + 3.2 * Math.pow(c, 2);
            },
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.C,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications,...TelcordiaSwitchSpecification]
}