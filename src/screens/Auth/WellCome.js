import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultImages, Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import WellCome1 from '../../../asset/image/svg/wellCome1.svg';
import WellCome2 from '../../../asset/image/svg/WellCome2.svg';
import WellCome3 from '../../../asset/image/svg/WellCome3.svg';
import NextButton from '../../../asset/image/svg/NextButton.svg';
import CenterRow from '../../../asset/image/svg/CenterRow.svg';
import Dot from '../../../asset/image/svg/Dot.svg';
import Font from '../../comman/Font';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {storeWellComeInfo} from '../../redux/reducers/WellComeInformation';
import {useDispatch, useSelector} from 'react-redux';

export default function WellCome({navigation}) {
  const Dispatch = useDispatch();
  const PageStatus = useSelector(state => state.WelCome.status);
  console.log(PageStatus);
  let _carousel = useRef();
  const {width} = useWindowDimensions();
  const [activeSlide, setActiveSlide] = useState(0);
  console.log(activeSlide);
  const Data = [
    {
      id: 1,
      Title: 'Welcome to HR Exam Prep!',
      Description:
        'Welcome to HR Exam Prep! Your go-to hub for Higher Education exam success.',
      icon: <WellCome1 marginTop={'35%'} />,
      pageActive1: <CenterRow />,
      pageActive2: <Dot />,
      pageActive3: <Dot />,
    },
    {
      id: 2,
      Title: 'Study Your Way',
      Description:
        'Choose your study mode: Classic Flashcards for a detailed approach or Match for a challenging game.',
      icon: <WellCome2 marginTop={'35%'} />,
      pageActive2: <CenterRow />,
      pageActive1: <Dot />,
      pageActive3: <Dot />,
    },
    {
      id: 3,
      Title: 'Test Yourself',
      Description:
        'Challenge yourself with 2 full-length exams, 134 questions each, timed at 240 minutes. Ready to prove your skills?',
      icon: <WellCome3 marginTop={'35%'} />,
      pageActive3: <CenterRow />,
      pageActive1: <Dot />,
      pageActive2: <Dot />,
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {item.icon}
        {/* <WellCome1 marginTop={'35%'} /> */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <CustomText style={isStyle.Title}>{item.Title}</CustomText>
          <CustomText style={isStyle.Disc}>{item.Description}</CustomText>
        </View>
        <View
          style={{
            // backgroundColor: 'green',
            width: '90%',

            marginLeft: 20,
            marginRight: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              Dispatch(storeWellComeInfo(true));
              navigation.navigate('FirstQuiz');
            }}>
            <CustomText
              style={{
                fontSize: 16,
                fontFamily: Font.samibold,
                marginLeft: 15,
                color: Colors.default,
              }}>
              Skip
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              //   backgroundColor: 'red',
              width: '15%',
              justifyContent: 'space-between',
            }}>
            {item.pageActive1}
            {item.pageActive2}
            {item.pageActive3}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (activeSlide == 2) {
                Dispatch(storeWellComeInfo(true));
                navigation.navigate('FirstQuiz');
              } else {
                _carousel?.current?._snapToItem(activeSlide + 1);
              }
            }}>
            <NextButton />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          //   paddingHorizontal: 20,
        }}
        source={DefaultImages.BackGround}>
        <Carousel
          ref={_carousel}
          lockScrollWhileSnapping={true}
          // autoplay={true}
          data={Data}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
          scrollEnabled={false}
          inactiveSlideShift={0}
          autoplayDelay={1000}
          autoplayInterval={5000}
          // scrollInterpolator={scrollInterpolator}
          // slideInterpolatedStyle={animatedStyles}
          onSnapToItem={index => setActiveSlide(index)}
        />
      </ImageBackground>
    </View>
  );
}

const isStyle = StyleSheet.create({
  Title: {
    color: Colors.default,
    fontSize: 25,
    fontFamily: Font.bold,
    textAlign: 'center',
  },
  Disc: {
    color: '#535353',
    fontSize: 16,
    fontFamily: Font.regular,
    textAlign: 'center',
    marginTop: 10,
  },
});
