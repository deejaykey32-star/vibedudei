import React, { useState, useEffect } from 'react';
import {
  DOMAINS,
  TOPICS,
  findTopic,
  DomainKey
} from '../data/wheelTopics';
import {
  GRAMMAR_TOPICS,
  POLYSEMY_WORDS,
  STORIES,
  CERTIFICATIONS,
  COURSE_LEVELS,
  VibeLevel
} from '../data/courseData';
import {
  AppState,
  speakEn,
  speakPl,
  GuideSays,
  playFeedbackChime
} from '../utils/speechAndStorage';

// ==================== 6. SHADOWING SECTION (VOICE PROMPT SHADOWING) ====================

export const ShadowingSection: React.FC<{
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ onAwardXp }) => {
  const [domainFilter, setDomainFilter] = useState<DomainKey | 'ALL'>('ALL');
  const [practicedMap, setPracticedMap] = useState<Record<string, boolean>>({});

  const pool = TOPICS.filter((t) => domainFilter === 'ALL' || t.domain === domainFilter).slice(0, 12);

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          🗣️ Shadowing (Powtarzaj na głos angielskie prompty i specyfikacje)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          W Vibe Codingu i pracy międzynarodowej (Daily Scrum, Refinement, Voice Coding) kluczowa jest płynność mówienia po angielsku. Odsłuchaj zdanie i powtórz je głośno w tym samym rytmie!
        </p>

        <GuideSays
          en="Shadowing trains your voice for real-time Voice Coding and international Scrum standups. Listen at 1.0x or 0.75x and repeat out loud!"
          pl="Kliknij 🔊 1.0x lub 🐢 0.75x, powtórz zdanie na głos po angielsku, a następnie kliknij „Powtórzone (+10 XP)”."
          mood="talk"
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {(['ALL', 'R', 'G', 'B', 'M'] as const).map((dk) => (
            <button
              key={dk}
              type="button"
              onClick={() => setDomainFilter(dk)}
              className="px-3.5 py-1.5 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{
                background: domainFilter === dk ? 'var(--primary)' : 'var(--surface-2)',
                color: domainFilter === dk ? '#ffffff' : 'var(--text)',
                borderColor: domainFilter === dk ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {dk === 'ALL' ? '🌐 Wszystkie dziedziny' : `${DOMAINS[dk].icon} ${DOMAINS[dk].namePl}`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {pool.flatMap((t) =>
          t.sentences.slice(0, 2).map((s, sIdx) => {
            const key = `${t.id}-sh-${sIdx}`;
            const isDone = Boolean(practicedMap[key]);
            return (
              <div
                key={key}
                className="p-4 rounded-2xl border flex items-center justify-between gap-3 flex-wrap"
                style={{
                  background: isDone ? 'var(--good-bg)' : 'var(--surface)',
                  borderColor: isDone ? 'var(--good)' : 'var(--border)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-[220px]">
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <div className="text-[11px] font-extrabold uppercase" style={{ color: 'var(--muted)' }}>
                      {DOMAINS[t.domain].icon} {t.titleEn} · {t.level}
                    </div>
                    <div className="font-extrabold text-sm md:text-base mt-0.5">{s.en}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      🇵🇱 {s.pl}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => speakEn(s.en, 1.0)}
                    className="px-3 py-1.5 rounded-xl font-bold text-xs text-white cursor-pointer"
                    style={{ background: 'var(--primary)' }}
                  >
                    🔊 1.0x
                  </button>
                  <button
                    type="button"
                    onClick={() => speakEn(s.en, 0.72)}
                    className="px-2.5 py-1.5 rounded-xl font-bold text-xs border cursor-pointer"
                    style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                  >
                    🐢 0.75x
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isDone) {
                        setPracticedMap((p) => ({ ...p, [key]: true }));
                        playFeedbackChime('good');
                        onAwardXp(10, 1);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl font-extrabold text-xs border cursor-pointer"
                    style={{
                      background: isDone ? 'var(--good)' : 'var(--surface-2)',
                      color: isDone ? '#ffffff' : 'var(--text)',
                      borderColor: isDone ? 'var(--good)' : 'var(--border)'
                    }}
                  >
                    {isDone ? '✅ Powtórzone' : '🎙️ Powtórzone (+10 XP)'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ==================== 7. SAME TOPIC / ITERATIVE SPEC SECTION (TEN SAM TEMAT) ====================

export const SameTopicSection: React.FC<{
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ onAwardXp }) => {
  const [selectedTopicId, setSelectedTopicId] = useState('r2');
  const [iteration, setIteration] = useState<1 | 2 | 3>(1);
  const [drafts, setDrafts] = useState<Record<number, string>>({ 1: '', 2: '', 3: '' });
  const [savedNotice, setSavedNotice] = useState(false);

  const topic = findTopic(selectedTopicId) || TOPICS[0];

  const iterationGuides = {
    1: {
      badge: 'Iteracja 1 · Poziom V1 (Szybki szkic idei po angielsku – 60 sek)',
      promptHint: `Write a simple 1–2 sentence English request about ${topic.titleEn} using "${topic.words[0].en}".`,
      example: topic.words[0].promptExample
    },
    2: {
      badge: 'Iteracja 2 · Poziom V3 (Strukturalne User Story + Given/When/Then)',
      promptHint: `Expand the same idea into a structured specification with "${topic.words[1].en}" and verifiable acceptance criteria.`,
      example: `As a user, I want ${topic.words[0].en} so that I achieve ${topic.words[1].en}. ${topic.sentences[0].en}`
    },
    3: {
      badge: 'Iteracja 3 · Poziom V6 (Architektura produkcyjna, ograniczenia i metryki)',
      promptHint: `Now write the Principal-level specification covering edge cases, security/quality constraints, and "${topic.words[2].en}".`,
      example: `${topic.sentences[0].en} ${topic.sentences[1].en} Enforce ${topic.words[2].en}.`
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold m-0">
              🔁 Ten sam temat – 3 iteracje specyfikacji (Iterative Prompting)
            </h1>
            <p className="text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
              Metoda „Same Topic” z LangEduDei przeniesiona do Vibe Codingu: opisz po angielsku ten sam problem 3 razy — od prostego promptu V1, przez User Story V3, aż po architekturę V6!
            </p>
          </div>
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="px-3 py-2 rounded-xl border font-bold text-xs md:text-sm"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {DOMAINS[t.domain].icon} {t.titleEn}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 my-3">
          {([1, 2, 3] as const).map((it) => (
            <button
              key={it}
              type="button"
              onClick={() => setIteration(it)}
              className="px-4 py-2 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{
                background: iteration === it ? 'var(--primary)' : 'var(--surface-2)',
                color: iteration === it ? '#ffffff' : 'var(--text)',
                borderColor: iteration === it ? 'var(--primary)' : 'var(--border)'
              }}
            >
              Iteracja {it} {drafts[it]?.trim() ? '✅' : ''}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div className="font-extrabold text-sm" style={{ color: 'var(--primary)' }}>
            {iterationGuides[iteration].badge}
          </div>
          <div className="text-xs font-bold">{iterationGuides[iteration].promptHint}</div>
          <div className="p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between gap-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <span>Wzór EN: “{iterationGuides[iteration].example}”</span>
            <button
              type="button"
              onClick={() => speakEn(iterationGuides[iteration].example, 1.0)}
              className="px-2 py-1 rounded text-xs font-bold text-white shrink-0 cursor-pointer"
              style={{ background: 'var(--primary)' }}
            >
              🔊 EN
            </button>
          </div>

          <textarea
            rows={4}
            value={drafts[iteration]}
            onChange={(e) => setDrafts((d) => ({ ...d, [iteration]: e.target.value }))}
            placeholder="Write or paste your English iteration here..."
            className="w-full p-3 rounded-xl border font-bold text-sm"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDrafts((d) => ({ ...d, [iteration]: iterationGuides[iteration].example }))}
              className="px-3 py-1.5 rounded-xl font-bold text-xs border cursor-pointer"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              ✨ Wstaw wzorcowy tekst EN
            </button>
            <button
              type="button"
              onClick={() => {
                playFeedbackChime('good');
                onAwardXp(20, 3);
                setSavedNotice(true);
                setTimeout(() => setSavedNotice(false), 2500);
                if (iteration < 3) setIteration((iteration + 1) as 1 | 2 | 3);
              }}
              className="px-5 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
              style={{ background: 'var(--good)' }}
            >
              Zapisz iterację {iteration} (+20 XP) ▶
            </button>
          </div>
          {savedNotice && (
            <div className="text-xs font-extrabold" style={{ color: 'var(--good)' }}>
              ✅ Iteracja zapisana! Twoje słownictwo techniczne po angielsku rośnie z każdym powtórzeniem.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== 8. THREE LISTEN RULE SECTION (ZASADA 3 ODSŁUCHÓW) ====================

export const ThreeListenSection: React.FC<{
  onOpenVideo: (topicId: string, videoId: string) => void;
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ onOpenVideo, onAwardXp }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTopicId, setSelectedTopicId] = useState('m3');
  const topic = findTopic(selectedTopicId) || TOPICS[0];
  const vid = topic.videos[0];

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold m-0">
              🎧 Zasada 3 odsłuchów (The 3-Listen Method for Tech English)
            </h1>
            <p className="text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
              Jak rozumieć w 100% anglojęzyczne wykłady o programowaniu AI, designie, marketingu i Scrumie: 1) Bez napisów, 2) Z angielskim transkryptem, 3) Powtarzanie i quiz.
            </p>
          </div>
          <select
            value={selectedTopicId}
            onChange={(e) => {
              setSelectedTopicId(e.target.value);
              setStep(1);
            }}
            className="px-3 py-2 rounded-xl border font-bold text-xs md:text-sm"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {DOMAINS[t.domain].icon} {t.titleEn}
              </option>
            ))}
          </select>
        </div>

        {/* 3 Step Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-3">
          {[
            { n: 1 as const, title: '1️⃣ Odsłuch 1: Złap sens (Gist)', desc: 'Słuchaj wyłącznie po angielsku bez patrzenia w tłumaczenie.' },
            { n: 2 as const, title: '2️⃣ Odsłuch 2: Transkrypt EN + Terminy', desc: 'Śledź angielski tekst i sprawdź kluczowe zwroty.' },
            { n: 3 as const, title: '3️⃣ Odsłuch 3: Utarwalenie & Quiz', desc: 'Powtórz zdania na głos i rozwiąż test zrozumienia.' }
          ].map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => setStep(s.n)}
              className="p-3.5 rounded-xl border-2 text-left cursor-pointer"
              style={{
                background: step === s.n ? 'var(--tip-bg)' : 'var(--surface-2)',
                borderColor: step === s.n ? 'var(--primary)' : 'var(--border)'
              }}
            >
              <div className="font-extrabold text-sm">{s.title}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{s.desc}</div>
            </button>
          ))}
        </div>

        {/* Audio / Transcript Box */}
        <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="text-xs font-extrabold uppercase" style={{ color: 'var(--primary)' }}>
                Sesja audio/wideo: {vid.title}
              </div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>
                Kanał: {vid.channel} · Poziom {vid.level}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => speakEn(vid.transcript.map((l) => l.en).join(' '), 1.0)}
                className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                style={{ background: 'var(--primary)' }}
              >
                ▶ Odsłuchaj całe nagranie EN
              </button>
              <button
                type="button"
                onClick={() => onOpenVideo(topic.id, vid.id)}
                className="px-3.5 py-2 rounded-xl font-bold text-xs border cursor-pointer"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                🎬 Otwórz wideo YouTube
              </button>
            </div>
          </div>

          {step === 1 && (
            <div className="p-4 rounded-xl border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="font-bold text-sm m-0">
                🎧 Krok 1: Naciśnij „Odsłuchaj całe nagranie EN” powyżej i wsłuchaj się w angielskie słowa kluczowe bez podglądania tekstu!
              </p>
              <button
                type="button"
                onClick={() => {
                  playFeedbackChime('good');
                  setStep(2);
                }}
                className="mt-3 px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                style={{ background: 'var(--good)' }}
              >
                Gotowe → Pokaż angielski transkrypt (Krok 2)
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              {vid.transcript.map((line, i) => (
                <div
                  key={i}
                  onClick={() => speakEn(line.en, 1.0)}
                  className="p-3 rounded-xl border cursor-pointer"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <div className="font-extrabold text-sm">🔊 {line.en}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>🇵🇱 {line.pl}</div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  playFeedbackChime('good');
                  setStep(3);
                }}
                className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                style={{ background: 'var(--good)' }}
              >
                Przejdź do podsumowania (Krok 3) ▶
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border" style={{ background: 'var(--good-bg)', borderColor: 'var(--good)' }}>
                <div className="font-extrabold text-sm" style={{ color: 'var(--good)' }}>
                  🎉 Brawo! Ukończyłeś metodę 3 odsłuchów dla tematu „{topic.titleEn}”!
                </div>
                <p className="text-xs mt-1 mb-0">
                  Kluczowe zwroty z nagrania: {vid.phrases.map((p) => p.en).join(' · ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  playFeedbackChime('win');
                  onAwardXp(25, 5);
                  setStep(1);
                }}
                className="px-5 py-2.5 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                style={{ background: 'var(--primary)' }}
              >
                Odbierz +25 XP za sesję 3 odsłuchów 🏆
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== 9. SUPER SLOW 6 STEPS SECTION (SUPER SLOW – 6 KROKÓW) ====================

export const SuperSlowSection: React.FC<{
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ onAwardXp }) => {
  const [topicIdx, setTopicIdx] = useState(0);
  const [step, setStep] = useState(1);
  const [gapInput, setGapInput] = useState('');
  const topic = TOPICS[topicIdx % TOPICS.length];
  const targetWord = topic.words[0];
  const targetSent = topic.sentences[0];

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold m-0">
              🐢 Super Slow – 6 kroków głębokiego rozumienia specyfikacji EN
            </h1>
            <p className="text-sm mt-1 mb-0" style={{ color: 'var(--muted)' }}>
              Rozkładamy złożone angielskie instrukcje architektoniczne, marketingowe i certyfikacyjne (PMP/PRINCE2/Scrum) na 6 prostych kroków.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setTopicIdx((i) => i + 1);
              setStep(1);
              setGapInput('');
            }}
            className="px-3.5 py-2 rounded-xl font-bold text-xs border cursor-pointer"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
          >
            🔀 Następna specyfikacja ({topic.short})
          </button>
        </div>

        {/* 6 Steps Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-4">
          {[
            '1. Normal 1.0x',
            '2. Super Slow 0.7x',
            '3. Tekst EN + PL',
            '4. Terminy kluczowe',
            '5. Dyktando / Luka',
            '6. Powiedz na głos'
          ].map((label, idx) => {
            const sNum = idx + 1;
            return (
              <button
                key={sNum}
                type="button"
                onClick={() => setStep(sNum)}
                className="p-2 rounded-xl font-extrabold text-xs border cursor-pointer"
                style={{
                  background: step === sNum ? 'var(--primary)' : step > sNum ? 'var(--good-bg)' : 'var(--surface-2)',
                  color: step === sNum ? '#ffffff' : step > sNum ? 'var(--good)' : 'var(--text)',
                  borderColor: step === sNum ? 'var(--primary)' : 'var(--border)'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="p-5 rounded-xl border space-y-3" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div className="text-xs font-extrabold uppercase" style={{ color: 'var(--primary)' }}>
            {DOMAINS[topic.domain].icon} {topic.titleEn} · Krok {step}/6
          </div>

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-bold m-0">Krok 1: Odsłuchaj specyfikację w naturalnym tempie (1.0x):</p>
              <button
                type="button"
                onClick={() => speakEn(targetSent.en, 1.0)}
                className="px-5 py-3 rounded-xl font-extrabold text-sm text-white cursor-pointer"
                style={{ background: 'var(--primary)' }}
              >
                🔊 Odtwórz w tempie 1.0x
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm font-bold m-0">Krok 2: Odsłuchaj w trybie Super Slow (0.70x), zwracając uwagę na każde słowo:</p>
              <button
                type="button"
                onClick={() => speakEn(targetSent.en, 0.7)}
                className="px-5 py-3 rounded-xl font-extrabold text-sm text-white cursor-pointer"
                style={{ background: 'var(--accent)' }}
              >
                🐢 Odtwórz Super Slow (0.70x)
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <div className="text-lg font-extrabold">{targetSent.en}</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>🇵🇱 {targetSent.pl}</div>
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {topic.words.slice(0, 4).map((w, i) => (
                <div key={i} className="p-3 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <div className="font-extrabold text-sm">{w.emoji} {w.en}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{w.pl}</div>
                </div>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-2">
              <p className="text-xs font-bold m-0">Wpisz po angielsku główne pojęcie tematu ({targetWord.pl}):</p>
              <input
                type="text"
                value={gapInput}
                onChange={(e) => setGapInput(e.target.value)}
                placeholder={`Type "${targetWord.en}"...`}
                className="px-3.5 py-2 rounded-xl border font-bold text-sm w-full max-w-md"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
              <div className="text-xs" style={{ color: 'var(--muted)' }}>
                Wzorzec: <strong>{targetWord.en}</strong> — “{targetWord.promptExample}”
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-3">
              <div className="text-base font-extrabold">“{targetSent.en}”</div>
              <p className="text-xs m-0" style={{ color: 'var(--muted)' }}>
                Przeczytaj powyższe zdanie głośno i wyraźnie po angielsku!
              </p>
              <button
                type="button"
                onClick={() => {
                  playFeedbackChime('win');
                  onAwardXp(20, 4);
                  setTopicIdx((i) => i + 1);
                  setStep(1);
                }}
                className="px-5 py-2.5 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                style={{ background: 'var(--good)' }}
              >
                ✅ Ukończ 6 kroków (+20 XP) i przejdź dalej ▶
              </button>
            </div>
          )}

          {step < 6 && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                style={{ background: 'var(--primary)' }}
              >
                Następny krok ({step + 1}/6) ▶
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== 10. STORIES / CASE STUDIES SECTION (HISTORIE) ====================

export const StoriesSection: React.FC<{
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ onAwardXp }) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(STORIES[0].id);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const story = STORIES.find((s) => s.id === selectedStoryId) || STORIES[0];

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          📖 Historie i Case Studies po angielsku (Real-World Vibe Coding Stories)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Czytaj i słuchaj po angielsku autentycznych historii o budowie produktów AI, pracy Product Ownera w Scrumie, optymalizacji 3D oraz lejkach wzrostu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {STORIES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                setSelectedStoryId(st.id);
                setAnswers({});
              }}
              className="p-3 rounded-xl border text-left cursor-pointer transition-all"
              style={{
                background: st.id === story.id ? 'var(--tip-bg)' : 'var(--surface-2)',
                borderColor: st.id === story.id ? 'var(--primary)' : 'var(--border)'
              }}
            >
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span>{st.emoji} {DOMAINS[st.domain].namePl}</span>
                <span className="px-2 py-0.5 rounded text-white" style={{ background: 'var(--accent)' }}>{st.level}</span>
              </div>
              <div className="font-extrabold text-xs mt-1.5 leading-snug">{st.titleEn}</div>
            </button>
          ))}
        </div>
      </div>

      <div
        className="p-5 rounded-2xl border space-y-4"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-extrabold m-0">{story.emoji} {story.titleEn}</h2>
            <p className="text-xs m-0 mt-0.5" style={{ color: 'var(--muted)' }}>🇵🇱 {story.titlePl}</p>
          </div>
          <button
            type="button"
            onClick={() => speakEn(story.paragraphs.map((p) => p.en).join(' '), 1.0)}
            className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            🔊 Odsłuchaj całą historię EN
          </button>
        </div>

        <div className="space-y-3">
          {story.paragraphs.map((p, idx) => (
            <div
              key={idx}
              onClick={() => speakEn(p.en, 1.0)}
              className="p-3.5 rounded-xl border cursor-pointer transition-colors hover:opacity-95"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
            >
              <p className="font-bold text-sm md:text-base m-0">{p.en}</p>
              <p className="text-xs mt-1.5 mb-0" style={{ color: 'var(--muted)' }}>🇵🇱 {p.pl}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-extrabold mb-2">📚 Słowniczek do historii (Glossary):</h3>
          <div className="flex flex-wrap gap-2">
            {story.glossary.map((g, i) => (
              <button
                key={i}
                type="button"
                onClick={() => speakEn(g.en, 1.0)}
                className="px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                🔊 <strong>{g.en}</strong> — {g.pl}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-extrabold m-0">❓ Pytania sprawdzające zrozumienie (English Comprehension):</h3>
          {story.questions.map((q, qIdx) => (
            <div key={qIdx} className="p-3.5 rounded-xl border space-y-2" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
              <div className="font-extrabold text-sm">{q.q}</div>
              <div className="grid grid-cols-1 gap-1.5">
                {q.options.map((opt, oIdx) => {
                  const picked = answers[qIdx];
                  const isRight = picked !== undefined && oIdx === q.answer;
                  const isWrong = picked === oIdx && oIdx !== q.answer;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => {
                        setAnswers((a) => ({ ...a, [qIdx]: oIdx }));
                        if (oIdx === q.answer) {
                          playFeedbackChime('good');
                          onAwardXp(15, 2);
                        } else {
                          playFeedbackChime('bad');
                        }
                      }}
                      className="p-2.5 rounded-xl border text-left text-xs font-bold cursor-pointer"
                      style={{
                        background: isRight ? 'var(--good-bg)' : isWrong ? 'var(--bad-bg)' : 'var(--surface)',
                        borderColor: isRight ? 'var(--good)' : isWrong ? 'var(--bad)' : 'var(--border)'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 11. FILMS / YOUTUBE HUB SECTION (FILMY Z YOUTUBE) ====================

export const FilmsHubSection: React.FC<{
  state: AppState;
  onOpenVideo: (topicId: string, videoId: string) => void;
}> = ({ state, onOpenVideo }) => {
  const [domainFilter, setDomainFilter] = useState<DomainKey | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredTopics = TOPICS.filter((t) => {
    if (domainFilter !== 'ALL' && t.domain !== domainFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      t.titleEn.toLowerCase().includes(q) ||
      t.titlePl.toLowerCase().includes(q) ||
      t.videos.some((v) => v.title.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          🎬 Katalog Wideo z YouTube + Ćwiczenia (48 tematów × 3 filmy = 144 lekcje wideo EN)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Wszystkie materiały wideo są po angielsku i posiadają interaktywne transkrypty, słownictwo oraz quizy sprawdzające zrozumienie z 4 dziedzin koła tematycznego.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'R', 'G', 'B', 'M'] as const).map((dk) => (
            <button
              key={dk}
              type="button"
              onClick={() => setDomainFilter(dk)}
              className="px-3.5 py-2 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{
                background: domainFilter === dk ? 'var(--primary)' : 'var(--surface-2)',
                color: domainFilter === dk ? '#ffffff' : 'var(--text)',
                borderColor: domainFilter === dk ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {dk === 'ALL' ? '🌐 Wszystkie (48)' : `${DOMAINS[dk].icon} ${DOMAINS[dk].namePl} (12)`}
            </button>
          ))}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj filmu lub tematu po angielsku (np. Scrum, Three.js, SEO, Agents)..."
            className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border text-xs font-bold"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTopics.map((t) => {
          const dom = DOMAINS[t.domain];
          return (
            <div
              key={t.id}
              className="p-4 rounded-2xl border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                borderTopWidth: '5px',
                borderTopColor: dom.borderHex,
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="font-extrabold text-sm md:text-base">
                  {t.emoji} {t.titleEn}{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>
                    · {t.titlePl} ({dom.namePl})
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white" style={{ background: 'var(--accent)' }}>
                  {t.level}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {t.videos.map((v, vIdx) => {
                  const watched = Boolean(state.topics[t.id]?.videos?.[v.id]);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => onOpenVideo(t.id, v.id)}
                      className="rounded-xl border overflow-hidden text-left flex flex-col cursor-pointer transition-all hover:border-blue-500 p-0"
                      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <div className="relative aspect-video w-full bg-slate-900">
                        <img
                          src={`https://i.ytimg.com/vi/${v.ytId}/hqdefault.jpg`}
                          alt={v.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-black/80 text-white">
                          #{vIdx + 1} · EN
                        </span>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-black/80 text-white mono">
                          {Math.floor(v.durationSec / 60)} min
                        </span>
                        {watched && (
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold text-white" style={{ background: 'var(--good)' }}>
                            ✓ Ukończone
                          </span>
                        )}
                      </div>
                      <div className="p-2.5">
                        <div className="font-extrabold text-xs leading-snug" style={{ color: 'var(--text)' }}>
                          {v.title}
                        </div>
                        <div className="text-[11px] mt-1" style={{ color: 'var(--muted)' }}>
                          {v.channel} · Ćwiczenia + Transkrypt EN ▶
                        </div>
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

// ==================== 12. THEMATIC DICTIONARY SECTION (SŁOWNIK TEMATYCZNY) ====================

export const ThematicDictSection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState<DomainKey | 'ALL'>('ALL');

  const matchingTopics = TOPICS.filter((t) => domainFilter === 'ALL' || t.domain === domainFilter);

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          📚 Słownik tematyczny Vibe Codingu (288 terminów i wzorców promptów EN)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Kompletny słownik angielskich pojęć z 4 dziedzin koła (Programowanie, Grafika i Multimedia, E-Marketing, Management &amp; Certyfikacje) z gotowymi przykładami promptów i wymową lektora.
        </p>

        <div className="flex flex-wrap gap-2">
          {(['ALL', 'R', 'G', 'B', 'M'] as const).map((dk) => (
            <button
              key={dk}
              type="button"
              onClick={() => setDomainFilter(dk)}
              className="px-3.5 py-2 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{
                background: domainFilter === dk ? 'var(--primary)' : 'var(--surface-2)',
                color: domainFilter === dk ? '#ffffff' : 'var(--text)',
                borderColor: domainFilter === dk ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {dk === 'ALL' ? '🌐 Wszystkie (288)' : `${DOMAINS[dk].icon} ${DOMAINS[dk].namePl}`}
            </button>
          ))}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po angielsku lub polsku (np. RAG, ROAS, Scrum, RACI, CPI, Shader)..."
            className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl border text-xs font-bold"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {matchingTopics.map((t) => {
          const words = t.words.filter((w) => {
            if (!search.trim()) return true;
            const q = search.toLowerCase();
            return (
              w.en.toLowerCase().includes(q) ||
              w.pl.toLowerCase().includes(q) ||
              w.promptExample.toLowerCase().includes(q)
            );
          });
          if (words.length === 0) return null;

          return (
            <div
              key={t.id}
              className="p-4 rounded-2xl border"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
            >
              <h2 className="text-base font-extrabold mt-0 mb-2.5">
                {t.emoji} {t.titleEn}{' '}
                <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>
                  · {t.titlePl} ({DOMAINS[t.domain].namePl})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {words.map((w, idx) => (
                  <div
                    key={idx}
                    onClick={() => speakEn(`${w.en}. ${w.promptExample}`, 1.0)}
                    className="p-3 rounded-xl border cursor-pointer transition-all hover:border-blue-500"
                    style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm">
                        {w.emoji} {w.en}
                      </span>
                      <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>🔊 EN</span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      🇵🇱 {w.pl}
                    </div>
                    <div className="text-[11px] font-mono mt-1.5 p-1.5 rounded" style={{ background: 'var(--surface)' }}>
                      “{w.promptExample}”
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== 13. POLYSEMY / MULTI-CONTEXT SECTION (WIELE ZNACZEŃ) ====================

export const MeaningsSection: React.FC = () => {
  const [selectedWordId, setSelectedWordId] = useState(POLYSEMY_WORDS[0].id);
  const current = POLYSEMY_WORDS.find((p) => p.id === selectedWordId) || POLYSEMY_WORDS[0];

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          🔀 Wiele znaczeń (Jak to samo angielskie słowo działa w 4 dziedzinach koła)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Słowa takie jak <strong>Token</strong>, <strong>Pipeline</strong>, <strong>Agent</strong>, <strong>Conversion</strong> czy <strong>Frame</strong> znaczą zupełnie co innego w Programowaniu (Czerwony), Grafice (Zielony), E-Marketingu (Niebieski) i Managemencie (Biały)!
        </p>

        <div className="flex flex-wrap gap-2">
          {POLYSEMY_WORDS.map((pw) => (
            <button
              key={pw.id}
              type="button"
              onClick={() => {
                setSelectedWordId(pw.id);
                speakEn(pw.word, 1.0);
              }}
              className="px-4 py-2 rounded-xl font-extrabold text-sm border cursor-pointer"
              style={{
                background: pw.id === current.id ? 'var(--primary)' : 'var(--surface-2)',
                color: pw.id === current.id ? '#ffffff' : 'var(--text)',
                borderColor: pw.id === current.id ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {pw.word} (4 konteksty)
            </button>
          ))}
        </div>
      </div>

      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <div className="text-3xl font-extrabold" style={{ color: 'var(--primary)' }}>
              {current.word}
            </div>
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>
              {current.pronunciationHint}
            </div>
          </div>
          <button
            type="button"
            onClick={() => speakEn(current.word, 1.0)}
            className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            🔊 Wymowa EN
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {current.meanings.map((m, idx) => {
            const dom = DOMAINS[m.domain];
            return (
              <div
                key={idx}
                onClick={() => speakEn(`${m.definitionEn} Example: ${m.exampleEn}`, 1.0)}
                className="p-4 rounded-xl border cursor-pointer"
                style={{
                  background: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  borderTopWidth: '5px',
                  borderTopColor: dom.borderHex
                }}
              >
                <div className="flex items-center justify-between text-xs font-extrabold uppercase mb-1">
                  <span>
                    {dom.icon} {dom.namePl} ({dom.nameEn})
                  </span>
                  <span>#{idx + 1}</span>
                </div>
                <div className="font-extrabold text-sm mt-1">
                  {m.emoji} {m.titlePl}
                </div>
                <p className="text-xs font-bold mt-1.5 mb-1">{m.definitionEn}</p>
                <div className="text-xs font-mono p-2 rounded mt-2" style={{ background: 'var(--surface)' }}>
                  🔊 “{m.exampleEn}”
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== 14. PICTURES / VISUAL LAB SECTION (ĆWICZENIA OBRAZKOWE) ====================

export const PicturesLabSection: React.FC<{
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ onAwardXp }) => {
  const allWords = TOPICS.flatMap((t) =>
    t.words.slice(0, 2).map((w) => ({ ...w, domain: t.domain, topicTitle: t.titleEn }))
  );
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const cur = allWords[idx % allWords.length];
  const options = [
    allWords[idx % allWords.length],
    allWords[(idx + 5) % allWords.length],
    allWords[(idx + 11) % allWords.length],
    allWords[(idx + 19) % allWords.length]
  ].sort((a, b) => a.en.localeCompare(b.en));

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border max-w-2xl mx-auto text-center"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          🖼️ Ćwiczenia obrazkowe · Visual Prompt &amp; Concept Lab
        </h1>
        <p className="text-xs md:text-sm mt-1 mb-4" style={{ color: 'var(--muted)' }}>
          Połącz wizualny symbol i angielską specyfikację promptu z właściwym terminem technicznym!
        </p>

        <div className="p-5 rounded-2xl border my-3" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div className="text-6xl mb-2">{cur.emoji}</div>
          <div className="font-extrabold text-base">“{cur.promptExample}”</div>
          <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
            🇵🇱 Podpowiedź: {cur.pl} ({DOMAINS[cur.domain].namePl})
          </div>
          <button
            type="button"
            onClick={() => speakEn(cur.promptExample, 1.0)}
            className="mt-2 px-3 py-1 rounded-lg text-xs font-bold text-white cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            🔊 Listen in English
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {options.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                speakEn(opt.en, 1.0);
                if (opt.en === cur.en) {
                  playFeedbackChime('good');
                  onAwardXp(10, 1);
                  setFeedback(`✅ Brawo! "${cur.en}" — ${cur.pl}`);
                  setTimeout(() => {
                    setFeedback(null);
                    setIdx((n) => n + 1);
                  }, 1100);
                } else {
                  playFeedbackChime('bad');
                  setFeedback(`❌ Spróbuj ponownie! Szukamy pojęcia dla: ${cur.pl}`);
                }
              }}
              className="p-4 rounded-xl border-2 font-extrabold text-sm flex flex-col items-center gap-1 cursor-pointer transition-all hover:border-blue-500"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span>{opt.en}</span>
            </button>
          ))}
        </div>

        {feedback && (
          <div className="mt-3 p-3 rounded-xl font-extrabold text-xs" style={{ background: 'var(--tip-bg)' }}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== 15. SRS REVIEW SECTION (POWTÓRKI PAMIĘĆ) ====================

export const ReviewSrsSection: React.FC<{
  onGradeCard: (wordKey: string, quality: 'again' | 'good' | 'easy') => void;
}> = ({ onGradeCard }) => {
  const pool = TOPICS.flatMap((t) =>
    t.words.map((w) => ({ ...w, topicId: t.id, topicTitle: t.titleEn, domain: t.domain }))
  );
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = pool[cardIdx % pool.length];
  const dom = DOMAINS[card.domain];

  const handleGrade = (q: 'again' | 'good' | 'easy') => {
    playFeedbackChime(q === 'again' ? 'bad' : 'good');
    onGradeCard(`${card.topicId}:${card.en}`, q);
    setFlipped(false);
    setCardIdx((i) => i + 1);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div
        className="p-5 rounded-2xl border text-center"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between text-xs font-extrabold mb-3">
          <span>🧠 Powtórki SRS (Spaced Repetition System)</span>
          <span className="mono" style={{ color: 'var(--muted)' }}>
            Karta {(cardIdx % pool.length) + 1} / {pool.length}
          </span>
        </div>

        <div
          onClick={() => {
            setFlipped((f) => !f);
            speakEn(`${card.en}. ${card.promptExample}`, 1.0);
          }}
          className="p-6 rounded-2xl border-2 cursor-pointer my-2 transition-all"
          style={{
            background: 'var(--surface-2)',
            borderColor: dom.borderHex,
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div className="text-xs font-extrabold uppercase mb-2" style={{ color: 'var(--muted)' }}>
            {dom.icon} {dom.namePl} · {card.topicTitle}
          </div>
          <div className="text-5xl mb-2">{card.emoji}</div>
          <div className="text-2xl font-extrabold">{card.en}</div>

          {!flipped ? (
            <div className="text-xs font-bold mt-4 px-3 py-1 rounded-full border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              👆 Kliknij kartę, aby odsłonić znaczenie i prompt EN
            </div>
          ) : (
            <div className="mt-4 space-y-2 text-center">
              <div className="text-base font-extrabold" style={{ color: 'var(--primary)' }}>
                🇵🇱 {card.pl}
              </div>
              <div className="text-xs font-mono p-2.5 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                “{card.promptExample}”
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 my-3">
          <button
            type="button"
            onClick={() => speakEn(`${card.en}. ${card.promptExample}`, 1.0)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            🔊 Wymowa EN (1.0x)
          </button>
          <button
            type="button"
            onClick={() => speakEn(`${card.en}. ${card.promptExample}`, 0.72)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
          >
            🐢 Powoli (0.75x)
          </button>
        </div>

        {flipped && (
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => handleGrade('again')}
              className="py-2.5 px-3 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{ background: 'var(--bad-bg)', borderColor: 'var(--bad)', color: 'var(--bad)' }}
            >
              🔄 Jeszcze raz (1d)
            </button>
            <button
              type="button"
              onClick={() => handleGrade('good')}
              className="py-2.5 px-3 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{ background: 'var(--tip-bg)', borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              👍 Dobrze (3d · +10 XP)
            </button>
            <button
              type="button"
              onClick={() => handleGrade('easy')}
              className="py-2.5 px-3 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{ background: 'var(--good-bg)', borderColor: 'var(--good)', color: 'var(--good)' }}
            >
              🚀 Łatwe (7d · +15 XP)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== 16. PROMPT GRAMMAR SECTION (GRAMATYKA PROMPTÓW) ====================

export const GrammarSection: React.FC<{
  onAwardXp: (xp: number, minutes: number) => void;
}> = ({ onAwardXp }) => {
  const [selectedId, setSelectedId] = useState(GRAMMAR_TOPICS[0].id);
  const [pickedAns, setPickedAns] = useState<number | null>(null);
  const g = GRAMMAR_TOPICS.find((x) => x.id === selectedId) || GRAMMAR_TOPICS[0];

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          📐 Gramatyka Vibe Codingu i Specyfikacji (Frameworks &amp; Syntax)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Krótka reguła po polsku, piramida konstrukcyjna po angielsku, przykłady czytane przez lektora oraz mini-quiz — od CO-STAR i Gherkin BDD po wzory EVM na egzamin PMP!
        </p>

        <div className="flex flex-wrap gap-2">
          {GRAMMAR_TOPICS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setPickedAns(null);
              }}
              className="px-3.5 py-2 rounded-xl font-extrabold text-xs border cursor-pointer"
              style={{
                background: item.id === g.id ? 'var(--primary)' : 'var(--surface-2)',
                color: item.id === g.id ? '#ffffff' : 'var(--text)',
                borderColor: item.id === g.id ? 'var(--primary)' : 'var(--border)'
              }}
            >
              {DOMAINS[item.domain].icon} {item.titleEn} ({item.level})
            </button>
          ))}
        </div>
      </div>

      <div
        className="p-5 rounded-2xl border space-y-4"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div>
          <span className="text-xs font-extrabold uppercase" style={{ color: 'var(--primary)' }}>
            {DOMAINS[g.domain].namePl} · Poziom {g.level}
          </span>
          <h2 className="text-lg md:text-xl font-extrabold m-0 mt-0.5">{g.titleEn}</h2>
          <p className="text-xs mt-0.5 mb-2" style={{ color: 'var(--muted)' }}>{g.titlePl}</p>
          <div className="p-3 rounded-xl font-mono text-xs font-extrabold border" style={{ background: 'var(--tip-bg)', borderColor: 'var(--border)' }}>
            📐 Formula: {g.formula}
          </div>
          <p className="text-sm mt-2 mb-0">{g.rulePl}</p>
        </div>

        {/* Visual Pyramid */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold m-0">🔺 Piramida struktury (Kliknij warstwę, aby odsłuchać po angielsku):</h3>
          {g.pyramidRows.map(([head, descPl, exEn], idx) => (
            <div
              key={idx}
              onClick={() => speakEn(exEn, 1.0)}
              className="p-3.5 rounded-xl border cursor-pointer transition-all"
              style={{
                background: 'var(--surface-2)',
                borderColor: 'var(--border)',
                maxWidth: idx === 0 ? '82%' : idx === 1 ? '91%' : '100%',
                margin: '0 auto'
              }}
            >
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span style={{ color: 'var(--primary)' }}>{head}</span>
                <span style={{ color: 'var(--muted)' }}>{descPl}</span>
              </div>
              <div className="font-mono text-xs font-bold mt-1">🔊 “{exEn}”</div>
            </div>
          ))}
        </div>

        {/* Examples */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold m-0">💬 Przykłady produkcyjne po angielsku:</h3>
          {g.examples.map((ex, i) => (
            <div
              key={i}
              onClick={() => speakEn(ex.en, 1.0)}
              className="p-3 rounded-xl border cursor-pointer"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
            >
              <div className="font-bold text-sm">🔊 {ex.en}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>🇵🇱 {ex.pl}</div>
            </div>
          ))}
        </div>

        {/* Mini-Quiz */}
        <div className="p-4 rounded-xl border space-y-2.5" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div className="font-extrabold text-sm">❓ Mini-Quiz: {g.quiz[0].q}</div>
          <div className="grid grid-cols-1 gap-2">
            {g.quiz[0].options.map((opt, oIdx) => {
              const isRight = pickedAns !== null && oIdx === g.quiz[0].answer;
              const isWrong = pickedAns === oIdx && oIdx !== g.quiz[0].answer;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => {
                    setPickedAns(oIdx);
                    if (oIdx === g.quiz[0].answer) {
                      playFeedbackChime('good');
                      onAwardXp(15, 2);
                    } else {
                      playFeedbackChime('bad');
                    }
                  }}
                  className="p-3 rounded-xl border text-left text-xs font-bold cursor-pointer"
                  style={{
                    background: isRight ? 'var(--good-bg)' : isWrong ? 'var(--bad-bg)' : 'var(--surface)',
                    borderColor: isRight ? 'var(--good)' : isWrong ? 'var(--bad)' : 'var(--border)'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {pickedAns !== null && (
            <div className="text-xs font-bold pt-1" style={{ color: 'var(--good)' }}>
              💡 {g.quiz[0].explanationEn}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== 17. FIVE PROMPTS A DAY SECTION (5 ZDAŃ / PROMPTÓW DZIENNIE) ====================

export const FiveSentencesSection: React.FC<{
  state: AppState;
  onSaveFivePrompts: (prompts: string[], reflection: string, score: number) => void;
}> = ({ state, onSaveFivePrompts }) => {
  const [prompts, setPrompts] = useState<string[]>([
    'Act as a Senior TypeScript Architect and refactor the API handler for idempotency.',
    'Given an unauthenticated visitor, when they click Start Lesson, then open the interactive sandbox without a signup wall.',
    'Generate a clean 16:9 studio product illustration under soft diffused lighting.',
    'Calculate the Cost Performance Index (CPI = EV / AC) and highlight any schedule variance.',
    'Optimize the landing page hero headline around our Unique Value Proposition and add JSON-LD schema.'
  ]);
  const [reflection, setReflection] = useState('Dziś poćwiczyłem łączone specyfikacje z 4 obszarów koła tematycznego.');
  const [evalResult, setEvalResult] = useState<null | { score: number; notes: string[] }>(null);

  const handleEvaluate = () => {
    const filled = prompts.map((p) => p.trim()).filter(Boolean);
    if (filled.length === 0) return;

    const avgWords = filled.reduce((a, b) => a + b.split(/\s+/).length, 0) / filled.length;
    const score = Math.min(100, Math.round(filled.length * 15 + Math.min(25, avgWords * 2)));
    const notes = [
      `Ukończone prompty po angielsku: ${filled.length}/5`,
      `Średnia długość instrukcji: ${Math.round(avgWords)} słów EN (bardzo dobra precyzja kontekstu!)`,
      'Wskazówka: Kontynuuj używanie czasowników operacyjnych (Refactor, Validate, Generate, Calculate, Optimize).'
    ];
    playFeedbackChime('win');
    setEvalResult({ score, notes });
    onSaveFivePrompts(filled, reflection, score);
  };

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          ✍️ 5 Promptów / Specyfikacji Dziennie po angielsku (Daily 5 Prompts)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Odpowiednik „5 zdań dziennie” z LangEduDei: zapisz po angielsku 5 precyzyjnych promptów, kryteriów akceptacji Given/When/Then lub instrukcji projektowych z Twojej dzisiejszej pracy.
        </p>

        <div className="space-y-2.5">
          {prompts.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs text-white shrink-0"
                style={{ background: 'var(--primary)' }}
              >
                {idx + 1}
              </span>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const next = [...prompts];
                  next[idx] = e.target.value;
                  setPrompts(next);
                }}
                placeholder={`English prompt / user story #${idx + 1}...`}
                className="flex-1 px-3.5 py-2.5 rounded-xl border font-bold text-xs md:text-sm"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
              <button
                type="button"
                onClick={() => speakEn(val, 1.0)}
                className="px-2.5 py-2 rounded-xl border text-xs font-bold cursor-pointer shrink-0"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                🔊
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <label className="text-xs font-extrabold block mb-1">
            Refleksja dnia (po polsku lub angielsku):
          </label>
          <textarea
            rows={2}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full p-3 rounded-xl border text-xs md:text-sm"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
        </div>

        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleEvaluate}
            className="px-6 py-2.5 rounded-xl font-extrabold text-white text-sm cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            ✅ Sprawdź i zapisz 5 promptów (+30 XP)
          </button>
        </div>

        {evalResult && (
          <div className="mt-4 p-4 rounded-xl border-2" style={{ background: 'var(--good-bg)', borderColor: 'var(--good)' }}>
            <div className="font-extrabold text-base" style={{ color: 'var(--good)' }}>
              🏆 Ocena jakości specyfikacji EN: {evalResult.score}/100 (+30 XP)
            </div>
            <ul className="text-xs space-y-1 mt-1.5 mb-0 pl-4">
              {evalResult.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {state.fivePromptsHistory.length > 0 && (
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
        >
          <h2 className="text-base font-extrabold mt-0 mb-2">📓 Historia Twoich dzienników 5 promptów</h2>
          <div className="space-y-2">
            {state.fivePromptsHistory.slice(0, 5).map((entry, i) => (
              <div key={i} className="p-3 rounded-xl border text-xs" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
                <div className="font-extrabold">
                  📅 {entry.date} · Wynik: {entry.score}%
                </div>
                <div className="mt-1" style={{ color: 'var(--muted)' }}>
                  {entry.prompts[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== 18. MOTIVATION & CERTIFICATIONS SECTION (MOTYWACJA) ====================

export const MotivationSection: React.FC<{
  state: AppState;
  onUpdateWhy: (why: string) => void;
  onAwardXp: (xp: number, minutes: number) => void;
  onOpenTopic: (topicId: string) => void;
}> = ({ state, onUpdateWhy, onAwardXp, onOpenTopic }) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      playFeedbackChime('win');
      speakEn('Well done! Five minutes of focused Vibe Coding complete!', 1.0);
      onAwardXp(25, 5);
      setSecondsLeft(null);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s !== null ? s - 1 : null)), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, onAwardXp]);

  const fmtTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-4">
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          🔥 Motywacja, zasada 5 minut i Certyfikacje (PM / PO / Scrum / PRINCE2)
        </h1>
        <p className="text-sm mt-1 mb-3" style={{ color: 'var(--muted)' }}>
          Gdy nie masz siły na długą naukę, uruchom zasadę „Tylko 5 minut”. Małe, codzienne kroki budują biegłość w angielskim Vibe Codingu i przygotowują do międzynarodowych certyfikacji.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border text-center" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-xs font-extrabold uppercase" style={{ color: 'var(--muted)' }}>
              ⏱️ Timer „Tylko 5 minut Vibe Codingu”
            </div>
            <div className="text-4xl font-extrabold mono my-3">
              {secondsLeft !== null ? fmtTimer(secondsLeft) : '5:00'}
            </div>
            <button
              type="button"
              onClick={() => {
                if (secondsLeft === null) {
                  speakEn('Just five minutes of focused Vibe Coding. You can do it!', 1.0);
                  setSecondsLeft(300);
                } else {
                  setSecondsLeft(null);
                }
              }}
              className="px-6 py-2.5 rounded-xl font-extrabold text-sm text-white cursor-pointer"
              style={{ background: secondsLeft !== null ? 'var(--bad)' : 'var(--primary)' }}
            >
              {secondsLeft !== null ? '⏹ Zatrzymaj timer' : '▶ Start: tylko 5 minut (+25 XP)'}
            </button>
          </div>

          <div className="p-4 rounded-xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <label className="text-xs font-extrabold block mb-1.5">
              🎯 Dlaczego uczę się Vibe Codingu i angielskiej terminologii? (Twoje „Dlaczego”):
            </label>
            <textarea
              rows={3}
              value={state.whyVibeCoding}
              onChange={(e) => onUpdateWhy(e.target.value)}
              className="w-full p-2.5 rounded-xl border text-xs md:text-sm font-bold"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
          </div>
        </div>
      </div>

      {/* Detailed Certifications Hub (White Center Wheel Focus) */}
      <div
        className="p-5 rounded-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h2 className="text-lg font-extrabold mt-0 mb-1">
          🏅 Ścieżka Certyfikacji Managementu (Biały Środek Koła Tematycznego)
        </h2>
        <p className="text-xs mt-0 mb-4" style={{ color: 'var(--muted)' }}>
          Wszystkie oficjalne egzaminy (PMP, CAPM, PRINCE2, PSM I/II, PSPO I/II, SAFe) zdaje się najlepiej po angielsku — kliknij dowolną certyfikację, aby odsłuchać kluczowe reguły egzaminacyjne i przejść do dedykowanego wycinka koła!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl border flex flex-col justify-between gap-3"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base font-extrabold">
                    {c.emoji} {c.code} — {c.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white" style={{ background: 'var(--primary)' }}>
                    {c.org}
                  </span>
                </div>
                <p className="text-xs mt-1 mb-2" style={{ color: 'var(--muted)' }}>
                  {c.descPl}
                </p>
                <div className="text-xs font-mono p-2 rounded border mb-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  📋 Format: {c.examFormatEn}
                </div>
                <ul className="text-xs space-y-1 m-0 pl-4">
                  {c.keyFormulasOrRulesEn.map((rule, rIdx) => (
                    <li key={rIdx} className="font-bold">
                      {rule}{' '}
                      <button
                        type="button"
                        onClick={() => speakEn(rule, 1.0)}
                        className="text-[11px] underline ml-1 cursor-pointer bg-transparent border-0 p-0"
                        style={{ color: 'var(--primary)' }}
                      >
                        🔊 EN
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs font-extrabold mono" style={{ color: 'var(--good)' }}>
                  Gotowość: {state.certReady[c.id] || 35}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenTopic(c.topicId)}
                  className="px-3.5 py-1.5 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                  style={{ background: 'var(--primary)' }}
                >
                  Ćwicz moduł na tarczy ▶
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 19. SETTINGS SECTION (LEKTOR I USTAWIENIA) ====================

export const SettingsSection: React.FC<{
  state: AppState;
  onToggleTheme: () => void;
  onSetLevelOverride: (lvl: VibeLevel | null) => void;
  onResetProgress: () => void;
}> = ({ state, onToggleTheme, onSetLevelOverride, onResetProgress }) => {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div
        className="p-5 rounded-2xl border space-y-4"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold m-0">
          ⚙️ Lektor, Motyw i Ustawienia aplikacji VibeEduDei
        </h1>

        <div className="p-4 rounded-xl border flex items-center justify-between flex-wrap gap-2" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div>
            <div className="font-extrabold text-sm">🌓 Motyw kolorystyczny (Jasny / Ciemny)</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              Aktualny motyw: <strong>{state.theme === 'dark' ? 'Dark Mode' : 'Light Mode (LangEduDei Classic)'}</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
            style={{ background: 'var(--primary)' }}
          >
            Przełącz na {state.theme === 'dark' ? '☀️ Jasny' : '🌙 Ciemny'}
          </button>
        </div>

        <div className="p-4 rounded-xl border flex items-center justify-between flex-wrap gap-2" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div>
            <div className="font-extrabold text-sm">🎓 Ręczny wybór poziomu kursu (V1 → V6)</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              Domyślnie poziom wynika z tygodnia planu 2-letniego, ale możesz go przełączyć w każdej chwili.
            </div>
          </div>
          <select
            value={state.levelOverride || ''}
            onChange={(e) =>
              onSetLevelOverride(e.target.value ? (e.target.value as VibeLevel) : null)
            }
            className="px-3 py-2 rounded-xl border font-bold text-xs"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <option value="">Automatycznie wg tygodnia ({state.currentWeek}/104)</option>
            {COURSE_LEVELS.map((l) => (
              <option key={l} value={l}>
                Poziom {l}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div className="font-extrabold text-sm">🔊 Test angielskiego i polskiego lektora (Web Speech API)</div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                speakEn(
                  'Welcome to VibeEduDei! Let us master Vibe Coding, 3D Graphics, E-Marketing, and Agile Product Management in English.',
                  1.0
                )
              }
              className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
              style={{ background: 'var(--primary)' }}
            >
              🔊 Test głosu angielskiego (EN)
            </button>
            <button
              type="button"
              onClick={() =>
                speakPl('Witaj w aplikacji VibeEduDei! Uczymy się vibe codingu z kołem czterdziestu ośmiu tematów.')
              }
              className="px-4 py-2 rounded-xl font-bold text-xs border cursor-pointer"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              🇵🇱 Test głosu polskiego (PL)
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl border flex items-center justify-between flex-wrap gap-2" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
          <div>
            <div className="font-extrabold text-sm">🗑️ Reset postępów nauki</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              Przywraca początkowy stan punktów XP i ukończonych lekcji w pamięci przeglądarki.
            </div>
          </div>
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="px-4 py-2 rounded-xl font-bold text-xs border cursor-pointer"
              style={{ background: 'var(--bad-bg)', borderColor: 'var(--bad)', color: 'var(--bad)' }}
            >
              Resetuj postępy
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="px-4 py-2 rounded-xl font-extrabold text-xs text-white cursor-pointer"
                style={{ background: 'var(--bad)' }}
              >
                Potwierdź reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3 py-2 rounded-xl font-bold text-xs border cursor-pointer"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                Anuluj
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
