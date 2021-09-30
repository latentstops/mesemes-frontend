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
            { key && <QRCode size={300} value={`mesemes://${key}`}/> }
            <View style={tailwind('flex w-full')}>
                <TouchableOpacity style={tailwind('bg-gray-400 rounded-lg items-center p-3 mx-11 my-3')} onPress={() => Share.share({message: key})}>
                    <Text style={tailwind('text-white')}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SharePublicKey;