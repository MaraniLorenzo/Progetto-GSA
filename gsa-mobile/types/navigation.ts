import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  AddCar: undefined;
  AggiungiScreen: undefined;
  ScadenzeScreen: undefined;
  StoricoScreen: undefined;
  ScadenzaDettaglio: { scadenza: Scadenza };
  DettaglioSpesa: { spesa: Spesa };
  ModificaScadenza:{scadenza: Scadenza;}
  ModificaSpesa: { spesa: Spesa };
};

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

export type ScadenzaDettaglioScreenRouteProp = RouteProp<RootStackParamList, 'ScadenzaDettaglio'>;
export type ModificaScadenzaScreenRouteProp = RouteProp<RootStackParamList, 'ModificaScadenza'>;
export type ScadenzaDettaglioScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScadenzaDettaglio'>;
export type ModificaScadenzaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ModificaScadenza'>;
