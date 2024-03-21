import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultImages} from '../../comman/Theme';
import Logo from '../../../asset/image/svg/Logo.svg';

export default function Splash({navigation}) {
  useEffect(async () => {
    const token = await AsyncStorage.getItem('Token');
    setTimeout(() => {
      if (token) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={DefaultImages.BackGround}>
        <Logo />
      </ImageBackground>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
        <Text>Splash</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
