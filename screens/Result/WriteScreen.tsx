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
import api from 'api';
import {getToken} from 'api/jwt';
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

const WriteScreen = () => {
  const navigation = useNavigation();
  const awareRef = useRef() as MutableRefObject<KeyboardAwareScrollView>;
  const [usedPhone30MinsBeforeSleep, setUsedPhone30MinsBeforeSleep] =
    useState<boolean>(false);
  const [isEnoughSleep, setIsEnoughSleep] = useState<boolean>(false);
  const [hour, setHour] = useState<string>('0');
  const [minute, setMinute] = useState<string>('0');
  const [tirednessLevel, setTirednessLevel] = useState(1);

  const onWrite = async () => {
    try {
      const token = await getToken();
      const response = await api.post(
        '/sleep',
        {
          slept_time: makeHHMM(hour, minute),
          is_enough_sleep: isEnoughSleep,
          used_phone_30_mins_before_sleep: usedPhone30MinsBeforeSleep,
          tiredness_level: tirednessLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        navigation.goBack();
      }
    } catch (error) {}
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
          <DropDown items={timeStartItems} value={hour} setValue={setHour} />
          <DropDown
            items={minuteStartItems}
            value={minute}
            setValue={setMinute}
          />
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
          {new Array(5).fill(0).map((_, index) => {
            const onPress = () => setTirednessLevel(index + 1);
            return (
              <NumericButton
                label={index + 1}
                value={tirednessLevel}
                onPress={onPress}
              />
            );
          })}
        </View>
        <Button label="작성하기" top={hp('6.6%')} onPress={onWrite} />
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
