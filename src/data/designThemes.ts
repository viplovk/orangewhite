export interface DesignTheme {
  id: 'swiss' | 'cyber' | 'modern-dark' | 'editorial' | 'neo-pop';
  name: string;
  tagline: string;
  category: string;
  description: string;
  philosophy: string;
  colors: {
    bg: string;
    surface: string;
    card: string;
    text: string;
    textMuted: string;
    accent: string;
    border: string;
    previewRing: string;
  };
  typography: {
    display: string;
    body: string;
    mono: string;
  };
  characteristics: string[];
  vibeTags: string[];
}

export const DESIGN_THEMES: DesignTheme[] = [
  {
    id: 'swiss',
    name: 'Swiss International',
    tagline: 'Bauhaus Typographic Canon & Stark Grid Architecture',
    category: 'International Typographic Style',
    description: 'Pure black-and-white grid with high-impact grotesque typography, zero-radius geometry, visible structural borders, and functional Swiss Red accents.',
    philosophy: 'Absolute objectivity and clarity. The grid is an unyielding mathematical skeleton organizing content without superficial ornament.',
    colors: {
      bg: '#FFFFFF',
      surface: '#F2F2F2',
      card: '#FFFFFF',
      text: '#000000',
      textMuted: '#525252',
      accent: '#FF3000',
      border: '#000000',
      previewRing: '#FF3000',
    },
    typography: {
      display: 'Inter Grotesque (Heavy 900)',
      body: 'Inter 400/500/600',
      mono: 'Space / UI Monospace',
    },
    characteristics: [
      '4px Solid Black structural grid borders',
      '0px rigid rectangular geometry across all containers',
      'Asymmetric 7:5 and 8:4 column divisions',
      'Swiss Red (#FF3000) as exclusive functional signal',
      'Massive scale contrasts in headline typography',
    ],
    vibeTags: ['Bauhaus', 'Brutalist', 'Objective', 'High-Contrast', 'Editorial'],
  },
  {
    id: 'cyber',
    name: 'Cyber Terminal & Telemetry',
    tagline: 'Hacker CLI, CRT Phosphor & Monospaced Systems Workspace',
    category: 'Monochrome CLI / Cyberpunk',
    description: 'Immersive deep-void dark mode styled like a high-performance Linux developer workstation, featuring phosphor green and amber accents, scanline textures, and real-time telemetry.',
    philosophy: 'Code-first engineering identity. Inspired by POSIX shells, kernel consoles, and telemetry stations that value speed, data density, and technical mastery.',
    colors: {
      bg: '#07090E',
      surface: '#0E131F',
      card: '#0A0E18',
      text: '#E2E8F0',
      textMuted: '#94A3B8',
      accent: '#00FF66',
      border: '#1E293B',
      previewRing: '#00FF66',
    },
    typography: {
      display: 'JetBrains Mono Bold',
      body: 'JetBrains Mono',
      mono: 'JetBrains Mono',
    },
    characteristics: [
      'Monospaced typography across headings and body text',
      'Phosphor Emerald (#00FF66) and Amber status indicators',
      'Command-line prompt motifs (viplov@iec-cet:~$)',
      'Subtle CRT scanline and matrix telemetry grids',
      'High density technical telemetry and system ping badges',
    ],
    vibeTags: ['Linux CLI', 'Systems Dev', 'Phosphor Green', 'Telemetry', 'Hacker'],
  },
  {
    id: 'modern-dark',
    name: 'Linear Obsidian',
    tagline: 'Modern High-Tech Dark Mode with Bento Radii & Cyan Halos',
    category: 'Sleek Developer Tools',
    description: 'Polished obsidian surface with 12px rounded bento grids, subtle hairline border glows, electric cyan accents, and refined developer ergonomics inspired by Linear, Raycast, and Vercel.',
    philosophy: 'Crafted for modern software engineering. Muted dark background with micro-interactions, soft pill controls, and immaculate contrast ratios.',
    colors: {
      bg: '#09090B',
      surface: '#121215',
      card: '#18181B',
      text: '#FAFAFA',
      textMuted: '#A1A1AA',
      accent: '#38BDF8',
      border: '#27272A',
      previewRing: '#38BDF8',
    },
    typography: {
      display: 'Plus Jakarta Sans Bold',
      body: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
    },
    characteristics: [
      '12px smooth border radii and bento-grid card framing',
      'Subtle 1px zinc borders with low-intensity ambient glows',
      'Electric Sky Cyan (#38BDF8) and Indigo gradient hints',
      'High contrast text hierarchy with muted secondary metadata',
      'Tactile button interactions and smooth pill badges',
    ],
    vibeTags: ['Linear / Vercel', 'Obsidian', 'Electric Cyan', 'Bento', 'Minimalist'],
  },
  {
    id: 'editorial',
    name: 'Archival Editorial',
    tagline: 'Warm Ivory Paper, Refined Serif Typography & Poised Restraint',
    category: 'Intellectual & Classical Minimalist',
    description: 'Warm ivory canvas with rich charcoal typography, luxurious serif display headings, earthy terracotta accents, and generous breathing room reminiscent of high-end academic design archives.',
    philosophy: 'Elegance through restraint and timeless typography. Designed for intellectual depth, academic rigor, and classical craft.',
    colors: {
      bg: '#FAF7F2',
      surface: '#F3EDE2',
      card: '#FFFFFF',
      text: '#1C1917',
      textMuted: '#57534E',
      accent: '#C2410C',
      border: '#D6D3D1',
      previewRing: '#C2410C',
    },
    typography: {
      display: 'Playfair Display Serif',
      body: 'Inter Grotesque',
      mono: 'Space Mono',
    },
    characteristics: [
      'Warm natural ivory (#FAF7F2) textured linen paper canvas',
      'Striking Playfair Display serif headings paired with clean sans body',
      'Warm Terracotta / Rust (#C2410C) accents',
      'Hairline 1px stone borders with generous negative space',
      'Archival publication catalog layout with Roman numeral touches',
    ],
    vibeTags: ['Warm Ivory', 'Serif Luxury', 'Terracotta', 'Academic', 'Timeless'],
  },
  {
    id: 'neo-pop',
    name: 'Neo-Brutalist Pop',
    tagline: 'Bold Indie Web, High Energy Yellow & Hard Offset Shadows',
    category: 'Modern Indie Hacker / Retro Web',
    description: 'High-contrast solar cream canvas with electric cobalt and amber accents, thick black container borders, and 4px hard offset drop-shadows that pop off the screen.',
    philosophy: 'Playful, bold, and unapologetically energetic. Celebrates tactile physical interfaces, thick sticker badges, and vibrant modern indie web culture.',
    colors: {
      bg: '#FFFDF0',
      surface: '#FEF08A',
      card: '#FFFFFF',
      text: '#0F172A',
      textMuted: '#475569',
      accent: '#2563EB',
      border: '#0F172A',
      previewRing: '#2563EB',
    },
    typography: {
      display: 'Inter Black (900) Uppercase',
      body: 'Inter Medium',
      mono: 'Space / UI Mono',
    },
    characteristics: [
      'Bold 3px solid black borders around all cards and controls',
      'Hard 4px offset drop-shadows (box-shadow: 4px 4px 0 #000)',
      'Electric Cobalt Blue (#2563EB) & Solar Yellow (#FEF08A)',
      'Chunky push-down button click animations',
      'Vibrant sticker badges and bold high-contrast chips',
    ],
    vibeTags: ['Neo-Brutalism', 'Offset Shadow', 'Cobalt Blue', 'Indie Web', 'Punchy'],
  },
];
