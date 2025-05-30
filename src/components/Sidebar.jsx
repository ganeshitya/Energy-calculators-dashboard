// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-indigo-700 text-white flex flex-col p-4 shadow-lg">
      <div className="text-2xl font-bold mb-8">GM-Energy</div>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-600 transition duration-150">
              Rooftop Solar
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-600 transition duration-150">
              Battery Degradation
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="block py-2 px-4 rounded hover:bg-indigo-600 transition duration-150">
              BESS Sizing
            </a>
          </li>
          {/* Add more calculator links here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;