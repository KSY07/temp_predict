import { TelcordiaCategory } from "../sr332";
export type TelcordiaOptoElectronicSpecifications = {
    type: 'Single_LED' | 'Phototransistor' | 'Photodiode' | 'Single_Isolator_Photodiode' | 'Single_Isolator_Phototransistor' | 'Single_Isolator_LSR' | 'Dual_Isolator_Photodiode' | 'Dual_Isolator_Phototransistor' | 'Dual_Isolator_LSR' | 'DFB_Laser' | 'EML_Uncooled' | 'EML_Cooled' | 'CW_Laser_IC' | 'Pump_Laser_90mW' | 'Pump_Laser_150mW' | 'Pump_Laser_High' | 'Laser_Module_Controlled' | 'Laser_Module_Other' | 'LED_Module_Controlled' | 'LED_Module_Other' | 'Detector_Module_Controlled' | 'Detector_Module_Other' | 'PIN_Diode' | 'APD' | 'Transceiver_10G' | 'Transceiver_40G' | 'Transceiver_100G';
    outputPower?: number;
    dataRate?: number;
    environment?: 'Controlled' | 'Other';
};
export declare const TelcordiaOptoElectronic: TelcordiaCategory;
