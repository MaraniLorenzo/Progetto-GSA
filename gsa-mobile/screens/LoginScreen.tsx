import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';
import { RootStackParamList } from '../types/navigation';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // Recupera il tema e la funzione per cambiare tema
  const { theme, toggleTheme } = useThemeContext();

  const handleLogin = () => {
    if (!usernameOrEmail || !password) {
      Alert.alert('Attenzione', 'Compila tutti i campi!');
      return;
    }

    if (usernameOrEmail === 'test@example.com' || usernameOrEmail === 'Lollo') {
      Alert.alert('Login effettuato', `Benvenuto, ${usernameOrEmail}!`);
      navigation.navigate('Home');
    } else {
      Alert.alert('Errore', 'Credenziali non valide');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Accedi</Text>

      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}  
        placeholder="Nome Utente o Email"
        placeholderTextColor={theme.colors.placeholder}  
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} 
        placeholder="Password"
        placeholderTextColor={theme.colors.placeholder} 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Accedi</Text>
      </TouchableOpacity>

      <Text style={[styles.registerText, { color: theme.colors.text }]}>
        Non hai un account?{' '}
        <Text style={[styles.link, { color: theme.colors.primary }]} onPress={() => navigation.navigate('Register')}>
          Registrati
        </Text>
      </Text>

      {/* Icona per cambio tema in alto a destra */}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Ionicons
          name={theme.colors.background === '#0f0f0f' ? 'sunny-outline' : 'moon-outline'}
          size={30} // Aumentato la dimensione per visibilità
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  registerText: { textAlign: 'center', marginTop: 12 },
  link: { fontWeight: '600' },
  themeButton: {
    position: 'absolute',
    top: 40, // Spostato in alto
    right: 20, // Spostato a destra
    padding: 10,
  },
});
