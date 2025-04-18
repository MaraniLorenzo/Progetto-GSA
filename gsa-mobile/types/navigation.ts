import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// 📌 Tipi di dati
export type Scadenza = {
  id: string;
  tipo: string;
  dataScadenza: string;
  periodicita: string;
  note?: string;
  foto?: string | null;
  costo?: number;
};

export type Spesa =
  | {
      id: string;
      dataSpesa: string;
      categoria: 'Rifornimento';
      kmAttuali: number;
      costo: number;
      costoAlLitro: number;
      note?: string;
      foto?: string;
    }
  | {
      id: string;
      dataSpesa: string;
      categoria: 'Manutenzione';
      kmAttuali: number;
      costo: number;
      tipoManutenzione: string;
      note?: string;
      foto?: string;
    };

// 🧭 Tutte le route della tua app
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined; // 👈 Tab Navigator dentro
  AddCar: undefined;
  AggiungiScreen: undefined;

  // Tab: Storico
  StoricoScreen: undefined;
  DettaglioSpesa: { spesa: Spesa };
  ModificaSpesa: { spesa: Spesa };

  // Tab: Scadenze
  ScadenzeScreen: undefined;
  ScadenzaDettaglio: { scadenza: Scadenza };
  ModificaScadenza: { scadenza: Scadenza };
};

// 📦 Navigazione per ogni screen
export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;

// ✨ Esempi d’uso comodi nei tuoi componenti:
export type ScadenzaDettaglioScreenNavigationProp = ScreenNavigationProp<'ScadenzaDettaglio'>;
export type ModificaScadenzaScreenNavigationProp = ScreenNavigationProp<'ModificaScadenza'>;
export type DettaglioSpesaScreenNavigationProp = ScreenNavigationProp<'DettaglioSpesa'>;
export type ModificaSpesaScreenNavigationProp = ScreenNavigationProp<'ModificaSpesa'>;

export type ScadenzaDettaglioRouteProp = ScreenRouteProp<'ScadenzaDettaglio'>;
export type ModificaScadenzaRouteProp = ScreenRouteProp<'ModificaScadenza'>;
export type DettaglioSpesaRouteProp = ScreenRouteProp<'DettaglioSpesa'>;
export type ModificaSpesaRouteProp = ScreenRouteProp<'ModificaSpesa'>;
