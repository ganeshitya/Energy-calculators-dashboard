// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import your App component
import './index.css'; // Import your main CSS (which includes Tailwind)

// Get the root element from index.html
const rootElement = document.getElementById('root');

// Create a React root and render your App component
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);