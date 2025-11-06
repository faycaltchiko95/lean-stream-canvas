import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricsChart } from '@/components/MetricsChart';
import { MetricCard } from '@/components/MetricCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  BarChart3,
  Target
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HistoricalData, Metric } from '@/types';

// Mock historical data for charts
const generateHistoricalData = (): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      leadTime: 200 + Math.random() * 30 - 15,
      cycleTime: 30 + Math.random() * 10 - 5,
      wip: Math.floor(20 + Math.random() * 10),
      efficiency: 80 + Math.random() * 15,
    });
  }

  return data;
};

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const historicalData = generateHistoricalData();

  const metrics: Metric[] = [
    {
      id: '1',
      label: t('leadTime'),
      value: 208,
      unit: t('hours'),
      trend: 'down',
      target: 180,
      description: t('leadTimeDescription'),
    },
    {
      id: '2',
      label: t('wipCount'),
      value: 25,
      unit: t('items'),
      trend: 'neutral',
      target: 20,
      description: t('wipDescription'),
    },
    {
      id: '3',
      label: t('cycleTime'),
      value: 34,
      unit: t('hours'),
      trend: 'up',
      target: 30,
      description: t('cycleTimeDescription'),
    },
    {
      id: '4',
      label: t('processEfficiency'),
      value: 87,
      unit: '%',
      trend: 'up',
      target: 90,
      description: t('efficiencyDescription'),
    },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
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

          <h1 className="text-4xl font-bold mb-2">{t('metricsDetails')}</h1>
          <p className="text-muted-foreground">{t('metricsDetailsSubtitle')}</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.id} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </h3>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {metric.value}
                  <span className="text-lg text-muted-foreground ml-1">
                    {metric.unit}
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {t('target')}: {metric.target} {metric.unit}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="leadtime">{t('leadTime')}</TabsTrigger>
            <TabsTrigger value="wip">{t('wipCount')}</TabsTrigger>
            <TabsTrigger value="efficiency">{t('efficiency')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <MetricsChart
              title={t('allMetricsTrend')}
              data={historicalData}
              type="line"
              dataKeys={[
                { key: 'leadTime', name: t('leadTime'), color: '#10b981' },
                { key: 'cycleTime', name: t('cycleTime'), color: '#3b82f6' },
                { key: 'wip', name: t('wipCount'), color: '#f59e0b' },
              ]}
              xAxisKey="date"
              height={400}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart
                title={t('efficiencyTrend')}
                data={historicalData}
                type="area"
                dataKeys={[
                  { key: 'efficiency', name: t('efficiency'), color: '#8b5cf6' },
                ]}
                xAxisKey="date"
              />

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t('keyInsights')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">{t('improvingEfficiency')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('efficiencyImprovedBy')} 5% {t('lastMonth')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">{t('stableLeadTime')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('leadTimeStable')} ±5%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Users className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium">{t('wipNeedsAttention')}</p>
                      <p className="text-sm text-muted-foreground">
                        {t('wipAboveTarget')} 25%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Lead Time Tab */}
          <TabsContent value="leadtime" className="space-y-6">
            <MetricsChart
              title={t('leadTimeTrend')}
              data={historicalData}
              type="line"
              dataKeys={[
                { key: 'leadTime', name: t('leadTime'), color: '#10b981' },
              ]}
              xAxisKey="date"
              height={400}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {t('average')}
                </h4>
                <p className="text-3xl font-bold">208h</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('last30Days')}
                </p>
              </Card>

              <Card className="p-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {t('minimum')}
                </h4>
                <p className="text-3xl font-bold text-green-500">192h</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('bestPerformance')}
                </p>
              </Card>

              <Card className="p-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {t('maximum')}
                </h4>
                <p className="text-3xl font-bold text-red-500">225h</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('needsImprovement')}
                </p>
              </Card>
            </div>
          </TabsContent>

          {/* WIP Tab */}
          <TabsContent value="wip" className="space-y-6">
            <MetricsChart
              title={t('wipTrend')}
              data={historicalData}
              type="bar"
              dataKeys={[
                { key: 'wip', name: t('wipCount'), color: '#f59e0b' },
              ]}
              xAxisKey="date"
              height={400}
            />

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('wipAnalysis')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('wipAnalysisDescription')}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>{t('currentWIP')}</span>
                  <span className="font-semibold">25 {t('items')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('targetWIP')}</span>
                  <span className="font-semibold">20 {t('items')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('difference')}</span>
                  <span className="font-semibold text-orange-500">+5 {t('items')}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Efficiency Tab */}
          <TabsContent value="efficiency" className="space-y-6">
            <MetricsChart
              title={t('efficiencyTrend')}
              data={historicalData}
              type="area"
              dataKeys={[
                { key: 'efficiency', name: t('efficiency'), color: '#8b5cf6' },
              ]}
              xAxisKey="date"
              height={400}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t('efficiencyBreakdown')}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{t('valueAddingTime')}</span>
                      <span className="text-sm font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: '87%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{t('waitingTime')}</span>
                      <span className="text-sm font-semibold">8%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: '8%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{t('wasteTime')}</span>
                      <span className="text-sm font-semibold">5%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: '5%' }} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t('recommendations')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">{t('recommendation1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">{t('recommendation2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">{t('recommendation3')}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Details;
