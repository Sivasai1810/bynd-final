import React, { useEffect, useState } from 'react';
import './Toast.css';

export default function Toast({ message, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 3000;
    const interval = 10;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <span className="toast-message">{message}</span>
      <button onClick={onClose} className="toast-close">×</button>
      <div className="toast-progress" style={{ width: `${progress}%` }} />
    </div>
  );
}

// ===== src/components/Toast/Toast.css =====
