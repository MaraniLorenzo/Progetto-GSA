import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../types/navigation';
import { useThemeContext } from '../context/ThemeContext';

type AddCarScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'AddCar'>;

export default function AddCarScreen() {
  const navigation = useNavigation<AddCarScreenNavigationProp>();
  const { theme } = useThemeContext();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');

  const handleSaveCar = () => {
    if (!brand || !model) {
      Alert.alert('Errore', 'Marca e modello sono obbligatori!');
      return;
    }

    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Aggiungi Auto</Text>

      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.colors.border,
            color: theme.colors.text,
          }
        ]}
        placeholder="Marca"
        placeholderTextColor={theme.colors.placeholder}
        value={brand}
        onChangeText={setBrand}
      />

      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.colors.border,
            color: theme.colors.text,
          }
        ]}
        placeholder="Modello"
        placeholderTextColor={theme.colors.placeholder}
        value={model}
        onChangeText={setModel}
      />

      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.colors.border,
            color: theme.colors.text,
          }
        ]}
        placeholder="Targa (opzionale)"
        placeholderTextColor={theme.colors.placeholder}
        value={plate}
        onChangeText={setPlate}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSaveCar}
      >
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
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
