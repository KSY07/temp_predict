"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTelcordiaPrediction = exports.usePrediction = void 0;
const calculator_1 = require("../standard/telcordia/calculator");
const category_1 = require("../standard/telcordia/category");
const common_1 = require("./common");
// return [IPredictionCategory, AbstractCalculator]
const usePrediction = (standard) => {
    switch (standard) {
        case common_1.PredictionStandard.TELCORDIA_SR_332:
            return (0, exports.useTelcordiaPrediction)();
        default:
            return (0, exports.useTelcordiaPrediction)();
    }
};
exports.usePrediction = usePrediction;
const useTelcordiaPrediction = () => {
    return [
        category_1.TelcordiaCategories,
        new calculator_1.TelcordiaCalculator(),
    ];
};
exports.useTelcordiaPrediction = useTelcordiaPrediction;
