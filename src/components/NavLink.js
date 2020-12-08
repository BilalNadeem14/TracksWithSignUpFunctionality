import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spacer from './Spacer'
//import { withNavigation } from 'react-navigation'
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ text, routeName }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)} >
            <Text style={{color: 'blue', marginLeft: 10}}>
                {text}(navigate by useNavigation hooks inside NavLink.js)
            </Text>
        </TouchableOpacity>
    )

}
//If you have already signed up then click here
//SigninScreen
const styles = StyleSheet.create({})

export default NavLink