import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useThemeContext } from '../../context/ThemeContext';
import { ModificaScadenzaRouteProp, Scadenza } from '../../types/navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

export default function ModificaScadenzaScreen() {
  const route = useRoute<ModificaScadenzaRouteProp>();
  const navigation = useNavigation();
  const { theme, isDark } = useThemeContext();

  const { scadenza } = route.params;
  const [tipo, setTipo] = useState<string>(scadenza?.tipo || '');
  const [dataScadenza, setDataScadenza] = useState<string>(scadenza?.dataScadenza || '');
  const [periodicita, setPeriodicita] = useState<string>(scadenza?.periodicita || '');
  const [note, setNote] = useState<string>(scadenza?.note || '');
  const [costo, setCosto] = useState<string>(scadenza?.costo?.toString() || '');
  const [foto, setFoto] = useState<string | undefined>(scadenza?.foto || undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!scadenza?.id) {
      console.error('ID mancante per la scadenza.');
      return;
    }

    const updatedScadenza: Scadenza = {
      id: scadenza.id,
      tipo,
      dataScadenza,
      periodicita,
      note,
      costo: costo ? parseFloat(costo) : undefined,
      foto: foto || undefined,
    };

    console.log('Scadenza modificata:', updatedScadenza);
    navigation.goBack();
  };

  const selezionaFoto = () => {
    console.log('Seleziona foto');
  };

  const styles = getStyles(theme, isDark);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Modifica Scadenza</Text>

        <Text style={styles.label}>Tipo di spesa</Text>
        <TextInput
          style={styles.input}
          value={tipo}
          onChangeText={setTipo}
          placeholderTextColor={theme.colors.placeholder}
        />

        <Text style={styles.label}>Data di scadenza</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={{ color: dataScadenza ? theme.colors.text : theme.colors.placeholder, paddingHorizontal: 10 }}>
            {dataScadenza || 'Seleziona data'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dataScadenza ? new Date(dataScadenza) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                setDataScadenza(formattedDate);
              }
            }}
          />
        )}

        <Text style={styles.label}>Periodicità</Text>
        <RNPickerSelect
          onValueChange={setPeriodicita}
          value={periodicita}
          placeholder={{ label: 'Seleziona', value: '' }}
          items={[
            { label: 'Mensile', value: 'Mensile' },
            { label: 'Bimestrale', value: 'Bimestrale' },
            { label: 'Trimestrale', value: 'Trimestrale' },
            { label: 'Semestrale', value: 'Semestrale' },
            { label: 'Annuale', value: 'Annuale' },
            { label: 'Biennale', value: 'Biennale' },
          ]}
          style={{
            inputIOS: {
              height: 55, 
              borderRadius: 12,
              backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
              paddingHorizontal: 12,
              paddingVertical: 14,
              color: theme.colors.text,
              fontSize: 16,
              borderColor: theme.colors.border,
              borderWidth: 1,
              marginBottom: 15,
            },
            inputAndroid: {
              height: 55,
              borderRadius: 12,
              backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
              paddingHorizontal: 12,
              paddingVertical: 10,
              color: theme.colors.text,
              fontSize: 16,
              borderColor: theme.colors.border,
              borderWidth: 1,
              marginBottom: 15,
              textAlignVertical: 'center',
            },
            placeholder: {
              color: theme.colors.placeholder,
            },
          }}
        />


        <Text style={styles.label}>Costo</Text>
        <TextInput
          style={styles.input}
          value={costo}
          onChangeText={setCosto}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.placeholder}
        />

        <Text style={styles.label}>Note (opzionale)</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
          placeholderTextColor={theme.colors.placeholder}
        />

        <Text style={styles.label}>Foto</Text>
        {foto ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: foto }} style={styles.image} />
            <TouchableOpacity style={styles.orangeButton} onPress={selezionaFoto}>
              <Text style={styles.buttonText}>Modifica Foto</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.orangeButton} onPress={selezionaFoto}>
            <Text style={styles.buttonText}>Aggiungi Foto</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salva Modifiche</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: isDark ? '#000' : '#aaa',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 15,
      color: theme.colors.text,
    },
    input: {
      height: 45,
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
      color: theme.colors.text,
      fontSize: 16,
      borderColor: theme.colors.border,
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    multilineInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    imageContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 250,
      borderRadius: 10,
      marginBottom: 15,
    },
    orangeButton: {
      backgroundColor: '#ff7f32',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      marginBottom: 20,
      alignSelf: 'center',
    },
    saveButton: {
      backgroundColor: '#28a745',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      marginBottom: 20,
      alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
