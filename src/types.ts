export type CategoryId =
  | 'general-knowledge'
  | 'science'
  | 'mathematics'
  | 'english'
  | 'computer'
  | 'pakistan-studies'
  | 'history'
  | 'daily';

export type AppView = 'home' | 'quiz' | 'result' | 'about' | 'privacy' | 'contact';

export interface Question {
  id: string;
  category: CategoryId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  iconName: string;
  color: string;
  lightBg: string;
  borderColor: string;
  questionCount: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number | null; // null if timed out
  correctIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface QuizResultData {
  categoryName: string;
  categoryId: CategoryId;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  finalScore: number;
  percentage: number;
  answers: QuizAnswer[];
  questions: Question[];
  completedAt: string;
}

export interface BestScoreRecord {
  score: number;
  percentage: number;
  totalQuestions: number;
  categoryName: string;
  date: string;
}

export interface UserStats {
  bestScore: BestScoreRecord | null;
  quizzesCompleted: number;
  totalCorrect: number;
  totalAnswered: number;
  categoryBests: Record<string, number>; // categoryId -> best score
  lastDailyDate: string | null;
  lastDailyScore: number | null;
}
