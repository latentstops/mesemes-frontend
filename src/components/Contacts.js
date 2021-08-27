import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, removeContact, selectAllContacts } from '../store/contacts';
import { useNavigation } from "@react-navigation/core";
import tailwind from "tailwind-rn";
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";

const Contacts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);

  if (!contacts.length) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const navigateToMessages = contact => () => {
    dispatch({ type: 'SELECT_CONTACT', payload: contact.id });
    navigation.navigate('Messages', contact);
  }
  return (
    <ScrollView>
      {contacts.map(contact => {
        return (
            <View key={contact.id} style={tailwind('p-2 flex-row')}>

              <TouchableOpacity style={tailwind('flex-row flex-grow')} onPress={navigateToMessages(contact)}>

                <View style={tailwind('flex-none bg-gray-300 w-12 h-12 px-2 py-2 rounded-full')}>
                  <MaterialCommunityIcons name="message-text-clock" size={32} style={tailwind('text-black')} />
                </View>

                <View style={tailwind('px-2 flex-grow')}>
                  <Text style={tailwind('font-bold text-base')}>{contact.name}</Text>
                  <Text style={tailwind('text-base')}>{contact.id}</Text>
                </View>

              </TouchableOpacity>

              <TouchableOpacity style={tailwind('flex-none py-2 ')} onPress={() => dispatch(removeContact(contact.id))}>
                <Feather name='x-circle' size={24} />
              </TouchableOpacity>

            </View>
        );

      })}
    </ScrollView>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10
  },
  dataContainer: {
    flexDirection: 'row'
  }
});
