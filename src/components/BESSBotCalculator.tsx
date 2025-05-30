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

  const calculateBESS = () => {
    // Input validation
    if (isNaN(loadDemandKW) || isNaN(durationHours) || isNaN(batteryVoltage) ||
        loadDemandKW <= 0 || durationHours <= 0 || batteryVoltage <= 0) {
      alert('Please enter valid positive numbers for Load Demand, Duration, and Battery Voltage.');
      setCapacityKWH(null);
      setCapacityAH(null);
      setShowResult(true);
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
        alert('Calculated or overridden efficiency is invalid. It must be between 0 and 1 (or 0-100%).');
        setCapacityKWH(null);
        setCapacityAH(null);
        setShowResult(true);
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
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 max-w-md mx-auto my-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">BESS Sizing Calculator</h2>

      <div className="mb-5">
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 10"
        />
      </div>

      <div className="mb-5">
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 4"
        />
      </div>

      <div className="mb-5">
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 48"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="batteryType" className="block text-gray-700 text-base font-semibold mb-2">
          Battery Type:
        </label>
        <select
          id="batteryType"
          value={batteryType}
          onChange={(e) => setBatteryType(e.target.value as keyof typeof efficiencyMap)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg bg-white"
        >
          {Object.keys(efficiencyMap).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 90 (or leave blank)"
        />
      </div>

      <button
        onClick={calculateBESS}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 w-full transition duration-200 text-lg"
      >
        Calculate BESS Sizing
      </button>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-semibold text-center space-y-2">
          {capacityKWH !== null ? (
            <>
              <p>Required Battery Capacity: <span className="text-2xl font-extrabold">{capacityKWH}</span> kWh</p>
              <p>Required Battery Capacity: <span className="text-xl font-bold">{capacityAH}</span> Ah</p>
            </>
          ) : (
            <span className="text-red-600">Please enter valid inputs.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default BESSBotCalculator;
