import React, {createRef, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Share} from "react-native";
import {getKeys} from "../api";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import QRCode from 'react-native-qrcode-svg';
import tailwind from "tailwind-rn";


export const HomeScreen = ({ navigation }) => {
    const [shareQR, setShareQR] = useState(false);
    const [publicKey, setPublicKey] = useState(false);
    const navigateToContacts = () => navigation.navigate('Contacts');
    const sharePublicKey = () => {
        getKeys().then( keys => {
            setPublicKey(keys.publicKey);
            setShareQR(true);
        } );
    };
    const navigateToCreateContact = () => navigation.navigate('Create contact');

    return (
        <View style={style.wrapper}>
            { shareQR && <View style={tailwind('flex items-center justify-center h-full' )}>
                <View>
                    <TouchableOpacity style={style.buttonShare} onPress={() => setShareQR(false)}>
                        <Text style={style.buttonNextText}>Back</Text>
                    </TouchableOpacity>
                    <QRCode size={300} value={ publicKey } />
                    <TouchableOpacity style={style.buttonShare} onPress={() => Share.share({message: publicKey})}>
                        <Text style={style.buttonNextText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View> }
            { !shareQR && <View>
                <View style={style.container}>
                    <View style={style.menuItemWrapper}>
                        <TouchableOpacity onPress={sharePublicKey} >
                            <View style={[style.menuItem,style.menuItemCloud]}>
                                <MaterialCommunityIcons name="key-wireless" size={70} color="gray" />
                                <Text style={style.menuItemHeading}>Share your public key</Text>
                                {/*<Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.menuItemWrapper}>
                        <TouchableOpacity onPress={navigateToCreateContact}>
                            <View style={[style.menuItem,style.menuItemKey]}>
                                <MaterialCommunityIcons name="key" size={70} color="gray" />
                                <Text style={style.menuItemHeading}>Paste friends public key</Text>
                                {/*<Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.menuItemWrapper}>
                        <TouchableOpacity onPress={navigateToContacts}>
                            <View style={[style.menuItem,style.menuItemMail]}>
                                <MaterialCommunityIcons name="message-text-lock-outline" size={70}  />
                                <Text style={style.menuItemHeading}>Create protected message</Text>
                                {/*<Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.menuItemWrapper}>
                        <TouchableOpacity onPress={navigateToContacts}>
                            <View style={[style.menuItem,style.menuItemSearch]}>
                                <MaterialCommunityIcons name="message-lock" size={70} color="gray" />
                                <Text style={style.menuItemHeading}>Decrypt protected message</Text>
                                {/*<Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>*/}
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity style={style.buttonNext} onPress={navigateToContacts}>
                    <Text style={style.buttonNextText} >Contacts</Text>
                    <MaterialIcons style={style.buttonNextIcon} name="arrow-forward-ios" size={32} color="green" />
                </TouchableOpacity>
            </View> }
        </View>
    );
};

const style = StyleSheet.create({
    wrapper: {
        backgroundColor: 'gray',
        padding: 10,
        height: '100%'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
    },
    container: {
        flexDirection: "row",
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    menuItemWrapper: {
        width: '50%',
        flexShrink: 0,
        padding: 8,
    },
    menuItem: {
        backgroundColor: '#333',
        height: 200,
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
    },
    menuItemCloud: {
        backgroundColor: '#333',
    },
    menuItemKey: {
        backgroundColor: '#555',
    },
    menuItemMail: {
        backgroundColor: '#999',
    },
    menuItemSearch: {
        backgroundColor: '#000',
    },
    menuItemHeading: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        display: 'flex',
        textAlign: 'center',
        marginTop: 5
    },
    menuItemParagraph: {
        color: '#ccc',
        fontSize: 16,
        display: 'flex',
        marginTop: 5
    },
    imageIcon: {
        width: '100%',
        height: undefined,
        aspectRatio: 135 / 76,
    },
    buttonNext:{
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: '#dedede',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#999',
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto'
    },
    buttonShare:{
        // borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: '#dedede',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#999',
        // marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonNextText: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16
    },
    buttonNextIcon: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        marginLeft: 'auto',

    }
})