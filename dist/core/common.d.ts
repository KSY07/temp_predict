import { IBOMComponent } from 'system_modeler_core/src/core/bom';
export declare enum PredictionStandard {
    TELCORDIA_SR_332 = "TELCORDIA SR-332 Issue4",
    SIEMENS_SN29500 = "SIEMENS_SN29500",
    MIL_STD_217F = "Militarty Standard 217F",
    NSWC_10 = "NSWC_10"
}
export declare enum ComponentClassification {
    MECHANICAL = "MECHANICAL",
    ELECTRONIC = "ELECTRONIC"
}
export interface Device {
    standard: PredictionStandard;
    type: ComponentClassification;
}
export declare abstract class ElectronicDevice implements Device {
    standard: PredictionStandard;
    type: ComponentClassification;
    constructor(standard: PredictionStandard);
}
export declare abstract class MechanicalDevice implements Device {
    standard: PredictionStandard;
    type: ComponentClassification;
    constructor(standard: PredictionStandard);
}
export interface IPredictionResult {
    standard?: PredictionStandard;
    target: CalculateTargetLevel;
    failureRate: number;
    std?: number;
    details?: {
        calculationMethod?: string[];
        notes?: string[];
        warnings?: string[];
    };
}
export interface IPredictionCategory {
    readonly id: string;
    readonly name: string;
    readonly specificationList?: SpecificationBase[];
}
export interface IPredictionDevice<T extends IPredictionCategory> {
    readonly id: string;
    alias: string;
    category: T;
    specifications: Record<string, any>;
}
export interface IPredictionUnit<T extends IPredictionCategory, R extends IPredictionDevice<T>> {
    readonly id: string;
    alias: string;
    devices: R[];
    addDevice: (device: R) => boolean;
    removeDevice: (deviceId: string) => boolean;
}
export interface IPredictionSystem<T extends IPredictionCategory, K extends IPredictionDevice<T>, R extends IPredictionUnit<T, K>> {
    readonly id: string;
    alias: string;
    units: R[];
    addUnit: (unit: R) => boolean;
    removeUnit: (unit: R) => boolean;
}
export interface IPredictionStandard<T extends IPredictionCategory> {
    readonly categories: T[];
    getCategories: () => T[];
    searchCategory: (id: string) => T;
}
export declare abstract class PredictionCtx<T extends IPredictionCategory, D extends IPredictionDevice<T>, U extends IPredictionUnit<T, D>, S extends IPredictionSystem<T, D, U>> {
    protected iDeviceCount: number;
    protected iUnitCount: number;
    protected iSystemCount: number;
    deviceList: D[];
    unitList: U[];
    systemList: S[];
    constructor();
    abstract createDevice: (category: T, unitId: string) => void;
    abstract createUnit: (systemId: string) => void;
    abstract createSystem: () => void;
    getDevice: (id: string) => D | null;
    getUnit: (id: string) => U | null;
    getSystem: (id: string) => S | null;
    getAll: () => S[];
}
export declare abstract class AbstractCalculator<T extends IPredictionCategory, D extends IPredictionDevice<T>, U extends IPredictionUnit<T, D>, S extends IPredictionSystem<T, D, U>, C extends PredictionCtx<T, D, U, S>> {
    protected prevSnapshots?: C[];
    protected currentCtx?: C;
    protected histories?: IPredictionResult[];
    constructor();
    getCtx: () => C | undefined;
    setCtx: (ctx: C) => void;
    abstract calcDevice: (device: D) => IPredictionResult;
    abstract calcUnit: (unit: U) => IPredictionResult;
    abstract calcSystem: (system: S) => IPredictionResult;
    abstract calc: () => IPredictionResult;
}
export type CalculateTargetLevel = "device" | "unit" | "system";
export interface IBOMComponentWithPrediction extends IBOMComponent {
    predictionData?: {
        category?: Device;
        results?: Record<PredictionStandard, IPredictionResult>;
    };
}
export type ConstraintType = 'reCalc' | 'disabled';
export type SpecificationType = 'scalar' | 'flag' | 'options';
export type OptionType = {
    label: string;
    value: any;
};
export type SpecificationBase = {
    id: string;
    name: string;
    description: string;
    key: string;
    shortName?: string;
    engName?: string;
    shortEngName?: string;
    type: SpecificationType;
    initialValue?: any;
    unit?: string;
    options?: OptionType[];
    constraintType?: ConstraintType[];
    constraintKeys?: string[];
    constraintCallback?: {
        [key: string]: () => void;
    };
};
