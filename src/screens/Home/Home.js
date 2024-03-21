import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
  Platform,
  Linking,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../comman/Header';
import QuizCard from '../Auth/QuizCard';
import CustomText from '../../comman/CustomText';
import Travel from '../../../asset/image/svg/Travel.svg';
import History from '../../../asset/image/svg/History.svg';
import Music from '../../../asset/image/svg/Music.svg';
import Education from '../../../asset/image/svg/education.svg';
import Font from '../../comman/Font';
import HomeCard from '../../../asset/image/svg/Homecard.svg';
import Close from '../../../asset/image/svg/close.svg';
import {Colors, DefaultImages} from '../../comman/Theme';
import SearchBox from '../../comman/SearchBox';
import Modal from 'react-native-modal';
import {GetFunction, LogoutFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {storeUserInformation} from '../../redux/reducers/UserInformations';
import {storeIapInformation} from '../../redux/reducers/IapInformations';
import {successToast, errorToast} from '../../comman/TostModal';
import PageLoader from '../../comman/PageLoader';
import {useIsFocused} from '@react-navigation/native';
import HomeI from '../../../asset/image/svg/Menu/home.svg';
import Quiz from '../../../asset/image/svg/Menu/quiz.svg';
import Search from '../../../asset/image/svg/Menu/search.svg';
import Leader from '../../../asset/image/svg/Menu/leader.svg';
import Subsc from '../../../asset/image/svg/Menu/suscu.svg';
import Out from '../../../asset/image/svg/Menu/logout.svg';
import Aero from '../../../asset/image/svg/Menu/Vector.svg';
import Button1 from '../../../asset/image/svg/Button1.svg';
import Button2 from '../../../asset/image/svg/Button2.svg';
import Button3 from '../../../asset/image/svg/Button3.svg';
import Button4 from '../../../asset/image/svg/Button4.svg';
import Forword from '../../../asset/image/svg/Forword.svg';
import Modal_Close from '../../../asset/image/svg/Modal_Close.svg';

export default function Home({navigation, route}) {
  const {height, width} = Dimensions.get('screen');
  const isfocused = useIsFocused();
  const disptch = useDispatch();
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  // console.log(userinfo);

  const [MenuModal, setmenuModal] = useState(false);
  const [previousScreen, setPreviousScreen] = useState(null);

  const MenuList = [
    {
      id: 1,
      titile: 'Home',
      routepage: 'Home',
      icon: <HomeI />,
      icon2: <Aero height={15} width={15} />,
    },
    {
      id: 4,
      titile: 'Search',
      routepage: 'Discover',
      icon: <Search />,
    },
    {
      id: 3,
      titile: 'Quiz',
      routepage: 'Discover',
      icon: <Quiz />,
    },
    {
      id: 5,
      titile: 'Leaderboard',
      routepage: 'LeaderBoard',
      icon: <Leader />,
    },
    {
      id: 8,
      titile: 'Notification',
      routepage: 'Notificaton',
      icon: <Leader />,
    },
    {
      id: 6,
      titile: 'Subscription',
      routepage: Platform.OS === 'ios' ? 'Subscription' : 'SubscriptionStrip',
      icon: <Subsc />,
    },
    {
      id: 2,
      titile: 'Profile',
      routepage: 'Profile',
      icon: <Quiz />,
    },
    {
      id: 9,
      titile: 'FlashCard',
      routepage: 'FlashCard',
      icon: <Quiz />,
    },

    {
      id: 7,
      titile: 'Logout',
      routepage: 'Login',
      icon: <Out />,
    },
  ];
  const NewTabs = [
    {
      id: 1,
      Name: 'Knowledge Quizzes',
      icon: <Button1 height={80} />,
      NaviePage: 'Discover',
    },
    {
      id: 2,
      Name: 'Warm-Up Blitz',
      icon: <Button2 height={115} />,
      NaviePage: 'WarmUpStart',
    },
    {
      id: 3,
      Name: 'Flashcards',
      icon: <Button3 />,
      NaviePage: 'FlashCard',
    },
    {
      id: 4,
      Name: 'Forums',
      icon: <Button4 height={115} />,
      NaviePage: '',
    },
  ];
  const NavigateComponent = async item => {
    let token = await AsyncStorage.getItem('Token');
    if (item.Name === 'Forums') {
      Linking.openURL(`${userinfo.forum}?forumtoken=${token}`);
      console.log(`${userinfo.forum}?forumtoken=${token}`);
    } else if (item.Name === 'Flashcards') {
      checkPlan();
    } else {
      navigation.navigate(item.NaviePage);
    }
  };

  const checkPlan = async () => {
    let url = `checkPayment`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log(result, 'result');
    if (result.success) {
      const Data = result.data;
      if (Data.status == 0) {
        errorToast(Data.message);
        navigation.navigate(
          Platform.OS === 'ios' ? 'Subscription' : 'SubscriptionStrip',
        );
      } else {
        navigation.navigate('FlashCard');
      }
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  const [Topics, setTopics] = useState([]);
  const [imageUrl, setimageurl] = useState('');
  const [LatestQuiz, setLatestQuiz] = useState([]);
  const [isloading, setloading] = useState(true);
  const [isSearQuiz, SearQuiz] = useState('');
  const [isLatestQuiz, setnewLatestQuiz] = useState([]);
  const [ActiveTab, SetActiveTab] = useState('attemptedQuiz');
  const [SelectQuiz, setSelectedquiz] = useState([]);

  const [OpenStreak, SetOpenStreak] = useState(false);
  useEffect(() => {
    SetActiveTab('attemptedQuiz');
    IAPKey();
    if (isfocused) {
      getUserDetail();
      getTopcsDetail();
    }
  }, [isfocused]);
  const IAPKey = async () => {
    let url = `getInnerPerchaseKey`;
    let token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log(result);
    if (result.success) {
      let IapId = result.data?.data;
      disptch(storeIapInformation(IapId));
    }
  };
  const getUserDetail = async () => {
    let url = `profile`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    // console.log('userinfo', result);
    if (result.success) {
      const Data = result.data;
      disptch(storeUserInformation(Data));
    } else {
      errorToast(result.data?.message);
    }
  };
  const getTopcsDetail = async () => {
    let url = `topicquizdata`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log('topicquizdata', result);
    if (result.success) {
      const Data = result.data;
      let filterData = Data.topicdata?.filter(i => i.id !== 20);
      setTopics(filterData);
      setLatestQuiz(Data.quizdata);
      setnewLatestQuiz(Data.latestquizdata);
      setSelectedquiz(Data.quizdata);
      setimageurl(Data);
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
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
      AsyncStorage.clear();
      navigation.navigate('Login');
    } else {
      errorToast(result.data?.message);
    }
  };
  const runMenuFunction = item => {
    setmenuModal(false);
    if (item.titile === 'Logout') {
      LogoutUser();
    } else {
      navigation.navigate(item.routepage);
    }
  };

  const ourQuiz = item => {
    if (item === 'attemptedQuiz') {
      setSelectedquiz(LatestQuiz);
    } else {
      setSelectedquiz(isLatestQuiz);
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2FBFE'}}>
      {isloading ? (
        <PageLoader color={'#00ADEF'} />
      ) : (
        <>
          <Header
            HeaderName={'Hi, ' + userinfo?.first_name}
            lefticon
            Righticon
            onPress={() => setmenuModal(true)}
            StirckActive={true}
            strickOpen={() => SetOpenStreak(true)}
            fire={true}
          />
          <ScrollView
            style={{flex: 1, marginTop: 15}}
            showsVerticalScrollIndicator={false}>
            <View style={{height: 70}} />
            <SearchBox
              value={isSearQuiz}
              onChangeText={text => SearQuiz(text)}
              placeholder={'Search for topic of quiz'}
              onPress={() =>
                navigation.navigate('Discover', {SearchText: isSearQuiz})
              }
            />
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {/* <ImageBackground
                imageStyle={{borderRadius: 12}}
                source={DefaultImages.homeCard}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 12,
                
                }}>
                <CustomText style={styles.together}>
                  Let's learn together
                </CustomText>
                <View style={{height: 90}} />
                <SearchBox
                  value={isSearQuiz}
                  onChangeText={text => SearQuiz(text)}
                  placeholder={'Search for topic of quiz'}
                  onPress={() =>
                    navigation.navigate('Discover', {SearchText: isSearQuiz})
                  }
                />
              </ImageBackground> */}

              <View
                style={{
                  width: '100%',
                  // height: 160,

                  marginTop: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText style={styles.Topics}>Topics</CustomText>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Discover')}>
                    <CustomText style={styles.Seeall}>See all</CustomText>
                  </TouchableOpacity>
                </View>

                <FlatList
                  horizontal
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  data={Topics}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('TopicDetails', {
                            TopicId: item,
                          })
                        }
                        style={{
                          // alignItems: 'center',
                          paddingVertical: 5,
                          paddingHorizontal: 3,
                          width: width / 4.3,

                          // backgroundColor: 'red',
                          // marginHorizontal: 2,
                        }}>
                        <View style={styles.iconstyle}>
                          <Image
                            style={{height: '50%', width: '50%'}}
                            source={{uri: item.image}}
                          />
                        </View>
                        <View
                          style={{
                            width: width / 6,
                            height: 'auto',
                            // alignItems: 'center',
                            paddingVertical: 10,
                            // backgroundColor: 'red',
                          }}>
                          <CustomText
                            style={{
                              textAlign: 'center',
                              color: 'rgba(30, 35, 44, 1)',
                              fontSize: 12,
                              fontWeight: '300',
                            }}>
                            {item.name}
                          </CustomText>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>

            <View style={[styles.quizarea]}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
               
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    ourQuiz('attemptedQuiz'), SetActiveTab('attemptedQuiz');
                  }}
                  style={{
                    borderBottomColor:
                      ActiveTab === 'attemptedQuiz' ? '#00ADEF' : null,
                    borderBottomWidth: ActiveTab === 'attemptedQuiz' ? 1 : 0,
                    // marginLeft: 20,
                  }}>
                  <CustomText
                    style={[
                      styles.laestQuiz,
                      {
                        color:
                          ActiveTab === 'attemptedQuiz' ? '#00ADEF' : '#1E232C',
                      },
                    ]}>
                    Latest attempted Quiz
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    ourQuiz('LatestQuiz'), SetActiveTab('LatestQuiz');
                  }}
                  style={{
                    borderBottomColor:
                      ActiveTab === 'LatestQuiz' ? '#00ADEF' : null,
                    borderBottomWidth: ActiveTab === 'LatestQuiz' ? 1 : 0,
                    // marginRight: 20,
                  }}>
                  <CustomText
                    style={[
                      styles.laestQuiz,
                      {
                        color:
                          ActiveTab === 'LatestQuiz' ? '#00ADEF' : '#1E232C',
                      },
                    ]}>
                    Our Latest Quiz
                  </CustomText>
                </TouchableOpacity>
              </View> */}

              {/* {SelectQuiz.length > 0 ? (
                <View style={{alignItems: 'center'}}>
                  {SelectQuiz.map(item => (
                    <QuizCard
                      item={item}
                      onPress={() =>
                        navigation.navigate('QuizStart', {QuizId: item.id})
                      }
                    />
                  ))}
                </View>
              ) : (
                <CustomText style={[styles.laestQuiz, {textAlign: 'center'}]}>
                  {' '}
                  No Quiz Found
                </CustomText>
              )} */}
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  marginBottom: 15,
                }}
                numColumns={2}
                data={NewTabs}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      // onPress={() => navigation.navigate(item.NaviePage)}
                      onPress={() => NavigateComponent(item)}
                      style={{
                        height: 200,
                        width: Dimensions.get('window').width / 2 - 20,
                        marginLeft: 5,

                        borderRadius: 15,
                        marginTop: 10,
                      }}>
                      <ImageBackground
                        borderRadius={15}
                        style={{
                          height: '100%',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        source={DefaultImages.ButtonImage}>
                        <View style={{alignItems: 'flex-end', width: '85%'}}>
                          <Forword />
                        </View>

                        {item.icon}
                        <CustomText style={styles.buttonTitle}>
                          {item.Name}
                        </CustomText>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('FullLengthQuiz')}
                style={{
                  marginHorizontal: 15,
                  height: 150,
                  borderRadius: 15,

                  marginBottom: '20%',
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 20}}
                  style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    // paddingHorizontal: 15,
                  }}
                  source={DefaultImages.ButtonImage}>
                  <Button1 />
                  <CustomText style={[styles.buttonTitle, {marginLeft: '1%'}]}>
                    Full Length Exams
                  </CustomText>
                  <View
                    style={{
                      height: '100%',
                      paddingVertical: 10,
                      // backgroundColor: 'red',
                    }}>
                    <Forword />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
      {/* //// Strek modal */}
      <Modal
        testID={'modal'}
        isVisible={OpenStreak}
        onSwipeComplete={() => SetOpenStreak(false)}
        onBackdropPress={() => SetOpenStreak(false)}
        style={styles.view}>
        <SafeAreaView style={{height: '100%'}}>
          <Pressable style={{flex: 1}} onPress={() => SetOpenStreak(false)}>
            <ImageBackground
              borderRadius={15}
              source={DefaultImages.PopUpImage}
              style={styles.cardView}>
              <TouchableOpacity
                onPress={() => SetOpenStreak(false)}
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}>
                <Modal_Close />
              </TouchableOpacity>
              <Pressable onPress={() => null}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <CustomText
                    style={{
                      fontSize: 22,
                      color: '#FFF',
                      fontFamily: Font.bold,
                    }}>
                    How does Streak Work
                  </CustomText>
                </View>

                <CustomText
                  style={{
                    color: '#FFF',
                    fontFamily: Font.regular,
                    fontSize: 15,
                    textAlign: 'left',
                    marginTop: 20,
                  }}>
                  To maintain your streak, you must participate in at least one
                  full length exam or knowledge quiz daily. The streak will also
                  help you to earn badges.
                </CustomText>
              </Pressable>
            </ImageBackground>
          </Pressable>
        </SafeAreaView>
      </Modal>
      <Modal
        testID={'modal'}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        animationInTiming={500}
        animationOutTiming={500}
        isVisible={MenuModal}
        onSwipeComplete={() => setmenuModal(false)}
        onBackdropPress={() => setmenuModal(false)}
        style={styles.view}>
        <SafeAreaView style={styles.content}>
          {/* <TouchableOpacity
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
            }}>
            <Image
              source={{uri: userinfo?.profile_pic}}
              style={{height: '100%', width: '100%', borderRadius: 50}}
            />
          </TouchableOpacity>
          <CustomText>{userinfo.first_name}</CustomText> */}

          <TouchableOpacity
            style={{marginHorizontal: 15, alignItems: 'flex-end'}}
            onPress={() => setmenuModal(false)}>
            <Close height={30} width={30} />
          </TouchableOpacity>

          <FlatList
            data={MenuList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.MenuListButton,
                    {
                      borderWidth: item.icon2 ? 1 : null,
                      borderColor: item.icon2 ? '#FFF' : null,
                      width: item.icon2 ? 130 : null,
                    },
                  ]}
                  onPress={() => {
                    runMenuFunction(item);
                  }}>
                  <View>{item.icon}</View>
                  <CustomText style={styles.menttext}>{item.titile}</CustomText>
                  <View style={{marginLeft: 15}}>{item.icon2}</View>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  cardView: {
    backgroundColor: Colors.default,
    margin: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonTitle: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: Font.samibold,
    marginTop: 15,
  },
  TipesView: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#FFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  menttext: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    fontFamily: Font.regular,
    marginLeft: 10,
  },
  MenuListButton: {
    flexDirection: 'row',
    margin: 15,
    height: 45,
    paddingLeft: 10,
    // backgroundColor: '#FFF',
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  content: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00ADEF',
  },
  view: {
    // justifyContent: 'flex-end',
    margin: 0,
  },
  together: {
    color: '#FFFFFF',
    fontFamily: Font.regular,
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  Seeall: {
    color: '#9C9C9C',
    fontSize: 14,
    fontFamily: Font.regular,
  },
  laestQuiz: {
    color: '#1E232C',
    margin: 20,
  },
  quizarea: {
    // paddingHorizontal: 20,
    paddingTop: 10,

    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Topics: {
    color: '#1E232C',
    fontSize: 16,
    fontFamily: Font.samibold,
    marginBottom: 5,
  },
  iconstyle: {
    height: 70,
    width: 70,
    // height: '55%',
    // width: '75%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
