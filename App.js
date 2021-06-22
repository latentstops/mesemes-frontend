import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import { createMessage, getPrivateMessage, getKeys} from "./api";

export default function App() {
  const [ keyPair, setKeyPair ] = useState();
  const [ publicMessageForSend, setPublicMessageForSend ] = useState();
  const [ privateMessageForSend, setPrivateMessageForSend ] = useState();

  const [ publicMessageReceived, setPublicMessageReceived ] = useState();
  const [ privateMessageReceived, setPrivateMessageReceived ] = useState();
  const [ receiverPublicKey, setReceiverPublicKey ] = useState();
  const [ senderPublicKey, setSenderPublicKey ] = useState();

  useEffect(() => {
    getKeys().then( setKeyPair );
  }, [setKeyPair]);

  const sendCreateMessage = useCallback(() => {
    createMessage({
      publicMessage: publicMessageForSend,
      privateMessage: privateMessageForSend,
      receiverPublicKey,
    }).then( () => alert('success') ).catch(() => alert('error'));
  },[publicMessageForSend, privateMessageForSend, receiverPublicKey]);

  const sendGetPrivateMessage = useCallback(() => {
    getPrivateMessage({
      publicMessage: publicMessageReceived,
      senderPublicKey,
    }).then( (res) => alert(JSON.stringify(res?.privateMessage || res?.error)) ).catch(() => alert('error'));
  },[publicMessageReceived, senderPublicKey]);

  return (
      <SafeAreaView style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="My public key"
            value={keyPair?.publicKey}
        />
        <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
        />

        <TextInput
            style={styles.input}
            placeholder="Receiver public key"
            onChangeText={setReceiverPublicKey}
            value={receiverPublicKey}
        />
        <TextInput
            style={styles.input}
            placeholder="Public message"
            onChangeText={setPublicMessageForSend}
            value={publicMessageForSend}
        />
        <TextInput
            style={styles.input}
            placeholder="Private message"
            onChangeText={setPrivateMessageForSend}
            value={privateMessageForSend}
        />
        <Button title="Create message" style={styles.input} onPress={sendCreateMessage}/>
        <TextInput
            style={styles.input}
            placeholder="Sender public key"
            onChangeText={setSenderPublicKey}
            value={senderPublicKey}
        />
        <TextInput
            style={styles.input}
            placeholder="Public message received"
            onChangeText={setPublicMessageReceived}
            value={publicMessageReceived}
        />
        <Button title="Open message" style={styles.input} onPress={sendGetPrivateMessage}/>
      </SafeAreaView>
    // <View style={styles.container}>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
