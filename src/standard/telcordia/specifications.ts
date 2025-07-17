import { TelcordiaQualityFactor } from "./sr332"
import { TelcordiaVariableResistor } from './category/resistor';
import { SpecificationBase } from "../../core/common";


export const TelcordiaBasicSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-COMMON-001",
        name: "참조 온도",
        key: "tRef",
        description: "부품의 신뢰성 계산을 위한 기준 온도로, 일반적으로 40°C를 표준으로 사용합니다. 이 온도는 부품의 예상 수명과 고장률을 계산하는 기준점이 됩니다.",
        engName: "Reference Temperature",
        shortEngName: "Ref Temp",
        type: 'scalar',
        initialValue: 40,
        unit: "℃"
    },
    {
        id: "SPEC-DEVICE-COMMON-002",
        name: "작동 온도",
        key: "tOp",
        description: "부품이 실제로 작동하는 환경의 온도입니다. 작동 온도가 높을수록 부품의 고장률이 증가하며, 신뢰성 예측의 핵심 요소입니다.",
        engName: "Operating Temperature",
        shortEngName: "Op Temp",
        type: 'scalar',
        initialValue: 0,
        unit: "℃"
    },
    {
        id: "SPEC-DEVICE-COMMON-003",
        name: "참조 전기저항",
        key: "eRef",
        description: "부품에 가해지는 기준 전기적 스트레스의 비율로, 일반적으로 정격의 50%를 표준으로 사용합니다. 이는 신뢰성 계산의 기준점이 됩니다.",
        engName: "Reference Electronical Stress",
        shortEngName: "Ref ElecStress",
        type: 'scalar',
        initialValue: 0.5,
        unit: "%"
    },
    {
        id: "SPEC-DEVICE-COMMON-004",
        name: "작동 전기저항",
        key: "eOp",
        description: "실제 작동 시 부품에 가해지는 전기적 스트레스의 비율입니다. 정격 대비 실제 사용량의 비율로, 높을수록 부품의 수명이 단축됩니다.",
        engName: "Operating Electronical Stress",
        shortEngName: "Op ElecStress",
        type: 'scalar',
        initialValue: 0.5,
        unit: "%"
    },
    {
        id: "SPEC-DEVICE-COMMON-005",
        name: "품질 인자",
        key: "qFactor",
        description: "부품의 품질 수준을 나타내는 등급으로, Level 0(최고 품질)부터 Level 3(표준 품질)까지 분류됩니다. 품질 등급이 높을수록 신뢰성이 향상됩니다.",
        engName: "Quality Factor",
        type: 'options',
        initialValue: TelcordiaQualityFactor.LEVEL_2,
        options: [
            {
                label: "Level 0",
                value: TelcordiaQualityFactor.LEVEL_0,
            },
            {
                label: "Level 1",
                value: TelcordiaQualityFactor.LEVEL_1,
            },
            {
                label: "Level 2",
                value: TelcordiaQualityFactor.LEVEL_2,
            },
            {
                label: "Level 3",
                value: TelcordiaQualityFactor.LEVEL_3,
            },
        ]
    },
    {
        id: "SPEC-DEVICE-COMMON-006",
        name: "수량",
        key: "quantity",
        description: "동일한 부품의 사용 개수입니다. 시스템 전체의 신뢰성 계산 시 부품 수량을 고려하여 총 고장률을 산출합니다.",
        engName: "Quantity",
        type: 'scalar',
        initialValue: 1,
        unit: "EA"
    },
]

export const TelcordiaPackagingSpecification: SpecificationBase = {
    id: "SPEC-DEVICE-COMMON-008",
    name: "밀폐 방식",
    key: "packaging",
    description: "부품의 패키징 방식으로, 습도와 오염물질로부터의 보호 수준을 결정합니다. Hermetic은 완전 밀폐, Non-Hermetic은 비밀폐 패키징을 의미합니다.",
    engName: "Packaging Type",
    type: 'options',
    initialValue: "Non-Hermetic",
    options: [
        {
            label: "Hermetic",
            value: 'Hermetic',
        },
        {
            label: "Non-Hermetic",
            value: "Non-Hermetic",
        },
        {
            label: "Other",
            value: "Other",
        }
    ]
}

