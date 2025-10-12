import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const MetricCard = ({ icon: Icon, label, value, unit, trend = 'neutral' }: MetricCardProps) => {
  const trendColor = 
    trend === 'up' ? 'text-metric-positive' : 
    trend === 'down' ? 'text-metric-warning' : 
    'text-muted-foreground';

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${trendColor}`}>{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
};
