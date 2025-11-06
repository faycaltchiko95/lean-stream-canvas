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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import type { ProcessStage } from '@/types';

interface ProcessEditorProps {
  stages: ProcessStage[];
  onSave: (stages: ProcessStage[]) => void;
}

export const ProcessEditor: React.FC<ProcessEditorProps> = ({ stages: initialStages, onSave }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [stages, setStages] = useState<ProcessStage[]>(initialStages);
  const [editingStage, setEditingStage] = useState<ProcessStage | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    leadTime: 0,
    wip: 0,
  });

  const handleAdd = () => {
    setIsAddingNew(true);
    setEditingStage(null);
    setFormData({ name: '', leadTime: 0, wip: 0 });
  };

  const handleEdit = (stage: ProcessStage) => {
    setEditingStage(stage);
    setIsAddingNew(false);
    setFormData({
      name: stage.name,
      leadTime: stage.leadTime,
      wip: stage.wip,
    });
  };

  const handleDelete = (stageId: string) => {
    setStages(stages.filter(s => s.id !== stageId));
  };

  const handleSaveStage = () => {
    if (isAddingNew) {
      const newStage: ProcessStage = {
        id: `stage-${Date.now()}`,
        name: formData.name,
        leadTime: formData.leadTime,
        wip: formData.wip,
        position: stages.length,
      };
      setStages([...stages, newStage]);
    } else if (editingStage) {
      setStages(stages.map(s =>
        s.id === editingStage.id
          ? { ...s, name: formData.name, leadTime: formData.leadTime, wip: formData.wip }
          : s
      ));
    }

    setIsAddingNew(false);
    setEditingStage(null);
    setFormData({ name: '', leadTime: 0, wip: 0 });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingStage(null);
    setFormData({ name: '', leadTime: 0, wip: 0 });
  };

  const handleSaveAll = () => {
    onSave(stages);
    setOpen(false);
  };

  const handleClose = () => {
    setStages(initialStages);
    setOpen(false);
    handleCancel();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit2 className="h-4 w-4 mr-2" />
          {t('editProcessStages')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('editProcessStages')}</DialogTitle>
          <DialogDescription>{t('editProcessStagesDesc')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Existing Stages */}
          <div className="space-y-2">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className="flex items-center gap-3 p-4 border rounded-lg bg-card"
              >
                <Badge variant="outline">{index + 1}</Badge>

                {editingStage?.id === stage.id ? (
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <Input
                      placeholder={t('stageName')}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <Input
                      type="number"
                      placeholder={t('leadTime')}
                      value={formData.leadTime}
                      onChange={(e) =>
                        setFormData({ ...formData, leadTime: parseInt(e.target.value) || 0 })
                      }
                    />
                    <Input
                      type="number"
                      placeholder={t('wip')}
                      value={formData.wip}
                      onChange={(e) =>
                        setFormData({ ...formData, wip: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                ) : (
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <div>
                      <p className="font-semibold">{stage.name}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('leadTime')}: {stage.leadTime}h
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('wip')}: {stage.wip}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {editingStage?.id === stage.id ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSaveStage}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(stage)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(stage.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add New Stage Form */}
          {isAddingNew && (
            <div className="p-4 border rounded-lg bg-secondary/50">
              <h4 className="font-semibold mb-3">{t('addNewStage')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <Label htmlFor="name">{t('stageName')}</Label>
                  <Input
                    id="name"
                    placeholder={t('enterStageName')}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="leadTime">{t('leadTime')} ({t('hours')})</Label>
                  <Input
                    id="leadTime"
                    type="number"
                    placeholder="0"
                    value={formData.leadTime}
                    onChange={(e) =>
                      setFormData({ ...formData, leadTime: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="wip">{t('wip')}</Label>
                  <Input
                    id="wip"
                    type="number"
                    placeholder="0"
                    value={formData.wip}
                    onChange={(e) =>
                      setFormData({ ...formData, wip: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveStage}>
                  <Save className="h-4 w-4 mr-2" />
                  {t('save')}
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}

          {/* Add Button */}
          {!isAddingNew && !editingStage && (
            <Button variant="outline" className="w-full" onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              {t('addStage')}
            </Button>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSaveAll}>
            {t('saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
