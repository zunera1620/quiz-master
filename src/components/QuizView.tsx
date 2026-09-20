import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { Question, QuizAnswer, QuizResultData } from '../types';
import { playSound } from '../utils/storage';

interface QuizViewProps {
  categoryName: string;
  categoryId: string;
  questions: Question[];
  onFinishQuiz: (result: QuizResultData) => void;
  onCancelQuiz: () => void;
}

const QUESTION_TIME_LIMIT = 20; // 20 seconds per question requirement

export const QuizView: React.FC<QuizViewProps> = ({
  categoryName,
  categoryId,
  questions,
  onFinishQuiz,
  onCancelQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME_LIMIT);
  // Store user answers indexed by question index: { selectedIndex, isAnswered, timeSpentSeconds }
  const [userAnswers, setUserAnswers] = useState<Record<number, {
    selectedIndex: number | null;
    timeSpentSeconds: number;
  }>>({});
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasPreviousQuestion = currentIndex > 0;

  // Selected option for the current question
  const currentSelection = userAnswers[currentIndex]?.selectedIndex ?? null;
  const isCurrentAnswered = currentSelection !== null;

  // Refs for tracking timer without stale closures
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const userAnswersRef = useRef(userAnswers);
  userAnswersRef.current = userAnswers;

  const currentQuestionRef = useRef<Question>(currentQuestion);
  currentQuestionRef.current = currentQuestion;

  const currentIndexRef = useRef<number>(currentIndex);
  currentIndexRef.current = currentIndex;

  const timeLeftRef = useRef<number>(timeLeft);
  timeLeftRef.current = timeLeft;

  // Select an answer option
  const handleSelectOption = (idx: number) => {
    const isAlreadySelected = currentSelection === idx;
    if (isAlreadySelected) return;

    const timeSpent = QUESTION_TIME_LIMIT - timeLeftRef.current;
    const isCorrect = idx === currentQuestion.correctIndex;

    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selectedIndex: idx,
        timeSpentSeconds: Math.max(1, timeSpent),
      },
    }));

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  // Compile final results and submit
  const finishQuizSession = (finalAnswersMap: typeof userAnswers) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const compiledAnswers: QuizAnswer[] = questions.map((q, idx) => {
      const record = finalAnswersMap[idx];
      const selectedIndex = record ? record.selectedIndex : null;
      const isCorrect = selectedIndex !== null && selectedIndex === q.correctIndex;
      const timeSpentSeconds = record ? record.timeSpentSeconds : QUESTION_TIME_LIMIT;

      return {
        questionId: q.id,
        selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        timeSpentSeconds,
      };
    });

    const correctCount = compiledAnswers.filter((a) => a.isCorrect).length;
    const wrongCount = compiledAnswers.filter((a) => a.selectedIndex !== null && !a.isCorrect).length;
    const unansweredCount = compiledAnswers.filter((a) => a.selectedIndex === null).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const resultData: QuizResultData = {
      categoryName,
      categoryId: categoryId as any,
      totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      unanswered: unansweredCount,
      finalScore: correctCount,
      percentage,
      answers: compiledAnswers,
      questions,
      completedAt: new Date().toISOString(),
    };

    playSound('complete');
    onFinishQuiz(resultData);
  };

  // Next Question or Finish
  const handleNextClick = () => {
    // If not answered yet, record as unanswered unless user answers now
    const updatedMap = { ...userAnswersRef.current };
    if (!updatedMap[currentIndex]) {
      updatedMap[currentIndex] = {
        selectedIndex: null,
        timeSpentSeconds: QUESTION_TIME_LIMIT - timeLeftRef.current,
      };
      setUserAnswers(updatedMap);
    }

    if (isLastQuestion) {
      finishQuizSession(updatedMap);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Previous Question
  const handlePreviousClick = () => {
    if (hasPreviousQuestion) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Setup 20-second timer whenever currentIndex changes
  useEffect(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired! Auto-advance to next question
          if (timerRef.current) clearInterval(timerRef.current);

          const updatedMap = { ...userAnswersRef.current };
          if (!updatedMap[currentIndexRef.current]) {
            updatedMap[currentIndexRef.current] = {
              selectedIndex: null,
              timeSpentSeconds: QUESTION_TIME_LIMIT,
            };
          }

          if (currentIndexRef.current >= totalQuestions - 1) {
            finishQuizSession(updatedMap);
          } else {
            setCurrentIndex((curr) => curr + 1);
          }
          return 0;
        }

        if (prev <= 5) {
          playSound('tick');
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, totalQuestions]);

  // Timer calculation
  const timerPercentage = (timeLeft / QUESTION_TIME_LIMIT) * 100;
  const isTimeCritical = timeLeft <= 5;
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Current progress calculation
  const answeredCount = Object.values(userAnswers).filter(
    (a) => (a as { selectedIndex: number | null }).selectedIndex !== null
  ).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
              {categoryName}
            </span>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
              {answeredCount} of {totalQuestions} answered
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <h2 id="quiz-question-number" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Question {currentIndex + 1}
            </h2>
            <span className="text-sm font-semibold text-slate-500">
              of {totalQuestions}
            </span>
          </div>
        </div>

        {/* 20-second Timer Indicator */}
        <div className="flex items-center gap-2.5">
          <div
            id="quiz-timer-pill"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border font-mono font-bold text-sm transition-colors ${
              isTimeCritical
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-white text-slate-700 border-slate-200 shadow-xs'
            }`}
          >
            <Clock
              className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : 'text-indigo-600'}`}
            />
            <span className="text-base">{timeLeft}s</span>
          </div>

          <button
            id="quiz-quit-button"
            onClick={() => setShowExitConfirm(true)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Quit Quiz"
            aria-label="Quit Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar with Question markers */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-0.5">
          <span>Progress ({progressPercent}%)</span>
          <span>{currentIndex + 1}/{totalQuestions}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            id="quiz-progress-bar"
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {/* Dynamic 20s Countdown Bar */}
        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 linear ${
              isTimeCritical ? 'bg-rose-500' : 'bg-amber-400'
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          id="quiz-question-card"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
        >
          {/* Question Text */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-indigo-700 tracking-wide uppercase">
                Multiple Choice • 1 Point
              </span>
              {isCurrentAnswered && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Answered
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* 4 Answer Options */}
          <div className="space-y-3 pt-1">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentSelection === idx;
              const isCorrectAnswer = idx === currentQuestion.correctIndex;
              const hasAnswered = isCurrentAnswered;

              let optionStyle = 'border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50 text-slate-800';
              let badgeStyle = 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700';

              if (hasAnswered) {
                if (isSelected && isCorrectAnswer) {
                  // User chose correctly
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold shadow-xs';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected && !isCorrectAnswer) {
                  // User chose wrongly
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold shadow-xs';
                  badgeStyle = 'bg-rose-600 text-white';
                } else if (!isSelected && isCorrectAnswer) {
                  // Reveal correct answer if wrong answer was chosen
                  optionStyle = 'border-emerald-400/80 bg-emerald-50/50 text-emerald-900 border-dashed';
                  badgeStyle = 'bg-emerald-100 text-emerald-800';
                } else {
                  optionStyle = 'border-slate-100 opacity-60 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] min-h-[56px] ${optionStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${badgeStyle}`}
                    >
                      {optionLetters[idx]}
                    </span>
                    <span className="text-sm sm:text-base leading-snug">{option}</span>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {hasAnswered && isCorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    {hasAnswered && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                    {!hasAnswered && (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 group-hover:border-indigo-400'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Instant Educational Feedback & Explanation */}
          {isCurrentAnswered && currentQuestion.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                currentSelection === currentQuestion.correctIndex
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Explanation &amp; Fact</span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {/* Bottom Navigation Buttons: Previous Question and Next Question */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Previous Question Button */}
            <button
              id="quiz-prev-button"
              onClick={handlePreviousClick}
              disabled={!hasPreviousQuestion}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[46px] ${
                hasPreviousQuestion
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95'
                  : 'bg-slate-100/50 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            {/* Hint / Status */}
            <p className="text-xs text-slate-500 hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {currentSelection === null
                  ? 'Pick an answer or wait for auto-advance'
                  : 'Answer recorded. Advance to continue.'}
              </span>
            </p>

            {/* Next Question / Submit Button */}
            <button
              id="quiz-next-button"
              onClick={handleNextClick}
              className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md min-h-[46px] ${
                isCurrentAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 active:scale-95'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
              }`}
            >
              <span>{isLastQuestion ? 'Submit Quiz' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h4 className="text-lg font-bold text-slate-900">Leave Quiz?</h4>
              <p className="text-sm text-slate-600">
                If you exit now, your current answers and progress for this round will be discarded.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                id="cancel-quit-dialog-button"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Continue Quiz
              </button>
              <button
                id="confirm-quit-dialog-button"
                onClick={onCancelQuiz}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Quit Quiz
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
