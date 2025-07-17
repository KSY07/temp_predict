import { TelcordiaCategory } from "../sr332";
export type TelcordiaRelaySpecifications = {
    type: 'General_Purpose' | 'Contactor' | 'Latching' | 'Reed' | 'Thermal_Bimetal' | 'Mercury' | 'Solid_State';
    contactCurrent?: number;
    ratedCurrent?: number;
};
export declare const TelcordiaRelay: TelcordiaCategory;
