import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation'

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(Context)
    //console.log(navigation)
    // console.log('state.token in sign in screen: ', state.token)
    React.useEffect(() => {
        const removeErrorMessage = navigation.addListener('focus', () => {
          // do something
          clearErrorMessage()
        });
        return removeErrorMessage;
    }, [navigation])
    return (
        <View style={styles.container}>
            
            <AuthForm 
              headerText="Sign In to your account"
              errorMessage={state.errorMessage}
              contextActionCallBack={signin}    //() => {}
              submitButtonText="Sign In"
              nav={navigation}
              routeName="SignupScreen"
            />
            <NavLink 
              text="Don't have an account? Sign up instead"
              routeName="SignupScreen"
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    }
});

export default SigninScreen;