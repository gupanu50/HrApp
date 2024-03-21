import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Image,
  ImageBackground,
  Alert,
  Pressable,
  PanResponder,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import Header from '../../comman/Header';
import {DefaultImages, Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Button from '../../comman/Button';
import Font from '../../comman/Font';
import HeadIcon from '../../../asset/image/svg/Group33864.svg';
import Timer from '../../../asset/image/svg/Timer.svg';
import Close from '../../../asset/image/svg/modalClose.svg';
import GreenAttempted from '../../../asset/image/svg/greenAttempted.svg';
import RedAttempted from '../../../asset/image/svg/RedAttempted.svg';
import Modal_Close from '../../../asset/image/svg/Modal_Close.svg';
import YellowAttempted from '../../../asset/image/svg/yellowAttempted.svg';
import StickIcon from '../../../asset/image/svg/StrickIcon.svg';
import HighLightIcon from '../../../asset/image/svg/HighLightIcon.svg';
import FlagIcon from '../../../asset/image/svg/FlagIcon.svg';
import QuestionIcon from '../../../asset/image/svg/QuestionCircul.svg';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateFunction} from '../../comman/Api';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';
import Zoom from '../../../asset/image/svg/ZoomImage.svg';
import SelectImage from '../../../asset/image/svg/SelectImage.svg';
import * as Progress from 'react-native-progress';
import TimeContext from '../../comman/TimeContext';
import CustomModal from '../../comman/CustomModal';
import PageLoader from '../../comman/PageLoader';
import {useSelector} from 'react-redux';
import {SelectableText} from '@alentoma/react-native-selectable-text';
export default function Question({navigation, route}) {
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  const {width, height} = useWindowDimensions();
  let carousel = useRef();
  const {QuizId, Title} = route.params;
  const {timeStatus, TotalTime} = route.params;

  // console.log(TotalTime);
  const [QuelstionlistModal, setQuelstionlistModal] = useState(false);
  const [isloading, setloading] = useState(true);
  const [allQuestion, setallQuestion] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  // console.log('activeSlideIndex', activeSlideIndex);
  const [numberofIndex, setnumberofIndex] = useState(1);
  const {time, setTimeLeft, TimeStaus} = useContext(TimeContext);
  // console.log(TimeStaus, 'TimeContext');
  const [imageUrl, setimageUrl] = useState('');
  const [openModal, setModal] = useState(false);

  // select the questeions Answer  //
  const [TextAnswer, setTextAnswer] = useState('');
  const [TextImageAnswer, setTextImageAnswer] = useState('');
  const [ImageAnswer, setImageAnswer] = useState('');

  const [OptionModalValue, setOptionModalValue] = useState(false);
  const [messageText, setmessageText] = useState(
    'Are you sure submit the quizz!',
  );
  const [isAction, setAction] = useState('');
  const [NotAttemptquestion, SetNotAttemptQuestion] = useState([]);
  const [AttemptQuestion, setAttemptQuestion] = useState([]);
  const [SelectedQuestion, setSelectedQuestion] = useState([]);
  const [QuestionRunTime, setQuestionRunTime] = useState('');
  const [activeQuestion, setActiveQuestion] = useState('');
  const [isSetTime, setSetTime] = useState('');

  const [showStickModal, setStickModal] = useState(false);
  const [strickOpen, setStickOpen] = useState(false);
  const [StickData, setStickData] = useState('');
  const [HighlightOpen, setHighlightOpen] = useState(false);
  const [HighlightData, setHighlightData] = useState();
  const [FlagOpen, setFlagOpen] = useState(false);
  const [FlagData, setFlagData] = useState('');

  const zoomimage = uri => {
    setModal(true);
    setimageUrl(uri);
  };

  const question = [
    {
      id: '1',
      quesetion: 'Sourcing manpower',
    },
    {
      id: '2',
      quesetion: 'Choosing a candidate',
    },
    {
      id: '3',
      quesetion: 'Interviewing candidate',
    },
    {
      id: '4',
      quesetion: 'Assigning job',
    },
  ];
  const questionNumber = [
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '1',
      textcolor: '#00FF00',
      backcolor: '#00FF0010',
      quesNum: 'Qus, 1',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
    {
      id: '2',
      textcolor: '#FF0000',
      backcolor: '#FF000010',
      quesNum: 'Qus, 2',
    },
  ];
  useEffect(() => {
    getAlltypeQuestion();
  }, []);
  const getAlltypeQuestion = async () => {
    let url = `quizsection`;
    let data = new FormData();
    data.append('quizid', QuizId);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    // console.log(result, 'question');
    if (result.success) {
      const Data = result.data;
      setSetTime(Data.timeset);
      setallQuestion(Data.Question);
      setActiveQuestion(Data.Question[0]);
      SetNotAttemptQuestion(Data.Question);
      setSelectedQuestion(Data.selected_question);

      const newData = Data.selected_question.map(item => {
        return {...item};
      });
      setAttemptQuestion(newData);
      // setTimeLeft(60);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  const renderItemList = ({item, index}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '75%',
              justifyContent: 'space-between',
              paddingTop: 5,
            }}>
            <TouchableOpacity
              style={[
                customStyle.StickBtn,
                {
                  backgroundColor: strickOpen ? '#00ADEF' : '#FFFFFF',
                },
              ]}
              onPress={() => setStickOpen(!strickOpen)}>
              <StickIcon
                height={20}
                width={20}
                style={{color: strickOpen ? '#FFFFFF' : '#00ADEF'}}
              />
              <CustomText
                style={[
                  customStyle.StickText,
                  {
                    color: strickOpen ? '#FFFFFF' : '#070417',
                  },
                ]}>
                Strike out
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                customStyle.StickBtn,
                {
                  backgroundColor: HighlightOpen ? '#00ADEF' : '#FFFFFF',
                },
              ]}
              onPress={() => setHighlightOpen(!HighlightOpen)}>
              <HighLightIcon
                height={20}
                width={20}
                style={{color: HighlightOpen ? '#FFFFFF' : '#00ADEF'}}
              />
              <CustomText
                style={[
                  customStyle.StickText,
                  {
                    color: HighlightOpen ? '#FFFFFF' : '#070417',
                  },
                ]}>
                Highlight
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                customStyle.StickBtn,
                {
                  backgroundColor: FlagOpen ? '#00ADEF' : '#FFFFFF',
                },
              ]}
              onPress={() => setFlagOpen(!FlagOpen)}>
              <FlagIcon
                height={20}
                width={20}
                style={{color: FlagOpen ? '#FFFFFF' : '#00ADEF'}}
              />
              <CustomText
                style={[
                  customStyle.StickText,
                  {
                    color: FlagOpen ? '#FFFFFF' : '#070417',
                  },
                ]}>
                Flag
              </CustomText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setStickModal(true)}>
            <QuestionIcon />
          </TouchableOpacity>
        </View>
        <CustomText selectable={true} style={customStyle.qsheading}>
          {item.title}
        </CustomText>

        {item.option_type === 'text' ? (
          item.options?.map(option => (
            <TouchableOpacity
              onPress={() => SubmitAnswer(item, option)}
              style={[
                customStyle.questionbox,
                {
                  borderColor: AttemptQuestion?.some(
                    item =>
                      item?.selected_optionid?.optionid == option.optionid,
                  )
                    ? '#00ADEF'
                    : 'grey',

                  backgroundColor: AttemptQuestion?.some(
                    item =>
                      item?.selected_optionid?.optionid == option.optionid,
                  )
                    ? '#d6f1ff'
                    : '#FFF',
                },
              ]}>
              <CustomText
                style={[
                  customStyle.questiontext,
                  {
                    fontWeight: AttemptQuestion?.some(
                      item =>
                        item?.selected_optionid?.optionid == option.optionid,
                    )
                      ? '700'
                      : '400',
                    textDecorationLine:
                      strickOpen &&
                      AttemptQuestion?.some(
                        item =>
                          item?.selected_optionid?.optionid == option.optionid,
                      )
                        ? 'line-through'
                        : null,
                  },
                ]}>
                {option.text}
              </CustomText>
            </TouchableOpacity>
          ))
        ) : item.option_type === 'textimg' ? (
          item.options.map(option => (
            <TouchableOpacity
              onPress={() => SubmitAnswer(item, option)}
              style={[
                customStyle.questionarea,
                {
                  borderColor: AttemptQuestion?.some(
                    item => item?.selected_optionid?.text == option.text,
                  )
                    ? '#00ADEF'
                    : 'grey',
                  backgroundColor: AttemptQuestion?.some(
                    item => item?.selected_optionid?.text == option.text,
                  )
                    ? '#d6f1ff'
                    : '#FFF',
                },
              ]}>
              <Image
                style={{height: 100, width: 100}}
                source={{uri: option.image}}
              />
              <CustomText
                style={[
                  customStyle.questiotext,
                  {
                    fontWeight: AttemptQuestion?.some(
                      item => item?.selected_optionid?.text == option.text,
                    )
                      ? '700'
                      : '400',
                  },
                ]}>
                {option.text}
              </CustomText>
            </TouchableOpacity>
          ))
        ) : (
          <FlatList
            numColumns={2}
            data={item.options}
            renderItem={({item: option}) => {
              return (
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => SubmitAnswer(item, option)}
                    style={customStyle.questionarea}>
                    <ImageBackground
                      imageStyle={{borderRadius: 12}}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={{uri: option.image}}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: AttemptQuestion?.some(
                            item =>
                              item?.selected_optionid?.image == option.image,
                          )
                            ? 'rgba(186, 236, 255, 0.5)'
                            : null,
                          borderRadius: 12,
                        }}>
                        <TouchableOpacity
                          style={{alignItems: 'flex-end'}}
                          onPress={() => zoomimage(option.image)}>
                          <Zoom />
                        </TouchableOpacity>
                        {AttemptQuestion?.some(
                          item =>
                            item?.selected_optionid?.image == option.image,
                        ) ? (
                          <View style={{alignItems: 'center'}}>
                            <SelectImage />
                          </View>
                        ) : null}
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </>
    );
  };
  const skipItem = async () => {
    let data = {
      data: [
        {
          userid: userinfo.id,
          questionid: activeQuestion.questionid,
          option_type: activeQuestion.option_type,
          quizid: QuizId,
          status: 'inprocess',
          time: QuestionRunTime,
          selected_optionid: 0,
        },
      ],
    };
    let url = `savequiz`;
    let headers = 'application/json';
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token, headers);
    console.log(result, 'Skip');
    if (result.success) {
      carousel.current?.snapToNext();
      setnumberofIndex(activeSlideIndex + 2);
    }
  };
  const NextQuestion = () => {
    if (activeSlideIndex + 1 == allQuestion.length) {
      // navigation.navigate('CheckAnswer');
      setOptionModalValue(true);
      setAction('next');
    } else {
      const nextIndex = (activeSlideIndex + 1) % allQuestion.length;
      carousel.current?.snapToItem(nextIndex);
      setnumberofIndex(activeSlideIndex + 2);
      submitAllQuestion();
    }
  };
  const PreviousQuestion = () => {
    if (activeSlideIndex > 0) {
      const nextIndex = (activeSlideIndex - 1) % allQuestion.length;
      carousel.current?.snapToItem(nextIndex);
      setnumberofIndex(activeSlideIndex - 1);
    }
  };
  const SubmitTheQuizz = () => {
    if (isAction === 'back') {
      setOptionModalValue(false);
      // navigation.goBack();
      // navigation.navigate('CheckAnswer');
      submitAllQuestion();
    } else {
      submitAllQuestion();
      setOptionModalValue(false);
      // navigation.navigate('CheckAnswer');
    }
  };
  const GobackPage = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (timeStatus === 'notime') {
      null;
    } else {
      if (time == '00') {
        if (isSetTime == 'true') {
          submitAllQuestion();
        }
      }
    }
  }, [time]);
  //Attend Question ///
  const SelectQuestion = index => {
    setQuelstionlistModal(false);
    const nextIndex = index % allQuestion.length;
    carousel.current?.snapToItem(nextIndex);
    setnumberofIndex(index + 1);
  };
  const SubmitAnswer = (item, option) => {
    let Data = {
      questionid: item.questionid,
      option_type: item.option_type,
      quizid: QuizId,
      // status:
      //   activeSlideIndex + 1 == allQuestion.length ? 'completed' : 'inprocess',
      selected_optionid: option,
    };
    const UpdateAnswer = AttemptQuestion.findIndex(
      item => item.questionid === Data.questionid,
    );
    if (UpdateAnswer !== -1) {
      const newdata = [...AttemptQuestion];
      // Replace the existing object with the updated one
      newdata[UpdateAnswer] = Data;
      setAttemptQuestion(newdata);
    } else {
      setAttemptQuestion([...AttemptQuestion, Data]);
    }
  };
  useEffect(() => {
    let currentTime = time;
    // Function to convert time in HH:MM:SS format to minutes
    function timeToMinutes(time) {
      let [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 60 + minutes + seconds / 60;
    }
    // Calculate current time in minutes
    let currentMinutes = timeToMinutes(currentTime);
    /// remainig time///
    setQuestionRunTime(parseInt(currentMinutes));
  }, [QuestionRunTime]);

  const submitAllQuestion = async () => {
    let url = `savequiz`;
    const AllAttempted_Question = AttemptQuestion.map(item => {
      return {
        ...item,
        time: QuestionRunTime,
        userid: userinfo.id,
        status:
          activeSlideIndex + 1 == allQuestion.length
            ? 'completed'
            : 'inprocess',
      };
    });
    let notAttempted = [
      {
        userid: userinfo.id,
        quizid: QuizId,
        time: QuestionRunTime,
        questionid: activeQuestion.questionid,
        option_type: activeQuestion.option_type,
        selected_optionid: 0,
        status:
          activeSlideIndex + 1 == allQuestion.length
            ? 'completed'
            : 'inprocess',
      },
    ];
    let data = {
      data: AttemptQuestion.length > 0 ? AllAttempted_Question : notAttempted,
    };
    console.log('submit data', data);
    let headers = 'application/json';
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token, headers);
    // console.log('result', result);
    if (result.success) {
      const Data = result.data;
      if (activeSlideIndex + 1 == allQuestion.length) {
        navigation.navigate('CheckAnswer', {
          QuizId: Data.quizid,
          TitleName: Title,
        });
      }
      if (time == '00') {
        if (isSetTime == 'true') {
          navigation.navigate('CheckAnswer', {
            QuizId: Data.quizid,
            TitleName: Title,
          });
        }
      }

      successToast(Data.message);
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  const onSnapToItem = index => {
    setActiveSlideIndex(index); // Update the current item
    setActiveQuestion(allQuestion[index]);
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.default, flex: 1}}>
      {isloading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <>
          <Header
            HeaderName={Title}
            textcolor={'#FFF'}
            onPress={() => GobackPage()}
          />

          <View style={customStyle.mainContain}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => setQuelstionlistModal(true)}
                style={{flexDirection: 'row'}}>
                <View style={customStyle.rangeview}>
                  <Progress.Bar
                    progress={numberofIndex / allQuestion.length}
                    width={width / 1.7}
                    color="#063674"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 2,
                    }}>
                    <CustomText
                      style={{
                        color: '#8A92A6',
                        fontWeight: '500',
                        fontSize: 17,
                        fontFamily: Font.regular,
                        // marginVertical: 15,
                        textAlign: 'right',
                      }}>
                      Questions
                    </CustomText>
                    <CustomText style={customStyle.skipbutton}>
                      {activeSlideIndex + 1}/{allQuestion.length}
                    </CustomText>
                  </View>
                </View>
                <View style={customStyle.timerview}>
                  <Timer width={20} height={20} />
                  <CustomText style={customStyle.timerTime}>
                    {time !== '00' ? time : '00:00:00'}
                  </CustomText>
                </View>
              </TouchableOpacity>

              <View style={{width: '100%'}}>
                <Carousel
                  // layout={'tinder'}
                  // layoutCardOffset={`15`}
                  activeAnimationOptions={' activeAnimationOptions'}
                  ref={carousel}
                  data={allQuestion}
                  renderItem={renderItemList}
                  onSnapToItem={index => onSnapToItem(index)}
                  autoplay={false}
                  sliderWidth={width - 40}
                  itemWidth={width - 40}
                  scrollEnabled={false}
                  inactiveSlideShift={0}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={{borderBottomWidth: 1.5, borderColor: '#00ADEF'}}>
                  <CustomText
                    style={customStyle.skipbutton}
                    onPress={() => null}>
                    Check correct answer
                  </CustomText>
                </TouchableOpacity>
                {activeSlideIndex + 1 == allQuestion.length ? null : (
                  <CustomText
                    style={customStyle.skipbutton}
                    onPress={() => skipItem()}>
                    Skip
                  </CustomText>
                )}
              </View>
            </ScrollView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                btnwidth={'45%'}
                buttonName={'Previous'}
                bgcolor={'#FFF'}
                btnborder={2}
                bordercolor={'#9C9C9C'}
                btncolor={'#9C9C9C'}
                onPress={() => PreviousQuestion()}
              />
              <Button
                btnwidth={'45%'}
                buttonName={'Next'}
                onPress={() => NextQuestion()}
                // onPress={() => navigation.navigate('ImageTextquestion')}
              />
            </View>
          </View>
        </>
      )}

      <CustomModal
        OptionModalValue={OptionModalValue}
        pressNo={() => setOptionModalValue(false)}
        pressYes={() => SubmitTheQuizz()}
        messageText={messageText}
      />
      <Modal
        testID={'modal'}
        isVisible={QuelstionlistModal}
        onSwipeComplete={() => setQuelstionlistModal(false)}
        onBackdropPress={() => setQuelstionlistModal(false)}
        style={customStyle.view}>
        <View style={customStyle.content}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingBottom: 15,
            }}>
            <CustomText style={customStyle.allQuestion}>
              All questions ({allQuestion.length})
            </CustomText>
            <TouchableOpacity onPress={() => setQuelstionlistModal(false)}>
              <Close height={40} width={40} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#D2D2D2',
              marginBottom: 10,
            }}
          />
          <View style={customStyle.Attemptdview}>
            <GreenAttempted />
            <CustomText style={customStyle.attemptedtext}>Attempted</CustomText>
          </View>
          <View style={customStyle.Attemptdview}>
            <RedAttempted />
            <CustomText style={customStyle.attemptedtext}>
              Not Attempted
            </CustomText>
          </View>
          <View style={customStyle.Attemptdview}>
            <YellowAttempted />
            <CustomText style={customStyle.attemptedtext}>Flag</CustomText>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#D2D2D2',
              marginVertical: 10,
            }}
          />
          <FlatList
            numColumns={4}
            data={allQuestion}
            renderItem={({item: option, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => SelectQuestion(index)}
                  style={[
                    customStyle.quserbox,
                    {
                      backgroundColor: AttemptQuestion?.some(
                        item => item?.questionid == option.questionid,
                      )
                        ? '#00FF0010'
                        : '#FF000010',
                      borderColor: AttemptQuestion?.some(
                        item => item?.questionid == option.questionid,
                      )
                        ? '#00FF00'
                        : '#FF0000',
                    },
                  ]}>
                  <CustomText
                    style={[
                      customStyle.questionnum,
                      {
                        color: AttemptQuestion?.some(
                          item => item?.questionid == option.questionid,
                        )
                          ? '#00FF00'
                          : '#FF0000',
                      },
                    ]}>
                    {index + 1} Qus
                  </CustomText>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
      {/* View image  */}
      <Modal
        isVisible={openModal}
        onSwipeComplete={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
        style={{margin: 0}}>
        <View style={{backgroundColor: '#FFF', height: '50%', width: '100%'}}>
          <Image
            resizeMode="cover"
            source={{uri: imageUrl}}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      </Modal>
      {/* ////  Stick modal */}
      <Modal
        testID={'modal'}
        isVisible={showStickModal}
        onSwipeComplete={() => setStickModal(false)}
        onBackdropPress={() => setStickModal(false)}
        style={customStyle.view}>
        <SafeAreaView style={{height: '100%'}}>
          <Pressable
            style={{flex: 1, marginTop: '45%'}}
            onPress={() => setStickModal(false)}>
            <ImageBackground
              borderRadius={15}
              source={DefaultImages.PopUpImage}
              style={customStyle.cardView}>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </CustomText>
              </Pressable>
            </ImageBackground>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
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
  StickText: {
    color: '#070417',
    fontSize: 14,
    fontStyle: Font.regular,
    marginLeft: 2,
  },
  StickBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    height: 45,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  questiontext: {
    color: 'rgba(30, 30, 30, 1)',
    fontSize: 15,

    fontFamily: Font.regular,
    margin: 10,
  },
  questiotext: {
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Font.regular,
    marginLeft: 20,
  },
  questionarea1: {
    height: 150,
    width: '90%',
    borderRadius: 12,
    marginVertical: 10,
  },
  questionarea: {
    backgroundColor: '#FFF',
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderRadius: 12,
    // bordercolor: '#9C9C9C',
    flexDirection: 'row',
    alignItems: 'center',
  },
  allQuestion: {
    color: '#00ADEF',
    fontWeight: '700',
    fontFamily: Font.regular,
    fontSize: 18,
  },
  attemptedtext: {
    color: '#1E1E1E',
    fontWeight: '500',
    fontFamily: Font.regular,
    fontSize: 12,
    marginHorizontal: 10,
  },
  Attemptdview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  questionnum: {
    fontWeight: '500',
    fontSize: 12,
    fontFamily: Font.regular,
  },
  quserbox: {
    height: 30,
    width: 72,

    borderWidth: 1,

    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  rangeview: {
    height: 50,
    width: '70%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 2,
    marginTop: 5,

    padding: 5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  timerview: {
    height: 50,
    width: 90,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
  },
  timerTime: {
    fontSize: 10,
    color: '#070417',
    fontFamily: Font.regular,
    fontWeight: '500',
  },
  skipbutton: {
    color: '#00ADEF',
    fontWeight: '500',
    fontSize: 17,
    fontFamily: Font.regular,
    // marginVertical: 15,
    textAlign: 'right',
  },
  qsheading: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: Font.regular,
    marginVertical: 15,
  },
  questionbox: {
    marginVertical: 5,
    borderWidth: 1,
    // borderColor: 'grey',

    // height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    // paddingLeft: 20,
    width: '100%',
  },
  mainContain: {
    backgroundColor: '#F2F6FF',
    flex: 1,
    marginVertical: 10,

    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
