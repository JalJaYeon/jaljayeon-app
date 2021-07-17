import {useNavigation} from '@react-navigation/native';
import Header from 'components/Header';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BLACK, BLUE, LIGHTGRAY, WHITE} from 'utils/color';
import {MEDIUM} from 'utils/font';
import {fs, hp, wp} from 'utils/size';

const ResultScreen = () => {
  const navigation = useNavigation();
  const [info, setInfo] = useState<ISleepData>({});

  useEffect(() => {
    // api call
    //then
    // setInfo(response.data)
  });

  const onWrite = () => {
    navigation.navigate('WriteScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="오늘의 수면 내용" />
      {info ? (
        <>
          <View style={styles.infoWrapper}>
            <View style={styles.infoInnerWrapper}>
              <Text style={styles.infoLabel}>충분한 수면</Text>
              <Text style={styles.infoLabel}>수면 시간</Text>
              <Text style={styles.infoLabel}>취침 전 휴대폰 사용</Text>
              <Text style={styles.infoLabel}>피곤한 정도</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoInnerWrapper}>
              <Text style={styles.infoValue}>아니요</Text>
              <Text style={styles.infoValue}>6시간 30분</Text>
              <Text style={styles.infoValue}>네</Text>
              <Text style={styles.infoValue}>3</Text>
            </View>
          </View>

          <View style={styles.aiAssistedWrapper}>
            <Text style={styles.aiAssistedTitle}>
              좋은 수면을 하지 못하셨네요
            </Text>
            <Text style={styles.aiAssistedContent}>
              - 수면 시간을 늘리세요{'\n'}- 취침 전 휴대폰 사용은 좋지 않아요
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.notCompleted}>
          <Text style={styles.notCompletedText}>
            김고은님의 오늘 수면 결과가{'\n'}
            아직 작성되지 않았습니다.
          </Text>
          <TouchableOpacity style={styles.notCompletedButton} onPress={onWrite}>
            <Text style={styles.notCompletedButtonText}>작성하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  notCompleted: {
    width: wp('84.6%'),
    height: hp('23.7%'),
    marginTop: hp('3.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: WHITE,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  notCompletedText: {
    width: '100%',
    textAlign: 'center',
    color: BLACK,
    fontFamily: MEDIUM,
    fontSize: fs(16),
    lineHeight: fs(16) * 1.95,
  },
  notCompletedButton: {
    width: wp('50.3%'),
    height: hp('6.2%'),
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('2%'),
  },
  notCompletedButtonText: {
    fontFamily: MEDIUM,
    fontSize: fs(14),
    color: WHITE,
  },
  infoWrapper: {
    width: wp('84.6%'),
    height: hp('24.9%'),
    marginTop: hp('3.8%'),
    borderRadius: 8,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  infoInnerWrapper: {
    width: wp('42.175%'),
    height: hp('18.5%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: 1,
    height: hp('19.9%'),
    backgroundColor: LIGHTGRAY,
  },
  infoLabel: {
    fontSize: fs(14),
    color: BLACK,
    fontFamily: MEDIUM,
  },
  infoValue: {
    fontSize: fs(14),
    color: BLUE,
    fontFamily: MEDIUM,
  },
  aiAssistedWrapper: {
    width: wp('84.6%'),
    height: hp('17.5%'),
    marginTop: hp('2.4%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLUE,
    borderRadius: 8,
  },
  aiAssistedTitle: {
    width: '100%',
    textAlign: 'center',
    color: WHITE,
    fontSize: fs(18),
  },
  aiAssistedContent: {
    width: '100%',
    textAlign: 'center',
    color: WHITE,
    fontSize: fs(14),
    lineHeight: fs(14) * 1.95,
    marginTop: hp('1.8%'),
  },
});

export default ResultScreen;
