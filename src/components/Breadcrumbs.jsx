import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
      <Link 
        to="/dashboard" 
        className="flex items-center gap-1 hover:text-[#2D6A4F] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {item.link && !isLast ? (
              <Link 
                to={item.link} 
                className="hover:text-[#2D6A4F] hover:underline transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`truncate max-w-[180px] sm:max-w-none ${isLast ? 'font-bold text-[#1B4332]' : ''}`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
