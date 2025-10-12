import { Button } from '@/components/ui/button';
import { TrendingUp, Search, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ActionPanel = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8" aria-label="Actions">
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          size="lg" 
          className="gap-2"
          aria-label={t('viewDetails')}
        >
          <TrendingUp className="h-5 w-5" aria-hidden="true" />
          {t('viewDetails')}
        </Button>
        
        <Button 
          size="lg" 
          variant="secondary" 
          className="gap-2"
          aria-label={t('analyzeBottlenecks')}
        >
          <Search className="h-5 w-5" aria-hidden="true" />
          {t('analyzeBottlenecks')}
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="gap-2"
          aria-label={t('optimizeProcess')}
        >
          <Zap className="h-5 w-5" aria-hidden="true" />
          {t('optimizeProcess')}
        </Button>
      </div>
    </section>
  );
};
