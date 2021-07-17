import React, {MutableRefObject, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from 'components/Header';
import Input from 'components/Input';
import {BLACK, WHITE} from 'utils/color';
import {fs, hp, wp} from 'utils/size';
import {MEDIUM} from 'utils/font';
import DropDown from 'components/Dropdown';
import Button from 'components/Button';

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
  const navigate = useNavigation();
  const awareRef = useRef() as MutableRefObject<KeyboardAwareScrollView>;

  const _scrollToInput = (reactNode: React.ReactNode) => {
    awareRef.current.scrollToFocusedInput(reactNode as Object);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        ref={awareRef}>
        <Header onPress={() => navigate.goBack()} title="회원가입" />
        <Input
          top={hp('2.8%')}
          placeholder="이름"
          scrollToInput={_scrollToInput}
        />
        <Input
          top={hp('2.4%')}
          placeholder="아이디"
          scrollToInput={_scrollToInput}
        />
        <Input
          top={hp('2.4%')}
          placeholder="비밀번호"
          scrollToInput={_scrollToInput}
        />
        <Input
          top={hp('2.4%')}
          placeholder="몸무게 (단위: KG)"
          scrollToInput={_scrollToInput}
        />
        <Text style={styles.title}>평소 취침 시작 시각</Text>
        <View style={styles.dropdownWrapper}>
          <DropDown items={timeStartItems} />
          <DropDown items={minuteStartItems} />
        </View>
        <Text style={styles.title}>평소 취침 시간</Text>
        <View style={styles.dropdownWrapper}>
          <DropDown items={hourItems} />
          <DropDown items={minuteItems} />
        </View>
        <Button top={hp('5.1%')} label="가입" />
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
