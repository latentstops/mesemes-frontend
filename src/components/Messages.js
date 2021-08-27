import React, {useEffect, useMemo, useState} from 'react';
import {
    StyleSheet,
    View,
    Button, TextInput
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createMessage, selectMessagesBySenderId, getPrivateMessage} from '../store/messages';
import {useClipBoardText} from "../hooks/useClipBoardText";
// import {getPrivateMessage} from "../api";

const Messages = () => {
    const dispatch = useDispatch();
    const contact = useSelector(state => state.contacts.entities[state.selectedContactId]);
    const allMessages = useSelector(state => state.messages);
    const sentMessages = useSelector(state =>
        Object.values(state.messages.entities).filter(message => message.sent)
    );
    const receivedMessages = useSelector(state =>
        Object.values(state.messages.entities).filter(message => message.received)
    );
    const [publicMessageForSend, setPublicMessageForSend] = useState();
    const [privateMessageForSend, setPrivateMessage] = useState();
    const clipBoardText = useClipBoardText();
    const [privateMessageReceived, setPrivateMessageReceived] = useState();
    const [publicMessageReceived, setPublicMessageReceived] = useState(clipBoardText);
    const clipboardTextMemoized = useMemo(() => clipBoardText, [clipBoardText]);

    return (
        <View style={styles.dataContainer}>
            <TextInput disabled style={styles.input} value={contact?.id}/>
            <TextInput
                placeholder={'Public message for send'}
                style={styles.input}
                value={publicMessageForSend}
                onChange={e => setPublicMessageForSend(e.nativeEvent.text)}
            />
            <TextInput
                placeholder={'Private message for send'}
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

            <TextInput
                placeholder={'Private message received'}
                style={styles.input}
                value={privateMessageReceived}
                onChange={e => setPrivateMessageReceived(e.nativeEvent.text)}
            />
            <TextInput
                placeholder={'Public message received'}
                style={styles.input}
                value={clipboardTextMemoized || publicMessageForSend}
                onChange={e => setPublicMessageReceived(e.nativeEvent.text)}
            />

            <Button title={'Open'} onPress={() => dispatch(getPrivateMessage({
                id: Date.now(),
                publicMessage: publicMessageReceived,
                senderPublicKey: contact.id
            }))}/>

            {[...sentMessages, ...receivedMessages].map((message) => {
                return (
                    <View style={styles.container} key={message?.id || Date.now()}>
                        <View style={styles.container}>
                            <View style={styles.dataContainer}>
                                <TextInput style={styles.input} value={message?.privateMessage}/>
                            </View>
                            <View style={styles.dataContainer}>
                                <TextInput style={styles.input} value={message?.publicMessage}/>
                            </View>
                            <View style={styles.dataContainer}>
                                <TextInput style={styles.input} value={JSON.stringify(message)}/>
                            </View>

                        </View>
                    </View>
                );
            })}
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
