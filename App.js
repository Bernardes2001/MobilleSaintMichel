import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigator from './MainNavigator';
import { ThemeProvider } from './src/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      {/* StatusBar dinâmica que muda com o tema */}
      <StatusBar 
        barStyle="light-content" // Padrão para light mode
        backgroundColor="#1F2B6C" // Cor do NavBar no light mode
      />
      <MainNavigator />
    </ThemeProvider>
  );
}