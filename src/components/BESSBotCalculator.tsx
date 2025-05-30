// src/components/BESSBotCalculator.tsx
import { useState } from 'react';
import type { FC } from 'react';

const BESSBotCalculator: FC = () => {
  // Define default efficiencies for battery types
  const efficiencyMap: { [key: string]: number } = {
    "Lead-Acid": 0.85,
    "Li-ion NMC": 0.95,
    "Li-ion LFP": 0.98,
  };

  // State for input values
  const [loadDemandKW, setLoadDemandKW] = useState<number>(10);
  const [durationHours, setDurationHours] = useState<number>(4);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(48);
  const [batteryType, setBatteryType] = useState<keyof typeof efficiencyMap>("Li-ion LFP"); // Default battery type
  const [systemEfficiencyOverride, setSystemEfficiencyOverride] = useState<number | ''>(''); // Optional override, can be empty string

  // State for results
  const [capacityKWH, setCapacityKWH] = useState<number | null>(null);
  const [capacityAH, setCapacityAH] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const calculateBESS = () => {
    setErrorMessage(null); // Clear previous errors
    setShowResult(false); // Hide previous result

    // Input validation
    if (isNaN(loadDemandKW) || isNaN(durationHours) || isNaN(batteryVoltage) ||
        loadDemandKW <= 0 || durationHours <= 0 || batteryVoltage <= 0) {
      setErrorMessage('Please enter valid positive numbers for Load Demand, Duration, and Battery Voltage.');
      return;
    }

    let selectedEfficiency: number;
    // Determine efficiency based on override or battery type
    if (systemEfficiencyOverride !== '' && !isNaN(systemEfficiencyOverride) && systemEfficiencyOverride > 0 && systemEfficiencyOverride <= 100) {
      selectedEfficiency = systemEfficiencyOverride / 100;
    } else {
      selectedEfficiency = efficiencyMap[batteryType];
    }

    if (selectedEfficiency <= 0 || selectedEfficiency > 1) {
        setErrorMessage('Calculated or overridden efficiency is invalid. It must be between 0 and 1 (or 0-100%).');
        return;
    }

    // Calculations matching Streamlit app
    const requiredCapacityKWH = (loadDemandKW * durationHours) / selectedEfficiency;
    const requiredCapacityAH = (requiredCapacityKWH * 1000) / batteryVoltage; // Convert kWh to Wh, then to Ah

    setCapacityKWH(parseFloat(requiredCapacityKWH.toFixed(2)));
    setCapacityAH(parseFloat(requiredCapacityAH.toFixed(2)));
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-100 max-w-md mx-auto my-8 transform transition-all duration-300 hover:scale-[1.01]">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">BESS Sizing Calculator</h2>

      <div className="space-y-5"> {/* Added space between input groups */}
        <div className="input-group">
          <label htmlFor="loadDemandKW" className="block text-gray-700 text-base font-semibold mb-2">
            Load Demand (kW):
          </label>
          <input
            type="number"
            id="loadDemandKW"
            value={loadDemandKW}
            onChange={(e) => setLoadDemandKW(parseFloat(e.target.value))}
            step="0.1"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-lg transition duration-150 shadow-sm"
            placeholder="e.g., 10"
          />
        </div>

        <div className="input-group">
          <label htmlFor="durationHours" className="block text-gray-700 text-base font-semibold mb-2">
            Duration of Backup (hours):
          </label>
          <input
            type="number"
            id="durationHours"
            value={durationHours}
            onChange={(e) => setDurationHours(parseFloat(e.target.value))}
            step="0.1"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-lg transition duration-150 shadow-sm"
            placeholder="e.g., 4"
          />
        </div>

        <div className="input-group">
          <label htmlFor="batteryVoltage" className="block text-gray-700 text-base font-semibold mb-2">
            Battery System Voltage (V):
          </label>
          <input
            type="number"
            id="batteryVoltage"
            value={batteryVoltage}
            onChange={(e) => setBatteryVoltage(parseFloat(e.target.value))}
            step="1"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-lg transition duration-150 shadow-sm"
            placeholder="e.g., 48"
          />
        </div>

        <div className="input-group">
          <label htmlFor="batteryType" className="block text-gray-700 text-base font-semibold mb-2">
            Battery Type:
          </label>
          <select
            id="batteryType"
            value={batteryType}
            onChange={(e) => setBatteryType(e.target.value as keyof typeof efficiencyMap)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-lg bg-white shadow-sm"
          >
            {Object.keys(efficiencyMap).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="input-group mb-6">
          <label htmlFor="systemEfficiencyOverride" className="block text-gray-700 text-base font-semibold mb-2">
            System Efficiency (%) (Optional Override):
          </label>
          <input
            type="number"
            id="systemEfficiencyOverride"
            value={systemEfficiencyOverride}
            onChange={(e) => setSystemEfficiencyOverride(e.target.value === '' ? '' : parseFloat(e.target.value))}
            step="1"
            min="1"
            max="100"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-lg transition duration-150 shadow-sm"
            placeholder="e.g., 90 (or leave blank)"
          />
        </div>
      </div> {/* End of space-y-5 */}

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center font-medium">
          {errorMessage}
        </div>
      )}

      <button
        onClick={calculateBESS}
        className="mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg text-lg"
      >
        Calculate BESS Sizing
      </button>

      {showResult && capacityKWH !== null && capacityAH !== null && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-800 font-semibold text-center space-y-2 shadow-md">
          <p className="text-xl">Required Battery Capacity: <span className="text-2xl font-extrabold">{capacityKWH}</span> kWh</p>
          <p className="text-xl">Required Battery Capacity: <span className="text-2xl font-bold">{capacityAH}</span> Ah</p>
        </div>
      )}
    </div>
  );
};

export default BESSBotCalculator;
