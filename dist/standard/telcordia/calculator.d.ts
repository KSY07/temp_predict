import { AbstractCalculator, IPredictionResult } from '../../core/common';
import { TelcordiaCategory, TelcordiaDevice, TelcordiaPredictionCtx, TelcordiaSystem, TelcordiaUnit } from './sr332';
export declare class TelcordiaCalculator extends AbstractCalculator<TelcordiaCategory, TelcordiaDevice, TelcordiaUnit, TelcordiaSystem, TelcordiaPredictionCtx> {
    calcDevice: (device: TelcordiaDevice) => IPredictionResult;
    calcUnit: (unit: TelcordiaUnit) => IPredictionResult;
    calcSystem: (system: TelcordiaSystem) => IPredictionResult;
    calc: () => IPredictionResult;
    private applyEarlyLife;
    private applyUCL;
}
