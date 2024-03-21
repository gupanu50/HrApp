import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../comman/Header';
import Logo from '../../../asset/image/svg/Forgotpassword.svg';
import {DefaultImages} from '../../comman/Theme';
import Input from '../../comman/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Font from '../../comman/Font';
import CustomText from '../../comman/CustomText';
import Button from '../../comman/Button';
import {PostFunction} from '../../comman/Api';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';

export default function ForgotPassword({navigation}) {
  const [userEmail, setuserEmail] = useState('');
  const [isloading, setloading] = useState(false);
  const forgotpasswordFunction = async () => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!userEmail) {
      warnToast('Enter the User email! ');
    } else if (!emailPattern.test(userEmail)) {
      warnToast('Enter the Valid Email address!');
    } else {
      setloading(true);
      let url = `forgot_password`;
      let data = new FormData();
      data.append('email', userEmail);
      const result = await PostFunction(data, url);
      console.log('result', result);
      if (result.success) {
        const Data = result.data;
        successToast(Data.message);
        if (Data.status == 0) {
          null;
        } else {
          navigation.navigate('Varification', {email: userEmail});
        }

        setloading(false);
      } else {
        errorToast(result.data?.message);
        setloading(false);
      }
    }
  };
  return (
    <ImageBackground source={DefaultImages.BackGround} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          NoIcon
          Lefttext
          HeaderName={'Forgot password'}
          onPress={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={styles.logostyle}>
            <Logo />
          </View>
          <CustomText style={styles.sendlinkdata}>
            Please enter the email address linked with {'\n'}your account.
          </CustomText>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}> Enter your email</CustomText>
            <Input
              placeholder={'Enter your email'}
              value={userEmail}
              onChangeText={t => setuserEmail(t)}
            />
          </View>
          <CustomText style={styles.Dontaccound}>
            Didn't get code?{' '}
            <CustomText
              style={styles.RegisterNow}
              onPress={() => forgotpasswordFunction()}
              // onPress={() => navigation.navigate('Login')}
            >
              Send again
            </CustomText>
          </CustomText>
        </KeyboardAwareScrollView>
        <Button
          loader={isloading}
          buttonName={'Send code'}
          onPress={() => forgotpasswordFunction()}
          // onPress={() => navigation.navigate('Varification')}
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
