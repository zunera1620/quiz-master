import { CategoryInfo, Question } from '../types';
import { ENGLISH_QUESTIONS } from './categories/english';
import { SCIENCE_QUESTIONS } from './categories/science';
import { HISTORY_QUESTIONS } from './categories/history';
import { GENERAL_KNOWLEDGE_QUESTIONS } from './categories/generalKnowledge';
import { MATHEMATICS_QUESTIONS } from './categories/mathematics';
import { COMPUTER_QUESTIONS } from './categories/computer';
import { PAKISTAN_STUDIES_QUESTIONS } from './categories/pakistanStudies';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    tagline: 'World facts, landmarks, geography & global trivia',
    iconName: 'Globe',
    color: 'from-blue-600 to-indigo-600',
    lightBg: 'bg-blue-50 text-blue-700 border-blue-100',
    borderColor: 'border-blue-200',
    questionCount: GENERAL_KNOWLEDGE_QUESTIONS.length,
  },
  {
    id: 'science',
    name: 'Science',
    tagline: 'Physics, Chemistry, Biology, Space & Cosmos',
    iconName: 'Atom',
    color: 'from-emerald-600 to-teal-600',
    lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    borderColor: 'border-emerald-200',
    questionCount: SCIENCE_QUESTIONS.length,
  },
  {
    id: 'history',
    name: 'History',
    tagline: 'World civilizations, revolutions, wars & icons',
    iconName: 'Landmark',
    color: 'from-amber-600 to-orange-600',
    lightBg: 'bg-amber-50 text-amber-800 border-amber-100',
    borderColor: 'border-amber-200',
    questionCount: HISTORY_QUESTIONS.length,
  },
  {
    id: 'english',
    name: 'English',
    tagline: 'Grammar, vocabulary, idioms, syntax & spelling',
    iconName: 'BookOpen',
    color: 'from-rose-600 to-pink-600',
    lightBg: 'bg-rose-50 text-rose-700 border-rose-100',
    borderColor: 'border-rose-200',
    questionCount: ENGLISH_QUESTIONS.length,
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    tagline: 'Arithmetic, algebra, geometry & quantitative logic',
    iconName: 'Calculator',
    color: 'from-violet-600 to-purple-600',
    lightBg: 'bg-violet-50 text-violet-700 border-violet-100',
    borderColor: 'border-violet-200',
    questionCount: MATHEMATICS_QUESTIONS.length,
  },
  {
    id: 'computer',
    name: 'Computer',
    tagline: 'Hardware, software, web, networks & cybersecurity',
    iconName: 'Cpu',
    color: 'from-cyan-600 to-blue-600',
    lightBg: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    borderColor: 'border-cyan-200',
    questionCount: COMPUTER_QUESTIONS.length,
  },
  {
    id: 'pakistan-studies',
    name: 'Pakistan Studies',
    tagline: 'History, geography, culture, constitution & heritage',
    iconName: 'Compass',
    color: 'from-green-600 to-emerald-700',
    lightBg: 'bg-green-50 text-green-800 border-green-100',
    borderColor: 'border-green-200',
    questionCount: PAKISTAN_STUDIES_QUESTIONS.length,
  },
];

export const QUESTION_BANK: Record<string, Question[]> = {
  'general-knowledge': GENERAL_KNOWLEDGE_QUESTIONS,
  science: SCIENCE_QUESTIONS,
  history: HISTORY_QUESTIONS,
  english: ENGLISH_QUESTIONS,
  mathematics: MATHEMATICS_QUESTIONS,
  computer: COMPUTER_QUESTIONS,
  'pakistan-studies': PAKISTAN_STUDIES_QUESTIONS,
};

// Shuffles an array with Fisher-Yates algorithm to prevent duplicates and randomize thoroughly
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Return a randomized question set for a category up to requested count (e.g. 10, 25, 50)
export function getCategoryQuestions(categoryId: string, count: number = 50): Question[] {
  const bank = QUESTION_BANK[categoryId] || [];
  if (bank.length === 0) return [];
  const shuffled = shuffleArray(bank);
  const targetCount = Math.min(count, shuffled.length);
  return shuffled.slice(0, targetCount);
}

// Daily quiz generator with deterministic selection across multiple categories
export function getDailyQuizQuestions(dateStr?: string, count: number = 5): Question[] {
  const todayKey = dateStr || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < todayKey.length; i++) {
    hash = (hash << 5) - hash + todayKey.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const catKeys = [
    'general-knowledge',
    'science',
    'history',
    'english',
    'mathematics',
    'computer',
    'pakistan-studies',
  ];

  const dailyQuestions: Question[] = [];
  const seenIds = new Set<string>();

  for (let i = 0; i < count; i++) {
    const cat = catKeys[(positiveHash + i) % catKeys.length];
    const questions = QUESTION_BANK[cat] || [];
    if (questions.length === 0) continue;

    // Pick question deterministically
    let qIndex = (positiveHash + i * 7) % questions.length;
    let attempts = 0;
    while (seenIds.has(questions[qIndex].id) && attempts < questions.length) {
      qIndex = (qIndex + 1) % questions.length;
      attempts++;
    }

    const q = questions[qIndex];
    seenIds.add(q.id);
    dailyQuestions.push({
      ...q,
      category: 'daily',
    });
  }

  return dailyQuestions;
}
