import React from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AggiungiScreen from '../screens/AggiungiScreen';
import AddCarScreen from '../screens/AddCarScreen';

// Spese
import SpeseScreen from '../screens/spese/SpeseScreen'; 
import DettaglioSpesa from '../screens/spese/DettaglioSpesaScreen';
import ModificaSpeseScreen from '../screens/spese/ModificaSpeseScreen'; 

// Scadenze
import ScadenzeScreen from '../screens/scadenze/ScadenzeScreen';
import ScadenzaDettaglioScreen from '../screens/scadenze/ScadenzaDettaglioScreen';
import ModificaScadenzaScreen from '../screens/scadenze/ModificaScadenzaScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Drawer personalizzato
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => <MaterialIcons name="logout" size={size} color={color} />}
        onPress={() => {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
      />
    </DrawerContentScrollView>
  );
}

// Home con drawer
function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            color="black"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
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
    <Stack.Navigator initialRouteName="SpeseScreen">
      <Stack.Screen name="SpeseScreen" component={SpeseScreen} options={{ title: 'Spese' }} />
      <Stack.Screen name="DettaglioSpesa" component={DettaglioSpesa} options={{ title: 'Dettaglio Spesa' }} />
      <Stack.Screen name="ModificaSpesa" component={ModificaSpeseScreen} options={{ title: 'Modifica Spesa' }} />
    </Stack.Navigator>
  );
}

// Bottom tab principale
function BottomTabs() {
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
              iconName = 'time-outline';
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
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeDrawer}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Home',
                    state: {
                      index: 0,
                      routes: [{ name: 'HomeScreen' }],
                    },
                  },
                ],
              })
            );
          },
        })}
      />
      <Tab.Screen
        name="Storico"
        component={SpeseStack}
        options={{
          title: 'Storico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Scadenze" component={ScadenzeStack} />
      <Tab.Screen name="Aggiungi" component={AggiungiScreen} />
    </Tab.Navigator>
  );
}

// Stack principale (Login/Register + BottomTab)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrazione' }} />
        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
