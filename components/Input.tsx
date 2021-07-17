import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  findNodeHandle,
} from 'react-native';
import {BLACK, LIGHTGRAY, WHITE} from 'utils/color';
import {MEDIUM} from 'utils/font';
import {fs, hp, wp} from 'utils/size';

interface IProps extends TextInputProps {
  bottom?: number;
  top?: number;
  scrollToInput?: (node: React.ReactNode) => void;
}

const Input: React.FC<IProps> = ({
  bottom = 0,
  top = 0,
  scrollToInput = () => {},
  ...props
}: IProps) => {
  return (
    <TextInput
      style={[styles.container, {marginTop: top, marginBottom: bottom}]}
      placeholderTextColor={LIGHTGRAY}
      onFocus={event => {
        scrollToInput(findNodeHandle(event.target));
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('84.6%'),
    height: hp('6.2%'),
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingHorizontal: wp('5.5%'),
    fontFamily: MEDIUM,
    fontSize: fs(14),
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default Input;
