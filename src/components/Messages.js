import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button, TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {createMessage, selectMessagesBySenderId} from '../store/messages';

const Messages = () => {
  const dispatch = useDispatch();
  const user = useSelector( state => state.users.entities[state.selectedUserId]);
  const allMessages = useSelector(state => state.messages);
  console.log({allMessages});
  const messages = useSelector( state => Object.values(state.messages.entities).filter( message => message.receiverPublicKey === user.id ) );
  console.log({messages});
  const [publicMessage, setPublicMessage] = useState();
  const [privateMessage, setPrivateMessage] = useState();

  // if (!messages.length) {
  //   return <ActivityIndicator size="large" style={styles.loader} />;
  // }
  console.log({messages});
  return (
    <View style={styles.dataContainer}>
      <TextInput disabled style={styles.input} value={user?.id}/>
      <TextInput style={styles.input} value={privateMessage} onChange={e => setPrivateMessage(e.nativeEvent.text)}/>
      <TextInput style={styles.input} value={publicMessage} onChange={e => setPublicMessage(e.nativeEvent.text)}/>
      <Button title={'Create'} onPress={ () => dispatch(createMessage({ id: Date.now(), publicMessage, privateMessage, receiverPublicKey: user.id })) } />
      {messages.map((message) => {
        return (
          <View style={styles.container} key={message?.id || Date.now()}>
            <View style={styles.container}>
              <View style={styles.dataContainer}>
                <TextInput style={styles.input} value={message?.privateMessage} />
              </View>
              <View style={styles.dataContainer}>
                <TextInput style={styles.input} value={message?.publicMessage} />
              </View>
              <View style={styles.dataContainer}>
                <TextInput style={styles.input} value={JSON.stringify(message?.error)} />
              </View>

            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Messages;

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
    flexDirection: 'column'
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
  }
});
