import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, FileText, Table, FileJson } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ExportFormat } from '@/types';

export const ExportDialog: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [exportConfig, setExportConfig] = useState<ExportFormat>({
    format: 'pdf',
    includeCharts: true,
    includeMetrics: true,
    includeStages: true,
  });

  const handleExport = () => {
    // Mock export functionality
    const formatName = exportConfig.format.toUpperCase();

    // Simulate export
    toast({
      title: t('exportStarted'),
      description: `${t('exporting')} ${formatName} ${t('file')}...`,
    });

    // Simulate delay
    setTimeout(() => {
      toast({
        title: t('exportSuccess'),
        description: `${t('yourFile')} ${formatName} ${t('hasBeenExported')}`,
      });
      setOpen(false);
    }, 1500);

    // In a real implementation, this would generate and download the file
    // For PDF: could use jsPDF or react-pdf
    // For CSV: generate CSV string and trigger download
    // For JSON: stringify data and trigger download
  };

  const getFormatIcon = (format: 'pdf' | 'csv' | 'json') => {
    switch (format) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'csv':
        return <Table className="h-4 w-4" />;
      case 'json':
        return <FileJson className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          {t('export')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('exportData')}</DialogTitle>
          <DialogDescription>{t('exportDataDesc')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label>{t('selectFormat')}</Label>
            <RadioGroup
              value={exportConfig.format}
              onValueChange={(value) =>
                setExportConfig({ ...exportConfig, format: value as 'pdf' | 'csv' | 'json' })
              }
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer flex-1">
                  {getFormatIcon('pdf')}
                  <div>
                    <p className="font-medium">PDF</p>
                    <p className="text-xs text-muted-foreground">{t('pdfDesc')}</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-2 cursor-pointer flex-1">
                  {getFormatIcon('csv')}
                  <div>
                    <p className="font-medium">CSV</p>
                    <p className="text-xs text-muted-foreground">{t('csvDesc')}</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer flex-1">
                  {getFormatIcon('json')}
                  <div>
                    <p className="font-medium">JSON</p>
                    <p className="text-xs text-muted-foreground">{t('jsonDesc')}</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Content Selection */}
          <div className="space-y-3">
            <Label>{t('includeInExport')}</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="metrics"
                  checked={exportConfig.includeMetrics}
                  onCheckedChange={(checked) =>
                    setExportConfig({ ...exportConfig, includeMetrics: checked as boolean })
                  }
                />
                <Label htmlFor="metrics" className="cursor-pointer">
                  {t('metricsData')}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stages"
                  checked={exportConfig.includeStages}
                  onCheckedChange={(checked) =>
                    setExportConfig({ ...exportConfig, includeStages: checked as boolean })
                  }
                />
                <Label htmlFor="stages" className="cursor-pointer">
                  {t('processStages')}
                </Label>
              </div>

              {exportConfig.format === 'pdf' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charts"
                    checked={exportConfig.includeCharts}
                    onCheckedChange={(checked) =>
                      setExportConfig({ ...exportConfig, includeCharts: checked as boolean })
                    }
                  />
                  <Label htmlFor="charts" className="cursor-pointer">
                    {t('charts')}
                  </Label>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            {t('export')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
