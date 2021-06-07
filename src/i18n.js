import i18n from 'i18next';
import httpBackend from 'i18next-http-backend';
import lanugageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(lanugageDetector)
    .use(httpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: false,
        load: 'currentOnly',
        whitelist: ['ru', 'en', 'uz'],
        react: { useSuspense: false },
        // debug: true 
        debug: false
    });

export default i18n;