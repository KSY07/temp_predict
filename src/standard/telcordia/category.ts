import { TelcordiaCapacitor } from './category/capacitors';
import { TelcordiaConnector } from './category/connectors';
import { TelcordiaDiode } from './category/diodes';
import { TelcordiaAnalogIC, TelcordiaDigitalIC, TelcordiaICCategories, TelcordiaMicroprocessor, TelcordiaRAM, TelcordiaROM } from './category/ic';
import { TelcordiaInductor } from './category/inductors';
import { TelcordiaMicrowave, TelcordiaMicrowaveElement } from './category/microwave';
import { TelcordiaOptoElectronic } from './category/optoElectronic';
import { TelcordiaRelay } from './category/relay';
import { TelcordiaResistor } from './category/resistor';
import { TelcordiaSwitch } from './category/switch';
import { TelcordiaThermistor } from './category/thermistor';
import { TelcordiaTransistor } from './category/transistor';
import { TelcordiaCategory } from './sr332';

// All Categories
export const TelcordiaCategories: TelcordiaCategory[] = [
    TelcordiaCapacitor,
    TelcordiaResistor,
    TelcordiaInductor,
    TelcordiaDiode,
    TelcordiaConnector,
    TelcordiaICCategories,
    TelcordiaTransistor,
    TelcordiaOptoElectronic,
    TelcordiaRelay,
    TelcordiaSwitch,
    TelcordiaThermistor,
    TelcordiaMicrowaveElement,
]