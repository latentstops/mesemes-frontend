import React, {useCallback, useState} from 'react';
import {View, TextInput, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import {addContact, removeAllContacts} from "../store/contacts";
import tailwind from 'tailwind-rn';
import {useClipBoardText} from "../hooks/useClipBoardText";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateContact = ({navigation}) => {
  const dispatch = useDispatch();
  const [ contactPublicKey, setContactPublicKey ] = useState(null);

  const createContact = useCallback(name => {
    if(!name) return;
    dispatch(addContact({id: contactPublicKey, name}));
    navigation.navigate('Contacts');
  },[contactPublicKey]);

  const deleteAll = useCallback(() => {
    dispatch(removeAllContacts());
  },[contactPublicKey]);

  return (
      contactPublicKey
          ? <CreateContactsName onSubmit={createContact}/>
          : <PasteContactsKey onSubmit={setContactPublicKey}/>
  );
};

const PasteContactsKey = props => {
  const { onSubmit } = props;
  const clipBoardText = useClipBoardText();

  return (
      <SafeAreaView style={tailwind('h-full')}>
        <View style={tailwind('pt-12 items-center')}>
          <Ionicons name="key-outline" size={150} color="gray" />
        </View>
        <View style={tailwind('py-6 px-6 items-center')}>

          <View style={tailwind('w-full text-center')}>
            <TouchableOpacity style={tailwind('bg-gray-400 rounded-lg items-center py-3')}>
              <Text style={tailwind('text-white')}>paste again</Text>
            </TouchableOpacity>
          </View>

          <View style={tailwind('py-6')}>
            <Text style={tailwind('font-bold')}>{clipBoardText}</Text>
          </View>

          <View style={tailwind('h-full relative text-center')}>
            <TouchableOpacity style={tailwind('bg-gray-400 rounded-full p-6 my-44')} onPress={() => onSubmit(clipBoardText)}>
              <Feather name="arrow-right" size={20} style={tailwind('text-black')} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}

const CreateContactsName = props => {
  const { onSubmit } = props;
  const [ name, setName ] = useState('');

  return (
      <SafeAreaView style={tailwind('h-full')}>
        <View style={tailwind('pt-12 items-center')}>
          <Ionicons name="key-outline" size={150} color="gray" />
        </View>
        <View style={tailwind('py-6 px-6 items-center')}>

          <View style={tailwind('w-full text-left')}>
            <TouchableOpacity style={tailwind('bg-gray-400 rounded-sm px-1')}>
              <TextInput placeholder="Contact name" style={tailwind('text-white')} value={name} onChange={e => setName(e.nativeEvent.text)}/>
            </TouchableOpacity>
          </View>


          <View style={tailwind('h-full text-center')}>
            <TouchableOpacity style={tailwind('bg-gray-400 rounded-full p-6 my-44')} onPress={() => onSubmit(name)}>
              <Feather name="arrow-right" size={20} style={tailwind('text-black')} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
};

export default CreateContact;
