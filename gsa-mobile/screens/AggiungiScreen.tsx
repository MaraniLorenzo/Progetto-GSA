import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function AggiungiScreen() {
  const [tipo, setTipo] = useState<string>('rifornimento');
  const [km, setKm] = useState('');
  const [costoLitro, setCostoLitro] = useState('');
  const [costo, setCosto] = useState('');
  const [note, setNote] = useState('');
  const [tipoSpesa, setTipoSpesa] = useState('');
  const [tipoManutenzione, setTipoManutenzione] = useState('');
  const [frequenza, setFrequenza] = useState('');
  const [scadenza, setScadenza] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const scattaFoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permesso negato', 'Hai bisogno del permesso per usare la fotocamera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSalva = () => {
    if (!tipo) {
      Alert.alert('Errore', 'Per favore scegli un tipo di voce');
      return;
    }

    const data = {
      tipo,
      km,
      costoLitro,
      costo,
      tipoSpesa,
      tipoManutenzione, // Incluso per la sezione "Manutenzione"
      scadenza: scadenza ? scadenza.toLocaleDateString() : null,
      frequenza,
      note,
      image,
    };

    console.log('Dati salvati:', data);
    Alert.alert('Salvato!', 'Voce aggiunta con successo');
  };

  const renderButton = (label: string, value: string, icon: JSX.Element) => (
    <TouchableOpacity
      style={[styles.optionButton, tipo === value && styles.selectedButton]}
      onPress={() => setTipo(value)}
    >
      <View style={styles.iconRow}>
        {icon}
        <Text style={[styles.optionText, tipo === value && styles.selectedText]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Aggiungi una voce</Text>

      {/* Pulsanti per la selezione, disposti verticalmente */}
      <View style={styles.buttonGroup}>
        {renderButton(
          'Rifornimento',
          'rifornimento',
          <FontAwesome5
            name="gas-pump"
            size={16}
            color={tipo === 'rifornimento' ? '#fff' : '#333'}
            style={styles.icon}
          />
        )}
        {renderButton(
          'Manutenzione',
          'manutenzione',
          <MaterialIcons
            name="build"
            size={18}
            color={tipo === 'manutenzione' ? '#fff' : '#333'}
            style={styles.icon}
          />
        )}
        {renderButton(
          'Spesa Periodica',
          'periodica',
          <Entypo
            name="calendar"
            size={18}
            color={tipo === 'periodica' ? '#fff' : '#333'}
            style={styles.icon}
          />
        )}
      </View>

      <View style={styles.card}>
        {tipo === 'rifornimento' && (
          <>
            <Text style={styles.label}>Km attuali</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={km}
              onChangeText={setKm}
              placeholder="Es. 120000"
            />

            <Text style={styles.label}>Costo (€)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={costo}
              onChangeText={setCosto}
              placeholder="Es. 50"
            />

            <Text style={styles.label}>Costo al litro (€)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={costoLitro}
              onChangeText={setCostoLitro}
              placeholder="Es. 1.85"
            />

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Es. Distributore IP..."
            />
          </>
        )}

        {tipo === 'manutenzione' && (
          <>
            {/* Nuovo campo per il tipo di manutenzione */}
            <Text style={styles.label}>Tipo di manutenzione</Text>
            <TextInput
              style={styles.input}
              value={tipoManutenzione}
              onChangeText={setTipoManutenzione}
              placeholder="Es. Cambio olio, controllo freni..."
            />

            <Text style={styles.label}>Km attuali</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={km}
              onChangeText={setKm}
              placeholder="Es. 120000"
            />

            <Text style={styles.label}>Costo (€)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={costo}
              onChangeText={setCosto}
              placeholder="Es. 200"
            />

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Es. Cambio olio..."
            />
          </>
        )}

        {tipo === 'periodica' && (
          <>
            <Text style={styles.label}>Costo (€)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={costo}
              onChangeText={setCosto}
              placeholder="Es. 150"
            />

            <Text style={styles.label}>Tipo di spesa</Text>
            <TextInput
              style={styles.input}
              value={tipoSpesa}
              onChangeText={setTipoSpesa}
              placeholder="Es. Assicurazione"
            />

            <Text style={styles.label}>Scadenza</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateButtonText}>
                {scadenza ? scadenza.toLocaleDateString() : 'Scegli una data'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={scadenza || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  setShowDatePicker(false);
                  if (selectedDate) setScadenza(selectedDate);
                }}
              />
            )}

            <Text style={styles.label}>Periodicità</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={frequenza}
                onValueChange={(itemValue) => setFrequenza(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Seleziona" value="" />
                <Picker.Item label="Mensile" value="mensile" />
                <Picker.Item label="Bimestrale" value="bimestrale" />
                <Picker.Item label="Trimestrale" value="trimestrale" />
                <Picker.Item label="Semestrale" value="semestrale" />
                <Picker.Item label="Annuale" value="annuale" />
                <Picker.Item label="Biennale" value="biennale" />
              </Picker>
            </View>

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Es. Rinnovo assicurazione..."
            />
          </>
        )}

        <TouchableOpacity style={styles.photoButton} onPress={scattaFoto}>
          <Text style={styles.photoText}>Scatta una foto</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity style={styles.saveButton} onPress={handleSalva}>
          <Text style={styles.saveText}>Salva</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 50, // Spazio extra per evitare che il contenuto si sovrapponga al Bottom Navigator
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  buttonGroup: {
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#2196F3',
  },
  optionText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  selectedText: {
    color: '#fff',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10, // Aumentato lo spazio tra icona e testo
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  dateButton: {
    marginTop: 5,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
  },
  dateButtonText: {
    color: '#555',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  picker: {
    height: 50,
  },
  photoButton: {
    backgroundColor: '#ff9800',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  photoText: {
    color: '#fff',
    fontWeight: '600',
  },
  image: {
    marginTop: 15,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export {};
