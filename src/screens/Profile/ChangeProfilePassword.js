import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../comman/Button';
import Font from '../../comman/Font';
import {DefaultImages, Colors} from '../../comman/Theme';
import Header from '../../comman/Header';
import CustomText from '../../comman/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../comman/Input';
import Openeye from '../../../asset/image/svg/OpenEye.svg';
import CloseEye from '../../../asset/image/svg/CloseEye.svg';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';
import {UpdateFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangeProfilePassword({navigation}) {
  const [isSecureEntry1, eyepressbutton1] = useState(true);
  const [isSecureEntry2, eyepressbutton2] = useState(true);
  const [isSecureEntry3, eyepressbutton3] = useState(true);
  const [userOldPassword, setuserOldPassword] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [userConfPassword, setuserconfPassword] = useState('');
  const [isloading, setloading] = useState(false);
  const validateForm = () => {
    if (!userOldPassword) {
      warnToast('Enter the old password! ');
    } else if (!userPassword) {
      warnToast('Enter new password!');
    } else if (!userConfPassword) {
      warnToast('Enter the confirm new password!');
    } else if (userPassword !== userConfPassword) {
      warnToast('Didn`t match new password and confirm password!');
    } else {
      updateNewPassword();
    }
  };
  const updateNewPassword = async () => {
    setloading(true);
    const token = await AsyncStorage.getItem('Token');
    let url = `changepassword`;
    let data = new FormData();
    data.append('currentpassword', userOldPassword);
    data.append('newpassword', userPassword);
    data.append('confpassword', userConfPassword);
    const result = await UpdateFunction(data, url, token);

    // console.log('result', result);
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      navigation.goBack();
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        HeaderName={'Change Password'}
        textcolor={'#FFF'}
        onPress={() => navigation.goBack()}
      />
      <View style={customStyle.mainContain}>
        <KeyboardAwareScrollView>
          <View style={customStyle.textarea}>
            <CustomText style={customStyle.textname}> Old Password</CustomText>
            <Input
              value={userOldPassword}
              onChangeText={t => setuserOldPassword(t)}
              placeholder={'********'}
              secureTextEntry={isSecureEntry1}
              showpress={() => eyepressbutton1(!isSecureEntry1)}
              rightButton={isSecureEntry1 ? <CloseEye /> : <Openeye />}
            />
          </View>
          <View style={customStyle.textarea}>
            <CustomText style={customStyle.textname}>
              {' '}
              Confirm Password
            </CustomText>
            <Input
              value={userPassword}
              onChangeText={t => setuserPassword(t)}
              placeholder={'********'}
              secureTextEntry={isSecureEntry2}
              showpress={() => eyepressbutton2(!isSecureEntry2)}
              rightButton={isSecureEntry2 ? <CloseEye /> : <Openeye />}
            />
          </View>
          <View style={customStyle.textarea}>
            <CustomText style={customStyle.textname}>
              {' '}
              Confirm New Password
            </CustomText>
            <Input
              value={userConfPassword}
              onChangeText={t => setuserconfPassword(t)}
              placeholder={'********'}
              secureTextEntry={isSecureEntry3}
              showpress={() => eyepressbutton3(!isSecureEntry3)}
              rightButton={isSecureEntry3 ? <CloseEye /> : <Openeye />}
            />
          </View>
          <Button
            onPress={() => validateForm()}
            loader={isloading}
            buttonName={'Update'}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
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
  mainContain: {
    backgroundColor: '#F2F6FF',
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 20,
  },
});
