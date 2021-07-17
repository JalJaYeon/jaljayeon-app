import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp} from 'utils/size';
import {LIGHTGRAY, WHITE} from 'utils/color';
import TabHome from 'assets/images/tab-home.svg';
import TabResult from 'assets/images/tab-result.svg';
import TabSetting from 'assets/images/tab-setting.svg';
import TabActiveHome from 'assets/images/tab-active-home.svg';
import TabActiveResult from 'assets/images/tab-active-result.svg';
import TabActiveSetting from 'assets/images/tab-active-setting.svg';

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {bottom} = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getIcon = (routeName: string, index: number) => {
    const inactiveIcon = {
      HomeStack: <TabHome height={hp('3%')} />,
      ResultStack: <TabResult height={hp('3%')} />,
      SettingStack: <TabSetting height={hp('3%')} />,
    };
    const activeIcon = {
      HomeStack: <TabActiveHome height={hp('3%')} />,
      ResultStack: <TabActiveResult height={hp('3%')} />,
      SettingStack: <TabActiveSetting height={hp('3%')} />,
    };
    const focused = state.index === index;

    return focused
      ? activeIcon[routeName as keyof MainTabType]
      : inactiveIcon[routeName as keyof MainTabType];
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {height: hp('6%') + bottom},
      ])}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon = getIcon(route.name, index);

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={StyleSheet.flatten([
              styles.tab,
              {marginBottom: bottom, paddingTop: hp('1.6%')},
            ])}
            key={index}>
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderTopColor: LIGHTGRAY,
    borderTopWidth: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp('1%'),
  },
});

export default TabBar;
