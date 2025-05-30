// src/main.tsx
import React from 'react'; // Keep React import here as ReactDOM.createRoot is used
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Import your App component
import './index.css'; // Import your main CSS (which includes Tailwind)

// Get the root element from index.html
const rootElement = document.getElementById('root');

// Create a React root and render your App component
ReactDOM.createRoot(rootElement!).render( // Added '!' to assert non-null
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
