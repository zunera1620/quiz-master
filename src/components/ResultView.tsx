import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  Percent,
} from 'lucide-react';
import { QuizResultData } from '../types';
import { AdBanner } from './AdBanner';

interface ResultViewProps {
  result: QuizResultData;
  onRestartQuiz: () => void;
  onBackToHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onRestartQuiz,
  onBackToHome,
}) => {
  const [showReview, setShowReview] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Trigger celebration confetti if user did well (>= 60%)
  useEffect(() => {
    if (result.percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch {
        // canvas-confetti fallback
      }
    }
  }, [result.percentage]);

  // Determine feedback message according to specifications:
  // "Excellent!" (>= 80%)
  // "Great Job!" (>= 60%)
  // "Keep Practicing!" (< 60%)
  let headlineMessage = 'Keep Practicing!';
  let subMessage = "Every round makes you sharper. Review the answers below and try again!";
  let badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
  let badgeIcon = Award;

  if (result.percentage >= 80) {
    headlineMessage = 'Excellent!';
    subMessage = 'Outstanding performance! You have a truly impressive command of this subject.';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    badgeIcon = Trophy;
  } else if (result.percentage >= 60) {
    headlineMessage = 'Great Job!';
    subMessage = 'Solid knowledge demonstrated! A few more practice rounds will make you unbeatable.';
    badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-200';
    badgeIcon = Sparkles;
  }

  const BadgeIconComponent = badgeIcon;

  const handleShare = () => {
    const text = `I just scored ${result.finalScore}/${result.totalQuestions} (${result.percentage}%) on Quiz Master in ${result.categoryName}! Test your skills too.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Result Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        id="result-summary-card"
        className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg shadow-slate-200/50 text-center space-y-6"
      >
        {/* Performance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold shadow-xs mx-auto mb-1">
          <BadgeIconComponent className="w-4 h-4 text-amber-500" />
          <span>{result.categoryName}</span>
        </div>

        {/* Score Ring / Display */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          {/* Circular SVG Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              className="text-slate-100 stroke-current"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              className={`${
                result.percentage >= 80
                  ? 'text-emerald-500'
                  : result.percentage >= 60
                  ? 'text-indigo-600'
                  : 'text-amber-500'
              } stroke-current transition-all duration-1000 ease-out`}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 50}
              strokeDashoffset={2 * Math.PI * 50 * (1 - result.percentage / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {result.percentage}%
            </span>
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Accuracy
            </span>
          </div>
        </div>

        {/* Big Performance Message */}
        <div className="space-y-2 max-w-md mx-auto">
          <h1
            id="result-headline-message"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            {headlineMessage}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {subMessage}
          </p>
        </div>

        {/* Detailed Metrics Grid */}
        <div
          id="result-metrics-grid"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
        >
          {/* Total Questions */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <p className="text-xs font-semibold text-slate-600">Total Questions</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{result.totalQuestions}</p>
          </div>

          {/* Correct Answers */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center justify-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <p className="text-xs font-semibold">Correct</p>
            </div>
            <p className="text-xl font-bold text-emerald-700 mt-1">{result.correctAnswers}</p>
          </div>

          {/* Wrong Answers */}
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100">
            <div className="flex items-center justify-center gap-1 text-rose-700">
              <XCircle className="w-3.5 h-3.5" />
              <p className="text-xs font-semibold">Wrong</p>
            </div>
            <p className="text-xl font-bold text-rose-700 mt-1">{result.wrongAnswers}</p>
          </div>

          {/* Final Score */}
          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100">
            <div className="flex items-center justify-center gap-1 text-indigo-700">
              <Trophy className="w-3.5 h-3.5" />
              <p className="text-xs font-semibold">Final Score</p>
            </div>
            <p className="text-xl font-bold text-indigo-700 mt-1">
              {result.finalScore} <span className="text-xs font-semibold text-indigo-600">pts</span>
            </p>
          </div>
        </div>

        {/* Unanswered count if any */}
        {result.unanswered > 0 && (
          <p className="text-xs text-amber-700 bg-amber-50 py-2 px-3 rounded-xl border border-amber-200/60 inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{result.unanswered} question(s) timed out without an answer</span>
          </p>
        )}

        {/* Primary Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="result-restart-button"
            onClick={onRestartQuiz}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Quiz</span>
          </button>

          <button
            id="result-home-button"
            onClick={onBackToHome}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <button
            id="result-share-button"
            onClick={handleShare}
            className="w-full sm:w-auto px-4 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            title="Share score"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Share Score</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Reserved Non-Intrusive Advertisement Banner (Result Screen) */}
      <AdBanner placement="result" />

      {/* Question by Question Review Accordion */}
      <div
        id="question-review-section"
        className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-4"
      >
        <button
          onClick={() => setShowReview(!showReview)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
        >
          <div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Question Review &amp; Explanations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review your answers with correct solutions and learning notes
            </p>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-slate-200 transition-colors text-slate-600">
            {showReview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showReview && (
          <div className="space-y-4 pt-2 divide-y divide-slate-100">
            {result.questions.map((q, idx) => {
              const ans = result.answers[idx];
              const isCorrect = ans?.isCorrect;
              const isTimedOut = ans?.selectedIndex === null;

              return (
                <div key={q.id} className="pt-4 first:pt-0 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : isTimedOut
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>+1 pt</span>
                        </>
                      ) : isTimedOut ? (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          <span>Timed out</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Wrong</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Options status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = ans?.selectedIndex === optIdx;
                      const isCorrectChoice = q.correctIndex === optIdx;

                      let style = 'bg-slate-50 border-slate-200/80 text-slate-700';

                      if (isCorrectChoice) {
                        style = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold';
                      } else if (isUserChoice && !isCorrect) {
                        style = 'bg-rose-50 border-rose-300 text-rose-950 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold uppercase text-[10px] w-4 text-slate-600">
                              {['A', 'B', 'C', 'D'][optIdx]}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isCorrectChoice && (
                            <span className="text-[10px] uppercase font-bold text-emerald-700 shrink-0">
                              Correct Answer
                            </span>
                          )}
                          {isUserChoice && !isCorrect && (
                            <span className="text-[10px] uppercase font-bold text-rose-700 shrink-0">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="ml-8 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 leading-relaxed">
                      <span className="font-bold text-indigo-900">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
