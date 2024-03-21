import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomText from '../../comman/CustomText';
import Header from '../../comman/Header';
import QuizCard from '../Auth/QuizCard';
import SearchBox from '../../comman/SearchBox';
import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';
import Font from '../../comman/Font';
import Travel from '../../../asset/image/svg/Travel.svg';
import History from '../../../asset/image/svg/History.svg';
import Music from '../../../asset/image/svg/Music.svg';
import Education from '../../../asset/image/svg/education.svg';
import {UpdateFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageLoader from '../../comman/PageLoader';
import {errorToast} from '../../comman/TostModal';

export default function TopicDetails({navigation, route}) {
  const {height, width} = Dimensions.get('screen');
  const {TopicId} = route.params;
  //   console.log(TopicId);
  const [isloading, setloading] = useState(true);
  const [selectedItem, SelectTopic] = useState('1');

  const [Quizdata, setQuizdata] = useState([]);

  const [imageurl, setimageUrl] = useState('');
  const [isSearQuiz, SearQuiz] = useState('');
  useEffect(() => {
    getmoreQuizAndTopicsData();
  }, []);
  const getmoreQuizAndTopicsData = async () => {
    let url = `topicdetail`;
    let data = new FormData();
    data.append('topicid', TopicId.id);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data;
      setQuizdata(Data.quizlist);
      setimageUrl(Data.quizimgpath);
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  const SearchData = async () => {
    let url = `getsuggestiondata`;
    let data = new FormData();
    data.append('search', isSearQuiz);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data;
      setQuizdata(Data.quizdata);
      // setimageUrl(Data.quizimgpath);
      // setimageUrl(Data);
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00ADEF'}}>
      {isloading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <>
          <Header
            HeaderName={TopicId.name}
            textcolor={'#FFF'}
            onPress={() => navigation.goBack()}
          />
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 20}}>
              <SearchBox
                value={isSearQuiz}
                onChangeText={text => SearQuiz(text)}
                onPress={() => SearchData()}
                placeholder={'Employee management '}
              />
            </View>
            <View style={styles.quizarea}>
              <View
                style={{
                  //   flex: 1,
                  height: height,
                  alignItems: 'center',
                  marginTop: 20,
                  backgroundColor: '#FFF',
                }}>
                {Quizdata.length > 0 ? (
                  Quizdata.map(item => (
                    <QuizCard
                      item={item}
                      onPress={() =>
                        navigation.navigate('QuizStart', {QuizId: item.id})
                      }
                    />
                  ))
                ) : (
                  <CustomText style={styles.text}>No quiz found</CustomText>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: Font.regular,
    fontSize: 16,
    color: '#000',
  },
  TopicIcon: {
    height: 80,
    width: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
  title: {
    fontFamily: Font.bold,
    fontSize: 18,
    bottom: 8,
  },
  QuizCount: {
    fontFamily: Font.regular,
    fontSize: 14,
    bottom: 8,
  },
  TopicsArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '100%',
    backgroundColor: '#E5F7FD',
    margin: 5,
    borderRadius: 12,
  },
  quizarea: {
    backgroundColor: '#FFF',
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
