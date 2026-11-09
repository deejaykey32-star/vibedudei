import { TOPICS, DomainKey } from './wheelTopics';

export type VibeLevel = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6';

export const COURSE_LEVELS: VibeLevel[] = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

export interface LevelPlanItem {
  level: VibeLevel;
  badgeName: string;
  weeks: [number, number];
  goalPl: string;
  goalEn: string;
  focusAreas: string[];
}

export const LEVEL_PLAN: LevelPlanItem[] = [
  {
    level: 'V1',
    badgeName: 'V1 · Prompt Novice',
    weeks: [1, 16],
    goalPl: 'Fundamenty Vibe Codingu: precyzyjne prompty po angielsku, komponenty UI, podstawy SEO/Copywritingu oraz rola Project/Product Managera.',
    goalEn: 'Master core English prompting, UI component generation, foundational SEO/Copywriting, and PM/PO fundamentals.',
    focusAreas: ['r1', 'r2', 'g1', 'g2', 'b1', 'b2', 'm1', 'm2']
  },
  {
    level: 'V2',
    badgeName: 'V2 · App Builder',
    weeks: [17, 34],
    goalPl: 'Budowa pełnych aplikacji Full-Stack z AI, REST API, wideo i audio AI, kampanie Paid Ads oraz praca jako Scrum Master i Product Owner.',
    goalEn: 'Build full-stack web apps with AI, REST APIs, generative video/audio, paid social funnels, and Scrum accountabilities.',
    focusAreas: ['r3', 'r4', 'g3', 'g5', 'g6', 'b3', 'b4', 'm3', 'm4']
  },
  {
    level: 'V3',
    badgeName: 'V3 · Context Architect',
    weeks: [35, 52],
    goalPl: 'Agenci AI (MCP), bazy SQL i Vector RAG, testy TDD, grafika 3D Three.js, CRO, analityka oraz certyfikacje PMP, PRINCE2, PSM i PSPO.',
    goalEn: 'Architect AI Agents (MCP), Vector RAG databases, automated TDD, 3D WebGL scenes, CRO experiments, and PMP/PRINCE2/PSM/PSPO prep.',
    focusAreas: ['r5', 'r6', 'r7', 'g4', 'g7', 'g8', 'b5', 'b6', 'b7', 'm5', 'm6', 'm7']
  },
  {
    level: 'V4',
    badgeName: 'V4 · System Orchestrator',
    weeks: [53, 70],
    goalPl: 'DevOps CI/CD, aplikacje mobilne PWA, edycja foto AI, typografia, interaktywne lead magnety, e-commerce oraz SAFe i Kanban.',
    goalEn: 'Orchestrate CI/CD pipelines, offline-first PWAs, AI retouching, design typography, PLG lead magnets, SAFe Agile, and Kanban flow.',
    focusAreas: ['r8', 'r9', 'g9', 'g11', 'b8', 'b9', 'm8', 'm9']
  },
  {
    level: 'V5',
    badgeName: 'V5 · Principal Vibe Engineer',
    weeks: [71, 88],
    goalPl: 'Bezpieczeństwo OAuth/RBAC i obrona przed Prompt Injection, automatyzacja Python, WebXR, produkcja wideo, YouTube Growth, OKR i ryzyka.',
    goalEn: 'Harden AI security guardrails, Python batch pipelines, Spatial WebXR, video production, YouTube funnels, OKRs, and RAID risk management.',
    focusAreas: ['r10', 'r11', 'g10', 'g12', 'b10', 'b11', 'm10', 'm11']
  },
  {
    level: 'V6',
    badgeName: 'V6 · AI-Native Leader',
    weeks: [89, 104],
    goalPl: 'Architektura heksagonalna, refaktoryzacja dużych systemów, autonomiczne potoki MarTech oraz strategia AI, EU AI Act i ISO 42001.',
    goalEn: 'Lead hexagonal system architecture, legacy AI refactoring, autonomous MarTech stacks, token economics, and ISO 42001 governance.',
    focusAreas: ['r12', 'b12', 'm12']
  }
];

export function getWeekPlan(weekNum: number) {
  const w = Math.max(1, Math.min(104, weekNum));
  const found = LEVEL_PLAN.find((p) => w >= p.weeks[0] && w <= p.weeks[1]) || LEVEL_PLAN[0];
  const topicIdx = (w - 1) % TOPICS.length;
  const topic = TOPICS[topicIdx];
  return {
    week: w,
    level: found.level,
    badgeName: found.badgeName,
    goalPl: found.goalPl,
    goalEn: found.goalEn,
    topic
  };
}

export const COURSE_LESSON_TYPES = [
  { key: 'concepts', titlePl: 'Pojęcia i Prompty', titleEn: 'Concepts & Prompts', icon: '🧩' },
  { key: 'patterns', titlePl: 'Budowa Specyfikacji', titleEn: 'Spec Construction', icon: '🧱' },
  { key: 'review', titlePl: 'Code & Prompt Review', titleEn: 'AI Code & Spec Review', icon: '🔍' },
  { key: 'video', titlePl: 'Wideo z YouTube (3x)', titleEn: 'YouTube Video Hub', icon: '🎬' },
  { key: 'test', titlePl: 'Sprawdzian Modułu', titleEn: 'Unit Boss Test', icon: '🏆' }
] as const;

export interface CircleStep {
  id: string;
  icon: string;
  titlePl: string;
  titleEn: string;
  minutes: number;
  descPl: string;
  targetSection: string;
}

