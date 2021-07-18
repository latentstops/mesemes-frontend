import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {Provider, useDispatch, useSelector} from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {persistor, store} from "./store";
import { createMessage, getPrivateMessage, getKeys} from "./api";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
import {PersistGate} from "redux-persist/integration/react";
import {selectMessagesBySenderId} from "./store/messages";
import { keys } from './api';
import Messages from "./components/Messages";

const Stack = createStackNavigator();

export default function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Users">
              <Stack.Screen name="Users" component={UsersScreen} />
              <Stack.Screen name="Messages" component={MessagesScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
  );
}

export function UsersScreen() {
  const dispatch = useDispatch();
  const [ keyPair, setKeyPair ] = useState();
  const [ publicMessageForSend, setPublicMessageForSend ] = useState();
  const [ privateMessageForSend, setPrivateMessageForSend ] = useState();

  const [ publicMessageReceived, setPublicMessageReceived ] = useState();
  const [ privateMessageReceived, setPrivateMessageReceived ] = useState();
  const [ receiverPublicKey, setReceiverPublicKey ] = useState();
  const [ senderPublicKey, setSenderPublicKey ] = useState();

  useEffect(() => {
    getKeys().then( keys => {
      dispatch({type: "GET_KEYS", payload: keys});
      setKeyPair(keys);
    } );
  }, [setKeyPair]);

  const sendCreateMessage = useCallback(() => {
    createMessage({
      publicMessage: publicMessageForSend,
      privateMessage: privateMessageForSend,
      receiverPublicKey,
    }).then( () => alert('success') ).catch((e) => alert('Error: ' + e.message));
  },[publicMessageForSend, privateMessageForSend, receiverPublicKey]);

  const sendGetPrivateMessage = useCallback(() => {
    getPrivateMessage({
      publicMessage: publicMessageReceived,
      senderPublicKey,
    }).then( (res) => alert(JSON.stringify(res?.privateMessage || res?.error)) ).catch((e) => alert(e.message));
  },[publicMessageReceived, senderPublicKey]);
  // const Provider = props => <>{props.children}</>;
  /*return (
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
  )*/
  return (
      <View style={styles.container}>
          {/*<StatusBar barStyle="dark-content" />*/}
          <TextInput style={styles.input}>{keys?.publicKey}</TextInput>
          <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={styles.container}>
                  <CreateUser />
                  <Users />
              </ScrollView>
          </SafeAreaView>
      </View>
  );
}

export function MessagesScreen({ route, navigation }) {
  const routeParams = route.params;
  const messages = useSelector( selectMessagesBySenderId );
  const selectedId = useSelector( state => state.selectedUserId );
  return (
      <Messages/>
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
