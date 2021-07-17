import React, {MutableRefObject, useRef, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from 'components/Header';
import Input from 'components/Input';
import {BLACK, WHITE} from 'utils/color';
import {fs, hp, wp} from 'utils/size';
import {MEDIUM} from 'utils/font';
import DropDown from 'components/Dropdown';
import Button from 'components/Button';
import api from 'api';
import {makeHHMM} from 'utils/time';

const timeStartItems = new Array(24).fill(0).map((_, index) => ({
  label: `${index}시`,
  value: index,
  key: `time${index}`,
}));

const minuteStartItems = new Array(60).fill(0).map((_, index) => ({
  label: `${index}분`,
  value: index,
  key: `date${index}`,
}));

const hourItems = new Array(12).fill(0).map((_, index) => ({
  label: `${index}시간`,
  value: index,
  key: `hour${index}`,
}));

const minuteItems = new Array(60).fill(0).map((_, index) => ({
  label: `${index}분`,
  value: index,
  key: `minute${index}`,
}));

const SignUpScreen = () => {
  const navigation = useNavigation();
  const awareRef = useRef() as MutableRefObject<KeyboardAwareScrollView>;
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [name, setName] = useState<string>();
  const [startHour, setStartHour] = useState<string>('0');
  const [startMinute, setStartMinute] = useState<string>('0');
  const [sleepHour, setSleepHour] = useState<string>('0');
  const [sleepMinute, setSleepMinute] = useState<string>('0');

  const _scrollToInput = (reactNode: React.ReactNode) => {
    awareRef.current.scrollToFocusedInput(reactNode as Object);
  };

  const onSignUp = async () => {
    if (!username) {
      Alert.alert('이름을 확인해주세요.');
      return;
    }

    if (username.length < 5) {
      Alert.alert('아이디는 5자 이상이어야 합니다.');
      return;
    }
    if (!password) {
      Alert.alert('비밀번호를 확인해주세요.');
      return;
    }
    if (!name) {
      Alert.alert('이름을 확인해주세요');
      return;
    }

    try {
      const response = await api.post('/users/register', {
        username: username,
        password: password,
        name: name,
        weight_kg: weight,
        average_sleep_time: makeHHMM(sleepHour, sleepMinute),
        bedtime_starts_at: makeHHMM(startHour, startMinute),
      });

      if (response.status === 201) {
        Alert.alert(
          '회원가입이 완료되었습니다.',
          '회원가입이 정상적으로 되었습니다.',
          [
            {
              text: '확인',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        ref={awareRef}>
        <Header onPress={() => navigation.goBack()} title="회원가입" />
        <Input
          top={hp('2.8%')}
          placeholder="이름"
          scrollToInput={_scrollToInput}
          value={name}
          onChangeText={setName}
        />
        <Input
          top={hp('2.4%')}
          placeholder="아이디"
          scrollToInput={_scrollToInput}
          value={username}
          onChangeText={setUsername}
        />
        <Input
          top={hp('2.4%')}
          placeholder="비밀번호"
          scrollToInput={_scrollToInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Input
          top={hp('2.4%')}
          placeholder="몸무게 (단위: KG)"
          scrollToInput={_scrollToInput}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Text style={styles.title}>평소 취침 시작 시각</Text>
        <View style={styles.dropdownWrapper}>
          <DropDown
            items={timeStartItems}
            value={startHour}
            setValue={setStartHour}
          />
          <DropDown
            items={minuteStartItems}
            value={startMinute}
            setValue={setStartMinute}
          />
        </View>
        <Text style={styles.title}>평소 취침 시간</Text>
        <View style={styles.dropdownWrapper}>
          <DropDown
            items={hourItems}
            value={sleepHour}
            setValue={setSleepHour}
          />
          <DropDown
            items={minuteItems}
            value={sleepMinute}
            setValue={setSleepMinute}
          />
        </View>
        <Button top={hp('5.1%')} label="가입" onPress={onSignUp} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: fs(14),
    color: BLACK,
    fontFamily: MEDIUM,
    width: wp('84.6%'),
    marginTop: hp('5.2%'),
    marginBottom: hp('1.9%'),
  },
  dropdownWrapper: {
    flexDirection: 'row',
    width: wp('84.6%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignUpScreen;
