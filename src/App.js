import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {Provider, useDispatch, useSelector} from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {persistor, store} from "./store";
import { createMessage, getPrivateMessage, getKeys} from "./api";
import CreateContact from "./components/CreateContact";
import Contacts from "./components/Contacts";
import {PersistGate} from "redux-persist/integration/react";
import {selectMessagesBySenderId} from "./store/messages";
import { keys } from './api';
import Messages from "./components/Messages";
import {HomeScreen} from "./screens/HomeScreen";
import DecryptMessage from "./components/DecryptMessage";
import SharePublicKey from "./components/SharePublicKey";
import CreateMessage from "./components/CreateMessage";

const Stack = createStackNavigator();

export default function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer >
            <Stack.Navigator initialRouteName="Mesemes">
              <Stack.Screen name="Mesemes"        component={HomeScreen} />
              <Stack.Screen name="Contacts"       component={Contacts} />
              <Stack.Screen name="Messages"       component={Messages} />
              <Stack.Screen name="Create contact"  component={CreateContact} />
              <Stack.Screen name="Create message" component={CreateMessage} />
              <Stack.Screen name="Decrypt message" component={DecryptMessage} />
              <Stack.Screen name="Share public key" component={SharePublicKey} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
  );
}