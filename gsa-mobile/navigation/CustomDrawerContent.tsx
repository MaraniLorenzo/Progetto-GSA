import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: colors.card }}>
      {/* Header con nome utente */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          backgroundColor: colors.primary,
        }}
      >
        <Ionicons name="person-circle-outline" size={50} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 18, marginLeft: 12 }}>
          Nome Utente
        </Text>
      </View>

      {/* Lista delle voci del drawer */}
      <DrawerItemList {...props} />

      {/* Voci aggiuntive */}
      <DrawerItem
        label="Impostazioni"
        icon={({ size }) => (
          <Ionicons name="settings-outline" size={size} color={colors.primary} />
        )}
        labelStyle={{ color: colors.text }}
        onPress={() => props.navigation.navigate('Settings')}
      />

      <DrawerItem
        label="Logout"
        icon={({ size }) => (
          <MaterialIcons name="logout" size={size} color="#ff6b6b" />
        )}
        labelStyle={{ color: colors.text }}
        onPress={() => {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
