import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Spesa } from '../../types/navigation';

type ModificaSpesaRouteProp = RouteProp<RootStackParamList, 'ModificaSpesa'>;

const ModificaSpesaScreen = () => {
  const route = useRoute<ModificaSpesaRouteProp>();
  const navigation = useNavigation();
  const { spesa } = route.params;

  const [kmAttuali, setKmAttuali] = useState(spesa.kmAttuali?.toString() || '');
  const [costo, setCosto] = useState(spesa.costo?.toString() || '');
  const [note, setNote] = useState(spesa.note || '');
  const [foto, setFoto] = useState<string | undefined>(spesa.foto || undefined);

  // Solo per rifornimento
  const [costoAlLitro, setCostoAlLitro] = useState(
    spesa.categoria === 'Rifornimento' ? spesa.costoAlLitro?.toString() || '' : ''
  );

  // Solo per manutenzione
  const [tipoManutenzione, setTipoManutenzione] = useState(
    spesa.categoria === 'Manutenzione' ? spesa.tipoManutenzione || '' : ''
  );

  const handleSave = () => {
    if (!kmAttuali || !costo) return;

    const base = {
      id: spesa.id,
      dataSpesa: spesa.dataSpesa,
      kmAttuali: parseInt(kmAttuali),
      costo: parseFloat(costo),
      note,
      foto,
    };

    let updatedSpesa: Spesa;

    if (spesa.categoria === 'Rifornimento') {
      if (!costoAlLitro) {
        console.error('Costo al litro obbligatorio per Rifornimento');
        return;
      }
      updatedSpesa = {
        ...base,
        categoria: 'Rifornimento',
        costoAlLitro: parseFloat(costoAlLitro),
      };
    } else {
      if (!tipoManutenzione) {
        console.error('Tipo manutenzione obbligatorio per Manutenzione');
        return;
      }
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
    // logica futura per selezionare una foto
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Modifica Spesa ({spesa.categoria})</Text>

        <Text style={styles.label}>Km attuali</Text>
        <TextInput
          style={styles.input}
          value={kmAttuali}
          onChangeText={setKmAttuali}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Costo</Text>
        <TextInput
          style={styles.input}
          value={costo}
          onChangeText={setCosto}
          keyboardType="numeric"
        />

        {spesa.categoria === 'Rifornimento' && (
          <>
            <Text style={styles.label}>Costo al litro</Text>
            <TextInput
              style={styles.input}
              value={costoAlLitro}
              onChangeText={setCostoAlLitro}
              keyboardType="numeric"
            />
          </>
        )}

        {spesa.categoria === 'Manutenzione' && (
          <>
            <Text style={styles.label}>Tipo di manutenzione</Text>
            <TextInput
              style={styles.input}
              value={tipoManutenzione}
              onChangeText={setTipoManutenzione}
            />
          </>
        )}

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
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
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#444',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
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

export default ModificaSpesaScreen;
