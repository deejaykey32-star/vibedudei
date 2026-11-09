import React from 'react';
import { VibeLevel } from '../data/courseData';

export interface SRSCardState {
  box: number; // 1..5
  nextDueDate: string; // YYYY-MM-DD
  reviews: number;
}

export interface DailyActivity {
  minutes: number;
  xp: number;
  circleSteps: string[];
  fivePromptsDone?: boolean;
}

export interface AppState {
  startedAt: string;
  currentWeek: number;
  levelOverride: VibeLevel | null;
  xp: number;
  whyVibeCoding: string;
  theme: 'light' | 'dark';
  ttsRate: number;
  activity: Record<string, DailyActivity>;
  courseLessons: Record<string, { done: boolean; stars: number; bestScore: number }>;
  levelTests: Record<string, number>;
  mistakes: { id: string; promptEn: string; correctAnswer: string; topicTitle: string }[];
  topics: Record<
    string,
    {
      lessons: Record<string, boolean>;
      videos: Record<string, boolean>;
    }
  >;
  srs: Record<string, SRSCardState>;
  certReady: Record<string, number>; // 0..100 readiness
  fivePromptsHistory: { date: string; prompts: string[]; reflection: string; score: number }[];
}

const STORAGE_KEY = 'vibedudei_state_v1';

export function todayKey(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const DEFAULT_STATE: AppState = {
  startedAt: todayKey(),
  currentWeek: 1,
  levelOverride: null,
  xp: 120,
  whyVibeCoding: 'Chcę swobodnie budować produkty AI po angielsku, łączyć kod z designem i e-marketingiem oraz zdać certyfikacje PM / Scrum (PSPO, PSM, PMP).',
  theme: 'light',
  ttsRate: 1.0,
  activity: {
    [todayKey()]: { minutes: 10, xp: 40, circleSteps: ['srs-warmup'] }
  },
  courseLessons: {
    'r1:concepts': { done: true, stars: 3, bestScore: 100 },
    'm1:concepts': { done: true, stars: 3, bestScore: 95 }
  },
  levelTests: {},
  mistakes: [],
  topics: {
    r1: { lessons: { words: true }, videos: {} },
    m1: { lessons: { words: true }, videos: {} }
  },
  srs: {},
  certReady: {
    'cert-pspo': 45,
    'cert-psm': 40,
    'cert-pmp': 30,
    'cert-prince2': 25,
    'cert-capm': 50,
    'cert-safe': 20
  },
  fivePromptsHistory: []
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      activity: { ...DEFAULT_STATE.activity, ...(parsed.activity || {}) },
      courseLessons: { ...DEFAULT_STATE.courseLessons, ...(parsed.courseLessons || {}) },
      topics: { ...DEFAULT_STATE.topics, ...(parsed.topics || {}) },
      certReady: { ...DEFAULT_STATE.certReady, ...(parsed.certReady || {}) }
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function calculateStreak(activity: Record<string, DailyActivity>): number {
  let count = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = d.toISOString().slice(0, 10);
    const act = activity[key];
    if (act && (act.xp > 0 || act.minutes > 0 || (act.circleSteps && act.circleSteps.length > 0))) {
      count++;
    } else if (i > 0) {
      break;
    }
    d.setDate(d.getDate() - 1);
  }
  return Math.max(1, count);
}

export function getTopicScore(state: AppState, topicId: string): number {
  const t = state.topics[topicId];
  if (!t) return 0;
  const lCount = Object.values(t.lessons || {}).filter(Boolean).length;
  const vCount = Object.values(t.videos || {}).filter(Boolean).length;
  return lCount + vCount;
}

// ==================== WEB SPEECH API (TTS) & AUDIO CHIMES ====================

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakEn(text: string, rate = 1.0): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const enVoice =
      voices.find((v) => v.lang.startsWith('en') && /natural|neural|google|samantha|daniel/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith('en'));
    if (enVoice) u.voice = enVoice;
    window.speechSynthesis.speak(u);
  } catch {
    // ignore speech errors
  }
}

export function speakPl(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pl-PL';
    u.rate = 1.02;
    const voices = window.speechSynthesis.getVoices();
    const plVoice = voices.find((v) => v.lang.startsWith('pl'));
    if (plVoice) u.voice = plVoice;
    window.speechSynthesis.speak(u);
  } catch {
    // ignore
  }
}

