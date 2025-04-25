import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useThemeContext } from '../context/ThemeContext';
import { PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const spese = [
  { name: 'Rifornimenti', amount: 300, color: '#ff6384' },
  { name: 'Manutenzione', amount: 150, color: '#36a2eb' },
  { name: 'Altre', amount: 100, color: '#ffce56' },
];

const speseMensili = [
  { month: 'Gen', amount: 120 },
  { month: 'Feb', amount: 200 },
  { month: 'Mar', amount: 150 },
  { month: 'Apr', amount: 180 },
  { month: 'Mag', amount: 90 },
  { month: 'Giu', amount: 220 },
  { month: 'Lug', amount: 130 },
  { month: 'Ago', amount: 110 },
  { month: 'Set', amount: 110 },
  { month: 'Ott', amount: 110 },
  { month: 'Nov', amount: 110 },
  { month: 'Dic', amount: 110 },
];

const speseAnnuali = [
  { month: '2020', amount: 1200 },
  { month: '2021', amount: 1500 },
  { month: '2022', amount: 1800 },
  { month: '2023', amount: 2000 },
  { month: '2024', amount: 1700 },
];

const scadenze = [
  { tipo: 'Tagliando', data: '2025-05-01', costo: '120€' },
  { tipo: 'Assicurazione', data: '2025-05-10', costo: '350€' },
  { tipo: 'Revisione', data: '2025-06-01', costo: '60€' },
];
const formatEuro = (amount: number) => {
  const fixed = amount.toFixed(2);
  return fixed.endsWith('.00')
    ? `€${parseInt(fixed, 10)}`
    : `€${fixed.replace('.', ',')}`;
};

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useThemeContext();
  const [tipoSpese, setTipoSpese] = useState<'mensili' | 'annuali'>('mensili');

  const totaleSpese = spese.reduce((sum, s) => sum + s.amount, 0);
  const consumoMedio = '6.5 L/100km';

  const pieChartData = spese.map((item) => ({
    name: `${item.name}\n€${formatEuro(item.amount)}`,
    population: item.amount,
    color: item.color,
    legendFontColor: theme.colors.text,
  }));

  const selectedBarData = tipoSpese === 'mensili' ? speseMensili : speseAnnuali;

  const handleAddSpesa = () => {
    navigation.navigate('AggiungiScreen');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
          <Text style={styles.statTitle}>Totale Spese</Text>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>€{totaleSpese.toFixed(2)}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
          <Text style={styles.statTitle}>Consumo Medio</Text>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>{consumoMedio}</Text>
        </View>
      </View>

      <View style={[styles.chartWrapper, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <PieChart
          data={pieChartData}
          width={(screenWidth - 40) * 0.6}
          height={250}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            color: () => theme.colors.text,
            labelColor: () => theme.colors.text,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="55"
          absolute
          hasLegend={false}
        />

        <View style={styles.legendVerticalContainer}>
          {spese.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <View>
                <Text style={[styles.legendText, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[styles.legendText, { color: theme.colors.text }]}>{formatEuro(item.amount)}</Text>
                </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.scadenzeContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Prossime Scadenze</Text>
        {scadenze.map((scad, index) => (
          <View key={index} style={[styles.scadenzaBox, { backgroundColor: theme.colors.card }]}>
            <View style={styles.scadenzaLeft}>
              <Text style={[styles.scadenzaTipo, { color: theme.colors.primary }]}>{scad.tipo}</Text>
              <Text style={{ color: theme.colors.text }}>{scad.data}</Text>
            </View>
            <Text style={[styles.scadenzaCosto, { color: theme.colors.text }]}>{scad.costo}</Text>
          </View>
        ))}
      </View>


      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, tipoSpese === 'mensili' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setTipoSpese('mensili')}
        >
          <Text style={{ color: tipoSpese === 'mensili' ? '#fff' : theme.colors.text }}>Mensili</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, tipoSpese === 'annuali' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setTipoSpese('annuali')}
        >
          <Text style={{ color: tipoSpese === 'annuali' ? '#fff' : theme.colors.text }}>Annuali</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          data={{
            labels: selectedBarData.map((item) => item.month),
            datasets: [{ data: selectedBarData.map((item) => item.amount) }],
          }}
          width={selectedBarData.length * 60}
          height={220}
          yAxisLabel="€"
          yAxisSuffix=""
          yLabelsOffset={10}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            color: () => theme.colors.primary,
            labelColor: () => theme.colors.text,
            propsForBackgroundLines: {
              stroke: theme.colors.placeholder,
            },
            propsForLabels: {
              fontSize: 12,
              fontWeight: '600',
            },
            decimalPlaces: 0,
          }}
          showBarTops
          fromZero
          withInnerLines={false}
          showValuesOnTopOfBars
          style={{
            marginVertical: 8,
            borderRadius: 8,
            paddingRight: 60,
          }}
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chartWrapper: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  legendVerticalContainer: {
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
  },
  scadenzeContainer: {
    marginBottom: 20,
  },
  scadenzaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scadenzaLeft: {
    flexDirection: 'column',
  },
  scadenzaTipo: {
    fontWeight: '700',
    fontSize: 16,
  },
  scadenzaCosto: {
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },

  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});
