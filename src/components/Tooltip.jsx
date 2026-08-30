import React, { useState } from 'react';

export default function Tooltip({ text, children, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className={`absolute z-30 px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900/95 border border-emerald-500/30 rounded-md shadow-xl whitespace-nowrap pointer-events-none transition-all duration-150 transform ${
            position === 'top' 
              ? 'bottom-full mb-1.5 left-1/2 -translate-x-1/2' 
              : position === 'bottom'
              ? 'top-full mt-1.5 left-1/2 -translate-x-1/2'
              : 'left-full ml-1.5 top-1/2 -translate-y-1/2'
          }`}
        >
          {text}
          {/* Arrow indicator */}
          <div 
            className={`absolute w-2 h-2 bg-slate-900/95 transform rotate-45 border-slate-900/95 ${
              position === 'top'
                ? 'top-full -mt-1 left-1/2 -translate-x-1/2 border-b border-r border-emerald-500/30'
                : 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-t border-l border-emerald-500/30'
            }`}
          />
        </div>
      )}
    </div>
  );
}
