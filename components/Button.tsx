import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {BLUE, WHITE} from 'utils/color';
import {MEDIUM} from 'utils/font';
import {fs, hp, wp} from 'utils/size';

interface IProps extends TouchableOpacityProps {
  label: string;
  top?: number;
  bottom?: number;
}

const Button: React.FC<IProps> = ({
  label = '',
  top = 0,
  bottom = 0,
  style,
  ...props
}: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, {marginTop: top, marginBottom: bottom}, style]}
      {...props}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('84.6%'),
    height: hp('6.2%'),
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  label: {
    fontFamily: MEDIUM,
    fontSize: fs(14),
    color: WHITE,
  },
});

export default Button;
