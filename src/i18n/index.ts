import { amharicTranslations } from './locales/am';
import { englishTranslations } from './locales/en';
import { oromoTranslations } from './locales/or';

export type LanguageCode = 'en' | 'am' | 'or';

export type TranslationRecord = {
  [key: string]: string | TranslationRecord;
};

export const translations: Record<LanguageCode, TranslationRecord> = {
  en: englishTranslations,
  am: amharicTranslations,
  or: oromoTranslations,
};