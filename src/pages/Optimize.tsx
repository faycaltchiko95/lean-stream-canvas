import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MetricsChart } from '@/components/MetricsChart';
import {
  ArrowLeft,
  Zap,
  Target,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { OptimizationRecommendation } from '@/types';

const Optimize: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [simulationValues, setSimulationValues] = useState({
    teamSize: 5,
    automation: 30,
    parallelization: 40,
  });

  // Mock optimization recommendations
  const recommendations: OptimizationRecommendation[] = [
    {
      id: '1',
      title: t('optimizationRec1Title'),
      description: t('optimizationRec1Desc'),
      category: 'automation',
      impact: 'high',
      effort: 'medium',
      estimatedImprovement: {
        leadTime: -15,
        cycleTime: -8,
        efficiency: 12,
      },
    },
    {
      id: '2',
      title: t('optimizationRec2Title'),
      description: t('optimizationRec2Desc'),
      category: 'workflow',
      impact: 'high',
      effort: 'low',
      estimatedImprovement: {
        leadTime: -10,
        wip: -5,
      },
    },
    {
      id: '3',
      title: t('optimizationRec3Title'),
      description: t('optimizationRec3Desc'),
      category: 'resource',
      impact: 'medium',
      effort: 'high',
      estimatedImprovement: {
        cycleTime: -12,
        efficiency: 8,
      },
    },
    {
      id: '4',
      title: t('optimizationRec4Title'),
      description: t('optimizationRec4Desc'),
      category: 'process',
      impact: 'medium',
      effort: 'medium',
      estimatedImprovement: {
        leadTime: -8,
        efficiency: 5,
      },
    },
  ];

  // Calculate simulated improvements
  const calculateSimulatedMetrics = () => {
    const baseLeadTime = 208;
    const baseCycleTime = 34;
    const baseEfficiency = 87;

    const teamImpact = (simulationValues.teamSize - 5) * 3;
    const automationImpact = (simulationValues.automation - 30) * 0.5;
    const parallelImpact = (simulationValues.parallelization - 40) * 0.3;

    const totalImpact = teamImpact + automationImpact + parallelImpact;

    return {
      leadTime: Math.max(150, Math.round(baseLeadTime - totalImpact * 0.8)),
      cycleTime: Math.max(20, Math.round(baseCycleTime - totalImpact * 0.15)),
      efficiency: Math.min(100, Math.round(baseEfficiency + totalImpact * 0.1)),
    };
  };

  const simulatedMetrics = calculateSimulatedMetrics();

  // Comparison data
  const comparisonData = [
    {
      metric: t('leadTime'),
      current: 208,
      optimized: simulatedMetrics.leadTime,
      unit: 'h',
    },
    {
      metric: t('cycleTime'),
      current: 34,
      optimized: simulatedMetrics.cycleTime,
      unit: 'h',
    },
    {
      metric: t('efficiency'),
      current: 87,
      optimized: simulatedMetrics.efficiency,
      unit: '%',
    },
  ];

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'text-green-500';
      case 'medium':
        return 'text-blue-500';
      case 'low':
        return 'text-gray-500';
    }
  };

  const getEffortColor = (effort: 'high' | 'medium' | 'low') => {
    switch (effort) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation':
        return <Zap className="h-4 w-4" />;
      case 'workflow':
        return <BarChart3 className="h-4 w-4" />;
      case 'resource':
        return <Users className="h-4 w-4" />;
      case 'process':
        return <Target className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
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

          <h1 className="text-4xl font-bold mb-2">{t('processOptimization')}</h1>
          <p className="text-muted-foreground">{t('processOptimizationSubtitle')}</p>
        </div>

        {/* Simulation Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-bold">{t('optimizationSimulator')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">{t('teamSize')}</label>
                  <span className="text-sm font-semibold">{simulationValues.teamSize}</span>
                </div>
                <Slider
                  value={[simulationValues.teamSize]}
                  onValueChange={(value) =>
                    setSimulationValues({ ...simulationValues, teamSize: value[0] })
                  }
                  min={3}
                  max={10}
                  step={1}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('adjustTeamSize')}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">{t('automationLevel')}</label>
                  <span className="text-sm font-semibold">{simulationValues.automation}%</span>
                </div>
                <Slider
                  value={[simulationValues.automation]}
                  onValueChange={(value) =>
                    setSimulationValues({ ...simulationValues, automation: value[0] })
                  }
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('automationLevelDesc')}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">{t('parallelization')}</label>
                  <span className="text-sm font-semibold">{simulationValues.parallelization}%</span>
                </div>
                <Slider
                  value={[simulationValues.parallelization]}
                  onValueChange={(value) =>
                    setSimulationValues({ ...simulationValues, parallelization: value[0] })
                  }
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('parallelizationDesc')}
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">{t('projectedResults')}</h3>

              {comparisonData.map((item) => (
                <div key={item.metric} className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {item.current}{item.unit}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold text-green-500">
                        {item.optimized}{item.unit}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full transition-all duration-300"
                        style={{
                          width: `${(item.optimized / item.current) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-green-500">
                      {Math.abs(Math.round(((item.optimized - item.current) / item.current) * 100))}%
                    </span>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg mt-4">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-400">
                      {t('potentialImprovement')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('potentialImprovementDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{t('optimizationRecommendations')}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-secondary rounded-lg">
                          {getCategoryIcon(rec.category)}
                        </div>
                        <Badge variant="outline">{t(rec.category)}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getImpactColor(rec.impact)}>
                          {t('impact')}: {t(rec.impact)}
                        </Badge>
                        <Badge variant={getEffortColor(rec.effort)}>
                          {t('effort')}: {t(rec.effort)}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-1">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>

                  {/* Estimated Improvements */}
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-3">{t('estimatedImprovement')}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {rec.estimatedImprovement.leadTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {t('leadTime')}: {rec.estimatedImprovement.leadTime > 0 ? '+' : ''}
                            {rec.estimatedImprovement.leadTime}%
                          </span>
                        </div>
                      )}
                      {rec.estimatedImprovement.cycleTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {t('cycleTime')}: {rec.estimatedImprovement.cycleTime > 0 ? '+' : ''}
                            {rec.estimatedImprovement.cycleTime}%
                          </span>
                        </div>
                      )}
                      {rec.estimatedImprovement.efficiency && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {t('efficiency')}: +{rec.estimatedImprovement.efficiency}%
                          </span>
                        </div>
                      )}
                      {rec.estimatedImprovement.wip && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {t('wip')}: {rec.estimatedImprovement.wip > 0 ? '+' : ''}
                            {rec.estimatedImprovement.wip}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <Button className="w-full" variant="outline">
                    {t('implementRecommendation')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Wins Section */}
        <Card className="p-6 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">{t('quickWins')}</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            {t('quickWinsDesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded">
                  <Target className="h-4 w-4 text-green-500" />
                </div>
                <span className="font-semibold text-sm">{t('quickWin1')}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('quickWin1Desc')}
              </p>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded">
                  <Zap className="h-4 w-4 text-blue-500" />
                </div>
                <span className="font-semibold text-sm">{t('quickWin2')}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('quickWin2Desc')}
              </p>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded">
                  <Users className="h-4 w-4 text-purple-500" />
                </div>
                <span className="font-semibold text-sm">{t('quickWin3')}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('quickWin3Desc')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Optimize;
