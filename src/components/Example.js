import React from "react";
import CreateUser from './CreateUser';
import Users from './Users';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";

export const Example = () => {
    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}>
                    <CreateUser />
                    <Users />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
});
