export type DomainKey = 'R' | 'G' | 'B' | 'M';

export interface DomainInfo {
  key: DomainKey;
  namePl: string;
  nameEn: string;
  icon: string;
  colors: [string, string];
  badgeBg: string;
  borderHex: string;
  descriptionPl: string;
}

export interface TopicWord {
  en: string;
  pl: string;
  emoji: string;
  promptExample: string;
}

export interface TopicSentence {
  en: string;
  pl: string;
  emoji: string;
}

export interface TopicQuizItem {
  q: string;
  options: string[];
  answer: number;
  explanationEn: string;
}

export interface TopicVideo {
  id: string;
  ytId: string;
  title: string;
  channel: string;
  durationSec: number;
  level: string;
  summaryPl: string;
  transcript: { time: number; timeLabel: string; en: string; pl: string }[];
  phrases: { en: string; pl: string }[];
  questions: {
    q: string;
    options: string[];
    answer: number;
    explanationEn: string;
  }[];
  discussionEn: string[];
}

export interface WheelTopic {
  id: string;
  domain: DomainKey;
  short: string;
  titleEn: string;
  titlePl: string;
  emoji: string;
  level: 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6';
  words: TopicWord[];
  sentences: TopicSentence[];
  quiz: TopicQuizItem[];
  videos: TopicVideo[];
}

export const DOMAINS: Record<DomainKey, DomainInfo> = {
  R: {
    key: 'R',
    namePl: 'Programowanie',
    nameEn: 'Programming & AI Code',
    icon: '💻',
    colors: ['#dc2626', '#b91c1c'],
    badgeBg: '#dc2626',
    borderHex: '#dc2626',
    descriptionPl: 'Vibe coding, inżynieria promptów, architektura full-stack, agenci AI, bazy danych, testy i wdrożenia chmurowe (12 obszarów).'
  },
  G: {
    key: 'G',
    namePl: 'Grafika i Multimedia',
    nameEn: 'Graphics & Multimedia',
    icon: '🎨',
    colors: ['#16a34a', '#15803d'],
    badgeBg: '#16a34a',
    borderHex: '#16a34a',
    descriptionPl: 'UI/UX design, generowanie obrazów i wideo AI, grafika 3D/WebGL, audio AI, branding, animacje i assety do gier (12 obszarów).'
  },
  B: {
    key: 'B',
    namePl: 'E-Marketing',
    nameEn: 'E-Marketing & Growth',
    icon: '📈',
    colors: ['#2563eb', '#1d4ed8'],
    badgeBg: '#2563eb',
    borderHex: '#2563eb',
    descriptionPl: 'SEO/GEO pod wyszukiwarki AI, copywriting, kampanie Performance Ads, CRO, lejki sprzedażowe, analityka i automatyzacja (12 obszarów).'
  },
  M: {
    key: 'M',
    namePl: 'Management & Certyfikacje',
    nameEn: 'Management & Certifications',
    icon: '🧭',
    colors: ['#ffffff', '#f4f4f5'],
    badgeBg: '#18181b',
    borderHex: '#a1a1aa',
    descriptionPl: 'Białe koło centralne: Project Manager, Product Manager, Scrum Master, Product Owner oraz certyfikacje PMP, PRINCE2, PSM, PSPO i SAFe (12 obszarów).'
  }
};

interface RawSeed {
  id: string;
  domain: DomainKey;
  short: string;
  titleEn: string;
  titlePl: string;
  emoji: string;
  level: 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6';
  yt: { ytId: string; title: string; channel: string; dur: number }[];
  words: [string, string, string, string][];
  sentences: [string, string, string][];
  quiz: [string, string[], number, string][];
}

