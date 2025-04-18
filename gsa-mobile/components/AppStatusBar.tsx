import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

export const AppStatusBar = () => {
  const { theme, isDark } = useThemeContext();

  useEffect(() => {
    // Imposta lo stile della status bar in base al tema
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isDark ? theme.colors.background : theme.colors.card);
  }, [isDark, theme]);

  return null;
};
