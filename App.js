import React from 'react';
import {  StyleSheet, View, StatusBar} from 'react-native';
import Contect from "./components/Contect"
const curHight = StatusBar.currentHeight
const style = StyleSheet.create({

  appContainer: {
    paddingTop:curHight+10,
    paddingLeft:10,
    paddingRight:10
  }
})

export default function App() {
  return (
      <View style={style.appContainer}>
        <Contect />
      </View>
  );
}
