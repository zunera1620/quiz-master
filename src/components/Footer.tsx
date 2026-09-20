import React from 'react';
import { Sparkles, Heart, Shield, HelpCircle, FileText } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-slate-200/90 bg-white py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 fill-white/20 text-amber-300" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Quiz<span className="text-indigo-600">Master</span>
              </span>
            </button>
            <span className="hidden sm:inline-block text-slate-300">•</span>
            <p className="text-xs text-slate-500 font-medium">
              Test Your Knowledge &amp; Improve Your Skills
            </p>
          </div>

          {/* Core Footer Navigation Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold">
            <button
              id="footer-nav-about"
              onClick={() => onNavigate('about')}
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors cursor-pointer min-h-[44px] flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              <span>About</span>
            </button>

            <button
              id="footer-nav-privacy"
              onClick={() => onNavigate('privacy')}
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors cursor-pointer min-h-[44px] flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Privacy Policy</span>
            </button>

            <button
              id="footer-nav-contact"
              onClick={() => onNavigate('contact')}
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors cursor-pointer min-h-[44px] flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Contact &amp; Feedback</span>
            </button>
          </nav>
        </div>

        {/* Bottom copyright & disclosures */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Quiz Master. All rights reserved. 7 Subject Disciplines (350+ Questions).
          </p>
          <p className="flex items-center justify-center gap-1">
            Built for learners worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
