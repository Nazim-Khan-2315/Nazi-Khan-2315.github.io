import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { TechItem } from '../types';
import { Sparkles, ArrowRight, Layers, BarChart2, CheckCircle2 } from 'lucide-react';

interface TiltCardProps {
  tech: TechItem;
  onClick: () => void;
  isSelected: boolean;
  theme?: 'dark' | 'light';
}

export const TiltCard: React.FC<TiltCardProps> = ({ tech, onClick, isSelected, theme = 'dark' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-12 to 12 degrees)
    const rY = ((mouseX / width) - 0.5) * 24;
    const rX = ((mouseY / height) - 0.5) * -24;

    setRotateX(rX);
    setRotateY(rY);

    // Glow position percentage
    setGlowPos({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100),
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="perspective-1000 w-full h-full" id={`tile-${tech.id}`}>
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 shadow-2xl h-full flex flex-col justify-between ${
          isDark
            ? 'bg-slate-900/90 shadow-2xl ' + (isSelected ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-cyan-500/20' : 'border-slate-800 hover:border-slate-600')
            : 'bg-white/95 shadow-xl ' + (isSelected ? 'border-cyan-500 ring-2 ring-cyan-500/50 shadow-cyan-500/20' : 'border-slate-200 hover:border-slate-300')
        }`}
      >
        {/* Dynamic Light Specular Reflection Layer */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${tech.glowColor}, transparent 65%)`,
            }}
          />
        )}

        {/* 3D Tile Container */}
        <div className="relative aspect-square w-full h-full flex flex-col justify-between p-4 sm:p-5 lg:p-6 z-10">
          {/* Top Header: Badge & Category */}
          <div className="flex items-center justify-between gap-1 z-10" style={{ transform: 'translateZ(20px)' }}>
            <span
              className={`text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border backdrop-blur-md truncate max-w-[60%] ${tech.badgeColor}`}
            >
              {tech.category}
            </span>
            <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-1 rounded-md border shrink-0 ${
              isDark
                ? 'text-slate-400 bg-slate-800/80 border-slate-700/50'
                : 'text-slate-600 bg-slate-100 border-slate-200'
            }`}>
              <BarChart2 className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? 'text-slate-300' : 'text-slate-500'}`} />
              <span>{tech.difficulty}</span>
            </div>
          </div>

          {/* Center: 3D Image Logo Asset */}
          <div
            className="relative my-auto flex items-center justify-center py-2"
            style={{ transform: 'translateZ(35px)' }}
          >
            <div className={`relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500 shrink-0 ${
              isDark ? 'border-slate-700/40 group-hover:shadow-cyan-500/20' : 'border-slate-200 group-hover:shadow-cyan-500/15'
            }`}>
              <img
                src={tech.imageSrc}
                alt={`${tech.name} 3D Logo`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity ${
                isDark ? 'from-slate-950/80' : 'from-slate-900/30'
              }`} />
            </div>
          </div>

          {/* Bottom Info & Action */}
          <div className="z-10" style={{ transform: 'translateZ(25px)' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className={`text-base sm:text-xl font-bold tracking-tight transition-colors truncate flex items-center gap-2 ${
                  isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
                }`}>
                  {tech.name}
                </h3>
                <p className={`text-[11px] sm:text-xs font-medium truncate mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {tech.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {tech.githubUrl ? (
                  <a
                    href={tech.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3.5 py-2 min-h-[38px] rounded-xl border border-emerald-400 bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center text-xs shadow-lg shadow-emerald-500/25 active:scale-95"
                    title={`Explore ${tech.name} Repository`}
                  >
                    <span>Explore</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onClick}
                    className={`px-3.5 py-2 min-h-[38px] rounded-xl border transition-all duration-300 flex items-center justify-center text-xs font-bold active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-lg shadow-emerald-500/40'
                        : 'bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                    }`}
                    title="Explore Tech Details"
                  >
                    <span>Explore</span>
                  </button>
                )}
              </div>
            </div>

            {/* Features Tags on Hover */}
            <div className="mt-2.5 flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity overflow-hidden max-h-[28px]">
              {tech.keyFeatures.slice(0, 2).map((feature, i) => (
                <span
                  key={i}
                  className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded flex items-center gap-1 border truncate whitespace-nowrap max-w-[140px] sm:max-w-[170px] ${
                    isDark
                      ? 'text-slate-300 bg-slate-800/60 border-slate-700/60'
                      : 'text-slate-700 bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <CheckCircle2 className={`w-3 h-3 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <span className="truncate">{feature}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ambient Bottom Gradient Line */}
        <div className={`h-1.5 w-full bg-gradient-to-r shrink-0 ${tech.accentGradient}`} />
      </motion.div>
    </div>
  );
};
