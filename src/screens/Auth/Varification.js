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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {PostFunction} from '../../comman/Api';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';

export default function Varification({navigation, route}) {
  const {email} = route.params;
  // console.log(email);

  const [varificationCode, setvarificationCode] = useState('');
  const [isloading, setloading] = useState(false);

  const varifiycode = async () => {
    if (!varificationCode) {
      warnToast('Enter the varification code! ');
    } else {
      setloading(true);
      let url = `verification_code`;
      let data = new FormData();
      data.append('email', email);
      data.append('code', varificationCode);
      const result = await PostFunction(data, url);

      // console.log('result', varificationCode);
      if (result.success) {
        const Data = result.data;
        successToast(Data.message);
        if (Data.status == 0) {
          null;
        } else {
          navigation.navigate('ChangesPassword', {email: email});
        }

        setloading(false);
      } else {
        errorToast(result.data?.message);
        setloading(false);
      }
    }
  };
  const resendCode = async () => {
    setloading(true);
    let url = `forgot_password`;
    let data = new FormData();
    data.append('email', email);
    const result = await PostFunction(data, url);
    console.log('result', result);
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      // navigation.navigate('Varification', {email: userEmail});
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
          HeaderName={'Verification code'}
          onPress={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={styles.logostyle}>
            <Logo />
          </View>
          <CustomText style={styles.sendlinkdata}>
            Please enter the verification code sent to your {'\n'}registered
            email id.
          </CustomText>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}>
              {' '}
              Enter the verification code
            </CustomText>
            <View style={{width: '100%', paddingHorizontal: 20}}>
              <OTPInputView
                style={{width: '80%', height: 70}}
                pinCount={4}
                onCodeChanged={code => {
                  setvarificationCode(code);
                }}
                code={varificationCode}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  console.log(`Code is ${code}, you are good to go!`);
                }}
              />
            </View>
          </View>
          <CustomText style={styles.Dontaccound}>
            Didn't receive verification code?{' '}
            <CustomText style={styles.RegisterNow} onPress={() => resendCode()}>
              Resend
            </CustomText>
          </CustomText>
        </KeyboardAwareScrollView>
        <Button
          loader={isloading}
          buttonName={'Submit'}
          // onPress={() => navigation.navigate('ChangesPassword')}
          onPress={() => varifiycode()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  underlineStyleHighLighted: {
    borderColor: '#00ADEF',
  },
  underlineStyleBase: {
    width: 50,
    height: 45,
    backgroundColor: '#F2FBFE',
    borderWidth: 1,
    borderColor: '#00ADEF',
    color: '#00ADEF',
    fontSize: 18,
    fontFamily: Font.bold,
    borderRadius: 5,
    // borderBottomWidth: 1,
  },
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