export const CIRCLE_STEPS: CircleStep[] = [
  {
    id: 'srs-warmup',
    icon: '🧠',
    titlePl: 'Powtórka SRS (Pamięć)',
    titleEn: 'Spaced Repetition Warmup',
    minutes: 5,
    descPl: 'Powtórz na głos angielskie terminy Vibe Codingu, wzorce promptów i pojęcia certyfikacyjne z fiszek SRS.',
    targetSection: 'review'
  },
  {
    id: 'yt-immersion',
    icon: '🎬',
    titlePl: 'Wideo z Koła Tematów',
    titleEn: 'English Video Immersion',
    minutes: 7,
    descPl: 'Obejrzyj anglojęzyczny materiał z wybranej dziedziny (Red/Green/Blue/White) i rozwiąż quiz zrozumienia.',
    targetSection: 'topics'
  },
  {
    id: 'course-node',
    icon: '🎓',
    titlePl: 'Lekcja w Kursie V1→V6',
    titleEn: 'Interactive Course Lesson',
    minutes: 6,
    descPl: 'Ukończ jedno kółko lekcyjne w ścieżce kursu (układanie promptów, wybór architektury, naprawa błędów).',
    targetSection: 'course'
  },
  {
    id: 'voice-shadowing',
    icon: '🗣️',
    titlePl: 'Voice Prompt Shadowing',
    titleEn: 'Speak English Specs Aloud',
    minutes: 4,
    descPl: 'Powtarzaj na głos za lektorem angielskie specyfikacje techniczne, kryteria Given/When/Then oraz statusy Scrum.',
    targetSection: 'shadowing'
  },
  {
    id: 'prompt-grammar',
    icon: '📐',
    titlePl: 'Składnia Promptu / Framework',
    titleEn: 'Prompt Syntax & Frameworks',
    minutes: 4,
    descPl: 'Przećwicz jeden framework strukturalny (CO-STAR, CRISPE, INVEST, RACI, EVM) z mini-quizem.',
    targetSection: 'grammar'
  },
  {
    id: 'five-prompts',
    icon: '✍️',
    titlePl: '5 Promptów Dziennie',
    titleEn: 'Write 5 English Prompts',
    minutes: 4,
    descPl: 'Napisz po angielsku 5 precyzyjnych promptów lub User Stories z dzisiejszego projektu i odbierz ocenę.',
    targetSection: 'five-sentences'
  }
];

