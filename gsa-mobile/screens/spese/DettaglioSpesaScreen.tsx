import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useThemeContext } from '../../context/ThemeContext'; // Importa il context

type DettaglioSpesaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DettaglioSpesa'>;

export default function DettaglioSpesaScreen({ route }: any) {
  const { theme } = useThemeContext(); // Usa il tema
  const { spesa } = route.params;
  const navigation = useNavigation<DettaglioSpesaScreenNavigationProp>();

  const handleEdit = () => {
    navigation.navigate('ModificaSpesa', { spesa });
  };

  const handleDelete = () => {
    Alert.alert(
      'Conferma eliminazione',
      'Sei sicuro di voler eliminare questa spesa?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            console.log('Spesa eliminata');
          },
        },
      ]
    );
  };

  const calcolaLitri = (): string | null => {
    if (spesa.categoria === 'Rifornimento' && spesa.costo && spesa.costoAlLitro) {
      const litri = spesa.costo / spesa.costoAlLitro;
      return `${litri.toFixed(2).replace('.', ',')} L`;
    }
    return null;
  };

  const calcolaConsumoMedio = (): string | null => {
    if (spesa.categoria === 'Rifornimento' && spesa.kmAttuali && spesa.costo && spesa.costoAlLitro) {
      const carburanteAcquistato = spesa.costo / spesa.costoAlLitro;
      const consumoMedio = (carburanteAcquistato / spesa.kmAttuali) * 100;
      return `${consumoMedio.toFixed(2).replace('.', ',')} L/100km`;
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Dettagli della Spesa</Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>
          Categoria: <Text style={styles.value}>{spesa.categoria}</Text>
        </Text>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Data: <Text style={styles.value}>{spesa.dataSpesa}</Text>
        </Text>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Costo: <Text style={styles.value}>€{spesa.costo}</Text>
        </Text>

        {spesa.kmAttuali !== undefined && (
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Km attuali: <Text style={styles.value}>{spesa.kmAttuali} km</Text>
          </Text>
        )}

        {spesa.costoAlLitro !== undefined && (
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Costo al litro: <Text style={styles.value}>€{spesa.costoAlLitro}</Text>
          </Text>
        )}

        {spesa.categoria === 'Rifornimento' && calcolaLitri() && (
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Litri acquistati: <Text style={styles.value}>{calcolaLitri()}</Text>
          </Text>
        )}

        {calcolaConsumoMedio() && (
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Consumo medio: <Text style={styles.value}>{calcolaConsumoMedio()}</Text>
          </Text>
        )}

        {spesa.note && (
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Note: <Text style={styles.value}>{spesa.note}</Text>
          </Text>
        )}

        {spesa.foto && (
          <View style={styles.imageContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Foto:</Text>
            <Image source={{ uri: spesa.foto }} style={styles.image} />
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
