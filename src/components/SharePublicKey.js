import React, {useEffect, useState} from "react";
import {getKeys} from "../api";
import {Share, TextInput, View} from "react-native";
import tailwind from "tailwind-rn";

/**
 * TODO: Unused decide to remove
 * @returns {JSX.Element}
 * @constructor
 */
const SharePublicKey = () => {
    const [ key, setKey ] = useState('');
    useEffect(() => {
        getKeys()
            .then( keys => setKey( keys.publicKey ) )
            .then( () => {
                // setTimeout(() => Share.share({message: key}), 1000);
            });
    },[]);

    return (
        <View style={tailwind('flex items-center')}>
            <TextInput style={tailwind('text-lg')} value={key}/>
        </View>
    );
};

export default SharePublicKey;