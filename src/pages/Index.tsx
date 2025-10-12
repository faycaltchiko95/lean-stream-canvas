import { Header } from '@/components/Header';
import { MetricCard } from '@/components/MetricCard';
import { ValueStreamTimeline } from '@/components/ValueStreamTimeline';
import { ActionPanel } from '@/components/ActionPanel';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Package, TrendingUp, Activity } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 animate-fade-in" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('appTitle')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('stageDescription')}
          </p>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" aria-label="Key Metrics">
          <MetricCard
            icon={Clock}
            label={t('leadTime')}
            value={208}
            unit={t('hours')}
            trend="down"
          />
          <MetricCard
            icon={Package}
            label={t('wipCount')}
            value={25}
            unit={t('items')}
            trend="neutral"
          />
          <MetricCard
            icon={TrendingUp}
            label={t('cycleTime')}
            value={34}
            unit={t('hours')}
            trend="up"
          />
          <MetricCard
            icon={Activity}
            label={t('processEfficiency')}
            value={87}
            unit="%"
            trend="up"
          />
        </section>

        {/* Value Stream Timeline */}
        <ValueStreamTimeline />

        {/* Action Panel */}
        <ActionPanel />
      </main>
    </div>
  );
};

export default Index;
