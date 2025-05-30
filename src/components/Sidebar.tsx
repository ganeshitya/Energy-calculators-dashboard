// src/components/Sidebar.jsx
import { useState } from 'react';

// Accept setActiveCalculator as a prop
const Sidebar = ({ setActiveCalculator, activeCalculator }) => {

  const handleCalculatorClick = (calculatorName) => {
    setActiveCalculator(calculatorName);
  };

  return (
    <div className="w-64 bg-indigo-700 text-white flex flex-col p-4 shadow-lg">
      <div className="text-2xl font-bold mb-8 text-center">GM-Energy</div>
      <nav>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => handleCalculatorClick('solar')}
              // Add active class based on activeCalculator prop
              className={`block py-2 px-4 rounded transition duration-150 w-full text-left
                ${activeCalculator === 'solar' ? 'bg-indigo-800 shadow-inner' : 'hover:bg-indigo-600'}`
              }
            >
              Rooftop Solar
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => handleCalculatorClick('batteryDegradation')}
              className={`block py-2 px-4 rounded transition duration-150 w-full text-left
                ${activeCalculator === 'batteryDegradation' ? 'bg-indigo-800 shadow-inner' : 'hover:bg-indigo-600'}`
              }
            >
              Battery Degradation
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => handleCalculatorClick('bessSizing')}
              className={`block py-2 px-4 rounded transition duration-150 w-full text-left
                ${activeCalculator === 'bessSizing' ? 'bg-indigo-800 shadow-inner' : 'hover:bg-indigo-600'}`
              }
            >
              BESS Sizing
            </button>
          </li>
          {/* Add more calculator links here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
