import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {BLACK, BLUE, WHITE} from 'utils/color';
import {MEDIUM} from 'utils/font';
import {fs, hp, wp} from 'utils/size';

interface IProps extends TouchableOpacityProps {
  value: boolean;
  expectedValue: boolean;
  label: string;
  top?: number;
  bottom?: number;
}

const BooleanButton = ({
  value,
  expectedValue,
  top = 0,
  bottom = 0,
  label = '',
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
          backgroundColor: expectedValue === value ? BLUE : WHITE,
        },
        style,
      ]}
      {...props}>
      <Text
        style={[
          styles.label,
          {
            color: expectedValue === value ? WHITE : BLACK,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('39%'),
    height: hp('6.2%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
  },
});

export default BooleanButton;
