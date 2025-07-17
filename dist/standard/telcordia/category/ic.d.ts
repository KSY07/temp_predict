import { TelcordiaCategory } from "../sr332";
export type TelcordiaAnalogICSpecifications = {
    numberOfTransistors: number;
};
export type TelcordiaDigitalICSpecifications = {
    numberOfGates: number;
    technology: 'Bipolar' | 'NMOS' | 'CMOS';
};
export type TelcordiaRAMSpecifications = {
    densityMegabits: number;
    technology: 'Static_Bipolar' | 'Static_NMOS' | 'Static_CMOS' | 'Dynamic_NMOS' | 'Dynamic_CMOS';
};
export type TelcordiaROMSpecifications = {
    densityKilobits: number;
    technology: 'Bipolar' | 'NMOS' | 'CMOS';
};
export type TelcordiaMicroprocessorSpecifications = {
    numberOfGates?: number;
    busWidth?: number;
    technology: 'Bipolar' | 'NMOS' | 'CMOS';
};
export declare const TelcordiaAnalogIC: TelcordiaCategory;
export declare const TelcordiaDigitalIC: TelcordiaCategory;
export declare const TelcordiaRAM: TelcordiaCategory;
export declare const TelcordiaROM: TelcordiaCategory;
export declare const TelcordiaMicroprocessor: TelcordiaCategory;
export declare const TelcordiaICCategories: TelcordiaCategory;
