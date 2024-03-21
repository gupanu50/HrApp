import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../comman/Header';
import {DefaultImages, Colors} from '../../comman/Theme';
import Input from '../../comman/Input';
import Font from '../../comman/Font';
import CustomText from '../../comman/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../comman/Button';
import Openeye from '../../../asset/image/svg/OpenEye.svg';
import CloseEye from '../../../asset/image/svg/CloseEye.svg';
import CheckBox from '@react-native-community/checkbox';
import Code from '../../../asset/image/svg/countycode.svg';
import Close from '../../../asset/image/svg/modalClose.svg';
import Arrowdown from '../../../asset/image/svg/arrowdown.svg';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';
import {PostFunction} from '../../comman/Api';
import Modal from 'react-native-modal';
import SearchBox from '../../comman/SearchBox';
import {Baseurl} from '../../comman/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const allCountryCode = require('../../../asset/countries.json');

export default function Signup({navigation}) {
  const [isSecureEntry1, eyepressbutton1] = useState(true);
  const [isSecureEntry2, eyepressbutton2] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [userName, setuserName] = useState('');
  const [userlastName, setuserLastName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userNumber, setuserNumber] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [userConfPassword, setuserconfPassword] = useState('');
  const [isloading, setloading] = useState(false);
  const [opemNumbermodal, setNumberModal] = useState(false);
  const [selectCountyr, setcounty] = useState('');
  const [seatdata, setsearchData] = useState(allCountryCode);
  const [allcountylist, setallcounty] = useState(seatdata);

  useEffect(() => {
    setcounty(allCountryCode[38]);
  }, []);

  const formValidation = () => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!userName) {
      warnToast('Enter the First name! ');
    } else if (!userlastName) {
      warnToast('Enter the Last name!');
    } else if (!userEmail) {
      warnToast('Enter the Email address!');
    } else if (!emailPattern.test(userEmail)) {
      warnToast('Enter the Valid Email address!');
    } else if (!userNumber) {
      warnToast('Enter your phone number!');
    } else if (!userPassword) {
      warnToast('Enter the Password!');
    } else if (!userConfPassword) {
      warnToast('Enter the Confirm password!');
    } else if (userPassword !== userConfPassword) {
      warnToast('Password and Confirm password did not mach!');
    } else if (!toggleCheckBox) {
      warnToast('Accept terms and conditions !');
    } else {
      RunApiFunction();
    }
  };
  const RunApiFunction = async () => {
    setloading(true);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    let url = `signUp`;
    let data = new FormData();
    data.append('first_name', userName);
    data.append('device_token', fcmToken);
    data.append('last_name', userlastName);
    data.append('email', userEmail);
    data.append('phone', userNumber);
    data.append('password', userPassword);
    data.append('password_confirmation', userConfPassword);
    data.append('country_code', selectCountyr.dial_code);
    console.log('signupdata', data);

    const result = await PostFunction(data, url);
    console.log('signup', result);
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      if (Data.status == 0) {
        null;
      } else {
        await AsyncStorage.setItem('Token', Data.token?.toString());
        navigation.navigate('WellCome');
      }
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  const onSearch = query => {
    let filter = seatdata.filter(item =>
      Object.values(item).join('').toLowerCase().includes(query.toLowerCase()),
    );
    setallcounty(filter);
  };

  return (
    <ImageBackground source={DefaultImages.BackGround} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          Lefttext
          NoIcon
          HeaderName={'Hello! Register to get started'}
          textcolor={Colors.headerText}
          onPress={() => navigation.goBack()}
        />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}> First name</CustomText>
            <Input
              placeholder={'Enter your first name'}
              value={userName}
              onChangeText={t => setuserName(t)}
            />
          </View>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}> Last name</CustomText>
            <Input
              placeholder={'Enter your last name'}
              value={userlastName}
              onChangeText={t => setuserLastName(t)}
            />
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
            <CustomText style={styles.textname}>
              {' '}
              Enter your phone number
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'center',
                marginHorizontal: 20,
                borderWidth: 1,
                borderColor: '#E8ECF4',
                backgroundColor: '#F2FBFE',
                borderRadius: 10,
                padding: 5,
                height: 55,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', borderRightWidth: 1, padding: 5}}
                onPress={() => setNumberModal(true)}>
                <CustomText style={styles.textStyle}>
                  {selectCountyr ? selectCountyr.flag : '🇺🇸'}
                </CustomText>
                <CustomText style={styles.textStyle}>
                  {selectCountyr ? selectCountyr.dial_code : '+1'}
                </CustomText>

                <Arrowdown />
              </TouchableOpacity>

              {/* <Input placeholder={'xxx-xxx-xxx'} /> */}
              <TextInput
                value={userNumber}
                onChangeText={t => setuserNumber(t)}
                keyboardType="number-pad"
                placeholder={'xxx-xxx-xxx'}
                style={{
                  height: 55,
                  width: '75%',
                  padding: 5,
                  fontSize: 15,
                  fontFamily: Font.medium,

                  color: '#1E1E1E',
                }}
              />
            </View>
          </View>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}> Password </CustomText>
            <Input
              value={userPassword}
              onChangeText={t => setuserPassword(t)}
              placeholder={'Password'}
              secureTextEntry={isSecureEntry1}
              showpress={() => eyepressbutton1(!isSecureEntry1)}
              rightButton={isSecureEntry1 ? <CloseEye /> : <Openeye />}
            />
          </View>
          <View style={styles.textarea}>
            <CustomText style={styles.textname}> Confirm password</CustomText>
            <Input
              value={userConfPassword}
              onChangeText={t => setuserconfPassword(t)}
              placeholder={'Confirm password'}
              secureTextEntry={isSecureEntry2}
              showpress={() => eyepressbutton2(!isSecureEntry2)}
              rightButton={isSecureEntry2 ? <CloseEye /> : <Openeye />}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 20,
            }}>
            <CheckBox
              style={{height: 20, width: 30}}
              boxType={'square'}
              // lineWidth={2}
              onCheckColor={'#FFF'}
              onFillColor={Colors.default}
              tintColor={Colors.default}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={value => {
                setToggleCheckBox(value);
              }}
            />
            <CustomText
              style={{
                color: Colors.primary,
                fontSize: 14,
                fontFamily: Font.regular,
              }}>
              Accept terms and conditions
            </CustomText>
          </View>

          <Button
            loader={isloading}
            buttonName={'Register'}
            // onPress={() => navigation.navigate('Home')}

            onPress={() => formValidation()}
          />
          <CustomText style={styles.Dontaccound}>
            Already have an account{' '}
            <CustomText
              style={styles.RegisterNow}
              onPress={() => navigation.navigate('Login')}>
              Login now
            </CustomText>
          </CustomText>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <Modal
        isVisible={opemNumbermodal}
        onSwipeComplete={() => setNumberModal(false)}
        onBackdropPress={() => setNumberModal(false)}
        style={{margin: 0}}>
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: Colors.default,
          }}>
          <TouchableOpacity
            style={{alignItems: 'flex-end', padding: 20}}
            onPress={() => setNumberModal(false)}>
            <Close height={40} width={40} />
          </TouchableOpacity>

          <SearchBox
            placeholder={'Search Country'}
            onChangeText={query => onSearch(query)}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allcountylist}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setcounty(item), setNumberModal(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    height: 40,
                    margin: 5,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                  }}>
                  <CustomText style={styles.coutrycod}>
                    {item.dial_code}
                  </CustomText>
                  <CustomText style={styles.coutrycod}>{item.flag}</CustomText>
                  <CustomText style={styles.coutrycod}>{item.name}</CustomText>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontFamily: Font.medium,
    // width: rightButton ? '70%' : '80%',

    shadowColor: '#6B6B66',

    // backgroundColor: 'red',
    // padding: 10,
    color: '#1E1E1E',
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
    alignSelf: 'center',
    margin: 10,
  },
  textarea: {
    width: '100%',
    marginTop: 5,
  },
  textname: {
    color: '#1E1E1E',
    fontSize: 15,
    fontFamily: Font.samibold,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  coutrycod: {
    color: '#1E1E1E',
    fontSize: 15,
    fontFamily: Font.samibold,
    margin: 5,
  },
});
