import React, { useState } from 'react';
import {
  DOMAINS,
  TOPICS,
  topicsOfDomain,
  findTopic,
  findVideo,
  DomainKey,
  TOPIC_LESSON_TYPES
} from '../data/wheelTopics';
import {
  AppState,
  getTopicScore,
  speakEn,
  speakPl,
  GuideSays,
  playFeedbackChime
} from '../utils/speechAndStorage';
import { ExercisePlayer, buildExercisesForTopic } from './ExercisePlayer';

const C = 400;
const pt = (r: number, a: number): [number, number] => [
  C + r * Math.cos((a * Math.PI) / 180),
  C + r * Math.sin((a * Math.PI) / 180)
];

function sectorPath(r0: number, r1: number, a0: number, a1: number): string {
  const [x0, y0] = pt(r1, a0);
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r0, a1);
  const [x3, y3] = pt(r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x0},${y0} A${r1},${r1} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 ${large} 0 ${x3},${y3} Z`;
}

function arcPath(r: number, a0: number, a1: number): string {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  return `M${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1}`;
}

interface TopicWheelSectionProps {
  state: AppState;
  selectedTopicId: string | null;
  selectedVideoId: string | null;
  selectedLessonKey: string | null;
  onSelectTopic: (topicId: string | null) => void;
  onSelectVideo: (videoId: string | null) => void;
  onSelectLesson: (lessonKey: string | null) => void;
  onCompleteTopicLesson: (topicId: string, lessonKey: string, xpEarned: number) => void;
  onCompleteVideo: (topicId: string, videoId: string, xpEarned: number) => void;
  onJumpToChat: (topicId: string) => void;
}

export const TopicWheelSection: React.FC<TopicWheelSectionProps> = ({
  state,
  selectedTopicId,
  selectedVideoId,
  selectedLessonKey,
  onSelectTopic,
  onSelectVideo,
  onSelectLesson,
  onCompleteTopicLesson,
  onCompleteVideo,
  onJumpToChat
}) => {
  const [videoTab, setVideoTab] = useState<'watch' | 'exercises' | 'expand' | 'talk'>('watch');
  const [showPlTranscript, setShowPlTranscript] = useState<boolean>(true);
  const [vidQuizAnswers, setVidQuizAnswers] = useState<Record<number, number>>({});
  const [vidQuizSubmitted, setVidQuizSubmitted] = useState(false);

  // 1. Active Lesson Player inside Topic
  if (selectedTopicId && selectedLessonKey) {
    const topic = findTopic(selectedTopicId);
    if (!topic) return null;
    const lessonMeta = TOPIC_LESSON_TYPES.find((l) => l.key === selectedLessonKey) || TOPIC_LESSON_TYPES[0];
    const exs = buildExercisesForTopic(
      topic,
      selectedLessonKey as 'words' | 'sentences' | 'quiz' | 'test'
    );

    return (
      <ExercisePlayer
        title={`${topic.emoji} ${topic.titleEn} · ${lessonMeta.titlePl}`}
        subtitle={`${DOMAINS[topic.domain].namePl} · Level ${topic.level}`}
        exercises={exs}
        onCancel={() => onSelectLesson(null)}
        onFinish={(res) => {
          onCompleteTopicLesson(topic.id, selectedLessonKey, Math.max(15, res.correct * 10));
          onSelectLesson(null);
        }}
      />
    );
  }

  // 2. Active YouTube Video View (with 3-step method & exercises)
  if (selectedVideoId) {
    const found = findVideo(selectedVideoId);
    if (!found) {
      return (
        <div>
          <button
            type="button"
            onClick={() => onSelectVideo(null)}
            className="font-bold text-sm mb-3 cursor-pointer"
            style={{ color: 'var(--primary)' }}
          >
            ← Wróć do tarczy tematów
          </button>
          <p>Nie znaleziono materiału wideo.</p>
        </div>
      );
    }

    const { topic, video } = found;
    const dom = DOMAINS[topic.domain];
    const isWatched = Boolean(state.topics[topic.id]?.videos?.[video.id]);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setVidQuizAnswers({});
              setVidQuizSubmitted(false);
              onSelectVideo(null);
              onSelectTopic(topic.id);
            }}
            className="font-extrabold text-sm cursor-pointer bg-transparent border-0 p-0"
            style={{ color: 'var(--primary)' }}
          >
            ← {topic.emoji} {topic.titleEn} ({topic.titlePl})
          </button>

          <span
            className="px-3 py-1 rounded-full text-xs font-extrabold"
            style={{
              background: topic.domain === 'M' ? '#f4f4f5' : dom.badgeBg,
              color: topic.domain === 'M' ? '#18181b' : '#ffffff',
              border: topic.domain === 'M' ? '1px solid #d4d4d8' : 'none'
            }}
          >
            {dom.icon} {dom.namePl} · {topic.short} · {video.level}
          </span>
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-extrabold m-0">{video.title}</h1>
          <p className="text-xs mt-1 m-0" style={{ color: 'var(--muted)' }}>
            {video.channel} · {Math.floor(video.durationSec / 60)} min · Materiał w języku angielskim (English)
            {isWatched ? ' · ✅ Ukończono' : ''}
          </p>
        </div>

        {/* Responsive 16:9 YouTube Player */}
        <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black aspect-video border" style={{ borderColor: 'var(--border)' }}>
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${video.ytId}?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=en`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 4 Tabs matching LangEduDei Video View */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'watch', label: '1️⃣ Oglądaj (3x) + Transkrypt EN' },
            { id: 'exercises', label: `🏋️ Ćwiczenia z filmu (${video.questions.length})` },
            { id: 'expand', label: '2️⃣ Rozwiń temat (Terminy & Prompty)' },
            { id: 'talk', label: '3️⃣ Rozmowa z Mentorem AI' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setVideoTab(tab.id as typeof videoTab)}
              className="px-3.5 py-2 rounded-xl font-extrabold text-xs md:text-sm border cursor-pointer transition-colors"
              style={{
                background: videoTab === tab.id ? 'var(--primary)' : 'var(--surface)',
                color: videoTab === tab.id ? '#ffffff' : 'var(--text)',
                borderColor: videoTab === tab.id ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Card */}
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          {videoTab === 'watch' && (
            <div className="space-y-4">
              <GuideSays
                en={`Watch this video on ${topic.titleEn} using the 3-Listen Method! First for general flow, second with the English transcript below, and third while repeating key phrases aloud.`}
                pl={video.summaryPl}
                mood="talk"
              />

              <div className="p-3.5 rounded-xl border" style={{ background: 'var(--tip-bg)', borderColor: 'var(--border)' }}>
                <div className="font-extrabold text-sm mb-1">🎧 Metoda 3 odsłuchów materiału anglojęzycznego:</div>
                <ol className="text-xs space-y-1 m-0 pl-5" style={{ color: 'var(--text)' }}>
                  <li><strong>Odsłuch 1 (Bez napisów PL):</strong> Złap główny kontekst techniczny i architekturę.</li>
                  <li><strong>Odsłuch 2 (Z transkryptem EN poniżej):</strong> Klikaj linie transkryptu, aby odsłuchać wymowę kluczowych zdań po angielsku.</li>
                  <li><strong>Odsłuch 3 (Ćwiczenia):</strong> Przejdź do zakładki „🏋️ Ćwiczenia z filmu” i sprawdź zrozumienie materiału po angielsku.</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <h3 className="text-base font-extrabold m-0">📜 Interactive English Transcript (Kliknij, aby odsłuchać)</h3>
                  <button
                    type="button"
                    onClick={() => setShowPlTranscript((s) => !s)}
                    className="px-3 py-1 rounded-lg text-xs font-bold border cursor-pointer"
                    style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                  >
                    {showPlTranscript ? 'Ukryj pomoc PL' : 'Pokaż pomoc PL'}
                  </button>
                </div>

                <div className="space-y-2">
                  {video.transcript.map((line, i) => (
                    <div
                      key={i}
                      onClick={() => speakEn(line.en, 1.0)}
                      className="p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors hover:opacity-95"
                      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <span className="mono text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--surface)', color: 'var(--primary)' }}>
                        {line.timeLabel}
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{line.en}</div>
                        {showPlTranscript && (
                          <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                            🇵🇱 {line.pl}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEn(line.en, 0.75);
                        }}
                        className="px-2 py-1 rounded text-xs font-bold border cursor-pointer"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                        title="Odsłuchaj wolniej (0.75x)"
                      >
                        🐢 0.75x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold mb-2">🔑 Key English Phrases from the Video</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {video.phrases.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border flex flex-col justify-between gap-2"
                      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <div>
                        <div className="font-extrabold text-sm">{p.en}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                          {p.pl}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakEn(p.en, 1.0)}
                        className="self-start px-2.5 py-1 rounded-lg text-xs font-bold text-white cursor-pointer"
                        style={{ background: 'var(--primary)' }}
                      >
                        🔊 Listen in English
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setVideoTab('exercises')}
                  className="px-5 py-2.5 rounded-xl font-extrabold text-white text-sm cursor-pointer"
                  style={{ background: 'var(--primary)' }}
                >
                  🏋️ Przejdź do ćwiczeń z filmu ({video.questions.length}) ▶
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onCompleteVideo(topic.id, video.id, 25);
                    playFeedbackChime('win');
                  }}
                  className="px-4 py-2.5 rounded-xl font-bold text-sm border cursor-pointer"
                  style={{
                    background: isWatched ? 'var(--good-bg)' : 'var(--surface-2)',
                    borderColor: isWatched ? 'var(--good)' : 'var(--border)',
                    color: isWatched ? 'var(--good)' : 'var(--text)'
                  }}
                >
                  {isWatched ? '✅ Obejrzane (+25 XP)' : '✓ Oznacz film jako obejrzany'}
                </button>
              </div>
            </div>
          )}

          {videoTab === 'exercises' && (
            <div className="space-y-4">
              <GuideSays
                en="Let's verify your comprehension of this English video! Answer the questions below in English."
                pl="Sprawdźmy zrozumienie anglojęzycznego materiału wideo! Odpowiedz na poniższe pytania po angielsku."
                mood="happy"
              />

              {video.questions.map((q, qIdx) => {
                const picked = vidQuizAnswers[qIdx];
                return (
                  <div
                    key={qIdx}
                    className="p-4 rounded-xl border space-y-2.5"
                    style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-extrabold text-sm md:text-base m-0">
                        {qIdx + 1}. {q.q}
                      </h4>
                      <button
                        type="button"
                        onClick={() => speakEn(q.q, 1.0)}
                        className="px-2 py-1 rounded text-xs font-bold border shrink-0 cursor-pointer"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                      >
                        🔊
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSel = picked === oIdx;
                        const isRight = vidQuizSubmitted && oIdx === q.answer;
                        const isWrong = vidQuizSubmitted && isSel && oIdx !== q.answer;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={vidQuizSubmitted}
                            onClick={() => {
                              setVidQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                              speakEn(opt, 1.0);
                            }}
                            className="p-3 rounded-xl border-2 text-left font-bold text-xs md:text-sm cursor-pointer transition-all"
                            style={{
                              background: isRight
                                ? 'var(--good-bg)'
                                : isWrong
                                ? 'var(--bad-bg)'
                                : isSel
                                ? 'var(--tip-bg)'
                                : 'var(--surface)',
                              borderColor: isRight
                                ? 'var(--good)'
                                : isWrong
                                ? 'var(--bad)'
                                : isSel
                                ? 'var(--primary)'
                                : 'var(--border)'
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {vidQuizSubmitted && (
                      <div className="text-xs font-bold pt-1" style={{ color: picked === q.answer ? 'var(--good)' : 'var(--bad)' }}>
                        💡 {q.explanationEn}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-wrap gap-2">
                {!vidQuizSubmitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      setVidQuizSubmitted(true);
                      onCompleteVideo(topic.id, video.id, 35);
                      playFeedbackChime('win');
                    }}
                    className="px-6 py-2.5 rounded-xl font-extrabold text-white text-sm cursor-pointer"
                    style={{ background: 'var(--primary)' }}
                  >
                    ✅ Sprawdź odpowiedzi i odbierz +35 XP
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setVidQuizAnswers({});
                      setVidQuizSubmitted(false);
                      setVideoTab('expand');
                    }}
                    className="px-6 py-2.5 rounded-xl font-extrabold text-white text-sm cursor-pointer"
                    style={{ background: 'var(--good)' }}
                  >
                    2️⃣ Przejdź do rozwinięcia tematu ▶
                  </button>
                )}
              </div>
            </div>
          )}

          {videoTab === 'expand' && (
            <div className="space-y-4">
              <GuideSays
                en={`Let's go deeper into ${topic.titleEn}! Click any card below to hear the English term and its Vibe Coding prompt example.`}
                pl={`Rozwińmy temat „${topic.titleEn}” (${topic.titlePl}). Kliknij dowolny kafelek, aby usłyszeć angielski termin oraz gotowy wzorzec promptu.`}
                mood="proud"
              />

              <h3 className="text-base font-extrabold m-0">{topic.emoji} English Terms & Prompt Patterns</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {topic.words.map((w, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => speakEn(`${w.en}. ${w.promptExample}`, 1.0)}
                    className="p-3.5 rounded-xl border text-left flex flex-col gap-1 cursor-pointer transition-all hover:border-blue-500"
                    style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{w.emoji}</span>
                      <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>🔊 EN</span>
                    </div>
                    <strong className="text-sm font-extrabold">{w.en}</strong>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{w.pl}</span>
                    <code className="text-xs mt-1 p-1.5 rounded block" style={{ background: 'var(--surface)' }}>
                      “{w.promptExample}”
                    </code>
                  </button>
                ))}
              </div>

              <h3 className="text-base font-extrabold m-0 pt-2">🧱 English Workflow Specifications – Listen & Repeat</h3>
              <div className="space-y-2">
                {topic.sentences.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border flex items-center justify-between gap-3 flex-wrap"
                    style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-start gap-2.5 flex-1">
                      <span className="text-xl">{s.emoji}</span>
                      <div>
                        <div className="font-bold text-sm">{s.en}</div>
                        <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.pl}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => speakEn(s.en, 1.0)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-white cursor-pointer"
                        style={{ background: 'var(--primary)' }}
                      >
                        🔊 EN
                      </button>
                      <button
                        type="button"
                        onClick={() => speakEn(s.en, 0.72)}
                        className="px-2 py-1 rounded-lg text-xs font-bold border cursor-pointer"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                      >
                        🐢
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectVideo(null);
                    onSelectTopic(topic.id);
                    onSelectLesson('quiz');
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-sm border cursor-pointer"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                >
                  ❓ Quiz wiedzy tematu
                </button>
                <button
                  type="button"
                  onClick={() => setVideoTab('talk')}
                  className="px-5 py-2 rounded-xl font-extrabold text-white text-sm cursor-pointer"
                  style={{ background: 'var(--primary)' }}
                >
                  3️⃣ Rozmowa z Mentorem AI ▶
                </button>
              </div>
            </div>
          )}

          {videoTab === 'talk' && (
            <div className="space-y-4">
              <GuideSays
                en="Tell me what you learned from this video! How would you use these concepts in your next Vibe Coding project or Sprint?"
                pl="Opowiedz po angielsku, czego nauczyłeś się z filmu i jak zastosujesz te koncepcje w swoim kolejnym projekcie Vibe Codingu lub Sprincie!"
                mood="talk"
              />

              <div>
                <h3 className="text-base font-extrabold mb-2">💬 English Discussion Prompts for This Video</h3>
                <ul className="space-y-2 m-0 pl-0 list-none">
                  {video.discussionEn.map((q, i) => (
                    <li
                      key={i}
                      className="p-3 rounded-xl border flex items-center justify-between gap-2"
                      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <span className="font-bold text-sm">{q}</span>
                      <button
                        type="button"
                        onClick={() => speakEn(q, 1.0)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold border shrink-0 cursor-pointer"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                      >
                        🔊 EN
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onCompleteVideo(topic.id, video.id, 25);
                    onJumpToChat(topic.id);
                  }}
                  className="px-6 py-3 rounded-xl font-extrabold text-white text-sm cursor-pointer"
                  style={{ background: 'var(--primary)' }}
                >
                  💬 Rozmawiaj po angielsku z Mentorem AI o tym temacie ▶
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Selected Topic View (4 Lesson Nodes + AI Chat Node + 3 YouTube Videos + Vocabulary)
  if (selectedTopicId) {
    const t = findTopic(selectedTopicId);
    if (!t) return null;
    const dom = DOMAINS[t.domain];
    const tProg = state.topics[t.id] || { lessons: {}, videos: {} };

    const heroBg =
      t.domain === 'R'
        ? 'linear-gradient(135deg, #b91c1c, #ef4444)'
        : t.domain === 'G'
        ? 'linear-gradient(135deg, #15803d, #22c55e)'
        : t.domain === 'B'
        ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)'
        : '#ffffff';
    const heroText = t.domain === 'M' ? '#18181b' : '#ffffff';

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => onSelectTopic(null)}
          className="font-extrabold text-sm cursor-pointer bg-transparent border-0 p-0"
          style={{ color: 'var(--primary)' }}
        >
          ← Wróć do Tarczy 48 Tematów (Koło Vibe Codingu)
        </button>

        {/* Topic Hero matching LangEduDei */}
        <header
          className="p-5 rounded-2xl flex items-center gap-4 flex-wrap border-2"
          style={{
            background: heroBg,
            color: heroText,
            borderColor: t.domain === 'M' ? '#d4d4d8' : 'transparent',
            boxShadow: 'var(--shadow)'
          }}
        >
          <div className="text-5xl shrink-0">{t.emoji}</div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs font-extrabold uppercase tracking-wider opacity-90">
              {dom.icon} {dom.namePl} · {dom.nameEn}
            </div>
            <h1 className="text-2xl font-extrabold my-0.5">{t.titleEn}</h1>
            <div className="flex items-center gap-2 flex-wrap text-sm font-bold opacity-95">
              <span>🇵🇱 {t.titlePl}</span>
              <button
                type="button"
                onClick={() => speakEn(t.titleEn, 1.0)}
                className="px-2 py-0.5 rounded text-xs font-extrabold cursor-pointer border"
                style={{
                  background: t.domain === 'M' ? '#f4f4f5' : 'rgba(255,255,255,0.2)',
                  color: heroText,
                  borderColor: 'currentColor'
                }}
              >
                🔊 Listen EN
              </button>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-extrabold"
                style={{ background: '#f97316', color: '#ffffff' }}
              >
                Poziom {t.level}
              </span>
            </div>
          </div>
        </header>

        {/* 5 Circular Lesson Nodes like LangEduDei */}
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          <h2 className="text-base font-extrabold mt-0 mb-3">
            🎯 Interaktywne ćwiczenia tematu (All exercises in English)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 justify-items-center">
            {TOPIC_LESSON_TYPES.map((lt) => {
              const isDone = Boolean(tProg.lessons?.[lt.key]);
              return (
                <button
                  key={lt.key}
                  type="button"
                  onClick={() => onSelectLesson(lt.key)}
                  className="flex flex-col items-center gap-1.5 text-center cursor-pointer bg-transparent border-0 group"
                >
                  <div
                    className="w-15 h-15 rounded-full flex items-center justify-center text-2xl text-white transition-transform group-hover:-translate-y-1"
                    style={{
                      background: isDone ? 'var(--good)' : lt.key === 'test' ? 'var(--accent)' : 'var(--primary)',
                      boxShadow: '0 4px 0 rgba(0,0,0,0.18)'
                    }}
                  >
                    {isDone ? '✅' : lt.icon}
                  </div>
                  <div className="text-xs font-extrabold" style={{ color: 'var(--text)' }}>
                    {lt.titlePl}
                  </div>
                  <div className="text-[11px]" style={{ color: 'var(--muted)' }}>
                    {lt.titleEn}
                  </div>
                </button>
              );
            })}

            {/* 5th Node: AI Mentor Conversation */}
            <button
              type="button"
              onClick={() => onJumpToChat(t.id)}
              className="flex flex-col items-center gap-1.5 text-center cursor-pointer bg-transparent border-0 group"
            >
              <div
                className="w-15 h-15 rounded-full flex items-center justify-center text-2xl text-white transition-transform group-hover:-translate-y-1"
                style={{
                  background: '#7c3aed',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.18)'
                }}
              >
                💬
              </div>
              <div className="text-xs font-extrabold" style={{ color: 'var(--text)' }}>
                Mentor AI (EN)
              </div>
              <div className="text-[11px]" style={{ color: 'var(--muted)' }}>
                Practice Prompting
              </div>
            </button>
          </div>
        </div>

        {/* 3 English YouTube Videos with Exercises */}
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
            <div>
              <h2 className="text-base font-extrabold m-0">
                🎬 Materiały wideo z YouTube po angielsku + ćwiczenia ({t.videos.length})
              </h2>
              <p className="text-xs m-0 mt-0.5" style={{ color: 'var(--muted)' }}>
                Kliknij film, aby otworzyć odtwarzacz z interaktywnym angielskim transkryptem, słownictwem i quizem zrozumienia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {t.videos.map((v, vIdx) => {
              const watched = Boolean(tProg.videos?.[v.id]);
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVideoTab('watch');
                    onSelectVideo(v.id);
                  }}
                  className="rounded-xl border overflow-hidden text-left flex flex-col cursor-pointer transition-all hover:border-blue-500 p-0"
                  style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                >
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <img
                      src={`https://i.ytimg.com/vi/${v.ytId}/hqdefault.jpg`}
                      alt={v.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-extrabold bg-black/80 text-white">
                      #{vIdx + 1} · EN
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[11px] font-extrabold bg-black/80 text-white mono">
                      {Math.floor(v.durationSec / 60)} min
                    </span>
                    {watched && (
                      <span
                        className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[11px] font-extrabold text-white"
                        style={{ background: 'var(--good)' }}
                      >
                        ✓ Obejrzane
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between gap-2">
                    <div className="font-extrabold text-sm leading-snug" style={{ color: 'var(--text)' }}>
                      {v.title}
                    </div>
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
                      <span>{v.channel}</span>
                      <span className="font-bold" style={{ color: 'var(--primary)' }}>
                        Oglądaj + Ćwicz ▶
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Key English Vocabulary & Prompt Templates for this Topic */}
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          <h2 className="text-base font-extrabold mt-0 mb-3">
            🧩 Kluczowe pojęcia i gotowe prompty po angielsku ({t.words.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.words.map((w, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border flex flex-col gap-1.5"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{w.emoji}</span>
                    <div>
                      <div className="font-extrabold text-sm">{w.en}</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>
                        🇵🇱 {w.pl}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => speakEn(`${w.en}. ${w.promptExample}`, 1.0)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white cursor-pointer"
                      style={{ background: 'var(--primary)' }}
                    >
                      🔊 EN
                    </button>
                    <button
                      type="button"
                      onClick={() => speakPl(w.pl)}
                      className="px-2 py-1 rounded-lg text-xs font-bold border cursor-pointer"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      🇵🇱
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => speakEn(w.promptExample, 1.0)}
                  className="text-xs p-2 rounded-lg border cursor-pointer font-mono"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  💬 Prompt: “{w.promptExample}”
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* English Workflow Sentences */}
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          <h2 className="text-base font-extrabold mt-0 mb-3">
            🧱 Praktyczne instrukcje i zasady po angielsku (Listen & Shadow)
          </h2>
          <div className="space-y-2.5">
            {t.sentences.map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border flex items-center justify-between gap-3 flex-wrap"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <div className="font-extrabold text-sm">{s.en}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      🇵🇱 {s.pl}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => speakEn(s.en, 1.0)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer"
                    style={{ background: 'var(--primary)' }}
                  >
                    🔊 1.0x
                  </button>
                  <button
                    type="button"
                    onClick={() => speakEn(s.en, 0.72)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    🐢 0.75x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. Default View: Full 48-Topic SVG Wheel (3 Outer Sectors: Red/Green/Blue + 4th White Center: Management & Certs)
  const totalVisited = TOPICS.filter((t) => getTopicScore(state, t.id) > 0).length;
  const starts: Record<'R' | 'G' | 'B', number> = { R: -150, G: -30, B: 90 };
  const outerDomains: ('R' | 'G' | 'B')[] = ['R', 'G', 'B'];
  const mgmtTopics = topicsOfDomain('M');

  return (
    <div className="space-y-5">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold m-0">
              🎯 Tarcza tematów Vibe Codingu + Filmy z YouTube (48 obszarów)
            </h1>
            <p className="text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
              3 dziedziny zewnętrzne po 12 obszarów (<strong style={{ color: '#dc2626' }}>Czerwona – Programowanie</strong>,{' '}
              <strong style={{ color: '#16a34a' }}>Zielona – Grafika i Multimedia</strong>,{' '}
              <strong style={{ color: '#2563eb' }}>Niebieska – E-Marketing</strong>) +{' '}
              <strong>12 obszarów w białym kole środkowym (Management: PM, PO, Scrum Master, Product Manager i Certyfikacje)</strong>.
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl border text-right shrink-0" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-lg font-extrabold mono">{totalVisited}/48</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Aktywne obszary</div>
          </div>
        </div>

        <GuideSays
          en="Click any slice of the Vibe Coding Wheel! Every single area includes English terminology, prompt templates, interactive quizzes, and 3 YouTube videos in English."
          pl="Kliknij dowolny wycinek tarczy! Każdy z 48 obszarów zawiera angielskie słownictwo, wzorce promptów, quizy oraz 3 anglojęzyczne filmy z YouTube z ćwiczeniami."
          mood="happy"
        />

        {/* Interactive 800x800 SVG Wheel matching LangEduDei */}
        <div className="wheel-wrap mt-2">
          <svg
            viewBox="0 0 800 800"
            className="wheel"
            role="img"
            aria-label="Tarcza 48 tematów Vibe Codingu: Programowanie (Czerwony), Grafika i Multimedia (Zielony), E-Marketing (Niebieski) oraz Management i Certyfikacje (Biały środek)"
          >
            {outerDomains.map((dKey) => {
              const dom = DOMAINS[dKey];
              const a0 = starts[dKey];
              const pid = `arc-${dKey}`;
              const mid = a0 + 60;
              const bottom = mid > 0 && mid < 180;
              const arcD = bottom
                ? `M${pt(375, a0 + 115).join(',')} A375,375 0 0 0 ${pt(375, a0 + 5).join(',')}`
                : arcPath(375, a0 + 5, a0 + 115);

              const domTopics = topicsOfDomain(dKey);

              return (
                <g key={dKey}>
                  {/* Outer Domain Name Band */}
                  <path
                    d={sectorPath(352, 398, a0 + 0.6, a0 + 119.4)}
                    fill={dom.colors[0]}
                    className="band"
                  />
                  <path id={pid} d={arcD} fill="none" />
                  <text className="band-text" dominantBaseline="middle">
                    <textPath href={`#${pid}`} startOffset="50%" textAnchor="middle">
                      {`${dom.icon} ${dom.namePl.toUpperCase()} · ${dom.nameEn.toUpperCase()}`}
                    </textPath>
                  </text>

                  {/* 12 Radial Topic Slices per Outer Domain */}
                  {domTopics.map((t, i) => {
                    const b0 = a0 + i * 10;
                    const doneScore = getTopicScore(state, t.id);
                    const [ex, ey] = pt(302, b0 + 5);
                    const ang = b0 + 5;
                    const flip = ang > 90 && ang < 270;
                    const [tx, ty] = pt(232, ang);
                    const [dx, dy] = pt(338, b0 + 5);

                    return (
                      <g
                        key={t.id}
                        className="seg"
                        onClick={() => onSelectTopic(t.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') onSelectTopic(t.id);
                        }}
                      >
                        <title>{`${t.titleEn} · ${t.titlePl} (${dom.namePl})`}</title>
                        <path
                          d={sectorPath(176, 350, b0 + 0.4, b0 + 9.6)}
                          fill={dom.colors[i % 2]}
                          className={`seg-path ${doneScore ? 'has-progress' : ''}`}
                        />
                        <text
                          x={ex}
                          y={ey}
                          className="seg-emoji"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {t.emoji}
                        </text>
                        <text
                          x={tx}
                          y={ty}
                          className="seg-label"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${flip ? ang + 180 : ang} ${tx} ${ty})`}
                        >
                          {t.short}
                        </text>
                        {doneScore > 0 && (
                          <circle cx={dx} cy={dy} r={7} className="seg-dot" />
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* 4th White Center Circle: Management, Agile & Certifications (12 slices) */}
            <circle cx={C} cy={C} r={172} className="life-circle" />
            {mgmtTopics.map((t, i) => {
              const a0 = -90 + i * 30;
              const doneScore = getTopicScore(state, t.id);
              const [ex, ey] = pt(132, a0 + 15);
              const ang = a0 + 15;
              const flip = ang > 90 && ang < 270;
              const [lx, ly] = pt(92, ang);
              const [dx, dy] = pt(158, a0 + 15);

              return (
                <g
                  key={t.id}
                  className="seg life"
                  onClick={() => onSelectTopic(t.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelectTopic(t.id);
                  }}
                >
                  <title>{`${t.titleEn} · ${t.titlePl} (Management & Certyfikacje)`}</title>
                  <path
                    d={sectorPath(62, 168, a0 + 1, a0 + 29)}
                    className={`life-seg ${doneScore ? 'has-progress' : ''}`}
                  />
                  <text
                    x={ex}
                    y={ey}
                    className="seg-emoji life-emoji"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {t.emoji}
                  </text>
                  <text
                    x={lx}
                    y={ly}
                    className="life-label"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${flip ? ang + 180 : ang} ${lx} ${ly})`}
                  >
                    {t.short}
                  </text>
                  {doneScore > 0 && (
                    <circle cx={dx} cy={dy} r={6} className="seg-dot" />
                  )}
                </g>
              );
            })}

            {/* Center White Hub Core */}
            <circle cx={C} cy={C} r={60} className="life-core" />
            <text x={C} y={C - 12} className="core-text" textAnchor="middle">
              Management
            </text>
            <text x={C} y={C + 5} className="core-text" textAnchor="middle">
              &amp; Certs
            </text>
            <text x={C} y={C + 22} className="core-subtext" textAnchor="middle">
              PM · PO · SM
            </text>
          </svg>

          {/* Wheel Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm font-extrabold">
            {(['R', 'G', 'B', 'M'] as DomainKey[]).map((dKey) => {
              const dom = DOMAINS[dKey];
              return (
                <span key={dKey} className="inline-flex items-center gap-2">
                  <i
                    className="w-4 h-4 rounded-full inline-block border"
                    style={{
                      background: dKey === 'M' ? '#ffffff' : dom.colors[0],
                      borderColor: dKey === 'M' ? '#71717a' : dom.colors[0]
                    }}
                  />
                  <span>
                    {dom.icon} {dom.namePl} ({dom.nameEn})
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Domain Cards Below the Wheel with all 48 Clickable Topic Chips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(['R', 'G', 'B', 'M'] as DomainKey[]).map((dKey) => {
          const dom = DOMAINS[dKey];
          const list = topicsOfDomain(dKey);
          return (
            <div
              key={dKey}
              className="p-5 rounded-2xl border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                borderTopWidth: '6px',
                borderTopColor: dom.borderHex,
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="mb-3">
                <h2 className="text-lg font-extrabold m-0">
                  {dom.icon} {dom.namePl}{' '}
                  <span className="text-sm font-bold" style={{ color: 'var(--muted)' }}>
                    · {dom.nameEn}
                  </span>
                </h2>
                <p className="text-xs mt-1 mb-0" style={{ color: 'var(--muted)' }}>
                  {dom.descriptionPl}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {list.map((t) => {
                  const sc = getTopicScore(state, t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onSelectTopic(t.id)}
                      className="p-2.5 rounded-xl border text-left flex items-center gap-2.5 cursor-pointer transition-all hover:border-blue-500"
                      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <span className="text-xl shrink-0">{t.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-xs truncate" style={{ color: 'var(--text)' }}>
                          {t.titleEn}
                        </div>
                        <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>
                          {t.titlePl}
                        </div>
                      </div>
                      {sc > 0 ? (
                        <span className="text-xs font-extrabold mono shrink-0" style={{ color: 'var(--good)' }}>
                          ✓{sc}
                        </span>
                      ) : (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-extrabold shrink-0"
                          style={{ background: 'var(--surface)', color: 'var(--muted)' }}
                        >
                          {t.level}
                        </span>
                      )}
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
