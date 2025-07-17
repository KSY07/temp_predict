"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelcordiaCategories = void 0;
const capacitors_1 = require("./category/capacitors");
const connectors_1 = require("./category/connectors");
const diodes_1 = require("./category/diodes");
const ic_1 = require("./category/ic");
const inductors_1 = require("./category/inductors");
const microwave_1 = require("./category/microwave");
const optoElectronic_1 = require("./category/optoElectronic");
const relay_1 = require("./category/relay");
const resistor_1 = require("./category/resistor");
const switch_1 = require("./category/switch");
const thermistor_1 = require("./category/thermistor");
const transistor_1 = require("./category/transistor");
// All Categories
exports.TelcordiaCategories = [
    capacitors_1.TelcordiaCapacitor,
    resistor_1.TelcordiaResistor,
    inductors_1.TelcordiaInductor,
    diodes_1.TelcordiaDiode,
    connectors_1.TelcordiaConnector,
    ic_1.TelcordiaICCategories,
    transistor_1.TelcordiaTransistor,
    optoElectronic_1.TelcordiaOptoElectronic,
    relay_1.TelcordiaRelay,
    switch_1.TelcordiaSwitch,
    thermistor_1.TelcordiaThermistor,
    microwave_1.TelcordiaMicrowaveElement,
];
