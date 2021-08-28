import React from 'react';
import {Provider, useSelector} from "react-redux";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Text, TouchableOpacity, View} from "react-native";
import tailwind from "tailwind-rn";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";


import {persistor, store} from "./store";
import CreateContact from "./components/CreateContact";
import Contacts from "./components/Contacts";
import {PersistGate} from "redux-persist/integration/react";
import Messages from "./components/Messages";
import {HomeScreen} from "./screens/HomeScreen";
import DecryptMessage from "./components/DecryptMessage";
import SharePublicKey from "./components/SharePublicKey";
import CreateMessage from "./components/CreateMessage";
import {selectContactById} from "./store/contacts";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Mesemes">
                        <Stack.Screen name="Mesemes" component={HomeScreen}/>
                        <Stack.Screen name="Contacts" component={Contacts}/>
                        <Stack.Screen name="Create contact" component={CreateContact}/>
                        <Stack.Screen name="Create message" component={CreateMessage}/>
                        <Stack.Screen name="Decrypt message" component={DecryptMessage}/>
                        <Stack.Screen name="Share public key" component={SharePublicKey}/>
                        <Stack.Screen name="Messages"
                                      component={Messages}
                                      options={{
                                          headerTitle: props => <CreateMessageHeaderTitleComponent {...props} />
                                      }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

const CreateMessageHeaderTitleComponent = props => {
    const navigation = useNavigation();
    const contactId = useSelector(state => state.selectedContactId);
    const contact = useSelector(state => selectContactById(state, contactId));
    const navigateToDecryptMessage = () => navigation.navigate('Decrypt message');
    const navigateToCreateMessage = () => navigation.navigate('Create message');
    return (
        <View style={tailwind('flex flex-row justify-start')}>
            <Text style={tailwind('flex-grow text-lg text-black font-bold')}>{contact.name} {props.children}</Text>
            <TouchableOpacity onPress={navigateToDecryptMessage}>
                <MaterialCommunityIcons style={tailwind('px-2')} name="message-lock" size={25} color="gray"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToCreateMessage}>
                <MaterialCommunityIcons style={tailwind('px-2')} name="message-text-lock-outline" size={25}
                                        color="black"/>
            </TouchableOpacity>
        </View>
    );
};