import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useRef } from 'react'
import * as Contacts from 'expo-contacts';

function AddContect() {

    const phoneNo = useRef()
    const [contect, setContect] = useState({
        contectName: '',
        contectNumber: ''
    });
    function setContectValue(name) {
        return (value) => {
            if (+value && value.length <= 10 && name == 'contectNumber')
                setContect((prev) => { return { ...prev, [name]: value } });
            if (name == 'contectName') {
                setContect((prev) => { return { ...prev, [name]: value } });
            }
        }
    }
    function isValidContectInfo() {
        if (contect.contectName.length > 3 && contect.contectNumber.length == 10) {
            return true;
        }
        return false;
    }


    async function SaveContect() {
        if (!isValidContectInfo())
            return false

        if (!Contacts.isAvailableAsync()) {
            Contacts.getPermissionsAsync()
        }
        const contact = {
            [Contacts.Fields.Name]: contect.contectName,
            [Contacts.Fields.PhoneNumbers]: contect.contectNumber
        }
        try {
            const contactId = await Contacts.addContactAsync(contact);
            console.log(contactId)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View>
            <Text>
                Add a Contect
            </Text>
            {/* INPUT BOX Container */}
            <TextInput style={styles.inputBoxColor}
                placeholder='Enter a Name'
                value={contect.contectName}
                onChangeText={setContectValue("contectName")}

            ></TextInput>

            <TextInput ref={phoneNo} name="data" style={styles.inputBoxColor}
                placeholder='Enter a Phone'
                keyboardType='number-pad'
                value={contect.contectNumber}
                onChangeText={setContectValue("contectNumber")}
            ></TextInput>


            <Button
                color='red'
                style={{
                    padding: 5,
                    margin: 1,
                    borderColor: 'black',
                    borderWidth: 1,
                    backgroundColor: "white",
                    color: "white"
                }}
                onPress={SaveContect}
            > Add Contect </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBoxColor: {
        padding: 10,
        margin: 10,
        borderColor: 'black',
        borderWidth: 1
    },
})


export default AddContect