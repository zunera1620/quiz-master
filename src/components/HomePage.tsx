import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Globe,
  Atom,
  Landmark,
  Calculator,
  BookOpen,
  Cpu,
  Compass,
  Trophy,
  Calendar,
  Play,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  Sliders,
  Check,
} from 'lucide-react';
import { CATEGORIES } from '../data/questions';
import { CategoryId, UserStats } from '../types';
import { AdBanner } from './AdBanner';

interface HomePageProps {
  onStartCategory: (categoryId: CategoryId, questionCount?: number) => void;
  onStartDailyQuiz: () => void;
  stats: UserStats;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Atom,
  Landmark,
  Calculator,
  BookOpen,
  Cpu,
  Compass,
};

const QUESTION_COUNT_OPTIONS = [
  { count: 10, label: '10 Questions', short: '10 Qs', desc: 'Quick sprint' },
  { count: 25, label: '25 Questions', short: '25 Qs', desc: 'Standard workout' },
  { count: 50, label: '50 Questions', short: '50 Qs', desc: 'Full Mastery Bank' },
];

export const HomePage: React.FC<HomePageProps> = ({
  onStartCategory,
  onStartDailyQuiz,
  stats,
}) => {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(50);
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId>('general-knowledge');

  const todayStr = new Date().toISOString().split('T')[0];
  const isDailyCompletedToday = stats.lastDailyDate === todayStr;

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const selectedCategoryObj =
    CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
      {/* Hero Section with Purple & Yellow Design */}
      <section
        id="home-hero-section"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white p-6 sm:p-10 shadow-xl shadow-indigo-950/20"
      >
        {/* Subtle decorative background glows */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive Knowledge Challenge</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Quiz <span className="text-amber-300">Master</span>
            </h1>

            <p className="text-base sm:text-lg text-indigo-100/90 font-medium leading-relaxed">
              Test Your Knowledge &amp; Improve Your Skills
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-indigo-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-300" />
                <span>20s Per Question</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Instant Feedback</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-300" />
                <span>50 Qs Per Category</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              id="hero-start-quiz-button"
              onClick={() => onStartCategory(selectedCategoryId, selectedQuestionCount)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Start Quiz ({selectedCategoryObj.name})</span>
            </button>
            <button
              id="hero-daily-quiz-button"
              onClick={onStartDailyQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/20 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>{isDailyCompletedToday ? 'Replay Daily Quiz' : "Play Today's Challenge"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Launch & Quiz Customizer Section */}
      <section
        id="quick-start-customizer"
        className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" />
              <span>Quiz Setup</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Select Category &amp; Questions
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Pick a subject and question volume to start immediately
          </p>
        </div>

        {/* Step 1: Category Picker Bar */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            1. Select Quiz Category:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              const IconComp = ICON_MAP[cat.iconName] || HelpCircle;
              return (
                <button
                  key={cat.id}
                  id={`select-cat-${cat.id}`}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[70px] ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                      : 'border-slate-200/90 bg-slate-50/60 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <IconComp
                      className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}
                    />
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 font-bold" />}
                  </div>
                  <span
                    className={`text-xs font-bold leading-tight mt-2 ${
                      isSelected ? 'text-indigo-950' : 'text-slate-700'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Number of Questions Selector */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            2. Choose Number of Questions:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {QUESTION_COUNT_OPTIONS.map((opt) => {
              const isSelected = selectedQuestionCount === opt.count;
              return (
                <button
                  key={opt.count}
                  id={`quiz-length-option-${opt.count}`}
                  onClick={() => setSelectedQuestionCount(opt.count)}
                  className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between min-h-[44px] ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-extrabold">{opt.label}</div>
                    <div
                      className={`text-xs ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500'
                      }`}
                    >
                      {opt.desc}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-white bg-white text-indigo-600' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Launch Action Button */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            <span>Ready to start: </span>
            <strong className="text-slate-900">{selectedCategoryObj.name}</strong>
            <span> with </span>
            <strong className="text-slate-900">{selectedQuestionCount} Questions</strong>
            <span> (20s per question)</span>
          </div>

          <button
            id="start-configured-quiz-button"
            onClick={() => onStartCategory(selectedCategoryId, selectedQuestionCount)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Quiz Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Stats & Daily Quiz Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Best Score Card */}
        <div
          id="best-score-card"
          className="relative bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
                <Trophy className="w-6 h-6 fill-amber-500 text-amber-600" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  Local Record
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">Your Best Score</h2>
              </div>
            </div>
            {stats.bestScore && (
              <span className="text-xs text-slate-500">
                {new Date(stats.bestScore.date).toLocaleDateString()}
              </span>
            )}
          </div>

          {stats.bestScore ? (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-50/70 to-orange-50/50 border border-amber-100">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {stats.bestScore.score}
                    <span className="text-lg sm:text-xl font-medium text-slate-500">
                      {' '}/ {stats.bestScore.totalQuestions}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Category: <span className="font-semibold text-slate-800">{stats.bestScore.categoryName}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-lg">
                    {stats.bestScore.percentage}%
                  </div>
                  <p className="text-[11px] font-medium text-amber-800 mt-1">Top Accuracy</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-slate-500 font-medium">Completed</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{stats.quizzesCompleted}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-slate-500 font-medium">Correct Ans</p>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">{stats.totalCorrect}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-slate-500 font-medium">Total Solved</p>
                  <p className="text-sm font-bold text-indigo-700 mt-0.5">{stats.totalAnswered}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-700">No attempts recorded yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select any category below or start a quiz to set your first personal high score record!
              </p>
            </div>
          )}
        </div>

        {/* Daily Quiz Card */}
        <div
          id="daily-quiz-card"
          className="relative bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/50 rounded-3xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Flame className="w-6 h-6 fill-amber-300 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                      Daily Special
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{formattedDate}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">Daily Quiz Challenge</h2>
                </div>
              </div>

              {isDailyCompletedToday && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Done Today
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Sharpen your mind every single day with <strong>5 curated questions</strong> selected across all categories.
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>5 Questions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>20s timer each</span>
              </div>
              {stats.lastDailyScore !== null && isDailyCompletedToday && (
                <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Today's Score: {stats.lastDailyScore}/5</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-indigo-100/80">
            <button
              id="play-daily-quiz-button"
              onClick={onStartDailyQuiz}
              className="w-full py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              {isDailyCompletedToday ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Today's Daily Quiz</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Today's Daily Quiz (5 Qs)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Categories Section */}
      <section id="categories-section" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore All Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              All 7 Subject Categories
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            50 unique questions available in each category (350 questions total)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map((cat, index) => {
            const IconComponent = ICON_MAP[cat.iconName] || HelpCircle;
            const categoryBest = stats.categoryBests[cat.id];
            const isCurrentlySelected = selectedCategoryId === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                id={`category-card-${cat.id}`}
                className={`group relative bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                  isCurrentlySelected
                    ? 'border-indigo-600 shadow-md shadow-indigo-500/10'
                    : 'border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {cat.questionCount} Questions
                      </span>
                      {categoryBest !== undefined && categoryBest > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <Trophy className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Best: {categoryBest} pts
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    20s / Q
                  </span>

                  <button
                    id={`start-category-button-${cat.id}`}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      onStartCategory(cat.id, selectedQuestionCount);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 group-hover:bg-indigo-600 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 min-h-[44px]"
                  >
                    <span>Start ({selectedQuestionCount} Qs)</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Reserved Non-Intrusive Advertisement Banner (Home Screen) */}
      <AdBanner placement="home" />

      {/* Rules / Features Quick Guide */}
      <section
        id="quiz-rules-guide"
        className="rounded-3xl bg-slate-100/80 p-5 sm:p-6 border border-slate-200/80"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
          Quiz Rules &amp; Gameplay Guide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-600">
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200/60">
            <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">20-Second Countdown</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Answer before time expires. The system automatically moves to the next question when time finishes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">Next &amp; Previous Controls</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Navigate between questions seamlessly, inspect instant answers, and review detailed explanations.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200/60">
            <Trophy className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">Up to 50 Questions</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Full 50 unique questions per category with no duplicate repeats in any single quiz session.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
