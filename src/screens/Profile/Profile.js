import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '../../comman/Header';
import {Colors, DefaultImages} from '../../comman/Theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../comman/CustomText';
import Edit from '../../../asset/image/svg/ProfileEdit.svg';
import Font from '../../comman/Font';
import Plan from '../../../asset/image/svg/ActivePlan.svg';
import Badge from '../../../asset/image/svg/Badge.svg';
import Forward from '../../../asset/image/svg/Forward.svg';
import Navigation from '../../navigation/Navigation';
import {useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import {LogoutFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorToast, successToast} from '../../comman/TostModal';
import CircularProgress from '../../comman/CircularProgress';

export default function Profile({navigation}) {
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  // console.log(userinfo);
  const Newpages = [
    {
      id: 1,
      title: 'Terms and condition',
      route: 'Profile',
    },
    {
      id: 2,
      title: 'About us',
      route: 'Profile',
    },
    {
      id: 3,
      title: 'Delete account',
      route: 'Login',
    },
    {
      id: 4,
      title: 'Logout',
      route: 'Login',
    },
  ];
  const PressAction = item => {
    if (item.title === 'Terms and condition') {
      Linking.openURL(userinfo.terms);
    } else if (item.title === 'About us') {
      Linking.openURL(userinfo.about);
    } else if (item.title === 'Delete account') {
      LogoutUser();
    } else {
      LogoutUser();
    }

    // navigation.navigate(item.route);
  };
  const LogoutUser = async () => {
    let url = `logout`;
    const token = await AsyncStorage.getItem('Token');
    const result = await LogoutFunction(url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data;
      // disptch(storeUserInformation(Data));
      successToast(Data.message);
      AsyncStorage.removeItem('Token');
      navigation.navigate('Login');
    } else {
      errorToast(result.data?.message);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        HeaderName={'Profile'}
        textcolor={'#FFF'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={customStyle.maincontain}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00ADEF', '#002299']}
          style={customStyle.profileView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Image
                  style={{height: '100%', width: '100%', borderRadius: 50}}
                  source={{uri: userinfo.profile_pic}}
                />
              </View>
              <View style={{paddingLeft: 20, width: '60%'}}>
                <CustomText
                  style={customStyle.username}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {userinfo.first_name} {userinfo.last_name}
                </CustomText>
                <CustomText
                  style={customStyle.usemail}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {userinfo.email}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={{
                backgroundColor: '#FFF',
                width: 60,
                height: 25,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 25,
              }}>
              <Edit />
              <CustomText style={customStyle.PaymentHistory}>Edit</CustomText>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => navigation.navigate('LeaderBoard')}
          style={customStyle.rangeView}>
          {/* <Progress.Pie
            progress={0.1}
            size={90}
            color="rgba(0, 173, 239, 1)"
            borderWidth={5}
            showsText={true}
            unfilledColor="red"
          /> */}
          <CircularProgress
            radius={40}
            strokeWidth={10}
            backgroundColor="#ccc"
            progressColor="rgba(0, 173, 239, 1)"
            textColor="rgba(0, 173, 239, 1)"
            duration={3000}
            initialValue={0}
            finalValue={100 / (userinfo?.rank || 1)}
            progress={'hello'}
          />

          <View style={{paddingHorizontal: 20}}>
            <CustomText style={customStyle.AttemptedQuizzes}>
              Attempted Quizzes:
              <CustomText style={customStyle.Score}>
                {userinfo.attempt_quizzes}
              </CustomText>
            </CustomText>
            <CustomText style={customStyle.AttemptedQuizzes}>
              Score:
              <CustomText style={customStyle.Score}>
                {' '}
                {userinfo.score}%
              </CustomText>
            </CustomText>

            <CustomText style={customStyle.AttemptedQuizzes}>
              Rank:{' '}
              <CustomText style={customStyle.Score}>{userinfo.rank}</CustomText>
            </CustomText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={customStyle.rangeView2}
          onPress={() => {
            navigation.navigate(
              Platform.OS === 'ios' ? 'Subscription' : 'SubscriptionStrip',
            );
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Plan />
            <View style={{paddingHorizontal: 20}}>
              <CustomText style={customStyle.ActivePlan}>
                Active Plan
              </CustomText>
              <CustomText style={customStyle.VIP}>VIP</CustomText>
            </View>
          </View>

          <Forward />
        </TouchableOpacity>
        <TouchableOpacity
          style={customStyle.rangeView2}
          onPress={() => navigation.navigate('Badge')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Badge />
            <View style={{paddingHorizontal: 20}}>
              <CustomText style={customStyle.ActivePlan}>
                Active Badge
              </CustomText>
              <CustomText style={customStyle.VIP}>PRO</CustomText>
            </View>
          </View>

          <Forward />
        </TouchableOpacity>
        {Newpages.map(item => (
          <TouchableOpacity
            style={customStyle.rangeView2}
            onPress={() => PressAction(item)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Plan />
              <View style={{paddingHorizontal: 20}}>
                {/* <CustomText style={customStyle.ActivePlan}>
                  Active Plan
                </CustomText> */}
                <CustomText style={customStyle.VIP}>{item.title}</CustomText>
              </View>
            </View>

            <Forward />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'rgba(0, 173, 239, 1)',
  },
  Score: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Font.regular,
    color: 'rgba(0, 173, 239, 1)',
  },
  AttemptedQuizzes: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Font.regular,
    color: 'rgba(30, 30, 30, 1)',
    paddingVertical: 3,
  },
  VIP: {
    color: '#00ADEF',
    fontWeight: '500',
    fontFamily: Font.regular,
    fontSize: 14,
  },
  ActivePlan: {
    color: '#9C9C9C',
    fontWeight: '500',
    fontSize: 12,
    fontFamily: Font.regular,
  },
  rangeView2: {
    backgroundColor: '#FFF',
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },

  rangeView: {
    backgroundColor: '#FFF',
    height: 100,
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  usemail: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: Font.regular,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Font.samibold,
  },
  profileView: {
    width: '100%',
    // backgroundColor: '#00ADEF',
    height: 80,
    borderRadius: 20,
    marginTop: 20,
  },
  PaymentHistory: {
    color: '#1E1E1E',
    fontSize: 11,
    fontFamily: Font.samibold,
    marginLeft: 5,
  },
  maincontain: {
    backgroundColor: '#F2F6FF',
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
  },
});
