import { IBOMComponent } from 'system_modeler_core/src/core/bom';

export enum PredictionStandard {
    TELCORDIA_SR_332 = 'TELCORDIA SR-332 Issue4',
    SIEMENS_SN29500 = 'SIEMENS_SN29500',
    MIL_STD_217F = 'Militarty Standard 217F',
    NSWC_10 = 'NSWC_10'
}

export enum ComponentClassification {
    MECHANICAL = 'MECHANICAL',
    ELECTRONIC = 'ELECTRONIC',
}

export interface Device {
    standard: PredictionStandard;
    type: ComponentClassification;
}

export abstract class ElectronicDevice implements Device {
    standard: PredictionStandard;
    type: ComponentClassification;

    constructor(standard:PredictionStandard) {
        this.standard = standard;
        this.type = ComponentClassification.ELECTRONIC;
    }
}

export abstract class MechanicalDevice implements Device {
    standard: PredictionStandard;
    type: ComponentClassification;

    constructor(standard:PredictionStandard) {
        this.standard = standard;
        this.type = ComponentClassification.MECHANICAL;
    }
}

export interface IPredictionResult {
    standard?: PredictionStandard;
    target: CalculateTargetLevel;
    failureRate: number;             // λ - Adjusted failure rate (failures/10^6 hours)
    std?: number;
    // mtbf: number;                    // Mean Time Between Failures (hours)
    // reliability: (time: number) => number;  // R(t) = e^(-λt)
    
    // Detailed results
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
    alias:string;
    units: R[];
    addUnit: (unit: R) => boolean;
    removeUnit: (unit: R) => boolean;
}

export interface IPredictionStandard<T extends IPredictionCategory> {
    readonly categories: T[];
    getCategories: () => T[];
    searchCategory: (id: string) => T;
}

export abstract class PredictionCtx<T extends IPredictionCategory, D extends IPredictionDevice<T>, U extends IPredictionUnit<T, D>, S extends IPredictionSystem<T,D,U>> {
    protected iDeviceCount: number;
    protected iUnitCount: number;
    protected iSystemCount: number;
    deviceList: D[];
    unitList: U[];
    systemList: S[];

    constructor() {
        this.iDeviceCount = 0;
        this.iUnitCount = 0;
        this.iSystemCount = 0;
        this.deviceList = [];
        this.unitList = [];
        this.systemList = [];
    }

    abstract createDevice: (category: T, unitId: string) => void;
    abstract createUnit: (systemId: string) => void;
    abstract createSystem: () => void;

    getDevice = (id: string): D | null => {
        let result: D[] = [];
        this.systemList.forEach((system) => {
            system.units.forEach((unit) => {
                result = unit.devices.filter((device) => device.id === id);
                if(result.length > 1)
                    throw new Error("Device Found 2 more (Id Error)");
            })
        });

        return result[0];
    };

    getUnit = (id: string): U | null => {
        let result: U[] = [];
        this.systemList.forEach((system) => {
            result = system.units.filter((unit) => unit.id === id);
            if(result.length > 1)
                throw new Error("Unit Found 2 more (Id Error)");
            
        });

        return result[0];
    };

    getSystem = (id: string): S | null => {
        const result = this.systemList.filter((system) => system.id === id);
        if (result.length > 1)
            throw new Error("System Found 2 more (Id Error)");
        return result[0];
    };

    getAll = () => {
        return this.systemList;
    };
}

export abstract class AbstractCalculator<T extends IPredictionCategory, D extends IPredictionDevice<T>, U extends IPredictionUnit<T,D>, S extends IPredictionSystem<T,D,U>, C extends PredictionCtx<T,D,U,S>> {
    protected prevSnapshots?: C[];
    protected currentCtx?: C;
    protected histories?: IPredictionResult[];
    
    constructor() {

    }

    getCtx = () => {
        return this.currentCtx;
    }

    setCtx = (ctx:C) => {
        if (this.currentCtx !== undefined) {
            this.prevSnapshots?.push(this.currentCtx);
        }

        this.currentCtx = ctx;
    }

    abstract calcDevice: (device:D) => IPredictionResult;
    abstract calcUnit: (unit:U) => IPredictionResult;
    abstract calcSystem: (system:S) => IPredictionResult;
    abstract calc: () => IPredictionResult;
}

export type CalculateTargetLevel = "device" | "unit" | "system";

// Extension interface for BOM components
export interface IBOMComponentWithPrediction extends IBOMComponent {
    predictionData?: {
        category?: Device;
        results?: Record<PredictionStandard, IPredictionResult>;
    };
}

export type ConstraintType = 'reCalc' | 'disabled';

export type SpecificationType = 'scalar' | 'flag' | 'options'

export type OptionType = {
    label: string,
    value: any,
}

export type SpecificationBase = {
    id: string,
    name: string,
    description: string,
    key: string,
    shortName?: string,
    engName?: string,
    shortEngName?: string,
    type: SpecificationType,
    initialValue?: any,
    unit?: string,
    options?: OptionType[],
    constraintType?: ConstraintType[],
    constraintKeys?: string[],
    constraintCallback?: {[key: string]: () => void} // handler for constraint
}