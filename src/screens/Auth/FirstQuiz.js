import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultImages} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Font from '../../comman/Font';
import ArrowCircle from '../../../asset/image/svg/ArrowCircle.svg';
import {PostFunction} from '../../comman/Api';
import PageLoader from '../../comman/PageLoader';
import {errorToast, successToast} from '../../comman/TostModal';
import {UpdateFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FirstQuiz = ({navigation}) => {
  const options = [
    {
      id: 1,
      name: 'SHRM-CP',
      image: DefaultImages.SHRM,
    },
    {
      id: 2,
      name: 'SHRM-SCP',
      image: DefaultImages.SHRM,
    },
    {
      id: 3,
      name: 'PHR',
      image: DefaultImages.PHR,
    },
    {
      id: 4,
      name: 'SPHR',
      image: DefaultImages.PHR,
    },
  ];
  const [loading, setloading] = useState(false);
  const [selectedOption, setSelectedOption] = React.useState('');

  const sendOption = async value => {
    const token = await AsyncStorage.getItem('Token');
    setloading(true);
    let url = `addanswer`;
    let data = new FormData();
    data.append('answer', value);
    const result = await UpdateFunction(data, url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data;
      successToast(Data.message);
      setloading(false);
      navigation.navigate('Home');
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  return (
    <ImageBackground source={DefaultImages.BackGround2} style={{flex: 1}}>
      {loading ? (
        <PageLoader color={'#00ADEF'} />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={{width: '100%', padding: 20}}>
            <Image source={DefaultImages.Logo} style={{opacity: 0}} />
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 20,
                padding: 20,
              }}>
              <CustomText
                style={{
                  fontSize: 19,
                  fontFamily: Font.samibold,
                  color: '#0C092A',
                }}>
                Which exam are you preparing for?
              </CustomText>
            </View>
          </View>
          <View style={{flex: 1, width: '100%'}}>
            <ImageBackground
              style={{width: '100%', height: '100%'}}
              resizeMode="conatin"
              source={DefaultImages.Base}>
              <View style={{width: '100%', padding: 20}}>
                {options.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => sendOption(item.name)}
                      key={item.id}
                      style={styles.optionCard}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View style={styles.bullets}>
                          <CustomText style={{fontSize: 12, color: '#858494'}}>
                            {item.id}
                          </CustomText>
                        </View>
                        <Image style={{marginLeft: 20}} source={item.image} />
                        <CustomText
                          style={{
                            fontSize: 16,
                            fontFamily: Font.samibold,
                            marginLeft: 15,
                            color: '#0C092A',
                          }}>
                          {item.name}
                        </CustomText>
                      </View>
                      <ArrowCircle />
                    </TouchableOpacity>
                  );
                })}
                {/* <TouchableOpacity style={styles.optionCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.bullets}>
                    <CustomText style={{fontSize: 12, color: '#858494'}}>
                      2
                    </CustomText>
                  </View>
                  <Image style={{marginLeft: 20}} source={DefaultImages.SHRM} />
                  <CustomText
                    style={{
                      fontSize: 16,
                      fontFamily: Font.samibold,
                      marginLeft: 15,
                    }}>
                    SHRM-SCP
                  </CustomText>
                </View>
                <ArrowCircle />
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.bullets}>
                    <CustomText style={{fontSize: 12, color: '#858494'}}>
                      3
                    </CustomText>
                  </View>
                  <Image style={{marginLeft: 20}} source={DefaultImages.PHR} />
                  <CustomText
                    style={{
                      fontSize: 16,
                      fontFamily: Font.samibold,
                      marginLeft: 15,
                    }}>
                    PHR
                  </CustomText>
                </View>
                <ArrowCircle />
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.bullets}>
                    <CustomText style={{fontSize: 12, color: '#858494'}}>
                      4
                    </CustomText>
                  </View>
                  <Image style={{marginLeft: 20}} source={DefaultImages.PHR} />
                  <CustomText
                    style={{
                      fontSize: 16,
                      fontFamily: Font.samibold,
                      marginLeft: 15,
                    }}>
                    SPHR
                  </CustomText>
                </View>
                <ArrowCircle />
              </TouchableOpacity> */}
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  optionCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bullets: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FirstQuiz;
