import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function LoginScreen() {
  // Tipizzazione corretta per useNavigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // Stati per email, nome utente e password
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // Funzione di login
  const handleLogin = () => {
    // Verifica che i campi siano compilati
    if (!usernameOrEmail || !password) {
      Alert.alert('Attenzione', 'Compila tutti i campi!');
      return;
    }

    // Qui dovresti aggiungere la logica per verificare se il nome utente o email sono validi
    // Per esempio, puoi fare una chiamata API per validare il login
    if (usernameOrEmail === 'test@example.com' || usernameOrEmail === 'Lollo') {
      // Logica di successo
      Alert.alert('Login effettuato', `Benvenuto, ${usernameOrEmail}!`);
      
      // Navigazione alla Home
      navigation.navigate('Home');
    } else {
      // Caso in cui le credenziali non siano corrette
      Alert.alert('Errore', 'Credenziali non valide');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accedi</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Utente o Email"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Accedi</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Non hai un account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Registrati
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  registerText: { textAlign: 'center', marginTop: 12 },
  link: { color: '#007AFF', fontWeight: '600' },
});
