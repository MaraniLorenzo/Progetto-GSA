import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; // Aggiungi MaterialIcons per l'icona delle 3 linee

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddCarScreen from '../screens/AddCarScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // Mostra l'header con l'icona delle 3 linee
      }}
    >
      {/* Voce Home con l'icona delle 3 linee */}
      <Drawer.Screen 
        name="HomeDrawer" 
        component={HomeScreen} 
        options={({ navigation }) => ({
          title: 'Home',
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={30}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.openDrawer()} // Apre il drawer
            />
          ),
        })}
      />
      {/* Cambia "Voce2" con "Aggiungi Auto" */}
      <Drawer.Screen name="Aggiungi Auto" component={AddCarScreen} />
      <Drawer.Screen name="Voce3" component={HomeScreen} />
      <Drawer.Screen name="Voce4" component={HomeScreen} />
      <Drawer.Screen name="Voce5" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registrazione' }}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator} // Usa DrawerNavigator come la Home
          options={{ headerShown: false }} // Nessun header per la schermata "Home"
        />
        <Stack.Screen
          name="AddCar"
          component={AddCarScreen} // Aggiungi la schermata AddCar
          options={{ title: 'Aggiungi Auto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
