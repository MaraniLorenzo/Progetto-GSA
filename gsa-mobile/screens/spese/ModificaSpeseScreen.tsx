import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView
} from 'react-native';
import { useRoute, useNavigation, ThemeContext } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Spesa } from '../../types/navigation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '../../context/ThemeContext';

type ModificaSpesaRouteProp = RouteProp<RootStackParamList, 'ModificaSpesa'>;

const ModificaSpesaScreen = () => {
  const route = useRoute<ModificaSpesaRouteProp>();
  const navigation = useNavigation();
  const { spesa } = route.params;
  const { theme } = useThemeContext();

  const [kmAttuali, setKmAttuali] = useState(spesa.kmAttuali?.toString() || '');
  const [costo, setCosto] = useState(spesa.costo?.toString() || '');
  const [note, setNote] = useState(spesa.note || '');
  const [foto, setFoto] = useState<string | undefined>(spesa.foto || undefined);
  const [dataSpesa, setDataSpesa] = useState<string>(moment(spesa.dataSpesa).format('YYYY-MM-DD'));
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [costoAlLitro, setCostoAlLitro] = useState(
    spesa.categoria === 'Rifornimento' ? spesa.costoAlLitro?.toString() || '' : ''
  );

  const [tipoManutenzione, setTipoManutenzione] = useState(
    spesa.categoria === 'Manutenzione' ? spesa.tipoManutenzione || '' : ''
  );

  const handleSave = () => {
    if (!kmAttuali || !costo) return;

    const base = {
      id: spesa.id,
      dataSpesa: dataSpesa,
      kmAttuali: parseInt(kmAttuali),
      costo: parseFloat(costo),
      note,
      foto,
    };

    let updatedSpesa: Spesa;

    if (spesa.categoria === 'Rifornimento') {
      if (!costoAlLitro) return;
      updatedSpesa = {
        ...base,
        categoria: 'Rifornimento',
        costoAlLitro: parseFloat(costoAlLitro),
      };
    } else {
      if (!tipoManutenzione) return;
      updatedSpesa = {
        ...base,
        categoria: 'Manutenzione',
        tipoManutenzione,
      };
    }

    console.log('Spesa modificata:', updatedSpesa);
    navigation.goBack();
  };

  const selezionaFoto = () => {
    console.log('Seleziona foto');
  };

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleDateConfirm = (date: Date) => {
    setDataSpesa(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const isDark = theme.dark;

  const colors = {
    background: isDark ? '#121212' : '#f7f7f7',
    card: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#ffffff' : '#333333',
    label: isDark ? '#dddddd' : '#444444',
    inputBackground: isDark ? '#2b2b2b' : '#f0f0f0',
    inputText: isDark ? '#ffffff' : '#000000',
    border: isDark ? '#444' : '#ccc',
    shadow: isDark ? '#000000' : '#000000',
    greenButton: isDark ? '#2ecc71' : '#28a745',
    orangeButton: isDark ? '#ffa94d' : '#ff7f32',
    icon: isDark ? '#ccc' : '#555',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, {
        backgroundColor: colors.card,
        shadowColor: colors.shadow,
      }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Modifica {spesa.categoria}
        </Text>

        <Text style={[styles.label, { color: colors.label }]}>Data Spesa</Text>
        <TouchableOpacity style={[styles.dateInput, { backgroundColor: colors.inputBackground, borderColor: colors.border }]} onPress={showDatePicker}>
         <Text style={[styles.dateText, { color: colors.text, textAlign: 'left', paddingLeft: 10 }]}>
            {dataSpesa}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.label, { color: colors.label }]}>Km attuali</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
          value={kmAttuali}
          onChangeText={setKmAttuali}
          keyboardType="numeric"
        />

        <Text style={[styles.label, { color: colors.label }]}>Costo</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
          value={costo}
          onChangeText={setCosto}
          keyboardType="numeric"
        />

        {spesa.categoria === 'Rifornimento' && (
          <>
            <Text style={[styles.label, { color: colors.label }]}>Costo al litro</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
              value={costoAlLitro}
              onChangeText={setCostoAlLitro}
              keyboardType="numeric"
            />
          </>
        )}

        {spesa.categoria === 'Manutenzione' && (
          <>
            <Text style={[styles.label, { color: colors.label }]}>Tipo di manutenzione</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
              value={tipoManutenzione}
              onChangeText={setTipoManutenzione}
            />
          </>
        )}

        <Text style={[styles.label, { color: colors.label }]}>Note</Text>
        <TextInput
          style={[styles.input, styles.multilineInput, { backgroundColor: colors.inputBackground, color: colors.inputText, borderColor: colors.border }]}
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
        />

        <Text style={[styles.label, { color: colors.label }]}>Foto</Text>
        {foto ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: foto }} style={styles.image} />
            <TouchableOpacity style={[styles.orangeButton, { backgroundColor: colors.orangeButton }]} onPress={selezionaFoto}>
              <Text style={styles.buttonText}>Modifica Foto</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={[styles.orangeButton, { backgroundColor: colors.orangeButton }]} onPress={selezionaFoto}>
            <Text style={styles.buttonText}>Aggiungi Foto</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.greenButton }]} onPress={handleSave}>
          <Text style={styles.buttonText}>Salva Modifiche</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(dataSpesa)}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 45,
    paddingHorizontal: 15,
    paddingLeft: 0,  
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
  
  dateIcon: {
    marginRight: 12,
  },
  dateText: {
    fontSize: 16,
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

export default ModificaSpesaScreen;
