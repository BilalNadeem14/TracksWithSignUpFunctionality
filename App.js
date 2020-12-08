import React, {useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer'

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext'
//import { setNavigator } from './src/navigationRef'
import { Context as AuthContext } from './src/context/AuthContext'


const Stack = createStackNavigator();

const Tabs = createBottomTabNavigator(); //TrackStack + TrackCreateScreen + AccountScreen

const AuthStack = createStackNavigator();

const TrackStack = createStackNavigator(); // TrackList and TrackDetails
// component={SignupScreen}
const AuthStackScreen = ({func}) => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignupScreen" options={{headerShown: false}} >
      {({navigation}) => <SignupScreen func={func} navigation={navigation}/>}
    </AuthStack.Screen>
    <AuthStack.Screen name="SigninScreen" component={SigninScreen} options={{headerShown: false}}/>
  </AuthStack.Navigator>
)
// {props => <HomeScreen {...props} extraData={someData} />}
const TrackStackScreen = () => (
  <TrackStack.Navigator>
    <TrackStack.Screen  name="TrackListScreen" component={TrackListScreen} />
    <TrackStack.Screen  name="TrackDetailScreen" component={TrackDetailScreen} />
  </TrackStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Track Stack Navigator" component={TrackStackScreen} />
    <Tabs.Screen name="TrackCreateScreen" component={TrackCreateScreen} />
    <Tabs.Screen name="AccountScreen" component={AccountScreen} />
  </Tabs.Navigator>
)

function App() {  
  const { state } = useContext(AuthContext)
  console.log('app.js', state.token)
  const [bool, setBool] = useState(false);

  const callBackFunc = () => {
    //return bool
    console.log('callBackFunc called, from app.js ref passed to signup action in AuthContext')
    setBool(!bool)
  }

  return (
    <>
    {/* <SignupScreen bool = {bool} /> */}
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {state.token || state.token == 'logged in' ? (  //bool
          <>
            <Stack.Screen name="Home" component={TabsScreen} />
          </>
        ) : (
          <Stack.Screen name="loginFlow" >
            {() => <AuthStackScreen func={callBackFunc} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>

    </>

    );
}
// component={AuthStackScreen}


/*
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

export default () => {
  return (
    <AuthProvider>
      <App //ref={(navigator) => { setNavigator(navigator) }} 
      />
    </AuthProvider>
  )
}