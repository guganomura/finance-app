import React, { createContext, useContext, useState, useEffect } from 'react';

const GastosContext = createContext();

const dadosMockados = [
  {
    id: 1,
    valor: 45.90,
    categoria: 'Alimentação',
    data: '2026-05-10',
    descricao: 'Almoço restaurante',
    recorrente: false,
  },
  {
    id: 2,
    valor: 120.00,
    categoria: 'Transporte',
    data: '2026-05-15',
    descricao: 'Uber do mês',
    recorrente: true,
  },
  {
    id: 3,
    valor: 299.90,
    categoria: 'Moradia',
    data: '2026-05-01',
    descricao: 'Conta de luz',
    recorrente: true,
  },
];

export function GastosProvider({ children }) {
  const [gastos, setGastos] = useState(() => {
    const salvo = localStorage.getItem('gastos');
    return salvo ? JSON.parse(salvo) : dadosMockados;
  });

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  function adicionarGasto(gasto) {
    const novo = { ...gasto, id: Date.now() };
    setGastos((prev) => [novo, ...prev]);
  }

  function removerGasto(id) {
    setGastos((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <GastosContext.Provider value={{ gastos, adicionarGasto, removerGasto }}>
      {children}
    </GastosContext.Provider>
  );
}

export function useGastos() {
  return useContext(GastosContext);
}