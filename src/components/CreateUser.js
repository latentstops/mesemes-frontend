import React, {useCallback, useState} from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {addUser, removeAllUsers} from "../store/users";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [ userPublicKey, setUserPublicKey ] = useState('qweasdzxc');
  const [ name, setName ] = useState('noname');

  const createUser = useCallback(() => {
    dispatch(addUser({id: userPublicKey, name: name}));
  },[userPublicKey, name]);

  const deleteAll = useCallback(() => {
    dispatch(removeAllUsers());
  },[userPublicKey, name]);

  return (
    <View style={styles.container}>
      <TextInput onChange={e => setUserPublicKey(e.nativeEvent.text)} value={userPublicKey}/>
      <TextInput onChange={e => setName(e.nativeEvent.text)} value={name}/>
      <Button title={'Create User'} onPress={createUser} />
      <Button title={'Delete All'} onPress={deleteAll} />
    </View>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#000000'
  }
});
