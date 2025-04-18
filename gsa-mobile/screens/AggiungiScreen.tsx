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
import { useThemeContext } from '../context/ThemeContext'; 
export default function AggiungiScreen() {
  const { theme, isDark } = useThemeContext();

  const [tipo, setTipo] = useState<string>('rifornimento');
  const [km, setKm] = useState('');
  const [costoLitro, setCostoLitro] = useState('');
  const [costo, setCosto] = useState('');
  const [note, setNote] = useState('');
  const [tipoSpesa, setTipoSpesa] = useState('');
  const [tipoManutenzione, setTipoManutenzione] = useState('');
  const [frequenza, setFrequenza] = useState('');
  const [scadenza, setScadenza] = useState<Date | null>(null);
  const [dataEvento, setDataEvento] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDataEventoPicker, setShowDataEventoPicker] = useState(false);
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
      dataEvento: dataEvento ? dataEvento.toLocaleDateString() : null,
      km,
      costoLitro,
      costo,
      tipoSpesa,
      tipoManutenzione,
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
      style={[
        styles.optionButton,
        { backgroundColor: tipo === value ? theme.colors.primary : theme.colors.card },
      ]}
      onPress={() => setTipo(value)}
    >
      <View style={styles.iconRow}>
        {icon}
        <Text style={[styles.optionText, { color: tipo === value ? '#fff' : theme.colors.text }]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={{ marginTop: 20 }} />

      <View style={styles.buttonGroup}>
        {renderButton(
          'Rifornimento',
          'rifornimento',
          <FontAwesome5 name="gas-pump" size={16} color={tipo === 'rifornimento' ? '#fff' : theme.colors.text} style={styles.icon} />
        )}
        {renderButton(
          'Manutenzione',
          'manutenzione',
          <MaterialIcons name="build" size={18} color={tipo === 'manutenzione' ? '#fff' : theme.colors.text} style={styles.icon} />
        )}
        {renderButton(
          'Spesa Periodica',
          'periodica',
          <Entypo name="calendar" size={18} color={tipo === 'periodica' ? '#fff' : theme.colors.text} style={styles.icon} />
        )}
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        {(tipo === 'rifornimento' || tipo === 'manutenzione') && (
          <>
            <Text style={[styles.label, { color: theme.colors.text }]}>Data</Text>
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border, borderWidth: 1 }]}
              onPress={() => setShowDataEventoPicker(true)}
            >
              <Text style={{ color: theme.colors.text }}>
                {dataEvento ? dataEvento.toLocaleDateString() : 'Seleziona una data'}
              </Text>
            </TouchableOpacity>
            {showDataEventoPicker && (
              <DateTimePicker
                value={dataEvento || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                themeVariant={isDark ? 'dark' : 'light'}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  setShowDataEventoPicker(false);
                  if (selectedDate) setDataEvento(selectedDate);
                }}
              />
            )}
          </>
        )}

        {tipo === 'rifornimento' && (
          <>
            <Text style={[styles.label, { color: theme.colors.text }]}>Km attuali</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} keyboardType="numeric" value={km} onChangeText={setKm} placeholder="Es. 120000" placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Costo (€)</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} keyboardType="decimal-pad" value={costo} onChangeText={setCosto} placeholder="Es. 50" placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Costo al litro (€)</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} keyboardType="decimal-pad" value={costoLitro} onChangeText={setCostoLitro} placeholder="Es. 1.85" placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Note</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} value={note} onChangeText={setNote} placeholder="Es. Distributore IP..." placeholderTextColor={theme.colors.placeholder} />
          </>
        )}

        {tipo === 'manutenzione' && (
          <>
            <Text style={[styles.label, { color: theme.colors.text }]}>Tipo di manutenzione</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} value={tipoManutenzione} onChangeText={setTipoManutenzione} placeholder="Es. Cambio olio, controllo freni..." placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Km attuali</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} keyboardType="numeric" value={km} onChangeText={setKm} placeholder="Es. 120000" placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Costo (€)</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} keyboardType="decimal-pad" value={costo} onChangeText={setCosto} placeholder="Es. 200" placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Note</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} value={note} onChangeText={setNote} placeholder="Es. Cambio olio..." placeholderTextColor={theme.colors.placeholder} />
          </>
        )}

        {tipo === 'periodica' && (
          <>
            <Text style={[styles.label, { color: theme.colors.text }]}>Costo (€)</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} keyboardType="decimal-pad" value={costo} onChangeText={setCosto} placeholder="Es. 150" placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Tipo di spesa</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} value={tipoSpesa} onChangeText={setTipoSpesa} placeholder="Es. Assicurazione" placeholderTextColor={theme.colors.placeholder} />

            <Text style={[styles.label, { color: theme.colors.text }]}>Scadenza</Text>
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border, borderWidth: 1 }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: theme.colors.text }}>
                {scadenza ? scadenza.toLocaleDateString() : 'Scegli una data'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={scadenza || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                themeVariant={isDark ? 'dark' : 'light'}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  setShowDatePicker(false);
                  if (selectedDate) setScadenza(selectedDate);
                }}
              />
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>Periodicità</Text>
            <View style={[styles.pickerContainer, { borderColor: theme.colors.border }]}>
              <Picker selectedValue={frequenza} onValueChange={(itemValue) => setFrequenza(itemValue)} style={{ color: theme.colors.text }}>
                <Picker.Item label="Seleziona" value="" />
                <Picker.Item label="Mensile" value="mensile" />
                <Picker.Item label="Bimestrale" value="bimestrale" />
                <Picker.Item label="Trimestrale" value="trimestrale" />
                <Picker.Item label="Semestrale" value="semestrale" />
                <Picker.Item label="Annuale" value="annuale" />
                <Picker.Item label="Biennale" value="biennale" />
              </Picker>
            </View>

            <Text style={[styles.label, { color: theme.colors.text }]}>Note</Text>
            <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} value={note} onChangeText={setNote} placeholder="Es. Rinnovo assicurazione..." placeholderTextColor={theme.colors.placeholder} />
          </>
        )}

        <TouchableOpacity style={[styles.photoButton]} onPress={scattaFoto}>
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
  container: { flex: 1, padding: 20 },
  scrollContent: { paddingBottom: 50 },
  buttonGroup: { marginBottom: 15 },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: { fontWeight: '600', fontSize: 16 },
  iconRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 10 },
  card: {
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
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  dateButton: {
    marginTop: 5,
    padding: 10,
    borderRadius: 6,
  },
  pickerContainer: {
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 5,
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
