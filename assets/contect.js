import * as Contact from 'expo-contacts';

export default async function ContectAPI() {
  const { status } = await Contact.requestPermissionsAsync();

  if (status === 'granted') {

    const { data } = await Contact.getContactsAsync({
      fields: [Contact.Fields.PhoneNumbers],
    });

    return data

  }
}  