export interface GrammarTopic {
  id: string;
  level: VibeLevel;
  domain: DomainKey;
  titleEn: string;
  titlePl: string;
  formula: string;
  rulePl: string;
  pyramidRows: [string, string, string][];
  examples: { en: string; pl: string }[];
  quiz: { q: string; options: string[]; answer: number; explanationEn: string }[];
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'costar',
    level: 'V1',
    domain: 'R',
    titleEn: 'CO-STAR Prompt Architecture',
    titlePl: 'Struktura CO-STAR: Kontekst, Cel, Styl, Ton, Odbiorca, Format odpowiedzi',
    formula: '[Context] + [Objective] + [Style/Tone] + [Audience] + [Response Format]',
    rulePl: 'Zamiast pisać jedno ogólnikowe zdanie, podaj modelowi 6 precyzyjnych warstw CO-STAR po angielsku. Najważniejsze: zawsze określ dokładny format wyjściowy (np. TypeScript interface, JSON Schema, tabela markdown).',
    pyramidRows: [
      ['CONTEXT & ROLE', 'Szerokie tło systemu i rola eksperta', 'Act as a Senior Full-Stack TypeScript Architect working on a Vite + React 19 SaaS app...'],
      ['OBJECTIVE & CONSTRAINTS', 'Konkretne zadanie i twarde ograniczenia', 'Implement a debounced search hook with zero external dependencies and strict null checks...'],
      ['RESPONSE SCHEMA', 'Dokładny kształt kodu lub JSON na wyjściu', 'Return only the complete TypeScript file with JSDoc comments and unit test assertions.']
    ],
    examples: [
      {
        en: 'Context: React 19 + Tailwind v4 app. Objective: Create a responsive PricingTable component. Constraints: Use tabular-nums for all prices and include an annual 20% discount toggle.',
        pl: 'Kontekst: aplikacja React 19 + Tailwind v4. Cel: Stwórz responsywny komponent PricingTable. Ograniczenia: Użyj tabular-nums dla wszystkich cen i dodaj przełącznik zniżki rocznej 20%.'
      },
      {
        en: 'Context: Express API route. Objective: Validate POST /api/orders payload with Zod. Response Format: Return HTTP 400 with field-level errors if validation fails.',
        pl: 'Kontekst: trasa API Express. Cel: Zwaliduj ładunek POST /api/orders przez Zod. Format odpowiedzi: Zwróć HTTP 400 z błędami pól, jeśli walidacja się nie powiedzie.'
      }
    ],
    quiz: [
      {
        q: 'In the CO-STAR framework, what does the "R" (Response) block specify?',
        options: [
          'The exact output structure required (e.g., TypeScript module, JSON schema, or Gherkin table)',
          'Randomly restarting the computer',
          'Removing all comments from the project',
          'Running without electricity'
        ],
        answer: 0,
        explanationEn: 'Specifying the Response format eliminates ambiguity and ensures the output plugs directly into your codebase.'
      }
    ]
  },
  {
    id: 'gherkin-bdd',
    level: 'V2',
    domain: 'M',
    titleEn: 'Given / When / Then (Executable Specs)',
    titlePl: 'Kryteria akceptacji Gherkin (Given / When / Then) dla Product Ownera i Agentów AI',
    formula: 'Given [Initial Context/State] → When [User/System Action] → Then [Verifiable Outcome]',
    rulePl: 'Zarówno w pracy Product Ownera (PSPO), jak i w Vibe Codingu, specyfikacja w formacie Given-When-Then eliminuje niedomówienia i pozwala AI wygenerować jednocześnie kod oraz testy automatyczne.',
    pyramidRows: [
      ['GIVEN (Precondition)', 'Stan początkowy systemu i dane wejściowe', 'Given an authenticated learner with 3 due SRS flashcards...'],
      ['WHEN (Trigger Action)', 'Konkretna akcja użytkownika lub wywołanie API', 'When the learner clicks the "Good" button on the final flashcard...'],
      ['THEN (Observable Postcondition)', 'Weryfikowalny rezultat w UI oraz bazie danych', 'Then the streak increments by 1 and +15 XP is persisted in storage.']
    ],
    examples: [
      {
        en: 'Given a shopping cart totaling $85, when the user applies promo code "VIBE20", then the total updates to $68.00 and displays the discount line item.',
        pl: 'Mając koszyk o wartości 85$, gdy użytkownik zastosuje kod „VIBE20”, wtedy suma zmienia się na 68,00$ i wyświetla pozycję rabatu.'
      },
      {
        en: 'Given a Kanban column with a WIP limit of 3 and 3 active cards, when a developer drags a 4th card into the column, then the board blocks the drop and highlights the WIP warning.',
        pl: 'Mając kolumnę Kanban z limitem WIP równym 3 oraz 3 aktywnymi kartami, gdy deweloper przeciąga 4. kartę, tablica blokuje upuszczenie i wyświetla ostrzeżenie WIP.'
      }
    ],
    quiz: [
      {
        q: 'Which part of a Gherkin specification describes the testable result that must be verified?',
        options: ['THEN [Verifiable Outcome]', 'GIVEN [Initial State]', 'MAYBE [Optional Idea]', 'SOMEDAY [Future Wish]'],
        answer: 0,
        explanationEn: 'The THEN clause defines the observable assertion that both QA engineers and AI test runners verify.'
      }
    ]
  },
  {
    id: 'visual-prompt-syntax',
    level: 'V2',
    domain: 'G',
    titleEn: 'Visual & 3D Prompt Syntax (Subject-Light-Optics)',
    titlePl: 'Składnia promptów wizualnych i 3D: Obiekt → Światło → Optyka → Materiał',
    formula: '[Subject & Action] + [Environment & Surface] + [Lighting & Atmosphere] + [Camera/Lens & Aspect Ratio]',
    rulePl: 'Generując grafikę, wideo lub sceny 3D po angielsku, buduj zdanie od głównego obiektu, przez materiał powierzchni (np. travertine, brushed aluminum), kierunek światła (soft diffused rim light), aż po parametry optyki (35mm f/1.8, isometric).',
    pyramidRows: [
      ['SUBJECT & MATERIAL', 'Główny obiekt i fizyczna faktura powierzchni', 'Minimalist wireless headphones in matte anodized slate aluminum...'],
      ['LIGHTING & ENVIRONMENT', 'Kierunek, miękkość i temperatura światła', 'Resting on warm travertine stone under soft golden-hour side lighting...'],
      ['OPTICS & FRAMING', 'Kąt kamery, ogniskowa i głębia ostrości', '85mm studio macro lens, shallow depth of field, 16:9 aspect ratio.']
    ],
    examples: [
      {
        en: 'Clean isometric 3D diagram of a cloud microservices cluster, translucent glass nodes with glowing cyan data pulses, dark slate blueprint background, crisp studio rim light.',
        pl: 'Czysty izometryczny diagram 3D klastra mikroserwisów chmurowych, półprzezroczyste szklane węzły z impulsami danych, ciemne łupkowe tło blueprintu, ostre światło konturowe.'
      },
      {
        en: 'High-contrast editorial portrait of a software architect sketching on a glass whiteboard, natural window shadows, Leica 35mm documentary aesthetic.',
        pl: 'Kontrastowy portret edytorski architekta oprogramowania szkicującego na szklanej tablicy, naturalne cienie z okna, dokumentalna estetyka Leica 35mm.'
      }
    ],
    quiz: [
      {
        q: 'Which phrase specifies Lighting and Optics in an English visual prompt?',
        options: [
          '"Soft diffused side lighting, 50mm lens, shallow depth of field"',
          '"Make it nice please"',
          '"SELECT * FROM images WHERE id = 1"',
          '"Sprint Retrospective timebox 3 hours"'
        ],
        answer: 0,
        explanationEn: 'Specifying light diffusion, focal length (50mm), and depth of field gives precise photographic control.'
      }
    ]
  },
  {
    id: 'pas-copy-syntax',
    level: 'V3',
    domain: 'B',
    titleEn: 'PAS & Value Stack Copywriting Syntax',
    titlePl: 'Składnia tekstów konwertujących w E-Marketingu: Problem → Agitate → Solve + Proof',
    formula: '[Specific Pain Hook] → [Cost of Inaction] → [Mechanism of Solution] → [Quantified Proof + CTA]',
    rulePl: 'Skuteczny prompt copywriterski w języku angielskim nigdy nie brzmi „napisz post”. Musi zdefiniować ból grupy docelowej, koszt braku działania, konkretny mechanizm rozwiązania oraz liczbowy dowód słuszności.',
    pyramidRows: [
      ['PROBLEM & AGITATION', 'Nazwij konkretne wąskie gardło i jego koszt w czasie/pieniądzach', 'Spending 6 hours manually syncing translation JSON files across every release?'],
      ['SOLUTION MECHANISM', 'Pokaż jak produkt rozwiązuje problem w 1 kroku', 'Our CLI pre-commit hook auto-translates and type-checks new keys in 4 seconds.'],
      ['PROOF & ACTION CTA', 'Liczbowy dowód i jednoznaczne wezwanie do działania', 'Used by 1,400+ engineering teams · Run npx vibe-i18n init for free.']
    ],
    examples: [
      {
        en: 'Stop losing 40% of mobile shoppers to slow 6-step checkouts. Enable one-tap Express Checkout in 5 minutes and lift mobile conversion by +28%.',
        pl: 'Przestań tracić 40% mobilnych kupujących przez powolny 6-etapowy koszyk. Włącz płatność jednym dotknięciem w 5 minut i podnieś konwersję mobilną o +28%.'
      }
    ],
    quiz: [
      {
        q: 'In the PAS copywriting formula, what is the role of the "Agitate" step?',
        options: [
          'Highlighting the tangible frustration, wasted time, or financial cost of leaving the problem unsolved',
          'Deleting the call-to-action button',
          'Writing in an unreadable font',
          'Insulting the customer'
        ],
        answer: 0,
        explanationEn: 'Agitation makes the cost of the status quo vivid before introducing your product as the relief.'
      }
    ]
  },
  {
    id: 'pmp-evm-governance',
    level: 'V3',
    domain: 'M',
    titleEn: 'PMI / PRINCE2 / Scrum Governance Syntax',
    titlePl: 'Formuły i składnia decyzyjna w certyfikacjach PMP, PRINCE2, PSM oraz PSPO',
    formula: 'CV = EV - AC · SV = EV - PV · CPI = EV / AC · SPI = EV / PV · WSJF = CoD / Size',
    rulePl: 'Na egzaminach PMP, CAPM, PRINCE2 oraz PSPO/SAFe kluczem jest znajomość precyzyjnych angielskich terminów: Earned Value (EV) jest zawsze na pierwszym miejscu we wzorach EVM! W ułamkach (CPI, SPI) EV jest zawsze w liczniku.',
    pyramidRows: [
      ['EARNED VALUE (EV FIRST!)', 'W każdym wzorze EVM zaczynamy od Earned Value (EV)', 'CPI = EV / AC (Cost) · SPI = EV / PV (Schedule) · > 1.0 means GOOD!'],
      ['SCRUM COMMITMENTS', 'Każdy z 3 artefaktów Scrum ma dokładnie 1 zobowiązanie', 'Product Backlog → Product Goal · Sprint Backlog → Sprint Goal · Increment → Definition of Done'],
      ['PRINCE2 TOLERANCES', '6 obszarów tolerancji do zarządzania przez wyjątki', 'Time · Cost · Quality · Scope · Risk · Benefit (Manage by Exception)']
    ],
    examples: [
      {
        en: 'If Earned Value (EV) = $80,000 and Actual Cost (AC) = $100,000, then CPI = 0.80, meaning we only get $0.80 of value for every $1.00 spent (over budget).',
        pl: 'Jeśli wartość wypracowana (EV) = 80 000$, a koszt rzeczywisty (AC) = 100 000$, to CPI = 0,80, co oznacza przekroczenie budżetu.'
      }
    ],
    quiz: [
      {
        q: 'What is the universal memory trick for all Earned Value Management (EVM) variance and index formulas on the PMP exam?',
        options: [
          'EV (Earned Value) ALWAYS comes first (left side of subtraction, top numerator of division)',
          'AC always comes first',
          'Multiply everything by zero',
          'Subtract taxes from Story Points'
        ],
        answer: 0,
        explanationEn: 'In CV = EV - AC, SV = EV - PV, CPI = EV / AC, and SPI = EV / PV, Earned Value (EV) ALWAYS comes first!'
      }
    ]
  }
];

