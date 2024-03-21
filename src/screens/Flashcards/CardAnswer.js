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
import React, {useState} from 'react';
import Header from '../../comman/Header';
import {DefaultImages, Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Font from '../../comman/Font';
import Button from '../../comman/Button';
import RightAns from '../../../asset/image/svg/RightAns.svg';
import WrongAns from '../../../asset/image/svg/WrongAns.svg';

export default function CardAnswer({navigation}) {
  const {height, width} = Dimensions.get('screen');
  const Data = [
    {
      id: 1,
      icon: <WrongAns />,
      BackImage: DefaultImages.Manager1,
      backColor: '#f19da3',
      fontColor: '#FF0000',
      Desc: 'Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit,Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor   ',
    },
    {
      id: 2,
      icon: <RightAns />,
      backColor: '#9dcaa5',
      fontColor: '#008000',
      BackImage: DefaultImages.Manager2,
      Desc: 'Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit,Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor   ',
    },
    {
      id: 3,
      icon: <WrongAns />,
      backColor: '#f19da3',
      fontColor: '#FF0000',
      BackImage: DefaultImages.Manager3,
      Desc: 'Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, Loreum epsum sit dolor emit,Loreum epsum sit dolor emit, Loreum epsum sit dolor emit, eum epsum sit dolor emit, Loreum epsum sit dolor   ',
    },
  ];
  const [IsAnswer, setAnswer] = useState('');
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setAnswer(item)}
        style={{
          marginVertical: 10,
          width: '100%',
          backgroundColor: item.backColor,
          padding: 15,
          borderRadius: 15,
        }}>
        <View style={{alignItems: 'flex-end'}}>{item.icon}</View>

        <CustomText
          style={[
            styles.Description,
            {
              fontFamily: Font.bold,
              textAlign: 'center',

              marginBottom: 10,
              color: item.fontColor,
            },
          ]}>
          Description
        </CustomText>
        <CustomText style={[styles.Description, {color: item.fontColor}]}>
          {item.Desc}
        </CustomText>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
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
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <CustomText style={styles.Heading}>Manager</CustomText>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={_renderItem}
          />
        </ScrollView>
        <Button
          buttonName={'Next'}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Description: {
    color: '#000',
    fontSize: 16,
    fontFamily: Font.regular,
  },
  Heading: {
    color: '#000',
    fontSize: 30,
    fontFamily: Font.bold,
    textAlign: 'center',
    marginTop: 20,
  },
});
