import React from "react";
import {Text, View, StyleSheet, Button} from "react-native";
import {useClipBoardText} from "../hooks/useClipBoardText";

export const CreateContact = props => {

    const clipBoardText = useClipBoardText();
    return (
        <View style={styles.container}>
            <Text h1>Create Contact</Text>
            {/*<Icon/>*/}
            <Button style={styles.fullWidth} title={'Paste Again'}/>
            <Text style={styles.clipBoardTextStyle}>{clipBoardText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%'
    },
    fullWidth: {
        width: 500
    },
    button: {
        width: '100%'
    },
    clipBoardTextStyle: {

    }
});
