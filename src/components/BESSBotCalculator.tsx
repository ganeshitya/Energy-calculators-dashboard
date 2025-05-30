// src/components/BESSBotCalculator.tsx
import { useState, FC } from 'react';

const BESSBotCalculator: FC = () => {
  // State for input values
  const [loadDemandKW, setLoadDemandKW] = useState<number>(10);
  const [durationHours, setDurationHours] = useState<number>(4);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(48);
  const [efficiency, setEfficiency] = useState<number>(90); // in percent

  // State for results, explicitly typed as number or null
  const [capacityKWH, setCapacityKWH] = useState<number | null>(null);
  const [capacityAH, setCapacityAH] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateBESS = () => {
    if (isNaN(loadDemandKW) || isNaN(durationHours) || isNaN(batteryVoltage) || isNaN(efficiency) ||
        loadDemandKW <= 0 || durationHours <= 0 || batteryVoltage <= 0 || efficiency <= 0 || efficiency > 100) {
      alert('Please enter valid positive numbers for all inputs. Efficiency should be between 1 and 100.');
      setCapacityKWH(null);
      setCapacityAH(null);
      setShowResult(true);
      return;
    }

    const efficiencyDecimal = efficiency / 100;

    // Calculation
    const requiredCapacityKWH = (loadDemandKW * durationHours) / efficiencyDecimal;
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
          Peak Load Demand (kW):
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
          Backup Duration (hours):
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

      <div className="mb-6">
        <label htmlFor="efficiency" className="block text-gray-700 text-base font-semibold mb-2">
          System Efficiency (%):
        </label>
        <input
          type="number"
          id="efficiency"
          value={efficiency}
          onChange={(e) => setEfficiency(parseFloat(e.target.value))}
          step="1"
          min="1"
          max="100"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 90"
        />
      </div>

      <button
        onClick={calculateBESS}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 w-full transition duration-200 text-lg"
      >
        Calculate BESS Sizing
      </button>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-semibold text-center">
          {capacityKWH !== null ? (
            <>
              <p>Required Battery Capacity: <span className="text-2xl font-extrabold">{capacityKWH}</span> kWh</p>
              <p>Equivalent Ah Capacity: <span className="text-xl font-bold">{capacityAH}</span> Ah</p>
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
