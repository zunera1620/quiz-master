/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { AboutPage } from './components/AboutPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppView, CategoryId, Question, QuizResultData, UserStats } from './types';
import {
  CATEGORIES,
  getCategoryQuestions,
  getDailyQuizQuestions,
} from './data/questions';
import {
  getUserStats,
  saveQuizResult,
  getSoundEnabled,
  setSoundEnabled,
} from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>('general-knowledge');
  const [activeCategoryName, setActiveCategoryName] = useState<string>('General Knowledge');
  const [activeQuestionCount, setActiveQuestionCount] = useState<number>(50);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [lastResult, setLastResult] = useState<QuizResultData | null>(null);
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [soundEnabled, setSoundState] = useState<boolean>(true);

  // Sync initial sound setting and stats on mount
  useEffect(() => {
    setSoundState(getSoundEnabled());
    setStats(getUserStats());
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundState(next);
    setSoundEnabled(next);
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Category Quiz with custom or standard question count (up to 50)
  const handleStartCategory = (categoryId: CategoryId, count: number = 50) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    const categoryTitle = cat ? cat.name : 'Quiz';
    const questions = getCategoryQuestions(categoryId, count);

    setActiveCategoryId(categoryId);
    setActiveCategoryName(categoryTitle);
    setActiveQuestionCount(count);
    setQuizQuestions(questions);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Daily Quiz
  const handleStartDailyQuiz = () => {
    const questions = getDailyQuizQuestions();
    setActiveCategoryId('daily');
    setActiveCategoryName('Daily Challenge');
    setActiveQuestionCount(questions.length);
    setQuizQuestions(questions);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Quiz Completion
  const handleFinishQuiz = (result: QuizResultData) => {
    const updatedStats = saveQuizResult(result);
    setStats(updatedStats);
    setLastResult(result);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restart the current active quiz
  const handleRestartQuiz = () => {
    if (activeCategoryId === 'daily') {
      handleStartDailyQuiz();
    } else {
      handleStartCategory(activeCategoryId, activeQuestionCount);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top App Header with Purple/Yellow Brand Identity */}
      <Header
        currentView={currentView}
        onNavigateHome={() => handleNavigate('home')}
        onNavigateView={handleNavigate}
        stats={stats}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <HomePage
                onStartCategory={handleStartCategory}
                onStartDailyQuiz={handleStartDailyQuiz}
                stats={stats}
              />
            </motion.div>
          )}

          {currentView === 'quiz' && (
            <motion.div
              key="quiz-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <QuizView
                categoryName={activeCategoryName}
                categoryId={activeCategoryId}
                questions={quizQuestions}
                onFinishQuiz={handleFinishQuiz}
                onCancelQuiz={() => handleNavigate('home')}
              />
            </motion.div>
          )}

          {currentView === 'result' && lastResult && (
            <motion.div
              key="result-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <ResultView
                result={lastResult}
                onRestartQuiz={handleRestartQuiz}
                onBackToHome={() => handleNavigate('home')}
              />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <AboutPage onBackToHome={() => handleNavigate('home')} />
            </motion.div>
          )}

          {currentView === 'privacy' && (
            <motion.div
              key="privacy-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <PrivacyPolicyPage onBackToHome={() => handleNavigate('home')} />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <ContactSection onBackToHome={() => handleNavigate('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Clean Footer with About, Privacy Policy, and Contact */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
