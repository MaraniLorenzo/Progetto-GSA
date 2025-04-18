import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScadenzaDettaglioRouteProp, ScadenzaDettaglioScreenNavigationProp } from '../../types/navigation';
import { useThemeContext } from '../../context/ThemeContext';

export default function ScadenzaDettaglioScreen() {
  const route = useRoute<ScadenzaDettaglioRouteProp>();
  const { scadenza } = route.params;
  const navigation = useNavigation<ScadenzaDettaglioScreenNavigationProp>();
  const { theme } = useThemeContext();

  const calcolaGiorniAllaScadenza = (): string => {
    const oggi = new Date();
    const dataScadenza = new Date(scadenza.dataScadenza);
    const differenzaInMs = dataScadenza.getTime() - oggi.getTime();
    const giorniRimanenti = Math.floor(differenzaInMs / (1000 * 3600 * 24));
  
    if (giorniRimanenti < 0) {
      return 'Scaduta';
    } else if (giorniRimanenti === 1) {
      return '1 giorno alla scadenza';
    } else {
      return `${giorniRimanenti} giorni alla scadenza`;
    }
  };
  const handleEdit = () => {
    navigation.navigate('ModificaScadenza', { scadenza });
  };

  const handleDelete = () => {
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

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Dettagli Scadenza</Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Tipo di spesa: <Text style={styles.value}>{scadenza.tipo}</Text>
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Data di scadenza: <Text style={styles.value}>{scadenza.dataScadenza}</Text>
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Periodicità: <Text style={styles.value}>{scadenza.periodicita}</Text>
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Giorni alla scadenza: <Text style={styles.value}>{calcolaGiorniAllaScadenza()}</Text>
        </Text>

        {scadenza.note && (
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Note: <Text style={styles.value}>{scadenza.note}</Text>
          </Text>
        )}

        {scadenza.foto && (
          <View style={styles.imageContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Foto:</Text>
            <Image source={{ uri: scadenza.foto }} style={styles.image} />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.colors.primary }]} onPress={handleEdit}>
          <Text style={styles.buttonText}>Modifica</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Elimina</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  value: {
    fontWeight: '600',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '48%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
