import React, {useEffect, useState} from "react";
import {getKeys} from "../api";
import {Text, TextInput, View} from "react-native";

const SharePublicKey = props => {
    const [ key, setKey ] = useState('');

    useEffect(() => {
        getKeys().then( keys => {
            console.log({publicKey: keys.publicKey});
            setKey( keys.publicKey );
        } );
    },[]);
    return (
        <TextInput value={key}/>
    );
};

export default SharePublicKey;