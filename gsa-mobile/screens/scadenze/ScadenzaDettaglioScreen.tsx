import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import {
  Scadenza,
  ScadenzaDettaglioScreenRouteProp,
  ScadenzaDettaglioScreenNavigationProp,
} from '../../types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';

const BUTTON_CONTAINER_MARGIN_TOP = Platform.OS === 'ios' ? 40 : 20;

export default function ScadenzaDettaglioScreen() {
  const route = useRoute<ScadenzaDettaglioScreenRouteProp>();
  const { scadenza } = route.params;
  const navigation = useNavigation<ScadenzaDettaglioScreenNavigationProp>();

  const calcolaGiorniAllaScadenza = (): string => {
    const oggi = new Date();
    const dataScadenza = new Date(scadenza.dataScadenza);
    const differenzaInMs = dataScadenza.getTime() - oggi.getTime();
    const giorniRimanenti = Math.floor(differenzaInMs / (1000 * 3600 * 24));

    if (giorniRimanenti < 0) {
      return 'Scaduta';
    } else {
      return `${giorniRimanenti} giorno${giorniRimanenti > 1 ? 'i' : ''} alla scadenza`;
    }
  };

  const handleElimina = () => {
    Alert.alert(
      'Conferma eliminazione',
      'Sei sicuro di voler eliminare questa scadenza?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Eliminata', 'La scadenza è stata eliminata.');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const navigateToModificaScadenza = () => {
    navigation.navigate('ModificaScadenza', { scadenza: scadenza });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Dettagli Scadenza</Text>
        
        {/* Tipo di spesa */}
        <View>
          <Text style={styles.subtitle}>Tipo di spesa</Text>
          <Text style={styles.text}>{scadenza.tipo}</Text>
        </View>

        {/* Data di scadenza */}
        <View>
          <Text style={styles.subtitle}>Data di scadenza</Text>
          <Text style={styles.text}>{scadenza.dataScadenza}</Text>
        </View>

        {/* Periodicità */}
        <View>
          <Text style={styles.subtitle}>Periodicità</Text>
          <Text style={styles.text}>{scadenza.periodicita}</Text>
        </View>

        {/* Giorni alla scadenza */}
        <View>
          <Text style={styles.subtitle}>Giorni alla scadenza</Text>
          <Text style={styles.text}>{calcolaGiorniAllaScadenza()}</Text>
        </View>

        {/* Note */}
        {scadenza.note && (
          <View>
            <Text style={styles.subtitle}>Note</Text>
            <Text style={styles.text}>{scadenza.note}</Text>
          </View>
        )}

        {/* Foto */}
        {scadenza.foto && (
          <View>
            <Text style={styles.subtitle}>Foto</Text>
            <Image source={{ uri: scadenza.foto }} style={styles.image} />
          </View>
        )}
      </View>

      {/* Bottoni */}
      <View style={[styles.buttonContainer, { marginTop: BUTTON_CONTAINER_MARGIN_TOP }]}>
        {/* Bottone Modifica */}
        <TouchableOpacity style={styles.button} onPress={navigateToModificaScadenza}>
          <Text style={styles.buttonText}>Modifica</Text>
        </TouchableOpacity>

        {/* Bottone Elimina */}
        <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={handleElimina}>
          <Text style={styles.buttonText}>Elimina</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    width: '48%',
  },
  buttonDelete: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