export interface PolysemyWord {
  id: string;
  word: string;
  pronunciationHint: string;
  meanings: {
    domain: DomainKey;
    emoji: string;
    titlePl: string;
    definitionEn: string;
    exampleEn: string;
  }[];
}

export const POLYSEMY_WORDS: PolysemyWord[] = [
  {
    id: 'token',
    word: 'Token',
    pronunciationHint: '/ˈtoʊ.kən/ · 4 znaczenia w Vibe Codingu',
    meanings: [
      {
        domain: 'R',
        emoji: '🤖',
        titlePl: 'Jednostka tekstu w modelu LLM lub token autoryzacji JWT',
        definitionEn: 'A sub-word unit processed by an LLM (~4 characters) OR a cryptographic bearer credential (JWT).',
        exampleEn: 'Our system prompt uses 1,200 context tokens, and the API verifies the JWT Bearer token.'
      },
      {
        domain: 'G',
        emoji: '🎨',
        titlePl: 'Design Token (zmienna koloru, odstępu lub typografii w UI)',
        definitionEn: 'A named design variable storing a semantic color, spacing scale, or radius across Figma and CSS.',
        exampleEn: 'Bind the card background to the --surface-2 design token for automatic dark mode support.'
      },
      {
        domain: 'B',
        emoji: '✉️',
        titlePl: 'Personalization Token (zmienna dynamiczna w e-mailu/reklamie)',
        definitionEn: 'A dynamic merge tag (e.g., {{first_name}} or {{company}}) injected into CRM emails or landing pages.',
        exampleEn: 'Insert the {{company_name}} personalization token in the onboarding email subject line.'
      },
      {
        domain: 'M',
        emoji: '🎟️',
        titlePl: 'Karta / żeton limitu pracy lub głosu w priorytetyzacji Agile',
        definitionEn: 'A capacity unit in Kanban WIP allocation or dot-voting budget during Sprint Retrospectives and PI Planning.',
        exampleEn: 'Each stakeholder receives three prioritization tokens to allocate across candidate epics.'
      }
    ]
  },
  {
    id: 'pipeline',
    word: 'Pipeline',
    pronunciationHint: '/ˈpaɪp.laɪn/ · 4 znaczenia w Vibe Codingu',
    meanings: [
      {
        domain: 'R',
        emoji: '🚀',
        titlePl: 'Potok CI/CD lub potok przetwarzania danych (ETL / RAG)',
        definitionEn: 'An automated sequence of build/test/deploy stages (CI/CD) or data ingestion/embedding steps.',
        exampleEn: 'The GitHub Actions CI/CD pipeline runs typechecking and deploys to Cloud Run in 90 seconds.'
      },
      {
        domain: 'G',
        emoji: '🧊',
        titlePl: 'Potok renderowania grafiki 3D (Graphics Rendering Pipeline)',
        definitionEn: 'The GPU sequence transforming 3D vertices, shaders, and lighting into 2D screen pixels.',
        exampleEn: 'Add a bloom pass at the end of the WebGL post-processing rendering pipeline.'
      },
      {
        domain: 'B',
        emoji: '💰',
        titlePl: 'Lejek sprzedaży i wartość otwartych szans w CRM (Sales Pipeline)',
        definitionEn: 'The total monetary value of qualified leads and active deals progressing toward purchase.',
        exampleEn: 'Our interactive ROI calculator generated $180,000 in qualified B2B sales pipeline this quarter.'
      },
      {
        domain: 'M',
        emoji: '📋',
        titlePl: 'Portfel inicjatyw i roadmapa projektów w organizacji',
        definitionEn: 'The prioritized queue of upcoming portfolio initiatives awaiting governance approval and capacity.',
        exampleEn: 'The PMO reviewed the Q4 project pipeline to align engineering capacity with strategic OKRs.'
      }
    ]
  },
  {
    id: 'agent',
    word: 'Agent',
    pronunciationHint: '/ˈeɪ.dʒənt/ · 4 znaczenia w Vibe Codingu',
    meanings: [
      {
        domain: 'R',
        emoji: '🤖',
        titlePl: 'Autonomiczny Agent AI wywołujący narzędzia w pętli ReAct',
        definitionEn: 'An LLM system equipped with tools, memory, and planning that executes multi-step coding or research tasks.',
        exampleEn: 'The coding agent inspected the compiler error, edited the file, and verified the fix.'
      },
      {
        domain: 'G',
        emoji: '🕺',
        titlePl: 'Autonomiczna postać w symulacji 3D lub grze (NavMesh Agent)',
        definitionEn: 'An animated 3D entity steering around obstacles using pathfinding in a game or simulation.',
        exampleEn: 'Each crowd agent calculates collision avoidance along the 3D navigation mesh.'
      },
      {
        domain: 'B',
        emoji: '💬',
        titlePl: 'Konwersacyjny asystent sprzedaży i kwalifikacji leadów 24/7',
        definitionEn: 'An automated growth workflow that enriches inbound leads, answers product questions, and books demos.',
        exampleEn: 'Our inbound SDR agent qualifies enterprise leads within 30 seconds of form submission.'
      },
      {
        domain: 'M',
        emoji: '🔄',
        titlePl: 'Change Agent (Lider zmiany organizacyjnej w Scrum/ADKAR)',
        definitionEn: 'A Scrum Master or Agile leader who catalyzes cultural and process improvements across the organization.',
        exampleEn: 'As a servant leader and change agent, the Scrum Master coached the department on empirical planning.'
      }
    ]
  },
  {
    id: 'conversion',
    word: 'Conversion',
    pronunciationHint: '/kənˈvɜːr.ʒən/ · 4 znaczenia w Vibe Codingu',
    meanings: [
      {
        domain: 'R',
        emoji: '🔄',
        titlePl: 'Konwersja typów danych lub migracja kodu (Type Conversion)',
        definitionEn: 'Transforming data from one type or schema to another, or porting legacy code to TypeScript.',
        exampleEn: 'Use explicit number conversion and schema parsing when reading URL query parameters.'
      },
      {
        domain: 'G',
        emoji: '🖼️',
        titlePl: 'Konwersja formatów multimediów (np. PNG → WebP / Figma → Kod)',
        definitionEn: 'Transcoding media assets into optimized web formats or turning vector wireframes into React components.',
        exampleEn: 'Batch image conversion from PNG to AVIF reduced hero asset weight by 72%.'
      },
      {
        domain: 'B',
        emoji: '🎯',
        titlePl: 'Konwersja marketingowa (wykonanie pożądanej akcji przez użytkownika)',
        definitionEn: 'The percentage of visitors who complete a target goal such as starting a trial or purchasing.',
        exampleEn: 'Adding an interactive live preview increased landing page conversion from 2.8% to 5.4%.'
      },
      {
        domain: 'M',
        emoji: '🏗️',
        titlePl: 'Wdrożenie i przejście na nowy system (System Cutover / Conversion)',
        definitionEn: 'In project management (PMP/PRINCE2), transitioning users from a legacy platform to the newly delivered system.',
        exampleEn: 'We scheduled a parallel-run system conversion to minimize operational risk during launch.'
      }
    ]
  },
  {
    id: 'frame',
    word: 'Frame',
    pronunciationHint: '/freɪm/ · 4 znaczenia w Vibe Codingu',
    meanings: [
      {
        domain: 'R',
        emoji: '🖧',
        titlePl: 'Ramka stosu wywołań (Stack Frame) lub WebSocket Frame',
        definitionEn: 'A function execution entry on the call stack or a data packet transmitted over a WebSocket connection.',
        exampleEn: 'Inspect the top stack frame in the debugger to see the exact variable state at crash time.'
      },
      {
        domain: 'G',
        emoji: '🎞️',
        titlePl: 'Kontener układu w Figma (Frame) lub klatka animacji (60 FPS)',
        definitionEn: 'A top-level layout artboard in Figma OR a single rendered image in a 60-frames-per-second animation.',
        exampleEn: 'Keep every render frame under 16.6 milliseconds for smooth 60fps motion.'
      },
      {
        domain: 'B',
        emoji: '🧠',
        titlePl: 'Ramowanie przekazu i wartości (Cognitive Framing w psychologii cen)',
        definitionEn: 'Presenting an offer in a context that highlights its value (e.g., framing $30/mo as "$1 a day").',
        exampleEn: 'Frame the annual plan around hours saved per week rather than raw feature counts.'
      },
      {
        domain: 'M',
        emoji: '🧭',
        titlePl: 'Problem Framing (Zdefiniowanie granic problemu w Product Discovery)',
        definitionEn: 'Structuring an ambiguous business challenge into a clear problem statement, target persona, and success metric.',
        exampleEn: 'Before jumping to solutions, spend thirty minutes on collaborative problem framing with stakeholders.'
      }
    ]
  }
];

