import React, {MutableRefObject, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/core';
import Header from 'components/Header';
import Button from 'components/Button';
import {BLACK, WHITE} from 'utils/color';
import {fs, hp, wp} from 'utils/size';
import {MEDIUM} from 'utils/font';
import DropDown from 'components/Dropdown';
import BooleanButton from 'components/BooleanButton';
import NumericButton from 'components/NumericButton';

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

const WriteScreen = () => {
  const navigation = useNavigation();
  const awareRef = useRef() as MutableRefObject<KeyboardAwareScrollView>;
  const [usedPhone30MinsBeforeSleep, setUsedPhone30MinsBeforeSleep] =
    useState<boolean>(false);
  const [isEnoughSleep, setIsEnoughSleep] = useState<boolean>(false);

  const onWrite = () => {
    // api call
    // then
    // goBack

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()} title="수면 결과 작성" />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          {
            width: wp('100%'),
          },
        ]}
        ref={awareRef}>
        <Text style={styles.title}>오늘 몇 시간 주무셨나요?</Text>
        <View style={styles.inputWrapper}>
          <DropDown items={timeStartItems} />
          <DropDown items={minuteStartItems} />
        </View>
        <Text style={styles.title}>취침 30분 전에 휴대폰을 사용하시나요?</Text>
        <View style={styles.inputWrapper}>
          <BooleanButton
            value={usedPhone30MinsBeforeSleep}
            expectedValue={true}
            onPress={() => setUsedPhone30MinsBeforeSleep(true)}
            label="네"
          />
          <BooleanButton
            value={usedPhone30MinsBeforeSleep}
            expectedValue={false}
            onPress={() => setUsedPhone30MinsBeforeSleep(false)}
            label="아니요"
          />
        </View>
        <Text style={styles.title}>잠을 충분히 주무셨다고 느끼셨나요?</Text>
        <View style={styles.inputWrapper}>
          <BooleanButton
            value={isEnoughSleep}
            expectedValue={true}
            onPress={() => setIsEnoughSleep(true)}
            label="네"
          />
          <BooleanButton
            value={isEnoughSleep}
            expectedValue={false}
            onPress={() => setIsEnoughSleep(false)}
            label="아니요"
          />
        </View>
        <Text style={styles.title}>오늘 느낀 피곤함은 어느정도인가요?</Text>
        <View style={styles.inputWrapper}>
          {new Array(5).fill(0).map((_, index) => (
            <NumericButton label={index + 1} value={1} />
          ))}
        </View>
        <Button label="시작" top={hp('6.6%')} onPress={onWrite} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: WHITE,
    position: 'relative',
  },
  title: {
    fontSize: fs(14),
    color: BLACK,
    fontFamily: MEDIUM,
    width: wp('84.6%'),
    marginTop: hp('4.3%'),
    marginBottom: hp('1.9%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    width: wp('84.6%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default WriteScreen;
