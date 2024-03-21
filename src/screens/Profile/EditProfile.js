import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import Button from '../../comman/Button';
import Font from '../../comman/Font';
import {DefaultImages, Colors} from '../../comman/Theme';
import Header from '../../comman/Header';
import CustomText from '../../comman/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../comman/Input';
import Camera from '../../../asset/image/svg/Camera.svg';
import Code from '../../../asset/image/svg/countycode.svg';
import Close from '../../../asset/image/svg/modalClose.svg';
import Arrowdown from '../../../asset/image/svg/arrowdown.svg';
import Modal from 'react-native-modal';
import SearchBox from '../../comman/SearchBox';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {UpdateFunction, GetFunction} from '../../comman/Api';
import {warnToast, successToast, errorToast} from '../../comman/TostModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeUserInformation} from '../../redux/reducers/UserInformations';

const allCountryCode = require('../../../asset/countries.json');

export default function EditProfile({navigation}) {
  const disptch = useDispatch();
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  const [selectCountyr, setcounty] = useState('');
  const [seatdata, setsearchData] = useState(allCountryCode);
  const [allcountylist, setallcounty] = useState(seatdata);
  const [isloading, setloading] = useState(false);
  const [opemNumbermodal, setNumberModal] = useState(false);
  const [userName, setuserName] = useState('');
  const [userlastName, setuserLastName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userNumber, setuserNumber] = useState('');
  const [userimage, setuserimage] = useState('');

  useEffect(() => {
    setuserName(userinfo.first_name);
    setuserLastName(userinfo.last_name);
    setuserEmail(userinfo.email);
    setuserNumber(userinfo.phone);
    setuserimage(userinfo.profile_pic);
    let country = allcountylist.filter(
      item => item.dial_code == userinfo.country_code,
    );
    setcounty(country[0]);
  }, []);

  const onSearch = query => {
    let filter = seatdata.filter(item =>
      Object.values(item).join('').toLowerCase().includes(query.toLowerCase()),
    );

    setallcounty(filter);
  };
  const UploadImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
      cropperStatusBarColor: 'blue',
      cropperToolbarColor: 'blue',
      cropperToolbarTitle: 'Crop Image',
      cropperActiveWidgetColor: 'blue',
    }).then(image => {
      setuserimage(image);
      // setUploadIconImage(image);
    });
  };
  const formValidation = () => {
    if (!userName) {
      warnToast('Enter the First name! ');
    } else if (!userlastName) {
      warnToast('Enter the Last name!');
    } else if (!userNumber) {
      warnToast('Enter the User number!');
    } else {
      updateProfileInfo();
    }
  };
  const updateProfileInfo = async () => {
    setloading(true);
    const token = await AsyncStorage.getItem('Token');
    let url = `updateprofile`;
    let data = new FormData();
    data.append('first_name', userName);
    data.append('last_name', userlastName);
    data.append('phone', userNumber);
    data.append('country_code', selectCountyr.dial_code);
    var newImage = {
      type: userimage?.mime || 'image/png',
      name: userimage?.filename || userimage?.path?.split('/').pop(),
      uri: userimage?.path,
    };
    if (userimage.path) {
      data.append('image', newImage);
    }

    const result = await UpdateFunction(data, url, token);
    console.log(data, result);

    if (result.success) {
      getUserDetail();
      const Data = result.data;
      successToast(Data.message);
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  const getUserDetail = async () => {
    let url = `profile`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    // console.log(result);
    if (result.success) {
      const Data = result.data;
      disptch(storeUserInformation(Data));
      navigation.goBack();
    } else {
      errorToast(result.data?.message);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        HeaderName={'Edit Profile'}
        textcolor={'#FFF'}
        onPress={() => navigation.goBack()}
      />
      <View style={customStyle.mainContain}>
        <KeyboardAwareScrollView>
          <View style={customStyle.profile}>
            <ImageBackground
              imageStyle={{borderRadius: 50}}
              style={{height: 100, width: 100}}
              source={{uri: userimage.path ? userimage.path : userimage}}
              // source={require('../../../asset/image/other/AvetarProfile.png')}
            >
              <TouchableOpacity
                onPress={() => UploadImage()}
                style={{alignSelf: 'flex-end', marginTop: 60, left: 15}}>
                <Camera />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={customStyle.textarea}>
            <CustomText style={customStyle.textname}> First name</CustomText>
            <Input
              placeholder={'Enter your first name'}
              value={userName}
              onChangeText={t => setuserName(t)}
            />
          </View>
          <View style={customStyle.textarea}>
            <CustomText style={customStyle.textname}> Last name</CustomText>
            <Input
              placeholder={'Enter your last name'}
              value={userlastName}
              onChangeText={t => setuserLastName(t)}
            />
          </View>
          <View style={customStyle.textarea}>
            <CustomText style={customStyle.textname}> Email</CustomText>
            <Input
              editable={false}
              placeholder={'example@gmail.com'}
              value={userEmail}
              onChangeText={t => setuserEmail(t)}
            />
          </View>
          <View style={customStyle.textarea}>
            <CustomText style={customStyle.textname}> Phone number</CustomText>
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
                <CustomText>
                  {selectCountyr ? selectCountyr.flag : '🇺🇸'}
                </CustomText>
                <CustomText>
                  {selectCountyr ? selectCountyr.dial_code : '+1'}
                </CustomText>

                <Arrowdown />
              </TouchableOpacity>
              <TextInput
                value={userNumber}
                onChangeText={t => setuserNumber(t)}
                keyboardType="number-pad"
                placeholder={'xxx-xxx-xxx'}
                maxLength={10}
                style={{
                  height: 55,
                  width: '75%',
                  padding: 5,
                  fontSize: 15,
                  fontFamily: Font.medium,

                  shadowColor: '#6B6B66',
                }}
              />
            </View>
          </View>
          <Button
            onPress={() => formValidation()}
            buttonName={'Update'}
            loader={isloading}
          />
          <CustomText
            style={customStyle.changepassword}
            onPress={() => navigation.navigate('ChangeProfilePassword')}>
            Change Password
          </CustomText>
        </KeyboardAwareScrollView>
      </View>
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
                  <CustomText style={customStyle.coutrycod}>
                    {item.dial_code}
                  </CustomText>
                  <CustomText style={customStyle.coutrycod}>
                    {item.flag}
                  </CustomText>
                  <CustomText style={customStyle.coutrycod}>
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
  coutrycod: {
    color: '#1E1E1E',
    fontSize: 15,
    fontFamily: Font.samibold,
    margin: 5,
  },
  profile: {
    // backgroundColor: 'red',
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 20,
  },
  changepassword: {
    color: '#00ADEF',
    fontWeight: '500',
    fontFamily: Font.regular,
    fontSize: 16,
    alignSelf: 'center',
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
  mainContain: {
    backgroundColor: '#F2F6FF',
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    // paddingHorizontal: 20,
  },
});
