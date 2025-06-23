// context/ThemeProvider.tsx

import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
  } from 'react';
  import { COLORS } from '@/constants/Colors';
  
  type Theme = typeof COLORS.light;
  
  interface ThemeContextType {
    isDarkMode: boolean;
    theme: Theme;
    toggleTheme: () => void;
  }
  
  const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    theme: COLORS.light,
    toggleTheme: () => {},
  });
  
  export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [theme, setTheme] = useState<Theme>(COLORS.light);
  
    const toggleTheme = () => {
      setIsDarkMode((prev) => !prev);
    };
  
    useEffect(() => {
      setTheme(isDarkMode ? COLORS.dark : COLORS.light);
    }, [isDarkMode]);
  
    return (
      <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  // Hook for easy use
  export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
  