import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from 'components/Header';
import {BLACK, BLUE, GRAY, LIGHTGRAY, WHITE} from 'utils/color';
import {fs, hp, wp} from 'utils/size';
import {MEDIUM} from 'utils/font';
import ListItem from 'components/ListItem';

const HomeScreen = () => {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState<ISleepData>();

  useEffect(() => {
    // api call
    //then
    // setInfo(response.data)
  });

  useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일`}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.graphWrapper} />
        <View style={styles.infoWrapper}>
          <View style={styles.infoInnerWrapper}>
            <Text style={styles.infoLabel}>수면 시간</Text>
            <Text style={styles.infoLabel}>피곤한 정도</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoInnerWrapper}>
            {info ? (
              <>
                <Text style={styles.infoValue}>6시간 30분</Text>
                <Text style={styles.infoValue}>3</Text>
              </>
            ) : (
              <>
                <Text style={styles.infoDisabledValue}>미작성</Text>
                <Text style={styles.infoDisabledValue}>미작성</Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.listItemWrapper}>
          {new Array(12).fill(0).map(() => (
            <ListItem top={hp('2.4%')} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  graphWrapper: {
    width: wp('84.6%'),
    height: hp('25.6%'),
    marginTop: hp('3.8%'),
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
  infoWrapper: {
    width: wp('84.6%'),
    height: hp('13.7%'),
    marginTop: hp('3.8%'),
    flexDirection: 'row',
    alignItems: 'center',
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
  infoInnerWrapper: {
    width: wp('42.175%'),
    height: hp('7.8%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: 1,
    height: hp('8.1%'),
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
  infoDisabledValue: {
    fontSize: fs(14),
    color: GRAY,
    fontFamily: MEDIUM,
  },
  scrollView: {
    width: wp('100%'),
    alignItems: 'center',
  },
  listItemWrapper: {
    marginTop: hp('1.2%'),
    flexDirection: 'column',
  },
});

export default HomeScreen;
