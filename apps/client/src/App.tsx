import { useTheme } from './providers/theme.provider';
import { Theme } from './types/theme.type';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { Language } from './types/language.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button';

function App() {
	const [theme, setTheme] = useTheme();
	const { t } = useTranslation();

	return (
		<div className="App bg-white dark:bg-black">
			<button
				className="bg-blue-500 dark:bg-red-500 text-white font-bold py-2 px-4 rounded"
				onClick={() => {
					setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
				}}
			>
				Toggle theme
			</button>
			<Button variant="text">{t('Welcome to React')}</Button>
			<Button variant="text" disabled>
				Click me
			</Button>
			<Button variant="contained">Click me</Button>
			<Button variant="contained" disabled>
				Click me
			</Button>
			<Button variant="outlined">Click me</Button>
			<Button variant="outlined" disabled>
				Click me
			</Button>

			<p>{t('Welcome to React')}</p>
			<button
				onClick={() => {
					i18n.changeLanguage(i18n.language === Language.EN ? Language.SV : Language.EN);
				}}
			>
				change lang
			</button>
			<FontAwesomeIcon icon={faEnvelope} />
		</div>
	);
}

export default App;
