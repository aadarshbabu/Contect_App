
import { ScrollView, Text, StyleSheet, View } from "react-native";

export default function Contect({ first_name, phone, email, id }) {

  const style = StyleSheet.create({
    contectContainer: {
      padding: 20,
      borderWidth: 1,
      borderColor: "#f34f43"
    }
  })

  return (
    <View key={id} style={style.contectContainer}>
      <Text>Name  : {first_name} </Text>
      <Text>Phone : {phone} </Text>
      <Text>Email : {email} </Text>
    </View>

  )




}