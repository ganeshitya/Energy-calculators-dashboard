// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar'; // Ensure this path is correct

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          GM-Energy Calculators
        </h1>
        <p className="text-gray-700">Choose a calculator from the sidebar 👈</p>
        {/* This is where your selected calculator will eventually render */}
        <div id="calculator-display-area" className="mt-8">
          {/* We'll dynamically render calculators here later */}
        </div>
      </div>
    </div>
  );
};

export default App;
