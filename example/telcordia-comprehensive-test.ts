/**
 * Telcordia SR-332 Comprehensive Test Suite
 * 
 * This example demonstrates comprehensive testing of the Telcordia reliability 
 * prediction calculator with all three calculation methods and various component types.
 */

import { TelcordiaCalculator } from '../src/standard/telcordia/calculator';
import { 
    TelcordiaPredictionCtx,
    TelcordiaQualityFactor,
    TelcordiaEnvironmentFactor
} from '../src/standard/telcordia/sr332';

import { TelcordiaCapacitor } from '../src/standard/telcordia/category/capacitors';
import { TelcordiaConnector } from '../src/standard/telcordia/category/connectors';
import { TelcordiaDiode } from '../src/standard/telcordia/category/diodes';
import { TelcordiaResistor } from '../src/standard/telcordia/category/resistor';
import { TelcordiaTransistor } from '../src/standard/telcordia/category/transistor';
import { TelcordiaAnalogIC } from '../src/standard/telcordia/category/ic';

// Test results interface
interface TestResult {
    testName: string;
    passed: boolean;
    failureRate: number;
    expectedRange?: [number, number];
    details?: string;
    error?: string;
}

class TelcordiaTestSuite {
    private results: TestResult[] = [];

    async runAllTests(): Promise<TestResult[]> {
        console.log('🚀 Starting Telcordia SR-332 Comprehensive Test Suite\n');
        
        // Method I Tests
        await this.testMethodI();
        
        // Method II Tests  
        await this.testMethodII();
        
        // Method III Tests
        await this.testMethodIII();
        
        // UCL Tests
        await this.testUCL();
        
        // System Level Tests
        await this.testSystemLevel();
        
        // Edge Cases Tests
        await this.testEdgeCases();
        
        this.printResults();
        return this.results;
    }

    private async testMethodI(): Promise<void> {
        console.log('📋 Testing METHOD_I (Base Prediction Models)');
        
        try {
            const ctx = new TelcordiaPredictionCtx();
            ctx.setMethod('METHOD_I');
            const calculator = new TelcordiaCalculator();
            calculator.setCtx(ctx);

            // Test 1: Ceramic Capacitor
            const ceramicCapCategory = TelcordiaCapacitor.subCategories![0].subCategories!.find(
                sub => sub.name === 'Ceramic'
            )!;
            
            const capacitor = ctx.createDevice(ceramicCapCategory);
            capacitor.specifications = {
                tRef: 40,
                tOp: 70,
                appliedDCVoltage: 3.3,
                acPeakVoltage: 0.5,
                ratedVoltage: 10,
                capacitance: 100,
                qFactor: TelcordiaQualityFactor.LEVEL_2,
                quantity: 1
            };

            const capResult = calculator.calcDevice(capacitor);
            this.addTestResult('METHOD_I - Ceramic Capacitor', 
                capResult.failureRate > 0, 
                capResult.failureRate,
                [0.01, 10],
                `Expected positive failure rate for ceramic capacitor`
            );

            // Test 2: Multi-Pin Connector
            const connectorCategory = TelcordiaConnector.subCategories!.find(
                sub => sub.name === 'Multi-Pin'
            )!;
            
            const connector = ctx.createDevice(connectorCategory);
            connector.specifications = {
                tRef: 40,
                tOp: 50,
                pins: 20,
                qFactor: TelcordiaQualityFactor.LEVEL_2,
                quantity: 1
            };

            const connResult = calculator.calcDevice(connector);
            this.addTestResult('METHOD_I - Multi-Pin Connector', 
                connResult.failureRate > 0, 
                connResult.failureRate,
                [0.5, 5],
                `20-pin connector should have moderate failure rate`
            );

            // Test 3: Silicon Diode
            const diodeCategory = TelcordiaDiode.subCategories!.find(
                sub => sub.name === 'Silicon General Purpose ≤ 20 AMP'
            )!;
            
            const diode = ctx.createDevice(diodeCategory);
            diode.specifications = {
                tRef: 40,
                tOp: 60,
                ratedVoltage: 50,
                ratedCurrent: 1,
                qFactor: TelcordiaQualityFactor.LEVEL_2,
                quantity: 1
            };

            const diodeResult = calculator.calcDevice(diode);
            this.addTestResult('METHOD_I - Silicon Diode', 
                diodeResult.failureRate > 0, 
                diodeResult.failureRate,
                [0.1, 2],
                `Silicon diode should have low-moderate failure rate`
            );

            console.log('   ✅ METHOD_I basic tests completed');

        } catch (error) {
            this.addTestResult('METHOD_I - General', false, 0, undefined, '', (error as Error).message);
        }
    }

