import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Logo from '../../../asset/image/svg/Success.svg';
import {DefaultImages, Colors} from '../../comman/Theme';
import Font from '../../comman/Font';
import CustomText from '../../comman/CustomText';
import Button from '../../comman/Button';

export default function Success({navigation}) {
  return (
    <ImageBackground source={DefaultImages.BackGround} style={{flex: 1}}>
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Logo />
        <CustomText style={styles.succemessage}>Password Changed!</CustomText>
        <CustomText style={styles.teststyle}>
          Your password has been changed successfully.
        </CustomText>
        <Button
          buttonName={'Back to Login'}
          onPress={() => navigation.navigate('Login')}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  succemessage: {
    color: '#00ADEF',
    fontFamily: Font.bold,
    fontSize: 24,
    marginTop: 25,
  },
  teststyle: {
    color: '#1E1E1E',
    fontFamily: Font.samibold,
    fontSize: 16,
    marginVertical: 20,
  },
});