export interface StoryItem {
  id: string;
  level: VibeLevel;
  domain: DomainKey;
  titleEn: string;
  titlePl: string;
  emoji: string;
  paragraphs: { en: string; pl: string }[];
  glossary: { en: string; pl: string }[];
  questions: { q: string; options: string[]; answer: number }[];
}

export const STORIES: StoryItem[] = [
  {
    id: 'story-weekend-saas',
    level: 'V1',
    domain: 'R',
    titleEn: 'How Maya Shipped a Full-Stack SaaS in 48 Hours with Vibe Coding',
    titlePl: 'Jak Maya wdrożyła aplikację SaaS w 48 godzin dzięki Vibe Codingowi',
    emoji: '🚀',
    paragraphs: [
      {
        en: 'On Friday evening, Maya noticed her freelance design clients always struggled to collect structured feedback on website prototypes. Instead of spending three weeks writing boilerplate code, she opened her Vibe Coding workspace and drafted a crisp one-page specification in English.',
        pl: 'W piątkowy wieczór Maya zauważyła, że jej klienci zawsze mieli problem ze zbieraniem uporządkowanych opinii o prototypach stron. Zamiast spędzać trzy tygodnie na pisaniu powtarzalnego kodu, otworzyła środowisko Vibe Codingu i napisała po angielsku zwięzłą, jednostronicową specyfikację.'
      },
      {
        en: 'She divided her build into three disciplined passes. In Pass 1, she defined the TypeScript interfaces and database schema. In Pass 2, she prompted the AI to generate idempotent API routes with Zod validation. In Pass 3, she crafted a clean React interface following the 60-30-10 color rule.',
        pl: 'Podzieliła budowę na trzy zdyscyplinowane etapy. W etapie 1 zdefiniowała interfejsy TypeScript i schemat bazy. W etapie 2 poprosiła AI o wygenerowanie idempotentnych tras API z walidacją Zod. W etapie 3 stworzyła czysty interfejs React zgodny z regułą kolorów 60-30-10.'
      },
      {
        en: 'Whenever a compiler error appeared, Maya didn’t panic—she pasted the exact stack trace back into the context window. By Sunday afternoon, her app passed all automated tests, deployed to Cloud Run, and signed up its first twelve paying teams.',
        pl: 'Ilekroć pojawiał się błąd kompilatora, Maya nie panikowała — wklejała dokładny zrzut błędu z powrotem do okna kontekstowego. Do niedzielnego popołudnia jej aplikacja przeszła wszystkie testy automatyczne, została wdrożona na Cloud Run i zdobyła pierwsze dwanaście płacących zespołów.'
      }
    ],
    glossary: [
      { en: 'Boilerplate code', pl: 'Powtarzalny kod szablonowy' },
      { en: 'Idempotent API route', pl: 'Trasa API bezpieczna przy wielokrotnym wywołaniu' },
      { en: 'Stack trace', pl: 'Zrzut stosu wywołań wskazujący miejsce błędu' }
    ],
    questions: [
      {
        q: 'How did Maya structure her Vibe Coding workflow to ship reliably in 48 hours?',
        options: [
          'She wrote a clear English spec first and executed 3 structured passes: Schema/Types -> API/Validation -> UI',
          'She pasted a 10,000-line random file without testing',
          'She skipped TypeScript and deployed broken code',
          'She waited six months for a committee meeting'
        ],
        answer: 0
      },
      {
        q: 'What did Maya do when a compiler error occurred?',
        options: [
          'She fed the exact stack trace back into the AI context window for self-healing',
          'She threw away her laptop',
          'She deleted all CSS files',
          'She ignored the error and shut down the server'
        ],
        answer: 0
      }
    ]
  },
  {
    id: 'story-scrum-turnaround',
    level: 'V2',
    domain: 'M',
    titleEn: 'The Product Owner Who Replaced 40-Page PRDs with Live Prototypes',
    titlePl: 'Product Owner, który zastąpił 40-stronicowe dokumenty żywymi prototypami',
    emoji: '👑',
    paragraphs: [
      {
        en: 'Liam was a certified PSPO II Product Owner leading a cross-functional Scrum team of eight developers. For months, Sprint Planning meetings dragged on because stakeholders interpreted static 40-page text documents differently.',
        pl: 'Liam był certyfikowanym Product Ownerem (PSPO II) prowadzącym interdyscyplinarny zespół Scrum złożony z ośmiu deweloperów. Przez miesiące spotkania Sprint Planning ciągnęły się godzinami, ponieważ interesariusze różnie interpretowali statyczne, 40-stronicowe dokumenty.'
      },
      {
        en: 'Before the next Product Backlog Refinement, Liam used Vibe Coding to build a clickable React prototype in forty minutes, paired with three Given-When-Then acceptance criteria. During the session, users interacted with the real flow and spotted a missing edge case in five minutes.',
        pl: 'Przed kolejnym spotkaniem doskonalenia backlogu (Refinement) Liam użył Vibe Codingu, by w 40 minut zbudować klikalny prototyp React połączony z trzema kryteriami Given-When-Then. Podczas sesji użytkownicy przetestowali żywy przepływ i w pięć minut wychwycili brakujący przypadek brzegowy.'
      },
      {
        en: 'Combined with a strict Kanban WIP limit of three items and a focused Sprint Goal, the team cut their average Cycle Time by 45% and passed every Sprint Review with delighted customers.',
        pl: 'W połączeniu ze ścisłym limitem WIP równym 3 oraz wyraźnym Celem Sprintu, zespół skrócił swój średni czas realizacji (Cycle Time) o 45% i zamykał każdy Sprint Review z zachwyconymi klientami.'
      }
    ],
    glossary: [
      { en: 'Product Backlog Refinement', pl: 'Doskonalenie i doprecyzowywanie elementów backlogu' },
      { en: 'Edge case', pl: 'Przypadek brzegowy / nietypowy scenariusz' },
      { en: 'Cycle Time', pl: 'Czas od rozpoczęcia pracy nad zadaniem do jego ukończenia' }
    ],
    questions: [
      {
        q: 'How did Liam eliminate ambiguity during Product Backlog Refinement?',
        options: [
          'By pairing Given-When-Then acceptance criteria with a live, clickable Vibe-Coded prototype',
          'By writing an 80-page unformatted Word document',
          'By cancelling all Sprint Reviews',
          'By removing the Sprint Goal'
        ],
        answer: 0
      }
    ]
  },
  {
    id: 'story-design-3d-launch',
    level: 'V3',
    domain: 'G',
    titleEn: 'Designing an Interactive 3D Product Configurator at 60 FPS',
    titlePl: 'Projektowanie interaktywnego konfiguratora 3D działającego w 60 FPS',
    emoji: '🧊',
    paragraphs: [
      {
        en: 'Elena, a creative technologist, needed to showcase a new line of modular studio speakers online. Static photos felt flat, so she prompted an AI coding assistant to scaffold a Three.js and React Three Fiber viewport with OrbitControls damping.',
        pl: 'Elena, kreatywna technolożka, musiała zaprezentować w sieci nową linię modułowych głośników studyjnych. Statyczne zdjęcia wydawały się płaskie, więc poprosiła asystenta AI o zbudowanie widoku Three.js z płynnym tłumieniem kamery OrbitControls.'
      },
      {
        en: 'To ensure mobile visitors experienced zero lag, she compressed the GLTF models with Draco, clamped the device pixel ratio to 2, and animated UI drawers using only GPU compositor properties (transform and opacity).',
        pl: 'Aby użytkownicy mobilni nie doświadczyli żadnych przycięć, skompresowała modele GLTF algorytmem Draco, ograniczyła pixel ratio do 2 i animowała panele UI wyłącznie za pomocą właściwości kompozytora GPU (transform oraz opacity).'
      },
      {
        en: 'She also added a clean 2D fallback card and tabular-nums pricing counters. Time on page tripled, and the interactive 3D configurator lifted direct checkout conversions by 34%.',
        pl: 'Dodała również czysty widok zastępczy 2D oraz liczniki cen z cyframi tabelarycznymi (tabular-nums). Czas spędzony na stronie potroił się, a interaktywny konfigurator 3D podniósł konwersję zakupową o 34%.'
      }
    ],
    glossary: [
      { en: 'Draco GLTF compression', pl: 'Kompresja geometrii 3D zmniejszająca rozmiar pliku' },
      { en: 'Compositor properties', pl: 'Właściwości CSS (transform, opacity) animowane bezpośrednio przez GPU' },
      { en: 'Tabular numerals', pl: 'Cyfry o stałej szerokości zapobiegające skakaniu układu' }
    ],
    questions: [
      {
        q: 'Which techniques helped Elena keep her 3D web configurator running smoothly at 60 FPS on mobile devices?',
        options: [
          'Draco GLTF compression, clamping pixel ratio to 2, and animating only transform/opacity',
          'Loading 500MB uncompressed textures on every click',
          'Animating width and margin-top on every scroll event',
          'Disabling hardware acceleration'
        ],
        answer: 0
      }
    ]
  },
  {
    id: 'story-plg-growth-engine',
    level: 'V4',
    domain: 'B',
    titleEn: 'Engineering as Marketing: How a Free AI Grader Built a $2M Pipeline',
    titlePl: 'Engineering as Marketing: Jak darmowy Grader AI zbudował lejek o wartości 2 mln $',
    emoji: '📈',
    paragraphs: [
      {
        en: 'Instead of spending $50,000 on generic display banners with a 0.4% click-through rate, growth lead Marcus decided to apply Engineering as Marketing. In one weekend of Vibe Coding, he built a free interactive "Landing Page Clarity & SEO Grader".',
        pl: 'Zamiast wydawać 50 000$ na generyczne banery reklamowe z CTR 0,4%, lider wzrostu Marcus postanowił zastosować Engineering as Marketing. W jeden weekend Vibe Codingu zbudował darmowe interaktywne narzędzie „Landing Page Clarity & SEO Grader”.'
      },
      {
        en: 'Visitors could test their headline, Schema.org JSON-LD markup, and value proposition in ten seconds without a credit card—cutting Time-to-First-Value (TTFV) to near zero. At the bottom of the instant report, a contextual CTA offered a one-click fix inside Marcus’s core platform.',
        pl: 'Odwiedzający mogli przetestować swój nagłówek, dane Schema.org JSON-LD oraz propozycję wartości w dziesięć sekund bez podawania karty — skracając Time-to-First-Value (TTFV) niemal do zera. Na dole raportu kontekstowy przycisk CTA oferował naprawę jednym kliknięciem w głównej platformie Marcusa.'
      },
      {
        en: 'Because the grader included authoritative benchmarks and structured FAQ markup, AI search engines cited it daily (Generative Engine Optimization). Within six months, the micro-tool drove 42,000 organic trials.',
        pl: 'Ponieważ narzędzie zawierało wiarygodne benchmarki oraz ustrukturyzowane FAQ, wyszukiwarki AI cytowały je codziennie (GEO). W ciągu sześciu miesięcy mikro-narzędzie wygenerowało 42 000 organicznych kont próbnych.'
      }
    ],
    glossary: [
      { en: 'Time-to-First-Value (TTFV)', pl: 'Czas od wejścia na stronę do otrzymania pierwszej realnej korzyści' },
      { en: 'Generative Engine Optimization (GEO)', pl: 'Optymalizacja treści pod cytowania przez odpowiedzi AI' },
      { en: 'Engineering as Marketing', pl: 'Tworzenie darmowych narzędzi/kalkulatorów jako motoru pozyskiwania klientów' }
    ],
    questions: [
      {
        q: 'Why did Marcus’s interactive Grader outperform traditional static PDF lead magnets?',
        options: [
          'It delivered instant personalized value (near-zero TTFV) without upfront friction and naturally bridged to the core product',
          'It forced users to fill out a 25-field form before seeing anything',
          'It blocked search engines from indexing the page',
          'It had no call-to-action'
        ],
        answer: 0
      }
    ]
  }
];

