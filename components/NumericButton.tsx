import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {BLACK, BLUE, WHITE} from 'utils/color';
import {MEDIUM} from 'utils/font';
import {fs, hp, wp} from 'utils/size';

interface IProps extends TouchableOpacityProps {
  label: number;
  value: number;
  top?: number;
  bottom?: number;
}

const NumericButton: React.FC<IProps> = ({
  label,
  value,
  top = 0,
  bottom = 0,
  style,
  ...props
}: IProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginTop: top,
          marginBottom: bottom,
          backgroundColor: label === value ? BLUE : WHITE,
        },
        style,
      ]}
      {...props}>
      <Text
        style={[
          styles.label,
          {
            color: label === value ? WHITE : BLACK,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('12.3%'),
    height: hp('6.2%'),
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
  label: {
    fontFamily: MEDIUM,
    fontSize: fs(14),
    color: WHITE,
  },
});

export default NumericButton;
