import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  const showSuccess = useCallback((message) => addToast(message, 'success'), [addToast]);
  const showError = useCallback((message) => addToast(message, 'error'), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, showSuccess, showError }}>
      {children}

      {/* Toast Overlay Container - Top Right */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg text-white font-medium text-xs transition-all duration-300 transform translate-x-0 ${
              t.type === 'error'
                ? 'bg-[#E63946] border border-red-400/30'
                : 'bg-[#52B788] border border-emerald-300/30 text-emerald-950 font-bold'
            }`}
            style={{
              animation: 'slideInRight 250ms ease-out forwards'
            }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {t.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-white shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-950 shrink-0" />
              )}
              <span className="truncate">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded hover:bg-black/10 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
