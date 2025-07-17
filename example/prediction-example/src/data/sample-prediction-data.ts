import {
  SystemTreeNode,
  UnitTreeNode,
  DeviceTreeNode,
} from "@/types/prediction-tree";
import {
  TelcordiaSystem,
  TelcordiaUnit,
  TelcordiaDevice,
  TelcordiaCategories,
  TelcordiaEnvironmentFactor,
  TelcordiaQualityFactor,
  TelcordiaTempStressCurves,
} from "prediction";

// Helper function to find TelcordiaCategory by ID
const findCategoryById = (categoryId: string) => {
  // Helper function to recursively search through categories and subcategories
  const searchCategory = (categories: typeof TelcordiaCategories): any => {
    for (const cat of categories) {
      if (cat.id === categoryId) {
        return cat;
      }
      if (cat.subCategories && cat.subCategories.length > 0) {
        const found = searchCategory(cat.subCategories);
        if (found) return found;
      }
    }
    return null;
  };
  
  return searchCategory(TelcordiaCategories);
};

// Create real TelcordiaSystem instances
const createTelcordiaSystem = (id: string, alias: string): TelcordiaSystem => {
  const system = new TelcordiaSystem(id);
  system.alias = alias;
  return system;
};

// Create real TelcordiaUnit instances
const createTelcordiaUnit = (id: string, alias: string): TelcordiaUnit => {
  const unit = new TelcordiaUnit(id);
  unit.alias = alias;
  unit.environmentFactor = TelcordiaEnvironmentFactor.GROUND_FIXED_CONTROLLED;
  return unit;
};

// Create real TelcordiaDevice instances with actual categories
const createTelcordiaDevice = (
  id: string,
  alias: string,
  categoryId: string
): TelcordiaDevice => {
  const category = findCategoryById(categoryId);
  if (!category) {
    throw new Error(
      `Category '${categoryId}' not found in TelcordiaCategories`
    );
  }

  const device = new TelcordiaDevice(id, category);
  device.alias = alias;

  // Set default specifications based on category
  const defaultSpecs: Record<string, any> = {};

  // Set common default values
  defaultSpecs.tRef = 40; // Reference temperature
  defaultSpecs.tOp = 25; // Operating temperature
  defaultSpecs.eRef = 0.5; // Reference electrical stress
  defaultSpecs.eOp = 0.3; // Operating electrical stress
  defaultSpecs.qFactor = TelcordiaQualityFactor.LEVEL_2;

  device.specifications = defaultSpecs;

  return device;
};

// Create device with specific specifications for pantograph motor system
const createMotorController = (id: string, alias: string): TelcordiaDevice => {
  const device = createTelcordiaDevice(id, alias, "SR332-IC-MICROPROCESSOR");
  device.specifications = {
    technology: "cmos",
    gates: 50000,
    busWidth: 32,
    tRef: 55,     // Reference temperature for railway environment
    tOp: 45,      // Operating temperature in pantograph compartment
    eRef: 0.6,    // Reference electrical stress
    eOp: 0.4,     // Operating electrical stress
    qFactor: TelcordiaQualityFactor.LEVEL_2,
    quantity: 1
  };
  return device;
};

const createAnalogCircuit = (id: string, alias: string): TelcordiaDevice => {
  const device = createTelcordiaDevice(id, alias, "SR332-IC-ANALOG");
  device.specifications = {
    technology: "bipolar",
    transistors: 150,
    tRef: 55,
    tOp: 40,
    eRef: 0.5,
    eOp: 0.35,
    qFactor: TelcordiaQualityFactor.LEVEL_2,
    quantity: 1
  };
  return device;
};

const createSensorAmplifier = (id: string, alias: string): TelcordiaDevice => {
  const device = createTelcordiaDevice(id, alias, "SR332-TRANSISTOR-SILICON-NPN-PNP");
  device.specifications = {
    dissipatedPower: 0.5,   // W - Power dissipated in sensor circuit
    ratedPower: 1.0,        // W - Rated power capacity
    tRef: 55,
    tOp: 35,
    eRef: 0.4,
    eOp: 0.25,
    qFactor: TelcordiaQualityFactor.LEVEL_2,
    quantity: 1
  };
  return device;
};

