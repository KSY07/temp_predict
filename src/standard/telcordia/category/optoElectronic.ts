import { TelcordiaCategory, TelcordiaTempStressCurves, TelcordiaMainCategories } from "../sr332";
import { TelcordiaBasicSpecifications, TelcordiaOptoElectronicPumpLaserSpecification, TelcordiaOptoElectronicTransceiverSFPSpecification } from "../specifications";

export type TelcordiaOptoElectronicSpecifications = {
    type: 'Single_LED' | 'Phototransistor' | 'Photodiode' | 'Single_Isolator_Photodiode' | 'Single_Isolator_Phototransistor' | 'Single_Isolator_LSR' | 'Dual_Isolator_Photodiode' | 'Dual_Isolator_Phototransistor' | 'Dual_Isolator_LSR' | 'DFB_Laser' | 'EML_Uncooled' | 'EML_Cooled' | 'CW_Laser_IC' | 'Pump_Laser_90mW' | 'Pump_Laser_150mW' | 'Pump_Laser_High' | 'Laser_Module_Controlled' | 'Laser_Module_Other' | 'LED_Module_Controlled' | 'LED_Module_Other' | 'Detector_Module_Controlled' | 'Detector_Module_Other' | 'PIN_Diode' | 'APD' | 'Transceiver_10G' | 'Transceiver_40G' | 'Transceiver_100G';
    outputPower?: number; // for pump lasers
    dataRate?: number; // for transceivers (Gbps)
    environment?: 'Controlled' | 'Other';
}

export const TelcordiaOptoElectronic: TelcordiaCategory = {
    id: "SR332-OPTO-ELECTRONIC",
    name: "Opto-Electronic",
    mainCategory: TelcordiaMainCategories.OPTO_ELEC,
    subCategories: [
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PUMP-LASER",
            name: "Pump Laser",
            g_fr: (args?: Record<string, any>) => {
                const outputPower = args?.outputPower || 50; // mW
                if (outputPower <= 90) return 500;
                if (outputPower <= 150) return 900;
                return 1000;
            },
            g_std: (args?: Record<string, any>) => {
                const outputPower = args?.outputPower || 50; // mW
                if (outputPower <= 90) return 400;
                if (outputPower <= 150) return 730;
                return 810;
            },
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaOptoElectronicPumpLaserSpecification]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-TRANSCEIVER-SFP",
            name: "Transceiver SFP",
            g_fr: (args?: Record<string, any>) => {
                const dataRate = args?.dataRate || 5; // Gbps
                if (dataRate < 10) return 50;
                if (dataRate < 40) return 100;
                return 250;
            },
            g_std: (args?: Record<string, any>) => {
                const dataRate = args?.dataRate || 5; // Gbps
                if (dataRate < 10) return 20;
                if (dataRate < 40) return 35;
                return 170;
            },
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications, ...TelcordiaOptoElectronicTransceiverSFPSpecification]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-LED",
            name: "Single LED",
            g_fr: () => 0.25,
            g_std: () => 0.18,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PHOTOTRANSISTOR",
            name: "Phototransistor",
            g_fr: () => 31,
            g_std: () => 22,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PHOTODIODE",
            name: "Photodiode",
            g_fr: () => 7.7,
            g_std: () => 5.5,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-ISOLATOR-PHOTODIODE",
            name: "Single Isolator/Photodiode",
            g_fr: () => 5.1,
            g_std: () => 3.6,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-ISOLATOR-PHOTOTRANSISTOR",
            name: "Single Isolator/Phototransistor",
            g_fr: () => 2.1,
            g_std: () => 0.71,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-SINGLE-ISOLATOR-LSR",
            name: "Single Isolator/LSR",
            g_fr: () => 10,
            g_std: () => 7.3,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DUAL-ISOLATOR-PHOTODIODE",
            name: "Dual Isolator/Photodiode",
            g_fr: () => 10,
            g_std: () => 7.3,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DUAL-ISOLATOR-PHOTOTRANSISTOR",
            name: "Dual Isolator/Phototransistor",
            g_fr: () => 3.7,
            g_std: () => 2.9,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DUAL-ISOLATOR-LSR",
            name: "Dual Isolator/LSR",
            g_fr: () => 21,
            g_std: () => 15,
            tempCurve: () => TelcordiaTempStressCurves._10,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-DFB-LASER",
            name: "DFB Laser",
            g_fr: () => 100,
            g_std: () => 81,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-EML-UNCOOLED",
            name: "EML Uncooled",
            g_fr: () => 110,
            g_std: () => 89,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-EML-COOLED",
            name: "EML Cooled",
            g_fr: () => 300,
            g_std: () => 240,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-CW-LASER-IC",
            name: "CW Laser IC",
            g_fr: () => 150,
            g_std: () => 120,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-PIN-DIODE",
            name: "PIN Diode",
            g_fr: () => 150,
            g_std: () => 120,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        },
        {
            mainCategory: TelcordiaMainCategories.OPTO_ELEC,
            id: "SR332-OPTO-ELECTRONIC-APD",
            name: "APD",
            g_fr: () => 200,
            g_std: () => 160,
            tempCurve: () => TelcordiaTempStressCurves._7,
            elecCurve: () => 1,
            specificationList: [...TelcordiaBasicSpecifications]
        }
    ]
}