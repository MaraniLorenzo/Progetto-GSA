import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CommonActions, useTheme } from '@react-navigation/native';
import CustomDrawerContent from './CustomDrawerContent';
import { useThemeContext } from '../context/ThemeContext'; 

// Import delle schermate
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddCarScreen from '../screens/AddCarScreen';
import SpeseScreen from '../screens/spese/SpeseScreen';
import DettaglioSpesa from '../screens/spese/DettaglioSpesaScreen';
import ModificaSpeseScreen from '../screens/spese/ModificaSpeseScreen';
import ScadenzeScreen from '../screens/scadenze/ScadenzeScreen';
import ScadenzaDettaglioScreen from '../screens/scadenze/ScadenzaDettaglioScreen';
import ModificaScadenzaScreen from '../screens/scadenze/ModificaScadenzaScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AggiungiScreen from '../screens/AggiungiScreen';

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


// Home con drawer
function HomeDrawer() {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            color={colors.text}
            style={{ marginLeft: 15 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
      })}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name="Aggiungi Auto" component={AddCarScreen} />
    </Drawer.Navigator>
  );
}

// Stack per Scadenze
function ScadenzeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScadenzeHome" component={ScadenzeScreen} options={{ title: 'Scadenze' }} />
      <Stack.Screen name="ScadenzaDettaglio" component={ScadenzaDettaglioScreen} options={{ title: 'Dettaglio Scadenza' }} />
      <Stack.Screen name="ModificaScadenza" component={ModificaScadenzaScreen} options={{ title: 'Modifica Scadenza' }} />
    </Stack.Navigator>
  );
}

// Stack per Spese
function SpeseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SpeseScreen" component={SpeseScreen} options={{ title: 'Spese' }} />
      <Stack.Screen name="DettaglioSpesa" component={DettaglioSpesa} options={{ title: 'Dettaglio Spesa' }} />
      <Stack.Screen name="ModificaSpesa" component={ModificaSpeseScreen} options={{ title: 'Modifica Spesa' }} />
    </Stack.Navigator>
  );
}

// Bottom Tab principale
function BottomTabs() {
  const { theme, isDark } = useThemeContext();
  const colors = theme.colors;

  // Colore per il tema chiaro o scuro
  const activeTintColor = '#007bff'; // Blu per l'icona attiva
  const inactiveTintColor = isDark ? '#ffffff' : '#d1d1d1'; // Colore più chiaro per tema chiaro

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Storico':
              iconName = 'wallet-outline';
              break;
            case 'Scadenze':
              iconName = 'calendar-outline';
              break;
            case 'Aggiungi':
              iconName = 'add-circle-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: activeTintColor,  // Usando il blu #007bff
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: { backgroundColor: colors.card },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeDrawer} />
      <Tab.Screen name="Storico" component={SpeseStack} />
      <Tab.Screen name="Scadenze" component={ScadenzeStack} />
      <Tab.Screen name="Aggiungi" component={AggiungiScreen} options={{ title: 'Aggiungi' }} />
    </Tab.Navigator>
  );
}

  
  

// Navigatore principale con Theme Context
function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} // Rimuove l'header dalla schermata di registrazione
      />
      <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export { RootNavigation };

