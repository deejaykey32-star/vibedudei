/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AppState,
  loadState,
  saveState,
  todayKey,
  calculateStreak,
  stopSpeaking,
  VibeKurakSvg
} from './utils/speechAndStorage';
import { getWeekPlan, VibeLevel, CIRCLE_STEPS } from './data/courseData';
import { TopicWheelSection } from './components/TopicWheelSection';
import {
  DashboardSection,
  CourseSection,
  PlanSection,
  CircleSection,
  ChatMentorSection
} from './components/CourseAndStudySections';
import {
  ShadowingSection,
  SameTopicSection,
  ThreeListenSection,
  SuperSlowSection,
  StoriesSection,
  FilmsHubSection,
  ThematicDictSection,
  MeaningsSection,
  PicturesLabSection,
  ReviewSrsSection,
  GrammarSection,
  FiveSentencesSection,
  MotivationSection,
  SettingsSection
} from './components/PracticeAndVocabSections';

export interface NavSectionItem {
  id: string;
  icon: string;
  title: string;
  group: string;
}

export const SECTIONS: NavSectionItem[] = [
  { id: 'dashboard', icon: '🏠', title: 'Pulpit', group: 'Start' },
  { id: 'course', icon: '🎓', title: 'Kurs V1 → V6 (lekcje)', group: 'Start' },
  { id: 'topics', icon: '🎯', title: 'Tarcza tematów + filmy', group: 'Start' },
  { id: 'plan', icon: '🗓️', title: 'Plan 2 lata', group: 'Start' },
  { id: 'circle', icon: '⭕', title: 'Krąg 30 minut', group: 'Start' },
  { id: 'chat', icon: '💬', title: 'Rozmowa z Mentorem AI', group: 'Mówienie' },
  { id: 'shadowing', icon: '🗣️', title: 'Shadowing (Voice Spec)', group: 'Mówienie' },
  { id: 'same-topic', icon: '🔁', title: 'Ten sam temat (Iteracje)', group: 'Mówienie' },
  { id: 'three-listen', icon: '🎧', title: 'Zasada 3 odsłuchów', group: 'Słuchanie' },
  { id: 'super-slow', icon: '🐢', title: 'Super Slow – 6 kroków', group: 'Słuchanie' },
  { id: 'stories', icon: '📖', title: 'Historie (Case Studies)', group: 'Słuchanie' },
  { id: 'films', icon: '🎬', title: 'Filmy z YouTube (EN)', group: 'Słuchanie' },
  { id: 'thematic', icon: '📚', title: 'Słownik tematyczny', group: 'Słownictwo' },
  { id: 'meanings', icon: '🔀', title: 'Wiele znaczeń (4 koła)', group: 'Słownictwo' },
  { id: 'pictures', icon: '🖼️', title: 'Ćwiczenia obrazkowe', group: 'Słownictwo' },
  { id: 'review', icon: '🧠', title: 'Powtórki SRS (pamięć)', group: 'Słownictwo' },
  { id: 'grammar', icon: '📐', title: 'Gramatyka Promptów', group: 'Słownictwo' },
  { id: 'five-sentences', icon: '✍️', title: '5 promptów dziennie', group: 'Pisanie' },
  { id: 'motivation', icon: '🔥', title: 'Motywacja & Certyfikaty', group: 'Ty' },
  { id: 'settings', icon: '⚙️', title: 'Lektor i ustawienia', group: 'Ty' }
];

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [activeSection, setActiveSection] = useState<string>('topics');
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  // Sub-routing state for Topic Wheel & Video Player & AI Chat
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedLessonKey, setSelectedLessonKey] = useState<string | null>(null);
  const [chatInitialTopicId, setChatInitialTopicId] = useState<string | null>(null);

  useEffect(() => {
    saveState(state);
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [state]);

  const navigateTo = (
    sectionId: string,
    params?: { topicId?: string | null; videoId?: string | null; lessonKey?: string | null }
  ) => {
    stopSpeaking();
    setActiveSection(sectionId);
    setMobileNavOpen(false);
    if (sectionId === 'topics') {
      setSelectedTopicId(params?.topicId ?? null);
      setSelectedVideoId(params?.videoId ?? null);
      setSelectedLessonKey(params?.lessonKey ?? null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const awardActivity = (xpDelta: number, minutesDelta: number, circleStepId?: string) => {
    const tKey = todayKey();
    setState((prev) => {
      const prevDay = prev.activity[tKey] || { minutes: 0, xp: 0, circleSteps: [] };
      const nextCircle =
        circleStepId && !prevDay.circleSteps.includes(circleStepId)
          ? [...prevDay.circleSteps, circleStepId]
          : prevDay.circleSteps;
      return {
        ...prev,
        xp: prev.xp + xpDelta,
        activity: {
          ...prev.activity,
          [tKey]: {
            ...prevDay,
            minutes: prevDay.minutes + minutesDelta,
            xp: prevDay.xp + xpDelta,
            circleSteps: nextCircle
          }
        }
      };
    });
  };

  const wp = getWeekPlan(state.currentWeek);
  const currentLevel = state.levelOverride || wp.level;
  const streak = calculateStreak(state.activity);
  const todayDoneCircle = state.activity[todayKey()]?.circleSteps || [];

  const groups = Array.from(new Set(SECTIONS.map((s) => s.group)));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Top Bar matching LangEduDei & 3-Zone Contract */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between gap-6 px-4 py-2.5 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Menu sekcji"
            className="lg:hidden px-2.5 py-1.5 rounded-lg border text-base font-bold cursor-pointer"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
          >
            ☰
          </button>
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="inline-flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap shrink-0"
          >
            <VibeKurakSvg mood="happy" size={36} />
            <span className="text-xl font-black tracking-tight">
              <span style={{ color: 'var(--ln-vibe)' }}>Vibe</span>
              <span style={{ color: 'var(--ln-edu)' }}>Edu</span>
              <span style={{ color: 'var(--ln-dei)' }}>Dei</span>
            </span>
          </button>
        </div>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className={`bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap shrink-0 hover:underline ${
              activeSection === 'dashboard' ? 'underline' : ''
            }`}
            style={{ color: activeSection === 'dashboard' ? 'var(--primary)' : 'var(--text)' }}
          >
            Pulpit
          </button>
          <button
            type="button"
            onClick={() => navigateTo('topics', { topicId: null, videoId: null, lessonKey: null })}
            className={`bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap shrink-0 hover:underline ${
              activeSection === 'topics' ? 'underline' : ''
            }`}
            style={{ color: activeSection === 'topics' ? 'var(--primary)' : 'var(--text)' }}
          >
            Tarcza tematów
          </button>
          <button
            type="button"
            onClick={() => navigateTo('course')}
            className={`bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap shrink-0 hover:underline ${
              activeSection === 'course' ? 'underline' : ''
            }`}
            style={{ color: activeSection === 'course' ? 'var(--primary)' : 'var(--text)' }}
          >
            Kurs V1→V6
          </button>
          <button
            type="button"
            onClick={() => navigateTo('films')}
            className={`bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap shrink-0 hover:underline ${
              activeSection === 'films' ? 'underline' : ''
            }`}
            style={{ color: activeSection === 'films' ? 'var(--primary)' : 'var(--text)' }}
          >
            Filmy YouTube
          </button>
          <button
            type="button"
            onClick={() => navigateTo('motivation')}
            className={`bg-transparent border-0 p-0 cursor-pointer whitespace-nowrap shrink-0 hover:underline ${
              activeSection === 'motivation' ? 'underline' : ''
            }`}
            style={{ color: activeSection === 'motivation' ? 'var(--primary)' : 'var(--text)' }}
          >
            Certyfikacje
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => navigateTo('circle')}
            className="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer whitespace-nowrap shrink-0"
            style={{ background: 'var(--primary)' }}
          >
            ⭕ Krąg 30 min ({todayDoneCircle.length}/6)
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar Drawer + Content Stage */}
      <div className="flex-1 flex relative max-w-[1440px] w-full mx-auto">
        {/* Sidebar Navigation matching LangEduDei */}
        <aside
          className={`${
            mobileNavOpen ? 'fixed inset-y-0 left-0 z-40 w-72 pt-14' : 'hidden'
          } lg:block lg:w-68 shrink-0 border-r p-3 overflow-y-auto`}
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          aria-label="Sekcje aplikacji VibeEduDei"
        >
          {/* Status Strip inside Sidebar */}
          <div
            className="p-2.5 rounded-xl border mb-3 flex items-center justify-between text-xs font-extrabold mono"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
          >
            <span className="px-2 py-0.5 rounded text-white" style={{ background: 'var(--accent)' }}>
              {currentLevel}
            </span>
            <span>Tydz. {wp.week}/104</span>
            <span>🔥 {streak}</span>
            <span style={{ color: 'var(--primary)' }}>{state.xp} XP</span>
          </div>

          {groups.map((grp) => (
            <div key={grp} className="mb-3">
              <div
                className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider"
                style={{ color: 'var(--muted)' }}
              >
                {grp}
              </div>
              <div className="space-y-0.5">
                {SECTIONS.filter((s) => s.group === grp).map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => navigateTo(sec.id)}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 cursor-pointer transition-colors"
                      style={{
                        background: isActive ? 'var(--tip-bg)' : 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--text)',
                        border: isActive ? '1px solid var(--primary)' : '1px solid transparent'
                      }}
                    >
                      <span className="text-base shrink-0">{sec.icon}</span>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Mobile Backdrop */}
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 md:p-6 pb-20 max-w-5xl mx-auto w-full">
          {activeSection === 'dashboard' && (
            <DashboardSection
              state={state}
              onNavigate={(sec, params) => navigateTo(sec, params)}
              onQuickXp={(xp, mins) => awardActivity(xp, mins)}
            />
          )}

          {activeSection === 'topics' && (
            <TopicWheelSection
              state={state}
              selectedTopicId={selectedTopicId}
              selectedVideoId={selectedVideoId}
              selectedLessonKey={selectedLessonKey}
              onSelectTopic={(tid) => {
                setSelectedTopicId(tid);
                setSelectedVideoId(null);
                setSelectedLessonKey(null);
              }}
              onSelectVideo={(vid) => setSelectedVideoId(vid)}
              onSelectLesson={(lkey) => setSelectedLessonKey(lkey)}
              onCompleteTopicLesson={(tid, lkey, xpEarned) => {
                awardActivity(xpEarned, 5);
                setState((prev) => ({
                  ...prev,
                  topics: {
                    ...prev.topics,
                    [tid]: {
                      lessons: { ...(prev.topics[tid]?.lessons || {}), [lkey]: true },
                      videos: { ...(prev.topics[tid]?.videos || {}) }
                    }
                  }
                }));
              }}
              onCompleteVideo={(tid, vid, xpEarned) => {
                awardActivity(xpEarned, 6, 'yt-immersion');
                setState((prev) => ({
                  ...prev,
                  topics: {
                    ...prev.topics,
                    [tid]: {
                      lessons: { ...(prev.topics[tid]?.lessons || {}) },
                      videos: { ...(prev.topics[tid]?.videos || {}), [vid]: true }
                    }
                  }
                }));
              }}
              onJumpToChat={(tid) => {
                setChatInitialTopicId(tid);
                navigateTo('chat');
              }}
            />
          )}

          {activeSection === 'course' && (
            <CourseSection
              state={state}
              onCompleteCourseLesson={(nodeId, stars, scorePct, xp, mistakes) => {
                awardActivity(xp, 6, 'course-node');
                setState((prev) => ({
                  ...prev,
                  courseLessons: {
                    ...prev.courseLessons,
                    [nodeId]: {
                      done: true,
                      stars: Math.max(stars, prev.courseLessons[nodeId]?.stars || 0),
                      bestScore: Math.max(scorePct, prev.courseLessons[nodeId]?.bestScore || 0)
                    }
                  },
                  mistakes: [
                    ...mistakes.map((m) => ({ ...m, topicTitle: nodeId })),
                    ...prev.mistakes
                  ].slice(0, 25)
                }));
              }}
              onPassLevelTest={(lvl, scorePct) => {
                awardActivity(50, 10);
                setState((prev) => ({
                  ...prev,
                  levelTests: {
                    ...prev.levelTests,
                    [lvl]: Math.max(scorePct, prev.levelTests[lvl] || 0)
                  }
                }));
              }}
              onOpenTopicVideoHub={(tid) => {
                navigateTo('topics', { topicId: tid, videoId: null, lessonKey: null });
              }}
            />
          )}

          {activeSection === 'plan' && (
            <PlanSection
              state={state}
              onSetWeek={(w) => setState((prev) => ({ ...prev, currentWeek: w }))}
              onOpenTopic={(tid) => navigateTo('topics', { topicId: tid })}
            />
          )}

          {activeSection === 'circle' && (
            <CircleSection
              state={state}
              onMarkCircleStep={(stepId, mins) => awardActivity(15, mins, stepId)}
              onNavigate={(sec) => navigateTo(sec)}
            />
          )}

          {activeSection === 'chat' && (
            <ChatMentorSection
              initialTopicId={chatInitialTopicId}
              onAwardXp={(xp, mins) => awardActivity(xp, mins)}
            />
          )}

          {activeSection === 'shadowing' && (
            <ShadowingSection
              onAwardXp={(xp, mins) => awardActivity(xp, mins, 'voice-shadowing')}
            />
          )}

          {activeSection === 'same-topic' && (
            <SameTopicSection onAwardXp={(xp, mins) => awardActivity(xp, mins)} />
          )}

          {activeSection === 'three-listen' && (
            <ThreeListenSection
              onOpenVideo={(tid, vid) => navigateTo('topics', { topicId: tid, videoId: vid })}
              onAwardXp={(xp, mins) => awardActivity(xp, mins, 'yt-immersion')}
            />
          )}

          {activeSection === 'super-slow' && (
            <SuperSlowSection onAwardXp={(xp, mins) => awardActivity(xp, mins)} />
          )}

          {activeSection === 'stories' && (
            <StoriesSection onAwardXp={(xp, mins) => awardActivity(xp, mins)} />
          )}

          {activeSection === 'films' && (
            <FilmsHubSection
              state={state}
              onOpenVideo={(tid, vid) => navigateTo('topics', { topicId: tid, videoId: vid })}
            />
          )}

          {activeSection === 'thematic' && <ThematicDictSection />}

          {activeSection === 'meanings' && <MeaningsSection />}

          {activeSection === 'pictures' && (
            <PicturesLabSection onAwardXp={(xp, mins) => awardActivity(xp, mins)} />
          )}

          {activeSection === 'review' && (
            <ReviewSrsSection
              onGradeCard={(wordKey, quality) => {
                const xp = quality === 'easy' ? 15 : quality === 'good' ? 10 : 5;
                awardActivity(xp, 1, 'srs-warmup');
                setState((prev) => ({
                  ...prev,
                  srs: {
                    ...prev.srs,
                    [wordKey]: {
                      box: quality === 'easy' ? 4 : quality === 'good' ? 2 : 1,
                      nextDueDate: todayKey(),
                      reviews: (prev.srs[wordKey]?.reviews || 0) + 1
                    }
                  }
                }));
              }}
            />
          )}

          {activeSection === 'grammar' && (
            <GrammarSection
              onAwardXp={(xp, mins) => awardActivity(xp, mins, 'prompt-grammar')}
            />
          )}

          {activeSection === 'five-sentences' && (
            <FiveSentencesSection
              state={state}
              onSaveFivePrompts={(prompts, reflection, score) => {
                awardActivity(30, 4, 'five-prompts');
                setState((prev) => ({
                  ...prev,
                  fivePromptsHistory: [
                    { date: todayKey(), prompts, reflection, score },
                    ...prev.fivePromptsHistory
                  ]
                }));
              }}
            />
          )}

          {activeSection === 'motivation' && (
            <MotivationSection
              state={state}
              onUpdateWhy={(why) => setState((prev) => ({ ...prev, whyVibeCoding: why }))}
              onAwardXp={(xp, mins) => awardActivity(xp, mins)}
              onOpenTopic={(tid) => navigateTo('topics', { topicId: tid })}
            />
          )}

          {activeSection === 'settings' && (
            <SettingsSection
              state={state}
              onToggleTheme={() =>
                setState((prev) => ({
                  ...prev,
                  theme: prev.theme === 'dark' ? 'light' : 'dark'
                }))
              }
              onSetLevelOverride={(lvl: VibeLevel | null) =>
                setState((prev) => ({ ...prev, levelOverride: lvl }))
              }
              onResetProgress={() => {
                localStorage.removeItem('vibedudei_state_v1');
                setState(loadState());
              }}
            />
          )}
        </main>
      </div>

      {/* Floating 30-Minute Vibe Circle Quick Widget (Bottom Right, like LangEduDei) */}
      {activeSection !== 'circle' && (
        <button
          type="button"
          onClick={() => navigateTo('circle')}
          className="fixed right-3 bottom-3 z-30 flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 text-xs font-extrabold cursor-pointer"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--primary)',
            color: 'var(--text)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <span>⭕ Krąg 30 min:</span>
          <span className="mono" style={{ color: 'var(--primary)' }}>
            {todayDoneCircle.length}/{CIRCLE_STEPS.length}
          </span>
        </button>
      )}
    </div>
  );
}
