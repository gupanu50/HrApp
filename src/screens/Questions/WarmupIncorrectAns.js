import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Button from '../../comman/Button';
import Font from '../../comman/Font';
import {DefaultImages, Colors} from '../../comman/Theme';
import Header from '../../comman/Header';
import CustomText from '../../comman/CustomText';
import Logo from '../../../asset/image/svg/Imark.svg';
import Popover from 'react-native-popover-view';
import {UpdateFunction} from '../../comman/Api';
import {errorToast, warnToast, successToast} from '../../comman/TostModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SelectImage from '../../../asset/image/svg/SelectImage.svg';

export default function WarmupIncorrectAns({navigation, route}) {
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  //   const {QuizIdnew} = route.params;

  let carousel = useRef();
  const touchable = useRef();
  const {height, width} = Dimensions.get('screen');
  const [isloading, setloading] = useState(true);
  const [isResult, setResult] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isTips, setTips] = useState('');

  const question = [
    {
      id: '1',
      question: 'Sourcing manpower',
      backgroundColor: '#F3DEE6',
      textcolor: '#FF3232',
    },
    {
      id: '1',
      question: 'Sourcing manpower',
      backgroundColor: '#FFF',
      textcolor: 'grey',
    },
    {
      id: '1',
      question: 'Sourcing manpower',
      backgroundColor: '#FFF',
      textcolor: 'grey',
    },
    {
      id: '1',
      question: 'Sourcing manpower',
      backgroundColor: '#FFF',
      textcolor: 'grey',
    },
  ];

  useEffect(() => {
    gettAllIncurrectQueston();
  }, []);
  const gettAllIncurrectQueston = async () => {
    let url = `warmupcheckanswer`;
    let data = new FormData();
    // data.append('quizid', QuizIdnew);
    data.append('userid', userinfo.id);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data?.data;
      // successToast(result.data?.message);
      setResult(Data);
      //   setTips(result.data?.tipsdata[0]);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  const TimeOut = async () => {
    let url = `upadatequizstatus`;
    const token = await AsyncStorage.getItem('Token');
    let data = new FormData();
    data.append('userid', userinfo.id);
    const result = await UpdateFunction(data, url, token);
    console.log('timeout', result);
    if (result.success) {
      navigation.navigate('Home');
    }
  };
  const NextButton = () => {
    if (activeSlideIndex + 1 == isResult.length) {
      TimeOut();
    } else {
      const nextIndex = (activeSlideIndex + 1) % isResult.length;
      carousel.current?.snapToNext();
    }
  };
  const PreviousQuestion = () => {
    const nextIndex = (activeSlideIndex - 1) % isResult.length;
    carousel.current?.snapToItem(nextIndex);
  };

  const [showPopover, setShowPopover] = useState(false);

  const renderItemList = ({item, index}) => {
    return (
      <>
        <CustomText style={customStyle.firsthead}>{item.question}</CustomText>
        <CustomText style={customStyle.Secondhead}>
          Selected answer{index + 1}
        </CustomText>
        {item.option_type === 'text' ? (
          <>
            {item.question_options.map(ans => (
              <View
                style={[
                  customStyle.questionbox,
                  {
                    backgroundColor:
                      ans.options === item.selected_answer?.text
                        ? '#F3DEE6'
                        : '#FFF',
                    borderColor:
                      ans.options === item.selected_answer?.text
                        ? '#FF3232'
                        : 'grey',
                  },
                ]}>
                <CustomText
                  style={[
                    customStyle.questiontext,
                    {
                      color:
                        ans.options === item.selected_answer?.text
                          ? '#FF3232'
                          : 'grey',
                    },
                  ]}>
                  {ans.options}
                </CustomText>
              </View>
            ))}
            <CustomText style={customStyle.Secondhead}>
              Correct answer
            </CustomText>
            <View style={customStyle.correctans}>
              <CustomText style={customStyle.rightans}>
                {item.correct_answer}
              </CustomText>
            </View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText style={customStyle.lasthead}>
                Check Text Book Reference
              </CustomText>
              <TouchableOpacity
                ref={touchable}
                onPress={() => setShowPopover(true)}>
                <Logo />
              </TouchableOpacity>
            </View> */}
            <Popover
              placement="bottom"
              popoverStyle={{
                backgroundColor: Colors.default,
                width: width,
                // height: 80,
                padding: 8,
                borderRadius: 12,
              }}
              from={touchable}
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}>
              <CustomText style={customStyle.Splash}>
                {isTips?.description}
              </CustomText>
            </Popover>
          </>
        ) : item.option_type === 'textimg' ? (
          <>
            {item.question_options.map(option => (
              <View
                style={[
                  customStyle.questionarea,
                  {
                    borderColor:
                      option.options === item.selected_answer?.text &&
                      option.options1 === item.selected_answer?.image
                        ? '#00ADEF'
                        : 'grey',
                    backgroundColor:
                      option.options === item.selected_answer?.text &&
                      option.options1 === item.selected_answer?.image
                        ? '#d6f1ff'
                        : null,
                  },
                ]}>
                <Image
                  style={{height: 100, width: 100}}
                  source={{uri: item.path + option?.options1}}
                />
                <CustomText
                  style={[
                    customStyle.questiotext,
                    {
                      fontWeight:
                        option.options === item.selected_answer?.text &&
                        option.options1 === item.selected_answer?.image
                          ? '700'
                          : '400',
                    },
                  ]}>
                  {option.options}
                </CustomText>
              </View>
            ))}
            <CustomText style={customStyle.Secondhead}>
              Correct answer
            </CustomText>
            <View style={[customStyle.questionarea]}>
              <Image
                style={{height: 100, width: 100}}
                source={{uri: item.path + item.correct_answer?.image}}
              />
              <CustomText style={customStyle.questiotext}>
                {item.correct_answer?.text}
              </CustomText>
            </View>

            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText style={customStyle.lasthead}>
                Check Text Book Reference
              </CustomText>
              <TouchableOpacity
                ref={touchable}
                onPress={() => setShowPopover(true)}>
                <Logo />
              </TouchableOpacity>
            </View> */}
            <Popover
              placement="bottom"
              popoverStyle={{
                backgroundColor: Colors.default,
                width: width,
                // height: 80,
                padding: 8,
                borderRadius: 12,
              }}
              from={touchable}
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}>
              <CustomText style={customStyle.Splash}>
                {isTips?.description}
              </CustomText>
            </Popover>
          </>
        ) : (
          <>
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={item.question_options}
                renderItem={({item: option}) => {
                  return (
                    <View style={{width: '50%'}}>
                      <View style={customStyle.questionarea}>
                        <ImageBackground
                          imageStyle={{borderRadius: 12}}
                          style={{
                            height: '100%',
                            width: '100%',
                            // backgroundColor: 'red',
                          }}
                          source={{uri: item.path + option.options}}>
                          <View
                            style={{
                              flex: 1,
                              backgroundColor:
                                option.options == item.selected_answer?.image
                                  ? 'rgba(186, 236, 255, 0.5)'
                                  : null,
                              borderRadius: 12,
                            }}>
                            {option.options == item.selected_answer?.image ? (
                              <View
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                }}>
                                <SelectImage />
                              </View>
                            ) : null}
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <CustomText style={customStyle.Secondhead}>
              Correct answer
            </CustomText>
            <View style={[customStyle.questionarea, {width: '45%'}]}>
              <ImageBackground
                imageStyle={{borderRadius: 12}}
                style={{
                  height: '100%',
                  width: '100%',
                  // backgroundColor: 'red',
                }}
                source={{uri: item.path + item.correct_answer}}>
                <View
                  style={{
                    flex: 1,
                    // backgroundColor:
                    //   ? 'rgba(186, 236, 255, 0.5)'
                    //   : null,
                    borderRadius: 12,
                  }}></View>
              </ImageBackground>
            </View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText style={customStyle.lasthead}>
                Check Text Book Reference
              </CustomText>
              <TouchableOpacity
                ref={touchable}
                onPress={() => setShowPopover(true)}>
                <Logo />
              </TouchableOpacity>
            </View> */}
            <Popover
              placement="bottom"
              popoverStyle={{
                backgroundColor: Colors.default,
                width: width,
                // height: 80,
                padding: 8,
                borderRadius: 12,
              }}
              from={touchable}
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}>
              <CustomText style={customStyle.Splash}>
                {isTips?.description}
              </CustomText>
            </Popover>
          </>
        )}
      </>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: Colors.default, flex: 1}}>
      <Header
        HeaderName={'Incorrect Answers'}
        textcolor={'#FFF'}
        onPress={() => TimeOut()}
      />
      <View style={customStyle.mainContain}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {isResult.length > 0 ? (
            <Carousel
              // layout={'tinder'}
              // layoutCardOffset={`15`}
              activeAnimationOptions={' activeAnimationOptions'}
              ref={carousel}
              data={isResult}
              renderItem={renderItemList}
              onSnapToItem={index => setActiveSlideIndex(index)}
              autoplay={false}
              sliderWidth={width - 40}
              itemWidth={width - 40}
              scrollEnabled={false}
              inactiveSlideShift={0}
            />
          ) : (
            <CustomText style={[customStyle.lasthead, {textAlign: 'center'}]}>
              No Incorrect Question
            </CustomText>
          )}
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            btnwidth={'45%'}
            buttonName={'Previous'}
            bgcolor={'#FFF'}
            btnborder={1}
            bordercolor={'#9C9C9C'}
            btncolor={'#9C9C9C'}
            // onPress={() => navigation.goBack()}
            onPress={() => PreviousQuestion()}
          />
          <Button
            btnwidth={'45%'}
            buttonName={'Next'}
            // onPress={() => navigation.navigate('Tips')}
            onPress={() => NextButton()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
  questionarea: {
    backgroundColor: '#FFF',
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderRadius: 12,
    bordercolor: '#9C9C9C',
    flexDirection: 'row',
    alignItems: 'center',
  },
  questiotext: {
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Font.regular,
    marginLeft: 20,
  },
  Splash: {
    fontFamily: Font.regular,
    fontSize: 12,
    color: '#FFF',
    padding: 5,
  },
  rightans: {
    fontWeight: '700',
    color: '#1E1E1E',
    fontFamily: Font.regular,
    fontSize: 14,
  },
  lasthead: {
    color: '#00ADEF',
    fontWeight: '500',
    fontSize: 18,
    fontFamily: Font.regular,
    marginVertical: 15,
    marginRight: 10,
  },
  firsthead: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: Font.regular,
    marginVertical: 10,
  },
  Secondhead: {
    color: '#9C9C9C',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Font.regular,
    marginVertical: 10,
  },
  correctans: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#00ADEF',
    backgroundColor: '#d6f1ff',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  questiontext: {
    fontFamily: Font.regular,
    fontWeight: '400',
    fontSize: 14,
  },
  questionbox: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'grey',

    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 20,
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
