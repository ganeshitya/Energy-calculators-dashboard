// src/components/BatteryDegradationCalculator.tsx
import { useState } from 'react';
import type { FC } from 'react';

const BatteryDegradationCalculator: FC = () => {
  // State for input values
  const [initialCapacity, setInitialCapacity] = useState<number>(100);
  const [cyclesPerYear, setCyclesPerYear] = useState<number>(200);
  const [years, setYears] = useState<number>(5);
  const [degradationRatePerCycle, setDegradationRatePerCycle] = useState<number>(0.01); // Example: 0.01 for 0.01% per cycle
  const [tempFactor, setTempFactor] = useState<number>(1.0); // Temperature Factor (0-1)
  const [dodFactor, setDodFactor] = useState<number>(1.0); // Depth of Discharge Factor (0-1)

  // State for results
  const [totalCycles, setTotalCycles] = useState<number | null>(null);
  const [adjustedDegradationRate, setAdjustedDegradationRate] = useState<number | null>(null);
  const [totalCapacityDegradation, setTotalCapacityDegradation] = useState<number | null>(null);
  const [finalCapacity, setFinalCapacity] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateDegradation = () => {
    if (isNaN(initialCapacity) || isNaN(cyclesPerYear) || isNaN(years) || isNaN(degradationRatePerCycle) ||
        isNaN(tempFactor) || isNaN(dodFactor) ||
        initialCapacity <= 0 || cyclesPerYear < 0 || years <= 0 || degradationRatePerCycle < 0 ||
        tempFactor < 0 || tempFactor > 1 || dodFactor < 0 || dodFactor > 1) {
      alert('Please enter valid numbers for all inputs. Factors should be between 0 and 1.');
      setTotalCycles(null);
      setAdjustedDegradationRate(null);
      setTotalCapacityDegradation(null);
      setFinalCapacity(null);
      setShowResult(true);
      return;
    }

    // Calculations matching Streamlit app
    const calculatedTotalCycles = cyclesPerYear * years;
    const calculatedAdjustedDegradationRate = degradationRatePerCycle * tempFactor * dodFactor;
    const calculatedTotalDegradationPercentage = calculatedTotalCycles * calculatedAdjustedDegradationRate;

    const remainingCapacityPercentage = initialCapacity - calculatedTotalDegradationPercentage;

    setTotalCycles(calculatedTotalCycles);
    setAdjustedDegradationRate(parseFloat(calculatedAdjustedDegradationRate.toFixed(4))); // 4 decimal places for rate
    setTotalCapacityDegradation(parseFloat(calculatedTotalDegradationPercentage.toFixed(2)));
    setFinalCapacity(parseFloat(Math.max(0, remainingCapacityPercentage).toFixed(2))); // Capacity cannot go below 0%
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 max-w-md mx-auto my-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Battery Degradation Simulator</h2>

      <div className="mb-5">
        <label htmlFor="initialCapacity" className="block text-gray-700 text-base font-semibold mb-2">
          Initial Capacity (%):
        </label>
        <input
          type="number"
          id="initialCapacity"
          value={initialCapacity}
          onChange={(e) => setInitialCapacity(parseFloat(e.target.value))}
          step="1"
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 100"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="cyclesPerYear" className="block text-gray-700 text-base font-semibold mb-2">
          Average Cycles Per Year:
        </label>
        <input
          type="number"
          id="cyclesPerYear"
          value={cyclesPerYear}
          onChange={(e) => setCyclesPerYear(parseFloat(e.target.value))}
          step="1"
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 200"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="years" className="block text-gray-700 text-base font-semibold mb-2">
          Number of Years:
        </label>
        <input
          type="number"
          id="years"
          value={years}
          onChange={(e) => setYears(parseFloat(e.target.value))}
          step="1"
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 5"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="degradationRatePerCycle" className="block text-gray-700 text-base font-semibold mb-2">
          Degradation Rate Per Cycle (%):
        </label>
        <input
          type="number"
          id="degradationRatePerCycle"
          value={degradationRatePerCycle}
          onChange={(e) => setDegradationRatePerCycle(parseFloat(e.target.value))}
          step="0.001"
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 0.01"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="tempFactor" className="block text-gray-700 text-base font-semibold mb-2">
          Temperature Factor (0-1):
        </label>
        <input
          type="number"
          id="tempFactor"
          value={tempFactor}
          onChange={(e) => setTempFactor(parseFloat(e.target.value))}
          step="0.01"
          min="0"
          max="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 1.0"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dodFactor" className="block text-gray-700 text-base font-semibold mb-2">
          Depth of Discharge Factor (0-1):
        </label>
        <input
          type="number"
          id="dodFactor"
          value={dodFactor}
          onChange={(e) => setDodFactor(parseFloat(e.target.value))}
          step="0.01"
          min="0"
          max="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 1.0"
        />
      </div>

      <button
        onClick={calculateDegradation}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 w-full transition duration-200 text-lg"
      >
        Calculate Degradation
      </button>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-semibold text-center space-y-2">
          {finalCapacity !== null ? (
            <>
              <p>Total Cycles Over Period: <span className="text-xl font-extrabold">{totalCycles}</span> cycles</p>
              <p>Adjusted Degradation Rate Per Cycle: <span className="text-xl font-extrabold">{adjustedDegradationRate}%</span></p>
              <p>Total Capacity Degradation: <span className="text-xl font-extrabold">{totalCapacityDegradation}%</span></p>
              <p>Final Battery Capacity: <span className="text-2xl font-extrabold">{finalCapacity}%</span></p>
            </>
          ) : (
            <span className="text-red-600">Please enter valid inputs.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default BatteryDegradationCalculator;
