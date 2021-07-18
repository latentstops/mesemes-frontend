import * as api from './api';
import AsyncStorageStatic from "@react-native-async-storage/async-storage";

export let keys = null;

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
    const keysInStoryExists = keysInStorage && keysInStorage !== "null";

    console.log({
        keysInStorage,
        keysInStoryExists,
        typeOf: typeof keysInStorage,
        convertedToBool: Boolean( keysInStorage )
    });

    if( keysInStoryExists ){
        return keys = JSON.parse( keysInStorage );
    } else {
        await createKeyPair();
        await AsyncStorageStatic.setItem('keys', JSON.stringify( keys ));
        return keys;
    }
}

export const setKeys = data => keys = data;

export const createKeyPair = async () => {
    const keysFromBackend = await api.createKeyPair();
    console.log({keysFromBackend});
    keys = keysFromBackend;
    return keysFromBackend;
};