export interface CertificationInfo {
  id: string;
  code: string;
  name: string;
  org: string;
  domain: DomainKey;
  emoji: string;
  topicId: string;
  examFormatEn: string;
  keyFormulasOrRulesEn: string[];
  descPl: string;
}

export const CERTIFICATIONS: CertificationInfo[] = [
  {
    id: 'cert-pmp',
    code: 'PMP®',
    name: 'Project Management Professional',
    org: 'PMI (Project Management Institute)',
    domain: 'M',
    emoji: '🏅',
    topicId: 'm5',
    examFormatEn: '180 questions · 230 minutes · 3 Domains: People (42%), Process (50%), Business Environment (8%) · ~50% Agile/Hybrid',
    keyFormulasOrRulesEn: [
      'CPI = EV / AC (>1.0 = under budget) · SPI = EV / PV (>1.0 = ahead of schedule)',
      'Servant Mindset: Assess, analyze, and collaborate with the team before escalating to sponsors',
      'Critical Path = longest sequence of dependent activities determining minimum duration'
    ],
    descPl: 'Najbardziej rozpoznawalny globalnie certyfikat dla Project Managerów (PMBOK 7th Edition + Agile Practice Guide).'
  },
  {
    id: 'cert-capm',
    code: 'CAPM®',
    name: 'Certified Associate in Project Management',
    org: 'PMI (Project Management Institute)',
    domain: 'M',
    emoji: '🎖️',
    topicId: 'm5',
    examFormatEn: '150 questions · 180 minutes · Core PM Fundamentals, Predictive, Agile & Business Analysis',
    keyFormulasOrRulesEn: [
      'Project Charter formally authorizes the project and gives the PM authority to apply resources',
      'WBS (Work Breakdown Structure) is deliverable-oriented, with the Work Package at the lowest level',
      'RACI Matrix: only ONE "A" (Accountable) person per deliverable'
    ],
    descPl: 'Doskonały certyfikat wejściowy PMI otwierający ścieżkę kariery Project Managera i koordynatora projektów IT/AI.'
  },
  {
    id: 'cert-prince2',
    code: 'PRINCE2®',
    name: 'PRINCE2 7th Edition Foundation & Practitioner',
    org: 'PeopleCert / Axelos',
    domain: 'M',
    emoji: '🏛️',
    topicId: 'm6',
    examFormatEn: 'Foundation: 60 questions (60 min, 60% pass) · Practitioner: 70 scenario questions (150 min, open book)',
    keyFormulasOrRulesEn: [
      '7 Principles: Continued Business Justification, Learn from Experience, Roles, Stages, Exception, Products, Tailor',
      '6 Tolerances for Manage by Exception: Time, Cost, Quality, Scope, Risk, Benefit',
      'Project Board roles: Executive (Business), Senior User (Users), Senior Supplier (Suppliers)'
    ],
    descPl: 'Europejski i brytyjski standard zarządzania projektami oparty na ciągłym uzasadnieniu biznesowym i zarządzaniu etapowym.'
  },
  {
    id: 'cert-psm',
    code: 'PSM I / II™',
    name: 'Professional Scrum Master',
    org: 'Scrum.org',
    domain: 'M',
    emoji: '🔄',
    topicId: 'm7',
    examFormatEn: 'PSM I: 80 questions in 60 minutes · 85% passing score · Based strictly on the Scrum Guide 2020',
    keyFormulasOrRulesEn: [
      '3 Pillars of Empiricism: Transparency, Inspection, Adaptation',
      '3 Accountabilities: Product Owner, Scrum Master, Developers (Scrum Team <= 10 people, self-managing)',
      'Daily Scrum is a 15-minute event FOR Developers to inspect progress toward the Sprint Goal'
    ],
    descPl: 'Certyfikacja weryfikująca dogłębne rozumienie empiryzmu, roli Scrum Mastera i zasad przewodnika Scrum Guide.'
  },
  {
    id: 'cert-pspo',
    code: 'PSPO I / II™',
    name: 'Professional Scrum Product Owner',
    org: 'Scrum.org',
    domain: 'M',
    emoji: '👑',
    topicId: 'm7',
    examFormatEn: 'PSPO I: 80 questions in 60 minutes · 85% passing score · Value Maximization, Backlog & EBM',
    keyFormulasOrRulesEn: [
      'Product Owner is one person (not a committee) accountable for maximizing the value of the product',
      'Only the Product Owner has the authority to cancel a Sprint if the Sprint Goal becomes obsolete',
      'Evidence-Based Management (EBM): Current Value, Unrealized Value, Time-to-Market, Ability to Innovate'
    ],
    descPl: 'Kluczowa certyfikacja dla Product Ownerów i Product Managerów budujących produkty cyfrowe i AI w metodyce Scrum.'
  },
  {
    id: 'cert-safe',
    code: 'SAFe® 6.0',
    name: 'Certified SAFe Agilist / POPM',
    org: 'Scaled Agile, Inc.',
    domain: 'M',
    emoji: '🚄',
    topicId: 'm8',
    examFormatEn: '45 questions · 90 minutes · Agile Release Trains (ART), PI Planning & Lean Portfolio Management',
    keyFormulasOrRulesEn: [
      'WSJF (Weighted Shortest Job First) = Cost of Delay / Job Duration (Size)',
      'Cost of Delay = User-Business Value + Time Criticality + Risk Reduction / Opportunity Enablement',
      'Agile Release Train (ART) aligns 50–125 practitioners on a shared 8–12 week Program Increment (PI) cadence'
    ],
    descPl: 'Standard skalowania Agile w dużych organizacjach Enterprise (Agile Release Train, PI Planning, WSJF).'
  }
];