// Sample devices for 집전장치 전동기 시스템 (Pantograph Drive System)
const pantographDriveDevices: DeviceTreeNode[] = [
  {
    id: "dev-1",
    alias: "집전장치 전동기 제어 MCU M1",
    type: "device",
    expanded: false,
    selected: false,
    data: createMotorController("dev-1", "집전장치 전동기 제어 MCU M1"),
    children: [] as never[],
    reliability: {
      failureRate: 2.1e-5,
      mtbf: 47619,
      availability: 0.9995
    }
  } as DeviceTreeNode,
  {
    id: "dev-2",
    alias: "전동기 제어 회로 MC1",
    type: "device",
    expanded: false,
    selected: false,
    data: createAnalogCircuit("dev-2", "전동기 제어 회로 MC1"),
    children: [] as never[],
    reliability: {
      failureRate: 1.8e-6,
      mtbf: 555556,
      availability: 0.9999
    }
  } as DeviceTreeNode,
  {
    id: "dev-3",
    alias: "위치 센서 증폭기 PS1",
    type: "device",
    expanded: false,
    selected: false,
    data: createSensorAmplifier("dev-3", "위치 센서 증폭기 PS1"),
    children: [] as never[],
    reliability: {
      failureRate: 5.2e-7,
      mtbf: 1923077,
      availability: 0.99999
    }
  } as DeviceTreeNode,
  {
    id: "dev-4",
    alias: "압력 센서 인터페이스 PR1",
    type: "device",
    expanded: false,
    selected: false,
    data: createAnalogCircuit("dev-4", "압력 센서 인터페이스 PR1"),
    children: [] as never[],
    reliability: {
      failureRate: 4.5e-7,
      mtbf: 2222222,
      availability: 0.99999
    }
  } as DeviceTreeNode,
];

// Create device with specific specifications for contact strips
const createContactStrip = (id: string, alias: string, current: number): TelcordiaDevice => {
  const device = createTelcordiaDevice(id, alias, "SR332-CONNECTOR-GENERAL_PURPOSE_POWER");
  device.specifications = {
    pins: 2,           // Number of contact pins
    tRef: 70,          // Higher reference temperature for contact heating
    tOp: 60,           // Operating temperature with current flow
    eRef: 0.8,         // High electrical stress for power contacts
    eOp: 0.7,          // Operating electrical stress
    qFactor: TelcordiaQualityFactor.LEVEL_2,
    quantity: 1,
    ratedCurrent: current    // Custom specification for contact current
  };
  return device;
};

const createMechanicalRelay = (id: string, alias: string): TelcordiaDevice => {
  const device = createTelcordiaDevice(id, alias, "SR332-RELAY-GENERAL-PURPOSE");
  device.specifications = {
    contactCurrent: 10,      // A - Contact current rating
    ratedCurrent: 15,        // A - Maximum current rating
    tRef: 60,                // Reference temperature for mechanical stress
    tOp: 45,                 // Operating temperature
    eRef: 0.6,               // Reference electrical stress
    eOp: 0.4,                // Operating electrical stress
    qFactor: TelcordiaQualityFactor.LEVEL_2,
    quantity: 1
  };
  return device;
};

// Sample devices for 집전부 시스템 (Contact Strip System)
const contactStripDevices: DeviceTreeNode[] = [
  {
    id: "dev-5",
    alias: "카본 집전판 CS1",
    type: "device",
    expanded: false,
    selected: false,
    data: createContactStrip("dev-5", "카본 집전판 CS1", 1500), // 1500A for high-speed rail
    children: [] as never[],
    reliability: {
      failureRate: 1.2e-4,
      mtbf: 8333,
      availability: 0.999
    }
  } as DeviceTreeNode,
  {
    id: "dev-6",
    alias: "알루미늄 집전판 AS1",
    type: "device",
    expanded: false,
    selected: false,
    data: createContactStrip("dev-6", "알루미늄 집전판 AS1", 1200), // 1200A for backup contact
    children: [] as never[],
    reliability: {
      failureRate: 8.5e-5,
      mtbf: 11765,
      availability: 0.9993
    }
  } as DeviceTreeNode,
  {
    id: "dev-7",
    alias: "스프링 서스펜션 릴레이 SP1",
    type: "device",
    expanded: false,
    selected: false,
    data: createMechanicalRelay("dev-7", "스프링 서스펜션 릴레이 SP1"),
    children: [] as never[],
    reliability: {
      failureRate: 3.1e-6,
      mtbf: 322581,
      availability: 0.9999
    }
  } as DeviceTreeNode,
];

// Create device with specific specifications for communication modules
const createCommunicationModule = (id: string, alias: string, speed: number): TelcordiaDevice => {
  const device = createTelcordiaDevice(id, alias, "SR332-OPTO-ELECTRONIC-TRANSCEIVER-SFP");
  device.specifications = {
    cableSpeed: speed,         // Gbps - Communication speed
    tRef: 60,                  // Reference temperature for high-speed electronics
    tOp: 50,                   // Operating temperature
    eRef: 0.7,                 // Reference electrical stress for high-speed signals
    eOp: 0.5,                  // Operating electrical stress
    qFactor: TelcordiaQualityFactor.LEVEL_2,
    quantity: 1
  };
  return device;
};

