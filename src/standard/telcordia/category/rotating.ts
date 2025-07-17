import { TelcordiaBasicSpecifications } from "../specifications";
import { TelcordiaCategory, TelcordiaTempStressCurves, TelcordiaMainCategories } from "../sr332";

// ROTATING DEVICES - Currently no specifications defined in specifications.ts
export const TelcordiaRotating: TelcordiaCategory = {
    id: "SR332-ROTATING",
    name: "Rotating Device",
    mainCategory: TelcordiaMainCategories.ROTATING,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.ROTATING,
            id: "SR332-ROTATING-MOTOR",
            name: "Motor",
            g_fr: () => 5.1, // Placeholder values - update when specifications are available
            g_std: () => 3.6,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
        },
        {
            mainCategory: TelcordiaMainCategories.ROTATING,
            id: "SR332-ROTATING-GENERATOR",
            name: "Generator",
            g_fr: () => 7.7,
            g_std: () => 5.5,
            tempCurve: () => TelcordiaTempStressCurves._3,
            elecCurve: () => 1,
        }
    ],
    specificationList: [...TelcordiaBasicSpecifications]
}