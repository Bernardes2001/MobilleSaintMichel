// ThemeWrapper.js
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../src/ThemeContext';

export default function ThemeWrapper({ children }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // cor de fundo padrão (light mode)
  },
  darkContainer: {
    backgroundColor: '#121212', // cor de fundo dark mode
  },
});