import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    // App General
    appTitle: 'Value Stream Mapping',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    french: 'Français',
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    stages: 'Stages',
    stage: 'Stage',
    // Metrics
    leadTime: 'Lead Time',
    wipCount: 'WIP Count',
    wip: 'WIP',
    cycleTime: 'Cycle Time',
    processEfficiency: 'Process Efficiency',
    efficiency: 'Efficiency',
    days: 'days',
    items: 'items',
    hours: 'hours',
    // Actions
    viewDetails: 'View Details',
    optimizeProcess: 'Optimize Process',
    analyzeBottlenecks: 'Analyze Bottlenecks',
    stageDescription: 'Lean process stage with continuous improvement focus',
    // Process Stages
    improve: 'Improve',
    design: 'Design',
    develop: 'Develop',
    test: 'Test',
    deploy: 'Deploy',
    monitor: 'Monitor',
    // Navigation
    backToDashboard: 'Back to Dashboard',
    // Details Page
    metricsDetails: 'Metrics Details',
    metricsDetailsSubtitle: 'In-depth analysis of your process metrics and trends',
    target: 'Target',
    overview: 'Overview',
    allMetricsTrend: 'All Metrics Trend',
    efficiencyTrend: 'Efficiency Trend',
    leadTimeTrend: 'Lead Time Trend',
    wipTrend: 'WIP Trend',
    keyInsights: 'Key Insights',
    improvingEfficiency: 'Improving Efficiency',
    efficiencyImprovedBy: 'Efficiency improved by',
    lastMonth: 'last month',
    stableLeadTime: 'Stable Lead Time',
    leadTimeStable: 'Lead time stable within',
    wipNeedsAttention: 'WIP Needs Attention',
    wipAboveTarget: 'WIP above target by',
    average: 'Average',
    minimum: 'Minimum',
    maximum: 'Maximum',
    last30Days: 'Last 30 days',
    bestPerformance: 'Best performance',
    needsImprovement: 'Needs improvement',
    wipAnalysis: 'WIP Analysis',
    wipAnalysisDescription: 'Work In Progress analysis shows how many items are currently being worked on across all process stages.',
    currentWIP: 'Current WIP',
    targetWIP: 'Target WIP',
    difference: 'Difference',
    efficiencyBreakdown: 'Efficiency Breakdown',
    valueAddingTime: 'Value-Adding Time',
    waitingTime: 'Waiting Time',
    wasteTime: 'Waste Time',
    recommendations: 'Recommendations',
    recommendation1: 'Focus on reducing waiting time between stages',
    recommendation2: 'Implement parallel processing where possible',
    recommendation3: 'Automate repetitive tasks in the Test stage',
    leadTimeDescription: 'Total time from start to finish',
    wipDescription: 'Number of items currently in progress',
    cycleTimeDescription: 'Average time per item',
    efficiencyDescription: 'Percentage of value-adding time',
    // Bottlenecks Page
    bottleneckAnalysis: 'Bottleneck Analysis',
    bottleneckAnalysisSubtitle: 'Identify and resolve process bottlenecks to improve flow',
    highSeverity: 'High Severity',
    mediumSeverity: 'Medium Severity',
    lowSeverity: 'Low Severity',
    needsImmediateAttention: 'Needs immediate attention',
    planForImprovement: 'Plan for improvement',
    averageImpact: 'Average Impact',
    onOverallProcess: 'on overall process',
    leadTimeByStage: 'Lead Time by Stage',
    wipByStage: 'WIP by Stage',
    identifiedBottlenecks: 'Identified Bottlenecks',
    impact: 'Impact',
    suggestions: 'Suggestions',
    createActionPlan: 'Create Action Plan',
    overallRecommendations: 'Overall Recommendations',
    optimizeLeadTime: 'Optimize Lead Time',
    optimizeLeadTimeDesc: 'Focus on the Test stage which shows the highest lead time',
    balanceWIP: 'Balance WIP',
    balanceWIPDesc: 'Distribute work more evenly across development stages',
    increaseEfficiency: 'Increase Efficiency',
    increaseEfficiencyDesc: 'Reduce waste and waiting time in all stages',
    automateProcesses: 'Automate Processes',
    automateProcessesDesc: 'Implement automation for repetitive manual tasks',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    bottleneck1Description: 'Test stage showing significantly higher lead time due to manual testing processes and limited resources',
    bottleneck1Suggestion1: 'Implement automated testing frameworks',
    bottleneck1Suggestion2: 'Increase testing resources during peak periods',
    bottleneck1Suggestion3: 'Parallelize test execution where possible',
    bottleneck2Description: 'Development stage has accumulated WIP items causing delays and context switching',
    bottleneck2Suggestion1: 'Implement WIP limits per developer',
    bottleneck2Suggestion2: 'Focus on completing tasks before starting new ones',
    bottleneck3Description: 'Deployment process has some manual steps that could be automated',
    bottleneck3Suggestion1: 'Automate deployment pipeline completely',
    // Optimize Page
    processOptimization: 'Process Optimization',
    processOptimizationSubtitle: 'Simulate and implement process improvements',
    optimizationSimulator: 'Optimization Simulator',
    teamSize: 'Team Size',
    adjustTeamSize: 'Adjust team size to see impact on metrics',
    automationLevel: 'Automation Level',
    automationLevelDesc: 'Percentage of automated tasks',
    parallelization: 'Parallelization',
    parallelizationDesc: 'Percentage of parallel task execution',
    projectedResults: 'Projected Results',
    potentialImprovement: 'Potential Improvement',
    potentialImprovementDesc: 'These projections show the potential impact of your optimization choices',
    optimizationRecommendations: 'Optimization Recommendations',
    estimatedImprovement: 'Estimated Improvement',
    implementRecommendation: 'Implement Recommendation',
    optimizationRec1Title: 'Implement CI/CD Automation',
    optimizationRec1Desc: 'Automate the entire deployment pipeline to reduce manual intervention and errors',
    optimizationRec2Title: 'Adopt Kanban WIP Limits',
    optimizationRec2Desc: 'Set strict WIP limits to improve flow and reduce context switching',
    optimizationRec3Title: 'Scale Testing Infrastructure',
    optimizationRec3Desc: 'Add more testing resources and implement parallel test execution',
    optimizationRec4Title: 'Continuous Improvement Practices',
    optimizationRec4Desc: 'Establish regular retrospectives and implement kaizen methodology',
    automation: 'Automation',
    workflow: 'Workflow',
    resource: 'Resource',
    process: 'Process',
    effort: 'Effort',
    quickWins: 'Quick Wins',
    quickWinsDesc: 'Low-effort, high-impact improvements you can implement immediately',
    quickWin1: 'Daily Standups',
    quickWin1Desc: 'Implement quick daily synchronization meetings',
    quickWin2: 'Code Reviews',
    quickWin2Desc: 'Establish mandatory peer code reviews',
    quickWin3: 'Definition of Done',
    quickWin3Desc: 'Create clear completion criteria for all tasks',
    // Process Editor
    editProcessStages: 'Edit Process Stages',
    editProcessStagesDesc: 'Add, edit, or remove process stages to customize your value stream',
    stageName: 'Stage Name',
    addNewStage: 'Add New Stage',
    enterStageName: 'Enter stage name',
    addStage: 'Add Stage',
    save: 'Save',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    // Export
    export: 'Export',
    exportData: 'Export Data',
    exportDataDesc: 'Export your metrics and analysis in various formats',
    selectFormat: 'Select Format',
    pdfDesc: 'Complete report with charts and metrics',
    csvDesc: 'Spreadsheet data for external analysis',
    jsonDesc: 'Raw data in JSON format',
    includeInExport: 'Include in Export',
    metricsData: 'Metrics Data',
    processStages: 'Process Stages',
    charts: 'Charts',
    exportStarted: 'Export Started',
    exporting: 'Exporting',
    file: 'file',
    exportSuccess: 'Export Successful',
    yourFile: 'Your',
    hasBeenExported: 'file has been exported successfully',
    // Settings
    settings: 'Settings',
    settingsSubtitle: 'Configure your preferences and targets',
    appearance: 'Appearance',
    theme: 'Theme',
    selectLanguage: 'Select Language',
    notifications: 'Notifications',
    enableNotifications: 'Enable Notifications',
    enableNotificationsDesc: 'Receive alerts when metrics exceed thresholds',
    alertThresholds: 'Alert Thresholds',
    leadTimeThresholdDesc: 'Alert when lead time exceeds this value',
    wipThresholdDesc: 'Alert when WIP count exceeds this value',
    efficiencyThresholdDesc: 'Alert when efficiency falls below this value',
    targets: 'Targets',
    targetsDesc: 'Set your target metrics for optimal process performance',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings Saved',
    settingsSavedDesc: 'Your preferences have been saved successfully',
  },
  ar: {},
  fr: {},
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
