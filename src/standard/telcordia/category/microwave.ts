import { TelcordiaBasicSpecifications, TelcordiaMicrowaveSpecifications } from "../specifications";
import { TelcordiaCategory, TelcordiaMainCategories } from "../sr332";

export type TelcordiaMicrowaveSpecifications = {
    powerLevel?: number; // for isolator/circulator classification
}

export const TelcordiaMicrowave: TelcordiaCategory = {
    id: "SR332-MICROWAVE-MICROWAVE",
    name: "Microwave Element",
    mainCategory: TelcordiaMainCategories.MICROWAVE,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE",
            name: "Coaxial and Waveguide",
            subCategories: [
                {
                    mainCategory: TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-LOAD",
                    name: "Load",
                    g_fr: () => 7.7,
                    g_std: () => 5.5,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
                },
                {
                    mainCategory: TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-ATTENUATOR",
                    name: "Attenuator",
                    subCategories: [
                        {
                            mainCategory: TelcordiaMainCategories.MICROWAVE,
                            id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-ATTENUATOR-FIXED",
                            name: "Fixed",
                            g_fr: () => 3.8,
                            g_std: () => 2.3,
                            tempCurve: () => 1,
                            elecCurve: () => 1,
                            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
                        },
                        {
                            mainCategory: TelcordiaMainCategories.MICROWAVE,
                            id: "SR332-MICROWAVE-COAXIAL_WAVEGUIDE-ATTENUATOR-VARIABLE",
                            name: "Variable",
                            g_fr: () => 1.81,
                            g_std: () => 0.55,
                            tempCurve: () => 1,
                            elecCurve: () => 1,
                            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
                        },
                    ]
                }
            ]
        },
        {
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-FIXED_ELEMENTS",
            name: "Fixed Elements",
            subCategories: [
                {
                    mainCategory: TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-FIXED_ELEMENTS-DIRECTIONAL_COUPLERS",
                    name: "Directional Couplers",
                    g_fr: () => 1.11,
                    g_std: () => 0.78,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
                },
                {
                    mainCategory: TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-FIXED_ELEMENTS-FIXED_STUBS",
                    name: "Fixed Stubs",
                    g_fr: () => 5.1,
                    g_std: () => 3.6,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
                },
                {
                    mainCategory: TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-FIXED_ELEMENTS-CAVITIES",
                    name: "CAVITIES",
                    g_fr: () => 5.1,
                    g_std: () => 3.6,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                }
            ]
        },
        {
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-VARIABLE_ELEMENTS",
            name: "Variable Elements",
            subCategories: [
                {
                    mainCategory: TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-VARIABLE_ELEMENTS-TUNED_STUBS",
                    name: "Tuned Stubs",
                    g_fr: () => 51,
                    g_std: () => 36,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
                },
                {
                    mainCategory: TelcordiaMainCategories.MICROWAVE,
                    id: "SR332-MICROWAVE-VARIABLE_ELEMENTS-TUNED_CAVITIES",
                    name: "Tuned Cavities",
                    g_fr: () => 11,
                    g_std: () => 4.1,
                    tempCurve: () => 1,
                    elecCurve: () => 1,
                }
            ]
        },
        {
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-FERRITE_DEVICES_TRANSMIT",
            name: "Ferrite Devices (Transmit)",
            g_fr: () => 100,
            g_std: () => 73,
            tempCurve: () => 1,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            id: "SR332-MICROWAVE-FERRITE_DEVICES_RECEIVE",
            name: "Ferrite Devices (Receive)",
            g_fr: () => 51,
            g_std: () => 36,
            tempCurve: () => 1,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
};

export const TelcordiaRFMicrowave: TelcordiaCategory = {
    id: "SR332-MICROWAVE-RFMICROWAVE",
    name: "RF/MICROWAVE PASSIVES",
    mainCategory: TelcordiaMainCategories.MICROWAVE,
    subCategories: [
        {
            id: "SR332-MICROWAVE-RFMICROWAVE-FILTER",
            name: "Filter",
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            g_fr: () => 0.48,
            g_std: () => 0.14,
            tempCurve: () => 1,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
        },
        {
            id: "SR332-MICROWAVE-RFMICROWAVE-ISOLATOR_CIRCULATOR",
            name: "Isolator / Circulator",
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            g_fr: (args?: Record<string, any>) => {
                const ratedPower = args?.ratedPower || 0;
                return ratedPower >= 25 ? 4.38 : 1.76;
            },
            g_std: (args?: Record<string, any>) => {
                const ratedPower = args?.ratedPower || 0;
                return ratedPower >= 25 ? 1.66 : 1.02;
            },
            tempCurve: () => 1,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
        },
        {
            id: "SR332-MICROWAVE-RFMICROWAVE-SPLITTER/COMBINER",
            name: "Splitter/Combiner",
            mainCategory: TelcordiaMainCategories.MICROWAVE,
            g_fr: () => 0.60,
            g_std: () => 0.42,
            tempCurve: () => 1,
            elecCurve: () => 1,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMicrowaveSpecifications]
}

export const TelcordiaMicrowaveElement: TelcordiaCategory = {
    id: "SR332-MICROWAVE",
    name: "Microwave",
    mainCategory: TelcordiaMainCategories.MICROWAVE,
    subCategories: [TelcordiaMicrowave, TelcordiaRFMicrowave]
}