import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Logo({ size = 'md', showTagline = true, to = '/' }) {
  const { isLightMode } = useTheme();

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-lg font-black',
    md: 'text-2xl font-black',
    lg: 'text-3xl font-black'
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  };

  const content = (
    <div className="flex items-center gap-3.5 group select-none cursor-pointer">
      {/* 3D Dynamic Geometric Shield Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Subtle Ambient Background Aura Glow */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-cyan-500/40 rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />

        {/* SVG Shield Emblem */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
          <svg 
            className={`${iconSizes[size]} drop-shadow-[0_4px_14px_rgba(99,102,241,0.45)]`} 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sahayaShield1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#D946EF" />
              </linearGradient>

              <linearGradient id="sahayaShield2" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>

              <linearGradient id="sahayaSparkleCore" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>

            {/* Outer Hex Crystal Shield Contour */}
            <path 
              d="M20 3L35 11.5V28.5L20 37L5 28.5V11.5L20 3Z" 
              fill="url(#sahayaShield1)" 
              fillOpacity="0.12" 
              stroke="url(#sahayaShield1)" 
              strokeWidth="2.2" 
              strokeLinejoin="round" 
            />

            {/* Right Facet Wing */}
            <path 
              d="M20 3L35 11.5V28.5L20 20Z" 
              fill="url(#sahayaShield1)" 
              fillOpacity="0.85" 
            />

            {/* Left Facet Wing */}
            <path 
              d="M20 3L5 11.5V28.5L20 20Z" 
              fill="url(#sahayaShield2)" 
              fillOpacity="0.85" 
            />

            {/* Bottom Facet Base */}
            <path 
              d="M20 20L35 28.5L20 37L5 28.5Z" 
              fill="url(#sahayaShield1)" 
              fillOpacity="0.45" 
            />

            {/* Center AI Sparkle Core */}
            <path 
              d="M20 12C20 15.5 21.8 17.2 25.5 17.2C21.8 17.2 20 19 20 22.5C20 19 18.2 17.2 14.5 17.2C18.2 17.2 20 15.5 20 12Z" 
              fill="url(#sahayaSparkleCore)" 
            />
          </svg>
        </div>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className={`${titleSizes[size]} tracking-tight flex items-baseline font-sans leading-none ${
          isLightMode ? 'text-slate-900' : 'text-white'
        }`}>
          <span className="font-black tracking-tight">SAHAYA</span>
          <span className="ml-1.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-black tracking-tight">
            AI
          </span>
        </div>

        {showTagline && (
          <span className={`${taglineSizes[size]} tracking-[0.2em] font-extrabold uppercase font-sans mt-1.5 ${
            isLightMode ? 'text-indigo-600/90' : 'text-indigo-400/90'
          }`}>
            Document Intelligence
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="inline-block focus:outline-none">{content}</Link>;
  }

  return content;
}
