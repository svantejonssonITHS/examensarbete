// External dependencies
import { t } from 'i18next';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

// Internal dependencies
import Container from './Container';
import Select from './Select';
import { useState } from 'react';
import { Resource } from '$src/types/resource.type';
import i18n from '$src/i18n';
import RadioButton from './RadioButton';
import { useTheme } from '$src/providers/theme.provider';
import { Theme } from '$src/types/theme.type';

const labelStyles = {
	base: 'flex flex-col gap-1'
};

interface SettingsProps {
	className?: string;
	onClose?: () => void;
}

function Settings({ className, onClose }: SettingsProps) {
	const [theme, setTheme] = useTheme();
	const [language, setLanguage] = useState(i18n.language);

	return (
		<Container className={clsx(className, 'flex flex-col gap-2')} title={t('settings-title')} onClose={onClose}>
			<label className={clsx(labelStyles.base)}>
				{t('language-select-label')}
				<Select
					inputIcon={faGlobe}
					options={Object.keys(i18n.options.resources as Resource).map((l) => {
						return { label: t('native-name', { lng: l }), value: l };
					})}
					selectedValue={{ label: t('native-name', { lng: language }), value: language }}
					onSelect={(s) => {
						if (!s) return;

						i18n.changeLanguage(s.value);
						setLanguage(s.value);
					}}
					clearable={false}
				/>
			</label>
			<label className={clsx(labelStyles.base)}>
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
		</Container>
	);
}

export default Settings;
