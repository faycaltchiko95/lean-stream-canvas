import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Settings as SettingsIcon,
  Bell,
  Target,
  Globe,
  Palette,
  Save,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import type { UserSettings } from '@/types';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [settings, setSettings] = useState<UserSettings>({
    language: language,
    theme: (theme as 'light' | 'dark') || 'light',
    notifications: {
      enabled: true,
      threshold: {
        leadTime: 200,
        wip: 30,
        efficiency: 80,
      },
    },
    targets: {
      leadTime: 180,
      cycleTime: 30,
      efficiency: 90,
      wip: 20,
    },
  });

  const handleSave = () => {
    // Update language and theme
    setLanguage(settings.language);
    setTheme(settings.theme);

    // Show success message
    toast({
      title: t('settingsSaved'),
      description: t('settingsSavedDesc'),
    });

    // In a real app, this would save to localStorage or backend
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <SettingsIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{t('settings')}</h1>
              <p className="text-muted-foreground">{t('settingsSubtitle')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{t('appearance')}</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">{t('theme')}</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value: 'light' | 'dark') =>
                    setSettings({ ...settings, theme: value })
                  }
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t('lightMode')}</SelectItem>
                    <SelectItem value="dark">{t('darkMode')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Language Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{t('language')}</h2>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">{t('selectLanguage')}</Label>
              <Select
                value={settings.language}
                onValueChange={(value: 'en' | 'ar' | 'fr') =>
                  setSettings({ ...settings, language: value })
                }
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="ar">{t('arabic')}</SelectItem>
                  <SelectItem value="fr">{t('french')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{t('notifications')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('enableNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('enableNotificationsDesc')}
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.enabled}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, enabled: checked },
                    })
                  }
                />
              </div>

              {settings.notifications.enabled && (
                <>
                  <Separator />

                  <div className="space-y-4 pt-2">
                    <p className="text-sm font-medium">{t('alertThresholds')}</p>

                    <div className="space-y-2">
                      <Label htmlFor="leadTimeThreshold">
                        {t('leadTime')} ({t('hours')})
                      </Label>
                      <Input
                        id="leadTimeThreshold"
                        type="number"
                        value={settings.notifications.threshold.leadTime}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              threshold: {
                                ...settings.notifications.threshold,
                                leadTime: parseInt(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {t('leadTimeThresholdDesc')}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wipThreshold">{t('wip')}</Label>
                      <Input
                        id="wipThreshold"
                        type="number"
                        value={settings.notifications.threshold.wip}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              threshold: {
                                ...settings.notifications.threshold,
                                wip: parseInt(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {t('wipThresholdDesc')}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="efficiencyThreshold">
                        {t('efficiency')} (%)
                      </Label>
                      <Input
                        id="efficiencyThreshold"
                        type="number"
                        value={settings.notifications.threshold.efficiency}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              threshold: {
                                ...settings.notifications.threshold,
                                efficiency: parseInt(e.target.value) || 0,
                              },
                            },
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {t('efficiencyThresholdDesc')}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Target Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{t('targets')}</h2>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{t('targetsDesc')}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadTimeTarget">
                    {t('leadTime')} ({t('hours')})
                  </Label>
                  <Input
                    id="leadTimeTarget"
                    type="number"
                    value={settings.targets.leadTime}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        targets: {
                          ...settings.targets,
                          leadTime: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cycleTimeTarget">
                    {t('cycleTime')} ({t('hours')})
                  </Label>
                  <Input
                    id="cycleTimeTarget"
                    type="number"
                    value={settings.targets.cycleTime}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        targets: {
                          ...settings.targets,
                          cycleTime: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="efficiencyTarget">
                    {t('efficiency')} (%)
                  </Label>
                  <Input
                    id="efficiencyTarget"
                    type="number"
                    value={settings.targets.efficiency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        targets: {
                          ...settings.targets,
                          efficiency: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wipTarget">{t('wip')}</Label>
                  <Input
                    id="wipTarget"
                    type="number"
                    value={settings.targets.wip}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        targets: {
                          ...settings.targets,
                          wip: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              <Save className="h-4 w-4 mr-2" />
              {t('saveSettings')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