const RAW_TOPICS: RawSeed[] = [
  // ==================== RED: PROGRAMMING & AI ENGINEERING (12) ====================
  {
    id: 'r1',
    domain: 'R',
    short: 'Prompts',
    titleEn: 'Prompt Engineering & Context',
    titlePl: 'Inżynieria promptów i kontekstu',
    emoji: '🧠',
    level: 'V1',
    yt: [
      { ytId: 'jC4v5AS4RIM', title: 'Andrej Karpathy: Intro to Large Language Models & Vibe Coding', channel: 'Andrej Karpathy', dur: 612 },
      { ytId: '_ZvnD73m40o', title: 'Prompt Engineering Tutorial – Master AI Coding Prompts', channel: 'freeCodeCamp.org', dur: 540 },
      { ytId: 'dOxUroR57xs', title: 'Context Engineering for AI Coding Assistants', channel: 'AI Engineer', dur: 480 }
    ],
    words: [
      ['System Prompt', 'Prompt systemowy (rola i reguły)', '⚙️', 'Set the system prompt to act as a Principal TypeScript Architect.'],
      ['Context Window', 'Okno kontekstowe modelu', '🪟', 'Keep only relevant files in the context window to avoid dilution.'],
      ['Few-Shot Examples', 'Przykłady wzorcowe w prompcie', '🎯', 'Provide two few-shot examples of the expected JSON schema.'],
      ['Chain of Thought', 'Łańcuch rozumowania krok po kroku', '🔗', 'Ask the model to use chain-of-thought reasoning before writing code.'],
      ['Hallucination Guard', 'Zabezpieczenie przed halucynacją API', '🛡️', 'Pin exact library versions as a hallucination guard.'],
      ['Deterministic Output', 'Powtarzalny, przewidywalny wynik', '📐', 'Lower temperature to 0.1 for deterministic output in code generation.']
    ],
    sentences: [
      ['Always define the target architecture and constraints before asking AI to generate code.', 'Zawsze zdefiniuj docelową architekturę i ograniczenia, zanim poprosisz AI o wygenerowanie kodu.', '🏗️'],
      ['Break complex features into small, verifiable prompt iterations.', 'Dziel złożone funkcje na małe, weryfikowalne iteracje promptów.', '🧩'],
      ['Feed compiler errors directly back into the context window for rapid self-healing.', 'Przekazuj błędy kompilatora bezpośrednio z powrotem do okna kontekstowego w celu szybkiej naprawy.', '🔄'],
      ['Use structured markdown specs to keep the AI aligned across multiple files.', 'Używaj ustrukturyzowanych specyfikacji markdown, aby utrzymać spójność AI w wielu plikach.', '📄']
    ],
    quiz: [
      [
        'What is the primary benefit of Context Engineering in Vibe Coding?',
        ['Supplying the exact relevant files, types, and constraints so the LLM generates accurate code', 'Writing all assembly code manually without an IDE', 'Increasing monitor brightness during coding', 'Disabling TypeScript type checking'],
        0,
        'Context Engineering ensures the model has the exact schemas, interfaces, and architectural boundaries it needs.'
      ],
      [
        'When an AI coding agent hallucinates a non-existent package method, what is the best Vibe Coding response?',
        ['Paste the official type definition or docs snippet into the prompt context', 'Delete the entire repository immediately', 'Repeat the exact same prompt ten times', 'Remove all error handling'],
        0,
        'Anchoring the prompt with the real type signature or documentation immediately grounds the model.'
      ],
      [
        'What does "Few-Shot Prompting" mean when generating code?',
        ['Giving 1–3 concrete input/output code examples inside the prompt', 'Running the server for only a few seconds', 'Using fewer than three variables in a function', 'Deploying without testing'],
        0,
        'Few-shot examples demonstrate the exact coding style, naming convention, and output structure required.'
      ]
    ]
  },
  {
    id: 'r2',
    domain: 'R',
    short: 'Frontend',
    titleEn: 'Frontend & UI Vibe Coding',
    titlePl: 'Frontend, React i komponenty z AI',
    emoji: '⚛️',
    level: 'V1',
    yt: [
      { ytId: 'SqcY0GlETPk', title: 'React & TypeScript UI Architecture in Modern Web Apps', channel: 'Programming with Mosh', dur: 520 },
      { ytId: 'mr15Xzb1Ook', title: 'Tailwind CSS Rapid Prototyping for Vibe Coders', channel: 'Traversy Media', dur: 460 },
      { ytId: 'Tn6-PIqc4UM', title: 'React in 100 Seconds – Component Driven Design', channel: 'Fireship', dur: 140 }
    ],
    words: [
      ['Component Tree', 'Drzewo komponentów interfejsu', '🌳', 'Refactor the monolithic view into a clean React component tree.'],
      ['Responsive Breakpoint', 'Punkt przełamania RWD', '📱', 'Ensure the dashboard grid adapts smoothly at every responsive breakpoint.'],
      ['State Hydration', 'Hydracja i synchronizacja stanu', '💧', 'Persist user progress in localStorage and handle state hydration safely.'],
      ['Design Token', 'Token projektowy (kolor, odstęp, typografia)', '🎨', 'Bind all surface colors to semantic CSS design tokens.'],
      ['Accessibility (a11y)', 'Dostępność cyfrowa (ARIA, kontrast)', '♿', 'Include keyboard navigation and ARIA labels for full accessibility.'],
      ['Optimistic UI', 'Optymistyczna aktualizacja interfejsu', '⚡', 'Apply an optimistic UI update before the network request resolves.']
    ],
    sentences: [
      ['Prompt the AI to generate reusable, strongly typed React components with Tailwind utilities.', 'Poproś AI o wygenerowanie wielokrotnego użytku, silnie typowanych komponentów React z klasami Tailwind.', '⚛️'],
      ['Verify that every button and interactive tab has a working event handler.', 'Zweryfikuj, czy każdy przycisk i aktywna zakładka posiada działający uchwyt zdarzenia.', '🖱️'],
      ['Separate presentation components from business logic hooks.', 'Oddziel komponenty prezentacyjne od hooków logiki biznesowej.', '🪝'],
      ['Test dark mode contrast and mobile drawer navigation at 375px width.', 'Przetestuj kontrast trybu ciemnego oraz mobilne menu boczne przy szerokości 375px.', '🌓']
    ],
    quiz: [
      [
        'How should you prompt an AI to avoid spaghetti frontend code?',
        ['Request modular components with explicit TypeScript props interfaces and custom hooks', 'Ask for a single 5,000-line HTML file with inline styles', 'Avoid specifying any layout requirements', 'Use global window variables for all state'],
        0,
        'Explicit TypeScript interfaces and modular decomposition keep AI-generated UI clean and maintainable.'
      ],
      [
        'What is Optimistic UI in modern web applications?',
        ['Updating the interface immediately upon user action while the server request completes in the background', 'Hoping the code compiles without running a build', 'Using only bright yellow colors in the theme', 'Removing validation from forms'],
        0,
        'Optimistic UI makes applications feel instantaneous by reflecting expected state changes immediately.'
      ]
    ]
  },
  {
    id: 'r3',
    domain: 'R',
    short: 'Backend',
    titleEn: 'Backend, APIs & Edge Functions',
    titlePl: 'Backend, REST/GraphQL i funkcje brzegowe',
    emoji: '🖧',
    level: 'V2',
    yt: [
      { ytId: '-MTSQjw5DrM', title: 'RESTful APIs in 100 Seconds – Backend Architecture', channel: 'Fireship', dur: 135 },
      { ytId: 'Oe421EPjeBE', title: 'Node.js & Express API Development Full Course', channel: 'freeCodeCamp.org', dur: 600 },
      { ytId: 'WXsD0ZgxjRw', title: 'API Design Best Practices – Idempotency & Validation', channel: 'ByteByteGo', dur: 410 }
    ],
    words: [
      ['Idempotent Endpoint', 'Endpoint idempotentny (bezpieczne ponowienie)', '🔁', 'Make the payment webhook an idempotent endpoint using a request key.'],
      ['Payload Validation', 'Walidacja danych wejściowych (np. Zod)', '✅', 'Enforce strict runtime payload validation with Zod schemas.'],
      ['Rate Limiting', 'Ograniczanie liczby zapytań API', '🚦', 'Add token-bucket rate limiting to protect the public API route.'],
      ['Middleware Pipeline', 'Potok warstw pośredniczących', '⛓️', 'Authenticate the Bearer token inside the Express middleware pipeline.'],
      ['Edge Function', 'Funkcja serverless blisko użytkownika', '🌐', 'Deploy latency-sensitive routing logic as a globally distributed edge function.'],
      ['Webhook Signature', 'Podpis kryptograficzny webhooka', '🔐', 'Verify the HMAC webhook signature before processing the event.']
    ],
    sentences: [
      ['Define your Zod request and response schemas first, then let AI generate the route handlers.', 'Zdefiniuj najpierw schematy zapytań i odpowiedzi Zod, a potem pozwól AI wygenerować obsługę tras.', '📜'],
      ['Never expose secret API keys in client-side bundles; proxy them through server routes.', 'Nigdy nie ujawniaj tajnych kluczy API w kodzie klienta; przesyłaj je przez trasy serwerowe.', '🔒'],
      ['Return standardized HTTP status codes and machine-readable error objects.', 'Zwracaj ustandaryzowane kody statusu HTTP oraz czytelne maszynowo obiekty błędów.', '📡'],
      ['Use connection pooling when querying relational databases from serverless functions.', 'Używaj puli połączeń podczas odpytywania relacyjnych baz danych z funkcji serverless.', '🏊']
    ],
    quiz: [
      [
        'Why is schema-first validation (e.g., Zod or OpenAPI) critical when Vibe Coding backends?',
        ['It creates a strict contract between frontend and backend that prevents runtime type mismatches', 'It makes the database unnecessary', 'It replaces HTTPS encryption', 'It slows down compilation intentionally'],
        0,
        'Schema-first contracts ensure both client and server code generated by AI adhere to the exact same data shape.'
      ]
    ]
  },
  {
    id: 'r4',
    domain: 'R',
    short: 'Full-Stack',
    titleEn: 'Full-Stack AI App Builders',
    titlePl: 'Budowanie aplikacji Full-Stack z AI',
    emoji: '🚀',
    level: 'V2',
    yt: [
      { ytId: 'zjkBMFhNj_g', title: 'Intro to Large Language Models & Full-Stack AI Apps', channel: 'Andrej Karpathy', dur: 580 },
      { ytId: 'aircAruvnKk', title: 'How Neural Networks & AI Systems Power Modern Software', channel: '3Blue1Brown', dur: 720 },
      { ytId: 'HcqpanDadyQ', title: 'Building Production AI Web Apps End-to-End', channel: 'Fireship', dur: 390 }
    ],
    words: [
      ['End-to-End Type Safety', 'Pełne bezpieczeństwo typów od bazy do UI', '🛡️', 'Maintain end-to-end type safety across database models and React views.'],
      ['Streaming Response', 'Strumieniowanie odpowiedzi w czasie rzeczywistym', '🌊', 'Render token-by-token output using a Server-Sent Events streaming response.'],
      ['Monorepo Workspace', 'Wspólne repozytorium wielu pakietów', '📦', 'Share validation schemas between client and server in a monorepo workspace.'],
      ['Environment Config', 'Konfiguracja zmiennych środowiskowych', '🔧', 'Validate all required environment config variables at server startup.'],
      ['Seed Script', 'Skrypt inicjalizujący dane startowe', '🌱', 'Generate a deterministic database seed script for local development.'],
      ['Graceful Degradation', 'Łagodna degradacja w razie awarii usługi', '🪂', 'Implement graceful degradation when an external API times out.']
    ],
    sentences: [
      ['Scaffold the data model, API layer, and UI state in three coordinated Vibe Coding passes.', 'Zbuduj szkielet modelu danych, warstwy API oraz stanu UI w trzech skoordynowanych przebiegach Vibe Codingu.', '🧱'],
      ['Always verify the full build and linter output before shipping a feature.', 'Zawsze weryfikuj pełny wynik budowania i lintera przed wdrożeniem funkcji.', '✅'],
      ['Stream long-running AI responses so users receive immediate visual feedback.', 'Strumieniuj długie odpowiedzi AI, aby użytkownicy otrzymywali natychmiastową informację zwrotną.', '⚡'],
      ['Keep shared TypeScript interfaces in a single source-of-truth module.', 'Trzymaj współdzielone interfejsy TypeScript w jednym module będącym jedynym źródłem prawdy.', '📘']
    ],
    quiz: [
      [
        'What is the recommended multi-pass workflow for building a Full-Stack app with AI?',
        ['1. Data Schema & Types -> 2. Backend Routes & Validation -> 3. Frontend UI & Wiring -> 4. Build Verification', 'Write everything in one giant unverified prompt without types', 'Build only CSS and skip data persistence', 'Deploy before running npm run build'],
        0,
        'Layered architecture passes keep context focused and prevent cascading type errors.'
      ]
    ]
  },
  {
    id: 'r5',
    domain: 'R',
    short: 'AI Agents',
    titleEn: 'AI Agents & MCP Workflows',
    titlePl: 'Agenci AI, Tool Calling i protokół MCP',
    emoji: '🤖',
    level: 'V3',
    yt: [
      { ytId: 'F8NKVhkZZWI', title: 'AI Agents Explained – Tool Use, Planning & Memory', channel: 'IBM Technology', dur: 490 },
      { ytId: 'sal78ACtGTc', title: 'Building Agentic Workflows with Function Calling', channel: 'AI Engineer', dur: 530 },
      { ytId: 'kFpLzCVLA20', title: 'Model Context Protocol (MCP) & Multi-Agent Systems', channel: 'Fireship', dur: 310 }
    ],
    words: [
      ['Tool Calling', 'Wywoływanie funkcji i narzędzi przez model', '🛠️', 'Provide strict JSON schemas for reliable agent tool calling.'],
      ['Model Context Protocol', 'Standard MCP łączący AI ze źródłami danych', '🔌', 'Expose local repository tools via a Model Context Protocol server.'],
      ['ReAct Loop', 'Pętla Rozumowanie + Działanie (Reason + Act)', '🔄', 'Limit the agent ReAct loop to ten iterations to prevent infinite cycles.'],
      ['Human-in-the-Loop', 'Zatwierdzanie krytycznych akcji przez człowieka', '🙋', 'Require human-in-the-loop confirmation before executing destructive SQL.'],
      ['Subagent Orchestrator', 'Orkiestrator delegujący zadania pod-agentom', '🎼', 'Use a subagent orchestrator to parallelize code review and test generation.'],
      ['Episodic Memory', 'Pamięć epizodyczna wcześniejszych sesji', '🗂️', 'Store summarized task outcomes in episodic memory for future runs.']
    ],
    sentences: [
      ['Equip your coding agent with read, search, and compiler tools so it can verify its own work.', 'Wyposaż swojego agenta kodującego w narzędzia odczytu, wyszukiwania i kompilacji, aby mógł sam weryfikować swoją pracę.', '🔍'],
      ['Always require human-in-the-loop approval before deleting production resources.', 'Zawsze wymagaj zatwierdzenia przez człowieka przed usunięciem zasobów produkcyjnych.', '⚠️'],
      ['Define clear tool descriptions so the orchestrator selects the right capability.', 'Zdefiniuj przejrzyste opisy narzędzi, aby orkiestrator wybierał właściwą funkcję.', '🧭'],
      ['Standardize external integrations using the Model Context Protocol.', 'Standaryzuj zewnętrzne integracje za pomocą protokołu Model Context Protocol (MCP).', '🔌']
    ],
    quiz: [
      [
        'What does the ReAct pattern stand for in AI Agent engineering?',
        ['Reasoning and Acting in an iterative observation loop', 'React.js frontend rendering library', 'Random Execution of Automated Code Tasks', 'Retroactive Error Activation'],
        0,
        'ReAct interleaves chain-of-thought reasoning with tool execution and observation of results.'
      ]
    ]
  },
  {
    id: 'r6',
    domain: 'R',
    short: 'Databases',
    titleEn: 'Databases, SQL & Vector Search',
    titlePl: 'Bazy danych, SQL, ORM i wyszukiwanie wektorowe',
    emoji: '🗄️',
    level: 'V3',
    yt: [
      { ytId: 'zsjvFFKOm3c', title: 'SQL & Relational Databases Explained in 10 Minutes', channel: 'Fireship', dur: 420 },
      { ytId: 'klTvEwg3oJ4', title: 'Vector Databases & RAG Architecture Explained', channel: 'IBM Technology', dur: 450 },
      { ytId: '7S_tz1z_5bA', title: 'Database Indexing, Transactions & ACID Properties', channel: 'ByteByteGo', dur: 510 }
    ],
    words: [
      ['Vector Embedding', 'Reprezentacja wektorowa znaczenia tekstu', '🧭', 'Generate a 768-dimensional vector embedding for semantic search.'],
      ['RAG Pipeline', 'Wzbogacanie generowania o wyszukane dokumenty', '📚', 'Retrieve top-k chunks in the RAG pipeline before prompting the LLM.'],
      ['Database Migration', 'Kontrolowana migracja schematu bazy danych', '🚚', 'Generate a reversible Drizzle database migration for the new table.'],
      ['ACID Transaction', 'Transakcja gwarantująca spójność danych', '🏦', 'Wrap balance transfers inside a strict ACID transaction.'],
      ['Composite Index', 'Indeks złożony przyspieszający zapytania', '⚡', 'Add a composite index on user_id and created_at to optimize sorting.'],
      ['Row-Level Security', 'Bezpieczeństwo na poziomie wiersza (RLS)', '🔐', 'Enforce tenant isolation using PostgreSQL Row-Level Security policies.']
    ],
    sentences: [
      ['Share your Drizzle or Prisma schema with the AI so every generated query is type-safe.', 'Udostępnij swój schemat Drizzle lub Prisma modelowi AI, aby każde wygenerowane zapytanie było bezpieczne typologicznie.', '📐'],
      ['Combine keyword search with vector embeddings for hybrid RAG retrieval.', 'Połącz wyszukiwanie słów kluczowych z osadzeniami wektorowymi dla hybrydowego wyszukiwania RAG.', '🔎'],
      ['Never run destructive DDL statements in production without a tested migration plan.', 'Nigdy nie uruchamiaj destrukcyjnych poleceń DDL na produkcji bez przetestowanego planu migracji.', '🛡️'],
      ['Use EXPLAIN ANALYZE to verify that AI-generated SQL queries hit the proper indexes.', 'Użyj EXPLAIN ANALYZE, aby zweryfikować, czy wygenerowane przez AI zapytania SQL korzystają z właściwych indeksów.', '📊']
    ],
    quiz: [
      [
        'What is the purpose of Retrieval-Augmented Generation (RAG)?',
        ['Fetching relevant ground-truth records from a database and injecting them into the LLM prompt', 'Training a new foundation model from scratch on every user click', 'Deleting old database tables automatically', 'Compressing CSS files'],
        0,
        'RAG grounds LLM responses in up-to-date, authoritative data without retraining the model.'
      ]
    ]
  },
  {
    id: 'r7',
    domain: 'R',
    short: 'Debugging',
    titleEn: 'Testing, Debugging & AI Eval',
    titlePl: 'Testowanie, debugowanie i ewaluacja AI',
    emoji: '🐞',
    level: 'V3',
    yt: [
      { ytId: 'u6QfIXgjwGQ', title: 'Test-Driven Development (TDD) & Automated Testing', channel: 'Fireship', dur: 290 },
      { ytId: 'r9HdJ8P6GQI', title: 'How to Debug Complex Applications Like a Senior Engineer', channel: 'Traversy Media', dur: 480 },
      { ytId: '5abW_0_k19I', title: 'LLM Evals – Testing AI Outputs Systematically', channel: 'AI Engineer', dur: 510 }
    ],
    words: [
      ['Unit & Integration Test', 'Test jednostkowy i integracyjny', '🧪', 'Prompt the AI to write Vitest unit and integration tests for edge cases.'],
      ['Regression Suite', 'Zestaw testów regresyjnych', '🛡️', 'Run the automated regression suite before merging any AI refactor.'],
      ['LLM-as-a-Judge', 'Ewaluacja odpowiedzi przez model oceniający', '⚖️', 'Score output accuracy against a rubric using an LLM-as-a-Judge evaluator.'],
      ['Stack Trace Triage', 'Analiza zrzutu stosu wywołań błędu', '🔬', 'Paste the full stack trace triage into the prompt to pinpoint the root cause.'],
      ['Property-Based Test', 'Testowanie własności na losowych danych', '🎲', 'Use property-based tests to uncover boundary condition bugs.'],
      ['Deterministic Mock', 'Deterministyczna atrapa zależności zewnętrznej', '🎭', 'Inject a deterministic mock for the payment gateway during CI runs.']
    ],
    sentences: [
      ['Write the failing test specification first, then ask the AI to implement the code that passes it.', 'Napisz najpierw specyfikację testu kończącego się błędem, a następnie poproś AI o implementację kodu, który go przejdzie.', '✅'],
      ['Build an automated evaluation dataset of fifty golden prompts to measure regressions.', 'Zbuduj zautomatyzowany zbiór ewaluacyjny pięćdziesięciu złotych promptów, aby mierzyć regresję.', '📏'],
      ['Isolate the bug to a minimal reproducible example before asking AI for a fix.', 'Wyizoluj błąd do minimalnego powtarzalnego przykładu, zanim poprosisz AI o poprawkę.', '🎯'],
      ['Check boundary conditions such as empty arrays, null values, and network timeouts.', 'Sprawdzaj warunki brzegowe, takie jak puste tablice, wartości null oraz przekroczenia czasu sieci.', '🚧']
    ],
    quiz: [
      [
        'Why does Test-Driven Vibe Coding (writing tests before implementation) work so well with LLMs?',
        ['Tests give the AI an objective, executable pass/fail target to iterate against', 'Tests make the code run without a CPU', 'Tests allow skipping TypeScript compilation', 'Tests replace the user interface'],
        0,
        'Executable tests provide an unambiguous verification signal so the AI can self-correct until all assertions pass.'
      ]
    ]
  },
  {
    id: 'r8',
    domain: 'R',
    short: 'DevOps',
    titleEn: 'DevOps, CI/CD & Cloud Deploy',
    titlePl: 'DevOps, kontenery Docker, CI/CD i chmura',
    emoji: '☁️',
    level: 'V4',
    yt: [
      { ytId: 'Gjnup-PuquQ', title: 'Docker in 100 Seconds – Containerization Explained', channel: 'Fireship', dur: 130 },
      { ytId: 'scEDHsr3APg', title: 'CI/CD Pipelines Explained – GitHub Actions & Cloud Run', channel: 'IBM Technology', dur: 440 },
      { ytId: 'leadF8H1zGQ', title: 'Kubernetes & Serverless Cloud Deployment Guide', channel: 'ByteByteGo', dur: 490 }
    ],
    words: [
      ['Multi-Stage Dockerfile', 'Wielowarstwowy plik budowania kontenera', '🐳', 'Optimize image size using a slim multi-stage Dockerfile.'],
      ['CI/CD Pipeline', 'Potok ciągłej integracji i wdrażania', '🚀', 'Run lint, typecheck, and build inside the GitHub Actions CI/CD pipeline.'],
      ['Blue-Green Deployment', 'Bezprzestojowe wdrożenie z dwiema wersjami', '🔀', 'Switch production traffic safely with a blue-green deployment strategy.'],
      ['Infrastructure as Code', 'Infrastruktura definiowana w kodzie (Terraform)', '🏗️', 'Provision cloud resources reproducibly using Infrastructure as Code.'],
      ['Observability & Telemetry', 'Obserwowalność, logi i metryki systemu', '📡', 'Export structured JSON logs and OpenTelemetry traces for observability.'],
      ['Zero-Downtime Rollback', 'Natychmiastowe wycofanie wadliwej wersji', '⏪', 'Trigger an automated zero-downtime rollback if health checks fail.']
    ],
    sentences: [
      ['Automate type checking, linting, and unit tests on every pull request.', 'Zautomatyzuj sprawdzanie typów, linting oraz testy jednostkowe przy każdym pull requeście.', '🤖'],
      ['Use immutable container images tagged with the exact Git commit SHA.', 'Używaj niezmiennych obrazów kontenerów oznaczonych dokładnym skrótem SHA commita Git.', '🏷️'],
      ['Configure readiness and liveness probes so Cloud Run routes traffic only to healthy instances.', 'Skonfiguruj sondy gotowości i żywotności, aby Cloud Run kierował ruch tylko do zdrowych instancji.', '💓'],
      ['Keep secrets in a managed vault and inject them at runtime.', 'Przechowuj sekrety w zarządzanym skarbcu i wstrzykuj je w czasie wykonywania.', '🗝️']
    ],
    quiz: [
      [
        'What is the main advantage of a multi-stage Dockerfile?',
        ['It compiles assets in a builder stage and copies only the minimal runtime artifacts into the final image', 'It installs ten operating systems at once', 'It stores database passwords in plain text', 'It disables HTTPS'],
        0,
        'Multi-stage builds keep production container images small, fast to deploy, and secure.'
      ]
    ]
  },
  {
    id: 'r9',
    domain: 'R',
    short: 'Mobile',
    titleEn: 'Mobile & Cross-Platform Apps',
    titlePl: 'Aplikacje mobilne, PWA i Cross-Platform',
    emoji: '📱',
    level: 'V4',
    yt: [
      { ytId: 'gvkqT_Uoahw', title: 'React Native & Mobile App Development in 100 Seconds', channel: 'Fireship', dur: 145 },
      { ytId: 'sFsRylCQblw', title: 'Progressive Web Apps (PWA) – Offline-First Architecture', channel: 'Traversy Media', dur: 460 },
      { ytId: '0-S5a0eXPoc', title: 'Building Cross-Platform Mobile Experiences with AI', channel: 'freeCodeCamp.org', dur: 530 }
    ],
    words: [
      ['Offline-First Sync', 'Architektura działająca bez sieci z synchronizacją', '📶', 'Cache lesson data locally for seamless offline-first sync.'],
      ['Touch Target Ergonomics', 'Ergonomia pól dotykowych (min. 44x44px)', '👆', 'Size every mobile button to at least 44px for touch target ergonomics.'],
      ['Safe Area Inset', 'Bezpieczne wcięcia ekranu (notch, pasek gestów)', '📐', 'Respect safe area insets on modern iOS and Android viewports.'],
      ['Service Worker Cache', 'Pamięć podręczna skryptu Service Worker', '⚙️', 'Pre-cache static assets in the Service Worker cache for instant boot.'],
      ['Haptic Feedback', 'Informacja zwrotna przez delikatną wibrację', '📳', 'Trigger subtle haptic feedback when the user completes a lesson node.'],
      ['Deep Linking', 'Bezpośrednie linkowanie do konkretnego ekranu', '🔗', 'Configure universal deep linking so shared URLs open the exact unit.']
    ],
    sentences: [
      ['Design mobile interfaces for thumb-zone reachability and zero horizontal overflow.', 'Projektuj interfejsy mobilne pod kątem zasięgu kciuka oraz braku poziomego przewijania.', '👍'],
      ['Use a Web App Manifest and Service Worker to make your web app installable.', 'Użyj pliku Web App Manifest oraz Service Workera, aby aplikacja webowa była instalowalna.', '📲'],
      ['Test orientation changes between portrait and landscape modes.', 'Testuj zmiany orientacji ekranu pomiędzy trybem pionowym a poziomym.', '🔄'],
      ['Queue user progress mutations locally when the device goes offline.', 'Kolejkuj zmiany postępów użytkownika lokalnie, gdy urządzenie traci połączenie z siecią.', '📥']
    ],
    quiz: [
      [
        'What is the minimum recommended touch target size for mobile interactive controls?',
        ['At least 44x44 CSS pixels', '8x8 CSS pixels', '500x500 CSS pixels', '1x1 CSS pixel'],
        0,
        '44x44px prevents accidental mis-taps and satisfies mobile accessibility standards.'
      ]
    ]
  },
  {
    id: 'r10',
    domain: 'R',
    short: 'Security',
    titleEn: 'Security, Auth & Guardrails',
    titlePl: 'Bezpieczeństwo, OAuth, JWT i ochrona przed Prompt Injection',
    emoji: '🔐',
    level: 'V5',
    yt: [
      { ytId: 'ZV5yTm4pT8g', title: 'OAuth 2.0 & OpenID Connect Explained Clearly', channel: 'ByteByteGo', dur: 430 },
      { ytId: '7Q17ubqLfaM', title: 'JWT Authentication & OWASP Top 10 Security Risks', channel: 'Fireship', dur: 310 },
      { ytId: 'jrTbaJnnbvE', title: 'Prompt Injection & AI Security Guardrails', channel: 'IBM Technology', dur: 470 }
    ],
    words: [
      ['Prompt Injection Defense', 'Ochrona przed wstrzyknięciem złośliwego promptu', '🛡️', 'Separate untrusted user input from system instructions for prompt injection defense.'],
      ['Role-Based Access (RBAC)', 'Kontrola dostępu oparta na rolach', '🪪', 'Verify user permissions server-side using Role-Based Access Control.'],
      ['OAuth 2.0 PKCE Flow', 'Bezpieczny przepływ autoryzacji OAuth z PKCE', '🔑', 'Use the OAuth 2.0 PKCE flow for public single-page applications.'],
      ['Content Security Policy', 'Polityka CSP chroniąca przed atakami XSS', '🧱', 'Set a strict Content Security Policy header to mitigate XSS vectors.'],
      ['Least Privilege Principle', 'Zasada najmniejszych niezbędnych uprawnień', '🔒', 'Grant the database service account only the least privilege required.'],
      ['PII Redaction', 'Maskowanie danych osobowych przed wysyłką do AI', '🕵️', 'Run automated PII redaction before logging or sending text to external LLMs.']
    ],
    sentences: [
      ['Never trust client-side role flags; always enforce authorization in backend security rules.', 'Nigdy nie ufaj flagom ról po stronie klienta; zawsze egzekwuj autoryzację w regułach bezpieczeństwa backendu.', '🚨'],
      ['Sanitize and delimiter-wrap untrusted user content before passing it to an LLM.', 'Oczyszczaj i otaczaj separatorami niezaufaną treść użytkownika przed przekazaniem jej do modelu LLM.', '🛡️'],
      ['Audit third-party dependencies regularly and rotate API keys on a schedule.', 'Regularnie audytuj zewnętrzne zależności i cyklicznie rotuj klucze API.', '🔄'],
      ['Redact emails, phone numbers, and tokens from telemetry logs.', 'Usuwaj adresy e-mail, numery telefonów oraz tokeny z logów telemetrycznych.', '🧹']
    ],
    quiz: [
      [
        'What is Indirect Prompt Injection in an AI application?',
        ['When malicious instructions hidden inside external data (e.g., a webpage or document) hijack the LLM behavior', 'When a developer types a prompt quickly on a mechanical keyboard', 'When CSS styles override a button color', 'When a user logs in with Google OAuth'],
        0,
        'Indirect prompt injection occurs when untrusted retrieved content contains instructions that override system rules.'
      ]
    ]
  },
  {
    id: 'r11',
    domain: 'R',
    short: 'Automation',
    titleEn: 'Python, Data & Automation',
    titlePl: 'Python, analiza danych i automatyzacja procesów AI',
    emoji: '🐍',
    level: 'V5',
    yt: [
      { ytId: 'x7X9w_GIm1s', title: 'Python in 100 Seconds – The Language of AI & Data', channel: 'Fireship', dur: 140 },
      { ytId: 'r-uOLxNrNk8', title: 'Data Analysis & Automation Pipelines with Python', channel: 'freeCodeCamp.org', dur: 550 },
      { ytId: 'fNxaJsNG3-s', title: 'Structured Outputs & JSON Batch Processing with LLMs', channel: 'AI Engineer', dur: 420 }
    ],
    words: [
      ['Structured JSON Schema', 'Wymuszony schemat wyjściowy JSON', '📋', 'Bind the model response to a strict Pydantic or JSON Schema.'],
      ['ETL Data Pipeline', 'Potok ekstrakcji, transformacji i ładowania danych', '🚰', 'Automate nightly document ingestion through an idempotent ETL data pipeline.'],
      ['Batch Inference', 'Przetwarzanie wsadowe dużej liczby zapytań AI', '📦', 'Use asynchronous batch inference to process ten thousand records at 50% lower cost.'],
      ['Idempotent Cron Job', 'Zadanie cykliczne odporne na podwójne uruchomienie', '⏱️', 'Schedule an idempotent cron job to refresh analytics aggregates every hour.'],
      ['DataFrame Vectorization', 'Wektoryzacja operacji na tabelach danych', '⚡', 'Replace slow Python loops with Pandas DataFrame vectorization.'],
      ['Webhook Orchestration', 'Orkiestracja przepływów oparta na zdarzeniach', '🕸️', 'Connect CRM events to AI summarization via webhook orchestration.']
    ],
    sentences: [
      ['Enforce structured JSON outputs so downstream automation scripts never fail on parsing.', 'Wymuszaj ustrukturyzowane odpowiedzi JSON, aby kolejne skrypty automatyzacji nigdy nie psuły się podczas parsowania.', '⚙️'],
      ['Add exponential backoff and jitter when calling external AI endpoints in batch jobs.', 'Dodaj wykładnicze opóźnienie ponowień (exponential backoff) podczas wywoływania endpointów AI w zadaniach wsadowych.', '⏳'],
      ['Log token usage and latency per automation run to control cloud spend.', 'Loguj zużycie tokenów oraz opóźnienie dla każdego przebiegu automatyzacji, aby kontrolować koszty chmury.', '💰'],
      ['Validate dirty CSV inputs before feeding rows into the transformation pipeline.', 'Waliduj nieuporządkowane dane CSV przed przekazaniem wierszy do potoku transformacji.', '🧹']
    ],
    quiz: [
      [
        'Why should automation workflows use Structured Outputs (JSON Schema) when calling an LLM?',
        ['It guarantees the response matches the exact keys and types expected by downstream code', 'It makes the LLM write poetry instead of data', 'It removes the need for internet connectivity', 'It doubles the token price without benefits'],
        0,
        'Structured Outputs eliminate brittle regex parsing by guaranteeing valid, schema-compliant JSON.'
      ]
    ]
  },
  {
    id: 'r12',
    domain: 'R',
    short: 'Architect',
    titleEn: 'System Architecture & Refactoring',
    titlePl: 'Architektura systemów i refaktoryzacja z AI',
    emoji: '🏛️',
    level: 'V6',
    yt: [
      { ytId: 'i53Gi_K3o7I', title: 'System Design Concepts Course – Scalability & Architecture', channel: 'freeCodeCamp.org', dur: 610 },
      { ytId: 'bUHFg8CZFws', title: 'Software Architecture Patterns in 10 Minutes', channel: 'ByteByteGo', dur: 520 },
      { ytId: 'D4auWwMsEnY', title: 'Refactoring Legacy Codebases Safely with AI Assistants', channel: 'AI Engineer', dur: 460 }
    ],
    words: [
      ['Separation of Concerns', 'Rozdział odpowiedzialności modułów', '🧱', 'Refactor the god-object to restore clean separation of concerns.'],
      ['Hexagonal Architecture', 'Architektura portów i adapterów', '⬡', 'Decouple core domain logic from external APIs using hexagonal architecture.'],
      ['Strangler Fig Pattern', 'Stopniowe zastępowanie starego systemu nowym', '🌿', 'Migrate legacy routes incrementally using the Strangler Fig pattern.'],
      ['Architecture Decision Record', 'Dokument decyzji architektonicznej (ADR)', '📜', 'Document trade-offs in a concise Architecture Decision Record (ADR).'],
      ['Technical Debt Paydown', 'Spłata długu technologicznego', '🧹', 'Allocate 20% of each sprint to systematic technical debt paydown.'],
      ['Event-Driven Decoupling', 'Rozluźnienie powiązań przez komunikację zdarzeniową', '📨', 'Use event-driven decoupling so billing and notifications scale independently.']
    ],
    sentences: [
      ['Ask the AI to propose an Architecture Decision Record comparing three design options before coding.', 'Poproś AI o zaproponowanie dokumentu ADR porównującego trzy warianty projektowe przed rozpoczęciem kodowania.', '⚖️'],
      ['Refactor in small, behavior-preserving steps verified by automated tests.', 'Refaktoryzuj w małych krokach zachowujących działanie systemu, weryfikowanych automatycznymi testami.', '👣'],
      ['Keep domain logic pure and free of framework-specific side effects.', 'Utrzymuj logikę domenową czystą i wolną od efektów ubocznych specyficznych dla frameworka.', '💎'],
      ['Cap file sizes around 250 lines so both humans and AI agents can reason about each module.', 'Ograniczaj rozmiar plików do około 250 linii, aby zarówno ludzie, jak i agenci AI mogli łatwo analizować każdy moduł.', '📏']
    ],
    quiz: [
      [
        'Why is keeping source files modular (around 150–300 lines) especially important in Vibe Coding?',
        ['Smaller, single-responsibility files fit cleanly into AI context windows and allow surgical edits without unintended regressions', 'Compilers reject files over 300 lines', 'Small files use more RAM', 'It prevents git commits'],
        0,
        'Modular files with clear boundaries allow AI coding assistants to read and update logic with high precision.'
      ]
    ]
  },

  // ==================== GREEN: GRAPHICS & MULTIMEDIA (12) ====================
  {
    id: 'g1',
    domain: 'G',
    short: 'UI/UX',
    titleEn: 'UI/UX Design Systems & Figma AI',
    titlePl: 'Systemy projektowe UI/UX i konwersja Figma → Kod',
    emoji: '✨',
    level: 'V1',
    yt: [
      { ytId: 'c9Wg6Cb_YlU', title: 'UI/UX Design Tutorial – Wireframes, Design Systems & Figma', channel: 'freeCodeCamp.org', dur: 540 },
      { ytId: 'wIuVvCuiJhU', title: 'Design Systems & Atomic Design Explained', channel: 'DesignCourse', dur: 430 },
      { ytId: 'dXQ7IHkTiMM', title: 'From Figma Design to Production React Code with AI', channel: 'Fireship', dur: 320 }
    ],
    words: [
      ['Atomic Design System', 'System komponentów: atomy, molekuły, organizmy', '⚛️', 'Structure UI components following an Atomic Design System hierarchy.'],
      ['Auto-Layout Constraints', 'Więzy automatycznego układu i odstępów', '📐', 'Translate Figma Auto-Layout constraints into CSS Flexbox and Grid rules.'],
      ['Visual Hierarchy', 'Hierarchia wizualna prowadząca wzrok użytkownika', '👁️', 'Establish a clear visual hierarchy using size, contrast, and whitespace.'],
      ['Affordance & Signifier', 'Afordancja wskazująca jak użyć elementu UI', '👆', 'Provide clear hover and focus signifiers for every interactive affordance.'],
      ['60-30-10 Color Rule', 'Proporcja barw: 60% tło, 30% struktura, 10% akcent', '🎨', 'Apply the 60-30-10 color rule so primary CTAs stand out immediately.'],
      ['Cognitive Load Reduction', 'Redukcja obciążenia poznawczego użytkownika', '🧘', 'Use progressive disclosure for cognitive load reduction on complex forms.']
    ],
    sentences: [
      ['Describe spacing, typography scale, and surface hierarchy explicitly when prompting for UI.', 'Opisuj odstępy, skalę typografii oraz hierarchię powierzchni wprost podczas promptowania o interfejs.', '📏'],
      ['Ensure every screen has a single dominant focal anchor rather than competing banners.', 'Upewnij się, że każdy ekran ma jeden dominujący punkt skupienia wzroku zamiast konkurujących banerów.', '🎯'],
      ['Use semantic tokens like surface, border, and primary-ink for seamless dark mode support.', 'Używaj semantycznych tokenów takich jak surface, border i primary-ink dla płynnej obsługi trybu ciemnego.', '🌓'],
      ['Test user flows with five-second usability checks to verify instant clarity.', 'Testuj przepływy użytkownika pięciosekundowym testem użyteczności, aby potwierdzić natychmiastową czytelność.', '⏱️']
    ],
    quiz: [
      [
        'What does the 60-30-10 color distribution rule state in UI design?',
        ['60% dominant neutral canvas, 30% structural surfaces/cards, and 10% high-intent accent budget for primary actions', '60 buttons, 30 popups, and 10 fonts on every page', 'Using 100% neon gradients everywhere', 'Making text 10% opacity'],
        0,
        'The 60-30-10 rule keeps interfaces calm, legible, and directs user attention to the 10% accent CTAs.'
      ]
    ]
  },
  {
    id: 'g2',
    domain: 'G',
    short: 'Image Gen',
    titleEn: 'AI Image Generation & Diffusion',
    titlePl: 'Generowanie obrazów AI, dyfuzja i precyzyjne prompty wizualne',
    emoji: '🖼️',
    level: 'V1',
    yt: [
      { ytId: '1CIpzeNxIhU', title: 'How Stable Diffusion & AI Image Generators Work', channel: 'Computerphile', dur: 560 },
      { ytId: 'rKj0Z_X4c1Y', title: 'Visual Prompt Engineering – Lighting, Lens & Composition', channel: 'Two Minute Papers', dur: 380 },
      { ytId: 'x7X9w_GIm1s', title: 'Controlling Image Generation with Depth & Pose Guides', channel: 'AI Explained', dur: 440 }
    ],
    words: [
      ['Subject-Lighting-Lens Formula', 'Formuła promptu: obiekt, oświetlenie, obiektyw', '📷', 'Write image prompts using the Subject-Lighting-Lens-Mood formula.'],
      ['ControlNet & Depth Map', 'Kontrola pozy i geometrii obrazu AI', '🦴', 'Lock architectural perspective using a ControlNet depth map.'],
      ['Negative Prompting', 'Wykluczanie niepożądanych artefaktów wizualnych', '🚫', 'Exclude blurry hands and text watermarks via negative prompting.'],
      ['Aspect Ratio Geometry', 'Proporcje obrazu dopasowane do kontenera (16:9, 1:1)', '🖼️', 'Match the generated 16:9 aspect ratio geometry to the hero banner slot.'],
      ['Style Reference Seed', 'Ziarno i referencja zapewniające spójność stylu', '🌱', 'Reuse the style reference seed across all product illustrations.'],
      ['Latent Diffusion Step', 'Krok odszumiania w przestrzeni ukrytej', '🌫️', 'Balance guidance scale and latent diffusion steps for natural textures.']
    ],
    sentences: [
      ['Specify subject, environment, lighting direction, camera focal length, and color grading in every visual prompt.', 'Określaj obiekt, otoczenie, kierunek światła, ogniskową obiektywu oraz gradację kolorów w każdym prompcie wizualnym.', '📸'],
      ['Use consistent lighting and color palettes across all generated assets in a project.', 'Stosuj spójne oświetlenie i paletę barw we wszystkich generowanych zasobach w projekcie.', '🎨'],
      ['Always provide resilient CSS fallbacks and alt descriptions for generated imagery.', 'Zawsze zapewniają odporne zastępcze style CSS oraz opisy alt dla generowanych obrazów.', '🛡️'],
      ['Avoid generic neon cyberpunk clichés unless the brand brief specifically calls for them.', 'Unikaj generycznych neonowych klisz cyberpunkowych, chyba że brief marki wyraźnie tego wymaga.', '✨']
    ],
    quiz: [
      [
        'Which prompt elements produce the most coherent, studio-grade AI photography?',
        ['Specific subject + surface/environment + lighting style + lens/camera angle + mood/color grade', 'Repeating the word "masterpiece" twenty times with no subject description', 'Single-word prompts like "picture"', 'Random punctuation marks'],
        0,
        'Specifying subject, lighting, camera optics, and atmosphere gives diffusion models concrete photographic constraints.'
      ]
    ]
  },
  {
    id: 'g3',
    domain: 'G',
    short: 'AI Video',
    titleEn: 'Generative Video & Motion',
    titlePl: 'Generatywne wideo AI, ruch kamery i storyboardy',
    emoji: '🎬',
    level: 'V2',
    yt: [
      { ytId: 'HK6y8DAPN_0', title: 'Generative Video Models & World Simulators Explained', channel: 'Two Minute Papers', dur: 450 },
      { ytId: 'd95J8yzvjbQ', title: 'AI Video Production Workflow – Storyboarding to Final Cut', channel: 'Runway & Creators', dur: 510 },
      { ytId: 'Ilg3gGewQ5U', title: 'Camera Motion Prompts: Pan, Tilt, Dolly & Orbit', channel: 'StudioBinder', dur: 480 }
    ],
    words: [
      ['Keyframe Conditioning', 'Warunkowanie wideo klatką początkową i końcową', '🎞️', 'Anchor the transition using start and end keyframe conditioning.'],
      ['Camera Dolly & Orbit', 'Jazda kamery do przodu/tyłu oraz ruch orbitalny', '🎥', 'Prompt a slow camera dolly forward with shallow depth of field.'],
      ['Temporal Consistency', 'Spójność obiektów i oświetlenia w czasie trwania filmu', '⏳', 'Maintain character wardrobe and temporal consistency across shots.'],
      ['Motion Brush Mask', 'Pędzel ruchu ożywiający wybrane obszary kadru', '🖌️', 'Apply a motion brush mask only to the flowing water and clouds.'],
      ['Storyboard Animatic', 'Wstępny montaż kadrów z dźwiękiem i rytmem', '📋', 'Validate pacing with a storyboard animatic before rendering full clips.'],
      ['Frame Interpolation', 'Upłynnianie ruchu przez generowanie klatek pośrednich', '⚡', 'Use frame interpolation to smooth the clip from 24fps to 60fps.']
    ],
    sentences: [
      ['Generate a high-resolution first frame before prompting for camera motion.', 'Wygeneruj najpierw klatkę początkową w wysokiej rozdzielczości, zanim poprosisz o ruch kamery.', '🖼️'],
      ['Keep camera movements simple—one pan or slow dolly per shot prevents warping.', 'Utrzymuj ruchy kamery proste — jedna panorama lub powolny najazd na ujęcie zapobiega zniekształceniom.', '🎬'],
      ['Cut generated clips on action beats of two to four seconds for dynamic pacing.', 'Montuj wygenerowane klipy na akcentach ruchu co dwie do czterech sekund dla dynamicznego tempa.', '✂️'],
      ['Match color temperature across consecutive AI video shots during post-processing.', 'Dopasuj temperaturę barwową pomiędzy kolejnymi ujęciami wideo AI podczas postprodukcji.', '🌈']
    ],
    quiz: [
      [
        'Why is Image-to-Video (starting from a curated keyframe) preferred over raw Text-to-Video in commercial production?',
        ['It locks in exact composition, brand colors, and character likeness before adding motion', 'It deletes the audio track automatically', 'It only works in black and white', 'It prevents exporting MP4 files'],
        0,
        'Starting from an approved keyframe image guarantees visual art direction and eliminates composition drift.'
      ]
    ]
  },
  {
    id: 'g4',
    domain: 'G',
    short: '3D & WebGL',
    titleEn: '3D Graphics, Three.js & WebGL',
    titlePl: 'Grafika 3D w przeglądarce, Three.js, React Three Fiber i WebGL',
    emoji: '🧊',
    level: 'V3',
    yt: [
      { ytId: 'Q7AOvWpIVHU', title: 'Build a 3D Web Portfolio with Three.js in 15 Minutes', channel: 'Fireship', dur: 590 },
      { ytId: 'DPl34H2ISsk', title: 'React Three Fiber & 3D Web Experiences Tutorial', channel: 'Bruno Simon / Three.js', dur: 540 },
      { ytId: 'f4s1h2YETNY', title: 'PBR Materials, Lighting & GLTF Optimization for WebGL', channel: 'The Coding Train', dur: 470 }
    ],
    words: [
      ['Scene Graph & Mesh', 'Graf sceny 3D oraz siatka wielokątów z materiałem', '🕸️', 'Attach the rotating geometry mesh to the Three.js scene graph.'],
      ['PBR Material (Metal/Rough)', 'Fizycznie poprawny materiał (metaliczność, chropowatość)', '✨', 'Use MeshStandardMaterial with PBR roughness and metalness maps.'],
      ['OrbitControls & Damping', 'Interaktywne obracanie kamery z płynnym wygaszaniem', '🪐', 'Enable OrbitControls damping for smooth, inertial camera rotation.'],
      ['Draco GLTF Compression', 'Kompresja modeli 3D przyspieszająca ładowanie', '📦', 'Compress 3D assets with Draco GLTF compression to keep bundles under 2MB.'],
      ['Raycasting Interaction', 'Wykrywanie kliknięć myszy na obiektach 3D', '🎯', 'Use raycasting interaction to highlight 3D nodes on pointer hover.'],
      ['Post-Processing Bloom', 'Efekt poświaty i korekcji obrazu po renderowaniu', '🌟', 'Add subtle post-processing bloom and tone mapping to emissive surfaces.']
    ],
    sentences: [
      ['Dispose of geometries, materials, and textures on component unmount to prevent WebGL memory leaks.', 'Zwalniaj geometrie, materiały i tekstury przy odmontowaniu komponentu, aby zapobiec wyciekom pamięci WebGL.', '🧹'],
      ['Combine ambient light, a directional key light, and an environment map for realistic 3D depth.', 'Połącz światło otoczenia, kierunkowe światło główne oraz mapę środowiskową dla realistycznej głębi 3D.', '💡'],
      ['Use InstancedMesh when rendering hundreds of repeated 3D particles in a single draw call.', 'Użyj InstancedMesh podczas renderowania setek powtarzalnych cząsteczek 3D w jednym wywołaniu rysowania.', '🚀'],
      ['Clamp pixel ratio to a maximum of 2 so high-DPI mobile screens maintain 60 frames per second.', 'Ogranicz współczynnik pikseli maksymalnie do 2, aby ekrany mobilne o wysokiej gęstości utrzymywały 60 klatek na sekundę.', '📱']
    ],
    quiz: [
      [
        'How do you render 2,000 identical 3D objects in Three.js at 60 FPS?',
        ['Use THREE.InstancedMesh to batch all instances into a single GPU draw call', 'Create 2,000 separate WebGLRenderers', 'Reload the page on every frame', 'Use 16K uncompressed BMP textures'],
        0,
        'InstancedMesh batches transformations on the GPU, reducing thousands of draw calls to one.'
      ]
    ]
  },
  {
    id: 'g5',
    domain: 'G',
    short: 'Audio AI',
    titleEn: 'Audio, Voice Cloning & AI Music',
    titlePl: 'Dźwięk AI, synteza mowy TTS, muzyka generatywna i Web Audio API',
    emoji: '🎧',
    level: 'V2',
    yt: [
      { ytId: 'spUNpyF58BY', title: 'How Digital Audio, Fourier Transforms & Sound Synthesis Work', channel: '3Blue1Brown', dur: 580 },
      { ytId: 'TG6BuS-I_pE', title: 'Web Audio API & Real-Time Browser Sound Synthesis', channel: 'Fireship', dur: 340 },
      { ytId: 'HK6y8DAPN_0', title: 'Neural Text-to-Speech, Prosody & Generative Music', channel: 'AI Explained', dur: 430 }
    ],
    words: [
      ['Neural Prosody & Pacing', 'Naturalna intonacja, akcent i tempo mowy AI', '🗣️', 'Tune neural prosody and pacing so technical terms sound natural.'],
      ['Web Audio Oscillator', 'Syntezator fal dźwiękowych w przeglądarce', '🎹', 'Trigger a crisp Web Audio oscillator chime when the user answers correctly.'],
      ['Audio Ducking', 'Automatyczne ściszenie muzyki w tle podczas mowy lektora', '🔉', 'Apply smooth audio ducking to background tracks whenever voiceover plays.'],
      ['Stem Separation', 'Rozdzielenie utworu na wokal, perkusję i bas', '🎚️', 'Use AI stem separation to isolate clean dialogue from ambient noise.'],
      ['Loudness Normalization', 'Wyrównanie głośności do standardu -14 LUFS', '📏', 'Normalize podcast audio to -14 LUFS for consistent streaming playback.'],
      ['Low-Latency Streaming TTS', 'Strumieniowa synteza mowy o niskim opóźnieniu', '⚡', 'Stream chunked PCM audio for low-latency conversational voice feedback.']
    ],
    sentences: [
      ['Use the Web Speech API or neural TTS so learners can hear every English term pronounced clearly.', 'Używaj Web Speech API lub neuronowego TTS, aby uczący się mogli usłyszeć wyraźną wymowę każdego angielskiego terminu.', '🔊'],
      ['Provide a slow playback toggle at 0.75x speed for complex technical sentences.', 'Zapewnij przełącznik wolnego odtwarzania 0.75x dla złożonych zdań technicznych.', '🐢'],
      ['Synthesize lightweight UI sound effects with the Web Audio API instead of loading heavy MP3 files.', 'Syntezuj lekkie efekty dźwiękowe UI za pomocą Web Audio API zamiast ładować ciężkie pliki MP3.', '🎵'],
      ['Always include captions alongside audio so the app works in quiet environments.', 'Zawsze dołączaj napisy obok dźwięku, aby aplikacja działała w cichym otoczeniu.', '💬']
    ],
    quiz: [
      [
        'What is "Audio Ducking" in multimedia production?',
        ['Automatically lowering background music volume whenever voice narration is active', 'Speeding up audio by 400%', 'Deleting the left stereo channel', 'Converting MP3 files into PNG images'],
        0,
        'Audio ducking keeps spoken narration intelligible without abruptly cutting the background score.'
      ]
    ]
  },
  {
    id: 'g6',
    domain: 'G',
    short: 'Branding',
    titleEn: 'Brand Identity, Logos & Vectors',
    titlePl: 'Identyfikacja wizualna, SVG, ikony i spójność marki',
    emoji: '✒️',
    level: 'V2',
    yt: [
      { ytId: 'emFMHH2Bfvo', title: 'SVG in 100 Seconds – Scalable Vector Graphics in Code', channel: 'Fireship', dur: 135 },
      { ytId: 'y29X29nKJbU', title: 'Brand Identity Design – Logos, Typography & Color Systems', channel: 'The Futur', dur: 510 },
      { ytId: 'UTHgr6NLeEw', title: 'Coding Interactive SVG Illustrations & Mascots', channel: 'DesignCourse', dur: 440 }
    ],
    words: [
      ['Inline Parametric SVG', 'Wektor SVG generowany i sterowany kodem', '📐', 'Render the thematic wheel as an interactive inline parametric SVG.'],
      ['Bezier Path Geometry', 'Krzywe Béziera definiujące kształty wektorowe', '〰️', 'Use polar-to-cartesian math to calculate clean SVG arc and Bezier path geometry.'],
      ['Brand Voice & Archetype', 'Osobowość, ton komunikacji i archetyp marki', '📣', 'Align copy and mascot expressions with a friendly mentor brand voice.'],
      ['Optical Alignment', 'Wyrównanie optyczne uwzględniające percepcję oka', '👁️', 'Offset play triangle icons slightly right for true optical alignment.'],
      ['Monochrome Scalability', 'Czytelność znaku w jednym kolorze i małej skali', '🔍', 'Test favicon legibility at 16x16 pixels to ensure monochrome scalability.'],
      ['Vector Stroke Consistency', 'Jednolita grubość obrysu ikon w całym systemie', '✏️', 'Standardize all interface icons to a 2px vector stroke width.']
    ],
    sentences: [
      ['Code logos, diagrams, and mascots in clean SVG so they stay razor-sharp at any zoom level.', 'Koduj logotypy, diagramy i maskotki w czystym SVG, aby pozostawały idealnie ostre przy każdym powiększeniu.', '🦅'],
      ['Use trigonometric helper functions to generate radial charts and thematic wheels programmatically.', 'Używaj funkcji trygonometrycznych do programowego generowania wykresów kołowych i tarcz tematycznych.', '🧭'],
      ['Keep brand colors defined in root CSS custom properties for instant theme switching.', 'Definiuj kolory marki w zmiennych CSS w elemencie root dla natychmiastowego przełączania motywów.', '🎨'],
      ['Pair an expressive geometric display font with a highly legible body typeface.', 'Połącz wyrazisty geometryczny krój nagłówkowy z wysoce czytelnym krojem tekstu głównego.', '🔤']
    ],
    quiz: [
      [
        'Why is SVG superior to raster PNGs for interactive wheels, icons, and UI mascots?',
        ['SVG is resolution-independent, lightweight, stylable via CSS, and every path can have click/hover handlers in the DOM', 'SVG files cannot be displayed on mobile phones', 'SVG requires a dedicated GPU cluster', 'SVG only supports black pixels'],
        0,
        'DOM-native SVG elements scale infinitely and support per-slice interactivity and CSS transitions.'
      ]
    ]
  },
  {
    id: 'g7',
    domain: 'G',
    short: 'Game Art',
    titleEn: 'Game Assets, Shaders & Sprites',
    titlePl: 'Assety do gier, shadery GLSL, sprite-sheety i grywalizacja',
    emoji: '🎮',
    level: 'V3',
    yt: [
      { ytId: 'f4s1h2YETNY', title: 'An Introduction to Shader Art Coding (GLSL)', channel: 'kishimisu', dur: 560 },
      { ytId: 'G1Qq2I8rm9M', title: '2D Game Dev, Sprite Sheets & Particle Systems', channel: 'Brackeys', dur: 480 },
      { ytId: 'L1n2b3c4d5e', title: 'Gamification Mechanics: XP, Streaks & Progression Loops', channel: 'Game Maker’s Toolkit', dur: 510 }
    ],
    words: [
      ['Fragment Shader (GLSL)', 'Program karty graficznej obliczający kolor piksela', '🌈', 'Write a custom GLSL fragment shader for the animated background aura.'],
      ['Sprite Atlas & Tilemap', 'Arkusz klatek animacji i mapa kafelkowa', '🗺️', 'Pack character frames into a single texture sprite atlas.'],
      ['Particle Emitter', 'Emiter cząsteczek (iskry, konfetti, efekty trafienia)', '✨', 'Trigger a burst from the particle emitter when a level test is passed.'],
      ['Core Compulsion Loop', 'Główna pętla zaangażowania gracza/ucznia', '🔄', 'Design a rewarding core compulsion loop: Learn -> Practice -> Earn XP -> Unlock Node.'],
      ['Signed Distance Field', 'Funkcja odległości ze znakiem do ostrych kształtów', '⭕', 'Render smooth procedural shapes in shaders using Signed Distance Fields (SDF).'],
      ['Delta-Time Physics', 'Ruch niezależny od liczby klatek na sekundę', '⏱️', 'Multiply velocity by frame delta-time so animations run at the same speed on 60Hz and 144Hz monitors.']
    ],
    sentences: [
      ['Always multiply movement by delta time inside requestAnimationFrame loops.', 'Zawsze mnóż przemieszczenie przez delta time wewnątrz pętli requestAnimationFrame.', '⚡'],
      ['Use gamification mechanics like daily streaks, stars, and unlockable nodes to sustain motivation.', 'Używaj mechanik grywalizacji, takich jak codzienne serie (streaks), gwiazdki i odblokowywane węzły, aby utrzymać motywację.', '🏆'],
      ['Give immediate visual and audio juice when a user completes a challenge.', 'Zapewnij natychmiastową wizualną i dźwiękową satysfakcję ("juice"), gdy użytkownik ukończy wyzwanie.', '🎉'],
      ['Offload procedural gradients and wave effects to GPU fragment shaders.', 'Przenieś proceduralne gradienty i efekty falowe na shadery fragmentów karty graficznej.', '🖥️']
    ],
    quiz: [
      [
        'Why must game and simulation loops multiply movement speed by `deltaTime`?',
        ['So movement speed stays identical regardless of whether the screen refreshes at 30 FPS, 60 FPS, or 144 FPS', 'To make the game crash on mobile devices', 'To disable keyboard input', 'To increase file size'],
        0,
        'Delta-time scaling decouples simulation speed from hardware frame rate.'
      ]
    ]
  },
  {
    id: 'g8',
    domain: 'G',
    short: 'Animation',
    titleEn: 'Interactive Animations & Micro-UX',
    titlePl: 'Animacje interfejsu, Motion, mikro-interakcje i płynność 60fps',
    emoji: '💫',
    level: 'V3',
    yt: [
      { ytId: 'SuqU904ZHA4', title: '12 Principles of Animation Applied to UI & Web Design', channel: 'DesignCourse', dur: 460 },
      { ytId: 'vJNVramny9k', title: 'High-Performance CSS & Framer Motion UI Animations', channel: 'Fireship', dur: 330 },
      { ytId: 'z1a2b3c4d5f', title: 'Micro-Interactions that Delight Users Without Lag', channel: 'NNgroup', dur: 390 }
    ],
    words: [
      ['Compositor-Only Property', 'Właściwość animowana na GPU (transform, opacity)', '🚀', 'Animate only compositor-only properties like transform and opacity.'],
      ['Spring Physics Easing', 'Fizyka sprężyny dająca naturalne wyhamowanie', '🌀', 'Use spring physics easing instead of linear transitions for modal cards.'],
      ['Micro-Interaction Feedback', 'Natychmiastowa odpowiedź wizualna na akcję (<200ms)', '⚡', 'Keep button micro-interaction feedback under 150 milliseconds.'],
      ['Reduced Motion Media Query', 'Poszanowanie preferencji ograniczenia ruchu', '♿', 'Respect prefers-reduced-motion for users sensitive to vestibular motion.'],
      ['Layout Thrashing Prevention', 'Unikanie kosztownego przeliczania geometrii DOM', '🛡️', 'Prevent layout thrashing by never animating width, height, or top on scroll.'],
      ['Shared Layout Transition', 'Płynne przejście elementu między dwoma stanami widoku', '🔀', 'Morph the active tab indicator smoothly using a shared layout transition.']
    ],
    sentences: [
      ['Restrict UI animations to transform and opacity so the browser compositor stays at 60 FPS.', 'Ogranicz animacje interfejsu do transform oraz opacity, aby kompozytor przeglądarki utrzymywał 60 klatek na sekundę.', '🎯'],
      ['Keep routine button and tab hover transitions under 200 milliseconds.', 'Utrzymuj rutynowe przejścia najechania na przyciski i zakładki poniżej 200 milisekund.', '⏱️'],
      ['Never block access to primary content behind slow scroll-reveal animations.', 'Nigdy nie blokuj dostępu do głównej treści za powolnymi animacjami odkrywania podczas przewijania.', '🚪'],
      ['Disable decorative motion automatically when prefers-reduced-motion is enabled.', 'Wyłączaj dekoracyjny ruch automatycznie, gdy włączona jest opcja prefers-reduced-motion.', '🧘']
    ],
    quiz: [
      [
        'Which CSS properties can be animated purely on the GPU compositor thread without triggering expensive DOM layout recalculations?',
        ['`transform` and `opacity`', '`width`, `height`, and `margin-top`', '`border-width` and `font-size`', '`padding` and `left`'],
        0,
        'Animating `transform` and `opacity` avoids layout and paint recalculations, guaranteeing silky 60fps performance.'
      ]
    ]
  },
  {
    id: 'g9',
    domain: 'G',
    short: 'Retouch',
    titleEn: 'Photo Editing, Inpainting & Upscaling',
    titlePl: 'Edycja zdjęć AI, Inpainting, Outpainting i skalowanie rozdzielczości',
    emoji: '🪄',
    level: 'V4',
    yt: [
      { ytId: 'K8a2b3c4d5g', title: 'Generative Fill, Inpainting & Outpainting Explained', channel: 'PiXimperfect', dur: 490 },
      { ytId: 'M9a2b3c4d5h', title: 'AI Super-Resolution & Image Restoration Workflows', channel: 'Two Minute Papers', dur: 370 },
      { ytId: 'N1a2b3c4d5i', title: 'Canvas API & WebGL Image Filters in TypeScript', channel: 'Traversy Media', dur: 450 }
    ],
    words: [
      ['Generative Inpainting', 'Zastępowanie zaznaczonego fragmentu obrazu przez AI', '🖌️', 'Use generative inpainting to remove background distractions seamlessly.'],
      ['Canvas Outpainting', 'Rozszerzanie kadru poza oryginalne krawędzie zdjęcia', '🖼️', 'Expand a square product photo into a 16:9 hero banner via canvas outpainting.'],
      ['Super-Resolution Upscaler', 'Inteligentne powiększanie rozdzielczości (2x/4x)', '🔍', 'Run a 4x super-resolution upscaler before exporting print-ready assets.'],
      ['Alpha Matting & Cutout', 'Precyzyjne wycinanie obiektu z zachowaniem półprzezroczystości', '✂️', 'Extract hair and glass edges cleanly using neural alpha matting.'],
      ['Relighting & Normal Estimation', 'Zmiana oświetlenia zdjęcia na podstawie mapy normalnych', '💡', 'Adjust studio rim lighting post-capture using AI normal estimation.'],
      ['WebP / AVIF Compression', 'Nowoczesne formaty kompresji obrazów dla sieci Web', '📦', 'Convert hero visuals to AVIF or WebP for 60% faster page loads.']
    ],
    sentences: [
      ['Use outpainting to adapt vertical portraits into wide desktop hero banners without cropping.', 'Użyj outpaintingu, aby dostosować pionowe portrety do szerokich banerów desktopowych bez przycinania.', '↔️'],
      ['Match grain, shadow softness, and perspective when inpainting new objects into a scene.', 'Dopasuj ziarno, miękkość cieni oraz perspektywę podczas wmalowywania (inpainting) nowych obiektów w scenę.', '🎨'],
      ['Serve responsive images in WebP or AVIF format to keep Largest Contentful Paint fast.', 'Serwuj responsywne obrazy w formacie WebP lub AVIF, aby utrzymać szybki wskaźnik Largest Contentful Paint.', '⚡'],
      ['Always apply a subtle contrast scrim when placing white typography over photography.', 'Zawsze stosuj delikatną warstwę przyciemniającą (scrim) podczas umieszczania białej typografii na fotografii.', '🌓']
    ],
    quiz: [
      [
        'What is the difference between Inpainting and Outpainting?',
        ['Inpainting modifies a masked region inside an existing image, while Outpainting extends the image beyond its original borders', 'Inpainting is for audio files and Outpainting is for SQL databases', 'They both delete the image permanently', 'Outpainting reduces resolution to 1x1 pixel'],
        0,
        'Inpainting edits internal masked regions; Outpainting extrapolates new surroundings outside the frame.'
      ]
    ]
  },
  {
    id: 'g10',
    domain: 'G',
    short: 'Spatial',
    titleEn: 'AR/VR, WebXR & Spatial Computing',
    titlePl: 'Rzeczywistość rozszerzona i wirtualna, WebXR oraz Gaussian Splatting',
    emoji: '🥽',
    level: 'V5',
    yt: [
      { ytId: 'P1a2b3c4d5j', title: '3D Gaussian Splatting – Real-Time Photorealistic Scenes', channel: 'Two Minute Papers', dur: 430 },
      { ytId: 'Q2a2b3c4d5k', title: 'WebXR API – Building AR & VR Experiences in the Browser', channel: 'Fireship', dur: 310 },
      { ytId: 'R3a2b3c4d5l', title: 'Spatial UI Design Principles for Headsets & 3D Viewports', channel: 'Apple Developer / Design', dur: 520 }
    ],
    words: [
      ['3D Gaussian Splatting', 'Fotorealistyczna rekonstrukcja scen 3D w czasie rzeczywistym', '🌌', 'Capture real-world rooms using 3D Gaussian Splatting for web walkthroughs.'],
      ['WebXR Session', 'Sesja AR/VR uruchamiana bezpośrednio w przeglądarce', '🥽', 'Launch an immersive-vr WebXR session with a single button click.'],
      ['Spatial Glassmorphism', 'Półprzezroczyste panele UI zawieszone w przestrzeni 3D', '🪟', 'Place spatial glassmorphism control panels at comfortable eye level.'],
      ['6DoF Tracking', 'Śledzenie 6 stopni swobody (pozycja + obrót w przestrzeni)', '🧭', 'Support full 6DoF head and hand tracking inside the virtual training lab.'],
      ['Foveated Rendering', 'Renderowanie w pełnej ostrości tam, gdzie patrzy użytkownik', '👁️', 'Use foveated rendering to maintain 90 FPS on standalone headsets.'],
      ['Diegetic Interface', 'Interfejs będący częścią świata 3D (np. ekran na nadgarstku)', '⌚', 'Attach telemetry readouts to a diegetic interface inside the simulation.']
    ],
    sentences: [
      ['Position spatial UI panels between 1.5 and 2 meters away from the viewer for visual comfort.', 'Umieszczaj przestrzenne panele UI w odległości od 1,5 do 2 metrów od widza dla komfortu wzroku.', '📏'],
      ['Provide a standard orbit-camera fallback so users without a headset can explore the 3D scene.', 'Zapewnij standardowy tryb kamery orbitalnej jako alternatywę, aby użytkownicy bez gogli mogli eksplorować scenę 3D.', '🖥️'],
      ['Keep spatial buttons large and angularly sized for gaze-and-pinch selection.', 'Twórz duże przyciski przestrzenne dostosowane kątowo do wyboru wzrokiem i gestem uszczypnięcia.', '🤏'],
      ['Maintain a rock-solid frame rate to prevent motion sickness in immersive viewports.', 'Utrzymuj całkowicie stabilną liczbę klatek na sekundę, aby zapobiec chorobie lokomocyjnej w widokach immersyjnych.', '🛡️']
    ],
    quiz: [
      [
        'Why must every WebXR / Spatial web application include a non-VR mouse/touch camera fallback?',
        ['So the 95%+ of users browsing on laptops and smartphones can still interact with the 3D scene seamlessly', 'Because headsets do not support HTML', 'To disable colors on desktop', 'To force page reloads'],
        0,
        'Progressive enhancement ensures spatial apps work universally on desktop/mobile screens as well as headsets.'
      ]
    ]
  },
  {
    id: 'g11',
    domain: 'G',
    short: 'Visuals',
    titleEn: 'Typography, Color & Visual Hierarchy',
    titlePl: 'Typografia, psychologia koloru, kontrast WCAG i rytm kompozycji',
    emoji: '🔤',
    level: 'V4',
    yt: [
      { ytId: 'agbh1wbfJt8', title: 'Typography & Layout Rules Every Designer & Coder Should Know', channel: 'The Futur', dur: 510 },
      { ytId: 'AvgCkHrcj8w', title: 'Color Theory, Contrast & Accessible Palettes in UI', channel: 'DesignCourse', dur: 440 },
      { ytId: 'y29X29nKJbU', title: 'Grid Systems, Whitespace & Editorial Hierarchy', channel: 'Flux Academy', dur: 470 }
    ],
    words: [
      ['Fluid Type Scale (clamp)', 'Płynna skala typograficzna dopasowana do szerokości ekranu', '📏', 'Use CSS clamp() for a fluid type scale from mobile to 1440px desktop.'],
      ['Tabular Numerals', 'Cyfry o równej szerokości do tabel i liczników', '🔢', 'Apply font-variant-numeric: tabular-nums to all timers, scores, and KPI tables.'],
      ['WCAG AA Contrast Ratio', 'Minimalny kontrast czytelności tekstu (4.5:1)', '👁️', 'Verify a minimum 4.5:1 WCAG AA contrast ratio on all body copy.'],
      ['Measure (65–75ch)', 'Optymalna długość wiersza tekstu do czytania', '📖', 'Constrain article paragraphs to a 65ch measure for effortless reading.'],
      ['Text-Wrap Balance', 'Równomierne łamanie wieloliniowych nagłówków', '⚖️', 'Apply text-wrap: balance to headlines to eliminate isolated orphan words.'],
      ['2+1 Font Discipline', 'Zasada maks. 2 krojów tekstu + 1 kroju monospace', '🅰️', 'Follow the 2+1 font discipline: one display face, one body face, and one mono font.']
    ],
    sentences: [
      ['Always enable tabular numerals on timers, progress counters, and financial metrics so digits never jitter.', 'Zawsze włączaj cyfry tabelaryczne (tabular-nums) w minutnikach, licznikach postępu i metrykach, aby cyfry nie drgały.', '⏱️'],
      ['Keep body paragraphs between 60 and 75 characters per line for comfortable eye scanning.', 'Utrzymuj akapity tekstu głównego w granicach 60–75 znaków w wierszu dla wygodnego skanowania wzrokiem.', '👁️'],
      ['Never signal error or success states by color alone; always pair color with an icon and text label.', 'Nigdy nie sygnalizuj stanów błędu lub sukcesu wyłącznie kolorem; zawsze łącz kolor z ikoną oraz etykietą tekstową.', '✅'],
      ['Use generous whitespace and subtle hairline borders instead of nesting cards inside cards.', 'Stosuj dużą ilość białej przestrzeni i subtelne linie podziału zamiast zagnieżdżania kart wewnątrz kart.', '✨']
    ],
    quiz: [
      [
        'Why should countdown timers and live data tables always use `tabular-nums` (tabular numerals)?',
        ['So every digit occupies the exact same horizontal width and numbers do not jump sideways as they change', 'To change numbers into Roman numerals', 'To hide negative values', 'To make text invisible on mobile'],
        0,
        'Tabular numerals give each digit equal width, keeping vertical columns aligned and preventing layout jitter during live updates.'
      ]
    ]
  },
  {
    id: 'g12',
    domain: 'G',
    short: 'Production',
    titleEn: 'Video Editing, Captions & Avatars',
    titlePl: 'Montaż wideo, dynamiczne napisy, awatary AI i produkcja kursów',
    emoji: '📹',
    level: 'V5',
    yt: [
      { ytId: 'S1a2b3c4d5m', title: 'How to Produce Engaging Tech Tutorials & Product Demos', channel: 'Fireship / Creator Lab', dur: 420 },
      { ytId: 'T2a2b3c4d5n', title: 'Automated Whisper Transcription & Interactive Captions', channel: 'AI Engineer', dur: 460 },
      { ytId: 'U3a2b3c4d5o', title: 'Retention Editing, Visual Hooks & B-Roll Pacing', channel: 'Ali Abdaal / Studio', dur: 510 }
    ],
    words: [
      ['Word-Level Timestamp', 'Znacznik czasu z dokładnością do pojedynczego słowa', '⏱️', 'Sync interactive transcript highlighting using word-level timestamps.'],
      ['Visual Pattern Interrupt', 'Zmiana kadru lub grafiki co kilka sekund utrzymująca uwagę', '⚡', 'Insert a B-roll diagram every eight seconds as a visual pattern interrupt.'],
      ['J-Cut & L-Cut Transition', 'Przejście, w którym dźwięk wyprzedza lub pozostaje po obrazie', '🎞️', 'Use J-cuts so the next speaker’s voice begins slightly before the visual cut.'],
      ['Talking-Head Avatar', 'Cyfrowy prezenter lub maskotka z synchronizacją ust', '🗣️', 'Pair the interactive lesson with an animated guide avatar that speaks English prompts.'],
      ['Chapter Marker Navigation', 'Nawigacja po rozdziałach materiału wideo', '🔖', 'Add clickable chapter markers so learners can jump directly to key concepts.'],
      ['Dual-Language Subtitles', 'Napisy angielskie ze wsparciem tłumaczenia', '🌐', 'Display primary English transcripts with optional Polish comprehension hints.']
    ],
    sentences: [
      ['Click any line in the synchronized English transcript to jump the video player to that exact timestamp.', 'Kliknij dowolną linię w zsynchronizowanym angielskim transkrypcie, aby przewinąć odtwarzacz wideo do tego dokładnego momentu.', '🎯'],
      ['Open every educational video with a clear visual hook stating what the viewer will build or master.', 'Rozpoczynaj każde wideo edukacyjne wyraźnym haczykiem wizualnym mówiącym, co widz zbuduje lub opanuje.', '🪝'],
      ['Combine watching in English with immediate interactive comprehension quizzes.', 'Łącz oglądanie po angielsku z natychmiastowymi interaktywnymi quizami zrozumienia treści.', '🧠'],
      ['Keep audio crisp and free of room echo—viewers forgive 720p video, but abandon poor audio.', 'Utrzymuj dźwięk czysty i bez pogłosu — widzowie wybaczą wideo 720p, ale porzucą nagranie ze złym dźwiękiem.', '🎙️']
    ],
    quiz: [
      [
        'Why do interactive timestamped transcripts dramatically accelerate learning from English technical videos?',
        ['Learners can read along, replay specific sentences on click, and verify unfamiliar technical phrases in context', 'They mute the computer permanently', 'They delete the video after 10 seconds', 'They replace the browser'],
        0,
        'Interactive transcripts link auditory input with written English terminology and allow instant sentence-level replay.'
      ]
    ]
  },

  // ==================== BLUE: E-MARKETING & GROWTH (12) ====================
  {
    id: 'b1',
    domain: 'B',
    short: 'SEO & GEO',
    titleEn: 'SEO, GEO & AI Search Optimization',
    titlePl: 'Pozycjonowanie SEO, GEO (Generative Engine Optimization) i dane strukturalne',
    emoji: '🔍',
    level: 'V1',
    yt: [
      { ytId: 'xsVTqzratPs', title: 'SEO Complete Course – Search Intent, Technical SEO & Ranking', channel: 'Ahrefs', dur: 560 },
      { ytId: 'MYE6T_gd7H0', title: 'Generative Engine Optimization (GEO) – Ranking in AI Answers', channel: 'Search Engine Journal', dur: 440 },
      { ytId: 'l1a2b3c4d5p', title: 'Schema.org JSON-LD & Core Web Vitals for Developers', channel: 'Google Search Central', dur: 480 }
    ],
    words: [
      ['Generative Engine Optimization', 'Optymalizacja treści pod cytowania przez wyszukiwarki AI (GEO)', '🤖', 'Include authoritative statistics and clear definitions for Generative Engine Optimization (GEO).'],
      ['Search Intent Alignment', 'Dopasowanie strony do intencji wyszukiwania użytkownika', '🎯', 'Match landing page structure to transactional or informational search intent.'],
      ['Schema.org JSON-LD', 'Dane strukturalne pomagające robotom zrozumieć stronę', '🕸️', 'Embed Schema.org JSON-LD markup for courses, FAQs, and software applications.'],
      ['Programmatic SEO', 'Skalowalne generowanie stron docelowych na podstawie bazy danych', '⚙️', 'Build high-value comparison pages using programmatic SEO templates.'],
      ['Topic Cluster & Pillar', 'Strona filarowa połączona z artykułami szczegółowymi', '🏛️', 'Organize content into a central pillar page linked to twelve topic cluster articles.'],
      ['Core Web Vitals (LCP/INP)', 'Wskaźniki szybkości ładowania i responsywności strony', '⚡', 'Optimize Largest Contentful Paint (LCP) and Interaction to Next Paint (INP).']
    ],
    sentences: [
      ['Structure technical guides with clear H2 questions and concise answers so both Google and AI engines cite them.', 'Strukturyzuj poradniki techniczne z wyraźnymi pytaniami H2 i zwięzłymi odpowiedziami, aby cytowały je zarówno Google, jak i wyszukiwarki AI.', '📌'],
      ['Add Schema.org JSON-LD structured data to every public landing page.', 'Dodawaj dane strukturalne Schema.org JSON-LD do każdej publicznej strony docelowej.', '🏷️'],
      ['Focus on solving the user’s exact search intent rather than stuffing keywords.', 'Skup się na rozwiązaniu dokładnej intencji wyszukiwania użytkownika zamiast sztucznego upychania słów kluczowych.', '🧭'],
      ['Back every industry claim with original data, benchmarks, or verifiable citations.', 'Popieraj każde twierdzenie branżowe oryginalnymi danymi, benchmarkami lub weryfikowalnymi źródłami.', '📊']
    ],
    quiz: [
      [
        'How does Generative Engine Optimization (GEO) complement traditional SEO?',
        ['It structures content with clear definitions, citations, and quantitative facts so AI answer engines quote and recommend your brand', 'It hides text in white font on a white background', 'It blocks all web crawlers via robots.txt', 'It removes page titles'],
        0,
        'AI search engines prioritize well-structured, fact-dense, authoritative answers with clear semantic markup.'
      ]
    ]
  },
  {
    id: 'b2',
    domain: 'B',
    short: 'Copywriting',
    titleEn: 'AI Copywriting & Content Strategy',
    titlePl: 'Copywriting sprzedażowy z AI, frameworki AIDA/PAS i strategia treści',
    emoji: '✍️',
    level: 'V1',
    yt: [
      { ytId: 'b1a2b3c4d5q', title: 'Copywriting That Converts – Value Propositions & Hooks', channel: 'Marketing Examples', dur: 490 },
      { ytId: 'c2a2b3c4d5r', title: 'PAS & AIDA Frameworks for SaaS Landing Pages', channel: 'Ahrefs', dur: 430 },
      { ytId: 'd3a2b3c4d5s', title: 'How to Prompt AI for High-Converting Brand Copy (Without Slop)', channel: 'HubSpot Marketing', dur: 460 }
    ],
    words: [
      ['Unique Value Proposition', 'Unikalna propozycja wartości wyjaśniająca korzyść klienta', '💎', 'State your Unique Value Proposition clearly in the first headline above the fold.'],
      ['PAS Framework (Problem-Agitate-Solve)', 'Struktura tekstu: Problem → Nasilenie → Rozwiązanie', '🔥', 'Draft the product launch email using the Problem-Agitate-Solve (PAS) framework.'],
      ['Benefit Over Feature', 'Komunikowanie rezultatu dla klienta zamiast suchych parametrów', '🎯', 'Translate technical specs into customer outcomes: benefit over feature.'],
      ['Objection Handling', 'Rozbijanie obiekcji zakupowych przed decyzją klienta', '🛡️', 'Address pricing and migration concerns proactively through objection handling.'],
      ['Tone of Voice Guidelines', 'Zbiór zasad stylu językowego marki (i słów zakazanych)', '📣', 'Provide explicit tone of voice guidelines and ban generic AI buzzwords in your prompt.'],
      ['Microcopy & CTA Clarity', 'Krótkie teksty na przyciskach i komunikatach prowadzące do akcji', '👆', 'Use specific action verbs in CTA microcopy like "Start Free Lesson" instead of "Submit".']
    ],
    sentences: [
      ['Ban clichés like "delve", "unleash", and "game-changer" in your system prompt to keep AI copy authentic.', 'Zakaż klisz takich jak "delve", "unleash" oraz "game-changer" w prompcie systemowym, aby teksty AI brzmiały autentycznie.', '🚫'],
      ['Lead with a concrete, measurable outcome in your hero headline.', 'Zacznij od konkretnego, mierzalnego rezultatu w głównym nagłówku sekcji Hero.', '🎯'],
      ['Place customer proof and quantitative case studies directly next to the claim they support.', 'Umieszczaj dowody społeczne i liczbowe studia przypadków bezpośrednio obok twierdzenia, które potwierdzają.', '🤝'],
      ['Write at an eighth-grade reading level so busy buyers grasp your offer in तीन seconds.', 'Pisz prostym, przejrzystym językiem, aby zajęci decydenci zrozumieli Twoją ofertę w trzy sekundy.', '⚡']
    ],
    quiz: [
      [
        'How do you prevent AI-generated marketing copy from sounding like generic "AI slop"?',
        ['Supply specific customer pain points, real metrics, a concrete framework (like PAS), and a negative constraint list banning cliché buzzwords', 'Ask the AI to "write marketing text with lots of emojis and buzzwords"', 'Leave out all product details', 'Copy-paste lorem ipsum'],
        0,
        'Concrete customer evidence + structural frameworks + banned cliché lists produce sharp, human-grade copy.'
      ]
    ]
  },
  {
    id: 'b3',
    domain: 'B',
    short: 'Social',
    titleEn: 'Social Media & Viral Short-Form',
    titlePl: 'Social Media, LinkedIn B2B, krótkie formy wideo (Reels/Shorts) i dystrybucja',
    emoji: '📱',
    level: 'V2',
    yt: [
      { ytId: 'e4a2b3c4d5t', title: 'Content Repurposing Engine – 1 Video into 12 Social Assets', channel: 'GaryVee / Media Lab', dur: 450 },
      { ytId: 'f5a2b3c4d5u', title: 'How the 3-Second Hook & Retention Curve Drive Reach', channel: 'Colin and Samir', dur: 510 },
      { ytId: 'g6a2b3c4d5v', title: 'Building in Public & Technical Storytelling on LinkedIn/X', channel: 'Starter Story', dur: 430 }
    ],
    words: [
      ['Three-Second Scroll Hook', 'Pierwsze 3 sekundy zatrzymujące przewijanie feedu', '🪝', 'Open with a bold contrarian insight or visual demo as your three-second scroll hook.'],
      ['Content Repurposing Matrix', 'Przekształcanie jednego długiego materiału na wiele formatów', '♻️', 'Turn one deep technical article into five carousels and three short clips via a content repurposing matrix.'],
      ['Building in Public', 'Dzielenie się kulisami budowy produktu dla przyciągnięcia odbiorców', '🏗️', 'Share weekly Vibe Coding demos and architecture lessons by building in public.'],
      ['Retention Graph Drop-off', 'Analiza momentu, w którym widzowie przestają oglądać', '📉', 'Cut dead air in the intro to eliminate early retention graph drop-off.'],
      ['Zero-Click Content', 'Treść dająca pełną wartość bezpośrednio w poście bez zmuszania do klikania', '🎁', 'Publish high-density zero-click content that earns saves and shares organically.'],
      ['Social Listening & Trend Jacking', 'Monitorowanie rozmów w branży i szybka reakcja ekspercka', '👂', 'Use social listening to answer real developer questions within hours of a new release.']
    ],
    sentences: [
      ['Show the working app demo in the very first frame before introducing yourself.', 'Pokaż działające demo aplikacji w pierwszej klatce nagrania, zanim zaczniesz się przedstawiać.', '🎬'],
      ['Design social carousels where every slide delivers one clear takeaway and leads naturally to the next.', 'Projektuj karuzele społecznościowe, w których każdy slajd daje jeden konkretny wniosek i płynnie prowadzi do kolejnego.', '📑'],
      ['Measure saves and shares as your primary indicators of content quality.', 'Mierz zapisania (saves) oraz udostępnienia (shares) jako główne wskaźniki jakości treści.', '📊'],
      ['Repurpose every product release into a short demo video, an architectural breakdown, and a user story.', 'Przekształcaj każde wydanie produktu w krótkie wideo demo, analizę architektoniczną oraz historię użytkownika.', '🔄']
    ],
    quiz: [
      [
        'What is "Zero-Click Content" in modern social media strategy?',
        ['Posts that deliver standalone educational or practical value directly inside the feed without forcing users to click an external link first', 'A post that nobody ever views', 'A broken hyperlink', 'An empty blank page'],
        0,
        'Algorithms reward native zero-click content because it keeps users engaged and generates high save/share rates.'
      ]
    ]
  },
  {
    id: 'b4',
    domain: 'B',
    short: 'Paid Ads',
    titleEn: 'Performance Ads (Meta & Google Ads)',
    titlePl: 'Kampanie płatne PPC, Google Ads, Meta Ads, kreacje AI i ROAS',
    emoji: '🎯',
    level: 'V2',
    yt: [
      { ytId: 'h7a2b3c4d5w', title: 'Google Ads & Meta Ads Performance Marketing Masterclass', channel: 'HubSpot Marketing', dur: 540 },
      { ytId: 'i8a2b3c4d5x', title: 'Creative Testing, ROAS vs CAC & Ad Attribution', channel: 'Y Combinator / Growth', dur: 490 },
      { ytId: 'j9a2b3c4d5y', title: 'Using AI to Generate & Test High-Converting Ad Angles', channel: 'Marketing Against the Grain', dur: 420 }
    ],
    words: [
      ['ROAS (Return on Ad Spend)', 'Zwrot z wydatków na reklamę (Przychód / Koszt reklamy)', '💰', 'Scale ad sets that maintain a 4.0x Return on Ad Spend (ROAS).'],
      ['CAC to LTV Ratio', 'Stosunek kosztu pozyskania klienta do jego wartości życiowej', '⚖️', 'Keep your Customer Acquisition Cost (CAC) below one-third of Customer Lifetime Value (LTV).'],
      ['Creative Angle Testing', 'Testowanie różnych kątów komunikacji reklamowej', '🧪', 'Test three distinct creative angles: time-saving, cost reduction, and career growth.'],
      ['Server-Side Conversion API', 'Przesyłanie zdarzeń konwersji bezpośrednio z serwera', '🖧', 'Implement Server-Side Conversion API to maintain accurate attribution despite browser cookie blocks.'],
      ['Negative Keyword List', 'Lista wykluczających słów kluczowych chroniąca budżet', '🚫', 'Add irrelevant search terms to the negative keyword list daily.'],
      ['Lookalike / Advantage+ Audience', 'Odbiorcy podobni do najlepszych obecnych klientów', '👥', 'Seed the algorithm with high-LTV buyers to build a high-intent lookalike audience.']
    ],
    sentences: [
      ['In modern paid social, creative variation is the primary lever for targeting the right audience.', 'We współczesnych płatnych kampaniach społecznościowych warianty kreacji są główną dźwignią docierania do właściwej grupy odbiorców.', '🎨'],
      ['Match the headline of your landing page to the exact promise made in the ad creative.', 'Dopasuj nagłówek strony docelowej do dokładnej obietnicy złożonej w kreacji reklamowej.', '🔗'],
      ['Kill underperforming ad variants early and iterate on the winning hook.', 'Wyłączaj wcześnie słabo działające warianty reklam i iteruj na zwycięskim haczyku (hooku).', '✂️'],
      ['Track true profit margin alongside gross ROAS before increasing daily ad budgets.', 'Śledź rzeczywistą marżę zysku obok przychodowego ROAS przed zwiększeniem dziennych budżetów reklamowych.', '📈']
    ],
    quiz: [
      [
        'If you spend $1,000 on an ad campaign and generate $4,500 in direct revenue, what is your ROAS?',
        ['4.5x (or 450%)', '0.22x', '$3,500%', '10x'],
        0,
        'ROAS = Revenue attributable to ads ($4,500) / Ad Spend ($1,000) = 4.5x.'
      ]
    ]
  },
  {
    id: 'b5',
    domain: 'B',
    short: 'CRO',
    titleEn: 'Conversion Rate Optimization (CRO)',
    titlePl: 'Optymalizacja współczynnika konwersji, testy A/B i psychologia decyzji',
    emoji: '🧪',
    level: 'V3',
    yt: [
      { ytId: 'k1a2b3c4d5z', title: 'Landing Page Conversion Rate Optimization (CRO) Guide', channel: 'CXL / Peep Laja', dur: 530 },
      { ytId: 'l2a2b3c4d5a', title: 'How to Run Statistically Valid A/B Tests', channel: 'Y Combinator', dur: 460 },
      { ytId: 'm3a2b3c4d5b', title: 'Reducing Friction in Checkout & Onboarding Flows', channel: 'Baymard / UX Lab', dur: 440 }
    ],
    words: [
      ['A/B Split Test & p-Value', 'Eksperyment porównawczy dwóch wersji z istotnością statystyczną', '🔬', 'Run the A/B split test until it reaches 95% statistical confidence (p < 0.05).'],
      ['Above-the-Fold Clarity', 'Natychmiastowa zrozumiałość oferty bez przewijania strony', '👁️', 'Communicate who the product is for and what it does in the above-the-fold hero.'],
      ['Form Friction Reduction', 'Redukcja liczby pól i barier w formularzu rejestracji', '🛝', 'Cut signup form fields from nine to three for immediate form friction reduction.'],
      ['Risk Reversal Guarantee', 'Zdejmowanie ryzyka z klienta (np. darmowy okres próbny bez karty)', '🛡️', 'Boost trial conversions by adding a clear no-credit-card risk reversal guarantee.'],
      ['Heatmap & Session Replay', 'Mapa cieplna kliknięć i nagrania sesji wskazujące miejsca porzuceń', '🔥', 'Inspect rage clicks on the pricing table using heatmap and session replay analysis.'],
      ['Time-to-First-Value (TTFV)', 'Czas od wejścia użytkownika do doświadczenia pierwszego efektu', '⚡', 'Let users try an interactive lesson before signup to minimize Time-to-First-Value.']
    ],
    sentences: [
      ['Let users experience an interactive product demo immediately to cut Time-to-First-Value to seconds.', 'Pozwól użytkownikom od razu wypróbować interaktywne demo produktu, aby skrócić czas do pierwszej wartości (TTFV) do kilku sekund.', '🚀'],
      ['Test one clear hypothesis at a time so you know exactly which change drove the conversion lift.', 'Testuj jedną wyraźną hipotezę naraz, aby wiedzieć dokładnie, która zmiana spowodowała wzrost konwersji.', '🎯'],
      ['Remove secondary navigation distractions on dedicated checkout and signup screens.', 'Usuń rozpraszające elementy nawigacji pobocznej na dedykowanych ekranach płatności i rejestracji.', '🧹'],
      ['Display specific, attributable customer testimonials right beside the call-to-action button.', 'Wyświetlaj konkretne, podpisane imieniem i rolą opinie klientów tuż obok przycisku wezwania do działania.', '💬']
    ],
    quiz: [
      [
        'What is "Time-to-First-Value" (TTFV) in product-led growth and CRO?',
        ['How quickly a new visitor experiences a tangible "aha!" benefit from the product', 'How many years the company has existed', 'The server ping time in milliseconds', 'The price of the enterprise tier'],
        0,
        'Shortening TTFV (e.g., letting users run an interactive exercise immediately) dramatically increases activation rates.'
      ]
    ]
  },
  {
    id: 'b6',
    domain: 'B',
    short: 'Email CRM',
    titleEn: 'Email Automation & CRM Flows',
    titlePl: 'E-mail marketing, sekwencje onboardingowe, segmentacja CRM i retencja',
    emoji: '✉️',
    level: 'V3',
    yt: [
      { ytId: 'n4a2b3c4d5c', title: 'Email Marketing & Lifecycle CRM Automation Masterclass', channel: 'HubSpot Marketing', dur: 500 },
      { ytId: 'o5a2b3c4d5d', title: 'Behavioral Drip Campaigns that Turn Trial Users into Paid', channel: 'SaaStr / Growth', dur: 450 },
      { ytId: 'p6a2b3c4d5e', title: 'Email Deliverability: SPF, DKIM, DMARC & List Hygiene', channel: 'SendGrid / Tech', dur: 390 }
    ],
    words: [
      ['Behavioral Trigger Sequence', 'Sekwencja wiadomości wysyłana po konkretnej akcji użytkownika', '⚡', 'Fire a helpful behavioral trigger sequence when a user completes their first module.'],
      ['RFM Segmentation', 'Segmentacja wg czasu ostatniego zakupu, częstotliwości i wartości', '🗂️', 'Group subscribers using RFM segmentation (Recency, Frequency, Monetary value).'],
      ['SPF, DKIM & DMARC Auth', 'Kryptograficzne uwierzytelnianie domeny chroniące przed wpadaniem do spamu', '🔐', 'Configure SPF, DKIM, and DMARC DNS records for 99% inbox deliverability.'],
      ['Onboarding Drip Flow', 'Seria wiadomości prowadząca nowego użytkownika do aktywacji', '💧', 'Guide new learners to their 7-day streak with a concise onboarding drip flow.'],
      ['Churn Win-Back Campaign', 'Kampania reaktywująca nieaktywnych lub odchodzących użytkowników', '🧲', 'Send a personalized 5-minute challenge as a churn win-back campaign.'],
      ['Zero-Party Data Profile', 'Dane preferencji podane dobrowolnie przez użytkownika w quizie', '📋', 'Personalize lesson recommendations using zero-party data collected during onboarding.']
    ],
    sentences: [
      ['Trigger lifecycle emails based on real user behavior rather than arbitrary calendar blasts.', 'Uruchamiaj wiadomości cyklu życia na podstawie rzeczywistych zachowań użytkownika zamiast przypadkowych wysyłek kalendarzowych.', '🎯'],
      ['Keep every onboarding email focused on one clear action that helps the user succeed.', 'Skup każdą wiadomość onboardingową na jednej wyraźnej akcji, która pomaga użytkownikowi osiągnąć sukces.', '1️⃣'],
      ['Authenticate your sending domain with SPF, DKIM, and DMARC before scaling email volume.', 'Uwierzytelnij swoją domenę wysyłkową rekordami SPF, DKIM oraz DMARC przed zwiększeniem wolumenu wysyłek.', '🛡️'],
      ['Sunset unengaged contacts after ninety days to protect sender reputation.', 'Wygaszaj nieaktywne kontakty po dziewięćdziesięciu dniach, aby chronić reputację nadawcy.', '🌅']
    ],
    quiz: [
      [
        'Why are behavioral trigger emails far more effective than generic batch newsletters?',
        ['They arrive at the exact moment a user takes (or gets stuck on) a specific action inside the product', 'They use larger font sizes', 'They bypass the internet', 'They contain no text'],
        0,
        'Context-aware behavioral triggers match the user’s current stage and intent, yielding 3x–5x higher conversion rates.'
      ]
    ]
  },
  {
    id: 'b7',
    domain: 'B',
    short: 'Analytics',
    titleEn: 'Web Analytics, Funnels & Attribution',
    titlePl: 'Analityka produktowa i webowa, kohorty, lejki konwersji i atrybucja',
    emoji: '📊',
    level: 'V3',
    yt: [
      { ytId: 'q7a2b3c4d5f', title: 'Product & Web Analytics – North Star Metrics, Cohorts & Funnels', channel: 'Y Combinator', dur: 520 },
      { ytId: 'r8a2b3c4d5g', title: 'GA4, PostHog & Event-Based Tracking Architecture', channel: 'MeasureSchool', dur: 470 },
      { ytId: 's9a2b3c4d5h', title: 'Multi-Touch Attribution & Marketing Mix Modeling', channel: 'Ahrefs / Growth', dur: 430 }
    ],
    words: [
      ['North Star Metric', 'Główny wskaźnik odzwierciedlający dostarczaną wartość produktu', '⭐', 'Track Weekly Active Learners completing the 30-Minute Circle as our North Star Metric.'],
      ['Cohort Retention Curve', 'Wykres utrzymania grupy użytkowników startujących w tym samym czasie', '📈', 'Flatten the Day-30 cohort retention curve through daily spaced repetition.'],
      ['Funnel Drop-Off Step', 'Etap lejka, na którym odpada najwięcej użytkowników', '🪣', 'Instrument custom events to pinpoint the exact funnel drop-off step.'],
      ['UTM Taxonomy', 'Spójny system parametrów śledzących źródło i kampanię w URL', '🏷️', 'Enforce a strict lowercase UTM taxonomy across all social and paid links.'],
      ['Multi-Touch Attribution', 'Przypisywanie udziału w konwersji wielu punktom styku klienta', '🕸️', 'Compare first-touch and last-touch models using multi-touch attribution.'],
      ['Activation Milestone', 'Moment, w którym nowy użytkownik wykonuje kluczową akcję dającą wartość', '🏁', 'Define completing three interactive exercises on Day 1 as the activation milestone.']
    ],
    sentences: [
      ['Focus on actionable cohort retention metrics rather than vanity pageview totals.', 'Skupiaj się na praktycznych metrykach retencji kohortowej zamiast próżnych sum wyświetleń strony.', '🧭'],
      ['Define a clean event tracking plan with typed properties before adding analytics snippets.', 'Zdefiniuj przejrzysty plan śledzenia zdarzeń z typowanymi właściwościami przed dodaniem skryptów analitycznych.', '📐'],
      ['Segment conversion funnels by acquisition source and device type to uncover hidden bottlenecks.', 'Segmentuj lejki konwersji według źródła pozyskania oraz typu urządzenia, aby odkryć ukryte wąskie gardła.', '🔍'],
      ['Tie every growth experiment directly to a measurable lift in activation or retention.', 'Powiąż każdy eksperyment wzrostowy bezpośrednio z mierzalnym wzrostem aktywacji lub retencji.', '📈']
    ],
    quiz: [
      [
        'What is the difference between a "North Star Metric" and a "Vanity Metric"?',
        ['A North Star Metric measures real core value delivered to active users, whereas a Vanity Metric looks impressive on paper without reflecting retention or revenue', 'A Vanity Metric is only measured at night', 'They are identical terms', 'A North Star Metric measures server weight'],
        0,
        'North Star Metrics (e.g., weekly completed lessons) align product and growth teams around sustainable customer value.'
      ]
    ]
  },
  {
    id: 'b8',
    domain: 'B',
    short: 'Funnels',
    titleEn: 'Landing Pages & Lead Magnets',
    titlePl: 'Strony lądowania (Landing Pages), interaktywne Lead Magnety i PLG',
    emoji: '🧲',
    level: 'V4',
    yt: [
      { ytId: 't1a2b3c4d5i', title: 'Anatomy of a High-Converting SaaS Landing Page', channel: 'DesignCourse / Flux', dur: 490 },
      { ytId: 'u2a2b3c4d5j', title: 'Engineering as Marketing – Interactive Tools as Lead Magnets', channel: 'MicroConf', dur: 450 },
      { ytId: 'v3a2b3c4d5k', title: 'Product-Led Growth (PLG) Onboarding & Freemium Loops', channel: 'Lenny’s Podcast', dur: 540 }
    ],
    words: [
      ['Engineering as Marketing', 'Budowa darmowego mini-narzędzia lub kalkulatora przyciągającego klientów', '🛠️', 'Vibe code a free interactive Prompt Grader as an Engineering as Marketing lead magnet.'],
      ['Hero Value Stack', 'Zestaw: nagłówek korzyści, podtytuł, główny przycisk CTA i dowód wizualny', '🏛️', 'Keep the hero value stack focused on one primary action and an interactive preview.'],
      ['Interactive Product Tour', 'Samodzielny, klikalny podgląd produktu bez konieczności logowania', '🕹️', 'Embed an interactive product tour directly on the landing page.'],
      ['Social Proof Adjacency', 'Umieszczanie logotypów, ocen i efektów tuż przy przyciskach decyzyjnych', '⭐', 'Maintain strict social proof adjacency next to pricing and signup CTAs.'],
      ['Freemium Upgrade Trigger', 'Naturalny moment przejścia z planu darmowego na płatny', '🔓', 'Design a helpful freemium upgrade trigger when teams invite their fourth collaborator.'],
      ['Viral Referral Loop', 'Mechanizm, w którym użytkownicy zapraszają kolejnych w ramach używania produktu', '🔄', 'Add shareable certification badges to power an organic viral referral loop.']
    ],
    sentences: [
      ['Vibe coding lets you build interactive calculators and graders in hours—the highest-converting lead magnets online.', 'Vibe coding pozwala w kilka godzin budować interaktywne kalkulatory i oceń-sam narzędzia — najlepiej konwertujące lead magnety w sieci.', '🧲'],
      ['Show the actual working interface in the hero section instead of abstract stock illustrations.', 'Pokaż rzeczywisty, działający interfejs w sekcji Hero zamiast abstrakcyjnych ilustracji stockowych.', '🖥️'],
      ['Pace landing page sections by alternating dense feature breakdowns with airy visual proof.', 'Buduj rytm strony docelowej, przeplatając gęste sekcje wyjaśniające z przestronnymi dowodami wizualnymi.', '🎵'],
      ['Make sharing progress certificates effortless so learners become brand ambassadors.', 'Spraw, aby udostępnianie certyfikatów postępu było bezwysiłkowe, dzięki czemu uczniowie staną się ambasadorami marki.', '🏅']
    ],
    quiz: [
      [
        'What is "Engineering as Marketing" in the era of Vibe Coding?',
        ['Building a free, genuinely useful interactive micro-app (e.g., an ROI calculator, grader, or sandbox) that attracts and qualifies your ideal customers', 'Sending unsolicited spam faxes', 'Hiding the product behind a 30-field contact form', 'Buying fake followers'],
        0,
        'Interactive micro-tools built with Vibe Coding deliver immediate value and convert far better than static PDF ebooks.'
      ]
    ]
  },
  {
    id: 'b9',
    domain: 'B',
    short: 'E-Comm',
    titleEn: 'E-Commerce & Product Launches',
    titlePl: 'E-Commerce, merchandising cyfrowy, koszyk, subskrypcje i premiery produktów',
    emoji: '🛍️',
    level: 'V4',
    yt: [
      { ytId: 'w4a2b3c4d5l', title: 'Modern E-Commerce UX – Product Cards, Filters & Checkout', channel: 'Baymard Institute', dur: 480 },
      { ytId: 'x5a2b3c4d5m', title: 'How to Launch on Product Hunt, Hacker News & Social', channel: 'Y Combinator', dur: 510 },
      { ytId: 'y6a2b3c4d5n', title: 'Pricing Psychology, Bundling & Subscription Retention', channel: 'ProfitWell / Paddle', dur: 460 }
    ],
    words: [
      ['Average Order Value (AOV)', 'Średnia wartość zamówienia w sklepie', '🛒', 'Increase Average Order Value (AOV) with relevant post-purchase bundle offers.'],
      ['Cart Abandonment Recovery', 'Odzyskiwanie porzuconych koszyków zakupowych', '🔄', 'Save cart state in localStorage and trigger a gentle cart abandonment recovery reminder.'],
      ['Faceted Search & Filtering', 'Wielokryterialne filtrowanie katalogu produktów bez przeładowania', '🎛️', 'Implement instant client-side faceted search and filtering across categories.'],
      ['Anchor Pricing Tier', 'Plan cenowy stanowiący punkt odniesienia dla najpopularniejszego pakietu', '⚓', 'Highlight the Pro plan next to an Enterprise anchor pricing tier.'],
      ['Launch Day Momentum', 'Skumulowana aktywność społeczności w pierwszych godzinach premiery', '🚀', 'Coordinate demos, creator reviews, and community Q&A for launch day momentum.'],
      ['Transparent Total Cost', 'Jasne pokazanie pełnej ceny (z dostawą/podatkiem) bez ukrytych opłat', '🧾', 'Show transparent total cost early in the cart drawer to prevent checkout drop-off.']
    ],
    sentences: [
      ['Keep product cards clean: high-aspect photo, title, rating, and clear price without badge clutter.', 'Utrzymuj karty produktów czyste: zdjęcie o spójnych proporcjach, tytuł, ocena i wyraźna cena bez bałaganu odznak.', '🛍️'],
      ['Use a slide-over cart drawer so shoppers can review items without losing their place in the catalog.', 'Użyj wysuwanego panelu koszyka, aby kupujący mogli przejrzeć produkty bez utraty miejsca w katalogu.', '🛒'],
      ['Offer an annual billing toggle with a clear savings percentage on SaaS pricing pages.', 'Zaoferuj przełącznik rozliczenia rocznego z wyraźnie pokazanym procentem oszczędności na stronach cennika SaaS.', '💳'],
      ['Prepare an interactive live sandbox before launching on Product Hunt or Hacker News.', 'Przygotuj interaktywną piaskownicę na żywo przed premierą na Product Hunt lub Hacker News.', '🚀']
    ],
    quiz: [
      [
        'What is the #1 reason users abandon online shopping carts during checkout?',
        ['Unexpected extra costs (hidden fees, shipping, taxes) or forced account creation before seeing the total', 'The website loading too fast', 'Clear product photography', 'Having a working back button'],
        0,
        'Upfront price transparency and guest/low-friction checkout eliminate the primary drivers of cart abandonment.'
      ]
    ]
  },
  {
    id: 'b10',
    domain: 'B',
    short: 'Community',
    titleEn: 'Influencer & Community Growth',
    titlePl: 'Wzrost oparty na społeczności, twórcach, ambasadach i efektach sieciowych',
    emoji: '🤝',
    level: 'V5',
    yt: [
      { ytId: 'z7a2b3c4d5o', title: 'Community-Led Growth – Building Ecosystems Around Products', channel: 'a16z / Growth', dur: 490 },
      { ytId: 'A8a2b3c4d5p', title: 'Creator Partnerships, Affiliates & Authentic Sponsorships', channel: 'Colin and Samir', dur: 450 },
      { ytId: 'B9a2b3c4d5q', title: 'User-Generated Templates & Marketplace Flywheels', channel: 'Lenny’s Podcast', dur: 520 }
    ],
    words: [
      ['Community-Led Growth', 'Model wzrostu napędzany wymianą wiedzy i szablonów wśród użytkowników', '🌱', 'Build a public prompt & template gallery to fuel community-led growth.'],
      ['User-Generated Templates', 'Szablony i projekty tworzone oraz udostępniane przez społeczność', '🧩', 'Let power users publish remixable User-Generated Templates (UGT).'],
      ['Creator Co-Creation', 'Współtworzenie funkcji lub wyzwań z twórcami branżowymi', '🎬', 'Partner with technical educators for creator co-creation hackathons.'],
      ['Network Effect Flywheel', 'Koło zamachowe, w którym każdy nowy użytkownik zwiększa wartość dla pozostałych', '⚙️', 'Strengthen the network effect flywheel through peer code reviews and leaderboards.'],
      ['Champion & Ambassador Tier', 'Program wyróżniający najbardziej pomocnych liderów społeczności', '🏅', 'Recognize top contributors with a verified Champion & Ambassador tier.'],
      ['Dark Social Sharing', 'Prywatne polecenia na Slacku, Discordzie i w wiadomościach bezpośrednich', '💬', 'Make deep links and preview cards rich so they shine in dark social sharing on Slack and Discord.']
    ],
    sentences: [
      ['Give creators a live workflow they can demonstrate rather than a rigid advertising script.', 'Daj twórcom żywy przepływ pracy, który mogą zademonstrować, zamiast sztywnego skryptu reklamowego.', '🎥'],
      ['Allow learners to clone and remix community prompts with a single click.', 'Pozwól uczącym się klonować i remiksować prompty społeczności jednym kliknięciem.', '🔁'],
      ['Optimize OpenGraph social preview cards so links shared in Discord and Slack look compelling.', 'Optymalizuj karty podglądu OpenGraph, aby linki udostępniane na Discordzie i Slacku wyglądały przyciągająco.', '🖼️'],
      ['Celebrate member milestones publicly to reinforce positive community rituals.', 'Świętuj kamienie milowe członków publicznie, aby wzmacniać pozytywne rytuały społeczności.', '🎉']
    ],
    quiz: [
      [
        'What does "Dark Social" refer to in modern digital marketing?',
        ['Organic word-of-mouth link sharing inside private channels (Slack, Discord, WhatsApp, DMs, email) where referrer headers are stripped', 'Browsing websites in Dark Mode', 'Advertising on billboards at night', 'Using black backgrounds in logos'],
        0,
        'Most high-trust B2B and developer recommendations happen in private Slack/Discord channels and DMs ("Dark Social").'
      ]
    ]
  },
  {
    id: 'b11',
    domain: 'B',
    short: 'YouTube',
    titleEn: 'Video Marketing & YouTube Growth',
    titlePl: 'Strategia YouTube, CTR miniatur, czas oglądania (AVD) i edukacja wideo',
    emoji: '▶️',
    level: 'V5',
    yt: [
      { ytId: 'C1a2b3c4d5r', title: 'YouTube Algorithm Explained – CTR, Average View Duration & Packaging', channel: 'VidIQ / Creator Booth', dur: 510 },
      { ytId: 'D2a2b3c4d5s', title: 'How Educational Channels Build High-Trust Product Funnels', channel: 'Ahrefs TV', dur: 460 },
      { ytId: 'E3a2b3c4d5t', title: 'Thumbnail Psychology & Title Curiosity Gaps', channel: 'Colin and Samir', dur: 480 }
    ],
    words: [
      ['Title-Thumbnail Packaging', 'Spójna para tytułu i miniatury budząca ciekawość przed kliknięciem', '🎁', 'Design the title-thumbnail packaging BEFORE scripting the video.'],
      ['Impression Click-Through Rate', 'Odsetek osób, które kliknęły po zobaczeniu miniatury (CTR)', '👆', 'Test two visual concepts to lift Impression Click-Through Rate above 7%.'],
      ['Average View Duration (AVD)', 'Średni czas oglądania decydujący o rekomendacjach algorytmu', '⏱️', 'Deliver on the thumbnail promise in the first 15 seconds to maximize Average View Duration.'],
      ['Curiosity Gap', 'Luka informacyjna między tym, co widz wie, a tym, co chce odkryć', '🗝️', 'Open a clean curiosity gap in the title without resorting to misleading clickbait.'],
      ['End-Screen Bridge', 'Przejście na końcu filmu kierujące naturalnie do kolejnego odcinka lub narzędzia', '🌉', 'Pitch the next logical tutorial directly in the final 20-second end-screen bridge.'],
      ['Evergreen Search Video', 'Wideo odpowiadające na stałe zapytania, generujące ruch przez lata', '🌲', 'Balance trending AI news with evergreen search videos that rank all year.']
    ],
    sentences: [
      ['Limit thumbnail text to three words or fewer so it reads instantly on mobile screens.', 'Ogranicz tekst na miniaturze maksymalnie do trzech słów, aby był natychmiast czytelny na ekranach telefonów.', '📱'],
      ['Never repeat the exact words of the video title inside the thumbnail graphic.', 'Nigdy nie powtarzaj dokładnie tych samych słów z tytułu filmu na grafice miniatury.', '🎨'],
      ['Confirm the viewer clicked the right video in the first ten seconds, then dive straight into value.', 'Potwierdź w pierwszych dziesięciu sekundach, że widz kliknął właściwy film, a potem przejdź od razu do konkretów.', '⚡'],
      ['Link an interactive companion exercise in the description to turn passive viewers into active learners.', 'Podlinkuj interaktywne ćwiczenie towarzyszące w opisie, aby zamienić biernych widzów w aktywnych uczniów.', '🎓']
    ],
    quiz: [
      [
        'Which two metrics primarily govern YouTube’s recommendation engine?',
        ['Impression Click-Through Rate (CTR) and Average View Duration / Viewer Satisfaction (AVD)', 'The number of tags in the metadata box and filename length', 'Uploading only at 3:14 AM', 'Using 50 hashtags in the title'],
        0,
        'YouTube promotes videos that earn clicks when shown (CTR) and keep viewers satisfied and watching (AVD).'
      ]
    ]
  },
  {
    id: 'b12',
    domain: 'B',
    short: 'MarTech',
    titleEn: 'Marketing Automation & AI Workflows',
    titlePl: 'Stos MarTech, agenci marketingowi AI, wzbogacanie leadów i personalizacja',
    emoji: '⚙️',
    level: 'V6',
    yt: [
      { ytId: 'F4a2b3c4d5u', title: 'AI Marketing Automation – Webhooks, Lead Scoring & Enrichment', channel: 'Marketing Against the Grain', dur: 520 },
      { ytId: 'G5a2b3c4d5v', title: 'Building Autonomous Content & Research Pipelines with LLMs', channel: 'AI Engineer', dur: 490 },
      { ytId: 'H6a2b3c4d5w', title: 'GDPR, Consent Mode v2 & First-Party Data Architecture', channel: 'MeasureSchool', dur: 440 }
    ],
    words: [
      ['Lead Enrichment Pipeline', 'Automatyczne wzbogacanie profilu leada o dane firmowe i technologiczne', '🔍', 'Route new signups through an automated lead enrichment pipeline.'],
      ['Predictive Lead Scoring', 'Ocena gotowości zakupowej leada na podstawie zachowania i dopasowania (ICP)', '🎯', 'Prioritize sales outreach using behavioral and ICP predictive lead scoring.'],
      ['Dynamic Page Personalization', 'Dostosowanie nagłówków i przykładów na stronie do branży odwiedzającego', '🪄', 'Swap case study examples dynamically based on the visitor’s selected role.'],
      ['Customer Data Platform (CDP)', 'Centralna baza łącząca zdarzenia z produktu, strony i CRM', '🗄️', 'Unify web, product, and billing events inside a single Customer Data Platform.'],
      ['Consent Mode & Privacy', 'Zarządzanie zgodami użytkowników zgodnie z RODO/GDPR', '🛡️', 'Respect user privacy preferences with granular Consent Mode signals.'],
      ['Closed-Loop Revenue Reporting', 'Raportowanie łączące pierwszą kampanię marketingową z finalną fakturą w CRM', '🔄', 'Sync CRM deal stages back to ad platforms for closed-loop revenue reporting.']
    ],
    sentences: [
      ['Connect product usage signals directly to your CRM so marketing never pitches features a user already mastered.', 'Połącz sygnały użycia produktu bezpośrednio z systemem CRM, aby marketing nigdy nie reklamował funkcji, które użytkownik już opanował.', '🔗'],
      ['Use AI agents to summarize customer feedback calls and tag recurring feature requests automatically.', 'Używaj agentów AI do podsumowywania rozmów z klientami i automatycznego tagowania powtarzających się próśb o funkcje.', '🤖'],
      ['Build privacy-first first-party data workflows that comply with GDPR by design.', 'Buduj przepływy danych pierwszej strony (first-party data) stawiające prywatność na pierwszym miejscu i zgodne z RODO.', '🔐'],
      ['Measure marketing automation by pipeline velocity and customer retention, not email volume.', 'Mierz automatyzację marketingu szybkością przepływu lejka i retencją klientów, a nie liczbą wysłanych wiadomości.', '🚀']
    ],
    quiz: [
      [
        'What is "Closed-Loop Reporting" in MarTech?',
        ['Connecting marketing acquisition touchpoints all the way to actual closed revenue and retention in the CRM/billing system', 'Turning off the analytics server on weekends', 'Sending emails only to company employees', 'Deleting lead forms'],
        0,
        'Closed-loop reporting reveals which channels generate real paying, retained customers rather than just cheap clicks.'
      ]
    ]
  },

  // ==================== WHITE CENTER: MANAGEMENT & CERTIFICATIONS (12) ====================
  {
    id: 'm1',
    domain: 'M',
    short: 'Project Mgr',
    titleEn: 'Project Manager (Delivery & Scope)',
    titlePl: 'Project Manager: harmonogram, zakres, budżet, trójkąt ograniczeń i dowożenie projektów AI',
    emoji: '📋',
    level: 'V1',
    yt: [
      { ytId: 'uWPIsaYpY7U', title: 'Project Management Full Course – Scope, Schedule, Risk & Delivery', channel: 'Google Career Certificates', dur: 580 },
      { ytId: 'BOU1YP5NZfQ', title: 'What Does a Technical Project Manager Actually Do?', channel: 'Jeff Su / PM Lab', dur: 440 },
      { ytId: 'v7a2b3c4d5x', title: 'Managing AI & Software Projects – Triple Constraint & Milestones', channel: 'PMI / Project Management', dur: 490 }
    ],
    words: [
      ['Project Charter', 'Karta projektu formalnie autoryzująca start, cele i budżet', '📜', 'Draft a one-page Project Charter defining scope, budget, and key stakeholders.'],
      ['Triple Constraint (Iron Triangle)', 'Trójkąt ograniczeń: Zakres (Scope), Czas (Time), Koszt (Cost) i Jakość', '🔺', 'Balance scope, time, and cost within the project management triple constraint.'],
      ['Work Breakdown Structure (WBS)', 'Hierarchiczny podział projektu na mniejsze pakiety robocze', '🌳', 'Decompose the platform launch into a deliverable-oriented Work Breakdown Structure (WBS).'],
      ['Critical Path Method (CPM)', 'Najdłuższa ścieżka zadań zależnych wyznaczająca minimalny czas projektu', '🛣️', 'Identify bottlenecks on the critical path so the release date never slips.'],
      ['Scope Creep Prevention', 'Ochrona przed niekontrolowanym rozrastaniem się zakresu projektu', '🚧', 'Evaluate new feature requests through formal change control for scope creep prevention.'],
      ['RACI Matrix', 'Macierz odpowiedzialności: Responsible, Accountable, Consulted, Informed', '🗂️', 'Clarify decision ownership across engineering and marketing with a RACI matrix.']
    ],
    sentences: [
      ['In a RACI matrix, assign exactly one Accountable person per deliverable to prevent diffused ownership.', 'W macierzy RACI przypisz dokładnie jedną osobę Accountable (ostatecznie odpowiedzialną) do każdego rezultatu, aby uniknąć rozmycia odpowiedzialności.', '🎯'],
      ['Use Vibe Coding prototypes to validate technical feasibility during project initiation.', 'Używaj prototypów Vibe Codingu do walidacji wykonalności technicznej już w fazie inicjacji projektu.', '⚡'],
      ['Monitor the critical path weekly and escalate blockers before they impact the milestone.', 'Monitoruj ścieżkę krytyczną co tydzień i eskaluj blokady, zanim wpłyną na kamień milowy.', '📅'],
      ['Guard against scope creep by tying every change request to its impact on timeline and budget.', 'Chroń projekt przed pełzaniem zakresu (scope creep), wiążąc każdą zmianę z jej wpływem na harmonogram i budżet.', '🛡️']
    ],
    quiz: [
      [
        'In a RACI matrix, what is the golden rule regarding the "A" (Accountable) role for any given task or deliverable?',
        ['There must be exactly ONE "A" (Accountable) person per task who holds final approval and ownership', 'Every team member should be marked "A"', 'Nobody should ever be "A"', '"A" stands for Anonymous'],
        0,
        'While multiple people can be Responsible (R) for executing work, exactly one person must be Accountable (A) for the outcome.'
      ],
      [
        'What is the "Critical Path" in Project Management?',
        ['The longest sequence of dependent tasks that determines the shortest possible project duration', 'The hallway leading to the server room', 'The list of optional nice-to-have features', 'A marketing slogan'],
        0,
        'Any delay on a Critical Path task directly delays the final project completion date unless mitigated.'
      ]
    ]
  },
  {
    id: 'm2',
    domain: 'M',
    short: 'Product Mgr',
    titleEn: 'Product Manager (Discovery & Strategy)',
    titlePl: 'Product Manager: odkrywanie potrzeb (Discovery), PRD, priorytetyzacja RICE i strategia produktu',
    emoji: '💡',
    level: 'V1',
    yt: [
      { ytId: 'yUOC-Y0f5ZQ', title: 'Product Management Explained – Discovery, Roadmaps & PRDs', channel: 'Y Combinator', dur: 550 },
      { ytId: '6t1a2b3c4d5', title: 'How Vibe Coding Changes Product Management – Interactive Specs', channel: 'Lenny’s Podcast', dur: 510 },
      { ytId: '7u1a2b3c4d5', title: 'RICE Prioritization, Jobs-to-be-Done & Product-Market Fit', channel: 'Product School', dur: 470 }
    ],
    words: [
      ['Product Requirements Document (PRD)', 'Dokument wymagań produktowych opisujący cel, użytkowników i kryteria', '📄', 'Pair your written PRD with a live Vibe-Coded interactive prototype.'],
      ['RICE Prioritization Score', 'Priorytetyzacja: (Reach × Impact × Confidence) / Effort', '🧮', 'Rank candidate features objectively using the RICE prioritization score.'],
      ['Continuous Product Discovery', 'Ciągłe badanie problemów użytkowników i testowanie założeń', '🔍', 'Validate customer pain points weekly through continuous product discovery interviews.'],
      ['Jobs-to-be-Done (JTBD)', 'Zrozumienie zadania, do którego klient „zatrudnia” produkt', '🛠️', 'Frame product strategy around the customer’s core Jobs-to-be-Done.'],
      ['Opportunity Solution Tree', 'Drzewo łączące pożądany wynik biznesowy z problemami klientów i eksperymentami', '🌳', 'Map user problems to experiments using Teresa Torres’s Opportunity Solution Tree.'],
      ['Product-Market Fit (PMF)', 'Stan, w którym produkt silnie rozwiązuje realny problem chłonnego rynku', '🎯', 'Measure Product-Market Fit using retention cohorts and the Sean Ellis 40% survey.']
    ],
    sentences: [
      ['Modern Product Managers don’t just write static PRDs—they vibe code clickable prototypes to align engineering and design.', 'Nowocześni Product Managerowie nie piszą już tylko statycznych dokumentów PRD — tworzą klikalne prototypy w duchu vibe codingu, aby zgrać inżynierię i design.', '🚀'],
      ['Fall in love with the customer’s problem, not your initial solution.', 'Zakochaj się w problemie klienta, a nie w swoim pierwszym pomyśle na rozwiązanie.', '❤️'],
      ['Use the RICE formula—Reach times Impact times Confidence divided by Effort—to prioritize ruthlessly.', 'Stosuj formułę RICE — Zasięg razy Wpływ razy Pewność podzielone przez Nakład pracy — do bezwzględnej priorytetyzacji.', '📊'],
      ['Test risky value and usability assumptions before committing engineering sprints.', 'Testuj ryzykowne założenia dotyczące wartości i użyteczności przed zaangażowaniem sprintów inżynierskich.', '🧪']
    ],
    quiz: [
      [
        'How is the RICE prioritization score calculated by Product Managers?',
        ['(Reach × Impact × Confidence) / Effort', 'Revenue + Interest - Cost - Expenses', 'Random Ideas Checked Early', 'Risk × Inflation × Complexity'],
        0,
        'RICE balances potential customer Reach, Impact, and Confidence against the engineering Effort required.'
      ]
    ]
  },
  {
    id: 'm3',
    domain: 'M',
    short: 'Scrum Master',
    titleEn: 'Scrum Master (Servant Leadership & Flow)',
    titlePl: 'Scrum Master: empiryzm, ceremonie Scrum, usuwanie przeszkód (impediments) i efektywność zespołu',
    emoji: '🔄',
    level: 'V2',
    yt: [
      { ytId: 'SWDhGSZNF9M', title: 'Scrum in Under 10 Minutes – Roles, Events & Artifacts', channel: 'Scrum.org / Agile', dur: 510 },
      { ytId: '8v1a2b3c4d5', title: 'What Makes a Great Scrum Master? Servant Leadership & Coaching', channel: 'Mountain Goat Software', dur: 460 },
      { ytId: '9w1a2b3c4d5', title: 'Running Effective Sprint Retrospectives & Removing Impediments', channel: 'Atlassian Agile Coach', dur: 440 }
    ],
    words: [
      ['Three Pillars of Empiricism', 'Trzy filary Scruma: Przejrzystość, Inspekcja i Adaptacja', '🏛️', 'Uphold the three pillars of empiricism: Transparency, Inspection, and Adaptation.'],
      ['Impediment Removal', 'Usuwanie blokad organizacyjnych i technicznych hamujących zespół', '🚜', 'Focus daily Scrum Master energy on proactive impediment removal.'],
      ['Definition of Done (DoD)', 'Formalne zobowiązanie określające standard jakości ukończonego Inkrementu', '✅', 'Ensure every Increment satisfies the team’s Definition of Done before release.'],
      ['Sprint Retrospective', 'Spotkanie zamykające Sprint służące usprawnieniu sposobu pracy zespołu', '🪞', 'Facilitate a blameless Sprint Retrospective that produces one actionable improvement.'],
      ['Servant Leadership', 'Przywództwo służebne wspierające autonomię i rozwój zespołu', '🤝', 'Coach self-managing developers through servant leadership rather than command-and-control.'],
      ['Timeboxed Event', 'Wydarzenie o sztywno ograniczonym maksymalnym czasie trwania', '⏱️', 'Keep the Daily Scrum strictly timeboxed to 15 minutes for developers.']
    ],
    sentences: [
      ['Scrum is founded on empiricism: transparency, inspection, and adaptation.', 'Scrum opiera się na empiryzmie: przejrzystości (transparency), inspekcji (inspection) oraz adaptacji (adaptation).', '🧭'],
      ['The Daily Scrum is a 15-minute planning event for Developers to inspect progress toward the Sprint Goal, not a status report for management.', 'Daily Scrum to 15-minutowe spotkanie planistyczne dla Deweloperów służące inspekcji postępu w stronę Celu Sprintu, a nie raport statusowy dla zarządu.', '🗣️'],
      ['An Increment is only born when a Product Backlog item meets the Definition of Done.', 'Inkrement powstaje dopiero wtedy, gdy element Product Backlogu spełnia Definicję Ukończenia (Definition of Done).', '🏁'],
      ['Help the team adopt AI coding workflows during Sprint Retrospectives to remove repetitive toil.', 'Pomagaj zespołowi wdrażać przepływy pracy z AI podczas Retrospektyw Sprintu, aby eliminować powtarzalną pracę.', '🤖']
    ],
    quiz: [
      [
        'According to the official Scrum Guide, what are the Three Pillars of Empirical Process Control?',
        ['Transparency, Inspection, and Adaptation', 'Planning, Coding, and Billing', 'Speed, Overtime, and Documentation', 'Managers, Directors, and VP Approval'],
        0,
        'Transparency, Inspection, and Adaptation form the empirical foundation of Scrum.'
      ]
    ]
  },
  {
    id: 'm4',
    domain: 'M',
    short: 'Prod Owner',
    titleEn: 'Product Owner (Backlog & Value Max)',
    titlePl: 'Product Owner: maksymalizacja wartości, Product Backlog, Cel Sprintu i User Stories',
    emoji: '👑',
    level: 'V2',
    yt: [
      { ytId: '502ILHjX9EE', title: 'Product Owner Role Explained in Scrum – Maximizing Value', channel: 'Scrum.org / Agile', dur: 480 },
      { ytId: '1x1a2b3c4d5', title: 'Writing Great User Stories & Gherkin Acceptance Criteria', channel: 'Atlassian Agile', dur: 450 },
      { ytId: '2y1a2b3c4d5', title: 'Backlog Refinement, Story Splitting & Sprint Goals', channel: 'Mountain Goat Software', dur: 490 }
    ],
    words: [
      ['Value Maximization', 'Maksymalizacja wartości produktu powstającego z pracy zespołu Scrum', '💎', 'The Product Owner is accountable for value maximization of the product.'],
      ['Product Backlog Ordering', 'Uporządkowanie elementów backlogu według wartości, ryzyka i zależności', '📑', 'Maintain clear Product Backlog ordering so developers always know what delivers highest value next.'],
      ['Product Goal & Sprint Goal', 'Długoterminowy Cel Produktu oraz pojedynczy cel bieżącego Sprintu', '🎯', 'Craft a focused Sprint Goal that explains why this Sprint matters to users.'],
      ['INVEST User Story', 'Kryteria dobrej historyjki: Independent, Negotiable, Valuable, Estimable, Small, Testable', '📖', 'Split large epics into small, vertical INVEST user stories.'],
      ['Acceptance Criteria (Given/When/Then)', 'Warunki akceptacji w formacie Gherkin weryfikujące działanie funkcji', '✅', 'Write unambiguous Given-When-Then acceptance criteria that double as AI test prompts.'],
      ['Release Burndown & Burnup', 'Wykresy obrazujące tempo realizacji zakresu względem celu wydania', '📉', 'Forecast release readiness transparently with a Sprint Burnup chart.']
    ],
    sentences: [
      ['The Product Owner is one person, not a committee, accountable for maximizing the value of the product.', 'Product Owner to jedna osoba, a nie komitet — jest ona odpowiedzialna za maksymalizację wartości produktu.', '👑'],
      ['Well-written Given/When/Then acceptance criteria work directly as executable prompts for Vibe Coding agents!', 'Dobrze napisane kryteria akceptacji Given/When/Then działają bezpośrednio jako wykonywalne prompty dla agentów Vibe Codingu!', '⚡'],
      ['Slice user stories vertically through the stack so every completed story delivers testable user value.', 'Dziel historyjki użytkownika pionowo przez cały stos technologiczny, aby każda ukończona historyjka dostarczała testowalną wartość.', '🍰'],
      ['Say "no" to low-value requests so the team stays focused on the Product Goal.', 'Mów „nie” zadaniom o niskiej wartości, aby zespół pozostał skupiony na Celu Produktu (Product Goal).', '🛡️']
    ],
    quiz: [
      [
        'Why do Product Owner skills translate directly into elite Vibe Coding?',
        ['Because decomposing features into small vertical slices with clear Given/When/Then acceptance criteria is the exact way to prompt AI coding agents effectively', 'Because Product Owners never use computers', 'Because Scrum forbids writing software', 'Because backlogs are written in binary'],
        0,
        'Clear user stories, explicit constraints, and testable acceptance criteria are the universal language of both Agile teams and AI coding agents.'
      ]
    ]
  },
  {
    id: 'm5',
    domain: 'M',
    short: 'PMP / PMI',
    titleEn: 'PMP & CAPM (PMI Certifications)',
    titlePl: 'Certyfikacje PMI: PMP i CAPM, PMBOK 7th Edition, Earned Value (EVM) i przywództwo',
    emoji: '🏅',
    level: 'V3',
    yt: [
      { ytId: '3z1a2b3c4d5', title: 'PMP Certification Exam Prep – PMBOK 7 Domains: People, Process, Business', channel: 'Andrew Ramdayal / PMI Prep', dur: 590 },
      { ytId: '4A1a2b3c4d5', title: 'Earned Value Management (EVM) Formulas – CPI, SPI, EV, PV, AC', channel: 'David McLachlan', dur: 520 },
      { ytId: '5B1a2b3c4d5', title: 'CAPM vs PMP – PMI Mindset & Situational Exam Questions', channel: 'Project Management Institute', dur: 460 }
    ],
    words: [
      ['PMBOK 7 Performance Domains', '8 domen wykonawczych PMBOK 7 (m.in. Stakeholders, Team, Delivery, Uncertainty)', '📘', 'Align project governance across the eight PMBOK 7 Performance Domains.'],
      ['Earned Value Management (EVM)', 'Metoda wartości wypracowanej mierząca postęp i koszt projektu', '📊', 'Calculate Earned Value (EV), Planned Value (PV), and Actual Cost (AC).'],
      ['Cost Performance Index (CPI = EV/AC)', 'Wskaźnik efektywności kosztowej (>1.0 oznacza poniżej budżetu)', '💰', 'A Cost Performance Index (CPI) of 1.15 means the project is earning $1.15 of value per $1.00 spent.'],
      ['Schedule Performance Index (SPI = EV/PV)', 'Wskaźnik efektywności harmonogramu (>1.0 oznacza wyprzedzenie planu)', '⏱️', 'Monitor Schedule Performance Index (SPI) to detect timeline slippage early.'],
      ['Tailoring (Hybrid Delivery)', 'Dobór i łączenie metod predykcyjnych (Waterfall) oraz zwinnych (Agile)', '✂️', 'Practice PMBOK tailoring by combining predictive compliance milestones with Agile software sprints.'],
      ['PMI Servant Mindset', 'Sposób myślenia na egzaminie PMP: najpierw oceń, przeanalizuj i porozmawiaj z zespołem', '🧠', 'On PMP situational questions, assess the impact and collaborate with the team before escalating.']
    ],
    sentences: [
      ['Remember the EVM rule for the PMP exam: if CPI or SPI is greater than 1.0, performance is favorable; if less than 1.0, you are over budget or behind schedule.', 'Zapamiętaj regułę EVM na egzamin PMP: jeśli CPI lub SPI jest większe niż 1.0, wynik jest korzystny; jeśli mniejsze niż 1.0, przekraczasz budżet lub masz opóźnienie.', '📐'],
      ['The PMP exam tests three domains: People (42%), Process (50%), and Business Environment (8%), with half the questions in Agile or Hybrid contexts.', 'Egzamin PMP sprawdza trzy domeny: Ludzie (42%), Procesy (50%) oraz Otoczenie Biznesowe (8%), przy czym połowa pytań dotyczy kontekstu Agile lub Hybrydowego.', '🎓'],
      ['Never fire a team member or escalate to the sponsor as your first action on a PMP situational question—always analyze and coach first.', 'Nigdy nie zwalniaj członka zespołu ani nie eskaluj do sponsora jako pierwszej reakcji w pytaniu sytuacyjnym PMP — zawsze najpierw przeanalizuj sytuację i wesprzyj zespół.', '🤝'],
      ['Tailor your project lifecycle to fit the level of requirements certainty and delivery cadence.', 'Dopasowuj (tailoring) cykl życia projektu do poziomu pewności wymagań oraz rytmu dostarczania.', '🧭']
    ],
    quiz: [
      [
        'In Earned Value Management (EVM) on the PMP exam, a project has Earned Value (EV) = $120,000, Actual Cost (AC) = $100,000, and Planned Value (PV) = $150,000. What is the project status?',
        ['Under budget (CPI = 1.20) but behind schedule (SPI = 0.80)', 'Over budget and ahead of schedule', 'Exactly on budget and on schedule', 'Cancelled'],
        0,
        'CPI = EV / AC = 120k / 100k = 1.20 (>1 means under budget). SPI = EV / PV = 120k / 150k = 0.80 (<1 means behind schedule).'
      ]
    ]
  },
  {
    id: 'm6',
    domain: 'M',
    short: 'PRINCE2',
    titleEn: 'PRINCE2 Foundation & Practitioner',
    titlePl: 'Certyfikacje PRINCE2 (7th Edition): 7 pryncypiów, 7 praktyk (tematów) i 7 procesów',
    emoji: '🏛️',
    level: 'V3',
    yt: [
      { ytId: '6C1a2b3c4d5', title: 'PRINCE2 7th Edition Explained – 7 Principles, 7 Practices & 7 Processes', channel: 'ILX Group / PeopleCert', dur: 540 },
      { ytId: '7D1a2b3c4d5', title: 'Continued Business Justification & Manage by Exception in PRINCE2', channel: 'Knowledge Train', dur: 470 },
      { ytId: '8E1a2b3c4d5', title: 'PRINCE2 vs PMP vs Agile – Choosing the Right Governance Framework', channel: 'Projex Academy', dur: 450 }
    ],
    words: [
      ['Continued Business Justification', 'Ciągłe uzasadnienie biznesowe (1. pryncypium PRINCE2)', '💼', 'Verify Continued Business Justification at every stage boundary; if the Business Case is no longer viable, stop the project.'],
      ['Manage by Exception', 'Zarządzanie z wykorzystaniem tolerancji (czasu, kosztu, jakości, zakresu, ryzyka, korzyści)', '🎛️', 'Set clear stage tolerances so the Project Manager can manage by exception without micromanagement.'],
      ['Manage by Stages', 'Podział projektu na etapy zarządcze z punktami decyzyjnymi Komitetu Sterującego', '🪜', 'Plan and authorize the project one stage at a time using Manage by Stages.'],
      ['Focus on Products', 'Skupienie na definicji i jakości produktów projektu przed planowaniem działań', '📦', 'Write Product Descriptions first to uphold the PRINCE2 Focus on Products principle.'],
      ['Project Initiation Documentation (PID)', 'Kompleksowa dokumentacja inicjująca projekt i stanowiąca bazę do oceny postępów', '📁', 'Assemble the Project Initiation Documentation (PID) during the Initiating a Project process.'],
      ['Project Board (Executive, Senior User, Senior Supplier)', 'Komitet Sterujący reprezentujący biznes, użytkowników i dostawców', '👥', 'Escalate an Exception Report to the Project Board only when stage tolerances are forecast to be exceeded.']
    ],
    sentences: [
      ['Memorize the seven PRINCE2 Principles: Continued Business Justification, Learn from Experience, Defined Roles & Responsibilities, Manage by Stages, Manage by Exception, Focus on Products, and Tailor to Suit the Project.', 'Zapamiętaj 7 pryncypiów PRINCE2: Ciągłe uzasadnienie biznesowe, Korzystanie z doświadczeń, Określone role i obowiązki, Zarządzanie etapowe, Zarządzanie z wykorzystaniem tolerancji, Skupienie na produktach oraz Dostosowanie do warunków projektu.', '🏛️'],
      ['In PRINCE2, the Project Board represents three interests: Business (Executive), User (Senior User), and Supplier (Senior Supplier).', 'W metodyce PRINCE2 Komitet Sterujący (Project Board) reprezentuje trzy perspektywy: Biznesową (Przewodniczący/Executive), Użytkownika (Główny Użytkownik) oraz Dostawcy (Główny Dostawca).', '⚖️'],
      ['Manage by Exception sets six tolerances: Time, Cost, Quality, Scope, Risk, and Benefit.', 'Zarządzanie z wykorzystaniem tolerancji (Manage by Exception) określa sześć obszarów tolerancji: Czas, Koszt, Jakość, Zakres, Ryzyko oraz Korzyści.', '📏'],
      ['If a stage is forecast to exceed its tolerance, the Project Manager raises an Issue and prepares an Exception Plan for the Project Board.', 'Jeśli prognozowane jest przekroczenie tolerancji etapu, Project Manager rejestruje zagadnienie (Issue) i przygotowuje Plan Nadzwyczajny (Exception Plan) dla Komitetu Sterującego.', '🚨']
    ],
    quiz: [
      [
        'Which of the following is NOT one of the 7 Principles of PRINCE2?',
        ['Eliminate All Documentation and Never Check the Business Case', 'Continued Business Justification', 'Manage by Exception', 'Focus on Products'],
        0,
        'The 7 PRINCE2 Principles are: Continued Business Justification, Learn from Experience, Defined Roles & Responsibilities, Manage by Stages, Manage by Exception, Focus on Products, and Tailor to Suit the Project.'
      ]
    ]
  },
  {
    id: 'm7',
    domain: 'M',
    short: 'PSM / PSPO',
    titleEn: 'PSM I/II & PSPO I/II (Scrum.org Certs)',
    titlePl: 'Certyfikacje Scrum.org: Professional Scrum Master (PSM) i Product Owner (PSPO) oraz EBM',
    emoji: '📜',
    level: 'V3',
    yt: [
      { ytId: '9F1a2b3c4d5', title: 'How to Pass PSM I & PSPO I with 95%+ on Scrum.org', channel: 'Scrum.org / Valentin Despa', dur: 530 },
      { ytId: '0G1a2b3c4d5', title: 'Scrum Guide 2020 Accountabilities, Commitments & Trick Questions', channel: 'Agile Mania', dur: 490 },
      { ytId: '1H1a2b3c4d5', title: 'Evidence-Based Management (EBM) for PSPO II & Product Leaders', channel: 'Scrum.org', dur: 460 }
    ],
    words: [
      ['Artifact Commitments', 'Trzy zobowiązania artefaktów: Product Goal, Sprint Goal oraz Definition of Done', '🎯', 'Match each Scrum artifact to its commitment: Product Backlog -> Product Goal, Sprint Backlog -> Sprint Goal, Increment -> Definition of Done.'],
      ['Self-Managing Scrum Team', 'Samozarządzający zespół (<=10 osób) decydujący kto, jak i co robi w Sprincie', '🤝', 'The Scrum Team is self-managing and cross-functional with no sub-teams or hierarchies.'],
      ['Evidence-Based Management (EBM)', 'Framework Scrum.org mierzący wartość w 4 obszarach: Current Value, Unrealized Value, Time-to-Market, Ability to Innovate', '📈', 'Use Evidence-Based Management (EBM) Key Value Areas to guide product investment.'],
      ['Sprint Cancellation Rule', 'Tylko Product Owner ma prawo anulować Sprint, gdy Cel Sprintu staje się nieaktualny', '🛑', 'Remember for PSM/PSPO exams: only the Product Owner has the authority to cancel a Sprint.'],
      ['No Sprint Zero / No Hardening Sprint', 'Każdy Sprint od pierwszego ma dostarczyć użyteczny, ukończony Inkrement', '🚀', 'In professional Scrum, there is no "Sprint 0" or "Testing Sprint"—every Sprint creates a Done Increment.'],
      ['Technical Debt Impact on Velocity', 'Wpływ długu technicznego na zdolność do innowacji (Ability to Innovate w EBM)', '🧹', 'High technical debt lowers the team’s Ability to Innovate (A2I) in Evidence-Based Management.']
    ],
    sentences: [
      ['Memorize the three Artifact Commitments for PSM I and PSPO I: Product Backlog has the Product Goal, Sprint Backlog has the Sprint Goal, and Increment has the Definition of Done.', 'Zapamiętaj trzy zobowiązania artefaktów na egzaminy PSM I oraz PSPO I: Product Backlog ma Cel Produktu (Product Goal), Sprint Backlog ma Cel Sprintu (Sprint Goal), a Inkrement ma Definicję Ukończenia (Definition of Done).', '📌'],
      ['Only the Product Owner can cancel a Sprint, and only if the Sprint Goal becomes obsolete.', 'Tylko Product Owner może anulować Sprint i to wyłącznie wtedy, gdy Cel Sprintu staje się nieaktualny.', '⚖️'],
      ['Developers—and nobody else—are responsible for sizing Product Backlog items and managing the Sprint Backlog.', 'Wyłącznie Deweloperzy odpowiadają za szacowanie elementów Product Backlogu oraz zarządzanie Sprint Backlogiem.', '👩‍💻'],
      ['Evidence-Based Management (EBM) evaluates four Key Value Areas: Current Value (CV), Unrealized Value (UV), Time-to-Market (T2M), and Ability to Innovate (A2I).', 'Evidence-Based Management (EBM) ocenia cztery Kluczowe Obszary Wartości: Bieżącą Wartość (CV), Niezrealizowaną Wartość (UV), Czas Wprowadzenia na Rynek (T2M) oraz Zdolność do Innowacji (A2I).', '🧭']
    ],
    quiz: [
      [
        'On the PSM I / PSPO I exam (Scrum Guide 2020), what are the three Artifacts and their corresponding Commitments?',
        ['Product Backlog -> Product Goal; Sprint Backlog -> Sprint Goal; Increment -> Definition of Done', 'Gantt Chart -> Deadline; Timesheet -> Overtime; Invoice -> Budget', 'Project Charter -> Sponsor; WBS -> PM; Risk Log -> Auditor', 'Code -> Compiler; CSS -> Browser; SQL -> Server'],
        0,
        'The 2020 Scrum Guide explicitly pairs each of the three artifacts with its commitment to reinforce transparency and focus.'
      ]
    ]
  },
  {
    id: 'm8',
    domain: 'M',
    short: 'SAFe Agile',
    titleEn: 'SAFe, LeSS & Enterprise Agile',
    titlePl: 'Skalowany Agile w korporacjach: SAFe Agilist, PI Planning, Agile Release Train (ART), LeSS i Nexus',
    emoji: '🚄',
    level: 'V4',
    yt: [
      { ytId: '2I1a2b3c4d5', title: 'SAFe (Scaled Agile Framework) Explained in 10 Minutes – ART & PI Planning', channel: 'Scaled Agile / Atlassian', dur: 510 },
      { ytId: '3J1a2b3c4d5', title: 'WSJF (Weighted Shortest Job First) Prioritization Formula', channel: 'Agile Academy', dur: 430 },
      { ytId: '4K1a2b3c4d5', title: 'Comparing Scaling Frameworks: SAFe vs LeSS vs Scrum@Scale vs Nexus', channel: 'Scrum.org / Enterprise', dur: 480 }
    ],
    words: [
      ['Agile Release Train (ART)', 'Długowieczny zespół zespołów Agile (50–125 osób) dostarczający wartość we wspólnym rytmie', '🚄', 'Synchronize ten cross-functional teams inside a single Agile Release Train (ART).'],
      ['PI Planning (Program Increment)', 'Dwudniowe wydarzenie planistyczne dla całego ART wyznaczające cele na 8–12 tygodni', '🗓️', 'Align dependencies on the Program Board during quarterly PI Planning.'],
      ['WSJF (Weighted Shortest Job First)', 'Priorytetyzacja ekonomiczna SAFe: Cost of Delay podzielony przez Job Duration/Size', '⚖️', 'Prioritize Program Backlog features by calculating Weighted Shortest Job First (WSJF).'],
      ['Release Train Engineer (RTE)', 'Lider służebny i coach dla całego pociągu Agile Release Train', '🧑‍✈️', 'The Release Train Engineer (RTE) facilitates ART events and removes cross-team impediments.'],
      ['Nexus Integration Team', 'W frameworku Nexus: zespół odpowiedzialny za to, by co Sprint powstawał zintegrowany Inkrement', '🔗', 'Use a Nexus Integration Team to resolve cross-team integration issues across 3–9 Scrum teams.'],
      ['Innovation and Planning (IP) Iteration', 'Ostatnia iteracja w PI stanowiąca bufor, czas na hackathon, naukę i PI Planning', '💡', 'Use the Innovation and Planning (IP) Iteration for AI Vibe Coding hackathons and PI preparation.']
    ],
    sentences: [
      ['Calculate WSJF (Weighted Shortest Job First) by dividing Cost of Delay by Job Size—always build high-value, short-duration features first!', 'Obliczaj WSJF (Weighted Shortest Job First), dzieląc Koszt Opóźnienia (Cost of Delay) przez Rozmiar Zadania (Job Size) — zawsze najpierw buduj funkcje o wysokiej wartości i krótkim czasie realizacji!', '🧮'],
      ['Cost of Delay is the sum of User-Business Value, Time Criticality, and Risk Reduction / Opportunity Enablement.', 'Koszt Opóźnienia (Cost of Delay) to suma Wartości Biznesowej dla Użytkownika, Krytyczności Czasowej oraz Redukcji Ryzyka / Otwarcia Szans.', '💎'],
      ['PI Planning brings everyone on the Agile Release Train together to commit to PI Objectives and visualize cross-team dependencies.', 'PI Planning gromadzi wszystkich członków Agile Release Train, aby wspólnie zobowiązać się do celów PI oraz zwizualizować zależności między zespołami.', '🗺️'],
      ['While SAFe adds portfolio and program layers, LeSS and Nexus scale by keeping a single Product Backlog and a single Product Owner.', 'Podczas gdy SAFe dodaje warstwy portfela i programu, LeSS oraz Nexus skalują pracę, zachowując jeden wspólny Product Backlog oraz jednego Product Ownera.', '🧭']
    ],
    quiz: [
      [
        'How is WSJF (Weighted Shortest Job First) calculated in SAFe?',
        ['WSJF = Cost of Delay / Job Duration (or Job Size)', 'WSJF = Number of Developers × Sprint Length', 'WSJF = Budget - Taxes', 'WSJF = Story Points + Bugs'],
        0,
        'Dividing Cost of Delay by Job Size prioritizes items that deliver the highest economic value in the shortest time.'
      ]
    ]
  },
  {
    id: 'm9',
    domain: 'M',
    short: 'Kanban/Jira',
    titleEn: 'Kanban, Jira & AI Project Ops',
    titlePl: 'Metoda Kanban, limity WIP, prawo Little’a, Cycle Time, Cumulative Flow i automatyzacja Jira/Linear',
    emoji: '📌',
    level: 'V4',
    yt: [
      { ytId: 'iVaFVa7HYj4', title: 'Kanban Explained – WIP Limits, Cycle Time & Flow Metrics', channel: 'Atlassian Agile Coach', dur: 470 },
      { ytId: '5L1a2b3c4d5', title: 'Little’s Law, Cumulative Flow Diagrams & Throughput', channel: 'ProKanban / Dan Vacanti', dur: 490 },
      { ytId: '6M1a2b3c4d5', title: 'Automating Jira & Linear Triage with AI Agents', channel: 'Linear / Product Ops', dur: 420 }
    ],
    words: [
      ['Work in Progress (WIP) Limit', 'Maksymalna liczba zadań mogących znajdować się jednocześnie w danej kolumnie', '🚦', 'Enforce a strict WIP limit of three items in the Code Review column to stop multitasking.'],
      ['Cycle Time vs Lead Time', 'Czas realizacji zadania od startu prac (Cycle Time) vs od zgłoszenia przez klienta (Lead Time)', '⏱️', 'Measure Cycle Time from "In Progress" to "Done" and Lead Time from request creation to delivery.'],
      ['Little’s Law (WIP = Throughput × Cycle Time)', 'Fundamentalne prawo przepływu: im więcej rzeczy rozgrzebanych (WIP), tym dłuższy czas ukończenia (Cycle Time)', '📐', 'Apply Little’s Law: reducing WIP is the fastest way to shorten average Cycle Time.'],
      ['Cumulative Flow Diagram (CFD)', 'Wykres warstwowy pokazujący stabilność przepływu i narastające wąskie gardła', '📊', 'Spot widening bands on the Cumulative Flow Diagram (CFD) to diagnose workflow bottlenecks.'],
      ['Stop Starting, Start Finishing', 'Zasada Kanban: pomóż domknąć rozpoczęte zadanie zamiast otwierać nową kartę', '🏁', 'Follow the Kanban mantra: "Stop starting, start finishing!"'],
      ['Class of Service (Expedite / Fixed Date)', 'Polityka określająca priorytet obsługi zadań (np. awaria krytyczna vs standardowe zadanie)', '🚑', 'Reserve the Expedite lane strictly for production outages.']
    ],
    sentences: [
      ['According to Little’s Law, Cycle Time equals Work in Progress divided by Throughput—lowering WIP immediately speeds up delivery.', 'Zgodnie z prawem Little’a czas cyklu (Cycle Time) równa się pracy w toku (WIP) podzielonej przez przepustowość (Throughput) — zmniejszenie WIP natychmiast przyspiesza dostarczanie.', '⚡'],
      ['When a Kanban column hits its WIP limit, team members swarm to unblock stalled items before pulling new work.', 'Gdy kolumna Kanban osiąga swój limit WIP, członkowie zespołu łączą siły, aby odblokować stojące zadania przed pobraniem nowej pracy.', '🐝'],
      ['A widening horizontal/vertical band on a Cumulative Flow Diagram signals a bottleneck where work is arriving faster than it leaves.', 'Rozszerzające się pasmo na wykresie Cumulative Flow Diagram (CFD) sygnalizuje wąskie gardło, w którym praca napływa szybciej, niż opuszcza dany etap.', '🔍'],
      ['Use AI issue triage to auto-label bug reports, link duplicate tickets, and draft reproduction steps in Jira or Linear.', 'Używaj selekcji zgłoszeń AI do automatycznego etykietowania błędów, łączenia duplikatów i szkicowania kroków reprodukcji w systemach Jira lub Linear.', '🤖']
    ],
    quiz: [
      [
        'What does Little’s Law prove about team workflow in Kanban?',
        ['Increasing Work in Progress (WIP) without increasing throughput directly increases Cycle Time (tasks take longer to finish)', 'Starting 20 tasks at once makes all 20 finish faster', 'WIP limits should be set to infinity', 'Cycle Time is unrelated to how many tasks are open'],
        0,
        'Cycle Time = WIP / Throughput. Limiting WIP reduces context-switching and gets features across the finish line much faster.'
      ]
    ]
  },
  {
    id: 'm10',
    domain: 'M',
    short: 'OKRs & KPIs',
    titleEn: 'OKRs, KPIs & Product Metrics',
    titlePl: 'Cele i Kluczowe Rezultaty (OKR), wskaźniki wyprzedzające i wynikowe, ekonomia jednostkowa (SaaS)',
    emoji: '🎯',
    level: 'V5',
    yt: [
      { ytId: 'L4N1q4RNi9I', title: 'John Doerr: Why the Secret to Success is Setting the Right OKRs', channel: 'TED / Measure What Matters', dur: 710 },
      { ytId: '7N1a2b3c4d5', title: 'OKRs vs KPIs – Leading vs Lagging Indicators in Product Teams', channel: 'Silicon Valley Product Group', dur: 480 },
      { ytId: '8O1a2b3c4d5', title: 'SaaS Unit Economics: ARR, NRR, Churn, LTV/CAC & Payback Period', channel: 'Y Combinator', dur: 530 }
    ],
    words: [
      ['Objective & Key Results (OKR)', 'Inspirujący cel jakościowy (Objective) + 3–4 mierzalne rezultaty (Key Results)', '🎯', 'Pair a bold qualitative Objective with three quantitative outcome Key Results.'],
      ['Outcome vs Output', 'Zmiana zachowania/wartości dla użytkownika (Outcome) vs samo wyprodukowanie funkcji (Output)', '🏆', 'Write Key Results as measurable user outcomes ("Increase D7 retention from 22% to 35%"), never task outputs ("Ship 5 features").'],
      ['Leading vs Lagging Indicator', 'Wskaźnik wyprzedzający (na który mamy szybki wpływ) vs opóźniony wynik końcowy (np. roczny przychód)', '🧭', 'Track Day-1 lesson completion as a leading indicator of long-term subscription retention.'],
      ['Net Revenue Retention (NRR)', 'Utrzymanie przychodu netto z obecnej bazy klientów (z uwzględnieniem dosprzedaży i odejść)', '📈', 'Best-in-class B2B SaaS products achieve over 110% Net Revenue Retention (NRR).'],
      ['CAC Payback Period', 'Liczba miesięcy potrzebna na odzyskanie kosztu pozyskania klienta z marży brutto', '⏳', 'Keep CAC payback period under 12 months for capital-efficient growth.'],
      ['Health Metric Guardrail', 'Wskaźnik bezpieczeństwa chroniący przed osiągnięciem celu kosztem jakości', '🛡️', 'Pair aggressive acquisition OKRs with a customer satisfaction and crash-free guardrail metric.']
    ],
    sentences: [
      ['A Key Result must contain a number and measure a customer or business outcome, not a to-do list of features.', 'Kluczowy Rezultat (Key Result) musi zawierać liczbę i mierzyć rezultat u klienta lub w biznesie, a nie listę zadań do odhaczenia.', '📏'],
      ['Influence lagging indicators like quarterly revenue by optimizing leading indicators like activation rate and time-to-value.', 'Wpływaj na wskaźniki wynikowe (lagging), takie jak kwartalny przychód, poprzez optymalizację wskaźników wyprzedzających (leading), takich jak współczynnik aktywacji.', '🕹️'],
      ['Always pair growth OKRs with a quality guardrail metric so speed never breaks user trust.', 'Zawsze łącz wzrostowe cele OKR z metryką ochronną jakości (guardrail), aby szybkość nigdy nie niszczyła zaufania użytkowników.', '🛡️'],
      ['Review OKR confidence weekly rather than waiting until the end of the quarter.', 'Przeglądaj poziom pewności realizacji OKR co tydzień, zamiast czekać do końca kwartału.', '📅']
    ],
    quiz: [
      [
        'Which of the following is a true outcome-based Key Result (KR) rather than a task output?',
        ['"Increase 7-day learner retention from 24% to 38% by Q3"', '"Hold 12 meetings about retention"', '"Launch the new settings page"', '"Write a 30-page PDF strategy document"'],
        0,
        'True Key Results measure quantifiable changes in user behavior or business value (outcomes), not completed tasks (outputs).'
      ]
    ]
  },
  {
    id: 'm11',
    domain: 'M',
    short: 'Risk & Stake',
    titleEn: 'Stakeholder, Risk & Change Mgmt',
    titlePl: 'Zarządzanie interesariuszami (Power/Interest Grid), rejestr ryzyk (RAID), negocjacje i zarządzanie zmianą (ADKAR)',
    emoji: '⚖️',
    level: 'V5',
    yt: [
      { ytId: '9P1a2b3c4d5', title: 'Stakeholder Management – Power/Interest Grid & Executive Communication', channel: 'Google Career Certificates', dur: 490 },
      { ytId: '0Q1a2b3c4d5', title: 'Risk Management Strategies: Avoid, Mitigate, Transfer, Accept & Exploit', channel: 'PMI / David McLachlan', dur: 510 },
      { ytId: '1R1a2b3c4d5', title: 'ADKAR Change Management & Overcoming Organizational Resistance', channel: 'Prosci / Change Lab', dur: 450 }
    ],
    words: [
      ['Power / Interest Grid', 'Matryca interesariuszy: Władza vs Zainteresowanie (Manage Closely, Keep Satisfied, Keep Informed, Monitor)', '🗺️', 'Map executives and end-users on a Power/Interest Grid to tailor communication frequency.'],
      ['RAID Log (Risks, Assumptions, Issues, Dependencies)', 'Rejestr ryzyk, założeń, bieżących problemów oraz zależności projektowych', '📓', 'Review the RAID log weekly to turn uncertain assumptions into verified facts.'],
      ['Risk vs Issue Distinction', 'Ryzyko to niepewne zdarzenie w przyszłości; Problem (Issue) to coś, co już wystąpiło', '⚠️', 'Remember: a Risk is an uncertain future event; once it happens today, it becomes an Issue.'],
      ['Risk Response (Avoid / Mitigate / Transfer / Accept)', 'Cztery strategie odpowiedzi na zagrożenia w PMI oraz PRINCE2', '🛡️', 'Reduce probability and impact through proactive risk mitigation, or transfer financial risk via insurance/SLAs.'],
      ['ADKAR Change Model', 'Model prowadzenia zmiany: Awareness, Desire, Knowledge, Ability, Reinforcement', '🔄', 'Guide teams adopting AI Vibe Coding tools through the five stages of the ADKAR change model.'],
      ['BATNA & Harvard Negotiation', 'Najlepsza alternatywa dla negocjowanego porozumienia oraz negocjacje oparte na interesach', '🤝', 'Focus stakeholder negotiations on underlying shared interests rather than rigid positions.']
    ],
    sentences: [
      ['Stakeholders with High Power and High Interest require "Manage Closely" engagement; High Power and Low Interest require "Keep Satisfied".', 'Interesariusze o Dużej Władzy i Dużym Zainteresowaniu wymagają strategii „Zarządzaj blisko” (Manage Closely); Duża Władza i Małe Zainteresowanie wymagają „Utrzymuj satysfakcję” (Keep Satisfied).', '🧭'],
      ['Distinguish clearly between a Risk (might happen in the future, managed with a response plan) and an Issue (is happening right now, managed with an immediate workaround or fix).', 'Rozróżniaj wyraźnie Ryzyko (może wydarzyć się w przyszłości) od Problemu / Zagadnienia (Issue — dzieje się właśnie teraz i wymaga natychmiastowego działania).', '⚡'],
      ['For positive risks (opportunities), use the four PMI strategies: Exploit, Enhance, Share, or Accept.', 'W przypadku ryzyk pozytywnych (szans) stosuj cztery strategie PMI: Wykorzystaj (Exploit), Wzmocnij (Enhance), Współdziel (Share) lub Zaakceptuj (Accept).', '🌟'],
      ['When introducing AI coding tools to an organization, build Awareness and Desire before mandating new workflows (ADKAR).', 'Wprowadzając narzędzia kodowania AI w organizacji, zbuduj najpierw Świadomość (Awareness) i Chęć (Desire) przed narzucaniem nowych procesów (model ADKAR).', '🚀']
    ],
    quiz: [
      [
        'On a Stakeholder Power/Interest Grid, how should you engage stakeholders who have HIGH Power/Influence but LOW current Interest in day-to-day details?',
        ['Keep Satisfied (concise executive summaries and milestone alignment without overwhelming them with daily noise)', 'Ignore them completely', 'Send them 50 raw git commit emails per day', 'Ask them to write CSS'],
        0,
        'High Power / Low Interest stakeholders must be "Kept Satisfied" with high-level alignment so they remain supportive sponsors.'
      ]
    ]
  },
  {
    id: 'm12',
    domain: 'M',
    short: 'AI Strategy',
    titleEn: 'AI Product Leadership & Ethics',
    titlePl: 'Strategia produktów AI, EU AI Act, ISO 42001, ekonomia tokenów i transformacja zespołów Vibe Coding',
    emoji: '🌐',
    level: 'V6',
    yt: [
      { ytId: '2S1a2b3c4d5', title: 'AI Product Strategy – Moats, Token Economics & Evaluation Loops', channel: 'Y Combinator / a16z', dur: 540 },
      { ytId: '3T1a2b3c4d5', title: 'Responsible AI Governance, EU AI Act & ISO/IEC 42001', channel: 'IBM Technology', dur: 480 },
      { ytId: '4U1a2b3c4d5', title: 'Leading Full-Stack Vibe Coding Teams – The 10x Product Builder', channel: 'AI Engineer Summit', dur: 520 }
    ],
    words: [
      ['Data Flywheel Moat', 'Przewaga konkurencyjna wynikająca z pętli zwrotnej unikalnych danych i ewaluacji', '⚙️', 'Build a durable data flywheel moat where user corrections continuously improve domain prompts and evals.'],
      ['Token Economics & Model Routing', 'Optymalizacja marży przez kierowanie prostych zadań do szybkich modeli Flash, a złożonych do Pro', '💱', 'Protect gross margins with intelligent model routing between lightweight Flash models and deep reasoning models.'],
      ['EU AI Act Risk Tiers', 'Klasyfikacja systemów AI wg ryzyka (Unacceptable, High-Risk, Limited/Transparency, Minimal)', '⚖️', 'Audit AI features against EU AI Act transparency and high-risk governance tiers.'],
      ['ISO/IEC 42001 (AIMS)', 'Międzynarodowy standard systemu zarządzania sztuczną inteligencją w organizacji', '🏛️', 'Establish traceable AI governance policies aligned with the ISO/IEC 42001 standard.'],
      ['Cross-Functional Builder Pod', 'Zwinny zespół łączący kompetencje kodu, designu, marketingu i produktu wspierany przez AI', '🚀', 'Empower cross-functional builder pods where every member can prototype across code, design, and growth.'],
      ['Human Agency & Explainability', 'Zachowanie kontroli człowieka oraz wyjaśnialności decyzji podejmowanych przez AI', '🧭', 'Design transparent explainability cues so users understand why the AI recommended an action.']
    ],
    sentences: [
      ['True Vibe Coding leadership unites red (engineering), green (design & media), blue (growth marketing), and white (agile management) into one cohesive builder workflow.', 'Prawdziwe przywództwo w erze Vibe Codingu łączy czerwień (inżynierię), zieleń (design i multimedia), błękit (marketing wzrostu) oraz biel (zwinny management) w jeden spójny przepływ pracy twórcy.', '🎯'],
      ['Route routine classification tasks to fast, low-cost models and reserve frontier reasoning models for complex synthesis.', 'Kieruj rutynowe zadania klasyfikacji do szybkich, niskokosztowych modeli, a zaawansowane modele rozumowania rezerwuj dla złożonej syntezy.', '⚡'],
      ['Build proprietary evaluation datasets and workflow integrations—thin prompt wrappers alone are not a defensible moat.', 'Buduj własne zbiory ewaluacyjne oraz głębokie integracje procesowe — same cienkie nakładki na prompt nie stanowią trwałej przewagi konkurencyjnej.', '🏰'],
      ['Maintain human-in-the-loop oversight and audit logs for high-impact decisions to comply with ISO 42001 and the EU AI Act.', 'Utrzymuj nadzór człowieka (human-in-the-loop) oraz dzienniki audytowe dla decyzji o wysokim wpływie, zgodnie z normą ISO 42001 oraz regulacją EU AI Act.', '🛡️']
    ],
    quiz: [
      [
        'How does a modern AI Product Leader optimize "Token Economics" without sacrificing product quality?',
        ['By using smart model routing (fast Flash models for low-latency routine tasks, Pro/reasoning models for complex architecture) plus prompt caching and structured outputs', 'By turning off the server every afternoon', 'By charging users $500 per click', 'By removing all system prompts'],
        0,
        'Intelligent model routing and context caching deliver low latency and healthy SaaS gross margins while preserving frontier quality where needed.'
      ]
    ]
  }
];

