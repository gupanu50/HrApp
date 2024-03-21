import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../comman/Header';
import {DefaultImages, Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import Button from '../../comman/Button';
import Font from '../../comman/Font';
import HeadIcon from '../../../asset/image/svg/Group33864.svg';
import Timer from '../../../asset/image/svg/Timer.svg';
import Zoom from '../../../asset/image/svg/ZoomImage.svg';
import ZoomableImage from '../../comman/ZoomableImage';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function ImageQuestion({navigation}) {
  const question = [
    {
      id: '1',
      iconlogi: require('../../../asset/image/other/Rectanglenew195.png'),
    },
    {
      id: '2',
      iconlogi: require('../../../asset/image/other/Rectanglenew195.png'),
    },
    {
      id: '3',
      iconlogi: require('../../../asset/image/other/Rectanglenew195.png'),
    },
    {
      id: '4',
      iconlogi: require('../../../asset/image/other/Rectanglenew195.png'),
    },
  ];
  const [imageUrl, setimageUrl] = useState('');
  const [openModal, setModal] = useState(false);
  const zoomimage = uri => {
    setModal(true);
    setimageUrl(uri);
  };
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
            Employee survey questions about management are important because
            they allow organizations to get feedback directly from their
            employees about how their managers are doing in terms of leadership,
            communication, support, and more.
          </CustomText>

          <FlatList
            numColumns={2}
            data={question}
            renderItem={({item}) => {
              return (
                <View style={{flex: 1}}>
                  <TouchableOpacity style={customStyle.questionarea}>
                    <ImageBackground
                      imageStyle={{borderRadius: 12}}
                      style={{height: '100%', width: '100%'}}
                      source={item.iconlogi}>
                      <TouchableOpacity
                        style={{alignItems: 'flex-end'}}
                        onPress={() => zoomimage(item.iconlogi)}>
                        <Zoom />
                      </TouchableOpacity>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
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
            onPress={() => navigation.navigate('CheckAnswer')}
          />
        </View>
      </View>
      <Modal
        isVisible={openModal}
        onSwipeComplete={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
        style={{margin: 0}}>
        <View style={{backgroundColor: '#FFF', height: '50%', width: '100%'}}>
          <Image
            resizeMode="cover"
            source={imageUrl}
            style={{height: '100%', width: '100%'}}
          />
        </View>
      </Modal>
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
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Font.regular,
    marginVertical: 15,
  },
  questionarea: {
    height: 150,
    width: '90%',
    borderRadius: 12,
    marginVertical: 10,
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
