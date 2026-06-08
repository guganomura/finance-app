import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGastos } from '../../context/GastosContext';
import Sidebar from '../../components/Sidebar';
import EmptyState from '../../components/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';
import { useLocation } from 'react-router-dom';
import Toast from '../../components/Toast';
import './Home.css';

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { gastos } = useGastos();
  const navigate = useNavigate();

  const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
  const saldo = 5000 - totalGastos;
  const recorrentes = gastos.filter((g) => g.recorrente);
  const recentes = gastos.slice(0, 3);
  const location = useLocation();
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (location.state?.sucesso) {
      setToastVisible(true);
    }
  }, [location.state]);

  return (
    <div className="home">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="home__header">
        <h1>FinanceApp</h1>
        <button className="home__hamburger" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
      </header>

      <div className="home__saldo-card">
        <p className="home__saldo-label">Saldo atual</p>
        <p className="home__saldo-valor">{formatCurrency(saldo)}</p>
      </div>

      <div className="home__section">
        <p className="home__section-title">Gastos Recorrentes</p>
        {recorrentes.length === 0 ? (
          <EmptyState icon="🔄" message="Nenhum gasto recorrente cadastrado." />
        ) : (
          <div className="home__cards-row">
            {recorrentes.map((g) => (
              <div className="home__card" key={g.id}>
                <div className="home__card-info">
                  <span className="home__card-desc">{g.descricao || g.categoria}</span>
                  <span className="home__card-data">{g.categoria} · {g.data}</span>
                </div>
                <span className="home__card-valor">- {formatCurrency(g.valor)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="home__section">
        <p className="home__section-title">Transferências Recentes</p>
        {recentes.length === 0 ? (
          <EmptyState icon="💸" message="Nenhuma transação registrada ainda." />
        ) : (
          <div className="home__cards-row">
            {recentes.map((g) => (
              <div className="home__card" key={g.id}>
                <div className="home__card-info">
                  <span className="home__card-desc">{g.descricao || g.categoria}</span>
                  <span className="home__card-data">{g.categoria} · {g.data}</span>
                </div>
                <span className="home__card-valor">- {formatCurrency(g.valor)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Charts />
      
      <button className="home__fab" onClick={() => navigate('/novo-gasto')}>
        +
      </button>

      <Toast
        message="Gasto registrado com sucesso!"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default Home;
