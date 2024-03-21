import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../comman/Header';
import {DefaultImages, Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Button from '../../comman/Button';
import Font from '../../comman/Font';
import HeadIcon from '../../../asset/image/svg/Group33864.svg';
import Timer from '../../../asset/image/svg/Timer.svg';

export default function ImageTextquestion({navigation}) {
  const quesetion = [
    {
      id: '1',
      question: 'Choosing a candidate',
      image: require('../../../asset/image/other/Rectanglenew195.png'),
    },
    {
      id: '2',
      question: 'Choosing a candidate',
      image: require('../../../asset/image/other/Rectanglenew195.png'),
    },
    {
      id: '3',
      question: 'Choosing a candidate',
      image: require('../../../asset/image/other/Rectanglenew195.png'),
    },
    {
      id: '4',
      question: 'Choosing a candidate',
      image: require('../../../asset/image/other/Rectanglenew195.png'),
    },
  ];
  return (
    <SafeAreaView style={{backgroundColor: Colors.default, flex: 1}}>
      <Header HeaderName={'HR Prodigy'} textcolor={'#FFF'} />
      <View style={customStyle.mainContain}>
        <ScrollView style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={customStyle.rangeview}>
              <HeadIcon />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <CustomText>Questions </CustomText>
                <CustomText>1/20 </CustomText>
              </View>
            </View>
            <View style={customStyle.timerview}>
              <Timer width={20} height={20} />
              <CustomText style={customStyle.timerTime}>00:00:20</CustomText>
            </View>
          </View>
          <CustomText style={customStyle.qsheading}>
            Selection is the process of ?
          </CustomText>
          {quesetion.map(item => (
            <TouchableOpacity style={customStyle.questionarea}>
              <Image source={item.image} />
              <CustomText style={customStyle.questiotext}>
                {item.question}
              </CustomText>
            </TouchableOpacity>
          ))}
          <CustomText style={customStyle.skipbutton}>Skip</CustomText>
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            btnwidth={'45%'}
            buttonName={'Previous'}
            bgcolor={'#FFF'}
            btnborder={1}
            bordercolor={'#9C9C9C'}
            btncolor={'#9C9C9C'}
            onPress={() => navigation.goBack()}
          />
          <Button
            btnwidth={'45%'}
            buttonName={'Next'}
            onPress={() => navigation.navigate('ImageQuestion')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
  rangeview: {
    height: 50,
    width: '70%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 15,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timerTime: {
    fontSize: 10,
    color: '#070417',
    fontFamily: Font.regular,
  },
  questiotext: {
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Font.regular,
    marginLeft: 20,
  },
  skipbutton: {
    color: '#00ADEF',
    fontWeight: '500',
    fontSize: 17,
    fontFamily: Font.regular,
    marginVertical: 15,
    textAlign: 'right',
  },
  qsheading: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: Font.regular,
    marginVertical: 15,
  },
  questionarea: {
    backgroundColor: '#FFF',
    height: 100,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 12,
    bordercolor: '#9C9C9C',
    flexDirection: 'row',
    alignItems: 'center',
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
