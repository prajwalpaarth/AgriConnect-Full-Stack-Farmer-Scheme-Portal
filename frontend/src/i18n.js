import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Ban } from 'lucide-react';
import { initReactI18next } from 'react-i18next';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: 'en',
        returnObjects: true,
        resources: {
            en: {
                translation: {
                    main: "Access to Government Schemes for Everyone!"
                }
            },
            hn: {
                translation: {
                    main: "हर किसी के लिए सरकारी योजनाओं तक पहुंच!"
                }
            },
            bn: {
                translation: {
                    main: "সকলের জন্য সরকারি প্রকল্পে প্রবেশাধিকার"
                }
            }
        }
    })
