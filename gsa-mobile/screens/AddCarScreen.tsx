import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../types/navigation';

type AddCarScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'AddCar'>;

export default function AddCarScreen() {
  const navigation = useNavigation<AddCarScreenNavigationProp>();

  // Stati per i campi di input
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');

  // Funzione per gestire il salvataggio dell'auto
  const handleSaveCar = () => {
    if (!brand || !model) {
      Alert.alert('Errore', 'Marca e modello sono obbligatori!');
      return;
    }

    // Qui aggiungi la logica per salvare i dati (ad esempio, inviarli a un'API o a un database)
    Alert.alert('Auto aggiunta', `Marca: ${brand}\nModello: ${model}\nTarga: ${plate || 'Non fornita'}`);

    // Puoi aggiungere la navigazione alla home, o dove preferisci
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aggiungi Auto</Text>

      {/* Campo per la marca */}
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />

      {/* Campo per il modello */}
      <TextInput
        style={styles.input}
        placeholder="Modello"
        value={model}
        onChangeText={setModel}
      />

      {/* Campo opzionale per la targa */}
      <TextInput
        style={styles.input}
        placeholder="Targa (opzionale)"
        value={plate}
        onChangeText={setPlate}
      />

      {/* Pulsante personalizzato */}
      <TouchableOpacity style={styles.button} onPress={handleSaveCar}>
        <Text style={styles.buttonText}>Salva Auto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007BFF', // Colore di sfondo del pulsante
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // Colore del testo del pulsante
    fontSize: 16,
    fontWeight: 'bold',
  },
});
