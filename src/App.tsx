// src/App.tsx
import { useState } from 'react';
import type { FC } from 'react'; // Use type-only import for FC
import Sidebar from './components/Sidebar.tsx';

// Import all your calculator components
import RooftopSolarCalculator from './components/RooftopSolarCalculator.tsx';
import BatteryDegradationCalculator from './components/BatteryDegradationCalculator.tsx';
import BESSBotCalculator from './components/BESSBotCalculator.tsx';

const App: FC = () => { // Type App as a Functional Component
  const [activeCalculator, setActiveCalculator] = useState<string>('solar'); // Default to 'solar'

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'solar':
        return <RooftopSolarCalculator />;
      case 'batteryDegradation':
        return <BatteryDegradationCalculator />;
      case 'bessSizing':
        return <BESSBotCalculator />;
      default:
        return <p className="text-gray-700 text-center text-lg mt-12">Please select a calculator from the sidebar to begin.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveCalculator={setActiveCalculator} activeCalculator={activeCalculator} />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          GM-Energy Calculators
        </h1>
        <p className="text-gray-700 mb-8">Your specialized tools for energy and power solutions.</p>
        
        {/* Render the selected calculator */}
        <div id="calculator-display-area">
          {renderCalculator()}
        </div>
      </div>
    </div>
  );
};

export default App;
