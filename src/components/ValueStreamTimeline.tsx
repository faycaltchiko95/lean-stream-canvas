import { ProcessStage } from './ProcessStage';
import { useLanguage } from '@/contexts/LanguageContext';

const stages = [
  { key: 'improve', leadTime: 24, wipCount: 3 },
  { key: 'design', leadTime: 48, wipCount: 5 },
  { key: 'develop', leadTime: 72, wipCount: 8 },
  { key: 'test', leadTime: 36, wipCount: 4 },
  { key: 'deploy', leadTime: 12, wipCount: 2 },
  { key: 'monitor', leadTime: 16, wipCount: 3 },
];

export const ValueStreamTimeline = () => {
  const { t } = useLanguage();

  return (
    <section 
      className="py-12 overflow-x-auto" 
      aria-labelledby="timeline-heading"
    >
      <h2 id="timeline-heading" className="sr-only">Value Stream Process Timeline</h2>
      
      <div className="flex items-start gap-8 px-8 min-w-max">
        {stages.map((stage, index) => (
          <ProcessStage
            key={stage.key}
            title={t(stage.key)}
            leadTime={stage.leadTime}
            wipCount={stage.wipCount}
            description={t('stageDescription')}
            index={index}
          />
        ))}
      </div>
      
      {/* Progress flow indicator */}
      <div className="relative mt-8 mx-8 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-progress-flow"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
