import React, { useState } from 'react';
import { WheelTopic } from '../data/wheelTopics';
import { speakEn, playFeedbackChime, VibeKurakSvg } from '../utils/speechAndStorage';

export interface ExerciseItem {
  id: string;
  type: 'concept-choice' | 'prompt-bank' | 'gap-choice' | 'quiz-mc';
  typeLabelPl: string;
  promptQuestionEn: string;
  subHintPl: string;
  audioEn?: string;
  emoji?: string;
  options?: string[];
  correctIndex?: number;
  bankTokens?: string[];
  targetSentence?: string;
  explanationEn: string;
}

export function buildExercisesForTopic(
  topic: WheelTopic,
  lessonKey: 'words' | 'sentences' | 'quiz' | 'test' | 'concepts' | 'patterns' | 'review'
): ExerciseItem[] {
  const items: ExerciseItem[] = [];

  if (lessonKey === 'words' || lessonKey === 'concepts' || lessonKey === 'test') {
    topic.words.forEach((w, idx) => {
      const distractors = topic.words
        .filter((x) => x.en !== w.en)
        .slice(0, 3)
        .map((x) => x.en);
      const opts = [w.en, ...distractors];
      // Deterministic rotation based on index
      const rot = idx % opts.length;
      const rotated = [...opts.slice(rot), ...opts.slice(0, rot)];
      const correctIdx = rotated.indexOf(w.en);

      items.push({
        id: `${topic.id}-w-${idx}`,
        type: 'concept-choice',
        typeLabelPl: 'Wybierz termin po angielsku',
        promptQuestionEn: `Which English term matches: "${w.pl}"?`,
        subHintPl: `Przykładowy prompt: "${w.promptExample}"`,
        audioEn: `${w.en}. ${w.promptExample}`,
        emoji: w.emoji,
        options: rotated,
        correctIndex: correctIdx,
        explanationEn: `${w.en}: "${w.promptExample}"`
      });

      // Gap-choice on the promptExample
      const wordsInEx = w.promptExample.split(' ');
      if (wordsInEx.length >= 5) {
        const blanked = w.promptExample.replace(new RegExp(w.en.split(' ')[0], 'i'), '_____');
        const gapOpts = [w.en, ...distractors];
        const gRot = (idx + 1) % gapOpts.length;
        const gRotated = [...gapOpts.slice(gRot), ...gapOpts.slice(0, gRot)];
        items.push({
          id: `${topic.id}-gap-${idx}`,
          type: 'gap-choice',
          typeLabelPl: 'Uzupełnij prompt / specyfikację po angielsku',
          promptQuestionEn: blanked === w.promptExample ? `Complete the spec for (${w.pl}): "${w.promptExample}"` : `Fill in the missing concept: "${blanked}"`,
          subHintPl: `Znaczenie: ${w.pl}`,
          audioEn: w.promptExample,
          emoji: w.emoji,
          options: gRotated,
          correctIndex: gRotated.indexOf(w.en),
          explanationEn: `Full English prompt: "${w.promptExample}"`
        });
      }
    });
  }

  if (lessonKey === 'sentences' || lessonKey === 'patterns' || lessonKey === 'test') {
    topic.sentences.forEach((s, idx) => {
      const cleanWords = s.en.split(' ');
      // Group into 5–7 chunks so the bank is snappy and fun like Mimo/Sololearn
      const chunks: string[] = [];
      const chunkSize = Math.max(1, Math.ceil(cleanWords.length / 6));
      for (let i = 0; i < cleanWords.length; i += chunkSize) {
        chunks.push(cleanWords.slice(i, i + chunkSize).join(' '));
      }
      // Scramble deterministically
      const scrambled = [...chunks].sort((a, b) => a.localeCompare(b));

      items.push({
        id: `${topic.id}-sent-${idx}`,
        type: 'prompt-bank',
        typeLabelPl: 'Ułóż instrukcję Vibe Codingu po angielsku',
        promptQuestionEn: s.en,
        subHintPl: `🇵🇱 ${s.pl}`,
        audioEn: s.en,
        emoji: s.emoji,
        bankTokens: scrambled,
        targetSentence: chunks.join(' '),
        explanationEn: `Correct English specification: "${s.en}"`
      });
    });
  }

  if (lessonKey === 'quiz' || lessonKey === 'review' || lessonKey === 'test') {
    topic.quiz.forEach((q, idx) => {
      items.push({
        id: `${topic.id}-q-${idx}`,
        type: 'quiz-mc',
        typeLabelPl: 'Pytanie scenariuszowe (English)',
        promptQuestionEn: q.q,
        subHintPl: `Dziedzina: ${topic.titleEn} (${topic.titlePl})`,
        audioEn: q.q,
        emoji: topic.emoji,
        options: q.options,
        correctIndex: q.answer,
        explanationEn: q.explanationEn
      });
    });

    // Also include video comprehension questions
    topic.videos.forEach((v, vIdx) => {
      const vq = v.questions[0];
      if (vq) {
        items.push({
          id: `${topic.id}-vq-${vIdx}`,
          type: 'quiz-mc',
          typeLabelPl: 'Zrozumienie materiału po angielsku',
          promptQuestionEn: vq.q,
          subHintPl: `Z filmu: ${v.title}`,
          audioEn: vq.q,
          emoji: '🎬',
          options: vq.options,
          correctIndex: vq.answer,
          explanationEn: vq.explanationEn
        });
      }
    });
  }

  return items.slice(0, lessonKey === 'test' ? 10 : 7);
}

