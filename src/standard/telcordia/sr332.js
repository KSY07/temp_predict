"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcElecStressFactor = exports.calcTemperatureFactor = exports.TelcordiaQualityFactor = exports.TelcordiaEnvironmentFactor = exports.TelcordiaElectricalStressCurves = exports.TelcordiaTempStressCurves = exports.TelcordiaPredictionCtx = exports.TelcordiaSystem = exports.TelcordiaUnit = exports.TelcordiaDevice = exports.TelcordiaMainCategories = exports.BOLTZMANN_CONSTANT = void 0;
const common_1 = require("../../core/common");
exports.BOLTZMANN_CONSTANT = 8.617e-5;
var TelcordiaMainCategories;
(function (TelcordiaMainCategories) {
    TelcordiaMainCategories[TelcordiaMainCategories["CAPACITOR"] = 0] = "CAPACITOR";
    TelcordiaMainCategories[TelcordiaMainCategories["CONNECTOR"] = 1] = "CONNECTOR";
    TelcordiaMainCategories[TelcordiaMainCategories["DIODE"] = 2] = "DIODE";
    TelcordiaMainCategories[TelcordiaMainCategories["INDUCTOR"] = 3] = "INDUCTOR";
    TelcordiaMainCategories[TelcordiaMainCategories["IC"] = 4] = "IC";
    TelcordiaMainCategories[TelcordiaMainCategories["MICROWAVE"] = 5] = "MICROWAVE";
    TelcordiaMainCategories[TelcordiaMainCategories["OPTO_ELEC"] = 6] = "OPTO_ELEC";
    TelcordiaMainCategories[TelcordiaMainCategories["RELAY"] = 7] = "RELAY";
    TelcordiaMainCategories[TelcordiaMainCategories["RESISTOR"] = 8] = "RESISTOR";
    TelcordiaMainCategories[TelcordiaMainCategories["SWITCH"] = 9] = "SWITCH";
    TelcordiaMainCategories[TelcordiaMainCategories["THERMISTOR"] = 10] = "THERMISTOR";
    TelcordiaMainCategories[TelcordiaMainCategories["TRANSISTOR"] = 11] = "TRANSISTOR";
    TelcordiaMainCategories[TelcordiaMainCategories["MISCELLANEOUS"] = 12] = "MISCELLANEOUS";
    TelcordiaMainCategories[TelcordiaMainCategories["ROTATING"] = 13] = "ROTATING";
})(TelcordiaMainCategories || (exports.TelcordiaMainCategories = TelcordiaMainCategories = {}));
;
class TelcordiaDevice extends common_1.ElectronicDevice {
    constructor(id, category) {
        super(common_1.PredictionStandard.TELCORDIA_SR_332);
        this.id = id;
        this.alias = "";
        this.type = common_1.ComponentClassification.ELECTRONIC;
        this.category = category;
        this.specifications = {};
    }
}
exports.TelcordiaDevice = TelcordiaDevice;
class TelcordiaUnit {
    constructor(id) {
        this.addDevice = (device) => {
            if (this.devices.filter((d) => d.id === device.id).length > 0) {
                return false;
            }
            this.devices.push(device);
            return true;
        };
        this.removeDevice = (deviceId) => {
            const initialLength = this.devices.length;
            this.devices = this.devices.filter(d => d.id !== deviceId);
            return this.devices.length < initialLength;
        };
        this.id = id;
        this.alias = "";
        this.devices = [];
    }
}
exports.TelcordiaUnit = TelcordiaUnit;
class TelcordiaSystem {
    constructor(id) {
        this.addUnit = (unit) => {
            if (this.units.filter((u) => u.id === unit.id).length > 0) {
                return false;
            }
            this.units.push(unit);
            return true;
        };
        this.removeUnit = (unit) => {
            const initialLength = this.units.length;
            this.units = this.units.filter(u => u.id !== unit.id);
            return this.units.length < initialLength;
        };
        this.id = id;
        this.alias = "";
        this.units = [];
    }
}
exports.TelcordiaSystem = TelcordiaSystem;
class TelcordiaPredictionCtx extends common_1.PredictionCtx {
    constructor() {
        super();
        this.appliedUCL = false;
        this.appliedEarlyLife = false;
        this.createDevice = (category, unitId) => {
            const device = new TelcordiaDevice(`unit_${this.iDeviceCount + 1}`, category);
            this.iDeviceCount++;
            this.deviceList.push(device);
            if (unitId !== undefined) {
                if (!this.getUnit(unitId)?.addDevice(device)) {
                    this.deviceList.pop();
                    this.iDeviceCount--;
                    throw new Error("Id Error");
                }
                ;
            }
            ;
            return device;
        };
        this.createUnit = (ids) => {
            const unit = new TelcordiaUnit(`unit_${this.iUnitCount + 1}`);
            this.iUnitCount++;
            this.unitList.push(unit);
            if (ids) {
                ids.forEach(deviceId => {
                    const device = this.deviceList.find(d => d.id === deviceId);
                    if (device) {
                        unit.addDevice(device);
                    }
                });
            }
            return unit;
        };
        this.createSystem = (ids) => {
            const system = new TelcordiaSystem(`system_${this.iSystemCount + 1}`);
            this.iSystemCount++;
            this.systemList.push(system);
            if (ids) {
                ids.forEach(unitId => {
                    const unit = this.unitList.find(u => u.id === unitId);
                    if (unit) {
                        system.addUnit(unit);
                    }
                });
            }
            return system;
        };
        this.method = "METHOD_I";
    }
    setMethod(method) {
        this.method = method;
    }
}
exports.TelcordiaPredictionCtx = TelcordiaPredictionCtx;
var TelcordiaTempStressCurves;
(function (TelcordiaTempStressCurves) {
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_1"] = 0.05] = "_1";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_2"] = 0.1] = "_2";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_3"] = 0.15] = "_3";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_4"] = 0.22] = "_4";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_5"] = 0.28] = "_5";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_6"] = 0.35] = "_6";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_7"] = 0.4] = "_7";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_8"] = 0.45] = "_8";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_9"] = 0.56] = "_9";
    TelcordiaTempStressCurves[TelcordiaTempStressCurves["_10"] = 0.7] = "_10";
})(TelcordiaTempStressCurves || (exports.TelcordiaTempStressCurves = TelcordiaTempStressCurves = {}));
var TelcordiaElectricalStressCurves;
(function (TelcordiaElectricalStressCurves) {
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["A"] = 0.6] = "A";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["B"] = 0.9] = "B";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["C"] = 1.3] = "C";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["D"] = 1.9] = "D";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["E"] = 2.4] = "E";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["F"] = 2.9] = "F";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["G"] = 3.5] = "G";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["H"] = 4.1] = "H";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["I"] = 4.6] = "I";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["J"] = 5.9] = "J";
    TelcordiaElectricalStressCurves[TelcordiaElectricalStressCurves["K"] = 0.6] = "K";
})(TelcordiaElectricalStressCurves || (exports.TelcordiaElectricalStressCurves = TelcordiaElectricalStressCurves = {}));
var TelcordiaEnvironmentFactor;
(function (TelcordiaEnvironmentFactor) {
    TelcordiaEnvironmentFactor[TelcordiaEnvironmentFactor["GROUND_FIXED_CONTROLLED"] = 1] = "GROUND_FIXED_CONTROLLED";
    TelcordiaEnvironmentFactor[TelcordiaEnvironmentFactor["GROUND_FIXED_UNCONTROLLED_LIMITED"] = 1.2] = "GROUND_FIXED_UNCONTROLLED_LIMITED";
    TelcordiaEnvironmentFactor[TelcordiaEnvironmentFactor["GROUND_FIXED_UNCONTROLLED_MODERATE"] = 1.5] = "GROUND_FIXED_UNCONTROLLED_MODERATE";
    TelcordiaEnvironmentFactor[TelcordiaEnvironmentFactor["GROUND_MOBILE"] = 2] = "GROUND_MOBILE";
    TelcordiaEnvironmentFactor[TelcordiaEnvironmentFactor["AIRBONE_COMMERCIAL"] = 3] = "AIRBONE_COMMERCIAL";
    TelcordiaEnvironmentFactor[TelcordiaEnvironmentFactor["SPACE_BASED_COMMERCIAL"] = 0] = "SPACE_BASED_COMMERCIAL";
})(TelcordiaEnvironmentFactor || (exports.TelcordiaEnvironmentFactor = TelcordiaEnvironmentFactor = {}));
var TelcordiaQualityFactor;
(function (TelcordiaQualityFactor) {
    TelcordiaQualityFactor[TelcordiaQualityFactor["LEVEL_0"] = 6] = "LEVEL_0";
    TelcordiaQualityFactor[TelcordiaQualityFactor["LEVEL_1"] = 3] = "LEVEL_1";
    TelcordiaQualityFactor[TelcordiaQualityFactor["LEVEL_2"] = 1] = "LEVEL_2";
    TelcordiaQualityFactor[TelcordiaQualityFactor["LEVEL_3"] = 0.8] = "LEVEL_3";
})(TelcordiaQualityFactor || (exports.TelcordiaQualityFactor = TelcordiaQualityFactor = {}));
const calcTemperatureFactor = (tRef = 40, tOp, curve) => {
    const tRefK = tRef + 273.15;
    const tOpK = tOp + 273.15;
    return Math.exp((curve / exports.BOLTZMANN_CONSTANT) * (1 / tRefK - 1 / tOpK));
};
exports.calcTemperatureFactor = calcTemperatureFactor;
const calcElecStressFactor = (eRef = 0.5, eOp, curve, curve2) => {
    if (curve2 !== undefined) {
        return ((0, exports.calcElecStressFactor)(eRef, eOp, curve) *
            (0, exports.calcElecStressFactor)(eRef, eOp, curve2));
    }
    return Math.exp(curve * (eOp - eRef));
};
exports.calcElecStressFactor = calcElecStressFactor;
