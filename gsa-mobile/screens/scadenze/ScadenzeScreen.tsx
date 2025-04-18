import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Scadenza } from '../../types/navigation';
import { useThemeContext } from '../../context/ThemeContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ScadenzaDettaglio'>;

const ScadenzeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const { theme } = useThemeContext();  // Ottieni il tema corrente

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
      (scadenza.tipo?.toLowerCase() || 'N/D').includes(lowerQuery) || 
      (scadenza.note?.toLowerCase() || 'Nessuna nota').includes(lowerQuery) ||
      scadenza.dataScadenza.includes(query)
    );
  });

  const handlePress = (scadenza: Scadenza) => {
    navigation.navigate('ScadenzaDettaglio', { scadenza });
  };

  const isDark = theme.dark;  // Verifica se il tema è scuro

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f9f9f9' }]}>
      {/* Barra di ricerca */}
      <TextInput
        style={[styles.searchInput, { backgroundColor: isDark ? '#2b2b2b' : '#fff', borderColor: isDark ? '#555' : '#007bff' }]}
        placeholder="Cerca scadenza..."
        placeholderTextColor={isDark ? '#aaa' : '#aaa'}
        value={query}
        onChangeText={setQuery}
      />

      {/* Lista delle scadenze filtrata */}
      <FlatList
        data={filteredScadenze}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]} onPress={() => handlePress(item)}>
            <View style={styles.itemContent}>
              <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>{item.periodicita}</Text>
              <Text style={[styles.date, { color: isDark ? '#bbb' : '#777' }]}>{item.dataScadenza}</Text>
              <View style={styles.divider} />
              <Text style={[styles.tipo, { color: isDark ? '#1e90ff' : '#007bff' }]}>{item.tipo || 'N/D'}</Text>
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
  },
  searchInput: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  item: {
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
  },
  date: {
    fontSize: 14,
    marginVertical: 4,
  },
  tipo: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
    width: '100%',
  },
});

export default ScadenzeScreen;
