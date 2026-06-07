import React from 'react';
import './EmptyState.css';

function EmptyState({ icon = '📭', message = 'Nenhum dado encontrado.' }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">{icon}</span>
      <p className="empty-state__message">{message}</p>
    </div>
  );
}

export default EmptyState;
