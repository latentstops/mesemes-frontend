import React from "react";
import {Text, View, StyleSheet, Image, ImageBackground, Button, TouchableOpacity} from "react-native";
import CloudWithIconImage from '../img/cloud-with-key.png';
import KeyIconImage from '../img/key.png';
import SearchIconImage from '../img/search.png';
import MailIconImage from '../img/mail.png';
// import Icon from "react-native-vector-icons/RNIMigration";



export const HomeScreen = ({ navigation }) => {
    // const Icon = () => null;
    return (
        <View style={style.wrapper}>
            <Text h1 style={style.heading}>Mesemes</Text>
            <View style={style.container}>
                <View style={style.menuItemWrapper}>
                    <View style={[style.menuItem,style.menuItemCloud]}>
                        <Image style={style.imageIcon} source={CloudWithIconImage} />
                        <Text style={style.menuItemHeading}>Share your public key</Text>
                        <Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>
                    </View>
                </View>
                <View style={style.menuItemWrapper}>
                    <View style={[style.menuItem,style.menuItemKey]}>
                        <Image style={style.imageIcon} source={KeyIconImage} />
                        <Text style={style.menuItemHeading}>Share your public key</Text>
                        <Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>
                    </View>
                </View>
                <View style={style.menuItemWrapper}>
                    <View style={[style.menuItem,style.menuItemMail]}>
                        <Image style={style.imageIcon} source={MailIconImage} />
                        <Text style={style.menuItemHeading}>Share your public key</Text>
                        <Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>
                    </View>
                </View>
                <View style={style.menuItemWrapper}>
                    <View style={[style.menuItem,style.menuItemSearch]}>
                        <Image style={style.imageIcon} source={SearchIconImage} />
                        <Text style={style.menuItemHeading}>Share your public key</Text>
                        <Text style={style.menuItemParagraph}>with Your friends so that You can be contacted</Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity style={style.buttonNext} onPress={() => navigation.navigate('Users')}>
                {/*<View style={style.buttonNext}>*/}
                {/*    */}
                {/*</View>*/}
                <Text style={style.buttonNextText} >Contacts</Text>
                <Text style={style.buttonNextIcon}> > </Text>
            </TouchableOpacity>
            {/*</Icon>*/}
        </View>
    );
};

const style = StyleSheet.create({
    wrapper: {
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
        padding: 10,
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