    private async testMethodII(): Promise<void> {
        console.log('📋 Testing METHOD_II (Laboratory Data Integration)');
        
        try {
            const ctx = new TelcordiaPredictionCtx();
            ctx.setMethod('METHOD_II');
            const calculator = new TelcordiaCalculator();
            calculator.setCtx(ctx);

            // Test with laboratory data
            const ceramicCapCategory = TelcordiaCapacitor.subCategories![0].subCategories!.find(
                sub => sub.name === 'Ceramic'
            )!;
            
            const capacitor = ctx.createDevice(ceramicCapCategory);
            capacitor.specifications = {
                tRef: 40,
                tOp: 70,
                appliedDCVoltage: 3.3,
                acPeakVoltage: 0.5,
                ratedVoltage: 10,
                qFactor: TelcordiaQualityFactor.LEVEL_2,
                quantity: 1
            };

            // Add laboratory data
            capacitor.integratingLaboratoryData = {
                numberOfDeviceFailures: 2,
                numberOfDevicesOnTest: 100,
                actualTimeOnTest: 8760, // 1 year
                laboratoryTestTemperatureFactor: 0.15,
                laboratoryTestQualityFactor: TelcordiaQualityFactor.LEVEL_2
            };

            const result = calculator.calcDevice(capacitor);
            this.addTestResult('METHOD_II - Lab Data Integration', 
                result.failureRate > 0, 
                result.failureRate,
                [0.01, 5],
                `Method II should integrate laboratory test data`
            );

            // Test with burn-in data
            capacitor.burnInTime = 168; // 1 week burn-in
            const burnInResult = calculator.calcDevice(capacitor);
            this.addTestResult('METHOD_II - Burn-in Integration', 
                burnInResult.failureRate !== result.failureRate, 
                burnInResult.failureRate,
                undefined,
                `Burn-in should affect failure rate calculation`
            );

            console.log('   ✅ METHOD_II tests completed');

        } catch (error) {
            this.addTestResult('METHOD_II - General', false, 0, undefined, '', (error as Error).message);
        }
    }

    private async testMethodIII(): Promise<void> {
        console.log('📋 Testing METHOD_III (Field Data Integration)');
        
        try {
            const ctx = new TelcordiaPredictionCtx();
            ctx.setMethod('METHOD_III');
            const calculator = new TelcordiaCalculator();
            calculator.setCtx(ctx);

            const resistorCategory = TelcordiaResistor.subCategories!.find(
                sub => sub.name === 'FIXED'
            )!.subCategories!.find(
                sub => sub.name === 'Film (Carbon, Oxide, Metal)'
            )!;
            
            const resistor = ctx.createDevice(resistorCategory);
            resistor.specifications = {
                tRef: 40,
                tOp: 55,
                resistance: 10000,
                appliedPower: 0.1,
                ratedPower: 0.25,
                qFactor: TelcordiaQualityFactor.LEVEL_2,
                quantity: 1
            };

            // Add field data
            resistor.integratingFieldData = {
                totalOperatingHours: 87600, // 10 years
                fieldFailureCount: 3,
                fieldEnvironmentFactor: TelcordiaEnvironmentFactor.GROUND_FIXED_CONTROLLED,
                adjustmentFactor: 1.0
            };

            const result = calculator.calcDevice(resistor);
            this.addTestResult('METHOD_III - Field Data Integration', 
                result.failureRate > 0, 
                result.failureRate,
                [0.01, 2],
                `Method III should integrate field experience data`
            );

            console.log('   ✅ METHOD_III tests completed');

        } catch (error) {
            this.addTestResult('METHOD_III - General', false, 0, undefined, '', (error as Error).message);
        }
    }

