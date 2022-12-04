import { ScrollView, Text, Button, Alert, FlatList } from 'react-native';
import ContectAPI from '../assets/contect';
import ContectList from './ContectLists';
import { useState, useEffect } from 'react';


//Render context
function rendreContect({ item }) {
  return (
    <ContectList
      key={item?.id}
      first_name={item?.name}
      phone={item?.phoneNumbers ? item?.phoneNumbers[0]?.number : null}
      email="NAN"
    />
  );
}




export default function Contect() {

  const [toggle, setToggle] = useState(false);
  const [phoneContect, setPhoneContect] = useState([]);


  useEffect(() => {

    async function getContect() {
      const c = await ContectAPI()
      // console.log(c[46])
      setPhoneContect(c)
    }
    getContect()
  }, []);




  return (
    <ScrollView>

      <Button
        title={!toggle ? 'show contect' : "hide contect"}
        onPress={() => setToggle((prev) => !prev)}
      />


      {toggle && (
        <FlatList
          data={phoneContect}
          renderItem={rendreContect}
          keyExtractor={(data) => data.id}
          ListHeaderComponent={ContentThatGoesAboveTheFlatList}
          ListFooterComponent={ContentThatGoesBelowTheFlatList}
        />
      )}
    </ScrollView>
  );
}
