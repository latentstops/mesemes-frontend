import React, {useEffect, useState} from "react";
import {getKeys} from "../api";
import {Share, Text, TextInput, TouchableOpacity, View} from "react-native";
import tailwind from "tailwind-rn";
import QRCode from "react-native-qrcode-svg";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const SharePublicKey = () => {
    const [ key, setKey ] = useState(null);
    useEffect(() => {
        getKeys().then( keys => setKey( keys.publicKey ) )
    },[]);

    return (
        <View style={tailwind('flex justify-center items-center h-full')}>
            <TouchableOpacity onPress={() => Share.share({message: key})}>
                { key && <QRCode size={300} value={`mesemes://${key}`}/> }
            </TouchableOpacity>
        </View>
    );
};

export default SharePublicKey;