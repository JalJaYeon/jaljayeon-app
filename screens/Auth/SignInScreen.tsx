import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BLACK, BLUE, TRANSPARENT, WHITE} from 'utils/color';
import {fs, hp, wp} from 'utils/size';
import {BOLD, MEDIUM} from 'utils/font';
import Input from 'components/Input';
import Button from 'components/Button';
import JalJaYeon from 'assets/images/jaljayeon.svg';

const SignInScreen = () => {
  const navigation = useNavigation();

  const onSignIn = () => {
    navigation.navigate('OnboardingScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <JalJaYeon style={styles.logo} />
      <Input top={hp('8.42%')} placeholder="아이디" />
      <Input top={hp('2.4%')} placeholder="비밀번호" />
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
