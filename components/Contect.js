import { Button, FlatList, View, Text } from 'react-native';
import ContectAPI from '../assets/contect';
import ContectList from './ContectLists';
import { useState, useEffect } from 'react';

// Rendrer Item
function rendreContect({ item }) {
  return (
    <ContectList
      id={item?.id}
      first_name={item?.name}
      phone={item?.phoneNumbers ? item?.phoneNumbers[0]?.number : null}
      email="NAN"
    />
  );
}

function Header() {
  return <Text>Contect List</Text>
}

function Footer() {
  return <Text>Footer</Text>
}



export default function Contect({ navigation }) {

  const [toggle, setToggle] = useState(false);
  const [phoneContect, setPhoneContect] = useState([]);



  useEffect(() => {

    async function getContect() {
      const c = await ContectAPI()
      // console.log(c[46])
      // c.forEach(data => {
      //   if (data.name) {

      //     console.log(data)
      //     console.log("  ")
      //   }

      // })

      setPhoneContect(c)
    }
    getContect()
  }, []);
  return (
    <View style={{ padding: 3 }}>

      <Button
        title={!toggle ? 'show contect' : "hide contect"}
        onPress={() => setToggle((prev) => !prev)}
      />
      <Button title='Add Contect' onPress={() => navigation.navigate("AddContect")} />

      {toggle && (
        <FlatList
          data={phoneContect}
          renderItem={rendreContect}
          keyExtractor={(data) => data.id}
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}

        />
      )}
    </View>
  );
}
