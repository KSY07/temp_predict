import { TelcordiaCategory } from "../sr332";
export type TelcordiaTransistorSpecifications = {
    powerRating: number;
    type: 'Silicon_NPN' | 'Silicon_PNP' | 'Germanium_NPN' | 'Germanium_PNP' | 'FET_Silicon_Linear' | 'FET_Switch' | 'FET_High_Frequency' | 'GaAs_Low_Noise' | 'GaAs_Driver' | 'pHEMT_Switch' | 'Unijunction' | 'Microwave_Pulse' | 'Microwave_CW' | 'RF_InGaP_GaAS_SiGe_HBT' | 'RF_LDMOS';
    dissipatedPower?: number;
};
export declare const TelcordiaTransistor: TelcordiaCategory;
