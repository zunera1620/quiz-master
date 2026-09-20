import { QuizResultData, UserStats } from '../types';

const STATS_STORAGE_KEY = 'quizmaster_stats_v1';
const SOUND_STORAGE_KEY = 'quizmaster_sound_enabled';

const defaultStats: UserStats = {
  bestScore: null,
  quizzesCompleted: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  categoryBests: {},
  lastDailyDate: null,
  lastDailyScore: null,
};

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStats,
      ...parsed,
    };
  } catch {
    return defaultStats;
  }
}

export function saveQuizResult(result: QuizResultData): UserStats {
  const current = getUserStats();

  const isNewBest =
    !current.bestScore ||
    result.percentage > current.bestScore.percentage ||
    (result.percentage === current.bestScore.percentage && result.finalScore > current.bestScore.score);

  const updatedBest = isNewBest
    ? {
        score: result.finalScore,
        percentage: result.percentage,
        totalQuestions: result.totalQuestions,
        categoryName: result.categoryName,
        date: result.completedAt,
      }
    : current.bestScore;

  const currentCatBest = current.categoryBests[result.categoryId] || 0;
  const updatedCategoryBests = {
    ...current.categoryBests,
    [result.categoryId]: Math.max(currentCatBest, result.finalScore),
  };

  const isDaily = result.categoryId === 'daily';
  const todayStr = new Date().toISOString().split('T')[0];

  const updated: UserStats = {
    bestScore: updatedBest,
    quizzesCompleted: current.quizzesCompleted + 1,
    totalCorrect: current.totalCorrect + result.correctAnswers,
    totalAnswered: current.totalAnswered + result.totalQuestions,
    categoryBests: updatedCategoryBests,
    lastDailyDate: isDaily ? todayStr : current.lastDailyDate,
    lastDailyScore: isDaily ? result.finalScore : current.lastDailyScore,
  };

  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to write to localStorage', err);
  }

  return updated;
}

// Sound System using native Web Audio API (no external file dependencies)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function getSoundEnabled(): boolean {
  try {
    const raw = localStorage.getItem(SOUND_STORAGE_KEY);
    return raw === null ? true : raw === 'true';
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  } catch {
    // ignore
  }
}

export function playSound(type: 'correct' | 'wrong' | 'tick' | 'complete' | 'click'): void {
  if (!getSoundEnabled()) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'correct') {
      // Pleasant dual chime (major third / chord arpeggio)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.09); // E5
      osc2.frequency.setValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.1);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } else if (type === 'wrong') {
      // Soft gentle low buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'tick') {
      // Subtle countdown tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'complete') {
      // Small fanfare
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.1, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    }
  } catch {
    // Audio Context might be restricted in some iframe policies
  }
}
