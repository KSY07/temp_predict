"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalDistribution = exports.GammaDistribution = void 0;
class GammaDistribution {
    static gamma(x) {
        if (x <= 0) {
            throw new Error('Gamma function is not defined for x <= 0');
        }
        // Lanczos coefficients
        const g = 7;
        const c = [
            0.99999999999980993,
            676.5203681218851,
            -1259.1392167224028,
            771.32342877765313,
            -176.61502916214059,
            12.507343278686905,
            -0.13857109526572012,
            9.9843695780195716e-6,
            1.5056327351493116e-7
        ];
        if (x < 0.5) {
            // Reflection formula: Γ(x) = π / (sin(πx) * Γ(1-x))
            return Math.PI / (Math.sin(Math.PI * x) * this.gamma(1 - x));
        }
        x -= 1;
        let ag = c[0];
        for (let i = 1; i <= g + 1; i++) {
            ag += c[i] / (x + i);
        }
        const t = x + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * ag;
    }
    /**
     * 자연로그 감마 함수 ln(Γ(x)) 계산
     * 수치적 안정성을 위해 사용
     */
    static lnGamma(x) {
        if (x <= 0) {
            throw new Error('Log gamma function is not defined for x <= 0');
        }
        const g = 7;
        const c = [
            0.99999999999980993,
            676.5203681218851,
            -1259.1392167224028,
            771.32342877765313,
            -176.61502916214059,
            12.507343278686905,
            -0.13857109526572012,
            9.9843695780195716e-6,
            1.5056327351493116e-7
        ];
        if (x < 0.5) {
            return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * x)) - this.lnGamma(1 - x);
        }
        x -= 1;
        let ag = c[0];
        for (let i = 1; i <= g + 1; i++) {
            ag += c[i] / (x + i);
        }
        const t = x + g + 0.5;
        return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(ag);
    }
    /**
     * 하부 불완전 감마 함수 γ(a, x) 계산
     * Series expansion for small x, continued fraction for large x
     */
    static lowerIncompleteGamma(a, x) {
        if (a <= 0) {
            throw new Error('Parameter a must be positive');
        }
        if (x < 0) {
            throw new Error('Parameter x must be non-negative');
        }
        if (x === 0) {
            return 0;
        }
        // Use series expansion for x < a + 1
        if (x < a + 1) {
            return this.gammaSeries(a, x) * this.gamma(a);
        }
        // Use continued fraction for x >= a + 1
        return this.gamma(a) - this.gammaContinuedFraction(a, x) * this.gamma(a);
    }
    /**
     * 정규화된 하부 불완전 감마 함수 P(a, x) = γ(a, x) / Γ(a)
     * 감마 분포의 CDF
     */
    static gammaCDF(x, shape, scale = 1) {
        if (x <= 0)
            return 0;
        if (shape <= 0 || scale <= 0) {
            throw new Error('Shape and scale parameters must be positive');
        }
        return this.regularizedGammaP(shape, x / scale);
    }
    /**
     * 정규화된 하부 불완전 감마 함수 P(a, x)
     */
    static regularizedGammaP(a, x) {
        if (x === 0)
            return 0;
        if (x < a + 1) {
            return this.gammaSeries(a, x);
        }
        return 1 - this.gammaContinuedFraction(a, x);
    }
    /**
     * Series expansion for incomplete gamma function
     */
    static gammaSeries(a, x, epsilon = 1e-15) {
        let sum = 1 / a;
        let term = 1 / a;
        let n = 1;
        while (Math.abs(term) > epsilon * Math.abs(sum)) {
            term *= x / (a + n);
            sum += term;
            n++;
            if (n > 1000) {
                throw new Error('Series failed to converge');
            }
        }
        return sum * Math.exp(-x + a * Math.log(x) - this.lnGamma(a));
    }
    /**
     * Continued fraction for incomplete gamma function
     */
    static gammaContinuedFraction(a, x, epsilon = 1e-15) {
        const maxIterations = 1000;
        let b = x + 1 - a;
        let c = 1 / 1e-30;
        let d = 1 / b;
        let h = d;
        for (let i = 1; i <= maxIterations; i++) {
            const an = -i * (i - a);
            b += 2;
            d = an * d + b;
            if (Math.abs(d) < 1e-30)
                d = 1e-30;
            c = b + an / c;
            if (Math.abs(c) < 1e-30)
                c = 1e-30;
            d = 1 / d;
            const delta = d * c;
            h *= delta;
            if (Math.abs(delta - 1) < epsilon) {
                return Math.exp(-x + a * Math.log(x) - this.lnGamma(a)) * h;
            }
        }
        throw new Error('Continued fraction failed to converge');
    }
    /**
     * 감마 분포의 역함수 (Quantile function)
     * Newton-Raphson 방법 사용
     */
    static gammaInverseCDF(p, shape, scale = 1) {
        if (p < 0 || p > 1) {
            throw new Error('Probability p must be between 0 and 1');
        }
        if (shape <= 0 || scale <= 0) {
            throw new Error('Shape and scale parameters must be positive');
        }
        if (p === 0)
            return 0;
        if (p === 1)
            return Infinity;
        // Initial guess using Wilson-Hilferty approximation
        const g = this.wilsonHilfertyApproximation(p, shape);
        let x = g * scale;
        // Newton-Raphson iteration
        const epsilon = 1e-10;
        const maxIterations = 100;
        for (let i = 0; i < maxIterations; i++) {
            const cdf = this.gammaCDF(x, shape, scale);
            const pdf = this.gammaPDF(x, shape, scale);
            if (pdf === 0) {
                throw new Error(`PDF is zero, cannot continue Newton-Raphson kappa: ${shape} theta: ${scale}`);
            }
            const delta = (cdf - p) / pdf;
            x -= delta;
            if (Math.abs(delta) < epsilon * x) {
                return x;
            }
        }
        // If Newton-Raphson fails, fall back to bisection
        return this.gammaInverseCDFBisection(p, shape, scale);
    }
    /**
     * 감마 분포의 PDF
     */
    static gammaPDF(x, shape, scale = 1) {
        if (x < 0)
            return 0;
        if (shape <= 0 || scale <= 0) {
            throw new Error('Shape and scale parameters must be positive');
        }
        const a = shape;
        const b = scale;
        return Math.exp((a - 1) * Math.log(x) - x / b - a * Math.log(b) - this.lnGamma(a));
    }
    /**
     * Wilson-Hilferty approximation for initial guess
     */
    static wilsonHilfertyApproximation(p, shape) {
        const z = this.normalInverseCDF(p);
        const h = 2 / (9 * shape);
        return shape * Math.pow(1 - h + z * Math.sqrt(h), 3);
    }
    /**
     * 정규분포 역함수 (간단한 근사)
     */
    static normalInverseCDF(p) {
        // Beasley-Springer-Moro algorithm approximation
        const a = [
            2.50662823884,
            -18.61500062529,
            41.39119773534,
            -25.44106049637
        ];
        const b = [
            -8.47351093090,
            23.08336743743,
            -21.06224101826,
            3.13082909833
        ];
        const c = [
            0.3374754822726147,
            0.9761690190917186,
            0.1607979714918209,
            0.0276438810333863,
            0.0038405729373609,
            0.0003951896511919,
            0.0000321767881768,
            0.0000002888167364,
            0.0000003960315187
        ];
        const y = p - 0.5;
        if (Math.abs(y) < 0.42) {
            const r = y * y;
            return y * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) /
                ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
        }
        let r = p;
        if (y > 0)
            r = 1 - p;
        r = Math.log(-Math.log(r));
        let x = c[0];
        for (let i = 1; i < 9; i++) {
            x = x * r + c[i];
        }
        if (y < 0)
            x = -x;
        return x;
    }
    /**
     * Bisection method fallback for inverse CDF
     */
    static gammaInverseCDFBisection(p, shape, scale) {
        let low = 0;
        let high = shape * scale * 10; // Initial upper bound
        // Find appropriate upper bound
        while (this.gammaCDF(high, shape, scale) < p) {
            high *= 2;
        }
        const epsilon = 1e-10;
        const maxIterations = 100;
        for (let i = 0; i < maxIterations; i++) {
            const mid = (low + high) / 2;
            const cdf = this.gammaCDF(mid, shape, scale);
            if (Math.abs(cdf - p) < epsilon) {
                return mid;
            }
            if (cdf < p) {
                low = mid;
            }
            else {
                high = mid;
            }
            if (high - low < epsilon) {
                return mid;
            }
        }
        return (low + high) / 2;
    }
    /**
     * 카이제곱 분포 관련 함수 (감마 분포의 특수한 경우)
     * χ²(df) = Gamma(df/2, 2)
     */
    static chiSquaredCDF(x, df) {
        return this.gammaCDF(x, df / 2, 2);
    }
    static chiSquaredInverseCDF(p, df) {
        return this.gammaInverseCDF(p, df / 2, 2);
    }
}
exports.GammaDistribution = GammaDistribution;
/**
 * 정규분포 클래스
 * Normal Distribution functions
 */
