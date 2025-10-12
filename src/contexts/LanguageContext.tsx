import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations = {
  en: {
    appTitle: 'Value Stream Mapping',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    french: 'Français',
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    stages: 'Stages',
    leadTime: 'Lead Time',
    wipCount: 'WIP Count',
    cycleTime: 'Cycle Time',
    processEfficiency: 'Process Efficiency',
    days: 'days',
    items: 'items',
    hours: 'hours',
    viewDetails: 'View Details',
    optimizeProcess: 'Optimize Process',
    analyzeBottlenecks: 'Analyze Bottlenecks',
    stageDescription: 'Lean process stage with continuous improvement focus',
    improve: 'Improve',
    design: 'Design',
    develop: 'Develop',
    test: 'Test',
    deploy: 'Deploy',
    monitor: 'Monitor',
  },
  ar: {
    appTitle: 'خريطة تدفق القيمة',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    french: 'Français',
    dashboard: 'لوحة التحكم',
    analytics: 'التحليلات',
    stages: 'المراحل',
    leadTime: 'وقت التسليم',
    wipCount: 'عدد العمل الجاري',
    cycleTime: 'وقت الدورة',
    processEfficiency: 'كفاءة العملية',
    days: 'أيام',
    items: 'عناصر',
    hours: 'ساعات',
    viewDetails: 'عرض التفاصيل',
    optimizeProcess: 'تحسين العملية',
    analyzeBottlenecks: 'تحليل الاختناقات',
    stageDescription: 'مرحلة عملية رشيقة مع التركيز على التحسين المستمر',
    improve: 'تحسين',
    design: 'تصميم',
    develop: 'تطوير',
    test: 'اختبار',
    deploy: 'نشر',
    monitor: 'مراقبة',
  },
  fr: {
    appTitle: 'Cartographie de Flux de Valeur',
    lightMode: 'Mode Clair',
    darkMode: 'Mode Sombre',
    language: 'Langue',
    english: 'English',
    arabic: 'العربية',
    french: 'Français',
    dashboard: 'Tableau de Bord',
    analytics: 'Analytique',
    stages: 'Étapes',
    leadTime: 'Délai de Livraison',
    wipCount: 'Nombre TEC',
    cycleTime: 'Temps de Cycle',
    processEfficiency: 'Efficacité du Processus',
    days: 'jours',
    items: 'articles',
    hours: 'heures',
    viewDetails: 'Voir les Détails',
    optimizeProcess: 'Optimiser le Processus',
    analyzeBottlenecks: 'Analyser les Goulots',
    stageDescription: 'Étape de processus lean avec focus sur amélioration continue',
    improve: 'Améliorer',
    design: 'Concevoir',
    develop: 'Développer',
    test: 'Tester',
    deploy: 'Déployer',
    monitor: 'Surveiller',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
