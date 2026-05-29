import React from 'react';

interface AutoLenisLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'header';
  showSubtitle?: boolean;
}

export default function AutoLenisLogo({
  className = '',
  variant = 'dark',
  showSubtitle = false
}: AutoLenisLogoProps) {
  return (
    <div className={`flex flex-col ${className}`} id="autolenis-logo">
      <div className="flex items-center gap-3">
        {/* Modern 3-Slash Diagonal Icon */}
        <svg
          className="w-10 h-8 flex-shrink-0"
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Silver Gradient */}
            <linearGradient id="silver-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F3F4F6" />
              <stop offset="40%" stopColor="#D1D5DB" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>
            {/* Cyber Royal Blue Gradient */}
            <linearGradient id="blue-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            {/* Dark Charcoal/Black Gradient */}
            <linearGradient id="dark-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4B5563" />
              <stop offset="60%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            {/* Soft shadow underneath slashes */}
            <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Slash 1: Silver Chrome */}
          <path
            d="M50 5 L10 75 L28 75 L68 5 Z"
            fill="url(#silver-grad)"
            filter="url(#soft-shadow)"
          />
          {/* Slash 2: Royal Blue */}
          <path
            d="M66 5 L26 75 L44 75 L84 5 Z"
            fill="url(#blue-grad)"
            filter="url(#soft-shadow)"
          />
          {/* Slash 3: Dark Charcoal */}
          <path
            d="M82 25 L54 75 L72 75 L100 25 Z"
            fill="url(#dark-grad)"
            filter="url(#soft-shadow)"
          />
        </svg>

        {/* Brand Typography */}
        <div className="flex flex-col justify-center">
          <span 
            className={`font-display font-bold tracking-wider leading-none select-none text-2xl ${
              variant === 'light' 
                ? 'text-white' 
                : 'text-slate-900 font-extrabold'
            }`}
          >
            Auto<span className="text-blue-600">Lenis</span>
          </span>
        </div>
      </div>

      {showSubtitle && (
        <div className="mt-1 flex items-center gap-1.5 w-full">
          <div className={`h-[1px] flex-grow ${variant === 'light' ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <span 
            className={`font-sans text-[8px] font-semibold tracking-widest uppercase flex-shrink-0 text-center uppercase ${
              variant === 'light' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Where dealers compete for your business
          </span>
          <div className={`h-[1px] flex-grow ${variant === 'light' ? 'bg-slate-700' : 'bg-slate-200'}`} />
        </div>
      )}
    </div>
  );
}
