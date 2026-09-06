import { EducationItem, Project, SocialLink, SpecificationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'VIPLOV',
  formalName: 'Viplov',
  age: 19,
  title: 'COMPUTER SCIENCE UNDERGRADUATE & SOFTWARE DEVELOPER',
  locations: [
    { city: 'DELHI', role: 'PERMANENT BASE', coords: '28.6139° N, 77.2090° E' },
    { city: 'GREATER NOIDA', role: 'ACADEMIC CAMPUS', coords: '28.4744° N, 77.5040° E' },
  ],
  institution: 'IEC COLLEGE OF ENGINEERING & TECHNOLOGY',
  department: 'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING',
  academicStanding: 'B.TECH CSE CANDIDATE (2025–2029) // 2ND YEAR',
  email: 'viplov7@icloud.com',
  githubUsername: 'viplovk',
  githubUrl: 'https://github.com/viplovk',
  quote: 'OBJECTIVITY OVER SUBJECTIVITY. THE GRID IS THE SKELETON OF INFORMATION.',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    platform: 'EMAIL (ICLOUD)',
    label: 'VIPLOV7@ICLOUD.COM',
    username: 'viplov7@icloud.com',
    url: 'mailto:viplov7@icloud.com',
    iconName: 'mail',
  },
  {
    id: 'github',
    platform: 'GITHUB',
    label: 'GITHUB.COM/VIPLOVK',
    username: 'viplovk',
    url: 'https://github.com/viplovk',
    iconName: 'github',
  },
  {
    id: 'linkedin',
    platform: 'LINKEDIN',
    label: 'LINKEDIN.COM/IN/VIPLOV7',
    username: 'viplov7',
    url: 'https://linkedin.com/in/viplov7',
    iconName: 'linkedin',
  },
  {
    id: 'twitter',
    platform: 'TWITTER / X',
    label: 'X.COM/VISHUK30',
    username: 'vishuk30',
    url: 'https://x.com/vishuk30',
    iconName: 'twitter',
  },
  {
    id: 'instagram',
    platform: 'INSTAGRAM',
    label: 'INSTAGRAM.COM/STUDYMATERIALBOY',
    username: 'studymaterialboy',
    url: 'https://instagram.com/studymaterialboy',
    iconName: 'instagram',
  },
];

