import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetricsChart } from '@/components/MetricsChart';
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Bottleneck } from '@/types';

const Bottlenecks: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mock bottleneck data
  const bottlenecks: Bottleneck[] = [
    {
      id: '1',
      stageId: 'test',
      stageName: t('test'),
      severity: 'high',
      type: 'leadTime',
      description: t('bottleneck1Description'),
      impact: 35,
      suggestions: [
        t('bottleneck1Suggestion1'),
        t('bottleneck1Suggestion2'),
        t('bottleneck1Suggestion3'),
      ],
    },
    {
      id: '2',
      stageId: 'develop',
      stageName: t('develop'),
      severity: 'medium',
      type: 'wip',
      description: t('bottleneck2Description'),
      impact: 25,
      suggestions: [
        t('bottleneck2Suggestion1'),
        t('bottleneck2Suggestion2'),
      ],
    },
    {
      id: '3',
      stageId: 'deploy',
      stageName: t('deploy'),
      severity: 'low',
      type: 'efficiency',
      description: t('bottleneck3Description'),
      impact: 12,
      suggestions: [
        t('bottleneck3Suggestion1'),
      ],
    },
  ];

  // Mock stage comparison data
  const stageComparisonData = [
    { stage: t('improve'), leadTime: 28, wip: 3, efficiency: 92 },
    { stage: t('design'), leadTime: 32, wip: 4, efficiency: 88 },
    { stage: t('develop'), leadTime: 48, wip: 8, efficiency: 85 },
    { stage: t('test'), leadTime: 52, wip: 6, efficiency: 78 },
    { stage: t('deploy'), leadTime: 24, wip: 2, efficiency: 90 },
    { stage: t('monitor'), leadTime: 24, wip: 2, efficiency: 94 },
  ];

  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
    }
  };

  const getSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
    const baseClass = "h-5 w-5";
    switch (severity) {
      case 'high':
        return <AlertTriangle className={`${baseClass} text-red-500`} />;
      case 'medium':
        return <AlertTriangle className={`${baseClass} text-orange-500`} />;
      case 'low':
        return <AlertTriangle className={`${baseClass} text-yellow-500`} />;
    }
  };

  const getTypeIcon = (type: 'wip' | 'leadTime' | 'efficiency') => {
    switch (type) {
      case 'leadTime':
        return <Clock className="h-4 w-4" />;
      case 'wip':
        return <Users className="h-4 w-4" />;
      case 'efficiency':
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToDashboard')}
          </Button>

          <h1 className="text-4xl font-bold mb-2">{t('bottleneckAnalysis')}</h1>
          <p className="text-muted-foreground">{t('bottleneckAnalysisSubtitle')}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('highSeverity')}
              </h3>
            </div>
            <p className="text-3xl font-bold">
              {bottlenecks.filter(b => b.severity === 'high').length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t('needsImmediateAttention')}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('mediumSeverity')}
              </h3>
            </div>
            <p className="text-3xl font-bold">
              {bottlenecks.filter(b => b.severity === 'medium').length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t('planForImprovement')}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('averageImpact')}
              </h3>
            </div>
            <p className="text-3xl font-bold">
              {Math.round(bottlenecks.reduce((acc, b) => acc + b.impact, 0) / bottlenecks.length)}%
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t('onOverallProcess')}
            </p>
          </Card>
        </div>

        {/* Stage Comparison Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MetricsChart
            title={t('leadTimeByStage')}
            data={stageComparisonData}
            type="bar"
            dataKeys={[
              { key: 'leadTime', name: t('leadTime'), color: '#3b82f6' },
            ]}
            xAxisKey="stage"
          />

          <MetricsChart
            title={t('wipByStage')}
            data={stageComparisonData}
            type="bar"
            dataKeys={[
              { key: 'wip', name: t('wipCount'), color: '#f59e0b' },
            ]}
            xAxisKey="stage"
          />
        </div>

        {/* Bottleneck Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{t('identifiedBottlenecks')}</h2>

          {bottlenecks.map((bottleneck) => (
            <Card key={bottleneck.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(bottleneck.severity)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">
                          {bottleneck.stageName} {t('stage')}
                        </h3>
                        <Badge variant={getSeverityColor(bottleneck.severity)}>
                          {t(bottleneck.severity)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getTypeIcon(bottleneck.type)}
                          {t(bottleneck.type)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {bottleneck.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{t('impact')}</p>
                    <p className="text-2xl font-bold text-red-500">
                      {bottleneck.impact}%
                    </p>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-semibold">{t('suggestions')}</h4>
                  </div>
                  <ul className="space-y-2">
                    {bottleneck.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t">
                  <Button variant="outline" size="sm">
                    {t('createActionPlan')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Overall Recommendations */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">{t('overallRecommendations')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('optimizeLeadTime')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('optimizeLeadTimeDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Users className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('balanceWIP')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('balanceWIPDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('increaseEfficiency')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('increaseEfficiencyDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Lightbulb className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('automateProcesses')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('automateProcessesDesc')}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Bottlenecks;