export const TelcordiaElecStressPercentageManualSpecification: SpecificationBase = {
    id: "SPEC-DEVICE-COMMON-009",
    name: "전기저항 직접 입력",
    key: "isEOpManual",
    description: "자동 계산 대신 전기적 스트레스를 수동으로 입력할지 결정하는 옵션입니다. 특수한 작동 조건이나 비표준 사용 상황에서 활용됩니다.",
    engName: "Electronic Stress Manual",
    type: 'flag',
    initialValue: false,
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const TelcordiaCapacitorSpecification: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-001-001",
        name: "축전지 용량",
        key: "capacitance",
        description: "커패시터가 저장할 수 있는 전하의 양을 나타내는 값입니다. 용량이 클수록 더 많은 전하를 저장할 수 있으며, 회로의 필터링 특성에 영향을 줍니다.",
        engName: "Capacitance",
        type: 'scalar',
        initialValue: 0,
        unit: "㎌"
    },
    {
        id: "SPEC-DEVICE-001-002",
        name: "직류 인가 전압",
        key: "appliedDCVoltage",
        description: "커패시터에 실제로 인가되는 직류 전압입니다. 이 값은 커패시터의 전기적 스트레스를 결정하며, 정격 전압에 가까울수록 신뢰성이 감소합니다.",
        engName: "Applied DC Voltage",
        type: 'scalar',
        initialValue: 0,
        unit: "V"
    },
    {
        id: "SPEC-DEVICE-001-003",
        name: "교류 피크 전압",
        key: "acPeakVoltage",
        description: "커패시터에 인가되는 교류 전압의 최대값입니다. AC 회로에서 커패시터에 가해지는 순간 최대 전압으로, 전압 스트레스 계산에 사용됩니다.",
        engName: "AC Peak Voltage",
        type: 'scalar',
        initialValue: 0,
        unit: "V"
    },
    {
        id: "SPEC-DEVICE-001-004",
        name: "정격 전압",
        key: "ratedVoltage",
        description: "커패시터가 안전하게 작동할 수 있는 최대 전압입니다. 제조사가 보증하는 최대 사용 전압으로, 이를 초과하면 커패시터가 손상될 수 있습니다.",
        engName: "Rated Voltage",
        type: 'scalar',
        initialValue: 0,
        unit: "V"
    }
];

export const TelcordiaInductorSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-004-001",
        name: "인덕턴스",
        key: "inductance",
        description: "인덕터가 자기장에 저장할 수 있는 에너지의 양을 나타내는 값입니다. 인덕턴스가 클수록 더 많은 자기 에너지를 저장할 수 있습니다.",
        engName: "Inductance",
        type: 'scalar',
        initialValue: 0,
        unit: "H"
    },
    {
        id: "SPEC-DEVICE-004-002",
        name: "동작 전압",
        key: "operatingVoltage",
        description: "인덕터에 인가되는 실제 동작 전압입니다. 펄스 트랜스포머의 경우 5V 기준으로 신뢰성 계수가 달라집니다.",
        engName: "Operating Voltage",
        type: 'scalar',
        initialValue: 0,
        unit: "V"
    },
    {
        id: "SPEC-DEVICE-004-003",
        name: "정격 전력",
        key: "ratedPower",
        description: "인덕터가 안전하게 처리할 수 있는 최대 전력입니다. 전력 트랜스포머의 경우 1W를 기준으로 분류됩니다.",
        engName: "Rated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    }
];

export const TelcordiaConnectorSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-002-001",
        name: "커넥터 핀 개수",
        key: "pins",
        description: "커넥터에 있는 전기적 접점의 총 개수입니다. 핀 수가 많을수록 복잡도가 증가하며, 각 핀은 잠재적인 고장 지점이 될 수 있습니다.",
        engName: "The Number of Pins",
        shortEngName: "Pins",
        type: 'scalar',
        initialValue: 0,
    }
];

export const TelcordiaDiodeSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-003-001",
        name: "정격 전류",
        key: "ratedCurrent",
        description: "다이오드가 안전하게 통과시킬 수 있는 최대 전류입니다. 제조사가 보증하는 순방향 전류의 최대치로, 이를 초과하면 다이오드가 손상됩니다.",
        engName: "Rated Current",
        type: 'scalar',
        initialValue: 0,
        unit: "A"
    },
    {
        id: "SPEC-DEVICE-003-002",
        name: "정격 전압",
        key: "ratedVoltage",
        description: "다이오드에 인가할 수 있는 최대 역방향 전압입니다. 이 값을 초과하면 다이오드가 역방향 항복을 일으켜 손상될 수 있습니다.",
        engName: "Rated Voltage",
        type: 'scalar',
        initialValue: 0,
        unit: "V"
    },
    {
        id: "SPEC-DEVICE-003-003",
        name: "정격 전력",
        key: "ratedPower",
        description: "다이오드가 안전하게 처리할 수 있는 최대 전력입니다. 전압 조정기 다이오드의 경우 이 값에 따라 신뢰성 계수가 달라집니다.",
        engName: "Rated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    }
];