export const SPECIFICATIONS: SpecificationItem[] = [
  {
    parameter: 'DISCIPLINE',
    value: 'COMPUTER SCIENCE & ENGINEERING',
    detail: 'Core systems, data structures, algorithm design & modern web frameworks',
    classification: 'ACADEMIC',
  },
  {
    parameter: 'ACADEMIC SPECIALIZATION',
    value: 'B.TECH CSE (2025–2029) // 2ND YEAR',
    detail: 'Undergraduate 2nd Year student in Computer Science & Engineering (Batch 2025–2029)',
    classification: 'ACADEMIC',
  },
  {
    parameter: 'CORE STACK',
    value: 'TYPESCRIPT / C++ / PYTHON / NODE',
    detail: 'Modern React, Next.js conventions, Tailwind CSS architecture, low-level data structures',
    classification: 'TECHNICAL',
  },
  {
    parameter: 'PRIMARY GEOGRAPHY',
    value: 'DELHI & GREATER NOIDA',
    detail: 'National Capital Region, India [28.6139° N, 77.2090° E]',
    classification: 'LOGISTICS',
  },
  {
    parameter: 'OPERATING METHOD',
    value: 'INTERNATIONAL TYPOGRAPHIC STYLE',
    detail: 'Strict mathematical ratios, visible structural grids, zero ornamentation',
    classification: 'DESIGN SYSTEM',
  },
  {
    parameter: 'CHRONOLOGY',
    value: '19 YEARS OF AGE',
    detail: 'Born 2007; Active software prototyping & engineering cadence',
    classification: 'BIOMETRIC',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'repos',
    repoName: 'repos',
    name: 'REPOS // META-INDEXER',
    category: 'DEVELOPER TOOLING & TELEMETRY',
    status: 'ACTIVE',
    year: '2025',
    summary: 'A structured repository manifest analyzer, directory indexer, and developer telemetry utility.',
    description:
      'A programmatic repository interface that indexes GitHub workspaces, categorizes code modularity, parses licensing headers, and renders clear manifest hierarchies. Built to organize evolving codebases into objective, scannable data grids.',
    architecture: [
      'Modular REST API client connecting to GitHub v3 endpoints',
      'High-throughput parsing of git tree hierarchies and branch topologies',
      'Asymmetrical table layout with live search and category segmentation',
      'Zero-dependency fallback local storage cache for offline manifest caching',
    ],
    techStack: ['TypeScript', 'GitHub REST API', 'React', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/viplovk/repos',
    previewType: 'repos_indexer',
    stats: {
      commits: '48+ COMMITS',
      license: 'MIT LICENSE',
      language: 'TYPESCRIPT',
      stars: 12,
    },
  },
  {
    id: 'IECCET',
    repoName: 'IECCET',
    name: 'IECCET // CSE ACADEMIC PORTAL',
    category: 'INSTITUTIONAL PLATFORM',
    status: 'ACTIVE',
    year: '2025',
    summary: 'Dedicated academic resource hub, curriculum planner, and grade calculator for IEC-CET students.',
    description:
      'A centralized academic platform tailored for the Department of Computer Science & Engineering at IEC College of Engineering & Technology. Integrates semester syllabus blueprints, examination archives, lab manual indices, and an interactive SGPA/CGPA evaluation tool.',
    architecture: [
      'Semester curriculum tracking engine with credit weighting logic',
      'Dynamic SGPA/CGPA projection calculator with AKTU university grading scale',
      'Organized directory for CSE coursework: Data Structures, Discrete Math, Digital Logic',
      'High contrast Swiss typographic printable syllabus reference mode',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Local Database'],
    githubUrl: 'https://github.com/viplovk/IECCET',
    previewType: 'academic_hub',
    stats: {
      commits: '64+ COMMITS',
      license: 'APACHE-2.0',
      language: 'REACT / TS',
      stars: 24,
    },
  },
  {
    id: 'calc',
    repoName: 'calc',
    name: 'CALC // HIGH-PRECISION EVALUATOR',
    category: 'MATHEMATICAL COMPUTING',
    status: 'MAINTAINED',
    year: '2024',
    summary: 'A precision programmatic arithmetic calculator and expression syntax evaluator.',
    description:
      'Engineered to execute arithmetic, trigonometric, and algebraic expressions with zero floating-point imprecision artifacts. Features an interactive Swiss brutalist command keypad, step-by-step token tree visualizer, and memory registers.',
    architecture: [
      'Recursive descent parser parsing infix expressions into Abstract Syntax Trees',
      'Shunting-yard algorithmic transformation for operator precedence management',
      'Arbitrary precision decimal handling avoiding IEEE 754 binary floating quirks',
      'Snappy keyboard shortcut listener with tactile audio-visual mechanical feedback',
    ],
    techStack: ['TypeScript', 'Algorithms', 'Web Audio API', 'React'],
    githubUrl: 'https://github.com/viplovk/calc',
    previewType: 'calculator',
    stats: {
      commits: '32+ COMMITS',
      license: 'MIT LICENSE',
      language: 'TYPESCRIPT',
      stars: 18,
    },
  },
  {
    id: 'beyond',
    repoName: 'beyond',
    name: 'BEYOND // EXPERIMENTAL CANVAS',
    category: 'CREATIVE COMPUTING & UI',
    status: 'ACTIVE',
    year: '2025',
    summary: 'An experimental playground exploring spatial layout algorithms and kinetic typography.',
    description:
      'A high-performance exploratory environment pushing the boundaries of web UI mechanics. Implements geometric particle systems, dynamic Bauhaus typographic layout algorithms, and viewport-reactive physics.',
    architecture: [
      'Direct Canvas 2D / WebGL rendering loop clocked at 60 FPS',
      'Vector field calculation with gravitational pointer repulsion',
      'Dynamic Swiss layout generator with algorithmic golden-ratio partitioning',
      'Real-time frame budget telemetry and draw call inspection monitor',
    ],
    techStack: ['HTML5 Canvas', 'TypeScript', 'Math/Vector Physics', 'Vite'],
    githubUrl: 'https://github.com/viplovk/beyond',
    previewType: 'interactive_canvas',
    stats: {
      commits: '55+ COMMITS',
      license: 'MIT LICENSE',
      language: 'TYPESCRIPT',
      stars: 31,
    },
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: 'undergraduate',
    period: '2025 — 2029 (CURRENT: 2ND YEAR)',
    stage: 'UNDERGRADUATE STUDIES (B.TECH 2ND YEAR)',
    institution: 'IEC COLLEGE OF ENGINEERING & TECHNOLOGY',
    location: 'GREATER NOIDA, UTTAR PRADESH, INDIA',
    score: 'BATCH 2025–2029',
    scoreLabel: 'ENROLLMENT',
    highlights: [
      'Bachelor of Technology (B.Tech) in Computer Science & Engineering (CSE) — 2nd Year',
      'Batch: 2025–2029 | Department of Computer Science & Engineering',
      'Specialization: Core Systems, Algorithms, Distributed Logic & Modern Web Engineering',
      'Coursework: Data Structures & Algorithms, Object-Oriented Programming, Computational Systems, Discrete Mathematics',
      'Active developer behind the open-source IECCET student repository',
    ],
    details:
      'Currently in 2nd year pursuing an intensive 4-year B.Tech curriculum (Batch 2025–2029) grounded in computation theory, algorithm design, system architecture, and modern distributed software engineering.',
  },
  {
    id: 'high-school-12',
    period: 'GRADUATED 2025',
    stage: 'SENIOR SECONDARY (CLASS XII)',
    institution: 'BHARTI PUBLIC SCHOOL',
    location: 'DELHI, INDIA',
    score: 'SCIENCE STREAM',
    scoreLabel: 'GRADUATION FOCUS',
    highlights: [
      'Rigorous Science stream with Physics, Chemistry, and Mathematics (PCM)',
      'Completed comprehensive senior secondary board curriculum',
      'Built early foundations in algorithmic logic, mechanics, and laboratory experiments',
    ],
    details:
      'Developed strong mathematical and analytical problem-solving faculties, participating in computational science events and academic forums.',
  },
  {
    id: 'coaching',
    period: '2023 — 2025',
    stage: 'ADVANCED COMPETITIVE PREPARATION',
    institution: 'VIDHYAPEETH PREET VIHAR',
    location: 'DELHI, INDIA',
    score: 'INTENSIVE PCM',
    scoreLabel: 'DISCIPLINE',
    highlights: [
      'Advanced analytical problem-solving across Calculus, Mechanics, Electromagnetism, and Chemistry',
      'Competitive entrance exam training honing speed, precision, and foundational rigor',
      'High-pressure test series simulation and time-management discipline',
    ],
    details:
      'Extensive academic preparation emphasizing first-principles thinking, quantitative analysis, and perseverance in resolving complex problem sets.',
  },
  {
    id: 'high-school-10',
    period: 'COMPLETED 2023',
    stage: 'SECONDARY SCHOOL (CLASS X)',
    institution: 'BHARTI PUBLIC SCHOOL',
    location: 'DELHI, INDIA',
    score: 'FIRST CLASS',
    scoreLabel: 'CERTIFICATION',
    highlights: [
      'Completed Class X Secondary School examinations in 2023',
      'General science, mathematics, computer applications, and social studies',
      'First exposure to computer programming, algorithmic flowcharts, and syntax',
    ],
    details:
      'Formative secondary education in Delhi completed in 2023, instilling a lifelong enthusiasm for technology, structured logic, and engineering design.',
  },
];
