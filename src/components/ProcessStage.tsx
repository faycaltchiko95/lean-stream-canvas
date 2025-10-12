import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package } from 'lucide-react';

interface ProcessStageProps {
  title: string;
  leadTime: number;
  wipCount: number;
  description: string;
  index: number;
}

export const ProcessStage = ({ title, leadTime, wipCount, description, index }: ProcessStageProps) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Timeline connector */}
      {index > 0 && (
        <div 
          className="absolute top-8 -left-8 w-8 h-0.5 bg-[hsl(var(--timeline-line))]"
          aria-hidden="true"
        />
      )}
      
      {/* Timeline dot */}
      <div 
        className="w-4 h-4 rounded-full bg-[hsl(var(--timeline-dot))] mb-4 ring-4 ring-background animate-pulse-subtle"
        aria-hidden="true"
      />
      
      {/* Stage card */}
      <Card className="w-64 p-6 bg-[hsl(var(--stage-bg))] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <Badge variant="secondary" className="text-xs">
              Stage {index + 1}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Lead Time</p>
                <p className="text-sm font-semibold text-foreground">{leadTime}h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">WIP</p>
                <p className="text-sm font-semibold text-foreground">{wipCount}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
