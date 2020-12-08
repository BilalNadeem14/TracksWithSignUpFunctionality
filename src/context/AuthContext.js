import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
//import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
//yarn add @react-native-async-storage/async-storage
//import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'logout':
            return {...state, token: action.payload}
        case 'add_error':
            return { ...state, errorMessage: action.payload }
            // case 'remove_error':
            //     return { ...state, errorMessage: action.payload }
        case 'signup':
            return {...state, errorMessage: '', token: action.payload}
        case 'signin':     
            return {...state, errorMessage: '', token: action.payload}
        case 'clear_error_message':
            return {...state, errorMessage: ''}  
        default:
            return state;
    }
}

const tryLocalSignin = dispatch => async () => {
    const token = AsyncStorage.getItem('token')
}


//In sign up I could update the state and add 2 keys email and passwrod
//initialized by the values entered by the user
//And then I could perform signin by entering the same 2 keys
//I could validate the email and pass in the reducerFunc and make a case
//where if email==state.email && pass==state.pass then update the value of token
const signup = (dispatch) => {
    return async ({ email, password, callBack }) => {   // add keyword async
        //make api request to sign up with that email and password

        //if we sign up, then we have to modify our state, and print that we are signed up OR authenticated 
        //if signing in fails, we need to show an error msg
/*        try {
            const response = await trackerApi.post('/signup', {email, password})
            // console.log(response.data)
            dispatch({ type: 'signup', payload: response.data.token})
        } catch (err) {
            // console.log(err.message)
            // console.log(err.response.data)
            dispatch({ type: 'add_error', payload: 'something went wrong with sign up' })
        }
*/
        const response = {
            data: {
                token: 'logged in'
            }
        }        

        console.log('email', email, "\nPassword: ", password)
        if (email == 'bilal' && password == 'blue') {
            console.log('sign up done')
            //await AsyncStorage.setItem('token', response.data.token);
            // await AsyncStorage.getItem('token');
            //dispatch({ type: 'remove_error', payload: '' })
            dispatch({ type: 'signup', payload: response.data.token})
            callBack()
            //if (callBack) {
                //console.log('callBack')
                //callBack()
            //}
            //navigate('SigninScreen')       
        }
        else {
            console.log('error')
            dispatch({ type: 'add_error', payload: 'something went wrong with sign up' })
        }
    
    }
}

const signin = (dispatch) => async ({ email, password, }) => {  //here, an implicit return would be done
        // Try to signin in
        //Handle success by updating state and signing in 
        //Handle failure by showing error msg
/*        try {
            const response = await trackerApi.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token)
            await AsyncStorage.getItem('token')
            dispatch({ type: 'signin', payload: response.data.token})

        } catch (err) {
            dispatch({ 
                type: 'add_error', 
                payload: 'something went wrong with sign up' })
        }
*/
        const response = {
            data: {
                token: 'logged in'
            }
        }

        console.log('email', email, "\nPassword: ", password)
        if (email == 'bilal' && password == 'blue') {
            console.log('sign up done')
            await AsyncStorage.setItem('token', response.data.token);
            console.log('printing AsyncStorage',await AsyncStorage.getItem('token'))
            //dispatch({ type: 'remove_error', payload: '' })
            dispatch({ type: 'signin', payload: response.data.token})
            //I'm not using callBack() to change the value of bool, instead i'll change the state.token value from null to logged in, then in the App.js the screen will perform switchNavigation using the ternary operator
            //callBack()
            //if (callBack) {
                //console.log('callBack')
                //callBack()
            //}
            //navigate('SigninScreen')       
        }
        else {
            console.log('error')
            dispatch({ type: 'add_error', payload: 'something went wrong with sign up' })
        }

    }

const signout = (dispatch) => {
    return async () => {
        console.log('printing AsyncStorage before signout:',await AsyncStorage.getItem('token'))
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'logout', payload: ''})
        //sign out
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage },
    { token: null, errorMessage: ''  }  //isSignedin: false
)