export const TelcordiaICTechnologySpecification: SpecificationBase = {
    id: "SPEC-DEVICE-005-000",
    name: "공정 기술",
    key: "technology",
    description: "집적회로(IC)의 제조 공정 기술입니다. Bipolar는 높은 속도와 전류 구동 능력, NMOS는 단순한 구조, CMOS는 낮은 소비전력 특성을 가집니다.",
    engName: "Technology",
    type: 'options',
    initialValue: 'Bipolar',
    options: [
        {
            label: "Bipolar",
            value: "bipolar",
        },
        {
            label: "NMOS",
            value: "nmos",
        },
        {
            label: "CMOS",
            value: "cmos",
        }
    ]
}

export const TelcordiaAnalogICSpecifications: SpecificationBase[] = [
    TelcordiaICTechnologySpecification,
    {
        id: "SPEC-DEVICE-005-001-001",
        name: "트랜지스터 갯수",
        key: "transistors",
        description: "아날로그 IC 내부에 포함된 트랜지스터의 총 개수입니다. 트랜지스터 수가 많을수록 회로의 복잡도가 증가하며 고장 가능성도 증가합니다.",
        engName: "The Number of Transistors",
        shortEngName: "No. Transistor",
        type: 'scalar',
        initialValue: 0,
    }
]

export const TelcordiaDigitalICSpecifications: SpecificationBase[] = [
    TelcordiaICTechnologySpecification,
    {
        id: "SPEC-DEVICE-005-002-001",
        name: "게이트 갯수",
        key: "gates",
        description: "디지털 IC 내부의 논리 게이트 총 개수입니다. 게이트 수는 IC의 복잡도와 기능성을 나타내며, 신뢰성 예측의 중요한 지표입니다.",
        engName: "The Number of Gates",
        shortEngName: "No. Gates",
        type: 'scalar',
        initialValue: 0,
    }
]

export const TelcordiaRAMICSpecifications: SpecificationBase[] = [
    TelcordiaICTechnologySpecification,
    {
        id: "SPEC-DEVICE-005-003-001",
        name: "비트 수",
        key: "bits",
        description: "RAM 메모리의 저장 용량을 나타내는 총 비트 수입니다. 메모리 용량이 클수록 더 많은 메모리 셀을 포함하며, 복잡도가 증가합니다.",
        engName: "The number of bits",
        shortEngName: "No. bits",
        type: 'scalar',
        initialValue: 0,
        unit: "BITS"
    },
    {
        id: "SPEC-DEVICE-005-003-002",
        name: "정적/동적",
        key: "type",
        description: "RAM의 작동 방식입니다. 정적(Static) RAM은 빠르고 안정적이지만 비용이 높고, 동적(Dynamic) RAM은 용량 대비 비용이 낮지만 주기적인 새로고침이 필요합니다.",
        engName: "Static/Dynamic",
        type: 'options',
        initialValue: 'Static',
        options: [
            {
                label: "Static",
                value: "static"
            },
            {
                label: "Dynamic", // if, check this dynamic option, technology in ic specification must be block.
                value: "dynamic",
            }
        ]
    }
];

export const TelcordiaROMICSpecifications: SpecificationBase[] = [
    TelcordiaICTechnologySpecification,
    {
        id: "SPEC-DEVICE-005-004-001",
        name: "비트 수",
        key: "bits",
        description: "ROM 메모리의 저장 용량을 나타내는 총 비트 수입니다. ROM은 읽기 전용 메모리로, 비트 수가 클수록 더 많은 데이터를 저장할 수 있습니다.",
        engName: "The number of bits",
        shortEngName: "No. bits",
        type: 'scalar',
        initialValue: 0,
        unit: "BITS"
    }
];

