import * as api from './api';
import AsyncStorageStatic from "@react-native-async-storage/async-storage";

let keys = null;

export const createMessage = async ({ receiverPublicKey, privateMessage, publicMessage }) => {
    const { privateKey: senderPrivateKey } = await getKeys();
    return api.createMessage({ senderPrivateKey, receiverPublicKey, privateMessage, publicMessage });
};

export const getPrivateMessage = async ({ senderPublicKey, publicMessage }) => {
    const { privateKey: receiverPrivateKey } = await getKeys();
    return api.getPrivateMessage({ senderPublicKey, receiverPrivateKey, publicMessage });
}

export const getMessages = async () => {
    const { privateKey } = await getKeys();
    return api.getMessages({ privateKey });
}

export async function getKeys() {
    const keysInStorage = await AsyncStorageStatic.getItem('keys').catch( () => null );
    console.log({keysInStorage});
    if( keysInStorage ){
        return keys = JSON.parse( keysInStorage );
    } else {
        const keysInBackend = await api.createKeyPair();
        await AsyncStorageStatic.setItem('keys', JSON.stringify( keys ));
        keys = keysInBackend;
        return keys;
    }
}