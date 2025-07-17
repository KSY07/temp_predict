import { TelcordiaCategory } from '../sr332';
export type TelcordiaSwitchSpecifications = {
    type: 'Pushbutton' | 'Toggle' | 'Rocker_Slide' | 'Rotary';
    numberOfPoles: number;
    numberOfThrows: number;
    contactCurrent?: number;
    ratedCurrent?: number;
};
export declare const TelcordiaSwitch: TelcordiaCategory;
