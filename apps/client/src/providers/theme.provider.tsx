// External dependencies
import { createContext, useContext, useState, useEffect } from 'react';

// Internal dependencies
import { Theme } from '$src/types/Theme.type';

const ThemeContext = createContext({} as [Theme | undefined, React.Dispatch<React.SetStateAction<Theme | undefined>>]);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme | undefined>(undefined);

	// Initial theme load from local storage
	useEffect(() => {
		const localTheme = localStorage.getItem('theme');

		// If the stored theme is valid, set it as the current theme
		if (Object.values(Theme).includes(localTheme as Theme)) {
			setTheme(localTheme as Theme);
		} else {
			// Otherwise, set the theme to light
			setTheme(Theme.LIGHT);
		}
	}, []);

	// Update local storage and the body class when theme changes
	useEffect(() => {
		if (!theme) return;

		localStorage.setItem('theme', theme);

		document.body.classList.remove(Theme.LIGHT, Theme.DARK);
		document.body.classList.add(theme);
	}, [theme]);

	return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
};
