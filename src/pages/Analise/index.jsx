import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGastos } from '../../context/GastosContext';
import EmptyState from '../../components/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';
import './Analise.css';

const CATEGORIAS = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Moradia', 'Educação', 'Outros'];
const ORCAMENTO = 3000;

function Analise() {
  const navigate = useNavigate();
  const { gastos } = useGastos();
  const [filtro, setFiltro] = useState('Todas');

  const mesAtual = new Date().toISOString().slice(0, 7);
  const gastosMes = gastos.filter((g) => g.data.startsWith(mesAtual));
  const gastosFiltrados = filtro === 'Todas' ? gastosMes : gastosMes.filter((g) => g.categoria === filtro);

  const totalMes = gastosMes.reduce((acc, g) => acc + g.valor, 0);
  const porcentagem = Math.min((totalMes / ORCAMENTO) * 100, 100);

  return (
    <div className="analise">
      <header className="analise__header">
        <button className="analise__back" onClick={() => navigate('/')}>←</button>
        <h1>Análise</h1>
      </header>

      <div className="analise__orcamento-card">
        <div className="analise__orcamento-row">
          <span className="analise__orcamento-label">Total gasto no mês</span>
          <span className="analise__orcamento-valor">{formatCurrency(totalMes)}</span>
        </div>
        <div className="analise__orcamento-row">
          <span className="analise__orcamento-label">Orçamento</span>
          <span className="analise__orcamento-limite">{formatCurrency(ORCAMENTO)}</span>
        </div>
        <div className="analise__progress-bar">
          <div
            className="analise__progress-fill"
            style={{ width: `${porcentagem}%`, background: porcentagem > 80 ? '#ff6b6b' : '#00ff88' }}
          />
        </div>
        <span className="analise__progress-text">{porcentagem.toFixed(0)}% do orçamento utilizado</span>
      </div>

      <div className="analise__filtros">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            className={`analise__filtro-btn ${filtro === cat ? 'analise__filtro-btn--ativo' : ''}`}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="analise__lista">
        {gastosFiltrados.length === 0 ? (
          <EmptyState icon="🔍" message="Nenhum gasto encontrado para este filtro." />
        ) : (
          gastosFiltrados.map((g) => (
            <div className="analise__item" key={g.id}>
              <div className="analise__item-info">
                <span className="analise__item-desc">{g.descricao || g.categoria}</span>
                <span className="analise__item-meta">{g.categoria} · {g.data}</span>
              </div>
              <span className="analise__item-valor">- {formatCurrency(g.valor)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Analise;