export const TelcordiaMicroprocessorSpecifications: SpecificationBase[] = [
    TelcordiaICTechnologySpecification,
    {
        id: "SPEC-DEVICE-005-005-001", // if, technology in ic specification is CMOS, this specification must be block & dismiss value
        name: "게이트 수",
        key: "gates",
        description: "마이크로프로세서 내부의 논리 게이트 총 개수입니다. 프로세서의 복잡도와 처리 능력을 나타내며, CMOS 기술의 경우 트랜지스터 수로 표현됩니다.",
        engName: "The Number Of Gates",
        shortEngName: "No. bits",
        type: 'scalar',
        initialValue: 0,
    },
    {
        id: "SPEC-DEVICE-005-005-002",
        name: "버스(Bus) 크기",
        key: "busWidth",
        description: "마이크로프로세서의 데이터 버스 폭입니다. 버스 크기가 클수록 한 번에 처리할 수 있는 데이터의 양이 많아져 성능이 향상됩니다.",
        engName: "Bus Width",
        type: 'options',
        options: [
            {
                label: "8bits", 
                value: 8
            },
            {
                label: "16bits",
                value: 16
            },
            {
                label: "32bits",
                value: 32
            },
            {
                label: "64bits",
                value: 64
            }
        ]
    },
]

//TODO: 8.5.6 Microcontroller & Hybrid Microcircuits & Combined Analog-Digital IC

export const TelcordiaOptoElectronicPumpLaserSpecification: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-007-004-001",
        name: "출력",
        key: "output",
        description: "펌프 레이저의 광 출력 파워입니다. 출력이 높을수록 더 강한 광 신호를 제공하지만, 열 발생과 전력 소비도 증가합니다.",
        engName: "Output",
        type: 'scalar',
        initialValue: 0,
        unit: "mW"
    }
];

export const TelcordiaOptoElectronicTransceiverSFPSpecification: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-007-009-001",
        name: "케이블 속도",
        key: "cableSpeed",
        description: "SFP 트랜시버의 데이터 전송 속도입니다. 속도가 빠를수록 더 많은 데이터를 전송할 수 있지만, 전력 소비와 발열량도 증가합니다.",
        engName: "Cable Speed",
        type: 'scalar',
        initialValue: 0,
        unit: "Gbps"
    }
];

export const TelcordiaRelaySpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-008-001",
        name: "접촉 전류",
        key: "contactCurrent",
        description: "릴레이 접점을 통해 실제로 흐르는 전류입니다. 이 값은 접점의 실제 부하를 나타내며, 접점 마모와 수명에 영향을 미칩니다.",
        engName: "Contact Current",
        type: 'scalar',
        initialValue: 0,
        unit: "A"
    },
    {
        id: "SPEC-DEVICE-008-002",
        name: "정격 전류",
        key: "ratedCurrent",
        description: "릴레이 접점이 안전하게 처리할 수 있는 최대 전류입니다. 제조사가 보증하는 최대 허용 전류로, 이를 초과하면 접점 손상이 발생합니다.",
        engName: "Rated Current",
        type: 'scalar',
        initialValue: 0,
        unit: "A"
    }
];

export const TelcordiaFixedResistorSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-009-001",
        name: "저항",
        key: "resistance",
        description: "고정 저항기의 전기 저항 값입니다. 전류의 흐름을 제한하는 소자의 기본 특성으로, 회로에서 전압 분배와 전류 제한에 사용됩니다.",
        engName: "Resistance",
        type: 'scalar',
        initialValue: 0,
        unit: "MΩ"
    },
    {
        id: "SPEC-DEVICE-009-002",
        name: "인가 전력",
        key: "appliedPower",
        description: "저항기에 실제로 인가되는 전력입니다. 이 값은 저항기의 열 발생량을 결정하며, 정격 전력에 가까울수록 신뢰성이 감소합니다.",
        engName: "Applied Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    },
    {
        id: "SPEC-DEVICE-009-003",
        name: "정격 전력",
        key: "ratedPower",
        description: "저항기가 안전하게 처리할 수 있는 최대 전력입니다. 제조사가 보증하는 최대 허용 전력으로, 이를 초과하면 저항기가 과열되어 손상됩니다.",
        engName: "Rated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    }
];

export const TelcordiaVariableResistorSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-010-001",
        name: "총 저항",
        key: "totalResistance",
        description: "가변 저항기의 전체 저항 범위입니다. 최소값부터 최대값까지 조절 가능한 저항의 범위를 나타내며, 회로에서 전압 분배나 신호 조절에 사용됩니다.",
        engName: "Total Resistance",
        type: 'scalar',
        initialValue: 0,
        unit: "kΩ"
    },
    {
        id: "SPEC-DEVICE-010-002",
        name: "입력 전압",
        key: "inputVoltage",
        description: "가변 저항기의 양단에 인가되는 전압입니다. 입력 전압과 총 저항값으로부터 전력 스트레스를 계산할 수 있습니다.",
        engName: "Input Voltage",
        type: 'scalar',
        initialValue: 0,
        unit: "V"
    },
    {
        id: "SPEC-DEVICE-010-003",
        name: "정격 전력",
        key: "ratedPower",
        description: "가변 저항기가 안전하게 처리할 수 있는 최대 전력입니다. 정격 전력을 초과하면 저항 요소와 슬라이드 접촉부가 손상될 수 있습니다.",
        engName: "Rated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    }
];