const createPowerTransformer = (id: string, alias: string, power: number, voltage: number): TelcordiaDevice => {
  const device = createTelcordiaDevice(id, alias, "SR332-INDUCTOR-TRANSFORMER-POWER");
  device.specifications = {
    inductance: 100,           // mH - Transformer inductance
    operatingVoltage: voltage, // V - Operating voltage
    ratedPower: power,         // W - Power rating
    tRef: 80,                  // Higher reference temperature for power transformers
    tOp: 70,                   // Operating temperature with power dissipation
    eRef: 0.8,                 // High electrical stress for power applications
    eOp: 0.6,                  // Operating electrical stress
    qFactor: TelcordiaQualityFactor.LEVEL_2,
    quantity: 1
  };
  return device;
};

// Sample devices for 제어 시스템 (Control System)
const controlSystemDevices: DeviceTreeNode[] = [
  {
    id: "dev-8",
    alias: "집전장치 제어 MCU CU1",
    type: "device",
    expanded: false,
    selected: false,
    data: createMotorController("dev-8", "집전장치 제어 MCU CU1"),
    children: [] as never[],
    reliability: {
      failureRate: 2.8e-6,
      mtbf: 357143,
      availability: 0.9999
    }
  } as DeviceTreeNode,
  {
    id: "dev-9",
    alias: "고속 통신 모듈 CM1",
    type: "device",
    expanded: false,
    selected: false,
    data: createCommunicationModule("dev-9", "고속 통신 모듈 CM1", 1.25), // 1.25 Gbps for railway communication
    children: [] as never[],
    reliability: {
      failureRate: 1.9e-6,
      mtbf: 526316,
      availability: 0.9999
    }
  } as DeviceTreeNode,
  {
    id: "dev-10",
    alias: "전원 변압기 PS1",
    type: "device",
    expanded: false,
    selected: false,
    data: createPowerTransformer("dev-10", "전원 변압기 PS1", 500, 24), // 500W, 24V for control systems
    children: [] as never[],
    reliability: {
      failureRate: 3.5e-6,
      mtbf: 285714,
      availability: 0.9999
    }
  } as DeviceTreeNode,
];

// Sample units with their devices
const sampleUnits: UnitTreeNode[] = [
  {
    id: "unit-1",
    alias: "집전장치 전동기 시스템",
    type: "unit",
    expanded: false,
    selected: false,
    data: createTelcordiaUnit("unit-1", "집전장치 전동기 시스템"),
    children: pantographDriveDevices,
    reliability: {
      failureRate: 2.4e-5,
      mtbf: 41667,
      availability: 0.9995
    }
  } as UnitTreeNode,
  {
    id: "unit-2",
    alias: "집전부 시스템",
    type: "unit",
    expanded: false,
    selected: false,
    data: createTelcordiaUnit("unit-2", "집전부 시스템"),
    children: contactStripDevices,
    reliability: {
      failureRate: 2.1e-4,
      mtbf: 4762,
      availability: 0.998
    }
  } as UnitTreeNode,
  {
    id: "unit-3",
    alias: "제어 시스템",
    type: "unit",
    expanded: false,
    selected: false,
    data: createTelcordiaUnit("unit-3", "제어 시스템"),
    children: controlSystemDevices,
    reliability: {
      failureRate: 8.2e-6,
      mtbf: 121951,
      availability: 0.9999
    }
  } as UnitTreeNode,
];

// Set parent references
pantographDriveDevices.forEach(
  (device) => ((device as any).parent = sampleUnits[0])
);
contactStripDevices.forEach(
  (device) => ((device as any).parent = sampleUnits[1])
);
controlSystemDevices.forEach(
  (device) => ((device as any).parent = sampleUnits[2])
);

// Sample systems
export const sampleSystems: SystemTreeNode[] = [
  {
    id: "sys-1",
    alias: "철도차량 집전장치 시스템 (KTX-430)",
    type: "system",
    expanded: true,
    selected: false,
    data: createTelcordiaSystem("sys-1", "철도차량 집전장치 시스템 (KTX-430)"),
    children: sampleUnits,
    reliability: {
      failureRate: 2.4e-4,
      mtbf: 4167,
      availability: 0.998
    }
  },
];

// Set parent references for units
sampleUnits.forEach((unit) => ((unit as any).parent = sampleSystems[0]));
