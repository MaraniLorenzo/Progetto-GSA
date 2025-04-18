import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import { AppStatusBar } from './components/AppStatusBar';

const App = () => {
  return (
    <ThemeProvider>
      <AppStatusBar />
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
