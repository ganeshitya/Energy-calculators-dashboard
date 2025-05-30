// src/components/Sidebar.tsx
import type { FC } from 'react'; // Use type-only import for FC

// Define the types for the props that Sidebar expects
interface SidebarProps {
  setActiveCalculator: (calculatorName: string) => void; // Function that takes a string and returns nothing
  activeCalculator: string; // String to hold the name of the active calculator
}

// Type the Sidebar functional component using FC (Functional Component) and SidebarProps
const Sidebar: FC<SidebarProps> = ({ setActiveCalculator, activeCalculator }) => {

  // Explicitly type the 'calculatorName' parameter as string
  const handleCalculatorClick = (calculatorName: string) => {
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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
