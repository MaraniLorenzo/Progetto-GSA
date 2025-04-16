import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Scadenza, ModificaScadenzaScreenRouteProp } from '../../types/navigation';


export default function ModificaScadenzaScreen() {
  const route = useRoute<ModificaScadenzaScreenRouteProp>(); 
  const navigation = useNavigation();

  // Recuperiamo l'oggetto scadenza
  const { scadenza } = route.params;

  const [tipo, setTipo] = useState<string>(scadenza?.tipo || '');
  const [dataScadenza, setDataScadenza] = useState<string>(scadenza?.dataScadenza || '');
  const [periodicita, setPeriodicita] = useState<string>(scadenza?.periodicita || '');
  const [note, setNote] = useState<string>(scadenza?.note || '');
  const [costo, setCosto] = useState<string>(scadenza?.costo?.toString() || '');
  const [foto, setFoto] = useState<string | undefined>(scadenza?.foto || undefined); // Se non c'è foto, diventa undefined

  const handleSave = () => {
    if (!scadenza?.id) {
      console.error('ID mancante per la scadenza.');
      return; // Assicurati che l'ID sia presente
    }

    const updatedScadenza: Scadenza = {
      id: scadenza.id, // Assicuriamoci che l'ID sia sempre presente
      tipo: tipo,
      dataScadenza: dataScadenza,
      periodicita: periodicita,
      note: note,
      costo: costo ? parseFloat(costo) : undefined,
      foto: foto || undefined,  // Foto può essere undefined, non null
    };

    console.log('Scadenza modificata:', updatedScadenza);
    navigation.goBack();
  };

  const selezionaFoto = () => {
    console.log('Seleziona foto');
    // Logica per selezionare una foto
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Modifica Scadenza</Text>

        <Text style={styles.label}>Tipo di spesa</Text>
        <TextInput
          style={styles.input}
          value={tipo}
          onChangeText={setTipo}
        />

        <Text style={styles.label}>Data di scadenza</Text>
        <TextInput
          style={styles.input}
          value={dataScadenza}
          onChangeText={setDataScadenza}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Periodicità</Text>
        <TextInput
          style={styles.input}
          value={periodicita}
          onChangeText={setPeriodicita}
        />

        <Text style={styles.label}>Costo</Text>
        <TextInput
          style={styles.input}
          value={costo}
          onChangeText={setCosto}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Note (opzionale)</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={4}
        />

        {/* Sezione Foto */}
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

        {/* Pulsante Salva Modifiche */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salva Modifiche</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
    backgroundColor: '#ff7f32', // Arancione
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Per allineare i pulsanti
    marginBottom: 20,
    alignSelf: 'center', // Centra il pulsante
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',  // Allineamento con "Aggiungi Foto"
    marginBottom: 20,
    alignSelf: 'center', // Centra il pulsante
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
