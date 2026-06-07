import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  function navegar(path) {
    navigate(path);
    onClose();
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">💰 FinanceApp</span>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-item" onClick={() => navegar('/')}>
            <span className="sidebar-icon">🏠</span>
            <span className="sidebar-label">Home</span>
          </button>
          <button className="sidebar-item" onClick={() => navegar('/analise')}>
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-label">Análise</span>
          </button>
          <button className="sidebar-item" onClick={() => navegar('/mensagens')}>
            <span className="sidebar-icon">💬</span>
            <span className="sidebar-label">Mensagens</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <hr className="sidebar-divider" />
          <button className="sidebar-item sidebar-item--sair" onClick={onClose}>
            <span className="sidebar-icon">🚪</span>
            <span className="sidebar-label">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
