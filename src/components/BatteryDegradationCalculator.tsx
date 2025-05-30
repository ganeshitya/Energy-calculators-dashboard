// src/components/BatteryDegradationCalculator.tsx
import { useState, FC } from 'react';

const BatteryDegradationCalculator: FC = () => {
  // State for input values
  const [initialCapacity, setInitialCapacity] = useState<number>(100);
  const [cyclesPerYear, setCyclesPerYear] = useState<number>(200);
  const [years, setYears] = useState<number>(5);
  const [degradationRatePerCycle, setDegradationRatePerCycle] = useState<number>(0.01); // Example: 0.01 for 0.01% per cycle

  // State for results, explicitly typed as number or null
  const [finalCapacity, setFinalCapacity] = useState<number | null>(null);
  const [totalDegradation, setTotalDegradation] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateDegradation = () => {
    if (isNaN(initialCapacity) || isNaN(cyclesPerYear) || isNaN(years) || isNaN(degradationRatePerCycle) ||
        initialCapacity <= 0 || cyclesPerYear < 0 || years <= 0 || degradationRatePerCycle < 0) {
      alert('Please enter valid numbers for all inputs.');
      setFinalCapacity(null);
      setTotalDegradation(null);
      setShowResult(true);
      return;
    }

    const totalCycles = cyclesPerYear * years;
    const totalDegradationPercentage = totalCycles * degradationRatePerCycle; // e.g., 200 * 5 * 0.01 = 10%

    if (totalDegradationPercentage >= 100) {
        setFinalCapacity(0); // Cannot go below 0% capacity
        setTotalDegradation(100);
    } else {
        const remainingCapacityPercentage = initialCapacity - totalDegradationPercentage;
        setFinalCapacity(parseFloat(remainingCapacityPercentage.toFixed(2)));
        setTotalDegradation(parseFloat(totalDegradationPercentage.toFixed(2)));
    }
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 max-w-md mx-auto my-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Battery Degradation Simulator</h2>

      <div className="mb-5">
        <label htmlFor="initialCapacity" className="block text-gray-700 text-base font-semibold mb-2">
          Initial Battery Capacity (%):
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

      <div className="mb-6">
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

      <button
        onClick={calculateDegradation}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 w-full transition duration-200 text-lg"
      >
        Calculate Degradation
      </button>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-semibold text-center">
          {finalCapacity !== null ? (
            <>
              <p>Final Capacity: <span className="text-2xl font-extrabold">{finalCapacity}%</span></p>
              <p>Total Degradation: <span className="text-xl font-bold">{totalDegradation}%</span></p>
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