interface ExercisePlayerProps {
  title: string;
  subtitle?: string;
  exercises: ExerciseItem[];
  onFinish: (result: { correct: number; total: number; scorePct: number; stars: number; mistakes: { id: string; promptEn: string; correctAnswer: string }[] }) => void;
  onCancel: () => void;
}

export const ExercisePlayer: React.FC<ExercisePlayerProps> = ({
  title,
  subtitle,
  exercises,
  onFinish,
  onCancel
}) => {
  const [idx, setIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [pickedChunks, setPickedChunks] = useState<number[]>([]);
  const [checked, setChecked] = useState<null | { isCorrect: boolean; correctText: string }>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState<{ id: string; promptEn: string; correctAnswer: string }[]>([]);
  const [finished, setFinished] = useState(false);

  const cur = exercises[idx];

  if (!cur) {
    return (
      <div className="p-6 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <p>Brak zadań w tej lekcji.</p>
        <button type="button" onClick={onCancel} className="mt-3 px-4 py-2 rounded-xl font-bold text-white cursor-pointer" style={{ background: 'var(--primary)' }}>
          ← Wróć
        </button>
      </div>
    );
  }

  const handleCheck = () => {
    if (checked) return;

    let isCorrect = false;
    let correctText = '';

    if (cur.type === 'prompt-bank' && cur.bankTokens && cur.targetSentence) {
      const userBuilt = pickedChunks.map((i) => cur.bankTokens![i]).join(' ').trim();
      isCorrect = userBuilt.toLowerCase() === cur.targetSentence.trim().toLowerCase();
      correctText = cur.targetSentence;
    } else if (cur.options && cur.correctIndex !== undefined) {
      if (selectedOpt === null) return;
      isCorrect = selectedOpt === cur.correctIndex;
      correctText = cur.options[cur.correctIndex];
    }

    if (isCorrect) {
      playFeedbackChime('good');
      setCorrectCount((c) => c + 1);
      if (cur.audioEn) speakEn(cur.audioEn, 1.0);
    } else {
      playFeedbackChime('bad');
      setMistakes((m) => [...m, { id: cur.id, promptEn: cur.promptQuestionEn, correctAnswer: correctText }]);
    }

    setChecked({ isCorrect, correctText });
  };

  const handleNext = () => {
    if (idx + 1 >= exercises.length) {
      playFeedbackChime('win');
      setFinished(true);
      return;
    }
    setIdx((i) => i + 1);
    setSelectedOpt(null);
    setPickedChunks([]);
    setChecked(null);
  };

  if (finished) {
    const total = exercises.length;
    const scorePct = Math.round((correctCount / total) * 100);
    const stars = scorePct >= 90 ? 3 : scorePct >= 75 ? 2 : scorePct >= 50 ? 1 : 0;

    return (
      <div
        className="max-w-xl mx-auto p-6 rounded-2xl border-2 text-center my-4"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex justify-center mb-2">
          <VibeKurakSvg mood="proud" size={84} />
        </div>
        <div className="text-3xl mb-1" style={{ color: '#f5b301' }}>
          {'★'.repeat(stars)}
          {'☆'.repeat(3 - stars)}
        </div>
        <h2 className="text-2xl font-extrabold m-0">Lekcja ukończona! · Lesson Complete!</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          {title}
        </p>

        <div className="grid grid-cols-3 gap-3 my-5">
          <div className="p-3 rounded-xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-2xl font-extrabold mono">{scorePct}%</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Wynik</div>
          </div>
          <div className="p-3 rounded-xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-2xl font-extrabold mono">
              {correctCount}/{total}
            </div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Poprawne</div>
          </div>
          <div className="p-3 rounded-xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            <div className="text-2xl font-extrabold mono" style={{ color: 'var(--good)' }}>
              +{correctCount * 10} XP
            </div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Punkty Vibe</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onFinish({ correct: correctCount, total, scorePct, stars, mistakes })}
          className="w-full py-3 px-6 rounded-xl font-extrabold text-white text-base cursor-pointer"
          style={{ background: 'var(--primary)' }}
        >
          Zapisz postęp i kontynuuj ▶
        </button>
      </div>
    );
  }

  const progressPct = Math.round(((idx + (checked ? 1 : 0)) / exercises.length) * 100);
  const canSubmit =
    cur.type === 'prompt-bank' ? pickedChunks.length > 0 : selectedOpt !== null;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-3">
      {/* Top progress bar like LangEduDei / Mimo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-xl border font-bold text-sm cursor-pointer"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          ✕ Zamknij
        </button>
        <div className="flex-1 h-3.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
          />
        </div>
        <span className="text-xs font-extrabold mono" style={{ color: 'var(--muted)' }}>
          {idx + 1}/{exercises.length}
        </span>
      </div>

      {/* Main Exercise Stage */}
      <div
        className="p-5 rounded-2xl border-2"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
            {cur.typeLabelPl}
          </span>
          {subtitle && (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              {subtitle}
            </span>
          )}
        </div>

        <div className="flex items-start gap-3 my-3">
          {cur.emoji && <div className="text-4xl shrink-0">{cur.emoji}</div>}
          <div className="flex-1">
            {cur.type === 'prompt-bank' ? (
              <div>
                <h2 className="text-lg font-extrabold m-0">
                  Przetłumacz / ułóż po angielsku specyfikację:
                </h2>
                <p className="text-base font-bold mt-1 mb-0" style={{ color: 'var(--text)' }}>
                  {cur.subHintPl}
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-extrabold m-0">{cur.promptQuestionEn}</h2>
                <p className="text-xs mt-1 mb-0" style={{ color: 'var(--muted)' }}>
                  {cur.subHintPl}
                </p>
              </div>
            )}
          </div>
          {cur.audioEn && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => speakEn(cur.audioEn!, 1.0)}
                title="Odsłuchaj po angielsku (1.0x)"
                className="px-2.5 py-2 rounded-xl font-bold text-white text-sm cursor-pointer"
                style={{ background: 'var(--primary)' }}
              >
                🔊 EN
              </button>
              <button
                type="button"
                onClick={() => speakEn(cur.audioEn!, 0.72)}
                title="Odsłuchaj powoli (0.75x)"
                className="px-2 py-2 rounded-xl font-bold text-xs border cursor-pointer"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                🐢
              </button>
            </div>
          )}
        </div>

        {/* Prompt-Bank UI */}
        {cur.type === 'prompt-bank' && cur.bankTokens && (
          <div className="mt-4">
            <div
              className="min-h-14 p-3 rounded-xl border-2 border-dashed flex flex-wrap gap-2 items-center mb-4"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              {pickedChunks.length === 0 && (
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  Klikaj angielskie bloki poniżej, aby ułożyć kompletną instrukcję...
                </span>
              )}
              {pickedChunks.map((tokenIdx, pos) => (
                <button
                  key={`${tokenIdx}-${pos}`}
                  type="button"
                  disabled={Boolean(checked)}
                  onClick={() => {
                    setPickedChunks((prev) => prev.filter((_, i) => i !== pos));
                  }}
                  className="px-3 py-1.5 rounded-xl font-bold text-sm border-2 cursor-pointer"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--primary)',
                    color: 'var(--text)'
                  }}
                >
                  {cur.bankTokens![tokenIdx]}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {cur.bankTokens.map((tok, tIdx) => {
                const isUsed = pickedChunks.includes(tIdx);
                return (
                  <button
                    key={tIdx}
                    type="button"
                    disabled={isUsed || Boolean(checked)}
                    onClick={() => {
                      speakEn(tok, 1.0);
                      setPickedChunks((prev) => [...prev, tIdx]);
                    }}
                    className={`px-3.5 py-2 rounded-xl font-bold text-sm border-2 transition-all cursor-pointer ${
                      isUsed ? 'opacity-35 cursor-default' : ''
                    }`}
                    style={{
                      background: 'var(--surface)',
                      borderColor: 'var(--border)',
                      borderBottomWidth: '4px'
                    }}
                  >
                    {tok}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Multiple Choice Options UI */}
        {cur.options && (
          <div className="grid grid-cols-1 gap-2.5 mt-4">
            {cur.options.map((opt, oIdx) => {
              const isSelected = selectedOpt === oIdx;
              const isCorrectAnswer = checked && oIdx === cur.correctIndex;
              const isWrongSelection = checked && isSelected && oIdx !== cur.correctIndex;

              let borderCol = 'var(--border)';
              let bgCol = 'var(--surface)';
              if (isCorrectAnswer) {
                borderCol = 'var(--good)';
                bgCol = 'var(--good-bg)';
              } else if (isWrongSelection) {
                borderCol = 'var(--bad)';
                bgCol = 'var(--bad-bg)';
              } else if (isSelected) {
                borderCol = 'var(--primary)';
                bgCol = 'var(--tip-bg)';
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={Boolean(checked)}
                  onClick={() => {
                    setSelectedOpt(oIdx);
                    speakEn(opt, 1.0);
                  }}
                  className="p-3.5 rounded-xl border-2 text-left font-bold text-sm flex items-center gap-3 transition-all cursor-pointer"
                  style={{
                    borderColor: borderCol,
                    borderBottomWidth: '4px',
                    background: bgCol,
                    color: 'var(--text)'
                  }}
                >
                  <kbd
                    className="px-2 py-0.5 rounded text-xs font-extrabold mono shrink-0"
                    style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}
                  >
                    {oIdx + 1}
                  </kbd>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback Banner */}
        {checked && (
          <div
            className="mt-4 p-4 rounded-xl border-2 flex items-start gap-3"
            style={{
              background: checked.isCorrect ? 'var(--good-bg)' : 'var(--bad-bg)',
              borderColor: checked.isCorrect ? 'var(--good)' : 'var(--bad)'
            }}
          >
            <VibeKurakSvg mood={checked.isCorrect ? 'proud' : 'think'} size={46} />
            <div className="flex-1 text-sm">
              <div
                className="font-extrabold text-base"
                style={{ color: checked.isCorrect ? 'var(--good)' : 'var(--bad)' }}
              >
                {checked.isCorrect ? '✅ Excellent Vibe! Poprawna odpowiedź!' : '❌ Sprawdź poprawną specyfikację po angielsku:'}
              </div>
              {!checked.isCorrect && (
                <div className="font-bold mt-1">
                  Correct: <span className="underline">{checked.correctText}</span>
                </div>
              )}
              <div className="mt-1" style={{ color: 'var(--text)' }}>
                {cur.explanationEn}
              </div>
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="mt-5 flex justify-end">
          {!checked ? (
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleCheck}
              className="px-6 py-2.5 rounded-xl font-extrabold text-white text-sm cursor-pointer disabled:opacity-50"
              style={{ background: 'var(--primary)' }}
            >
              Sprawdź odpowiedź · Check ▶
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl font-extrabold text-white text-sm cursor-pointer"
              style={{ background: checked.isCorrect ? 'var(--good)' : 'var(--primary)' }}
            >
              {idx + 1 >= exercises.length ? 'Zakończ lekcję 🏁' : 'Dalej · Next ▶'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
