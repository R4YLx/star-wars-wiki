import classNames from 'classnames'
import { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext()

export const useThemeContext = () => {
	return useContext(ThemeContext)
}

const ThemeContextProvider = () => {
	const [theme, setTheme] = useState('dark')

	const isLightTheme = () => theme === ' light'

	const getStyle = () => {
		return classNames({
			'bg-light': isLightTheme(),
			'navbar-light': isLightTheme(),
			'text-primary': isLightTheme(),
		})
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const values = { theme, toggleTheme, isLightTheme, getStyle }

	return <ThemeContext.Provider value={values}></ThemeContext.Provider>
}

export default ThemeContextProvider
