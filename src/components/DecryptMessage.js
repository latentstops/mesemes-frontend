import React, {useEffect, useMemo, useState} from 'react';
import {
    StyleSheet,
    View,
    Button, TextInput, ScrollView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPrivateMessage} from '../store/messages';
import {useClipBoardText} from "../hooks/useClipBoardText";
import tailwind from "tailwind-rn";
// import {getPrivateMessage} from "../api";

const DecryptMessage = () => {
    const dispatch = useDispatch();
    const clipBoardText = useClipBoardText();
    const selectedContactId = useSelector(state => state.selectedContactId);
    const contact = useSelector(state => state.contacts.entities[state.selectedContactId]);
    const [privateMessageReceived, setPrivateMessageReceived] = useState();
    const [publicMessageReceived, setPublicMessageReceived] = useState(clipBoardText);
    useEffect(() => setPublicMessageReceived(clipBoardText), [clipBoardText]);

    return (
        <View style={styles.dataContainer}>
            <TextInput style={styles.input}
                       value={publicMessageReceived}
                       onChange={e => {
                           console.log('onChange', e)
                           setPublicMessageReceived(e.nativeEvent.text)}
                       }/>

            {/*<TextInput*/}
            {/*    placeholder={'Private message received'}*/}
            {/*    style={styles.input}*/}
            {/*    value={privateMessageReceived}*/}
            {/*/>*/}

            <Button title={'Decrypt'} onPress={() => dispatch(getPrivateMessage({
                id: Date.now(),
                publicMessage: publicMessageReceived,
                senderPublicKey: contact.id
            }))}/>
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
