import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';
import { RootNavigation } from './RootNavigation';

const AppNavigator = () => {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer theme={theme}>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
