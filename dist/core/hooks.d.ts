import { TelcordiaCalculator } from "../standard/telcordia/calculator";
import { PredictionStandard } from "./common";
export declare const usePrediction: (standard: PredictionStandard) => (import("..").TelcordiaCategory[] | TelcordiaCalculator)[];
export declare const useTelcordiaPrediction: () => (import("..").TelcordiaCategory[] | TelcordiaCalculator)[];
