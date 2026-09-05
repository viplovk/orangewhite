export interface Project {
  id: string;
  repoName: string;
  name: string;
  category: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'MAINTAINED';
  year: string;
  summary: string;
  description: string;
  architecture: string[];
  techStack: string[];
  githubUrl: string;
  previewType: 'calculator' | 'repos_indexer' | 'academic_hub' | 'interactive_canvas';
  stats: {
    commits: string;
    license: string;
    language: string;
    stars?: number;
  };
}

export interface EducationItem {
  id: string;
  period: string;
  stage: string;
  institution: string;
  location: string;
  score?: string;
  scoreLabel?: string;
  highlights: string[];
  details: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  username: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'mail';
}

export interface SpecificationItem {
  parameter: string;
  value: string;
  detail: string;
  classification: string;
}
