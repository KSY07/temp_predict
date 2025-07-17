"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCalculator = exports.PredictionCtx = exports.MechanicalDevice = exports.ElectronicDevice = exports.ComponentClassification = exports.PredictionStandard = void 0;
var PredictionStandard;
(function (PredictionStandard) {
    PredictionStandard["TELCORDIA_SR_332"] = "TELCORDIA SR-332 Issue4";
    PredictionStandard["SIEMENS_SN29500"] = "SIEMENS_SN29500";
    PredictionStandard["MIL_STD_217F"] = "Militarty Standard 217F";
    PredictionStandard["NSWC_10"] = "NSWC_10";
})(PredictionStandard || (exports.PredictionStandard = PredictionStandard = {}));
var ComponentClassification;
(function (ComponentClassification) {
    ComponentClassification["MECHANICAL"] = "MECHANICAL";
    ComponentClassification["ELECTRONIC"] = "ELECTRONIC";
})(ComponentClassification || (exports.ComponentClassification = ComponentClassification = {}));
class ElectronicDevice {
    constructor(standard) {
        this.standard = standard;
        this.type = ComponentClassification.ELECTRONIC;
    }
}
exports.ElectronicDevice = ElectronicDevice;
class MechanicalDevice {
    constructor(standard) {
        this.standard = standard;
        this.type = ComponentClassification.MECHANICAL;
    }
}
exports.MechanicalDevice = MechanicalDevice;
class PredictionCtx {
    constructor() {
        this.getDevice = (id) => {
            let result = [];
            this.systemList.forEach((system) => {
                system.units.forEach((unit) => {
                    result = unit.devices.filter((device) => device.id === id);
                    if (result.length > 1)
                        throw new Error("Device Found 2 more (Id Error)");
                });
            });
            return result[0];
        };
        this.getUnit = (id) => {
            let result = [];
            this.systemList.forEach((system) => {
                result = system.units.filter((unit) => unit.id === id);
                if (result.length > 1)
                    throw new Error("Unit Found 2 more (Id Error)");
            });
            return result[0];
        };
        this.getSystem = (id) => {
            const result = this.systemList.filter((system) => system.id === id);
            if (result.length > 1)
                throw new Error("System Found 2 more (Id Error)");
            return result[0];
        };
        this.getAll = () => {
            return this.systemList;
        };
        this.iDeviceCount = 0;
        this.iUnitCount = 0;
        this.iSystemCount = 0;
        this.deviceList = [];
        this.unitList = [];
        this.systemList = [];
    }
}
exports.PredictionCtx = PredictionCtx;
class AbstractCalculator {
    constructor() {
        this.getCtx = () => {
            return this.currentCtx;
        };
        this.setCtx = (ctx) => {
            if (this.currentCtx !== undefined) {
                this.prevSnapshots?.push(this.currentCtx);
            }
            this.currentCtx = ctx;
        };
    }
}
exports.AbstractCalculator = AbstractCalculator;
