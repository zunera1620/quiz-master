import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowLeft,
  GraduationCap,
  Shield,
  Layers,
} from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white p-6 sm:p-10 shadow-xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Educational Excellence</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          About <span className="text-amber-300">Quiz Master</span>
        </h1>

        <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed max-w-2xl font-normal">
          Quiz Master is a modern, fast, and interactive knowledge testing platform crafted to help students, learners, and trivia enthusiasts test their intellect and expand their horizons across foundational subjects.
        </p>
      </motion.div>

      {/* Core Mission & Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Comprehensive Bank</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Over 350 curated, academically verified questions across 7 core disciplines: English, Science, History, General Knowledge, Mathematics, Computer Science, and Pakistan Studies.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Timed 20s Challenges</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Each question tests both accuracy and quick thinking with a 20-second countdown timer, complete with visual urgency indicators and auto-advance capability.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Instant Explanations</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every answer is accompanied by verified educational facts and explanations, turning every quiz round into a genuine learning experience.
          </p>
        </div>
      </div>

      {/* Detailed Platform Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Key Platform Highlights</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <Layers className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Flexible Quiz Lengths</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Choose between a quick 10-question sprint, a standard 25-question workout, or the full 50-question master challenge.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <Trophy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Offline Local Records</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Track personal high scores, accuracy statistics, and category bests stored securely on your browser device without creating an account.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Privacy-First Architecture</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                No passwords, credit cards, or tracking cookies required. We respect user privacy and adhere to clean educational standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <Award className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Mobile Optimized</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Fully responsive layout designed for smooth performance on Android smartphones, tablets, and desktop computers alike.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-center">
          <button
            onClick={onBackToHome}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Start Playing Quiz Master
          </button>
        </div>
      </div>
    </div>
  );
};
