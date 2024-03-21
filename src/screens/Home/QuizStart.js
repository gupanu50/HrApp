import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Header from '../../comman/Header';
import CustomText from '../../comman/CustomText';
import Font from '../../comman/Font';
import Button from '../../comman/Button';
import Point from '../../../asset/image/svg/Point.svg';
import Question from '../../../asset/image/svg/Question.svg';
import Timer from '../../../asset/image/svg/Timer.svg';
import DocIcon from '../../../asset/image/svg/NormalIcon.svg';
import {GetFunction, PostFunction, UpdateFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageLoader from '../../comman/PageLoader';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';
import {useIsFocused} from '@react-navigation/native';
import TimeContext from '../../comman/TimeContext';
import Modal from 'react-native-modal';
import Input from '../../comman/Input';
import QuestionIcon from '../../../asset/image/svg/QuestionCircul.svg';
import Modal_Close from '../../../asset/image/svg/Modal_Close.svg';
import {Colors, DefaultImages} from '../../comman/Theme';
import {GetLinbkedFunction} from '../../comman/Api';

export default function QuizStart({navigation, route}) {
  const isfocused = useIsFocused();
  const {height, width} = Dimensions.get('screen');
  const {QuizId} = route.params;
  const [isloading, setloading] = useState(true);
  const [quizDetails, setquizDetails] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const {setTimeLeft, setTimeStatus} = useContext(TimeContext);
  const [NewTime, SetNewtime] = useState('');
  const [OpentModal, setModal] = useState(false);
  const [isupdatetime, updatetime] = useState('');
  const [OpenStreak, SetOpenStreak] = useState(false);

  useEffect(() => {
    getQuizzDetails();
  }, [isfocused]);
  const getQuizzDetails = async () => {
    let url = `quizdetail`;
    let data = new FormData();
    data.append('quizid', QuizId);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data;
      setquizDetails(Data.quizdetail);
      if (Data.quizdetail?.usersettime) {
        SetNewtime(Data.quizdetail?.usersettime);
      } else {
        SetNewtime(Data.quizdetail?.total_min);
      }

      setimageUrl(Data.imagepath);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  const startQuiz = () => {
    // if (quizDetails.quizassign === 'true') {
    //   warnToast('You have already attend this quiz!');
    // } else {
    if (quizDetails.assign_question > 0) {
      let quizTime = NewTime * 60;

      setloading(true);
      setTimeLeft(quizTime);

      setTimeout(() => {
        navigation.navigate('Question', {
          QuizId: QuizId,
          timeStatus: quizDetails.quiztime,
          TotalTime: quizDetails.total_min,
          Title: quizDetails.name,
        });
      }, 1000);
    } else {
      warnToast('Warring', 'No Question assign in this quizz!');
    }
    // }
  };
  const formattedTime = formatTime(NewTime);
  function formatTime(timeInMins) {
    const minutes = parseInt(timeInMins);
    const formattedTime = `00:${minutes.toString().padStart(2, '0')}:00`;
    return formattedTime;
  }
  const SetQuizTime = () => {
    setModal(!OpentModal);
  };

  const setNetTime = async () => {
    const token = await AsyncStorage.getItem('Token');
    let url = `quiztimeupdate`;
    let data = new FormData();
    data.append('quizid', QuizId);
    data.append('time', isupdatetime);
    const result = await UpdateFunction(data, url, token);
    if (result.success) {
      const Data = result.data;
      getQuizzDetails();
      setModal(false);
      //  SetNewtime(isupdatetime)
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  const checkPlan = async () => {
    let url = `checkPayment`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data;
      if (Data.status == 0) {
        errorToast(Data.message);
        navigation.navigate(
          Platform.OS === 'ios' ? 'Subscription' : 'SubscriptionStrip',
        );
      } else {
        startQuiz();
      }
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#00ADEF'}}>
      {isloading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <>
          <SafeAreaView />
          <Header
            HeaderName={quizDetails.name}
            textcolor={'#FFF'}
            onPress={() => navigation.goBack()}
          />

          <ScrollView
            contentContainerStyle={{flex: 1}}
            style={{
              height: height,
              backgroundColor: '#f2f6ff',
              marginTop: 15,
            }}>
            <View style={{width: 'auto', height: 300}}>
              <Image
                style={{width: '100%', height: '100%'}}
                // source={require('../../../asset/image/other/Rectangle195.png')}
                source={{uri: quizDetails.image}}
              />
            </View>

            <View style={[styles.startcontain, {height: height}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 70,
                }}>
                <View style={{width: '70%'}}>
                  <CustomText style={styles.textname}>
                    {quizDetails.name}
                  </CustomText>
                  <CustomText style={styles.textnamehead}>
                    {quizDetails.topicname}
                  </CustomText>
                </View>

                <TouchableOpacity
                  disabled={quizDetails.quiz_status === 1 ? false : true}
                  onPress={() => SetQuizTime()}
                  style={{
                    height: 35,
                    width: 80,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#D9D9D9',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <Timer width={20} height={20} />
                  <CustomText style={styles.timerTime}>
                    {formattedTime}
                  </CustomText>
                </TouchableOpacity>
                {quizDetails.quiz_status == 1 ? (
                  <TouchableOpacity onPress={() => SetOpenStreak(true)}>
                    {/* <QuestionIcon /> */}
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={styles.pointNumber}>
                <View style={styles.Pointbox}>
                  <Question />
                  <CustomText style={styles.pointtext}>
                    {' '}
                    {quizDetails.assign_question} Questions
                  </CustomText>
                </View>

                <View style={styles.Pointbox}>
                  <Point />
                  <CustomText style={styles.pointtext}>
                    {' '}
                    {quizDetails.total_score} Points
                  </CustomText>
                </View>
                <View style={[styles.Pointbox, {width: '20%'}]}>
                  <DocIcon />
                  <CustomText style={styles.pointtext}>
                    {quizDetails.quiz_status === 1
                      ? quizDetails.total_min || quizDetails.usersettime == 0
                        ? 'Non Timed'
                        : 'Timed'
                      : `Full length quiz`}
                  </CustomText>
                </View>
              </View>
              <CustomText style={styles.discription}>Description</CustomText>
              <CustomText style={styles.descriptiondetails}>
                {quizDetails.description}
              </CustomText>
            </View>
          </ScrollView>
          <View style={{backgroundColor: '#f2f6ff'}}>
            <Button
              loader={isloading}
              buttonName={'Start the Quiz'}
              // onPress={() => startQuiz()}
              onPress={() => checkPlan()}
            />
          </View>
        </>
      )}
      <Modal
        isVisible={OpentModal}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
        style={{margin: 0, alignItems: 'center'}}>
        <View
          style={{
            width: '80%',
            backgroundColor: '#FFF',
            borderRadius: 10,
            padding: 10,
          }}>
          <CustomText style={[styles.descriptiondetails, {margin: 10}]}>
            Set Time in Minutes
          </CustomText>
          <Input
            maxLength={3}
            placeholder={'Enter The minutes'}
            keyboardType={'numeric'}
            onChangeText={t => updatetime(t)}
          />
          <Button
            loader={isloading}
            buttonName={'Set Time'}
            onPress={() => {
              setNetTime();
            }}
          />
        </View>
      </Modal>
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
                <CustomText
                  style={{
                    color: '#FFF',
                    fontFamily: Font.regular,
                    fontSize: 15,
                    textAlign: 'left',
                    marginTop: 20,
                  }}>
                  You may set your own time for the knowledge quizzes.
                </CustomText>
              </Pressable>
            </ImageBackground>
          </Pressable>
        </SafeAreaView>
      </Modal>
      <SafeAreaView backgroundColor={'#FFF'} />
    </View>
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
  pointtext: {
    color: '#1E1E1E',
    fontSize: 14,
    fontFamily: Font.samibold,
    // marginLeft: 2,
  },
  Pointbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timerTime: {
    fontSize: 10,
    color: '#070417',
    fontFamily: Font.regular,
  },
  descriptiondetails: {
    color: '#1E1E1E',
    fontSize: 14,
    fontFamily: Font.regular,
    marginTop: 10,
  },
  discription: {
    color: '#9C9C9C',
    fontFamily: Font.regular,
    fontSize: 14,
    marginTop: 10,
  },
  pointNumber: {
    width: '100%',
    height: 70,
    backgroundColor: '#E5F7FD',
    borderRadius: 12,
    padding: 5,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  textnamehead: {
    color: '#1E1E1E',
    fontFamily: Font.bold,
    fontSize: 18,
    marginTop: 5,
  },
  textname: {
    color: '#9C9C9C',
    fontSize: 14,
    fontFamily: Font.regular,
    marginTop: 10,
  },
  startcontain: {
    backgroundColor: '#FFF',
    width: '100%',

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: 'relative',
    bottom: '5%',
    // top: '50%',

    paddingHorizontal: 20,
  },
});
