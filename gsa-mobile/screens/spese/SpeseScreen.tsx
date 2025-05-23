import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Spesa } from '../../types/navigation';
import { useThemeContext } from '../../context/ThemeContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'DettaglioSpesa'>;

const SpeseScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const { theme } = useThemeContext();  // Usa il tema dal contesto

  // Dati di esempio delle spese
  const spese: Spesa[] = [
    {
      id: '1',
      dataSpesa: '2025-04-16',
      categoria: 'Rifornimento',
      kmAttuali: 15000,
      costo: 50,
      costoAlLitro: 1.5,
      note: 'Rifornimento a distributore IP',
    },
    {
      id: '2',
      dataSpesa: '2025-04-17',
      categoria: 'Rifornimento',
      kmAttuali: 25000,
      costo: 50,
      costoAlLitro: 1.5,
    },
    {
      id: '3',
      dataSpesa: '2025-04-17',
      categoria: 'Manutenzione',
      tipoManutenzione: 'Cambio olio',
      kmAttuali: 25000,
      costo: 50,
    },
  ];

  // Filtro delle spese in base alla data (query)
  const filteredSpese = spese.filter((spesa) =>
    spesa.dataSpesa.includes(query)
  );

  // Funzione per calcolare il consumo medio
  const calculateConsumoMedio = (spesa: Spesa): string => {
    if (spesa.categoria === 'Rifornimento' && spesa.kmAttuali && spesa.costoAlLitro) {
      const carburanteAcquistato = spesa.costo / spesa.costoAlLitro;
      const consumo = (carburanteAcquistato / spesa.kmAttuali) * 100;
      return consumo.toFixed(2).replace('.', ',');
    }
    return '0,00';
  };

  // Navigazione verso la schermata DettaglioSpesa
  const handlePress = (spesa: Spesa) => {
    navigation.navigate('DettaglioSpesa', { spesa });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={[styles.searchInput, { borderColor: theme.colors.primary, backgroundColor: theme.colors.card }]}
        placeholder="Cerca spesa..."
        placeholderTextColor={theme.colors.placeholder}
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredSpese}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, { backgroundColor: theme.colors.card }]} onPress={() => handlePress(item)}>
            <View style={styles.itemContent}>
              <Text style={[styles.itemTitle, { color: theme.colors.text }]}>{item.categoria}</Text>
              <Text style={[styles.amount, { color: theme.colors.text }]}>€{item.costo}</Text>
              <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              <Text style={[styles.date, { color: theme.colors.text }]}>
                {item.dataSpesa}
              </Text>

              {item.categoria === 'Rifornimento' && (
                <Text style={[styles.consumo, { color: theme.colors.primary }]}>
                  Consumo medio: {calculateConsumoMedio(item)} L/100km
                </Text>
              )}
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
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    marginVertical: 4,
  },
  consumo: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
});

export default SpeseScreen;
