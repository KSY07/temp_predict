import { TelcordiaCalculator } from "../standard/telcordia/calculator"
import { TelcordiaCategories } from "../standard/telcordia/category"
import { PredictionStandard } from "./common"

// return [IPredictionCategory, AbstractCalculator]
export const usePrediction = (standard: PredictionStandard) => {
    switch(standard) {
        case PredictionStandard.TELCORDIA_SR_332:
            return useTelcordiaPrediction();
        default:
            return useTelcordiaPrediction();
    }
};

export const useTelcordiaPrediction = () => {
    return [
        TelcordiaCategories,
        new TelcordiaCalculator(),
    ]
};