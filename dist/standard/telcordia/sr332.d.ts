import { IPredictionSystem, IPredictionUnit } from '../../core/common';
import { ElectronicDevice, IPredictionCategory, IPredictionDevice, PredictionCtx } from "../../core/common";
export declare const BOLTZMANN_CONSTANT = 0.00008617;
export declare enum TelcordiaMainCategories {
    CAPACITOR = 0,
    CONNECTOR = 1,
    DIODE = 2,
    INDUCTOR = 3,
    IC = 4,
    MICROWAVE = 5,
    OPTO_ELEC = 6,
    RELAY = 7,
    RESISTOR = 8,
    SWITCH = 9,
    THERMISTOR = 10,
    TRANSISTOR = 11,
    MISCELLANEOUS = 12,
    ROTATING = 13
}
export interface TelcordiaCategory extends IPredictionCategory {
    readonly mainCategory: TelcordiaMainCategories;
    readonly subCategories?: TelcordiaCategory[];
    readonly g_fr?: (args?: Record<string, any>) => number;
    readonly g_std?: (args?: Record<string, any>) => number;
    readonly tempCurve?: (args?: Record<string, any>) => TelcordiaTempStressCurves | number;
    readonly elecCurve?: (args?: Record<string, any>) => TelcordiaElectricalStressCurves | number;
}
export interface TelcordiaDefaultSpecifications {
    tRef: number;
    tOp: number;
    eRef: number;
    eOp: number;
    qFactor: TelcordiaQualityFactor;
}
export declare class TelcordiaDevice extends ElectronicDevice implements IPredictionDevice<TelcordiaCategory> {
    readonly id: string;
    alias: string;
    category: TelcordiaCategory;
    specifications: Record<string, any>;
    integratingLaboratoryData?: IntegratingLaboratoryData;
    integratingFieldData?: IntegratingFieldData;
    burnInTime?: number;
    constructor(id: string, category: TelcordiaCategory);
}
export declare class TelcordiaUnit implements IPredictionUnit<TelcordiaCategory, TelcordiaDevice> {
    readonly id: string;
    alias: string;
    devices: TelcordiaDevice[];
    environmentFactor?: TelcordiaEnvironmentFactor;
    constructor(id: string);
    addDevice: (device: TelcordiaDevice) => boolean;
    removeDevice: (deviceId: string) => boolean;
}
export declare class TelcordiaSystem implements IPredictionSystem<TelcordiaCategory, TelcordiaDevice, TelcordiaUnit> {
    readonly id: string;
    alias: string;
    units: TelcordiaUnit[];
    constructor(id: string);
    addUnit: (unit: TelcordiaUnit) => boolean;
    removeUnit: (unit: TelcordiaUnit) => boolean;
}
export declare class TelcordiaPredictionCtx extends PredictionCtx<TelcordiaCategory, TelcordiaDevice, TelcordiaUnit, TelcordiaSystem> {
    method?: TelcordiaCalculationMethods;
    appliedUCL: boolean;
    appliedEarlyLife: boolean;
    confidenceLevel?: number;
    constructor();
    createDevice: (category: TelcordiaCategory, unitId: string) => TelcordiaDevice;
    createUnit: (systemId: string) => TelcordiaUnit;
    createSystem: () => TelcordiaSystem;
    setMethod(method: TelcordiaCalculationMethods): void;
}
export type IntegratingLaboratoryData = {
    numberOfDeviceFailures?: number;
    numberOfDevicesOnTest?: number;
    actualTimeOnTest?: number;
    laboratoryTestTemperatureFactor?: TelcordiaTempStressCurves;
    laboratoryTestQualityFactor?: TelcordiaQualityFactor;
    burnInTemperatureFactor?: TelcordiaTempStressCurves;
    deviceBurnInTime?: number;
};
export type IntegratingFieldData = {
    totalOperatingHours?: number;
    fieldFailureCount?: number;
    fieldEnvironmentFactor?: TelcordiaEnvironmentFactor;
    fieldFailureRate?: number;
    adjustmentFactor?: number;
};
export declare enum TelcordiaTempStressCurves {
    "_1" = 0.05,
    "_2" = 0.1,
    "_3" = 0.15,
    "_4" = 0.22,
    "_5" = 0.28,
    "_6" = 0.35,
    "_7" = 0.4,
    "_8" = 0.45,
    "_9" = 0.56,
    "_10" = 0.7
}
export declare enum TelcordiaElectricalStressCurves {
    "A" = 0.6,
    "B" = 0.9,
    "C" = 1.3,
    "D" = 1.9,
    "E" = 2.4,
    "F" = 2.9,
    "G" = 3.5,
    "H" = 4.1,
    "I" = 4.6,
    "J" = 5.9,
    "K" = 0.6
}
export type TelcordiaDevicePackagingType = 'Hermetic' | 'Non-Hermetic' | 'Other';
export type TelcordiaCalculationMethods = "METHOD_I" | "METHOD_II" | "METHOD_III";
export declare enum TelcordiaEnvironmentFactor {
    GROUND_FIXED_CONTROLLED = 1,
    GROUND_FIXED_UNCONTROLLED_LIMITED = 1.2,
    GROUND_FIXED_UNCONTROLLED_MODERATE = 1.5,
    GROUND_MOBILE = 2,
    AIRBONE_COMMERCIAL = 3,
    SPACE_BASED_COMMERCIAL = 0
}
export declare enum TelcordiaQualityFactor {
    LEVEL_0 = 6,
    LEVEL_1 = 3,
    LEVEL_2 = 1,
    LEVEL_3 = 0.8
}
export declare const calcTemperatureFactor: (tRef: number | undefined, tOp: number, curve: TelcordiaTempStressCurves) => number;
export declare const calcElecStressFactor: (eRef: number | undefined, eOp: number, curve: TelcordiaElectricalStressCurves, curve2?: TelcordiaElectricalStressCurves) => number;
