import React, { useMemo, useState} from 'react';
import {
    StyleSheet,
    View,
    Button, TextInput, ScrollView, Text
} from 'react-native';
import {useSelector} from 'react-redux';
import tailwind from "tailwind-rn";
import {Feather} from "@expo/vector-icons";

const Messages = ({ navigation }) => {
    const navigateToDecryptMessage = () => navigation.navigate('Decrypt message');
    const navigateToCreateMessage = () => navigation.navigate('Create message');
    const allMessages = useSelector(state => state.messages.ids
        .map( id => state.messages.entities[id] )
        .filter(m => [m.receiverPublicKey, m.senderPublicKey].includes(state.selectedContactId) && !m.error)
        .reverse()
    ) || [];
    // console.log(allMessages[0])
    return (
        <View style={tailwind('bg-gray-300 h-full')}>
            <Button title={'Create Message'} onPress={navigateToCreateMessage} />
            <Button title={'Decrypt Message'} onPress={navigateToDecryptMessage}/>

            <ScrollView>
                { allMessages.map( message => (
                    <View style={tailwind('bg-gray-100 rounded-xl border border-gray-200 mx-2 my-1 p-2 flex')} key={message.id}>

                        <View style={tailwind('flex')}>
                            <View style={tailwind('flex flex-row w-full')}>
                                <Text style={tailwind('text-gray-400 flex-grow')}>public</Text>
                                <View style={tailwind('flex justify-center')}>
                                    <View style={tailwind('flex justify-end')}>
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



                    </View>
                ) ) }
            </ScrollView>
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
