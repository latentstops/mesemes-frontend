import React, {useEffect} from 'react';
import {
    View,
    ScrollView, Text, TouchableOpacity, Alert
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tailwind from "tailwind-rn";
import {getPrivateMessage, removeMessage} from "../store/messages";
import {useClipBoardText} from "../hooks/useClipBoardText";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Messages = () => {
    const dispatch = useDispatch();
    const publicMessage = useClipBoardText();
    const senderPublicKey = useSelector(state => state.selectedContactId);
    const allMessages = useSelector(state => state.messages.ids
        .map( id => state.messages.entities[id] )
        .filter(m => [m.receiverPublicKey, m.senderPublicKey].includes(state.selectedContactId) && !m.error)
        .reverse()
    ) || [];
    useEffect(() => {
        if(publicMessage){
            dispatch(getPrivateMessage({
                publicMessage,
                senderPublicKey
            }));
        }
    },[ publicMessage, dispatch]);
    return (
        <View style={tailwind('bg-gray-300 h-full')}>
            <ScrollView>
                { !allMessages.length && (
                    <View style={tailwind('flex items-center')}>
                        <Text style={tailwind('p-2 text-lg')}>No messages yet!</Text>
                    </View>
                ) }
                { allMessages.map( message => {
                    const diff = Date.now() - message.id;
                    /**
                     * TODO: decide to move hardcoded value to settings
                     * @type {boolean}
                     */
                    const isNew = diff <= 20000;
                    return (
                        <View style={[
                            tailwind('bg-gray-100 rounded-xl border border-gray-300 mx-2 my-1 p-2 flex'),
                            tailwind( isNew ? 'border-gray-800 border-2' : '' )
                        ]}
                              key={message.id}>

                            <View style={tailwind('flex')}>
                                <View style={tailwind('flex flex-row w-full')}>
                                    <Text style={tailwind('text-gray-400 flex-grow')}>public</Text>
                                    <View style={tailwind('flex')}>
                                        <View style={tailwind('flex flex-row')}>
                                            { isNew && <Text style={tailwind('flex')}>NEW</Text>}
                                            {
                                                message.received
                                                    ? <Feather name="arrow-left" size={14} style={tailwind('text-black text-gray-800')} />
                                                    : <Feather name="arrow-right" size={14} style={tailwind('text-black text-gray-400')} />
                                            }
                                            <TouchableOpacity>
                                                <MaterialCommunityIcons name="close" size={14} color="black" onPress={() => {
                                                    Alert.alert(
                                                        "Deleting message",
                                                        "Do you want to delete this message?",
                                                        [
                                                            {
                                                                text: "Cancel",
                                                                onPress: () => console.log("Cancel Pressed"),
                                                                style: "cancel"
                                                            },
                                                            {
                                                                text: "OK",
                                                                onPress: () => {
                                                                    console.log("OK")
                                                                    // console.log('STATE', JSON.stringify(state, null, 2));
                                                                    console.log('MESSAGE', JSON.stringify(message, null, 2));
                                                                    const action = removeMessage(`${message.id}`);
                                                                    console.log({action});
                                                                    dispatch(action);
                                                                }
                                                            }
                                                        ]
                                                    );
                                                }}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <Text style={tailwind('text-black')}>{message.publicMessage}</Text>
                            </View>

                            <View style={tailwind('flex')}>
                                <Text style={tailwind('text-gray-400')}>private</Text>
                                <Text style={tailwind('text-black')}>{message.privateMessage}</Text>
                            </View>

                            <View>
                                <Text>{tryParseDate(message.id)}</Text>
                            </View>

                        </View>
                    );
                } ) }
            </ScrollView>
        </View>
    );
};
function tryParseDate( ms ){
    try {
        return new Date(ms).toString().replace(/GMT.+/, '');
    } catch {
        return '';
    }
}

export default Messages;