export function playFeedbackChime(type: 'good' | 'bad' | 'win'): void {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'good') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'bad') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(175, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc.start(now);
      osc.stop(now + 0.26);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.09);
      osc.frequency.setValueAtTime(783.99, now + 0.18);
      osc.frequency.setValueAtTime(1046.5, now + 0.27);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch {
    // ignore audio context block
  }
}

// ==================== VIBE-KURAK GUIDE MASCOT SVG & BUBBLE ====================

export const VibeKurakSvg: React.FC<{ mood?: 'happy' | 'proud' | 'talk' | 'think'; size?: number }> = ({
  mood = 'happy',
  size = 56
}) => {
  const beakOpen = mood === 'talk' || mood === 'proud';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Przewodnik Vibe-Kurak"
    >
      {/* Background Halo */}
      <circle cx="50" cy="52" r="42" fill="#eef4ff" stroke="#2563eb" strokeWidth="2.5" />
      {/* Rooster Red Comb (Programowanie) */}
      <path
        d="M34 22 C32 10, 44 10, 46 20 C49 8, 60 8, 59 20 C65 12, 73 18, 66 28 Z"
        fill="#dc2626"
      />
      {/* Head / Body White (Management Core) */}
      <ellipse cx="50" cy="56" rx="26" ry="28" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
      {/* Green Tech Visor / Glasses (Grafika i Multimedia) */}
      <rect x="28" y="38" width="44" height="14" rx="7" fill="#16a34a" stroke="#1e293b" strokeWidth="2" />
      <circle cx="40" cy="45" r="3.2" fill="#ffffff" />
      <circle cx="60" cy="45" r="3.2" fill="#ffffff" />
      {/* Blue AI Headset Mic (E-Marketing & Voice) */}
      <path d="M23 46 C20 46, 20 62, 34 65" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <circle cx="35" cy="65" r="3.5" fill="#2563eb" />
      {/* Beak */}
      {beakOpen ? (
        <g>
          <polygon points="44,54 56,54 50,62" fill="#f97316" stroke="#1e293b" strokeWidth="1.5" />
          <polygon points="45,62 55,62 50,67" fill="#dc2626" />
        </g>
      ) : (
        <polygon points="44,54 56,54 50,63" fill="#f97316" stroke="#1e293b" strokeWidth="1.5" />
      )}
      {/* Wattle */}
      <ellipse cx="46" cy="67" rx="3" ry="5" fill="#dc2626" />
      <ellipse cx="54" cy="67" rx="3" ry="5" fill="#dc2626" />
      {/* Badge Star on Chest if proud */}
      {mood === 'proud' && (
        <circle cx="50" cy="77" r="5" fill="#fbbf24" stroke="#1e293b" strokeWidth="1.5" />
      )}
    </svg>
  );
};

export const GuideSays: React.FC<{
  en: string;
  pl: string;
  mood?: 'happy' | 'proud' | 'talk' | 'think';
}> = ({ en, pl, mood = 'happy' }) => {
  return (
    <div className="flex items-start gap-3 my-3 w-full">
      <button
        type="button"
        onClick={() => speakEn(en)}
        title="Posłuchaj po angielsku (kliknij przewodnika)"
        className="guide-av shrink-0 cursor-pointer bg-transparent border-0 p-0"
      >
        <VibeKurakSvg mood={mood} size={62} />
      </button>
      <div
        className="flex-1 rounded-2xl p-3.5 border-2"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-extrabold tracking-wider uppercase" style={{ color: 'var(--accent)' }}>
            🐓 Vibe-Kurak · AI Coding & Agile Mentor
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => speakEn(en, 1.0)}
              className="px-2 py-0.5 text-xs font-bold rounded-md border cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              🔊 EN
            </button>
            <button
              type="button"
              onClick={() => speakEn(en, 0.72)}
              className="px-2 py-0.5 text-xs font-bold rounded-md border cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              🐢 0.75x
            </button>
            <button
              type="button"
              onClick={() => speakPl(pl)}
              className="px-2 py-0.5 text-xs font-bold rounded-md border cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              🇵🇱 PL
            </button>
          </div>
        </div>
        <p className="font-extrabold text-base mt-1 mb-1" style={{ color: 'var(--text)' }}>
          “{en}”
        </p>
        <p className="text-sm m-0" style={{ color: 'var(--muted)' }}>
          {pl}
        </p>
      </div>
    </div>
  );
};
