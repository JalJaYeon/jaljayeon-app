import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import {BLACK, WHITE} from 'utils/color';
import {fs, hp, wp} from 'utils/size';
import Icon from 'assets/images/arrow-down.svg';

interface IProps {
  label?: string;
  items: Item[];
  value?: string;
  top?: number;
  bottom?: number;
  setValue?: (value: string) => void;
}

const DropDown = ({
  label,
  items = [],
  value,
  top = 0,
  bottom = 0,
  setValue = () => {},
}: IProps) => {
  const placeholder = {
    label: label,
    value: null,
    color: BLACK,
  };

  return (
    <View style={{marginTop: top, marginBottom: bottom}}>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={value}
        onValueChange={newValue => setValue(newValue)}
        items={items}
        placeholder={label ? placeholder : {}}
        useNativeAndroidPickerStyle={false}
        Icon={() => <Icon width={wp('5%')} />}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: wp('39%'),
    height: hp('6.2%'),
    borderRadius: 5,
    paddingLeft: wp('6%'),
    alignItems: 'center',
    fontSize: fs(14),
    color: BLACK,
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
  inputAndroid: {
    width: wp('39%'),
    height: hp('6.2%'),
    borderRadius: 5,
    paddingLeft: wp('6%'),
    alignItems: 'center',
    fontSize: fs(14),
    color: BLACK,
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
  iconContainer: {
    top: hp('2.5%'),
    right: wp('6%'),
  },
});

export default DropDown;
