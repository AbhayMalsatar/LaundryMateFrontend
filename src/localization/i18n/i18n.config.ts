import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import { en } from '../translation';
import { gu } from '../translation';

const resources = {
  en: { translation: en },
  gu: { translation: gu },
};

export const initI18n = async () => {
  const storedLang = await AsyncStorage.getItem('APP_LANGUAGE');

  const deviceLang =
    Localization.getLocales()?.[0]?.languageCode ?? 'en';

  // const fallbackLang = storedLang || deviceLang || 'en';
  const fallbackLang = 'gu';

  await i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: fallbackLang,
      fallbackLng: 'gu',
      interpolation: {
        escapeValue: false,
      },
    });
};

if (!i18next.isInitialized) {
  initI18n();
}

export const getTranslation = (key: string) => {
  const translation = i18next.t(key);
  return translation !== key ? translation : null;
};

export const changeAppLanguage = async (langKey: string) => {
  await i18next.changeLanguage(langKey);
  await AsyncStorage.setItem('APP_LANGUAGE', langKey);

  const isRTL = langKey === 'ar';
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  // Expo limitation → user must restart app manually
};

export default i18next;
