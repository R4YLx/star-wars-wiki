import { createContext, useState } from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState('dark')

	const isLightTheme = () => theme === 'light'

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const values = {
		theme,
		setTheme,
		isLightTheme,
		toggleTheme,
	}

	return (
		<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
	)
}

export default ThemeContextProvider
