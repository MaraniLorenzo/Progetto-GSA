import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useThemeContext } from '../context/ThemeContext';

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme: { colors } } = useThemeContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password || !confirm) {
      Alert.alert('Attenzione', 'Compila tutti i campi!');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Errore', 'Le password non coincidono!');
      return;
    }

    Alert.alert('Registrazione riuscita', `Benvenuto, ${username}!`);
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Registrati</Text>

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Nome Utente"
        placeholderTextColor={colors.placeholder}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Password"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Conferma password"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrati</Text>
      </TouchableOpacity>

      <Text style={[styles.loginText, { color: colors.text }]}>
        Hai già un account?{' '}
        <Text style={[styles.link]} onPress={() => navigation.navigate('Login')}>
          Accedi
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 12,
  },
  link: {
    color: '#007AFF',
    fontWeight: '600',
  },
});