import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../comman/Header';
import {Colors, DefaultImages} from '../../comman/Theme';
import {useSelector} from 'react-redux';
import CustomText from '../../comman/CustomText';
import Fire from '../../../asset/image/svg/Fire.svg';
import BadgsIcon from '../../../asset/image/svg/BadgsIcon.svg';
import ActiveGreen from '../../../asset/image/svg/ActiveGreen.svg';
import InactiveGreen from '../../../asset/image/svg/InactiveGreen.svg';
import Font from '../../comman/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetFunction} from '../../comman/Api';
import PageLoader from '../../comman/PageLoader';
import {SvgUri} from 'react-native-svg';
import {SvgUrl} from '../../comman/BaseUrl';

export default function Badge({navigation}) {
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);

  const [isBadges, setBadges] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [ActiveBadges, SetActiveBadges] = useState([]);
  useEffect(() => {
    getBadges();
  }, []);
  const getBadges = async () => {
    let url = `getbadge`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log('badge', result);

    if (result.success) {
      let Data = result.data?.data;
      setBadges(Data);
      let Badges = Data?.some(
        i =>
          i.badgeStatus === true &&
          i.streakStatus === true &&
          i.warmStatus === true,
      );
      if (Badges) {
        let ActiveBadges = Data?.filter(
          i =>
            i.badgeStatus === true &&
            i.streakStatus === true &&
            i.warmStatus === true,
        );
        SetActiveBadges(ActiveBadges);
      }

      setLoading(false);
    } else {
      errorToast(result.data?.message);
      setLoading(false);
    }
  };
  const Data = [
    {
      id: 1,
      Title: 'Pro',
      LExam: 5,
      upto: 2,
      days: 30,
    },
    {
      id: 1,
      Title: 'Classic',
      LExam: 3,
      upto: 1,
      days: 15,
    },
    {
      id: 1,
      Title: 'Beginner',
      LExam: 1,
      upto: 1,
      days: 10,
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        HeaderName={'Badges'}
        textcolor={'#FFF'}
        onPress={() => navigation.goBack()}
      />
      {Loading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <View
          style={{
            backgroundColor: '#F2F6FF',
            flex: 1,
            marginTop: 10,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            paddingHorizontal: 20,
          }}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <ImageBackground
              imageStyle={{borderRadius: 15}}
              source={DefaultImages.ProfileBack}
              style={{
                // width: '100%',
                padding: 15,
                backgroundColor: Colors.default,
                marginTop: 20,
                borderRadius: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{height: 50, width: 50}}>
                  <Image
                    borderRadius={25}
                    source={{uri: userinfo.profile_pic}}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>

                <View style={{marginLeft: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <CustomText
                      style={[Styles.userName, {width: 215}]}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}>
                      {userinfo.first_name} {userinfo.last_name}{' '}
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Fire height={25} width={28} />
                      <CustomText
                        style={[
                          Styles.userName,
                          {marginLeft: 5, fontSize: 20},
                        ]}>
                        {userinfo.streak}
                      </CustomText>
                    </View>
                  </View>

                  <CustomText style={Styles.userEmail}>
                    {userinfo.email}
                  </CustomText>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{height: 10, width: 60}}></View>
                <View>
                  {/* <CustomText style={Styles.userName}>
                    Full Length Exams: 5
                  </CustomText>
                  <CustomText style={[Styles.userName, {marginVertical: 8}]}>
                    Score: 100%
                  </CustomText> */}
                  {ActiveBadges.length > 0 ? (
                    <>
                      {ActiveBadges.map(i => {
                        return (
                          <CustomText style={Styles.userName}>
                            Badge:
                            {i.title}
                          </CustomText>
                        );
                      })}
                    </>
                  ) : (
                    <CustomText style={Styles.userName}>Badge: N/A</CustomText>
                  )}
                </View>
              </View>
            </ImageBackground>
            <CustomText style={Styles.heading}>Other Badges</CustomText>
            <FlatList
              data={isBadges}
              renderItem={({item}) => {
                return (
                  <View
                    style={{width: '100%', height: 180, alignItems: 'center'}}>
                    <ImageBackground
                      source={DefaultImages.BadgesBackImage}
                      imageStyle={{
                        paddingHorizontal: 15,
                        borderRadius: 20,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        // marginVertical: 15,
                        // borderRadius: 15,

                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#e4e9ff',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 55,
                          width: 100,
                          height: 100,
                          paddingTop: 5,
                          marginTop: 20,
                          marginLeft: 10,
                        }}>
                        <SvgUri
                          width={'100%'}
                          height={'100%'}
                          uri={`${SvgUrl}${item.icon}`}
                        />
                        {/* <BadgsIcon /> */}
                      </View>

                      <View style={{marginLeft: 15, marginTop: 10}}>
                        <CustomText style={[Styles.userName, {fontSize: 24}]}>
                          {item.title}
                        </CustomText>
                        <View style={Styles.TextView}>
                          <CustomText style={[Styles.userName, {fontSize: 14}]}>
                            Full Length Exams: {item.exam_length}
                          </CustomText>

                          {item.badgeStatus ? (
                            <ActiveGreen />
                          ) : (
                            <InactiveGreen />
                          )}
                        </View>
                        <View style={Styles.TextView}>
                          <CustomText
                            style={[
                              Styles.userName,
                              {marginVertical: 8, fontSize: 14},
                            ]}>
                            Warm-Up Blitz: {item.warmup}
                          </CustomText>
                          {item.warmStatus ? (
                            <ActiveGreen />
                          ) : (
                            <InactiveGreen />
                          )}
                        </View>
                        <View style={Styles.TextView}>
                          <CustomText style={[Styles.userName, {fontSize: 14}]}>
                            Streaks: {item.streak} days
                          </CustomText>

                          {item.streakStatus ? (
                            <ActiveGreen />
                          ) : (
                            <InactiveGreen />
                          )}
                        </View>

                        <TouchableOpacity style={Styles.buttonView}>
                          <CustomText style={[Styles.userName, {fontSize: 14}]}>
                            Claim Badge
                          </CustomText>
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  TextView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    justifyContent: 'space-between',
  },
  buttonView: {
    borderWidth: 1,
    borderColor: '#46a1fe',
    backgroundColor: '#46a1fe',
    padding: 5,
    marginTop: 10,
    borderRadius: 8,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: Font.samibold,
  },
  userEmail: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: Font.regular,
    marginVertical: 3,
  },
  heading: {
    color: '#000',
    fontSize: 24,
    fontFamily: Font.samibold,
    marginVertical: 15,
  },
});
