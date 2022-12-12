import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet, PermissionsAndroid, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import * as Contacts from 'expo-contacts';

function AddContect({ navigation }) {

    const [contect, setContect] = useState({
        contectName: '',
        contectNumber: ''
    });
    function setContectValue(name) {
        return (value) => {
            console.log(value.length)
            if (+value && value.length > 10 && name == 'contectNumber')
                return
            if (name == 'contectName') {
                setContect((prev) => { return { ...prev, [name]: value } });
            }
            setContect((prev) => { return { ...prev, [name]: value } });
            console.log(value)
        }
    }
    function isValidContectInfo() {
        if (contect.contectName.length > 3 && contect.contectNumber.length == 10) {
            return true;
        }
        return false;
    }

    async function getWritePermission() {
        try {
            console.log("Try to make permisson")
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            )
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("granted")
                return true;
            } else {
                console.log("Denied")
                console.log(granted)
                return false
            }

        } catch (error) {
            console.log("Fail");
            console.log(error)
            return false
        }

    }


    async function SaveContect() {
        console.log("call")
        if (!isValidContectInfo()) {
            Alert.alert("Contect", "Invalid Contect Information")
            return false
        }

        if (await getWritePermission()) {
            console.log("Permission Granted")
            // {"id": "4752", "isPrimary": 0, "label": "mobile", "number": "+91 73005 19548", "type": "2"}
            const [first_name, last_name] = contect.contectName.split(" ");

            console.log(first_name, last_name)
            try {
                const contectDetails = {
                    [Contacts.Fields.FirstName]: first_name,
                    [Contacts.Fields.LastName]: last_name,
                    [Contacts.Fields.ID]: contect.contectNumber,
                    [Contacts.Fields.Name]: contect.contectName,
                    [Contacts.Fields.PhoneNumbers]: [{ id: `test ${contect.contectNumber}`, number: contect.contectNumber, lable: "mobile", }]
                }
                const contactId = await Contacts.addContactAsync(contectDetails);
                console.log(contactId)
                Alert.alert("Contect", "Contect Save SuccessFully")
                navigation.goBack()
            } catch (error) {
                console.log(error)
                Alert.alert("Contect", "Permission Denied" + error.message)
                navigation.goBack();
                return
            }
            Alert.alert("Permission Denied.")

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

            <TextInput name="data" style={styles.inputBoxColor}
                placeholder='Enter a Phone'
                keyboardType='numeric'
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
                onPress={() => SaveContect()}
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