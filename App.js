/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import WelcomeScreen from './src/screens/WelcomeScreen.js';
import SalesScreen from './src/screens/SalesScreen.js';
import AppHeader from './src/components/AppHeader.js';
import Icon from 'react-native-fontawesome';
import {colors} from './assets/colors';

const LoggedOutNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: WelcomeScreen,
      navigationOptions: {
        /*
        tabBarIcon: ({focused}) => (
          <Icon
            name="gamepad"
            size={30}
            color={focused ? colors.creme : colors.wafer}
          />
        ),*/
        },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: false,
      upperCaseLabel: false,
      labelStyle: {
        paddingBottom: 0,
        fontSize: 16,
        textTransform: 'lowercase',
      },
      iconStyle: {
        minHeight: 15,
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      pressColor: colors.rhodochrosite,
      activeTintColor: colors.creme,
      inactiveTintColor: colors.wafer,
      indicatorStyle: {
        backgroundColor: colors.rhodochrosite,
      },
      tabStyle: {
        backgroundColor: colors.rhodochrosite,
      },
      style: {
        backgroundColor: colors.rhodochrosite,
      },
    },
  },
);

const MainNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: WelcomeScreen,
      navigationOptions: {
        /*
        tabBarIcon: ({focused}) => (
          <Icon
            name="gamepad"
            size={30}
            color={focused ? colors.creme : colors.wafer}
          />
        ),*/
        },
    },
    Sales: {
      screen: SalesScreen,
      navigationOptions: {
        /*
        tabBarIcon: ({focused}) => (
          <Icon
            name="magic"
            size={30}
            color={focused ? colors.creme : colors.wafer}
          />
        ),*/
      },
    },
  },
  {
    initialRouteName: 'Sales',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: false,
      upperCaseLabel: false,
      labelStyle: {
        paddingBottom: 0,
        fontSize: 16,
        textTransform: 'lowercase',
      },
      iconStyle: {
        minHeight: 15,
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      pressColor: colors.rhodochrosite,
      activeTintColor: colors.creme,
      inactiveTintColor: colors.wafer,
      indicatorStyle: {
        backgroundColor: colors.rhodochrosite,
      },
      tabStyle: {
        backgroundColor: colors.rhodochrosite,
      },
      style: {
        backgroundColor: colors.rhodochrosite,
      },
    },
  },
);


const RootNavigator = createSwitchNavigator(
  {
    loggedOut: LoggedOutNavigator,
    loggedIn: MainNavigator,
  },
  {
    initialRouteName: 'loggedOut',
  },
);

const App = createAppContainer(RootNavigator);

export default App;