export const TelcordiaResisotrNetworkSpecification: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-011-001",
        name: "저항 수",
        key: "resistors",
        description: "저항 네트워크 내부에 포함된 개별 저항의 총 개수입니다. 저항 수가 많을수록 회로의 복잡도가 증가하며 신뢰성에 영향을 미칩니다.",
        engName: "The Number of Resistor",
        type: 'scalar',
        initialValue: 0,
    },
    {
        id: "SPEC-DEVICE-011-002",
        name: "인가 전력",
        key: "appliedPower",
        description: "저항 네트워크에 실제로 인가되는 총 전력입니다. 각 저항에 분산되는 전력을 결정하며, 열적 스트레스 분석에 사용됩니다.",
        engName: "Applied Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    },
    {
        id: "SPEC-DEVICE-011-003",
        name: "정격 전력",
        key: "ratedPower",
        description: "저항 네트워크가 안전하게 처리할 수 있는 최대 전력입니다. 제조사가 보증하는 허용 전력으로, 개별 저항의 정격과 관련이 있습니다.",
        engName: "Rated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    }
];

export const TelcordiaSwitchSpecification: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-012-001",
        name: "접촉 전류",
        key: "contactCurrent",
        description: "스위치 접점을 통해 실제로 흐르는 전류입니다. 이 값은 접점의 실제 부하를 나타내며, 접점 마모와 수명에 영향을 미칩니다.",
        engName: "Contact Current",
        type: 'scalar',
        initialValue: 0,
        unit: "A"
    },
    {
        id: "SPEC-DEVICE-012-002",
        name: "정격 전류",
        key: "ratedCurrent",
        description: "스위치 접점이 안전하게 처리할 수 있는 최대 전류입니다. 제조사가 보증하는 허용 전류로, 이를 초과하면 접점 손상이 발생합니다.",
        engName: "Rated Current",
        type: 'scalar',
        initialValue: 0,
        unit: "A"
    },
    {
        id: "SPEC-DEVICE-012-003",
        name: "폴 갯수",
        key: "poles",
        description: "스위치의 독립적인 회로 접점 수입니다. 멀티 폴 스위치는 여러 회로를 동시에 제어할 수 있으며, 폴 수가 많을수록 복잡도가 증가합니다.",
        engName: "The Number of Poles",
        type: 'scalar',
        initialValue: 0,
    },
    {
        id: "SPEC-DEVICE-012-004",
        name: "스로우 갯수",
        key: "throws",
        description: "각 폴이 연결될 수 있는 위치의 수입니다. 단일 스로우(ST)는 1개, 이중 스로우(DT)는 2개의 연결 위치를 가집니다.",
        engName: "The Number of Thorws",
        type: 'scalar',
        initialValue: 0
    },
    {
        id: "SPEC-DEVICE-012-005",
        name: "페어 갯수",
        key: "pairs",
        description: "스위치의 총 접점 쌍 수입니다. 폴 수와 스로우 수에 따라 자동 계산되며, 스위치의 전체 복잡도를 나타냅니다.",
        engName: "The Number of Pairs",
        type: 'scalar',
        initialValue: 0
    },
    {
        id: "SPEC-DEVICE-012-006", // if, this flag was true, block input The Number of pairs & ignore
        name: "페어 수동 입력",
        key: "isPairManual",
        description: "접점 쌍 수를 자동 계산 대신 수동으로 입력할지 결정하는 옵션입니다. 특수한 스위치 구성의 경우 사용합니다.",
        engName: "Pair Manual",
        type: 'flag',
        initialValue: false
    }
];

