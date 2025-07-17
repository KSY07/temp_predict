import { TelcordiaCategory, TelcordiaTempStressCurves, TelcordiaMainCategories } from "../sr332";
import { 
    TelcordiaMiscellaneousVibratorSpecifications,
    TelcordiaMiscellaneousCircuitBreakerSpecifications,
    TelcordiaMiscellaneousFuseSpecifications,
    TelcordiaMiscellaneousLampIncandescentSpecifications,
    TelcordiaMiscellaneousPowerModuleSpecifications,
    TelcordiaBasicSpecifications
} from "../specifications";

export const TelcordiaMiscellaneous: TelcordiaCategory = {
    id: "SR332-MISCELLANEOUS",
    name: "Miscellaneous",
    mainCategory: TelcordiaMainCategories.MISCELLANEOUS,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-VIBRATOR",
            name: "Vibrator",
            g_fr: (args?: Record<string, any>) => {
                const frequency = args?.frequency || 60;
                return frequency === 120 ? 10 : 5.1; // 120 Hz: 10, Others: 5.1
            },
            g_std: (args?: Record<string, any>) => {
                const frequency = args?.frequency || 60;
                return frequency === 120 ? 7.3 : 3.6; // 120 Hz: 7.3, Others: 3.6
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMiscellaneousVibratorSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-CIRCUIT-BREAKER",
            name: "Circuit Breaker",
            g_fr: (args?: Record<string, any>) => {
                const type = args?.type || 0; // 0: Protection-Only, 1: Power On/Off
                return type === 0 ? 26 : 130; // Protection-Only: 26, Power On/Off: 130
            },
            g_std: (args?: Record<string, any>) => {
                const type = args?.type || 0;
                return type === 0 ? 18 : 92; // Protection-Only: 18, Power On/Off: 92
            },
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMiscellaneousCircuitBreakerSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-FUSE",
            name: "Fuse",
            g_fr: () => 2.1,
            g_std: () => 1.5,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMiscellaneousFuseSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-LAMP-INCANDESCENT",
            name: "Lamp, Incandescent",
            g_fr: () => 610,
            g_std: () => 430,
            tempCurve: () => TelcordiaTempStressCurves._4,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMiscellaneousLampIncandescentSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.MISCELLANEOUS,
            id: "SR332-MISCELLANEOUS-POWER-MODULE",
            name: "Power Module",
            g_fr: (args?: Record<string, any>) => {
                const type = args?.type || 0; // 0: DC-DC Board Mounted, 1: AC/DC Power Supply
                return type === 0 ? 31 : 46; // DC-DC: 31, AC/DC: 46
            },
            g_std: (args?: Record<string, any>) => {
                const type = args?.type || 0;
                return type === 0 ? 22 : 33; // DC-DC: 22, AC/DC: 33
            },
            tempCurve: () => TelcordiaTempStressCurves._9,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaMiscellaneousPowerModuleSpecifications]
        }
    ]
}