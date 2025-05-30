// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

// Import your calculator components
import RooftopSolarCalculator from './components/RooftopSolarCalculator';
// You'll create these next:
// import BatteryDegradationCalculator from './components/BatteryDegradationCalculator';
// import BESSBotCalculator from './components/BESSBotCalculator';

const App = () => {
  // State to keep track of the currently active calculator
  const [activeCalculator, setActiveCalculator] = useState('solar'); // Default to 'solar'

  // Function to render the correct calculator component based on activeCalculator state
  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'solar':
        return <RooftopSolarCalculator />;
      // Add cases for other calculators once you convert them
      // case 'batteryDegradation':
      //   return <BatteryDegradationCalculator />;
      // case 'bessSizing':
      //   return <BESSBotCalculator />;
      default:
        return <p className="text-gray-700">Please select a calculator from the sidebar.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100"> {/* Added bg-gray-100 to body here */}
      <Sidebar setActiveCalculator={setActiveCalculator} activeCalculator={activeCalculator} /> {/* Pass state setter to Sidebar */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          GM-Energy Calculators
        </h1>
        <p className="text-gray-700">Choose a calculator from the sidebar 👇</p>
        
        {/* Render the selected calculator */}
        <div id="calculator-display-area" className="mt-8">
          {renderCalculator()}
        </div>
      </div>
    </div>
  );
};

export default App;
