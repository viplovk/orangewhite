export type ExperimentType =
  | 'three'
  | 'webgl'
  | 'shader'
  | 'ai'
  | 'creative-code'
  | 'motion';

export type ExperimentStatus = 'ACTIVE' | 'PROTOTYPE' | 'CONCEPT' | 'ARCHIVED';

export interface Experiment {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  categories: string[];
  year: string;
  status: ExperimentStatus;
  technologies: string[];
  type: ExperimentType;
  featured: boolean;
  github: string;
  liveUrl: string;
  notes?: string;
}

export const EXPERIMENTS_CATEGORIES = [
  'ALL',
  'THREE.JS',
  'WEBGL',
  'AI',
  'CREATIVE CODE',
  'UI / MOTION',
  'SHADERS',
] as const;

export type ExperimentCategory = (typeof EXPERIMENTS_CATEGORIES)[number];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-001',
    number: '001',
    title: 'LIQUID CURSOR',
    description:
      'A WebGL experiment exploring fluid-like pointer displacement and viscous surface distortion using real-time fragment shaders.',
    category: 'WEBGL',
    categories: ['WEBGL', 'CREATIVE CODE', 'SHADERS'],
    year: '2026',
    status: 'ACTIVE',
    technologies: ['WebGL', 'GLSL', 'Canvas API', 'Fluid Dynamics'],
    type: 'webgl',
    featured: true,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      'Pointer velocities inject directional impulse vectors into a 2D simulation grid with damping, vorticity confinement, and dissipation.',
  },
  {
    id: 'exp-002',
    number: '002',
    title: 'KINETIC TOPOLOGY',
    description:
      'Procedural wireframe digital sculpture built in Three.js. Real-time vertex displacement and camera orientation driven by cursor physics.',
    category: 'THREE.JS',
    categories: ['THREE.JS', 'CREATIVE CODE'],
    year: '2026',
    status: 'ACTIVE',
    technologies: ['Three.js', 'WebGL', 'Mathematical Geometry', 'Noise Fields'],
    type: 'three',
    featured: false,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      'Morphing parametric torus knot with mathematical harmonic wave deformation and interactive camera gimbal dampening.',
  },
  {
    id: 'exp-003',
    number: '003',
    title: 'NEURAL INTERFACE',
    description:
      'An interactive AI architecture prototype exploring token streaming, attention weight visualization, and latent vector transformations.',
    category: 'AI',
    categories: ['AI', 'UI / MOTION'],
    year: '2026',
    status: 'PROTOTYPE',
    technologies: ['Transformer Logic', 'Canvas API', 'Semantic Embeddings', 'Reactive UI'],
    type: 'ai',
    featured: false,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      'Visualizes token pipeline from prompt ingestion through feed-forward layers to predicted token probability distributions.',
  },
  {
    id: 'exp-004',
    number: '004',
    title: 'PROCEDURAL VORONOI',
    description:
      'Real-time GLSL cellular noise and Voronoi tessellation generator with dynamic distance metric shifting and chromatic aberration.',
    category: 'SHADERS',
    categories: ['SHADERS', 'WEBGL'],
    year: '2026',
    status: 'ACTIVE',
    technologies: ['GLSL', 'WebGL Shaders', 'Procedural Math', 'GPU Computing'],
    type: 'shader',
    featured: false,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      'Distance-to-feature calculation implemented directly in fragment shader with Swiss monochrome and orange thresholding.',
  },
  {
    id: 'exp-005',
    number: '005',
    title: 'PARTICLE CHOREOGRAPHY',
    description:
      'Autonomous multi-agent particle flocking system using Craig Reynolds\' boids algorithm (separation, alignment, cohesion) with mouse gravitational wells.',
    category: 'CREATIVE CODE',
    categories: ['CREATIVE CODE', 'THREE.JS'],
    year: '2026',
    status: 'ACTIVE',
    technologies: ['Canvas 2D', 'Vector Physics', 'Autonomous Agents', 'Euler Integration'],
    type: 'creative-code',
    featured: false,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      '800 reactive vector nodes calculating neighbor distances with spatial hash grid optimization and repelling cursor magnets.',
  },
  {
    id: 'exp-006',
    number: '006',
    title: 'KINETIC SWISS TYPE',
    description:
      'Variable grotesque typographic engine reacting dynamically to mouse proximity, baseline tension, and optical kerning oscillations.',
    category: 'UI / MOTION',
    categories: ['UI / MOTION', 'CREATIVE CODE'],
    year: '2026',
    status: 'PROTOTYPE',
    technologies: ['Variable Fonts', 'Spring Physics', 'Kinetic Typography', 'Matrix Transforms'],
    type: 'motion',
    featured: false,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      'Calculates inverse square distance from cursor to glyph centers to dynamically modulate font-weight, stretch, and baseline jitter.',
  },
  {
    id: 'exp-007',
    number: '007',
    title: 'RAYMARCHED QUATERNION',
    description:
      'GPU raymarched signed distance field (SDF) rendering a 4D quaternion fractal with Phong illumination and soft shadow march in GLSL.',
    category: 'SHADERS',
    categories: ['SHADERS', 'THREE.JS', 'WEBGL'],
    year: '2026',
    status: 'CONCEPT',
    technologies: ['Raymarching', 'SDF Math', 'GLSL', 'Quaternion Geometry'],
    type: 'shader',
    featured: false,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      'Sphere-tracing algorithm running inside a custom fragment shader on a screen-quad polygon with interactive light angle.',
  },
  {
    id: 'exp-008',
    number: '008',
    title: 'LATENT VECTOR MATRIX',
    description:
      'High-dimensional embedding visualizer projecting multi-modal concept embeddings onto a 2D coordinate plane with cosine similarity clusters.',
    category: 'AI',
    categories: ['AI', 'CREATIVE CODE'],
    year: '2026',
    status: 'ACTIVE',
    technologies: ['Vector Space', 'Cosine Distance', 'Dimensional Reduction', 'Clustering'],
    type: 'ai',
    featured: false,
    github: 'https://github.com/viplovk',
    liveUrl: 'https://github.com/viplovk',
    notes:
      'Simulates semantic proximity clustering across computer science and creative technology concept nodes with live spring forces.',
  },
];