function buildVideosForTopic(seed: RawSeed): TopicVideo[] {
  return seed.yt.map((y, idx) => {
    const w0 = seed.words[(idx * 2) % seed.words.length];
    const w1 = seed.words[(idx * 2 + 1) % seed.words.length];
    const s0 = seed.sentences[idx % seed.sentences.length];
    const s1 = seed.sentences[(idx + 1) % seed.sentences.length];

    return {
      id: `${seed.id}-v${idx + 1}`,
      ytId: y.ytId,
      title: y.title,
      channel: y.channel,
      durationSec: y.dur,
      level: seed.level,
      summaryPl: `W tym anglojęzycznym materiale z obszaru „${seed.titleEn}” (${DOMAINS[seed.domain].namePl}) poznasz praktyczne zastosowanie pojęć takich jak ${w0[0]} oraz ${w1[0]} w codziennym workflow Vibe Codingu.`,
      transcript: [
        {
          time: 0,
          timeLabel: '0:00',
          en: `Welcome! Today we are exploring ${seed.titleEn} and how modern builders apply it in real projects.`,
          pl: `Witajcie! Dziś zgłębiamy ${seed.titlePl} oraz to, jak współcześni twórcy stosują ten obszar w realnych projektach.`
        },
        {
          time: 18,
          timeLabel: '0:18',
          en: `First, let's focus on ${w0[0]}: ${w0[3]}`,
          pl: `Najpierw skupmy się na pojęciu ${w0[0]} (${w0[1]}): ${w0[3]}`
        },
        {
          time: 42,
          timeLabel: '0:42',
          en: s0[0],
          pl: s0[1]
        },
        {
          time: 68,
          timeLabel: '1:08',
          en: `Next, notice how ${w1[0]} connects to the workflow: ${w1[3]}`,
          pl: `Następnie zwróć uwagę, jak ${w1[0]} (${w1[1]}) łączy się z procesem: ${w1[3]}`
        },
        {
          time: 95,
          timeLabel: '1:35',
          en: s1[0],
          pl: s1[1]
        },
        {
          time: 125,
          timeLabel: '2:05',
          en: `By combining ${w0[0]} and ${w1[0]}, you can iterate faster, verify quality, and ship with confidence.`,
          pl: `Łącząc ${w0[0]} oraz ${w1[0]}, możesz iterować szybciej, weryfikować jakość i wdrażać rozwiązania z pewnością.`
        }
      ],
      phrases: [
        { en: w0[0], pl: w0[1] },
        { en: w1[0], pl: w1[1] },
        { en: w0[3], pl: `Przykład zastosowania w prompcie / specyfikacji (${w0[0]})` }
      ],
      questions: [
        {
          q: `In the video on "${seed.titleEn}", how is "${w0[0]}" best applied in practice?`,
          options: [
            w0[3],
            'By skipping all verification and deleting project requirements',
            'By avoiding structured specifications completely',
            'By waiting six months before testing a single prototype'
          ],
          answer: 0,
          explanationEn: `"${w0[0]}" is applied practically as: ${w0[3]}`
        },
        {
          q: `Which key principle from "${seed.titleEn}" is emphasized in the transcript?`,
          options: [
            s0[0],
            'Never measure outcomes or review user feedback',
            'Keep all knowledge siloed in undocumented files',
            'Ignore constraints and budget limits'
          ],
          answer: 0,
          explanationEn: `The video highlights: "${s0[0]}"`
        },
        {
          q: seed.quiz[0][0],
          options: seed.quiz[0][1],
          answer: seed.quiz[0][2],
          explanationEn: seed.quiz[0][3]
        }
      ],
      discussionEn: [
        `How would you apply ${w0[0]} and ${w1[0]} in your current Vibe Coding project?`,
        `What is the biggest bottleneck in ${seed.titleEn}, and how can an AI workflow solve it?`,
        `Can you formulate a concise English prompt or acceptance criterion based on this video?`
      ]
    };
  });
}

