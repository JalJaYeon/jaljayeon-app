/**
 * JalJaYeon Application
 * https://github.com/JalJaYeon/jaljayeon-app
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
  useEffect(() => {
    SplashScreen.hide();
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
