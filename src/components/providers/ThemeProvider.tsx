// ThemeProvider.tsx

"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Create a context with default values
const ThemeProviderContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => { },
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeProviderContext);

// Interface for the ThemeProvider props
interface ThemeProviderProps {
  children: React.ReactNode;
}

// ThemeProvider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = (): void => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Effect to add/remove 'dark' class based on theme state
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  return (
    <ThemeProviderContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
