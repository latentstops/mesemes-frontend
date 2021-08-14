import React, {useCallback, useEffect, useState} from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {addUser, removeAllUsers} from "../store/users";
import tailwind from 'tailwind-rn';

const CreateUser = () => {
  const dispatch = useDispatch();
  const [ clipBoardText, setClipboardText ] = useState('');
  const [ userPublicKey, setUserPublicKey ] = useState('ba95c3ef-af07-483b-81c6-71a981fcbd12');
  const [ name, setName ] = useState('Web Test');

  const createUser = useCallback(() => {
    dispatch(addUser({id: userPublicKey, name: name}));
  },[userPublicKey, name]);

  const deleteAll = useCallback(() => {
    dispatch(removeAllUsers());
  },[userPublicKey, name]);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <TextInput onChange={e => setUserPublicKey(e.nativeEvent.text)} value={userPublicKey}/>
        <TextInput onChange={e => setName(e.nativeEvent.text)} value={name}/>
      </View>
      <View style={styles.flex}>
        <Button title={'Create User'} onPress={createUser} />
        <Button title={'Delete All'} onPress={deleteAll} />
      </View>
    </View>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#000000'
  },
  flex: {
    display: 'flex'
  }
});
