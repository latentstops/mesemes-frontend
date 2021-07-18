import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, removeUser, selectAllUsers } from '../store/users';
import { useNavigation } from "@react-navigation/core";

const Users = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  if (!users.length) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
  // console.log(users);
  const navigateToMessages = user => () => {
    dispatch({ type: 'SELECT_USER', payload: user.id });
    navigation.navigate('Messages', user);
  }
  return (
    <View>
      {users.map((user) => {
        return (
          <View style={styles.container} key={user.id}>
            <View onTouchStart={ navigateToMessages(user) }>
              <View style={styles.dataContainer}>
                <Text>
                  {user.name}
                </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text>
                  {user.id}
                </Text>
              </View>

            </View>
            <Button title={'Delete'} onPress={ () => dispatch(removeUser(user.id)) } />
          </View>
        );
      })}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10
  },
  dataContainer: {
    flexDirection: 'row'
  }
});
