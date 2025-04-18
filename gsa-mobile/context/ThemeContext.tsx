import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

interface CustomTheme extends Theme {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    placeholder: string;
  };
}

const MyDarkTheme: CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#1e90ff',
    background: '#0f0f0f',
    card: '#1a1a1a',
    text: '#f2f2f2',
    border: '#2e2e2e',
    notification: '#ff6b6b',
    placeholder: '#9e9e9e',
  },
};

const MyLightTheme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007bff',
    background: '#ffffff',
    card: '#f8f9fa',
    text: '#212529',
    border: '#dee2e6',
    notification: '#ff6b6b',
    placeholder: '#9e9e9e', 
  },
};

type ThemeContextType = {
  theme: CustomTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: MyLightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? MyDarkTheme : MyLightTheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
