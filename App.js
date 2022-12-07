import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Contect from "./components/Contect";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddContect from './components/AddContect';
const curHight = StatusBar.currentHeight

const style = StyleSheet.create({

  appContainer: {
    paddingTop: curHight + 10,
    paddingLeft: 10,
    paddingRight: 10
  }
})
export default function App() {
  const StackNavigator = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackNavigator.Navigator>
        <StackNavigator.Screen name="Contect" component={Contect} />
        <StackNavigator.Screen name="AddContect" component={AddContect} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
