// src/components/RooftopSolarCalculator.tsx
import { useState, FC } from 'react';

const RooftopSolarCalculator: FC = () => {
  // State for input values
  const [sunlightHours, setSunlightHours] = useState<number>(4);
  const [desiredEnergy, setDesiredEnergy] = useState<number>(10);
  const [panelEfficiency, setPanelEfficiency] = useState<number>(20);
  const [systemLosses, setSystemLosses] = useState<number>(14);

  // State for the result, explicitly typed as string or null
  const [requiredArea, setRequiredArea] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateArea = () => {
    // Input validation
    if (isNaN(sunlightHours) || isNaN(desiredEnergy) || isNaN(panelEfficiency) || isNaN(systemLosses) ||
        sunlightHours <= 0 || desiredEnergy <= 0 || panelEfficiency <= 0 || systemLosses < 0) {
      setRequiredArea(null);
      setShowResult(true);
      alert('Please enter valid positive numbers for all inputs.');
      return;
    }

    // Convert percentages to decimals
    const eff = panelEfficiency / 100;
    const loss = systemLosses / 100;

    // Calculation
    const calculatedArea = desiredEnergy / (sunlightHours * eff * (1 - loss));

    setRequiredArea(calculatedArea.toFixed(2));
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 max-w-md mx-auto my-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Rooftop Solar Calculator</h2>

      <div className="mb-5">
        <label htmlFor="sunlightHours" className="block text-gray-700 text-base font-semibold mb-2">
          Avg. Daily Sunlight Hours (peak sun hours):
        </label>
        <input
          type="number"
          id="sunlightHours"
          value={sunlightHours}
          onChange={(e) => setSunlightHours(parseFloat(e.target.value))}
          step="0.1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 4"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="desiredEnergy" className="block text-gray-700 text-base font-semibold mb-2">
          Desired Daily Energy Production (kWh):
        </label>
        <input
          type="number"
          id="desiredEnergy"
          value={desiredEnergy}
          onChange={(e) => setDesiredEnergy(parseFloat(e.target.value))}
          step="0.1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 10"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="panelEfficiency" className="block text-gray-700 text-base font-semibold mb-2">
          Solar Panel Efficiency (%):
        </label>
        <input
          type="number"
          id="panelEfficiency"
          value={panelEfficiency}
          onChange={(e) => setPanelEfficiency(parseFloat(e.target.value))}
          step="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 20"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="systemLosses" className="block text-gray-700 text-base font-semibold mb-2">
          System Losses (%):
        </label>
        <input
          type="number"
          id="systemLosses"
          value={systemLosses}
          onChange={(e) => setSystemLosses(parseFloat(e.target.value))}
          step="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-lg"
          placeholder="e.g., 14"
        />
      </div>

      <button
        onClick={calculateArea}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 w-full transition duration-200 text-lg"
      >
        Calculate Required Area
      </button>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-semibold text-center">
          {requiredArea !== null ? (
            <>Required Solar Panel Area: <span className="text-2xl font-extrabold">{requiredArea}</span> sq meters</>
          ) : (
            <span className="text-red-600">Please enter valid inputs.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default RooftopSolarCalculator;
