export declare class GammaDistribution {
    static gamma(x: number): number;
    /**
     * 자연로그 감마 함수 ln(Γ(x)) 계산
     * 수치적 안정성을 위해 사용
     */
    static lnGamma(x: number): number;
    /**
     * 하부 불완전 감마 함수 γ(a, x) 계산
     * Series expansion for small x, continued fraction for large x
     */
    static lowerIncompleteGamma(a: number, x: number): number;
    /**
     * 정규화된 하부 불완전 감마 함수 P(a, x) = γ(a, x) / Γ(a)
     * 감마 분포의 CDF
     */
    static gammaCDF(x: number, shape: number, scale?: number): number;
    /**
     * 정규화된 하부 불완전 감마 함수 P(a, x)
     */
    static regularizedGammaP(a: number, x: number): number;
    /**
     * Series expansion for incomplete gamma function
     */
    private static gammaSeries;
    /**
     * Continued fraction for incomplete gamma function
     */
    private static gammaContinuedFraction;
    /**
     * 감마 분포의 역함수 (Quantile function)
     * Newton-Raphson 방법 사용
     */
    static gammaInverseCDF(p: number, shape: number, scale?: number): number;
    /**
     * 감마 분포의 PDF
     */
    static gammaPDF(x: number, shape: number, scale?: number): number;
    /**
     * Wilson-Hilferty approximation for initial guess
     */
    private static wilsonHilfertyApproximation;
    /**
     * 정규분포 역함수 (간단한 근사)
     */
    static normalInverseCDF(p: number): number;
    /**
     * Bisection method fallback for inverse CDF
     */
    private static gammaInverseCDFBisection;
    /**
     * 카이제곱 분포 관련 함수 (감마 분포의 특수한 경우)
     * χ²(df) = Gamma(df/2, 2)
     */
    static chiSquaredCDF(x: number, df: number): number;
    static chiSquaredInverseCDF(p: number, df: number): number;
}
/**
 * 정규분포 클래스
 * Normal Distribution functions
 */
export declare class NormalDistribution {
    /**
     * 표준 정규분포 CDF (평균=0, 표준편차=1)
     * Standard normal cumulative distribution function
     */
    static standardNormalCDF(x: number): number;
    /**
     * 정규분포 CDF (일반적인 경우)
     * Normal distribution CDF with mean and standard deviation
     */
    static normalCDF(x: number, mean?: number, stdDev?: number): number;
    /**
     * 표준 정규분포 PDF (평균=0, 표준편차=1)
     * Standard normal probability density function
     */
    static standardNormalPDF(x: number): number;
    /**
     * 정규분포 PDF (일반적인 경우)
     * Normal distribution PDF with mean and standard deviation
     */
    static normalPDF(x: number, mean?: number, stdDev?: number): number;
    /**
     * 표준 정규분포 역함수 (shape, scale 파라미터 버전)
     * Standard normal inverse CDF using shape and scale parameters
     *
     * @param p 확률 (0 < p < 1)
     * @param shape 형태 매개변수 (정규분포에서는 평균)
     * @param scale 척도 매개변수 (정규분포에서는 표준편차)
     * @returns 분위수 값
     */
    static normalInverseCDF(p: number, shape?: number, scale?: number): number;
    /**
     * 표준 정규분포 역함수 (평균=0, 표준편차=1)
     * Standard normal inverse CDF using improved Beasley-Springer-Moro algorithm
     */
    static standardNormalInverseCDF(p: number): number;
    /**
     * 오차함수 (Error Function)
     * Approximation of the error function using Abramowitz and Stegun method
     */
    private static erf;
    /**
     * 여오차함수 (Complementary Error Function)
     * erfc(x) = 1 - erf(x)
     */
    private static erfc;
    /**
     * 정규분포 분위수 함수 (Quantile Function)
     * 별칭: 역함수와 동일한 기능
     */
    static normalQuantile(p: number, mean?: number, stdDev?: number): number;
    /**
     * 신뢰구간 계산
     * Calculate confidence interval for normal distribution
     */
    static confidenceInterval(mean: number, stdDev: number, confidenceLevel: number, sampleSize?: number): [number, number];
}
