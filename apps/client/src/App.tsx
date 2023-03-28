import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useTheme } from './providers/theme.provider';
import { Theme } from './types/theme.type';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { Language } from './types/language.type';

function App() {
	const [count, setCount] = useState(0);
	const [theme, setTheme] = useTheme();
	const { t } = useTranslation();

	return (
		<div className="App bg-white dark:bg-black">
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<button
					className="bg-blue-500 dark:bg-red-500 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
					}}
				>
					Toggle theme
				</button>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>{t('Welcome to React')}</p>
				<button
					onClick={() => {
						i18n.changeLanguage(i18n.language === Language.EN ? Language.SV : Language.EN);
					}}
				>
					change lang
				</button>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</div>
	);
}

export default App;
