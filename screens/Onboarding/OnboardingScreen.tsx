import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {BLACK, GRAY, WHITE} from 'utils/color';
import {BOLD, MEDIUM} from 'utils/font';
import {fs, hp, wp} from 'utils/size';
import Button from 'components/Button';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const imageSource = require('assets/images/onboarding.png');
    const {width, height} = Image.resolveAssetSource(imageSource);
    const calculatedImageHeight = (height / width) * wp('100%');
    setImageHeight(calculatedImageHeight);
  }, []);

  const onStart = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainTab'}],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('assets/images/onboarding.png')}
        style={[
          styles.image,
          {
            height: imageHeight,
          },
        ]}
      />
      <Text style={styles.title}>환영합니다 김고은님</Text>
      <Text style={styles.description}>
        잘자연과 함께 건강한{'\n'}수면생활을 시작해봐요!
      </Text>
      <Button label="시작" style={styles.button} onPress={onStart} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: WHITE,
    position: 'relative',
  },
  image: {
    width: wp('100%'),
    marginTop: hp('6.2%'),
  },
  title: {
    color: BLACK,
    fontSize: fs(24),
    fontFamily: BOLD,
    marginTop: hp('5.1%'),
  },
  description: {
    color: GRAY,
    fontSize: fs(16),
    fontFamily: MEDIUM,
    textAlign: 'center',
    marginTop: hp('3.2%'),
    lineHeight: fs(16) * 1.94,
  },
  button: {
    position: 'absolute',
    bottom: hp('5%'),
  },
});

export default OnboardingScreen;
