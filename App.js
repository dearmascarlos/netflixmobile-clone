/**
 * Variant: release
 * 
Config: debug
Store: C:\Users\CDEARMASDE001\Desktop\netflixmobile\android\app\debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: martes, 30 de abril de 2052
 * 
password_user
Carlos1234*
 * 
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {useState, useEffect} from 'react';
import tw from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeIcon} from 'react-native-heroicons/outline';
import {StarIcon} from 'react-native-heroicons/outline';
import {HomeIcon as HomeIconSolid} from 'react-native-heroicons/solid';
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';
import {RocketLaunchIcon} from 'react-native-heroicons/outline';
import {RocketLaunchIcon as RocketLaunchIconSolid} from 'react-native-heroicons/outline';
import {ToastProvider} from 'react-native-toast-notifications';

import {Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';

import SignUp from './screens/signup';
import SignIn from './screens/signin';
import PasswordRecovery from './screens/passwordRecovery';
import Home from './screens/home';
import TopRated from './screens/topRated';
import Discover from './screens/discover';
import Profile from './screens/profile';

// Root Stack envuelve todo la app
const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        options={{
          headerShown: false,
        }}
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />
      <Stack.Screen
        name="PasswordRecovery"
        options={{
          headerShown: false,
        }}
        component={PasswordRecovery}
      />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return focused ? (
              <HomeIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <HomeIcon color={tw.color('gray-400')} size={20} />
            );
          } else if (route.name === 'TopRated') {
            return focused ? (
              <StarIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <StarIcon color={tw.color('gray-400')} size={20} />
            );
          } else if (route.name === 'Discover') {
            return focused ? (
              <RocketLaunchIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <RocketLaunchIcon color={tw.color('gray-400')} size={20} />
            );
          }
        },
        tabBarStyle: {
          backgroundColor: tw.color('gray-950'),
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          marginTop: -10,
          marginBottom: 7,
        },
      })}
    >
      <Tabs.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name={'TopRated'}
        component={TopRated}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name={'Discover'}
        component={Discover}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

function App() {
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    console.log('USER:', user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <ToastProvider
      placement="top"
      swipeEnabled={true}
      offsetTop={68}
      animationDuration={100}
      duration={4000}
      renderType={{
        info: toast => (
          <View
            style={tw.style(
              'relative flex flex-col w-10/12 pr-4 pl-8 py-3 bg-white rounded-2xl shadow-sm shadow-gray-800 shadow-offset-[0px]/[6px] shadow-radius-2 shadow-opacity-5',
              {borderLeftColor: '#2979FF'},
            )}
          >
            <View style={tw`absolute w-2 h-2 bg-orange-500 rounded-full left-[14px] top-[21px]`}></View>
            <Text style={tw`text-base text-orange-500`}>
              {toast.message}
            </Text>
            <Text style={tw`text-sm text-gray-600`}>
              {toast.data.subtitle}
            </Text>
          </View>
        ),
      }}
    >
      <NavigationContainer>
        <RootStack.Navigator>
          {!user ? (
            <RootStack.Screen
              name={'Auth'}
              component={AuthNavigator}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <RootStack.Group>
              <RootStack.Screen
                name={'HomeTabs'}
                component={HomeTabs}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen 
                name={'Profile'} 
                component={Profile}
              />
            </RootStack.Group>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

export default App;