    private async testUCL(): Promise<void> {
        console.log('📋 Testing UCL (Upper Confidence Limit)');
        
        try {
            const ctx = new TelcordiaPredictionCtx();
            ctx.setMethod('METHOD_I');
            ctx.appliedUCL = true;
            ctx.confidenceLevel = 0.95;
            
            const calculator = new TelcordiaCalculator();
            calculator.setCtx(ctx);

            const capacitorCategory = TelcordiaCapacitor.subCategories![0].subCategories!.find(
                sub => sub.name === 'Ceramic'
            )!;
            
            const capacitor = ctx.createDevice(capacitorCategory);
            capacitor.specifications = {
                tRef: 40,
                tOp: 70,
                appliedDCVoltage: 3.3,
                acPeakVoltage: 0.5,
                ratedVoltage: 10,
                qFactor: TelcordiaQualityFactor.LEVEL_2,
                quantity: 1
            };

            const resultWithUCL = calculator.calcDevice(capacitor);
            
            // Compare with non-UCL result
            ctx.appliedUCL = false;
            const resultWithoutUCL = calculator.calcDevice(capacitor);

            this.addTestResult('UCL - 95% Confidence', 
                resultWithUCL.failureRate >= resultWithoutUCL.failureRate, 
                resultWithUCL.failureRate,
                undefined,
                `UCL should increase failure rate for conservative estimation`
            );

            console.log('   ✅ UCL tests completed');

        } catch (error) {
            this.addTestResult('UCL - General', false, 0, undefined, '', (error as Error).message);
        }
    }

    private async testSystemLevel(): Promise<void> {
        console.log('📋 Testing System-Level Calculations');
        
        try {
            const ctx = new TelcordiaPredictionCtx();
            ctx.setMethod('METHOD_I');
            const calculator = new TelcordiaCalculator();
            calculator.setCtx(ctx);

            // Create multiple devices
            const devices = [];

            // Capacitor
            const capCategory = TelcordiaCapacitor.subCategories![0].subCategories!.find(
                sub => sub.name === 'Ceramic'
            )!;
            const cap = ctx.createDevice(capCategory);
            cap.specifications = {
                tRef: 40, tOp: 70, appliedDCVoltage: 3.3, acPeakVoltage: 0.5,
                ratedVoltage: 10, qFactor: TelcordiaQualityFactor.LEVEL_2, quantity: 5
            };
            devices.push(cap);

            // Resistors
            const resCategory = TelcordiaResistor.subCategories![0].subCategories![1];
            const res = ctx.createDevice(resCategory);
            res.specifications = {
                tRef: 40, tOp: 55, resistance: 1000, appliedPower: 0.1, ratedPower: 0.25,
                qFactor: TelcordiaQualityFactor.LEVEL_2, quantity: 10
            };
            devices.push(res);

            // Create unit
            const unit = ctx.createUnit(devices.map(d => d.id));
            unit.alias = 'Test Unit';
            unit.environmentFactor = TelcordiaEnvironmentFactor.GROUND_FIXED_CONTROLLED;

            const unitResult = calculator.calcUnit(unit);
            
            // Create system
            const system = ctx.createSystem([unit.id]);
            system.alias = 'Test System';
            
            const systemResult = calculator.calcSystem(system);
            const finalResult = calculator.calc();

            this.addTestResult('System Level - Unit Calculation', 
                unitResult.failureRate > 0, 
                unitResult.failureRate,
                undefined,
                `Unit should aggregate device failure rates`
            );

            this.addTestResult('System Level - System Calculation', 
                systemResult.failureRate >= unitResult.failureRate, 
                systemResult.failureRate,
                undefined,
                `System should include unit failure rates`
            );

            this.addTestResult('System Level - Final Calculation', 
                finalResult.failureRate === systemResult.failureRate, 
                finalResult.failureRate,
                undefined,
                `Final calculation should match system calculation`
            );

            console.log('   ✅ System-level tests completed');

        } catch (error) {
            this.addTestResult('System Level - General', false, 0, undefined, '', (error as Error).message);
        }
    }

