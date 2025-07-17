"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaCalculator = void 0;
const common_1 = require("../../core/common");
//@ts-ignore
const jstat_1 = require("jstat");
const sr332_1 = require("./sr332");
// Helper functions for safe specification access
const getSpecValue = (device, key, defaultValue = 0) => {
    return device.specifications?.[key] ?? defaultValue;
};
const getTemperatureRef = (device) => getSpecValue(device, 'tRef', 40);
const getTemperatureOp = (device) => getSpecValue(device, 'tOp', 25);
const getElecStressRef = (device) => getSpecValue(device, 'eRef', 0.5);
const getElecStressOp = (device) => getSpecValue(device, 'eOp', 0.5);
const getQualityFactor = (device) => getSpecValue(device, 'qFactor', sr332_1.TelcordiaQualityFactor.LEVEL_2);
const getQuantity = (device) => getSpecValue(device, 'quantity', 1);
// Validation functions
const validateDevice = (device) => {
    if (!device.category) {
        throw new Error("Device category is required");
    }
    if (!device.category.g_fr || !device.category.g_std) {
        throw new Error("Device category must have failure rate functions");
    }
};
class TelcordiaCalculator extends common_1.AbstractCalculator {
    calcDevice = (device) => {
        if (!this.currentCtx?.method) {
            throw new Error("Calculation method not set");
        }
        if (this.currentCtx?.method === "METHOD_I") {
            switch (device.category.mainCategory) {
                case sr332_1.TelcordiaMainCategories.CAPACITOR:
                    return this.applyUCL(CapacitorDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.CONNECTOR:
                    return this.applyUCL(ConnectorDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.DIODE:
                    return this.applyUCL(DiodeDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.INDUCTOR:
                    return this.applyUCL(InductorDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.IC:
                    return this.applyUCL(ICDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.MICROWAVE:
                    return this.applyUCL(MicrowaveDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.OPTO_ELEC:
                    return this.applyUCL(OptoElecDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.RELAY:
                    return this.applyUCL(RelayDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.RESISTOR:
                    return this.applyUCL(ResistorDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.SWITCH:
                    return this.applyUCL(SwitchDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.THERMISTOR:
                    return this.applyUCL(ThermistorDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.TRANSISTOR:
                    return this.applyUCL(TransistorDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.MISCELLANEOUS:
                    return this.applyUCL(MiscellaneousDeviceCalculator(device));
                case sr332_1.TelcordiaMainCategories.ROTATING:
                    return this.applyUCL(RotatingDeviceCalculator(device));
                default:
                    throw new Error("Not Validate Category");
            }
        }
        else if (this.currentCtx?.method === "METHOD_II") {
            //@ts-ignore
            let result_method_1 = {};
            switch (device.category.mainCategory) {
                case sr332_1.TelcordiaMainCategories.CAPACITOR:
                    result_method_1 = CapacitorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.CONNECTOR:
                    result_method_1 = ConnectorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.DIODE:
                    result_method_1 = DiodeDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.INDUCTOR:
                    result_method_1 = InductorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.IC:
                    result_method_1 = ICDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.MICROWAVE:
                    result_method_1 = MicrowaveDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.OPTO_ELEC:
                    result_method_1 = OptoElecDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.RELAY:
                    result_method_1 = RelayDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.RESISTOR:
                    result_method_1 = ResistorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.SWITCH:
                    result_method_1 = SwitchDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.THERMISTOR:
                    result_method_1 = ThermistorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.TRANSISTOR:
                    result_method_1 = TransistorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.MISCELLANEOUS:
                    result_method_1 = MiscellaneousDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.ROTATING:
                    result_method_1 = RotatingDeviceCalculator(device);
                    break;
                default:
                    throw new Error("Not Validate Category");
            }
            if (device.integratingLaboratoryData !== undefined) {
                const burnInTime = device.burnInTime;
                const effectiveTime = device.integratingLaboratoryData.actualTimeOnTest
                    * ((0, sr332_1.calcTemperatureFactor)(device.specifications.tRef, device.specifications.tOp, device.integratingLaboratoryData.laboratoryTestTemperatureFactor));
                if (burnInTime === undefined || burnInTime === 0) {
                    // 3.2.1 When Laboratory Test Devices Had No Previous Burn-in
                    if (effectiveTime <= 10000) {
                        const a = 2 + (4 * 10e-6 *
                            device.integratingLaboratoryData.numberOfDevicesOnTest *
                            (Math.pow(effectiveTime, 0.25) * (result_method_1.failureRate) *
                                device.integratingLaboratoryData.laboratoryTestQualityFactor));
                        result_method_1.failureRate = result_method_1.failureRate * (2 + device.integratingLaboratoryData.numberOfDeviceFailures) / a;
                        result_method_1.std = result_method_1.std * (2 + device.integratingLaboratoryData.numberOfDeviceFailures) / a;
                        result_method_1.details?.notes?.push(`Method II: {isBurnIn: false, effectiveTime: ${effectiveTime}, numberOfFailure: ${device.integratingLaboratoryData.numberOfDeviceFailures}, failureRate: ${result_method_1.failureRate}, std: ${result_method_1.std}}`);
                    }
                    else {
                        const a = 2 + (4 * 10e-6 *
                            device.integratingLaboratoryData.numberOfDevicesOnTest *
                            (effectiveTime + 30000) * (result_method_1.failureRate) *
                            device.integratingLaboratoryData.laboratoryTestQualityFactor);
                        result_method_1.failureRate = result_method_1.failureRate * (2 + device.integratingLaboratoryData.numberOfDeviceFailures) / a;
                        result_method_1.std = result_method_1.std * (2 + device.integratingLaboratoryData.numberOfDeviceFailures) / a;
                        result_method_1.details?.notes?.push(`Method II: {isBurnIn: false, effectiveTime: ${effectiveTime}, numberOfFailure: ${device.integratingLaboratoryData.numberOfDeviceFailures}, failureRate: ${result_method_1.failureRate}, std: ${result_method_1.std}}`);
                    }
                }
                else {
                    const a = 2 + (4 * 10e-6 *
                        device.integratingLaboratoryData.numberOfDevicesOnTest *
                        (effectiveTime / 4000) * (result_method_1.failureRate) *
                        device.integratingLaboratoryData.laboratoryTestQualityFactor);
                    result_method_1.failureRate = result_method_1.failureRate * (2 + device.integratingLaboratoryData.numberOfDeviceFailures) / a;
                    result_method_1.std = result_method_1.std * (2 + device.integratingLaboratoryData.numberOfDeviceFailures) / a;
                    result_method_1.details?.notes?.push(`Method II: {isBurnIn: true, effectiveTime: ${effectiveTime}, numberOfFailure: ${device.integratingLaboratoryData.numberOfDeviceFailures}, failureRate: ${result_method_1.failureRate}, std: ${result_method_1.std}}`);
                }
            }
            return this.applyUCL(result_method_1);
        }
        else if (this.currentCtx?.method === "METHOD_III") {
            //@ts-ignore
            let result_method_1 = {};
            switch (device.category.mainCategory) {
                case sr332_1.TelcordiaMainCategories.CAPACITOR:
                    result_method_1 = CapacitorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.CONNECTOR:
                    result_method_1 = ConnectorDeviceCalculator(device);
                case sr332_1.TelcordiaMainCategories.DIODE:
                    result_method_1 = DiodeDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.INDUCTOR:
                    result_method_1 = InductorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.IC:
                    result_method_1 = ICDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.MICROWAVE:
                    result_method_1 = MicrowaveDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.OPTO_ELEC:
                    result_method_1 = OptoElecDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.RELAY:
                    result_method_1 = RelayDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.RESISTOR:
                    result_method_1 = ResistorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.SWITCH:
                    result_method_1 = SwitchDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.THERMISTOR:
                    result_method_1 = ThermistorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.TRANSISTOR:
                    result_method_1 = TransistorDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.MISCELLANEOUS:
                    result_method_1 = MiscellaneousDeviceCalculator(device);
                    break;
                case sr332_1.TelcordiaMainCategories.ROTATING:
                    result_method_1 = RotatingDeviceCalculator(device);
                    break;
                default:
            }
            if (device.integratingFieldData !== undefined) {
                const b = (2 / result_method_1.failureRate) +
                    (device.integratingFieldData.adjustmentFactor *
                        device.integratingFieldData.totalOperatingHours *
                        device.integratingFieldData.fieldEnvironmentFactor
                        / 10e9);
                result_method_1.failureRate = (2 + device.integratingFieldData.fieldFailureCount) / b;
                result_method_1.std = (Math.pow(2 + device.integratingFieldData.fieldFailureCount, 0.5)) / b;
                result_method_1.details?.notes?.push(`Method III: {adjustmentFactor: ${device.integratingFieldData.adjustmentFactor}, fieldFailureCount: ${device.integratingFieldData.fieldFailureCount}, failureRate: ${result_method_1.failureRate}, std: ${result_method_1.std}}`);
            }
            return this.applyUCL(result_method_1);
        }
        throw new Error("Unsupported Method");
    };
    calcUnit = (unit) => {
        let totalFailureRate = 0;
        let totalStd = 0;
        const deviceResults = [];
        unit.devices.forEach(device => {
            const deviceResult = this.calcDevice(device);
            deviceResults.push(deviceResult);
            totalFailureRate += deviceResult.failureRate;
            totalStd += deviceResult.std || 0;
        });
        // Apply environment factor if available
        if (unit.environmentFactor) {
            totalFailureRate *= unit.environmentFactor;
            totalStd = Math.pow(totalStd, 0.5) * unit.environmentFactor;
        }
        return this.applyUCL({
            standard: common_1.PredictionStandard.TELCORDIA_SR_332,
            target: 'unit',
            failureRate: totalFailureRate,
            std: totalStd,
            details: {
                calculationMethod: [this.currentCtx?.method || 'METHOD_I'],
                notes: [`Total devices: ${unit.devices.length}`, `Environment factor: ${unit.environmentFactor || 1}`]
            }
        });
    };
    calcSystem = (system) => {
        let totalFailureRate = 0;
        let totalStd = 0;
        const unitResults = [];
        system.units.forEach(unit => {
            const unitResult = this.calcUnit(unit);
            unitResults.push(unitResult);
            totalFailureRate += unitResult.failureRate;
            totalStd += unitResult.std || 0;
        });
        return this.applyUCL({
            standard: common_1.PredictionStandard.TELCORDIA_SR_332,
            target: 'system',
            failureRate: totalFailureRate,
            std: totalStd,
            details: {
                calculationMethod: [this.currentCtx?.method || 'METHOD_I'],
                notes: [`Total units: ${system.units.length}`, `System ID: ${system.id}`]
            }
        });
    };
    calc = () => {
        if (!this.currentCtx) {
            throw new Error("No prediction context set");
        }
        let totalFailureRate = 0;
        let totalStd = 0;
        const systemResults = [];
        this.currentCtx.systemList.forEach(system => {
            const systemResult = this.calcSystem(system);
            systemResults.push(systemResult);
            totalFailureRate += systemResult.failureRate;
            totalStd += systemResult.std || 0;
        });
        // Apply UCL (Upper Confidence Limit) if requested
        if (this.currentCtx.appliedUCL && this.currentCtx.confidenceLevel) {
            // Simplified UCL calculation - actual implementation would be more complex
            const uclFactor = 1 + (this.currentCtx.confidenceLevel / 100);
            totalFailureRate *= uclFactor;
        }
        return {
            standard: common_1.PredictionStandard.TELCORDIA_SR_332,
            target: 'system',
            failureRate: totalFailureRate,
            std: totalStd,
            details: {
                calculationMethod: [this.currentCtx.method || 'METHOD_I'],
                notes: [
                    `Total systems: ${this.currentCtx.systemList.length}`,
                    `UCL applied: ${this.currentCtx.appliedUCL}`,
                    `Early life applied: ${this.currentCtx.appliedEarlyLife}`
                ]
            }
        };
    };
    applyEarlyLife() {
    }
    applyUCL(result) {
        if (this.currentCtx?.appliedUCL) {
            const kappa = Math.pow(result.failureRate / result.std, 2);
            const theta = Math.pow(result.std, 2) / result.failureRate;
            let lambda = 0;
            if (kappa >= 100) {
                lambda = jstat_1.jStat.normal.inv(this.currentCtx?.confidenceLevel, result.failureRate, result.std);
            }
            else {
                lambda = jstat_1.jStat.gamma.inv(this.currentCtx?.confidenceLevel, kappa, theta);
            }
            result.failureRate = lambda;
            result.details?.notes?.push(`UCL Applied: {Confidence Level: ${this.currentCtx?.confidenceLevel * 100}%, FailureRate: ${result.failureRate}}`);
        }
        return result;
    }
}
exports.TelcordiaCalculator = TelcordiaCalculator;
const CapacitorDeviceCalculator = (device) => {
    validateDevice(device);
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(getTemperatureRef(device), getTemperatureOp(device), device.category.tempCurve?.());
    const appliedDCVoltage = getSpecValue(device, 'appliedDCVoltage', 0);
    const acPeakVoltage = getSpecValue(device, 'acPeakVoltage', 0);
    const ratedVoltage = getSpecValue(device, 'ratedVoltage', 1);
    const eOp = (appliedDCVoltage + acPeakVoltage) / ratedVoltage;
    const eSFactor = (0, sr332_1.calcElecStressFactor)(getElecStressRef(device), eOp, device.category.elecCurve?.());
    const qFactor = getQualityFactor(device);
    const quantity = getQuantity(device);
    const failureRate = g_fr * tSFactor * eSFactor * qFactor * quantity;
    const std = g_std * tSFactor * eSFactor * qFactor * quantity;
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [
                `Base failure rate: ${g_fr}`,
                `Temperature factor: ${tSFactor}`,
                `Electrical stress factor: ${eSFactor}`,
                `Quality factor: ${qFactor}`,
                `Quantity: ${quantity}`
            ]
        }
    };
};
const ConnectorDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    // Connectors have πS = 1 (no electrical stress factor)
    const failureRate = g_fr * tSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Quality factor: ${device.specifications?.qFactor}`, `Pin count: ${device.specifications?.pins || 'default'}`]
        }
    };
};
const DiodeDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eOp = device.specifications?.ratedCurrent ? (device.specifications?.ratedCurrent / device.specifications?.ratedVoltage) : device.specifications?.eOp || 0.5;
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`]
        }
    };
};
const InductorDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`]
        }
    };
};
const ICDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`, `Technology: ${device.specifications?.technology || 'default'}`]
        }
    };
};
const MicrowaveDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`]
        }
    };
};
const OptoElecDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`]
        }
    };
};
const RelayDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`, `Contact current: ${device.specifications?.contactCurrent || 'default'}`]
        }
    };
};
const ResistorDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eOp = device.specifications?.appliedPower && device.specifications?.ratedPower ?
        device.specifications.appliedPower / device.specifications.ratedPower :
        device.specifications?.eOp || 0.5;
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`, `Resistance: ${device.specifications?.resistance || 'default'}`]
        }
    };
};
const SwitchDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`, `Poles: ${device.specifications?.poles || 'default'}`, `Throws: ${device.specifications?.throws || 'default'}`]
        }
    };
};
const ThermistorDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`]
        }
    };
};
const TransistorDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eOp = device.specifications?.dissipatedPower && device.specifications?.ratedPower ?
        device.specifications.dissipatedPower / device.specifications.ratedPower :
        device.specifications?.eOp || 0.5;
    const eSFactor = (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, eOp, device.category.elecCurve?.());
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`, `Dissipated power: ${device.specifications?.dissipatedPower || 'default'}`]
        }
    };
};
const MiscellaneousDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = device.category.elecCurve ?
        (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve()) : 1;
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`]
        }
    };
};
const RotatingDeviceCalculator = (device) => {
    const g_fr = device.category.g_fr?.(device.specifications);
    const g_std = device.category.g_std?.(device.specifications);
    const tSFactor = (0, sr332_1.calcTemperatureFactor)(device.specifications?.tRef, device.specifications?.tOp, device.category.tempCurve?.());
    const eSFactor = device.category.elecCurve ?
        (0, sr332_1.calcElecStressFactor)(device.specifications?.eRef, device.specifications?.eOp, device.category.elecCurve()) : 1;
    const failureRate = g_fr * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    const std = g_std * tSFactor * eSFactor * device.specifications?.qFactor * (device.specifications?.quantity || 1);
    return {
        standard: common_1.PredictionStandard.TELCORDIA_SR_332,
        target: 'device',
        failureRate,
        std,
        details: {
            calculationMethod: ['METHOD_I'],
            notes: [`Base failure rate: ${g_fr}`, `Temperature factor: ${tSFactor}`, `Electrical stress factor: ${eSFactor}`, `Quality factor: ${device.specifications?.qFactor}`]
        }
    };
};
