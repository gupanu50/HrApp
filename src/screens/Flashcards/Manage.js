import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../../comman/Header';
import {DefaultImages, Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Font from '../../comman/Font';
import Button from '../../comman/Button';
import RightAns from '../../../asset/image/svg/RightAns.svg';
import WrongAns from '../../../asset/image/svg/WrongAns.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetFunction, PostFunction, UpdateFunction} from '../../comman/Api';
import PageLoader from '../../comman/PageLoader';
import Carousel from 'react-native-snap-carousel';
import {errorToast, successToast, warnToast} from '../../comman/TostModal';

export default function Manage({navigation}) {
  const _carousel = useRef();
  const {height, width} = Dimensions.get('window');
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const [CardQuestion, setCardQuestion] = useState([]);
  const [IsAnswer, setAnswer] = useState();
  // console.log(IsAnswer);

  useEffect(() => {
    getFlashCardQuestion();
  }, []);
  const getFlashCardQuestion = async () => {
    let url = `getflashcardquestion`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log(result, 'result');
    if (result.success) {
      let NewData = result.data?.data;
      setCardQuestion(NewData);
      setLoading(false);
    } else {
      errorToast(result.data?.message);
      setLoading(false);
    }
  };

  const saveAnswer = async Option => {
    if (IsAnswer) {
      warnToast('Select the option');
    } else {
      const currentItem = CardQuestion[activeSlide];
      let url = `flashQuestionData`;
      const token = await AsyncStorage.getItem('Token');
      let data = new FormData();
      data.append('question_id', currentItem.id);
      data.append('option', Option);
      const result = await UpdateFunction(data, url, token);
      console.log(result);
      if (result.success) {
        if (result.data?.isCorrect === 'You have Choose InCorrect Option') {
          errorToast(result.data?.isCorrect);
        } else {
          successToast(result.data?.isCorrect);
        }

        // if (activeSlide == CardQuestion?.length - 1) {
        //   navigation.navigate('Home');
        // } else {
        //   _carousel?.current?._snapToItem(activeSlide + 1);
        // }
        // setAnswer('');
      } else {
        errorToast(result.data?.message);
      }
    }
  };

  const NextQuestion = () => {
    if (activeSlide == CardQuestion?.length - 1) {
      navigation.navigate('Home');
    } else {
      _carousel?.current?._snapToItem(activeSlide + 1);
    }
    setAnswer('');
  };

  const _renderItem = ({item}) => {
    return (
      <ScrollView
        // contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View
          style={{
            width: '90%',
          }}>
          <CustomText style={styles.Heading}>{item.title}</CustomText>
        </View>

        <TouchableOpacity
          disabled={IsAnswer ? true : false}
          style={{width: '90%'}}
          onPress={() => {
            setAnswer('option_1');
            saveAnswer('option_1');
          }}>
          <ImageBackground
            resizeMode="cover"
            imageStyle={{opacity: IsAnswer ? 0 : 1}}
            borderRadius={15}
            style={{
              borderWidth: IsAnswer == 'option_1' ? 1 : null,
              borderColor: IsAnswer == 'option_1' ? Colors.default : null,
              width: '100%',
              marginVertical: 10,
              borderRadius: 15,
              // alignItems: 'center',
              backgroundColor:
                IsAnswer && 'option_1' === item.crr_option
                  ? '#9dcaa5'
                  : '#f19da3',
            }}
            source={DefaultImages.Manager1}>
            {IsAnswer ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}>
                <CustomText>{'         '} </CustomText>
                <CustomText
                  style={[
                    styles.Description,
                    {
                      fontFamily: Font.bold,
                      textAlign: 'center',
                      marginVertical: 10,
                      color:
                        IsAnswer && 'option_1' === item.crr_option
                          ? '#008000'
                          : '#FF0000',
                    },
                  ]}>
                  Description
                </CustomText>
                {IsAnswer && 'option_1' === item.crr_option ? (
                  <RightAns />
                ) : (
                  <WrongAns />
                )}
              </View>
            ) : (
              <CustomText
                style={[
                  styles.Description,
                  {
                    fontFamily: Font.bold,
                    textAlign: 'center',
                    marginVertical: 10,
                  },
                ]}>
                Description
              </CustomText>
            )}
            {IsAnswer ? (
              <CustomText
                style={[
                  styles.Description,
                  {
                    color:
                      IsAnswer && 'option_1' === item.crr_option
                        ? '#008000'
                        : '#FF0000',
                  },
                ]}>
                {item.option_1}
              </CustomText>
            ) : (
              <CustomText style={styles.Description}>
                {item.option_1}
              </CustomText>
            )}
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={IsAnswer ? true : false}
          style={{width: '90%'}}
          onPress={() => {
            setAnswer('option_2');
            saveAnswer('option_2');
          }}>
          <ImageBackground
            imageStyle={{opacity: IsAnswer ? 0 : 1}}
            resizeMode="cover"
            borderRadius={15}
            style={{
              backgroundColor:
                IsAnswer && 'option_2' === item.crr_option
                  ? '#9dcaa5'
                  : '#f19da3',
              borderWidth: IsAnswer == 'option_2' ? 1 : null,
              borderColor: IsAnswer == 'option_2' ? Colors.default : null,
              width: '100%',
              marginVertical: 10,
              borderRadius: 15,
              // alignItems: 'center',
            }}
            source={DefaultImages.Manager2}>
            {IsAnswer ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}>
                <CustomText>{'         '} </CustomText>
                <CustomText
                  style={[
                    styles.Description,
                    {
                      fontFamily: Font.bold,
                      textAlign: 'center',
                      marginVertical: 10,
                      color:
                        IsAnswer && 'option_2' === item.crr_option
                          ? '#008000'
                          : '#FF0000',
                    },
                  ]}>
                  Description
                </CustomText>
                {IsAnswer && 'option_2' === item.crr_option ? (
                  <RightAns />
                ) : (
                  <WrongAns />
                )}
              </View>
            ) : (
              <CustomText
                style={[
                  styles.Description,
                  {
                    fontFamily: Font.bold,
                    textAlign: 'center',
                    marginVertical: 10,
                  },
                ]}>
                Description
              </CustomText>
            )}
            {IsAnswer ? (
              <CustomText
                style={[
                  styles.Description,
                  {
                    color:
                      IsAnswer && 'option_2' === item.crr_option
                        ? '#008000'
                        : '#FF0000',
                  },
                ]}>
                {item.option_2}
              </CustomText>
            ) : (
              <CustomText style={styles.Description}>
                {item.option_2}
              </CustomText>
            )}
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={IsAnswer ? true : false}
          style={{width: '90%'}}
          onPress={() => {
            setAnswer('option_3');
            saveAnswer('option_3');
          }}>
          <ImageBackground
            imageStyle={{opacity: IsAnswer ? 0 : 1}}
            resizeMode="cover"
            borderRadius={15}
            style={{
              backgroundColor:
                IsAnswer && 'option_3' === item.crr_option
                  ? '#9dcaa5'
                  : '#f19da3',
              borderWidth: IsAnswer == 'option_3' ? 1 : null,
              borderColor: IsAnswer == 'option_3' ? Colors.default : null,
              width: '100%',
              marginVertical: 10,
              borderRadius: 15,
              // alignItems: 'center',
            }}
            source={DefaultImages.Manager3}>
            {IsAnswer ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}>
                <CustomText>{'         '} </CustomText>
                <CustomText
                  style={[
                    styles.Description,
                    {
                      fontFamily: Font.bold,
                      textAlign: 'center',
                      marginVertical: 10,
                      color:
                        IsAnswer && 'option_3' === item.crr_option
                          ? '#008000'
                          : '#FF0000',
                    },
                  ]}>
                  Description
                </CustomText>
                {IsAnswer && 'option_3' === item.crr_option ? (
                  <RightAns />
                ) : (
                  <WrongAns />
                )}
              </View>
            ) : (
              <CustomText
                style={[
                  styles.Description,
                  {
                    fontFamily: Font.bold,
                    textAlign: 'center',
                    marginVertical: 10,
                  },
                ]}>
                Description
              </CustomText>
            )}
            {IsAnswer ? (
              <CustomText
                style={[
                  styles.Description,
                  {
                    color:
                      IsAnswer && 'option_3' === item.crr_option
                        ? '#008000'
                        : '#FF0000',
                  },
                ]}>
                {item.option_3}
              </CustomText>
            ) : (
              <CustomText style={styles.Description}>
                {item.option_3}
              </CustomText>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      {loading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <>
          <Header
            HeaderName={'Choose the Correct Card'}
            textcolor={'#FFF'}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              backgroundColor: '#F2F6FF',
              flex: 1,
              marginTop: 10,
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              paddingHorizontal: 20,
            }}>
            <Carousel
              ref={_carousel}
              lockScrollWhileSnapping={true}
              // autoplay={true}
              data={CardQuestion}
              renderItem={_renderItem}
              sliderWidth={width}
              itemWidth={width}
              scrollEnabled={false}
              inactiveSlideShift={1}
              autoplayDelay={1000}
              autoplayInterval={5000}
              // scrollInterpolator={scrollInterpolator}
              // slideInterpolatedStyle={animatedStyles}
              onSnapToItem={index => setActiveSlide(index)}
            />

            <Button buttonName={'Next'} onPress={() => NextQuestion()} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Description: {
    color: '#000',
    fontSize: 16,
    fontFamily: Font.regular,
    margin: 20,
    textAlign: 'center',
  },
  Heading: {
    color: '#000',
    fontSize: 30,
    fontFamily: Font.bold,
    textAlign: 'center',
    marginTop: 20,

    // marginRight: 20,
  },
});