    private async testEdgeCases(): Promise<void> {
        console.log('📋 Testing Edge Cases');
        
        try {
            const ctx = new TelcordiaPredictionCtx();
            const calculator = new TelcordiaCalculator();
            calculator.setCtx(ctx);

            // Test 1: No method set
            try {
                (ctx as any).method = undefined; // Clear the default method
                const cap = ctx.createDevice(TelcordiaCapacitor.subCategories![0].subCategories![0]);
                calculator.calcDevice(cap);
                this.addTestResult('Edge Case - No Method Set', false, 0, undefined, 'Should throw error');
            } catch (error) {
                this.addTestResult('Edge Case - No Method Set', true, 0, undefined, 'Correctly throws error when no method set');
            }

            // Test 2: Invalid device category
            ctx.setMethod('METHOD_I');
            try {
                const invalidCategory = { ...TelcordiaCapacitor.subCategories![0].subCategories![0] };
                delete (invalidCategory as any).g_fr;
                const device = ctx.createDevice(invalidCategory as any);
                calculator.calcDevice(device);
                this.addTestResult('Edge Case - Invalid Category', false, 0, undefined, 'Should throw error');
            } catch (error) {
                this.addTestResult('Edge Case - Invalid Category', true, 0, undefined, 'Correctly validates device category');
            }

            // Test 3: Extreme temperature values
            const capCategory = TelcordiaCapacitor.subCategories![0].subCategories![0];
            const extremeTempDevice = ctx.createDevice(capCategory);
            extremeTempDevice.specifications = {
                tRef: 40,
                tOp: 150, // Very high temperature
                appliedDCVoltage: 1,
                ratedVoltage: 10,
                qFactor: TelcordiaQualityFactor.LEVEL_2,
                quantity: 1
            };

            const extremeResult = calculator.calcDevice(extremeTempDevice);
            this.addTestResult('Edge Case - Extreme Temperature', 
                extremeResult.failureRate > 0, 
                extremeResult.failureRate,
                undefined,
                `Should handle extreme temperature values`
            );

            console.log('   ✅ Edge case tests completed');

        } catch (error) {
            this.addTestResult('Edge Cases - General', false, 0, undefined, '', (error as Error).message);
        }
    }

    private addTestResult(testName: string, passed: boolean, failureRate: number, 
                         expectedRange?: [number, number], details?: string, error?: string): void {
        // Check if failure rate is within expected range
        if (expectedRange && passed) {
            const [min, max] = expectedRange;
            passed = failureRate >= min && failureRate <= max;
            if (!passed) {
                details += ` (Expected: ${min}-${max}, Got: ${failureRate.toFixed(6)})`;
            }
        }

        this.results.push({
            testName,
            passed,
            failureRate,
            expectedRange,
            details,
            error
        });
    }

    private printResults(): void {
        console.log('\n' + '='.repeat(80));
        console.log('📊 TEST RESULTS SUMMARY');
        console.log('='.repeat(80));

        const passed = this.results.filter(r => r.passed).length;
        const total = this.results.length;
        const passRate = ((passed / total) * 100).toFixed(1);

        console.log(`\n🎯 Overall: ${passed}/${total} tests passed (${passRate}%)\n`);

        this.results.forEach((result, index) => {
            const status = result.passed ? '✅' : '❌';
            const rate = result.failureRate > 0 ? `(${result.failureRate.toFixed(6)} FITs)` : '';
            
            console.log(`${status} ${index + 1}. ${result.testName} ${rate}`);
            
            if (result.details) {
                console.log(`    📝 ${result.details}`);
            }
            
            if (result.error) {
                console.log(`    ❗ Error: ${result.error}`);
            }
            
            if (result.expectedRange) {
                const [min, max] = result.expectedRange;
                console.log(`    📊 Expected range: ${min} - ${max} FITs`);
            }
            
            console.log('');
        });

        // Summary by category
        const categories = ['METHOD_I', 'METHOD_II', 'METHOD_III', 'UCL', 'System Level', 'Edge Case'];
        console.log('📈 Results by Category:');
        categories.forEach(category => {
            const categoryResults = this.results.filter(r => r.testName.startsWith(category));
            if (categoryResults.length > 0) {
                const categoryPassed = categoryResults.filter(r => r.passed).length;
                console.log(`   ${category}: ${categoryPassed}/${categoryResults.length}`);
            }
        });

        console.log('\n' + '='.repeat(80));
        
        if (passed === total) {
            console.log('🎉 All tests passed! Telcordia calculator is working correctly.');
        } else {
            console.log('⚠️  Some tests failed. Please review the implementation.');
        }
    }
}

// Run the test suite
async function runTelcordiaTests() {
    const testSuite = new TelcordiaTestSuite();
    const results = await testSuite.runAllTests();
    return results;
}

// Export for use in other test files
export { TelcordiaTestSuite, runTelcordiaTests };

// Run tests if this file is executed directly
if (require.main === module) {
    runTelcordiaTests().catch(console.error);
}