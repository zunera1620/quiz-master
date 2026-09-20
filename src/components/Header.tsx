import React from 'react';
import { Sparkles, Volume2, VolumeX, Trophy, ArrowLeft } from 'lucide-react';
import { AppView, UserStats } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigateHome: () => void;
  onNavigateView?: (view: AppView) => void;
  stats: UserStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateView,
  stats,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          {currentView !== 'home' && (
            <button
              id="header-back-home-button"
              onClick={onNavigateHome}
              className="p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Back to Home"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <button
            id="brand-home-link"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Quiz<span className="text-indigo-600">Master</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 hidden sm:inline-block">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
                Knowledge &amp; Skill Platform
              </p>
            </div>
          </button>
        </div>

        {/* Action Controls & Best Score preview */}
        <div className="flex items-center gap-2 sm:gap-3">
          {stats.bestScore && (
            <div
              id="header-best-score-pill"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 text-xs font-semibold"
              title="Your Best Score"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Best:</span>
              <span className="font-bold text-amber-700">
                {stats.bestScore.score}/{stats.bestScore.totalQuestions} ({stats.bestScore.percentage}%)
              </span>
            </div>
          )}

          <button
            id="header-sound-toggle"
            onClick={onToggleSound}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            title={soundEnabled ? 'Sound is ON' : 'Sound is OFF'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {onNavigateView && (
            <div className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600">
              <button
                onClick={() => onNavigateView('about')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentView === 'about'
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                About
              </button>
              <button
                onClick={() => onNavigateView('contact')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentView === 'contact'
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Contact
              </button>
            </div>
          )}

          {currentView !== 'home' && (
            <button
              id="header-home-button"
              onClick={onNavigateHome}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer min-h-[36px]"
            >
              Home
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
