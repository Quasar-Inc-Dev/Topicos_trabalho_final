import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './scr/screens/Home/homeScreen';
import DetalhesScreen from './scr/screens/Detalhes/detalhesScreen';

const Stack = createNativeStackNavigator<any>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen as any}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen as any}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}