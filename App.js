import React from 'react';
import MainNavigator from './MainNavigator';
import { ThemeProvider } from './src/ThemeContext';

export default function App() {

  return (
    <>
    <ThemeProvider>
      <MainNavigator/>
    </ThemeProvider>
      
    </>
  )
}