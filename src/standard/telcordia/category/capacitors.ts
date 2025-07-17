import { TelcordiaCategory, TelcordiaElectricalStressCurves, TelcordiaTempStressCurves, TelcordiaMainCategories } from "../sr332";
import { TelcordiaBasicSpecifications, TelcordiaCapacitorSpecification } from "../specifications";

export const TelcordiaFixedCapacitor: TelcordiaCategory = {
    id: "SR332-CAPACITOR-FIXED",
    name: "FIXED",
    mainCategory: TelcordiaMainCategories.CAPACITOR,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-PAPER",
            name: "Paper",
            g_fr: () => 5.1,  // λG from Table 8-1
            g_std: () => 3.6, // σG from Table 8-1
            tempCurve: () => TelcordiaTempStressCurves._2,
            elecCurve: () => TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-PAPER_PLASTIC",
            name: "Paper/Plastic",
            g_fr: () => 0.76,
            g_std: () => 0.24,
            tempCurve: () => TelcordiaTempStressCurves._2,
            elecCurve: () => TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-PLASTIC",
            name: "Plastic",
            g_fr: () => 0.46,
            g_std: () => 0.13,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-MICA",
            name: "Mica",
            g_fr: () => 0.44,
            g_std: () => 0.30,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.G,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-GLASS",
            name: "Glass",
            g_fr: () => 0.55,
            g_std: () => 0.33,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.G,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-CERAMIC",
            name: "Ceramic",
            g_fr: () => 0.10,
            g_std: () => 0.01,
            tempCurve: () => TelcordiaTempStressCurves._1,
            elecCurve: () => TelcordiaElectricalStressCurves.H,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-TANTALUM_SOLID",
            name: "Tantalum, Solid",
            g_fr: (args?: Record<string, any>) => {
                if(args?.packaging === 'Hermetic')
                    return 0.95;
                return 0.19;
            },
            g_std: (args?: Record<string, any>) => {
                if(args?.packaging === 'Hermetic')
                    return 0.23;
                return 0.13;
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-ALUMINUM_ELECTROLYTIC",
            name: "Aluminum, Electrolytic",
            g_fr: (args?: Record<string, any>) => {
                const capacitance = args?.capacitance || 0;
                return capacitance < 400 ? 0.73 : 1.5; // < 400 μF: 0.73, ≥ 400 μF: 1.5
            },
            g_std: (args?: Record<string, any>) => {
                const capacitance = args?.capacitance || 0;
                return capacitance < 400 ? 0.17 : 0.5; // < 400 μF: 0.17, ≥ 400 μF: 0.5
            },
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.E,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-SILICON_CHIP",
            name: "Silicon Chip",
            g_fr: () => 1.0,
            g_std: () => 4.4,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.G,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-FIXED-MOS_CHIP",
            name: "MOS or Chip",
            g_fr: () => 0.41,
            g_std: () => 0.19,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => TelcordiaElectricalStressCurves.G,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaCapacitorSpecification]
}

export const TelcordiaVariableCapacitor: TelcordiaCategory = {
    id: "SR332-CAPACITOR-VARIABLE",
    name: "VARIABLE",
    mainCategory: TelcordiaMainCategories.CAPACITOR,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-AIR_TRIMMER",
            name: "Air, Trimmer",
            g_fr: () => 8.0,
            g_std: () => 3.8,
            tempCurve: () => TelcordiaTempStressCurves._5,
            elecCurve: () => TelcordiaElectricalStressCurves.H,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-CERAMIC",
            name: "Ceramic",
            g_fr: () => 4.0,
            g_std: () => 1.9,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => TelcordiaElectricalStressCurves.J,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-PISTON_GLASS",
            name: "Piston, Glass",
            g_fr: () => 1.5,
            g_std: () => 1.1,
            tempCurve: () => TelcordiaTempStressCurves._5,
            elecCurve: () => TelcordiaElectricalStressCurves.H,
        },
        {
            mainCategory: TelcordiaMainCategories.CAPACITOR,
            id: "SR332-CAPACITOR-VARIABLE-VACUUM",
            name: "Vacuum",
            g_fr: () => 13,
            g_std: () => 9.1,
            tempCurve: () => TelcordiaTempStressCurves._2,
            elecCurve: () => TelcordiaElectricalStressCurves.I,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications , ...TelcordiaCapacitorSpecification]
}

export const TelcordiaCapacitor: TelcordiaCategory = {
    id: "SR332-CAPACITOR",
    name: "Capacitor",
    mainCategory: TelcordiaMainCategories.CAPACITOR,
    subCategories: [TelcordiaFixedCapacitor, TelcordiaVariableCapacitor]
}