class NormalDistribution {
    /**
     * 표준 정규분포 CDF (평균=0, 표준편차=1)
     * Standard normal cumulative distribution function
     */
    static standardNormalCDF(x) {
        // Using the error function approximation
        return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
    }
    /**
     * 정규분포 CDF (일반적인 경우)
     * Normal distribution CDF with mean and standard deviation
     */
    static normalCDF(x, mean = 0, stdDev = 1) {
        if (stdDev <= 0) {
            throw new Error('Standard deviation must be positive');
        }
        const z = (x - mean) / stdDev;
        return this.standardNormalCDF(z);
    }
    /**
     * 표준 정규분포 PDF (평균=0, 표준편차=1)
     * Standard normal probability density function
     */
    static standardNormalPDF(x) {
        return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    }
    /**
     * 정규분포 PDF (일반적인 경우)
     * Normal distribution PDF with mean and standard deviation
     */
    static normalPDF(x, mean = 0, stdDev = 1) {
        if (stdDev <= 0) {
            throw new Error('Standard deviation must be positive');
        }
        const z = (x - mean) / stdDev;
        return this.standardNormalPDF(z) / stdDev;
    }
    /**
     * 표준 정규분포 역함수 (shape, scale 파라미터 버전)
     * Standard normal inverse CDF using shape and scale parameters
     *
     * @param p 확률 (0 < p < 1)
     * @param shape 형태 매개변수 (정규분포에서는 평균)
     * @param scale 척도 매개변수 (정규분포에서는 표준편차)
     * @returns 분위수 값
     */
    static normalInverseCDF(p, shape = 0, scale = 1) {
        if (p <= 0 || p >= 1) {
            throw new Error('Probability p must be between 0 and 1 (exclusive)');
        }
        if (scale <= 0) {
            throw new Error('Scale parameter (standard deviation) must be positive');
        }
        // 표준 정규분포 역함수 계산
        const standardZ = this.standardNormalInverseCDF(p);
        // 일반 정규분포로 변환: X = μ + σZ
        return shape + scale * standardZ;
    }
    /**
     * 표준 정규분포 역함수 (평균=0, 표준편차=1)
     * Standard normal inverse CDF using improved Beasley-Springer-Moro algorithm
     */
    static standardNormalInverseCDF(p) {
        if (p <= 0 || p >= 1) {
            throw new Error('Probability p must be between 0 and 1 (exclusive)');
        }
        // Beasley-Springer-Moro algorithm with higher precision
        const a = [
            -3.969683028665376e+01,
            2.209460984245205e+02,
            -2.759285104469687e+02,
            1.383577518672690e+02,
            -3.066479806614716e+01,
            2.506628277459239e+00
        ];
        const b = [
            -5.447609879822406e+01,
            1.615858368580409e+02,
            -1.556989798598866e+02,
            6.680131188771972e+01,
            -1.328068155288572e+01
        ];
        const c = [
            -7.784894002430293e-03,
            -3.223964580411365e-01,
            -2.400758277161838e+00,
            -2.549732539343734e+00,
            4.374664141464968e+00,
            2.938163982698783e+00
        ];
        const d = [
            7.784695709041462e-03,
            3.224671290700398e-01,
            2.445134137142996e+00,
            3.754408661907416e+00
        ];
        // Define break-points
        const pLow = 0.02425;
        const pHigh = 1 - pLow;
        let x;
        if (p < pLow) {
            // Rational approximation for lower region
            const q = Math.sqrt(-2 * Math.log(p));
            x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        }
        else if (p <= pHigh) {
            // Rational approximation for central region
            const q = p - 0.5;
            const r = q * q;
            x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
                (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
        }
        else {
            // Rational approximation for upper region
            const q = Math.sqrt(-2 * Math.log(1 - p));
            x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        }
        // One iteration of Halley's rational method to improve accuracy
        const e = 0.5 * this.erfc(-x / Math.sqrt(2)) - p;
        const u = e * Math.sqrt(2 * Math.PI) * Math.exp(x * x / 2);
        x = x - u / (1 + x * u / 2);
        return x;
    }
    /**
     * 오차함수 (Error Function)
     * Approximation of the error function using Abramowitz and Stegun method
     */
    static erf(x) {
        // Constants for Abramowitz and Stegun approximation
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;
        // Save the sign of x
        const sign = x >= 0 ? 1 : -1;
        x = Math.abs(x);
        // A&S formula 7.1.26
        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        return sign * y;
    }
    /**
     * 여오차함수 (Complementary Error Function)
     * erfc(x) = 1 - erf(x)
     */
    static erfc(x) {
        return 1 - this.erf(x);
    }
    /**
     * 정규분포 분위수 함수 (Quantile Function)
     * 별칭: 역함수와 동일한 기능
     */
    static normalQuantile(p, mean = 0, stdDev = 1) {
        return this.normalInverseCDF(p, mean, stdDev);
    }
    /**
     * 신뢰구간 계산
     * Calculate confidence interval for normal distribution
     */
    static confidenceInterval(mean, stdDev, confidenceLevel, sampleSize) {
        if (confidenceLevel <= 0 || confidenceLevel >= 1) {
            throw new Error('Confidence level must be between 0 and 1');
        }
        const alpha = 1 - confidenceLevel;
        const zAlphaHalf = this.standardNormalInverseCDF(1 - alpha / 2);
        let standardError = stdDev;
        if (sampleSize && sampleSize > 0) {
            standardError = stdDev / Math.sqrt(sampleSize);
        }
        const margin = zAlphaHalf * standardError;
        return [mean - margin, mean + margin];
    }
}
exports.NormalDistribution = NormalDistribution;
