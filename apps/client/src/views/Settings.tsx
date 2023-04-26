// External dependencies
import { t } from 'i18next';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

// Internal dependencies
import Container from '../components/Container';
import Select from '../components/Select';
import { Resource } from '$src/types/resource.type';
import i18n from '$src/i18n';
import RadioButton from '../components/RadioButton';
import { useTheme } from '$src/providers/theme.provider';
import { Theme } from '$src/types/theme.type';
import Button from '../components/Button';
import dayjs from '$src/utils/dayjs.util';
import { Language } from '_packages/shared/enums';

interface SettingsProps {
	className?: string;
	onClose?: () => void;
}

function Settings({ className, onClose }: SettingsProps) {
	const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();
	const [theme, setTheme] = useTheme();
	const [language, setLanguage] = useState(i18n.language);

	function updateLanguage(language: string) {
		setLanguage(language);
		i18n.changeLanguage(language);
		dayjs.locale(language);
	}

	useEffect(() => {
		updateLanguage(language);
	}, [language]);

	return (
		<Container className={clsx(className, 'flex flex-col gap-2')} title={t('settings-title')} onClose={onClose}>
			<label className="label_base">
				{t('language-select-label')}
				<Select
					inputIcon={faGlobe}
					options={Object.keys(i18n.options.resources as Resource).map((l) => {
						return { label: t('native-name', { lng: l }), value: l };
					})}
					selectedValue={{ label: t('native-name', { lng: language }), value: language }}
					onSelect={(s) => {
						if (!s) return;
						updateLanguage(s.value);
					}}
					clearable={false}
				/>
			</label>
			<label className="label_base">
				{t('theme-select-label')}
				<RadioButton
					name="theme"
					value={Theme.LIGHT}
					checked={theme === Theme.LIGHT}
					onClick={() => setTheme(Theme.LIGHT)}
				>
					{t('theme-light')}
				</RadioButton>
				<RadioButton
					name="theme"
					value={Theme.DARK}
					checked={theme === Theme.DARK}
					onClick={() => setTheme(Theme.DARK)}
				>
					{t('theme-dark')}
				</RadioButton>
			</label>
			<div className="mt-auto flex flex-col gap-2">
				{isAuthenticated && user && (
					<p className="text-gray-500 text-sm">
						{t('authenticated-as')}: {user.name}
					</p>
				)}
				<Button onClick={() => (isAuthenticated ? logout({ openUrl: false }) : loginWithRedirect())}>
					{isAuthenticated ? t('logout-label') : t('login-label')}
				</Button>
			</div>
		</Container>
	);
}

export default Settings;
