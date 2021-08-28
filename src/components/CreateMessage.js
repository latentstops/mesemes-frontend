import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Button, TextInput
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createMessage} from '../store/messages';

const CreateMessage = () => {
    const dispatch = useDispatch();
    const contact = useSelector(state => state.contacts.entities[state.selectedContactId]);
    const [publicMessageForSend, setPublicMessageForSend] = useState();
    const [privateMessageForSend, setPrivateMessage] = useState();
    return (
        <View style={styles.dataContainer}>
            {/*<TextInput disabled style={styles.input} value={contact?.id}/>*/}
            <TextInput
                placeholder={'Public'}
                style={styles.input}
                value={publicMessageForSend}
                onChange={e => setPublicMessageForSend(e.nativeEvent.text)}
            />
            <TextInput
                placeholder={'Private'}
                style={styles.input}
                value={privateMessageForSend}
                onChange={e => setPrivateMessage(e.nativeEvent.text)}
            />

            <Button title={'Create'} onPress={() => dispatch(createMessage({
                id: Date.now(),
                publicMessage: publicMessageForSend,
                privateMessage: privateMessageForSend,
                receiverPublicKey: contact.id
            }))}/>

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
