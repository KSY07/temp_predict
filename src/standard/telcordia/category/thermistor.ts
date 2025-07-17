import { TelcordiaBasicSpecifications } from "../specifications";
import { TelcordiaCategory, TelcordiaTempStressCurves, TelcordiaMainCategories } from "../sr332";

export type TelcordiaThermistorSpecifications = {
    type: 'Bead' | 'Disk' | 'Rod' | 'PPTC';
}

export const TelcordiaThermistor: TelcordiaCategory = {
    id: "SR332-THERMISTOR",
    name: "Thermistor",
    mainCategory: TelcordiaMainCategories.THERMISTOR,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-BEAD",
            name: "Bead",
            g_fr: () => 2.1,
            g_std: () => 1.5,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-DISK",
            name: "Disk",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-ROD",
            name: "Rod",
            g_fr: () => 7.7,
            g_std: () => 5.5,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        },
        {
            mainCategory: TelcordiaMainCategories.THERMISTOR,
            id: "SR332-THERMISTOR-PPTC",
            name: "PPTC",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications]
}