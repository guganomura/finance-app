import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GastosProvider } from './context/GastosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GastosProvider>
    <App />
  </GastosProvider>
);