import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {BLACK, BLUE, TRANSPARENT, WHITE} from 'utils/color';
import {fs, hp, wp} from 'utils/size';
import {BOLD, MEDIUM} from 'utils/font';
import Input from 'components/Input';
import Button from 'components/Button';
import JalJaYeon from 'assets/images/jaljayeon.svg';
import api from 'api';
import {getToken, setToken} from 'api/jwt';
import {chagneUser} from 'store/reducers/user';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    const storageUsername = await AsyncStorage.getItem('username');
    const storagePassword = await AsyncStorage.getItem('password');

    if (storageUsername && storagePassword) {
      try {
        const response = await api.post('/token', {
          username: storageUsername,
          password: storagePassword,
        });

        if (response.status === 200) {
          setToken(response.data);
          await AsyncStorage.setItem('username', storageUsername);
          await AsyncStorage.setItem('password', storagePassword);
          setUser(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const onSignIn = async () => {
    try {
      const response = await api.post('/token', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        setToken(response.data);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        setUser(false);
      }
    } catch (error) {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다.', [
        {text: '확인', onPress: () => {}},
      ]);

      console.log(error.response);
    }
  };

  const setUser = async (isAuthLogin: boolean) => {
    try {
      const token = await getToken();
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(chagneUser(response.data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: isAuthLogin ? 'MainTab' : 'OnboardingScreen',
              },
            ],
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <JalJaYeon style={styles.logo} />
      <Input
        top={hp('8.42%')}
        placeholder="아이디"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        top={hp('2.4%')}
        placeholder="비밀번호"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button label="로그인" top={hp('6.4%')} onPress={onSignIn} />
      <View style={styles.signupWrapper}>
        <Text style={styles.description}>아직 계정이 없으신가요?</Text>
        <TouchableHighlight
          underlayColor={TRANSPARENT}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signup}>회원가입</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  logo: {
    width: wp('26.4%'),
    height: hp('3.8'),
  },
  signupWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('3.8%'),
    marginBottom: hp('5%'),
  },
  description: {
    color: BLACK,
    fontSize: fs(12),
    fontFamily: MEDIUM,
  },
  signup: {
    color: BLUE,
    fontSize: fs(12),
    fontFamily: BOLD,
  },
});

export default SignInScreen;
