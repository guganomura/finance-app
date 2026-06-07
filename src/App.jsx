import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NovoGasto from './pages/NovoGasto';
import Analise from './pages/Analise';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo-gasto" element={<NovoGasto />} />
        <Route path="/analise" element={<Analise />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
