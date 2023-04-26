// External dependencies
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Internal dependencies
import { Language } from '_packages/shared/enums';
import en from './resources/en.resource';
import sv from './resources/sv.resource';

i18n.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources: { en, sv },
		fallbackLng: Language.EN,
		detection: {
			order: ['localStorage'],
			caches: ['localStorage'],
			lookupLocalStorage: 'language'
		}
	});

export default i18n;
