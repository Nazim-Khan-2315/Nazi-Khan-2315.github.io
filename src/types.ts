export type TechId = 'mysql' | 'python_pandas' | 'excel' | 'powerbi' | 'tableau' | 'r_lang';

export interface TechItem {
  id: TechId;
  name: string;
  subtitle: string;
  category: string;
  imageSrc: string;
  badgeColor: string;
  glowColor: string;
  accentGradient: string;
  description: string;
  keyFeatures: string[];
  useCases: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularityScore: number;
  githubUrl?: string;
}

export interface SampleDataset {
  id: string;
  name: string;
  description: string;
  columns: string[];
  data: Record<string, any>[];
}

export interface SqlQueryExample {
  title: string;
  description: string;
  query: string;
}

export interface PandasSnippet {
  title: string;
  description: string;
  code: string;
}

export interface ExcelCell {
  raw: string;
  value: string | number;
  format?: 'currency' | 'percent' | 'number' | 'text';
}

export interface PowerBiKpi {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  target: string;
}

export interface RScriptExample {
  title: string;
  code: string;
  outputSummary: string;
  interpretation: string;
}
