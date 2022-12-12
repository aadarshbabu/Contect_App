import React from 'react';
import Contect from "./components/Contect";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddContect from './components/AddContect';

export default function App() {
  const StackNavigator = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackNavigator.Navigator >
        <StackNavigator.Screen name="Contect" component={Contect} />
        <StackNavigator.Screen name="AddContect" component={AddContect} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
