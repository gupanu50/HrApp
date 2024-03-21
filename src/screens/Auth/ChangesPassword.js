import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../comman/Header';
import Logo from '../../../asset/image/svg/ChangePass.svg';
import {DefaultImages} from '../../comman/Theme';
import Input from '../../comman/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Font from '../../comman/Font';
import CustomText from '../../comman/CustomText';
import Button from '../../comman/Button';
import Openeye from '../../../asset/image/svg/OpenEye.svg';
import CloseEye from '../../../asset/image/svg/CloseEye.svg';
import {PostFunction} from '../../comman/Api';
import {errorToast, successToast, warnToast} from '../../comman/TostModal';

export default function ChangesPassword({navigation, route}) {
  const {email} = route.params;
  const [isSecureEntry1, eyepressbutton1] = useState(true);
  const [isSecureEntry2, eyepressbutton2] = useState(true);

  const [userPassword, setuserPassword] = useState('');
  const [userConfPassword, setuserconfPassword] = useState('');
  const [isloading, setloading] = useState(false);
  const validate = () => {
    if (!userPassword) {
      warnToast('Enter the Password!');
    } else if (!userConfPassword) {
      warnToast('Enter the Confirm password!');
    } else if (userPassword !== userConfPassword) {
      warnToast('Password and Confirm password did not mach!');
    } else {
      RunApiFunction();
    }
  };
  const RunApiFunction = async () => {
    setloading(true);
    let url = `reset_password`;
    let data = new FormData();
    data.append('email', email);
    data.append('password', userPassword);
    data.append('password_confirmation', userConfPassword);
    const result = await PostFunction(data, url);

    console.log('result', result);
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      if (Data.status == 0) {
        null;
      } else {
        navigation.navigate('Success');
      }

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  return (
    <ImageBackground source={DefaultImages.BackGround} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          NoIcon
          Lefttext
          HeaderName={'Create new password'}
          onPress={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={styles.logostyle}>
            <Logo />
          </View>
          <CustomText style={styles.sendlinkdata}>
            Enter a new password to continue
          </CustomText>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}>New password</CustomText>
            <Input
              value={userPassword}
              onChangeText={t => setuserPassword(t)}
              placeholder={'New password'}
              secureTextEntry={isSecureEntry1}
              showpress={() => eyepressbutton1(!isSecureEntry1)}
              rightButton={isSecureEntry1 ? <CloseEye /> : <Openeye />}
            />
          </View>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}>Confirm password</CustomText>
            <Input
              value={userConfPassword}
              onChangeText={t => setuserconfPassword(t)}
              placeholder={'Confirm password'}
              secureTextEntry={isSecureEntry2}
              showpress={() => eyepressbutton2(!isSecureEntry2)}
              rightButton={isSecureEntry2 ? <CloseEye /> : <Openeye />}
            />
          </View>
        </KeyboardAwareScrollView>
        <Button
          loader={isloading}
          buttonName={'Submit'}
          onPress={() => validate()}
          // onPress={() => navigation.navigate('Success')}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  sendlinkdata: {
    color: '#1E1E1E',
    fontFamily: Font.bold,
    fontSize: 16,
    marginLeft: 20,
  },
  logostyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  RegisterNow: {
    color: '#00ADEF',
    fontSize: 15,
    fontFamily: Font.bold,
  },
  Dontaccound: {
    color: '#1E232C',
    fontSize: 15,
    fontFamily: Font.bold,
    alignSelf: 'flex-end',
    margin: 20,
  },
  textarea: {
    width: '100%',
    marginTop: 10,
  },
  textname: {
    color: '#1E1E1E',
    fontSize: 15,
    fontFamily: Font.samibold,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
