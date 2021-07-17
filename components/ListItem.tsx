import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fs, hp, wp} from 'utils/size';
import {BLACK, BLUE, GRAY, WHITE} from 'utils/color';
import Icon from 'assets/images/arrow-right.svg';
import {MEDIUM} from 'utils/font';
import {getKoreanDate, getKoreanHHMM} from 'utils/time';

interface IProps {
  sleep: ISleepData;
  onPress?: () => void;
  top?: number;
  bottom?: number;
}

const ListItem = ({sleep, onPress = () => {}, top = 0, bottom = 0}: IProps) => {
  const [sleepDate] = useState<Date>(new Date(sleep.slept_date));

  return (
    <View style={[styles.container, {marginTop: top, marginBottom: bottom}]}>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{getKoreanDate(`${sleepDate}`)}</Text>
        <Text>
          수면 시간: {getKoreanHHMM(sleep.slept_time)} / 피곤:{' '}
          {sleep.tiredness_level}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Icon style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('84.6%'),
    height: hp('8.5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    borderRadius: 8,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingLeft: wp('5.1%'),
    paddingRight: wp('6.2%'),
  },
  icon: {
    width: wp('2.1%'),
    height: hp('1.9%'),
  },
  title: {
    fontSize: fs(14),
    color: BLUE,
    fontFamily: MEDIUM,
  },
  description: {
    fontSize: fs(14),
    color: GRAY,
    fontFamily: MEDIUM,
  },
  infoWrapper: {
    flexDirection: 'column',
    marginVertical: hp('1.4%'),
    justifyContent: 'space-between',
  },
});

export default ListItem;
