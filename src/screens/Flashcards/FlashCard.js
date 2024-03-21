import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {DefaultImages, Colors} from '../../comman/Theme';
import Header from '../../comman/Header';
import Button from '../../comman/Button';
import Carousel from 'react-native-snap-carousel';
import CustomText from '../../comman/CustomText';
import {StyleSheet} from 'react-native';
import Font from '../../comman/Font';
import FlipCard from 'react-native-flip-card';
import QuestionIcon from '../../../asset/image/svg/QuestionCircul.svg';
import Modal from 'react-native-modal';
import Modal_Close from '../../../asset/image/svg/Modal_Close.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetFunction} from '../../comman/Api';
import {errorToast} from '../../comman/TostModal';
import PageLoader from '../../comman/PageLoader';

export default function FlashCard({navigation}) {
  const _carousel = useRef();
  const {width} = useWindowDimensions();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const BackImage = [
    DefaultImages.Flashcard1,
    DefaultImages.Flashcard2,
    DefaultImages.Flashcard3,
  ];
  console.log(Data);
  // const Data = [
  //   {
  //     id: 1,
  //     image: DefaultImages.Flashcard1,
  //     Title: 'Menager1',
  //     BackDetails:
  //       'Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit,Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor Lorem epsum dior sat emit loreum sit dolar epsum in ',
  //   },
  //   {
  //     id: 2,
  //     image: DefaultImages.Flashcard2,
  //     Title: 'Menager2',
  //     BackDetails:
  //       'Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit,Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor Lorem epsum dior sat emit loreum sit dolar epsum in ',
  //   },
  //   {
  //     id: 3,
  //     image: DefaultImages.Flashcard3,
  //     Title: 'Menager3',
  //     BackDetails:
  //       'Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit,Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor Lorem epsum dior sat emit loreum sit dolar epsum in ',
  //   },
  // ];
  useEffect(() => {
    getFlashCards();
  }, []);
  const getFlashCards = async () => {
    let url = `getflashcard`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log(result);
    if (result.success) {
      let NewData = result.data?.data;

      const updatedData = NewData.map((item, index) => ({
        ...item,
        image: BackImage[index % 3],
      }));
      setData(updatedData);
      setLoading(false);
    } else {
      errorToast(result.data?.message);
      setLoading(false);
    }
  };

  const [OpenStreak, SetOpenStreak] = useState(false);
  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '80%',
            width: '80%',
            //   backgroundColor: Colors.default,
          }}>
          <FlipCard
            style={{height: '100%', width: '100%'}}
            friction={20}
            perspective={5000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={isFlipEnd => {
              console.log('isFlipEnd', isFlipEnd);
            }}>
            {/* Face Side */}
            <ImageBackground
              borderRadius={15}
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              source={item.image}>
              <CustomText style={Styles.TitleText}>{item.title}</CustomText>
            </ImageBackground>
            {/* Back Side */}
            <ImageBackground
              borderRadius={15}
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              source={item.image}>
              <CustomText
                style={{
                  fontSize: 14,
                  fontFamily: Font.bold,
                  Colors: '#000',
                  margin: 15,
                }}>
                {item.description}
              </CustomText>
            </ImageBackground>
          </FlipCard>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      {loading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <>
          <Header
            HeaderName={'Flashcards'}
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
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={() => SetOpenStreak(true)}>
              <QuestionIcon />
            </TouchableOpacity>

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Carousel
                layout={'stack'}
                layoutCardOffset={`15`}
                activeAnimationOptions={' activeAnimationOptions'}
                ref={_carousel}
                lockScrollWhileSnapping={true}
                // autoplay={true}
                data={Data}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width}
                enableSnap={true}
                scrollEnabled={true}
                inactiveSlideShift={1}
                autoplayDelay={1000}
                autoplayInterval={5000}
                // scrollInterpolator={scrollInterpolator}
                // slideInterpolatedStyle={animatedStyles}
                // snapToInterval={width + yourItemSpacing}
                snapToAlignment="start"
                // onSnapToItem={index => setActiveSlide(index)}
              />
            </View>
            <Button
              buttonName={'Start Matching'}
              onPress={() => navigation.navigate('Manage')}
            />
          </View>
        </>
      )}
      <Modal
        testID={'modal'}
        isVisible={OpenStreak}
        onSwipeComplete={() => SetOpenStreak(false)}
        onBackdropPress={() => SetOpenStreak(false)}
        style={Styles.view}>
        <SafeAreaView style={{height: '100%'}}>
          <Pressable style={{flex: 1}} onPress={() => SetOpenStreak(false)}>
            <ImageBackground
              borderRadius={15}
              source={DefaultImages.PopUpImage}
              style={Styles.cardView}>
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
                  You may slide up and down the flashcards and on tap on any
                  flashcard you may learn the meaning of term written on
                  flashcard and it'll help you while you start
                  matching the cards.
                </CustomText>
              </Pressable>
            </ImageBackground>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
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
  TitleText: {
    fontSize: 24,
    fontFamily: Font.bold,
    Colors: '#000',
    marginHorizontal: 10,
  },
});
