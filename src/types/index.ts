// Types for the Lean Stream Canvas application

export interface ProcessStage {
  id: string;
  name: string;
  leadTime: number;
  wip: number;
  position: number;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  target?: number;
  description?: string;
}

export interface Bottleneck {
  id: string;
  stageId: string;
  stageName: string;
  severity: 'high' | 'medium' | 'low';
  type: 'wip' | 'leadTime' | 'efficiency';
  description: string;
  impact: number;
  suggestions: string[];
}

export interface OptimizationRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'process' | 'resource' | 'workflow' | 'automation';
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  estimatedImprovement: {
    leadTime?: number;
    cycleTime?: number;
    efficiency?: number;
    wip?: number;
  };
}

export interface HistoricalData {
  date: string;
  leadTime: number;
  cycleTime: number;
  wip: number;
  efficiency: number;
}

export interface ExportFormat {
  format: 'pdf' | 'csv' | 'json';
  includeCharts: boolean;
  includeMetrics: boolean;
  includeStages: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface UserSettings {
  language: 'en' | 'ar' | 'fr';
  theme: 'light' | 'dark';
  notifications: {
    enabled: boolean;
    threshold: {
      leadTime: number;
      wip: number;
      efficiency: number;
    };
  };
  targets: {
    leadTime: number;
    cycleTime: number;
    efficiency: number;
    wip: number;
  };
}
