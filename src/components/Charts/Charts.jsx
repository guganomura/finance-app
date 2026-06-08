import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useGastos } from '../../context/GastosContext';
import './Charts.css';

const CORES = ['#00ff88', '#ff6b6b', '#ffd93d', '#6bcbff', '#c084fc', '#fb923c', '#a3e635'];

function Charts() {
  const { gastos } = useGastos();

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const dadosLinha = meses.map((mes, i) => ({
    mes,
    valor: gastos.filter((_, idx) => idx % 6 === i).reduce((a, g) => a + g.valor, 0) || Math.random() * 500 + 100,
  }));

  const porCategoria = gastos.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.valor;
    return acc;
  }, {});

  const dadosPizza = Object.entries(porCategoria).map(([name, value]) => ({ name, value }));

  return (
    <div className="charts">
      <div className="charts__section">
        <p className="charts__title">Gastos dos últimos meses</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={dadosLinha}>
            <XAxis dataKey="mes" stroke="#aaa" tick={{ fontSize: 12 }} />
            <YAxis stroke="#aaa" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: '#252b3b', border: 'none', borderRadius: 8 }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#00ff88' }}
            />
            <Line type="monotone" dataKey="valor" stroke="#00ff88" strokeWidth={2} dot={{ fill: '#00ff88' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="charts__section">
        <p className="charts__title">Gastos por categoria</p>
        {dadosPizza.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: 16 }}>Nenhum dado disponível.</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={dadosPizza} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {dadosPizza.map((_, index) => (
                  <Cell key={index} fill={CORES[index % CORES.length]} />
                ))}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ color: '#fff', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#252b3b', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Charts;