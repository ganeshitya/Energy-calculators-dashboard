// src/components/BatteryDegradationCalculator.tsx
import { useState } from 'react';
import type { FC } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface DegradationData {
  year: number;
  capacity: number;
}

const BatteryDegradationCalculator: FC = () => {
  // State for input values
  const [initialCapacity, setInitialCapacity] = useState<number>(100);
  const [cyclesPerYear, setCyclesPerYear] = useState<number>(200);
  const [years, setYears] = useState<number>(5);
  const [degradationRatePerCycle, setDegradationRatePerCycle] = useState<number>(0.01); // Example: 0.01 for 0.01% per cycle
  const [tempFactor, setTempFactor] = useState<number>(1.0); // Temperature Factor (0-1)
  const [dodFactor, setDodFactor] = useState<number>(1.0); // Depth of Discharge Factor (0-1)
  
  // State for email input and modal visibility
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // State for results and graph data
  const [totalCycles, setTotalCycles] = useState<number | null>(null);
  const [adjustedDegradationRate, setAdjustedDegradationRate] = useState<number | null>(null);
  const [totalCapacityDegradation, setTotalCapacityDegradation] = useState<number | null>(null);
  const [finalCapacity, setFinalCapacity] = useState<number | null>(null);
  const [degradationChartData, setDegradationChartData] = useState<DegradationData[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for calculation errors

  // Function to handle the click of the Calculate button
  const handleCalculateClick = () => {
    setErrorMessage(null); // Clear previous calculation errors
    setEmailError(null); // Clear previous email errors
    setShowResult(false); // Hide previous result

    // Perform initial validation before showing modal
    if (isNaN(initialCapacity) || isNaN(cyclesPerYear) || isNaN(years) || isNaN(degradationRatePerCycle) ||
        isNaN(tempFactor) || isNaN(dodFactor) ||
        initialCapacity <= 0 || cyclesPerYear < 0 || years <= 0 || degradationRatePerCycle < 0 ||
        tempFactor < 0 || tempFactor > 1 || dodFactor < 0 || dodFactor > 1) {
      setErrorMessage('Please enter valid numbers for all inputs. Factors should be between 0 and 1.');
      return;
    }

    // If all calculation inputs are valid, show the email modal
    setShowEmailModal(true);
  };

  // Function to perform the actual calculation and generate graph data after email is entered
  const performCalculation = () => {
    setEmailError(null); // Clear previous email errors

    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
        setEmailError('Please enter a valid email address to proceed.');
        return;
    }

    // Close the modal
    setShowEmailModal(false);

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

    // Generate data for the degradation graph
    const chartData: DegradationData[] = [];
    let currentCapacity = initialCapacity;
    const annualDegradationPercentage = cyclesPerYear * calculatedAdjustedDegradationRate; // Degradation per year

    chartData.push({ year: 0, capacity: initialCapacity }); // Starting point

    for (let i = 1; i <= years; i++) {
      currentCapacity = Math.max(0, currentCapacity - annualDegradationPercentage);
      chartData.push({ year: i, capacity: parseFloat(currentCapacity.toFixed(2)) });
    }
    setDegradationChartData(chartData);
    
    // Log email for demonstration purposes (not stored persistently)
    console.log("Email captured (not stored):", userEmail);
    console.log("Calculation and graph data generated.");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-100 max-w-md mx-auto my-8 transform transition-all duration-300 hover:scale-[1.01]">
      <h2 className="text-2xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">Battery Degradation Simulator</h2>

      <div className="space-y-5">
        <div className="input-group">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base transition duration-150 shadow-sm"
            placeholder="e.g., 100"
          />
        </div>

        <div className="input-group">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base transition duration-150 shadow-sm"
            placeholder="e.g., 200"
          />
        </div>

        <div className="input-group">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base transition duration-150 shadow-sm"
            placeholder="e.g., 5"
          />
        </div>

        <div className="input-group">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base transition duration-150 shadow-sm"
            placeholder="e.g., 0.01"
          />
        </div>

        <div className="input-group">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base transition duration-150 shadow-sm"
            placeholder="e.g., 1.0"
          />
        </div>

        <div className="input-group mb-6">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base transition duration-150 shadow-sm"
            placeholder="e.g., 1.0"
          />
        </div>
      </div> {/* End of space-y-5 */}

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center font-medium">
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleCalculateClick}
        className="mt-6 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 w-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg text-base"
      >
        Calculate Degradation
      </button>

      {showResult && finalCapacity !== null && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-semibold text-center space-y-2 shadow-md">
          <p className="text-lg">Total Cycles Over Period: <span className="text-xl font-extrabold">{totalCycles}</span> cycles</p>
          <p className="text-lg">Adjusted Degradation Rate Per Cycle: <span className="text-xl font-extrabold">{adjustedDegradationRate}%</span></p>
          <p className="text-lg">Total Capacity Degradation: <span className="text-xl font-extrabold">{totalCapacityDegradation}%</span></p>
          <p className="text-lg">Final Battery Capacity: <span className="text-2xl font-extrabold">{finalCapacity}%</span></p>
        </div>
      )}

      {/* Graph Section */}
      {showResult && degradationChartData.length > 1 && (
        <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Battery Capacity Over Years</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={degradationChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: 0 }} />
              <YAxis label={{ value: "Capacity (%)", angle: -90, position: "insideLeft" }} domain={[0, initialCapacity * 1.1]} /> {/* Adjust Y-axis domain */}
              <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="capacity"
                stroke="#4f46e5" // Indigo color for the line
                activeDot={{ r: 8 }}
                strokeWidth={2}
                name="Capacity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Email Input Modal (copied from BESS calculator) */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Enter Your Email to Calculate</h3>
            <p className="text-gray-600 mb-4 text-sm">Your email will not be stored persistently with this frontend-only solution.</p>
            <div className="mb-4">
              <label htmlFor="modalEmail" className="block text-gray-700 text-base font-semibold mb-2">
                Email: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="modalEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base shadow-sm"
                placeholder="your.email@example.com"
                required
              />
              {emailError && (
                <p className="text-red-600 text-sm mt-2">{emailError}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-150 text-base"
              >
                Cancel
              </button>
              <button
                onClick={performCalculation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 text-base"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatteryDegradationCalculator;
