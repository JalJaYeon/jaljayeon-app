/**
 * JalJaYeon Application
 * https://github.com/JalJaYeon/jaljayeon-app
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Alert, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OneSignal from 'react-native-onesignal';
import TabBar from 'components/TabBar';
import {SignInScreen, SignUpScreen} from 'screens/Auth';
import {OnboardingScreen} from 'screens/Onboarding';
import {HomeScreen, MainResultScreen} from 'screens/Home';
import {ResultScreen, WriteScreen} from 'screens/Result';
import {
  ProfileScreen,
  SettingScreen,
  NoticeScreen,
  NoticeDetailScreen,
  ReportScreen,
} from 'screens/Setting';

import configureStore from 'store';

const store = configureStore();

const RootStack = createStackNavigator<RootStackType>();
const AuthStack = createStackNavigator<AuthStackType>();
const MainTab = createBottomTabNavigator<MainTabType>();
const HomeStack = createStackNavigator<HomeStackType>();
const ResultStack = createStackNavigator<ResultStackType>();
const SettingStack = createStackNavigator<SettingStackType>();

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const HomeNavigator = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="MainResultScreen" component={MainResultScreen} />
  </HomeStack.Navigator>
);

const ResultNavigator = () => (
  <ResultStack.Navigator headerMode="none">
    <ResultStack.Screen name="ResultScreen" component={ResultScreen} />
    <ResultStack.Screen name="WriteScreen" component={WriteScreen} />
  </ResultStack.Navigator>
);

const SettingNavigator = () => (
  <SettingStack.Navigator headerMode="none">
    <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
    <SettingStack.Screen name="ProfileScreen" component={ProfileScreen} />
    <SettingStack.Screen name="NoticeScreen" component={NoticeScreen} />
    <SettingStack.Screen
      name="NoticeDetailScreen"
      component={NoticeDetailScreen}
    />
    <SettingStack.Screen name="ReportScreen" component={ReportScreen} />
  </SettingStack.Navigator>
);

const MainNavigator = () => (
  <MainTab.Navigator
    tabBar={props => <TabBar {...props} />}
    initialRouteName="HomeStack">
    <MainTab.Screen name="HomeStack" component={HomeNavigator} />
    <MainTab.Screen name="ResultStack" component={ResultNavigator} />
    <MainTab.Screen name="SettingStack" component={SettingNavigator} />
  </MainTab.Navigator>
);

const App = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    const oneSignalInit = async () => {
      /* O N E S I G N A L   S E T U P */
      OneSignal.setLogLevel(6, 0);
      OneSignal.setAppId('3e212527-376f-4f5d-a118-ca28736407db');

      OneSignal.promptForPushNotificationsWithUserResponse(response => {
        console.log('Prompt response:', response);
      });
      OneSignal.setNotificationWillShowInForegroundHandler(
        notificationReceivedEvent => {
          console.log(
            'OneSignal: notification will show in foreground:',
            notificationReceivedEvent,
          );
          let notification = notificationReceivedEvent.getNotification();
          console.log('notification: ', notification);
          const data = notification.additionalData;
          console.log('additionalData: ', data);
          const button1 = {
            text: 'Cancel',
            onPress: () => {
              notificationReceivedEvent.complete();
            },
            style: 'cancel',
          };
          const button2 = {
            text: 'Complete',
            onPress: () => {
              notificationReceivedEvent.complete(notification);
            },
          };
          Alert.alert('Complete notification?', 'Test', [button1, button2], {
            cancelable: true,
          });
        },
      );

      OneSignal.setNotificationOpenedHandler(notification => {
        console.log('OneSignal: notification opened:', notification);
      });
      const deviceState = await OneSignal.getDeviceState();

      setIsSubscribed(deviceState.isSubscribed);
    };

    oneSignalInit();
  });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="AuthStack" headerMode="none">
            <RootStack.Screen name="AuthStack" component={AuthNavigator} />
            <RootStack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
            <RootStack.Screen name="MainTab" component={MainNavigator} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