export const TOPICS: WheelTopic[] = RAW_TOPICS.map((seed) => ({
  id: seed.id,
  domain: seed.domain,
  short: seed.short,
  titleEn: seed.titleEn,
  titlePl: seed.titlePl,
  emoji: seed.emoji,
  level: seed.level,
  words: seed.words.map(([en, pl, emoji, promptExample]) => ({ en, pl, emoji, promptExample })),
  sentences: seed.sentences.map(([en, pl, emoji]) => ({ en, pl, emoji })),
  quiz: seed.quiz.map(([q, options, answer, explanationEn]) => ({ q, options, answer, explanationEn })),
  videos: buildVideosForTopic(seed)
}));

export function topicsOfDomain(domain: DomainKey): WheelTopic[] {
  return TOPICS.filter((t) => t.domain === domain);
}

export function findTopic(id: string): WheelTopic | undefined {
  return TOPICS.find((t) => t.id === id);
}

export function findVideo(videoId: string): { topic: WheelTopic; video: TopicVideo } | undefined {
  for (const t of TOPICS) {
    const v = t.videos.find((x) => x.id === videoId);
    if (v) return { topic: t, video: v };
  }
  return undefined;
}

export const TOPIC_LESSON_TYPES = [
  { key: 'words', titlePl: 'Terminy & Prompty', titleEn: 'Terms & Prompts', icon: '🧩' },
  { key: 'sentences', titlePl: 'Wzorce (Patterns)', titleEn: 'Workflow Patterns', icon: '🧱' },
  { key: 'quiz', titlePl: 'Quiz wiedzy', titleEn: 'Knowledge Quiz', icon: '❓' },
  { key: 'test', titlePl: 'Sprawdzian', titleEn: 'Mastery Test', icon: '🏆' }
] as const;
