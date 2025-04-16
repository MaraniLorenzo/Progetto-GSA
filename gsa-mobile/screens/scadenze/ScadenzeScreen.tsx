import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Scadenza } from '../../types/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ScadenzaDettaglio'>;

const ScadenzeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');

  // Supponiamo che le scadenze siano un array di oggetti
  const scadenze: Scadenza[] = [
    {
      id: '1',
      dataScadenza: '2025-05-15',
      tipo: 'Assicurazione RCA',
      note: 'Cambio olio e filtri',
      foto: 'https://via.placeholder.com/150',
      periodicita: 'mensile',
    },
    {
      id: '2',
      periodicita: 'annuale',
      dataScadenza: '2025-11-11',
      tipo: 'Revisione',
    },
  ];

  // Funzione di filtro per la ricerca
  const filteredScadenze = scadenze.filter((scadenza) => {
    const lowerQuery = query.toLowerCase();
    return (
      scadenza.periodicita.toLowerCase().includes(lowerQuery) ||
      (scadenza.tipo?.toLowerCase() || 'N/D').includes(lowerQuery) || // placeholder per 'tipo'
      (scadenza.note?.toLowerCase() || 'Nessuna nota').includes(lowerQuery) || // placeholder per 'note'
      scadenza.dataScadenza.includes(query)
    );
  });

  const handlePress = (scadenza: Scadenza) => {
    navigation.navigate('ScadenzaDettaglio', { scadenza });
  };

  return (
    <View style={styles.container}>
      {/* Barra di ricerca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cerca scadenza..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />

      {/* Lista delle scadenze filtrata */}
      <FlatList
        data={filteredScadenze}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <View style={styles.itemContent}>
              <Text style={styles.title}>{item.periodicita}</Text>
              <Text style={styles.date}>{item.dataScadenza}</Text>
              <View style={styles.divider} />
              <Text style={styles.tipo}>{item.tipo || 'N/D'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f9f9f9',
    },
    searchInput: {
      height: 50,
      borderColor: '#007bff',
      borderWidth: 1.5,
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      backgroundColor: '#fff',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    item: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 18,
      marginBottom: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    itemContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    date: {
      fontSize: 14,
      color: '#777',
      marginVertical: 4,
    },
    tipo: {
      fontSize: 14,
      fontStyle: 'italic',
      color: '#007bff',
    },
    divider: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 8,
      width: '100%',
    },
  });
  

export default ScadenzeScreen;
