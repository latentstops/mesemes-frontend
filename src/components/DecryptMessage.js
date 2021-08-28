import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Button, TextInput, TouchableOpacity, Text
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPrivateMessage} from '../store/messages';
import {useClipBoardText} from "../hooks/useClipBoardText";
import tailwind from "tailwind-rn";
import {useNavigation} from "@react-navigation/core";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const DecryptMessage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const clipBoardText = useClipBoardText();
    const contact = useSelector(state => state.contacts.entities[state.selectedContactId]);
    const [publicMessageReceived, setPublicMessageReceived] = useState(clipBoardText);
    useEffect(() => setPublicMessageReceived(clipBoardText), [clipBoardText]);

    return (
        <View style={tailwind('flex items-center')}>
            <TextInput style={tailwind('border w-full')}
                       value={publicMessageReceived}
                       onChange={e => {
                           console.log('onChange', e);
                           setPublicMessageReceived(e.nativeEvent.text);
                       }}
            />

            <TouchableOpacity style={tailwind('flex flex-row p-2')} onPress={() => {
                dispatch(getPrivateMessage({
                    publicMessage: publicMessageReceived,
                    senderPublicKey: contact.id
                }));
                navigation.navigate('Messages');
            }}>
                <MaterialCommunityIcons name="message-lock" size={24} color="gray" />
                <Text style={tailwind('text-lg')}>decrypt message</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DecryptMessage;

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
