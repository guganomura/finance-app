import React, { useEffect } from 'react';
import './Toast.css';

function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="toast">
      <span className="toast__icon">✅</span>
      <span className="toast__message">{message}</span>
    </div>
  );
}