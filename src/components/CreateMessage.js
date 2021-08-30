import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Button, TextInput, TouchableOpacity, Text, Share
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createMessage} from '../store/messages';
import {useNavigation} from "@react-navigation/core";
import tailwind from "tailwind-rn";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateMessage = () => {
    const [ step, setStep ] = useState(1);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const contact = useSelector(state => state.contacts.entities[state.selectedContactId]);
    const [publicMessage, setPublicMessage] = useState();
    const [privateMessage, setPrivateMessage] = useState();

    useEffect(() => {
        if(step === 3) {
            dispatch(createMessage({
                publicMessage: publicMessage,
                privateMessage: privateMessage,
                receiverPublicKey: contact.id
            }));
            Share.share({ message: publicMessage }).then( () => {
                navigation.navigate('Messages');
            } )
        }
    }, [step, publicMessage, privateMessage]);
    return (
        <View style={styles.dataContainer}>

            { step === 1 && (
                <CreateMessageStep1
                    value={privateMessage}
                    onChange={setPrivateMessage}
                    onNext={() => privateMessage && setStep(2)}
                />
            ) }

            { step === 2 && (
                <CreateMessageStep2
                    value={publicMessage}
                    onChange={setPublicMessage}
                    onNext={() => publicMessage && setStep(3)}
                />
            ) }

        </View>
    );
};

const CreateMessageStep1 = props => {
    return (
        <View style={tailwind('flex items-center')}>
            <TextInput
                placeholder={'Private message'}
                style={tailwind('border w-full')}
                value={props.value}
                onChange={e => props.onChange(e.nativeEvent.text)}
            />
            <TouchableOpacity style={tailwind('flex flex-row p-2')} onPress={props.onNext}>
                <AntDesign name="Safety" size={24} color="black" />
                <Text style={tailwind('text-lg')}>protect message</Text>
            </TouchableOpacity>
        </View>
    );
};

const CreateMessageStep2 = props => {
    return (
        <View style={tailwind('flex items-center')}>
            <TextInput
                placeholder={'Public message'}
                style={tailwind('border w-full')}
                value={props.value}
                onChange={e => props.onChange(e.nativeEvent.text)}
            />
            <TouchableOpacity style={tailwind('flex flex-row p-2')} onPress={props.onNext}>
                <Ionicons name="create-outline" size={24} color="black" />
                <Text style={tailwind('text-lg')}>create message</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateMessage;

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
