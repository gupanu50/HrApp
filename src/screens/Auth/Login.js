import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect, useRef, createRef} from 'react';
import Button from '../../comman/Button';
import Input from '../../comman/Input';
import {DefaultImages} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Font from '../../comman/Font';
import Logo from '../../../asset/image/svg/HomeLogo.svg';
import Google from '../../../asset/image/svg/Google.svg';
import Apple from '../../../asset/image/svg/Apple.svg';
import Linkin from '../../../asset/image/svg/Linkin.svg';
import Openeye from '../../../asset/image/svg/OpenEye.svg';
import CloseEye from '../../../asset/image/svg/CloseEye.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';
import {
  PostFunction,
  GetFunction,
  GetLinbkedFunction,
  GetKey,
} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import LinkedInModal from '@smuxx/react-native-linkedin';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import {useSelector} from 'react-redux';

export default function Login({navigation, route}) {
  const PageStatus = useSelector(state => state.WelCome.status);

  const [isSecureEntry, eyepressbutton] = useState(true);
  const [userEmail, setuserEmail] = useState('');
  const [isPassword, setuserPassword] = useState('');
  const [isloading, setloading] = useState(false);
  const [GoogleLogin, setGoogleLogin] = useState(false);
  const [LinkedInLogin, setLinkedInLogin] = useState(false);
  const [SecureKey, setKey] = useState('');
  const [previousScreen, setPreviousScreen] = useState(null);

  useEffect(() => {
    getLoginKey();
  }, []);
  const getLoginKey = async () => {
    let url = `getflkey`;
    const result = await GetKey(url);
    console.log(result);
    if (result.success) {
      const Data = result.data?.data;
      setKey(Data);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  const formValidate = () => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!userEmail) {
      warnToast('Enter the User email! ');
    } else if (!emailPattern.test(userEmail)) {
      warnToast('Enter the Valid Email address!');
    } else if (!isPassword) {
      warnToast('Enter the Password!');
    } else {
      loginfunction();
    }
  };
  const loginfunction = async () => {
    setloading(true);
    let url = `login`;
    const token = await AsyncStorage.getItem('fcmToken');
    let data = new FormData();
    data.append('email', userEmail);
    data.append('password', isPassword);
    data.append('device_token', token);
    const result = await PostFunction(data, url);
    console.log('result', data, result);
    if (result.success) {
      const Data = result.data;
      Data.message;
      setloading(false);
      await AsyncStorage.setItem('Token', Data.token?.toString());
      if (PageStatus) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('WellCome');
      }
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  //// goodle signin from info@digimonk.in///
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'userinfo');
      /// google login api///
      googlelogin(userInfo);
      // setloading(true);
    } catch (error) {
      console.log(error.code, 'hello');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorToast('user cancelled the login flow');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorToast('operation (e.g. sign in) is in progress already');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorToast('play services not available or outdated');
        // play services not available or outdated
      } else {
        errorToast('some other error happened');
      }
    }
  };
  const googlelogin = async ID => {
    setGoogleLogin(true);
    let url = `login`;
    let googleinfo = ID.user;
    let token = ID;
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    let data = new FormData();
    data.append('token', token.idToken);
    data.append('device_token', fcmToken);
    data.append('email', googleinfo.email);
    data.append('password', '');
    data.append('name', googleinfo.name);
    data.append('type', 'google');

    data.append('image', googleinfo.photo);
    const result = await PostFunction(data, url);
    // console.log(result, 'googleLogin');
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      await AsyncStorage.setItem('Token', Data.token?.toString());
      navigation.navigate('Home');
      setGoogleLogin(false);
    } else {
      errorToast(result.data?.message);
      setGoogleLogin(false);
    }
  };
  //// goodle signin from info@digimonk.in///
  ////// linkedin login with jitendra.n@digimonkl.in  ////
  const linkedRef = useRef();

  const getLinkedIn = async token => {
    setLinkedInLogin(true);
    let Token = token.access_token;
    let url = `https://api.linkedin.com/v2/userinfo`;
    const result = await GetLinbkedFunction(url, Token);
    // console.log('getlinked', result, 'linke');
    if (result.success) {
      const LinkedIn = result.data;
      successToast(LinkedIn.message);
      Linkedin_login(LinkedIn, Token);
    } else {
      errorToast(result.data?.message);
      setLinkedInLogin(false);
    }
  };
  const Linkedin_login = async (LinkedIn, Token) => {
    // console.log(LinkedIn, Token, 'datais');
    let url = `login`;
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    let data = new FormData();
    data.append('token', Token);
    data.append('device_token', fcmToken);
    data.append('email', LinkedIn.email);
    data.append('password', '');
    data.append('name', LinkedIn.name);
    data.append('type', 'linkedin');

    const result = await PostFunction(data, url);
    // console.log(result, 'LinkedIN');
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      await AsyncStorage.setItem('Token', Data.token?.toString());
      navigation.navigate('Home');
      setLinkedInLogin(false);
    } else {
      errorToast(result.data?.message);
      setLinkedInLogin(false);
    }
  };
  ////// linkedin login with jitendra.n@digimonkl.in  ////
  //// apple login with info@digimonk.in/////
  const onAppleButtonPress = async () => {
    // Start the sign-in request

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(appleAuthRequestResponse, 'apple');
    Appleloin(appleAuthRequestResponse);

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  };

  const Appleloin = async apple => {
    let url = `login`;
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    let data = new FormData();
    data.append('token', apple.identityToken);
    data.append('device_token', fcmToken);
    data.append('email', apple.email);
    data.append('password', '');
    data.append(
      'name',
      apple?.fullName?.familyName + apple?.fullName?.givenName,
    );
    data.append('type', 'apple');

    const result = await PostFunction(data, url);
    console.log(result, 'LinkedIN');
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      await AsyncStorage.setItem('Token', Data.token?.toString());
      navigation.navigate('Home');
      setLinkedInLogin(false);
    } else {
      errorToast(result.data?.message);
      setLinkedInLogin(false);
    }
  };

  const handleAppleLogout = async () => {
    try {
      // Revoke the Apple Sign-In credential
      await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGOUT,
      });
      console.log(appleAuth, 'successfully');

      // User successfully logged out
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  // back handle exit app
  useEffect(() => {
    // console.log('route.params', route.params.from);
    setPreviousScreen(route.params?.from);
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [previousScreen, route.params]);
  const backButtonHandler = () => {
    if (navigation.isFocused()) {
      console.log();
      if (previousScreen) {
        BackHandler.exitApp();
      } else {
        BackHandler.exitApp();
        // navigation.goBack();
      }
      return true;
    }
  };
  ///////////////back handle exit Function

  return (
    <ImageBackground source={DefaultImages.BackGround} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.Header}>
          <CustomText style={styles.headertext}>Welcome Back!</CustomText>
        </View>
        <View
          style={{
            // flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>

        <KeyboardAwareScrollView style={{flex: 1}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 250,
              // backgroundColor: 'red',
            }}>
            <Logo />
          </View>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}> Enter your email</CustomText>
            <Input
              placeholder={'Enter your email'}
              value={userEmail}
              onChangeText={t => setuserEmail(t)}
            />
          </View>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}>Enter your password</CustomText>
            <Input
              value={isPassword}
              onChangeText={t => setuserPassword(t)}
              placeholder={'Password'}
              secureTextEntry={isSecureEntry}
              showpress={() => eyepressbutton(!isSecureEntry)}
              rightButton={isSecureEntry ? <CloseEye /> : <Openeye />}
            />
          </View>
          <TouchableOpacity
            style={styles.forgotview}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <CustomText style={styles.forgottext}>Forgot Password</CustomText>
          </TouchableOpacity>
          <Button
            loader={isloading}
            buttonName={'Login'}
            // onPress={() => navigation.navigate('Home')}
            onPress={() => formValidate()}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{height: 1, width: '30%', backgroundColor: '#E8ECF4'}}
            />
            <CustomText style={styles.orlogin}> Or Login with</CustomText>
            <View
              style={{height: 1, width: '30%', backgroundColor: '#E8ECF4'}}
            />
          </View>

          <View style={styles.socialContain}>
            <TouchableOpacity onPress={() => signIn()}>
              {GoogleLogin ? (
                <ActivityIndicator color={'#00ADEF'} />
              ) : (
                <Google />
              )}
            </TouchableOpacity>
            {Platform.OS == 'ios' ? (
              <TouchableOpacity
                style={{marginHorizontal: 20}}
                onPress={
                  () => onAppleButtonPress()
                  // handleAppleLogout()
                }>
                <Apple />
              </TouchableOpacity>
            ) : (
              <View style={{marginHorizontal: 10}} />
            )}

            <View
              style={{}}
              // onPress={() => linkedRef.current.logoutAsync()}
            >
              {LinkedInLogin ? (
                <ActivityIndicator color={'#00ADEF'} />
              ) : (
                <LinkedInModal
                  ref={linkedRef}
                  clientSecret={[SecureKey.linkedin_client_secret]}
                  clientID={[SecureKey.linkedin_client_id]}
                  redirectUri="http://localhost:8081/auth/linkedin/callback"
                  permissions={[
                    'openid',
                    'profile',
                    'email',
                    'w_member_social',
                  ]}
                  onSuccess={token => getLinkedIn(token)}
                  onError={error => console.log(error)}
                  linkText={'hello'}
                  renderButton={() => <Linkin />}
                  containerStyle={{}}
                  wrapperStyle={{backgroundColor: '#FFF'}}
                />
              )}
            </View>
          </View>
          <CustomText style={styles.Dontaccound}>
            Don't have an account?{' '}
            <CustomText
              style={styles.RegisterNow}
              onPress={() => navigation.navigate('Signup')}>
              Register Now
            </CustomText>
          </CustomText>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  RegisterNow: {
    color: '#00ADEF',
    fontSize: 15,
    fontFamily: Font.bold,
  },
  Dontaccound: {
    color: '#1E232C',
    fontSize: 15,
    fontFamily: Font.bold,
    alignSelf: 'center',
    margin: 10,
  },
  socialContain: {
    flexDirection: 'row',
    // width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  orlogin: {
    color: '#6A707C',
    alignSelf: 'center',
    fontFamily: Font.samibold,
    marginHorizontal: 5,
  },
  forgottext: {
    textAlign: 'right',
    color: '#6A707C',
    fontFamily: Font.samibold,
  },
  forgotview: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginHorizontal: 20,
  },
  textname: {
    color: '#1E1E1E',
    fontSize: 15,
    fontFamily: Font.samibold,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textarea: {
    width: '100%',
    marginTop: 5,
  },
  Header: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headertext: {
    fontFamily: Font.bold,
    fontSize: 15,
    color: '#1E232C',
  },
});
