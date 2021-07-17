import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BOLD} from 'utils/font';
import {fs, hp, wp} from 'utils/size';
import ArrowLeft from 'assets/images/arrow-left.svg';

interface IProps {
  onPress?: () => void;
  title: string;
}

const Header: React.FC<IProps> = ({onPress, title}: IProps) => {
  return (
    <View style={styles.container}>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <ArrowLeft style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.title,
          {
            marginTop: onPress ? 0 : hp('2.9%'),
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    paddingHorizontal: wp('7.7%'),
    paddingTop: hp('2.1%'),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    width: wp('2.8%'),
    height: hp('2.6%'),
  },
  button: {
    marginBottom: hp('2.4%'),
  },
  title: {
    fontFamily: BOLD,
    fontSize: fs(24),
  },
});

export default Header;
