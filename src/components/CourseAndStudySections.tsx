import React, { useState } from 'react';
import {
  DOMAINS,
  TOPICS,
  findTopic,
  DomainKey
} from '../data/wheelTopics';
import {
  COURSE_LEVELS,
  LEVEL_PLAN,
  COURSE_LESSON_TYPES,
  CIRCLE_STEPS,
  VibeLevel,
  getWeekPlan,
  CERTIFICATIONS
} from '../data/courseData';
import {
  AppState,
  todayKey,
  calculateStreak,
  getTopicScore,
  speakEn,
  GuideSays,
  playFeedbackChime
} from '../utils/speechAndStorage';
import { ExercisePlayer, buildExercisesForTopic, ExerciseItem } from './ExercisePlayer';

// ==================== 1. DASHBOARD SECTION (PULPIT) ====================

interface DashboardProps {
  state: AppState;
  onNavigate: (section: string, params?: { topicId?: string; videoId?: string }) => void;
  onQuickXp: (xp: number, minutes: number) => void;
}

export const DashboardSection: React.FC<DashboardProps> = ({ state, onNavigate, onQuickXp }) => {
  const [dailyAnswered, setDailyAnswered] = useState<number | null>(null);
  const today = state.activity[todayKey()] || { minutes: 0, xp: 0, circleSteps: [] };
  const streak = calculateStreak(state.activity);
  const wp = getWeekPlan(state.currentWeek);
  const activeLevel = state.levelOverride || wp.level;
  const totalTopicsVisited = TOPICS.filter((t) => getTopicScore(state, t.id) > 0).length;
  const totalLessonsDone = Object.values(state.courseLessons).filter((x) => x.done).length;

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold m-0">
              🏠 Pulpit · VibeEduDei (Nauka Vibe Codingu po angielsku)
            </h1>
            <p className="text-xs md:text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
              Tydzień {wp.week}/104 · Aktualny poziom: <strong>{activeLevel}</strong> · Temat tygodnia:{' '}
              <strong>
                {wp.topic.emoji} {wp.topic.titleEn}
              </strong>{' '}
              ({DOMAINS[wp.topic.domain].namePl})
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('topics')}
            className="px-4 py-2.5 rounded-xl font-extrabold text-white text-sm cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            🎯 Otwórz Koło 48 Tematów ▶
          </button>
        </div>

        <GuideSays
          en={`Welcome back, Vibe Builder! Today we focus on ${wp.topic.titleEn}. Complete your 30-Minute Vibe Circle or explore the 4-domain Topic Wheel!`}
          pl={`Witaj z powrotem! Dziś w planie: „${wp.topic.titleEn}” (${wp.topic.titlePl}). Wszystkie materiały i prompty ćwiczymy po angielsku z podpowiedziami PL.`}
          mood="happy"
        />

        {/* Stats Row like LangEduDei */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-3">
          <div className="p-3 rounded-xl border text-center" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-xl">🔥</div>
            <div className="text-xl font-extrabold mono">{streak} dni</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Seria (Streak)</div>
          </div>
          <div className="p-3 rounded-xl border text-center" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-xl">⚡</div>
            <div className="text-xl font-extrabold mono">{state.xp} XP</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Łączne XP</div>
          </div>
          <div className="p-3 rounded-xl border text-center" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-xl">⏱️</div>
            <div className="text-xl font-extrabold mono">{today.minutes}/30 min</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Dzisiaj</div>
          </div>
          <div className="p-3 rounded-xl border text-center" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-xl">🎯</div>
            <div className="text-xl font-extrabold mono">{totalTopicsVisited}/48</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Koło tematów</div>
          </div>
          <div className="p-3 rounded-xl border text-center col-span-2 sm:col-span-1" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-xl">🎓</div>
            <div className="text-xl font-extrabold mono">{totalLessonsDone}</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Ukończone lekcje</div>
          </div>
        </div>

        {/* 6-Level Progression Bar (V1 -> V6) */}
        <div className="mt-4">
          <div className="text-xs font-extrabold mb-1.5" style={{ color: 'var(--muted)' }}>
            Ścieżka biegłości Vibe Codingu (od V1 Novice do V6 AI-Native Leader):
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {LEVEL_PLAN.map((lp) => {
              const isCurrent = lp.level === activeLevel;
              const isPassed = (state.levelTests[lp.level] || 0) >= 80;
              return (
                <button
                  key={lp.level}
                  type="button"
                  onClick={() => onNavigate('course')}
                  className="p-2 rounded-xl text-center font-extrabold text-xs cursor-pointer border transition-all"
                  style={{
                    background: isCurrent ? 'var(--accent)' : isPassed ? 'var(--good-bg)' : 'var(--surface-2)',
                    color: isCurrent ? '#ffffff' : isPassed ? 'var(--good)' : 'var(--text)',
                    borderColor: isCurrent ? 'var(--accent)' : 'var(--border)'
                  }}
                >
                  {isPassed ? '✅ ' : ''}{lp.badgeName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Domains Quick Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {(['R', 'G', 'B', 'M'] as DomainKey[]).map((dKey) => {
          const dom = DOMAINS[dKey];
          const domTopics = TOPICS.filter((t) => t.domain === dKey);
          const doneCount = domTopics.filter((t) => getTopicScore(state, t.id) > 0).length;
          return (
            <button
              key={dKey}
              type="button"
              onClick={() => onNavigate('topics')}
              className="p-4 rounded-2xl border text-left flex flex-col justify-between gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                borderTopWidth: '6px',
                borderTopColor: dom.borderHex,
                boxShadow: 'var(--shadow)'
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{dom.icon}</span>
                  <span className="text-xs font-extrabold mono" style={{ color: 'var(--muted)' }}>
                    {doneCount}/12 obszarów
                  </span>
                </div>
                <h3 className="text-base font-extrabold mt-1 mb-0" style={{ color: 'var(--text)' }}>
                  {dom.namePl}
                </h3>
                <div className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
                  {dom.nameEn}
                </div>
                <p className="text-xs mt-1 mb-0 line-clamp-3" style={{ color: 'var(--muted)' }}>
                  {dom.descriptionPl}
                </p>
              </div>
              <div className="text-xs font-extrabold pt-1" style={{ color: 'var(--primary)' }}>
                Otwórz na tarczy ▶
              </div>
            </button>
          );
        })}
      </div>

      {/* Two-Column Split: 30-Minute Vibe Circle + Daily Quick English Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-extrabold m-0">⭕ Dzisiejszy Krąg 30 Minut ({today.circleSteps.length}/6)</h2>
            <button
              type="button"
              onClick={() => onNavigate('circle')}
              className="text-xs font-extrabold cursor-pointer bg-transparent border-0"
              style={{ color: 'var(--primary)' }}
            >
              Pełny widok ▶
            </button>
          </div>
          <p className="text-xs mt-0 mb-3" style={{ color: 'var(--muted)' }}>
            Codzienny nawyk: 6 krótkich kroków łączących słownictwo AI, wideo z YouTube po angielsku, budowę promptu i głosowy shadowing.
          </p>
          <div className="space-y-2">
            {CIRCLE_STEPS.map((st) => {
              const done = today.circleSteps.includes(st.id);
              return (
                <div
                  key={st.id}
                  className="p-2.5 rounded-xl border flex items-center justify-between gap-2"
                  style={{
                    background: done ? 'var(--good-bg)' : 'var(--surface-2)',
                    borderColor: done ? 'var(--good)' : 'var(--border)'
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{done ? '✅' : st.icon}</span>
                    <div>
                      <div className="text-xs font-extrabold">{st.titlePl}</div>
                      <div className="text-[11px]" style={{ color: 'var(--muted)' }}>
                        {st.titleEn} · {st.minutes} min
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(st.targetSection)}
                    className="px-3 py-1 rounded-lg text-xs font-bold text-white cursor-pointer"
                    style={{ background: done ? 'var(--good)' : 'var(--primary)' }}
                  >
                    {done ? 'Powtórz' : 'Start ▶'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily English Prompt & Certification Quick Quiz */}
        <div
          className="p-5 rounded-2xl border flex flex-col justify-between"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                ⚡ Szybkie Wyzwanie Dnia (English)
              </span>
              <button
                type="button"
                onClick={() => speakEn(wp.topic.quiz[0].q, 1.0)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                🔊 Listen EN
              </button>
            </div>
            <h3 className="text-base font-extrabold mt-1 mb-2">{wp.topic.quiz[0].q}</h3>
            <div className="space-y-2">
              {wp.topic.quiz[0].options.map((opt, idx) => {
                const isSelected = dailyAnswered === idx;
                const isRight = dailyAnswered !== null && idx === wp.topic.quiz[0].answer;
                const isWrong = dailyAnswered !== null && isSelected && idx !== wp.topic.quiz[0].answer;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={dailyAnswered !== null}
                    onClick={() => {
                      setDailyAnswered(idx);
                      if (idx === wp.topic.quiz[0].answer) {
                        playFeedbackChime('good');
                        onQuickXp(15, 2);
                      } else {
                        playFeedbackChime('bad');
                      }
                    }}
                    className="w-full p-3 rounded-xl border-2 text-left text-xs md:text-sm font-bold cursor-pointer transition-all"
                    style={{
                      background: isRight
                        ? 'var(--good-bg)'
                        : isWrong
                        ? 'var(--bad-bg)'
                        : 'var(--surface-2)',
                      borderColor: isRight
                        ? 'var(--good)'
                        : isWrong
                        ? 'var(--bad)'
                        : 'var(--border)'
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {dailyAnswered !== null && (
              <div className="mt-3 p-3 rounded-xl text-xs font-bold" style={{ background: 'var(--tip-bg)' }}>
                💡 {wp.topic.quiz[0].explanationEn}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t flex items-center justify-between flex-wrap gap-2" style={{ borderColor: 'var(--border)' }}>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              Chcesz obejrzeć film z tego obszaru po angielsku?
            </span>
            <button
              type="button"
              onClick={() => onNavigate('topics', { topicId: wp.topic.id, videoId: wp.topic.videos[0].id })}
              className="px-3.5 py-1.5 rounded-xl font-extrabold text-xs text-white cursor-pointer"
              style={{ background: 'var(--primary)' }}
            >
              🎬 Otwórz film: {wp.topic.short} ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== 2. COURSE V1 -> V6 SECTION (KURS) ====================

interface CourseSectionProps {
  state: AppState;
  onCompleteCourseLesson: (
    nodeId: string,
    stars: number,
    scorePct: number,
    xp: number,
    mistakes: { id: string; promptEn: string; correctAnswer: string }[]
  ) => void;
  onPassLevelTest: (level: VibeLevel, scorePct: number) => void;
  onOpenTopicVideoHub: (topicId: string) => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  state,
  onCompleteCourseLesson,
  onPassLevelTest,
  onOpenTopicVideoHub
}) => {
  const defaultLvl = state.levelOverride || getWeekPlan(state.currentWeek).level;
  const [selectedLevel, setSelectedLevel] = useState<VibeLevel>(defaultLvl);
  const [activeLessonNode, setActiveLessonNode] = useState<{ topicId: string; key: string } | null>(null);
  const [activeLevelTest, setActiveLevelTest] = useState<VibeLevel | null>(null);
  const [reviewingMistakes, setReviewingMistakes] = useState(false);

  const units = TOPICS.filter((t) => t.level === selectedLevel);
  const levelInfo = LEVEL_PLAN.find((l) => l.level === selectedLevel) || LEVEL_PLAN[0];

  if (reviewingMistakes && state.mistakes.length > 0) {
    const mistakeExercises: ExerciseItem[] = state.mistakes.slice(0, 8).map((m, i) => ({
      id: `mistake-${i}`,
      type: 'concept-choice',
      typeLabelPl: 'Powtórka błędu (Mistake Review)',
      promptQuestionEn: m.promptEn,
      subHintPl: 'Wybierz poprawną odpowiedź po angielsku:',
      emoji: '🔁',
      options: [
        m.correctAnswer,
        'Skip all validation and deploy directly to production',
        'Ignore stakeholder acceptance criteria',
        'Use hardcoded secrets inside client code'
      ],
      correctIndex: 0,
      explanationEn: `Verified answer: ${m.correctAnswer}`
    }));

    return (
      <ExercisePlayer
        title="🔁 Powtórka błędów · Mistake Recovery"
        subtitle="Utrwal pojęcia, które wcześniej sprawiły trudność"
        exercises={mistakeExercises}
        onCancel={() => setReviewingMistakes(false)}
        onFinish={(res) => {
          onCompleteCourseLesson('mistakes:review', res.stars, res.scorePct, res.correct * 10, []);
          setReviewingMistakes(false);
        }}
      />
    );
  }

  if (activeLevelTest) {
    const lvlUnits = TOPICS.filter((t) => t.level === activeLevelTest);
    const allExs = lvlUnits.flatMap((u) => buildExercisesForTopic(u, 'quiz')).slice(0, 12);
    return (
      <ExercisePlayer
        title={`🏁 Test końcowy poziomu ${activeLevelTest}`}
        subtitle="Zdaj na min. 80%, aby oficjalnie zaliczyć poziom Vibe Codingu"
        exercises={allExs}
        onCancel={() => setActiveLevelTest(null)}
        onFinish={(res) => {
          onPassLevelTest(activeLevelTest, res.scorePct);
          setActiveLevelTest(null);
        }}
      />
    );
  }

  if (activeLessonNode) {
    const unitTopic = findTopic(activeLessonNode.topicId);
    if (!unitTopic) return null;
    const lType = COURSE_LESSON_TYPES.find((x) => x.key === activeLessonNode.key) || COURSE_LESSON_TYPES[0];
    const exs = buildExercisesForTopic(
      unitTopic,
      activeLessonNode.key as 'concepts' | 'patterns' | 'review' | 'test'
    );

    return (
      <ExercisePlayer
        title={`${unitTopic.emoji} ${unitTopic.titleEn} · ${lType.titlePl}`}
        subtitle={`Poziom ${unitTopic.level} · ${DOMAINS[unitTopic.domain].namePl}`}
        exercises={exs}
        onCancel={() => setActiveLessonNode(null)}
        onFinish={(res) => {
          const nodeId = `${unitTopic.id}:${activeLessonNode.key}`;
          onCompleteCourseLesson(nodeId, res.stars, res.scorePct, Math.max(20, res.correct * 10), res.mistakes);
          setActiveLessonNode(null);
        }}
      />
    );
  }

  const totalNodesInLevel = units.length * COURSE_LESSON_TYPES.length;
  const completedNodesInLevel = units.reduce((acc, u) => {
    return (
      acc +
      COURSE_LESSON_TYPES.filter((lt) => state.courseLessons[`${u.id}:${lt.key}`]?.done).length
    );
  }, 0);

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold m-0">
              🎓 Kurs Vibe Codingu V1 → V6 (Interaktywna ścieżka lekcji)
            </h1>
            <p className="text-xs md:text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
              Styl Sololearn / Mimo / LangEduDei: krótkie moduły po angielsku łączące Programowanie, Grafikę, E-Marketing oraz Management &amp; Certyfikacje.
            </p>
          </div>
          {state.mistakes.length > 0 && (
            <button
              type="button"
              onClick={() => setReviewingMistakes(true)}
              className="px-3.5 py-2 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{ background: 'var(--warn-bg)', borderColor: 'var(--accent)' }}
            >
              🔁 Powtórz błędy ({state.mistakes.length})
            </button>
          )}
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {COURSE_LEVELS.map((lvl) => {
            const isSel = lvl === selectedLevel;
            const passed = (state.levelTests[lvl] || 0) >= 80;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className="px-4 py-2 rounded-xl font-extrabold text-sm border cursor-pointer transition-all"
                style={{
                  background: isSel ? 'var(--primary)' : 'var(--surface-2)',
                  color: isSel ? '#ffffff' : 'var(--text)',
                  borderColor: isSel ? 'var(--primary)' : 'var(--border)'
                }}
              >
                {passed ? '✅ ' : ''}{lvl}
              </button>
            );
          })}
        </div>

        {/* Level Header Card */}
        <div
          className="p-4 rounded-xl border"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-lg font-extrabold m-0">{levelInfo.badgeName}</h2>
              <p className="text-xs mt-1 mb-0" style={{ color: 'var(--muted)' }}>
                {levelInfo.goalPl}
              </p>
              <p className="text-xs font-bold mt-0.5 mb-0" style={{ color: 'var(--primary)' }}>
                EN Goal: {levelInfo.goalEn}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold mono">
                {completedNodesInLevel}/{totalNodesInLevel}
              </div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>lekcji ukończonych</div>
            </div>
          </div>

          <div className="h-3 rounded-full overflow-hidden my-3" style={{ background: 'var(--surface)' }}>
            <div
              className="h-full transition-all"
              style={{
                width: `${Math.round((completedNodesInLevel / Math.max(1, totalNodesInLevel)) * 100)}%`,
                background: 'linear-gradient(90deg, var(--primary), var(--accent))'
              }}
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveLevelTest(selectedLevel)}
              className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
              style={{ background: 'var(--accent)' }}
            >
              🏁 Test końcowy poziomu {selectedLevel}
            </button>
            {state.levelTests[selectedLevel] !== undefined && (
              <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>
                Najlepszy wynik testu: <strong>{state.levelTests[selectedLevel]}%</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Units for the Selected Level */}
      <div className="space-y-3">
        {units.map((u) => {
          const dom = DOMAINS[u.domain];
          return (
            <div
              key={u.id}
              className="p-5 rounded-2xl border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                borderTopWidth: '5px',
                borderTopColor: dom.borderHex,
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{u.emoji}</span>
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                      {dom.icon} {dom.namePl} · {dom.nameEn}
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold m-0">{u.titleEn}</h3>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>
                      🇵🇱 {u.titlePl} · {u.words.length} pojęć · {u.sentences.length} wzorców · {u.videos.length} filmy YT
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => speakEn(u.titleEn, 1.0)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                >
                  🔊 EN
                </button>
              </div>

              {/* 5 Circular Lesson Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 justify-items-center">
                {COURSE_LESSON_TYPES.map((lt) => {
                  const nodeId = `${u.id}:${lt.key}`;
                  const st = state.courseLessons[nodeId];
                  const isDone = Boolean(st?.done);
                  const isVideoNode = lt.key === 'video';

                  return (
                    <button
                      key={lt.key}
                      type="button"
                      onClick={() => {
                        if (isVideoNode) {
                          onOpenTopicVideoHub(u.id);
                        } else {
                          setActiveLessonNode({ topicId: u.id, key: lt.key });
                        }
                      }}
                      className="flex flex-col items-center gap-1 text-center cursor-pointer bg-transparent border-0 group"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white transition-transform group-hover:-translate-y-1"
                        style={{
                          background: isDone
                            ? 'var(--good)'
                            : lt.key === 'test'
                            ? 'var(--accent)'
                            : isVideoNode
                            ? '#dc2626'
                            : 'var(--primary)',
                          boxShadow: '0 4px 0 rgba(0,0,0,0.18)'
                        }}
                      >
                        {isDone ? '✅' : lt.icon}
                      </div>
                      <div className="text-xs font-extrabold leading-tight mt-1" style={{ color: 'var(--text)' }}>
                        {lt.titlePl}
                      </div>
                      <div className="text-[11px]" style={{ color: '#f5b301' }}>
                        {st?.stars ? '★'.repeat(st.stars) + '☆'.repeat(3 - st.stars) : '☆☆☆'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== 3. 2-YEAR PLAN SECTION (PLAN 2 LATA) ====================

export const PlanSection: React.FC<{
  state: AppState;
  onSetWeek: (week: number) => void;
  onOpenTopic: (topicId: string) => void;
}> = ({ state, onSetWeek, onOpenTopic }) => {
  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          🗓️ Plan 2 lata (104 tygodnie Vibe Codingu: V1 → V6)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Kompletna mapa drogowa od pierwszego promptu po architekturę systemów AI, grafikę 3D, automatyzację e-marketingu oraz certyfikacje PMP, PRINCE2, PSM i PSPO.
        </p>

        <div className="flex items-center gap-3 flex-wrap p-3.5 rounded-xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <span className="text-sm font-extrabold">Twój aktywny tydzień nauki:</span>
          <input
            type="range"
            min={1}
            max={104}
            value={state.currentWeek}
            onChange={(e) => onSetWeek(Number(e.target.value))}
            className="flex-1 accent-blue-600"
          />
          <span className="px-3 py-1 rounded-lg font-extrabold text-sm mono text-white" style={{ background: 'var(--primary)' }}>
            Tydzień {state.currentWeek} / 104
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {LEVEL_PLAN.map((lp) => {
          const isCurrentLevel = state.currentWeek >= lp.weeks[0] && state.currentWeek <= lp.weeks[1];
          return (
            <div
              key={lp.level}
              className="p-5 rounded-2xl border-2"
              style={{
                background: 'var(--surface)',
                borderColor: isCurrentLevel ? 'var(--primary)' : 'var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-extrabold text-white"
                    style={{ background: isCurrentLevel ? 'var(--accent)' : 'var(--primary)' }}
                  >
                    {lp.badgeName}
                  </span>
                  <span className="text-xs font-bold mono" style={{ color: 'var(--muted)' }}>
                    Tygodnie {lp.weeks[0]}–{lp.weeks[1]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSetWeek(lp.weeks[0])}
                  className="px-3 py-1 rounded-lg text-xs font-bold border cursor-pointer"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                >
                  Ustaw tydzień {lp.weeks[0]}
                </button>
              </div>

              <p className="text-sm font-bold my-1">{lp.goalPl}</p>
              <p className="text-xs italic m-0 mb-3" style={{ color: 'var(--muted)' }}>
                🇬🇧 {lp.goalEn}
              </p>

              <div className="flex flex-wrap gap-2">
                {lp.focusAreas.map((tid) => {
                  const t = findTopic(tid);
                  if (!t) return null;
                  const dom = DOMAINS[t.domain];
                  return (
                    <button
                      key={tid}
                      type="button"
                      onClick={() => onOpenTopic(t.id)}
                      className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.titleEn}</span>
                      <span className="opacity-65">({dom.namePl})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== 4. 30-MINUTE CIRCLE SECTION (KRĄG 30 MINUT) ====================

export const CircleSection: React.FC<{
  state: AppState;
  onMarkCircleStep: (stepId: string, minutes: number) => void;
  onNavigate: (section: string) => void;
}> = ({ state, onMarkCircleStep, onNavigate }) => {
  const doneSteps = state.activity[todayKey()]?.circleSteps || [];

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          ⭕ 30-minutowy Krąg Vibe Codingu (Daily 30-Minute Circle)
        </h1>
        <p className="text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
          Codzienny rytuał wzorowany na LangEduDei: 6 krótkich bloków po 4–7 minut (powtórka SRS, anglojęzyczne wideo z koła tematów, lekcja kursu, głosowy shadowing, składnia promptu i 5 promptów dnia).
        </p>

        {/* Radial Visual Circle matching LangEduDei */}
        <div className="circle-visual">
          {CIRCLE_STEPS.map((st, i) => {
            const isDone = doneSteps.includes(st.id);
            const deg = i * 60 - 90;
            return (
              <div
                key={st.id}
                onClick={() => onNavigate(st.targetSection)}
                className={`circle-step ${isDone ? 'done' : ''}`}
                style={{
                  transform: `rotate(${deg}deg) translate(98px) rotate(${-deg}deg)`
                }}
                title={`${st.titlePl} (${st.minutes} min)`}
              >
                <div className="text-xl">{isDone ? '✅' : st.icon}</div>
                <div className="text-[11px] font-bold mono" style={{ color: 'var(--muted)' }}>
                  {st.minutes}′
                </div>
              </div>
            );
          })}
          <div className="circle-center">
            <strong className="text-2xl font-extrabold mono">{doneSteps.length}/6</strong>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>kroków dziś</span>
          </div>
        </div>

        {/* 6 Step Cards */}
        <div className="space-y-2.5">
          {CIRCLE_STEPS.map((st, idx) => {
            const isDone = doneSteps.includes(st.id);
            return (
              <div
                key={st.id}
                className="p-4 rounded-xl border flex items-center justify-between gap-3 flex-wrap"
                style={{
                  background: isDone ? 'var(--good-bg)' : 'var(--surface-2)',
                  borderColor: isDone ? 'var(--good)' : 'var(--border)'
                }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-[220px]">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm text-white shrink-0"
                    style={{ background: isDone ? 'var(--good)' : 'var(--primary)' }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-extrabold m-0">
                      {st.icon} {st.titlePl}{' '}
                      <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>
                        · {st.titleEn} · {st.minutes} min
                      </span>
                    </h3>
                    <p className="text-xs mt-1 mb-0" style={{ color: 'var(--muted)' }}>
                      {st.descPl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(st.targetSection)}
                    className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                    style={{ background: 'var(--primary)' }}
                  >
                    {isDone ? 'Powtórz ▶' : 'Start ▶'}
                  </button>
                  {!isDone && (
                    <button
                      type="button"
                      onClick={() => {
                        playFeedbackChime('good');
                        onMarkCircleStep(st.id, st.minutes);
                      }}
                      className="px-3 py-2 rounded-xl font-bold text-xs border cursor-pointer"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      ✓ Oznacz jako zrobione
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== 5. AI MENTOR CONVERSATION & CERTIFICATIONS ====================

export const ChatMentorSection: React.FC<{
  initialTopicId?: string | null;
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ initialTopicId, onAwardXp }) => {
  const [topicId, setTopicId] = useState<string>(initialTopicId || 'r1');
  const topic = findTopic(topicId) || TOPICS[0];
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'mentor' | 'user'; textEn: string; hintPl?: string; scoreFeedback?: string }[]
  >([
    {
      sender: 'mentor',
      textEn: `Hello! Let's practice Vibe Coding in English on "${topic.titleEn}". How would you write a prompt or specification using "${topic.words[0].en}"?`,
      hintPl: `Napisz po angielsku prompt, kryterium Given/When/Then lub odpowiedź używając pojęcia „${topic.words[0].en}” (${topic.words[0].pl}).`
    }
  ]);

  const handleTopicChange = (newId: string) => {
    setTopicId(newId);
    const nt = findTopic(newId) || TOPICS[0];
    const intro = `Great choice! Let's switch to "${nt.titleEn}" (${DOMAINS[nt.domain].nameEn}). Try formulating an English prompt or agile specification using "${nt.words[0].en}" or "${nt.words[1].en}"!`;
    speakEn(intro, 1.0);
    setMessages([
      {
        sender: 'mentor',
        textEn: intro,
        hintPl: `Napisz po angielsku zdanie lub prompt z pojęciem „${nt.words[0].en}” albo „${nt.words[1].en}”.`
      }
    ]);
  };

  const handleSend = (textToSend?: string) => {
    const raw = (textToSend ?? input).trim();
    if (!raw) return;

    const wordsMatched = topic.words.filter((w) =>
      raw.toLowerCase().includes(w.en.split(' ')[0].toLowerCase())
    );
    const wordCount = raw.split(/\s+/).length;
    const hasStructure = /given|when|then|context|objective|constraint|return|schema|ensure|build|verify|sprint|backlog/i.test(raw);

    const nextWord = topic.words[(messages.length + 1) % topic.words.length];
    const replyEn =
      wordsMatched.length > 0
        ? `Spot on! You effectively used "${wordsMatched[0].en}" in context. Next challenge: How would you integrate "${nextWord.en}" into this workflow?`
        : `Good effort in English! To make your Vibe Coding specification even sharper, try including terms like "${nextWord.en}": "${nextWord.promptExample}"`;

    const feedback = `Ocena promptu: ${wordCount >= 8 ? '✅ Dobra szczegółowość' : '⚠️ Dodaj więcej kontekstu (min. 8 słów)'} · ${
      hasStructure ? '✅ Zawiera słowa strukturalne' : '💡 Warto użyć słów: Ensure / Given / When / Then / Context'
    } · +15 XP`;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', textEn: raw },
      {
        sender: 'mentor',
        textEn: replyEn,
        hintPl: `Wskazówka: „${nextWord.en}” oznacza: ${nextWord.pl}.`,
        scoreFeedback: feedback
      }
    ]);
    setInput('');
    speakEn(replyEn, 1.0);
    playFeedbackChime('good');
    onAwardXp(15, 2);
  };

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold m-0">
              💬 Rozmowa z Mentorem AI po angielsku (English Prompt &amp; Agile Coach)
            </h1>
            <p className="text-xs md:text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
              Ćwicz formułowanie promptów, specyfikacji technicznych i odpowiedzi Scrum/PM po angielsku z natychmiastową informacją zwrotną i lektorem TTS.
            </p>
          </div>
          <select
            value={topicId}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="px-3 py-2 rounded-xl border font-bold text-xs md:text-sm max-w-xs"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {DOMAINS[t.domain].icon} {t.titleEn} ({t.short})
              </option>
            ))}
          </select>
        </div>

        {/* Starter Prompt Chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {topic.words.slice(0, 4).map((w, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(w.promptExample)}
              className="px-3 py-1 rounded-full text-xs font-bold border cursor-pointer"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
            >
              ⚡ Użyj: “{w.en}”
            </button>
          ))}
        </div>

        {/* Conversation Thread */}
        <div
          className="p-4 rounded-xl border space-y-3 max-h-[420px] overflow-y-auto mb-3"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl border max-w-xl ${
                m.sender === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
              style={{
                background: m.sender === 'user' ? 'var(--primary)' : 'var(--surface)',
                color: m.sender === 'user' ? '#ffffff' : 'var(--text)',
                borderColor: m.sender === 'user' ? 'var(--primary)' : 'var(--border)'
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-extrabold uppercase opacity-80">
                  {m.sender === 'user' ? '🧑‍💻 Ty (English Spec)' : '🐓 Vibe-Kurak Mentor'}
                </span>
                <button
                  type="button"
                  onClick={() => speakEn(m.textEn, 1.0)}
                  className="px-2 py-0.5 rounded text-[11px] font-bold border cursor-pointer"
                  style={{
                    background: m.sender === 'user' ? 'rgba(255,255,255,0.2)' : 'var(--surface-2)',
                    color: 'inherit',
                    borderColor: 'currentColor'
                  }}
                >
                  🔊 EN
                </button>
              </div>
              <div className="font-bold text-sm">{m.textEn}</div>
              {m.hintPl && (
                <div className="text-xs mt-1.5 opacity-80">🇵🇱 {m.hintPl}</div>
              )}
              {m.scoreFeedback && (
                <div
                  className="text-xs font-extrabold mt-2 p-2 rounded-lg"
                  style={{ background: 'var(--good-bg)', color: 'var(--good)' }}
                >
                  {m.scoreFeedback}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Row */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={`Write your prompt or answer in English (e.g., "${topic.words[0].promptExample}")...`}
            className="flex-1 px-4 py-3 rounded-xl border font-bold text-sm"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
          <button
            type="button"
            onClick={() => handleSend()}
            className="px-5 py-3 rounded-xl font-extrabold text-white text-sm cursor-pointer shrink-0"
            style={{ background: 'var(--primary)' }}
          >
            Wyślij EN ▶
          </button>
        </div>
      </div>

      {/* Certifications Quick Reference Card if in Management */}
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h2 className="text-base font-extrabold mt-0 mb-2">
          🧭 Certyfikacje Managementu w Białym Kole (PMP, CAPM, PRINCE2, PSM, PSPO, SAFe)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.id}
              onClick={() => handleTopicChange(c.topicId)}
              className="p-3.5 rounded-xl border cursor-pointer transition-all hover:border-blue-500"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm">
                  {c.emoji} {c.code} · {c.name}
                </span>
                <span className="text-[11px] font-bold" style={{ color: 'var(--primary)' }}>
                  Ćwicz ▶
                </span>
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                {c.org} · {c.descPl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