export const TelcordiaTransistorSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-014-001",
        name: "소비 전력",
        key: "dissipatedPower",
        description: "트랜지스터가 동작 중 실제로 소비하는 전력입니다. 이 전력은 열로 변환되며, 트랜지스터의 온도 상승과 신뢰성에 영향을 미칩니다.",
        engName: "Dissipated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    },
    {
        id: "SPEC-DEVICE-014-002",
        name: "정격 전력",
        key: "ratedPower",
        description: "트랜지스터가 안전하게 처리할 수 있는 최대 전력입니다. 제조사가 보증하는 허용 전력으로, 이를 초과하면 트랜지스터가 과열되어 손상됩니다. 이 값에 따라 신뢰성 계수가 달라집니다.",
        engName: "Rated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    }
];

export const TelcordiaMicrowaveSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-006-001",
        name: "정격 전력",
        key: "ratedPower",
        description: "마이크로파 소자가 안전하게 처리할 수 있는 최대 전력입니다. 장치가 안전하게 처리할 수 있는 최대 마이크로파 전력을 나타냅니다.",
        engName: "Rated Power",
        type: 'scalar',
        initialValue: 0,
        unit: "W"
    }
];

export const TelcordiaMiscellaneousVibratorSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-015-001-001",
        name: "진동 수",
        key: "frequency",
        description: "진동 소자의 작동 주파수입니다. 60Hz, 120Hz, 400Hz 등의 표준 주파수로 작동하며, 주파수가 높을수록 기계적 스트레스가 증가합니다.",
        engName: "Frequency",
        type: 'options',
        initialValue: 60,
        options: [
            {
                label: "60 Hz",
                value: 60
            },
            {
                label: "120 Hz",
                value: 120
            },
            {
                label: "400 Hz",
                value: 400,
            }
        ]
    }
]

export const TelcordiaMiscellaneousCircuitBreakerSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-015-002-001",
        name: "종류",
        key: "type",
        description: "회로 차단기의 응용 분야입니다. 보호 전용은 과전류 방지만 담당하고, 전원 ON/OFF 응용은 정상 전류 제어도 포함합니다.",
        engName: "Type",
        type: 'options',
        initialValue: 0,
        options: [
            {
                label: "Protection-Only Application (per pole)",
                value: 0
            },
            {
                label: "Power On/Off Application (per pole)",
                value: 0
            }
        ]
    }
]

export const TelcordiaMiscellaneousFuseSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-015-003-001",
        name: "정격 전류",
        key: "ratedCurrent",
        description: "퓨즈가 녹아내리지 않고 지속적으로 통과시킬 수 있는 최대 전류입니다. 이 값을 초과하는 과전류가 발생하면 퓨즈가 녹아 회로를 차단합니다.",
        engName: "Rated Current",
        type: 'scalar',
        initialValue: 0,
    }
];

export const TelcordiaMiscellaneousLampIncandescentSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-015-004-001",
        name: "정격 직류 전압",
        key: "ratedVoltage",
        description: "백열등의 정격 직류 전압입니다. 이 전압에서 최적의 발광 효율과 수명을 가지며, 정격을 초과하면 필라먼트 수명이 단축됩니다.",
        engName: "Rated DC Voltage",
        type: 'scalar',
        initialValue: 0,
    }
];

export const TelcordiaMiscellaneousPowerModuleSpecifications: SpecificationBase[] = [
    {
        id: "SPEC-DEVICE-015-005-001",
        name: "종류",
        key: "type",
        description: "전원 모듈의 타입입니다. DC-DC 모듈은 직류 전압 변환을, AC/DC 모듈은 교류를 직류로 변환하는 전원 공급 장치입니다.",
        engName: "Type",
        type: "options",
        initialValue: 0,
        options: [
            {
                label: "DC-DC, BOARD MOUNTED (POWER BRICK)",
                value: 0,
            },
            {
                label: "AC / DC POWER SUPPLY",
                value: 1,
            }
        ]
    },
    {
        id: "SPEC-DEVICE-015-005-002",
        name: "정격 전력",
        key: "ratedPower",
        description: "전원 모듈이 안정적으로 공급할 수 있는 최대 출력 전력입니다. 높은 전력 정격의 모듈일수록 더 많은 부하를 공급할 수 있지만 신뢰성이 영향을 받습니다.",
        engName: "Rated Power",
        type: "scalar",
        initialValue: 0,
        unit: "W"
    }
];

