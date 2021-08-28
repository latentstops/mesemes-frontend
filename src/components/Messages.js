import React, {useEffect, useMemo, useState} from 'react';
import {
    StyleSheet,
    View,
    Button, ScrollView, Text
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tailwind from "tailwind-rn";
import {Feather} from "@expo/vector-icons";
import {getPrivateMessage} from "../store/messages";
import {useClipBoardText} from "../hooks/useClipBoardText";

const Messages = () => {
    const dispatch = useDispatch();
    const publicMessage = useClipBoardText();
    const senderPublicKey = useSelector(state => state.selectedContactId);
    const allMessages = useSelector(state => state.messages.ids
        .map( id => state.messages.entities[id] )
        .filter(m => [m.receiverPublicKey, m.senderPublicKey].includes(state.selectedContactId) && !m.error)
        .reverse()
    ) || [];
    const [requestDone, setRequestDone] = useState(false);
    useEffect(() => {
        if(!requestDone && publicMessage){
            console.log('getPrivateMessage', JSON.stringify({
                id: Date.now(),
                publicMessage,
                senderPublicKey
            }));

            dispatch(getPrivateMessage({
                id: Date.now(),
                publicMessage,
                senderPublicKey
            }));
            setRequestDone(true);
        }
    },[requestDone, setRequestDone, publicMessage, dispatch]);
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
                    const isNew = diff <= 20000;
                    return (
                        <View style={[
                            tailwind('bg-gray-100 rounded-xl border border-gray-200 mx-2 my-1 p-2 flex'),
                            tailwind( isNew ? 'border-green-300 border-2' : '' )
                        ]}
                              key={message.id}>

                            <View style={tailwind('flex')}>
                                <View style={tailwind('flex flex-row w-full')}>
                                    <Text style={tailwind('text-gray-400 flex-grow')}>public</Text>
                                    <View style={tailwind('flex')}>
                                        <View style={tailwind('flex flex-row')}>
                                            { isNew && <Text style={tailwind('flex')}>new</Text>}
                                            {
                                                message.received
                                                    ? <Feather name="arrow-left" size={14} style={tailwind('text-black text-gray-800')} />
                                                    : <Feather name="arrow-right" size={14} style={tailwind('text-black text-gray-400')} />
                                            }
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