import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-9 w-9',
  size = 36,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 hover:scale-105 ${className}`}
      aria-label="NexusHQ 3D Hex Monogram Logo"
    >
      <defs>
        {/* Left Pillar Gradient */}
        <linearGradient id="nexusLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Right Pillar Gradient */}
        <linearGradient id="nexusRightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3730a3" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Floating Diagonal Bridge Gradient */}
        <linearGradient id="nexusDiagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>

        {/* Hex Shield Border Gradient */}
        <linearGradient id="nexusHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#c026d3" stopOpacity="0.5" />
        </linearGradient>

        {/* 3D Drop Shadow for Diagonal Bridge */}
        <filter id="nexus3DShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="3.5"
            floodOpacity="0.5"
            floodColor="#030014"
          />
        </filter>
      </defs>

      {/* Hexagonal Shield Background Frame */}
      <polygon
        points="50,6 88,27 88,73 50,94 12,73 12,27"
        stroke="url(#nexusHexGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
        className="opacity-70"
      />

      {/* Left Vertical Pillar */}
      <path
        d="M 28 26 V 74"
        stroke="url(#nexusLeftGrad)"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* Right Vertical Pillar */}
      <path
        d="M 72 26 V 74"
        stroke="url(#nexusRightGrad)"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* 3D Floating Diagonal Bridge (Casts shadow on pillars) */}
      <path
        d="M 26 26 L 74 74"
        stroke="url(#nexusDiagGrad)"
        strokeWidth="15"
        strokeLinecap="round"
        filter="url(#nexus3DShadow)"
      />
    </svg>
  );
};

export default Logo;
