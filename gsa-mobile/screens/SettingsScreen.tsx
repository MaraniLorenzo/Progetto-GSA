import React, { useLayoutEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useThemeContext();
  const { colors } = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Impostazioni' });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>Tema Scuro</Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
});
