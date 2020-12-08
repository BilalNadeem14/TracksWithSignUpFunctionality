import React, {useContext} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Context } from '../context/AuthContext';

const AccountScreen = () => {
    const { state, signout } = useContext(Context)
    
    return (
        <View>
            <Text style={{ fontSize: 48 }}>AccountScreen</Text>
            <Button 
              title="Log out" 
              onPress={() => {signout()}} //On the press of this button, the signout action in AuthContext changes the state.token to null
              //which causes the app to rerender and the ternary operator in App.js applies switchNavigation when the value of state.token changes
            />

        </View>
    )
};

const styles = StyleSheet.create({});

export default AccountScreen;