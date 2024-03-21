import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../comman/Header';
import LinearGradient from 'react-native-linear-gradient';
import Font from '../../comman/Font';
import {DefaultImages, Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Leader from '../../../asset/image/svg/LeaderBoard.svg';
import Taj from '../../../asset/image/svg/taj.svg';
import {GetFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorToast, successToast} from '../../comman/TostModal';
import {CollectBankAccountError} from '@stripe/stripe-react-native';

export default function LeaderBoard({navigation}) {
  const userList = [
    {
      id: '1',
      name: 'Nitesh Biswas',
      quizzes: '20',
      score: '100%',
      image: require('../../../asset/image/other/Ellipse1.png'),
      rank: '4',
    },
    {
      id: '1',
      name: 'Nitesh Biswas',
      quizzes: '20',
      score: '100%',
      image: require('../../../asset/image/other/Ellipse1.png'),
      rank: '4',
    },
    {
      id: '1',
      name: 'Nitesh Biswas',
      quizzes: '20',
      score: '100%',
      image: require('../../../asset/image/other/Ellipse1.png'),
      rank: '4',
    },
    {
      id: '1',
      name: 'Nitesh Biswas',
      quizzes: '20',
      score: '100%',
      image: require('../../../asset/image/other/Ellipse1.png'),
      rank: '4',
    },
    {
      id: '1',
      name: 'Nitesh Biswas',
      quizzes: '20',
      score: '100%',
      image: require('../../../asset/image/other/Ellipse1.png'),
      rank: '4',
    },
    {
      id: '1',
      name: 'Nitesh Biswas',
      quizzes: '20',
      score: '100%',
      image: require('../../../asset/image/other/Ellipse1.png'),
      rank: '4',
    },
  ];
  const [isloading, setloading] = useState(true);
  const [firstRank, setfirstRank] = useState('');
  const [SecondtRank, SecondfirstRank] = useState('');
  const [ThirdRank, ThirdfirstRank] = useState('');
  const [leaderSheet, setleaderSheet] = useState([]);
  useEffect(() => {
    getAlluserList();
  }, []);
  const getAlluserList = async () => {
    let url = `getleaderboard`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data;
      successToast(result.data?.message);
      setleaderSheet(Data.bottomdata);
      setfirstRank(Data?.topdata[0]);
      SecondfirstRank(Data?.topdata[1]);
      ThirdfirstRank(Data?.topdata[2]);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        HeaderName={'Leaderboard'}
        textcolor={'#FFF'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            // marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00ADEF', '#002299']}
            style={customStyle.profileView}>
            <CustomText style={customStyle.boxtext}>
              You're doing better then 30% of users, your rank is 20 Let's see
              other
            </CustomText>
          </LinearGradient>

          <View
            style={{
              width: '100%',
              height: 350,
              padding: 20,
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View
              style={{
                alignSelf: 'flex-end',
                // justifyContent: 'flex-start',
                width: '32%',

                height: 150,
                backgroundColor: 'rgba(30, 34, 55, 1)',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  // position: 'absolute',

                  // transform: [{translateY: '-20%'}],
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#FFF',
                    borderRadius: 50,
                    height: 80,
                    width: 80,
                    backgroundColor: '#FFF',
                    position: 'absolute',
                    bottom: '95%',
                  }}>
                  <Image
                    source={{uri: SecondtRank?.profile_pic}}
                    style={{height: '100%', width: '100%', borderRadius: 60}}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    backgroundColor: 'rgba(0, 155, 214, 1)',
                    height: 40,
                    width: 40,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{rotate: '45deg'}],
                  }}>
                  <CustomText
                    style={{
                      transform: [{rotate: '-45deg'}],
                      fontWeight: '600',
                      fontSize: 16,
                      fontFamily: Font.regular,
                      color: '#FFF',
                    }}>
                    2
                  </CustomText>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    // marginVertical: '10%',
                  }}>
                  <CustomText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      customStyle.username,
                      {marginVertical: 10, color: '#FFF'},
                    ]}>
                    {SecondtRank?.username}
                  </CustomText>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      width: '80%',
                      height: 50,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText style={customStyle.quizzes}>
                      Quizzez :{SecondtRank?.total_quiz}
                    </CustomText>
                    <CustomText style={customStyle.score}>
                      Score:{SecondtRank?.total_score}%
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: '100%',
                width: '32%',
                justifyContent: 'flex-end',
                // marginTop: 20,
              }}>
              <View
                style={{
                  // backgroundColor: 'red',
                  height: 100,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: '50%',
                  position: 'absolute',
                  zIndex: 9,
                  // backgroundColor: 'red',
                  // marginTop: '40%',
                }}>
                <Taj marginBotton={10} />
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#FFF',
                    borderRadius: 50,
                    height: 80,
                    width: 80,
                    backgroundColor: '#FFF',
                    // position: 'absolute',
                    // bottom: '95%',
                    // zIndex: 9,
                  }}>
                  <Image
                    source={{uri: firstRank?.profile_pic}}
                    style={{height: '100%', width: '100%', borderRadius: 60}}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    backgroundColor: 'rgba(0, 155, 214, 1)',
                    height: 40,
                    width: 40,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{rotate: '45deg'}, {translateY: -10}],
                    zIndex: 99,
                    marginRight: 10,
                  }}>
                  <CustomText
                    style={{
                      color: '#FFF',
                      transform: [{rotate: '-45deg'}],
                      fontWeight: '600',
                      fontSize: 16,
                      fontFamily: Font.regular,
                    }}>
                    1
                  </CustomText>
                </View>
              </View>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                colors={['#00ADEF', '#002299']}
                style={{
                  width: '100%',
                  height: 190,
                  alignItems: 'center',
                  // alignSelf: 'flex-end',
                  // justifyContent: 'flex-end',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  // zIndex: -99,
                }}>
                {/* <View
                style={{
                  alignItems: 'center',
                  zIndex: 99,
                  position: 'absolute',

                  transform: [{translateY: '-20%'}],
                }}> */}

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',

                    height: '100%',

                    // marginVertical: '10%',
                  }}>
                  <CustomText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      customStyle.username,
                      {marginVertical: 10, color: '#FFF'},
                    ]}>
                    {firstRank?.username}
                  </CustomText>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      width: '80%',
                      height: 50,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText style={customStyle.quizzes}>
                      Quizzez :{firstRank?.total_quiz}
                    </CustomText>
                    <CustomText style={customStyle.score}>
                      Score:{firstRank?.total_score}%
                    </CustomText>
                  </View>
                </View>
                {/* </View> */}
              </LinearGradient>
            </View>

            <View
              style={{
                alignSelf: 'flex-end',
                width: '32%',
                height: 150,
                backgroundColor: 'rgba(30, 34, 55, 1)',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  // position: 'absolute',

                  // transform: [{translateY: '-20%'}],
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#FFF',
                    borderRadius: 50,
                    height: 80,
                    width: 80,
                    backgroundColor: '#FFF',
                    position: 'absolute',
                    bottom: '95%',
                  }}>
                  <Image
                    source={{uri: ThirdRank?.profile_pic}}
                    style={{height: '100%', width: '100%', borderRadius: 60}}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    backgroundColor: 'rgba(0, 155, 214, 1)',
                    height: 40,
                    width: 40,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{rotate: '45deg'}],
                  }}>
                  <CustomText
                    style={{
                      transform: [{rotate: '-45deg'}],
                      fontWeight: '600',
                      fontSize: 16,
                      fontFamily: Font.regular,
                      color: '#FFF',
                    }}>
                    3
                  </CustomText>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    // marginVertical: '10%',
                  }}>
                  <CustomText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      customStyle.username,
                      {marginVertical: 10, color: '#FFF'},
                    ]}>
                    {ThirdRank?.username}
                  </CustomText>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      width: '80%',
                      height: 50,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText style={customStyle.quizzes}>
                      Quizzez :{ThirdRank?.total_quiz}
                    </CustomText>
                    <CustomText style={customStyle.score}>
                      Score:{ThirdRank?.total_score}%
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>

            {/* <ImageBackground
              style={{width: '100%', height: '100%'}}
              source={require('../../../asset/image/other/LeaderBlank.png')}>
              <View
                style={{
                  // backgroundColor: 'red',
                  width: '100%',
                  height: 75,
                  marginVertical: '8%',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: '100%', width: '23%'}}
                  source={require('../../../asset/image/other/Avtarimage.png')}
                />
              </View>
              <View
                style={{
                  width: '97%',
                  height: 70,
                  // backgroundColor: 'red',
                  position: 'absolute',
                  marginVertical: '23%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}>
                <Image
                  style={{height: '100%', width: '23%'}}
                  source={require('../../../asset/image/other/Avtarimage.png')}
                />
                <Image
                  style={{height: '100%', width: '23%'}}
                  source={require('../../../asset/image/other/Avtarimage.png')}
                />
              </View>
            </ImageBackground> */}
            {/* <Leader /> */}
          </View>
        </View>

        <View style={customStyle.mainContain}>
          <CustomText style={customStyle.leaders}>Other Leaders</CustomText>
          {leaderSheet.length > 0 ? (
            leaderSheet.map((item, index) => (
              <View style={customStyle.userliseviw}>
                <View style={customStyle.numberview}>
                  <CustomText style={customStyle.number}>
                    {index + 4}
                  </CustomText>
                </View>
                <View
                  style={{
                    height: 60,
                    width: 60,
                    marginLeft: 15,
                    borderWidth: 2,
                    borderRadius: 30,
                    borderColor: '#FFAA00',
                  }}>
                  <Image
                    source={{uri: item.profile_pic}}
                    style={{height: '100%', width: '100%', borderRadius: 50}}
                  />
                </View>
                <View style={{marginLeft: 15}}>
                  <CustomText style={customStyle.username}>
                    {item.username}
                  </CustomText>
                  <CustomText style={customStyle.quizzes}>
                    Quizzes: {item.total_quiz}
                  </CustomText>
                  <CustomText style={customStyle.score}>
                    Score: {item.total_score}%
                  </CustomText>
                </View>
                <View
                  style={{
                    backgroundColor: Colors.default,
                    paddingHorizontal: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    marginLeft: '5%',
                  }}>
                  <CustomText
                    style={{
                      color: '#FFF',
                      fontSize: 14,
                      fontFamily: Font.bold,
                    }}>
                    PRO
                  </CustomText>
                </View>
              </View>
            ))
          ) : (
            <View style={{height: 300, backgroundColor: '#FFF'}}>
              <CustomText style={customStyle.username}>
                No Leader Found
              </CustomText>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
  firstuser: {
    // alignSelf: 'center',
  },
  firstuser: {
    height: 150,
    width: 100,
    bottom: 20,
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
  },
  boxtext: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: Font.regular,
  },
  numberview: {
    backgroundColor: '#00ADEF',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(201, 201, 201, 1)',
  },
  number: {
    color: '#1E1E1E',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Font.regular,
  },
  score: {
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Font.regular,
  },
  quizzes: {
    color: '#00ADEF',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Font.regular,
    marginVertical: 2,
  },
  username: {
    color: '#1E1E1E',
    fontWeight: '500',
    fontSize: 14,
    fontFamily: Font.regular,
  },
  leaders: {
    color: '#161B1D',
    margin: 20,
    fontWeight: '500',
    fontSize: 15,
    fontFamily: Font.regular,
  },
  userliseviw: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 80,
    width: '100%',
    margin: 5,
    borderRadius: 12,
    alignItems: 'center',
    padding: 15,
  },
  blackbackground: {
    backgroundColor: '#1E2237',
    height: 100,
    width: '100%',
    borderRadius: 12,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileView: {
    width: '90%',
    // backgroundColor: '#00ADEF',
    height: 80,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00229980',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContain: {
    backgroundColor: '#F2F6FF',
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
  },
});
