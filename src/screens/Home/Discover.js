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
import CheckMark from '../../../asset/image/svg/CheckMark.svg';
import EmptyBox from '../../../asset/image/svg/EmptyBox.svg';
import DocIcon from '../../../asset/image/svg/DocIcon.svg';
import {GetFunction, UpdateFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageLoader from '../../comman/PageLoader';
import {errorToast} from '../../comman/TostModal';

export default function Discover({navigation, route}) {
  const SearchText = route?.params?.SearchText;
  // console.log(SearchText);
  const {height, width} = Dimensions.get('screen');
  const [isloading, setloading] = useState(true);
  const [selectedItem, SelectTopic] = useState('1');
  const buttons = ['Quiz', 'Topics'];
  const [role, setrole] = useState('Quiz');
  const updateIndex = selectedIndex => {
    setrole(selectedIndex === 0 ? 'Quiz' : 'Topics');
  };
  const [Quizdata, setQuizdata] = useState([]);
  const [TopicsData, setTopicsData] = useState([]);
  const [imageurl, setimageUrl] = useState('');
  const [isSearQuiz, SearQuiz] = useState('');

  const [NotmalQuiz, setNormalQuiz] = useState(true);
  const [FullTimeQuiz, setFullTimeQuiz] = useState(true);
  const [unfinished, setunfinished] = useState(false);
  useEffect(() => {
    SearchData();
  }, [NotmalQuiz, FullTimeQuiz, unfinished]);
  useEffect(() => {
    getmoreQuizAndTopicsData();
  }, []);

  const SearchData = async () => {
    if (SearchText) {
      SearQuiz(SearchText);
    }

    let url = `getsuggestiondata`;
    let data = new FormData();
    data.append('search', SearchText || isSearQuiz);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    console.log('getsuggestiondata', result);
    if (result.success) {
      const Data = result.data;

      if (unfinished) {
        let filterData = Data?.quizdata?.filter(
          i => i.quizstatus !== 'completed' && i.quiz_status == 1,
        );
        setQuizdata(filterData);
      } else {
        let filterData = Data?.quizdata?.filter(i => i.quiz_status == 1);
        setQuizdata(filterData);
      }
      let filterData = Data.topicdata?.filter(i => i.id !== 20);
      setTopicsData(filterData);
      setimageUrl(Data);
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  const getmoreQuizAndTopicsData = async () => {
    let url = `topicquizdatamore`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log('topicquizdatamore', result);
    if (result.success) {
      const Data = result.data;

      // setQuizdata(Data.quizdata);
      let filterData = Data.topicdata?.filter(i => i.id !== 20);
      setTopicsData(filterData);
      setimageUrl(Data);
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
            HeaderName={'Discover'}
            textcolor={'#FFF'}
            onPress={() => navigation.goBack()}
          />
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 20}}>
              <SearchBox
                value={isSearQuiz}
                onChangeText={text => SearQuiz(text)}
                placeholder={'Employee management'}
                onPress={() => SearchData()}
              />
            </View>

            <View style={[styles.quizarea]}>
              <View style={{height: 50, marginTop: 20}}>
                <ButtonGroup
                  onPress={updateIndex}
                  selectedIndex={buttons.findIndex(val => val === role)}
                  buttons={buttons}
                  innerBorderStyle={{color: '#FFF'}}
                  textStyle={{
                    fontSize: 16,
                    fontFamily: Font.medium,
                    color: '#000',
                  }}
                  selectedTextStyle={{color: '#626262'}}
                  selectedButtonStyle={{
                    backgroundColor: '#FFF',
                  }}
                  containerStyle={{
                    padding: 5,
                    height: 45,
                    borderRadius: 10,
                    backgroundColor: '#E5F7FD',
                  }}
                />
              </View>

              <View
                style={{
                  width: '100%',

                  alignItems: 'center',
                  marginTop: 20,
                  backgroundColor: '#FFF',
                }}>
                {role == 'Quiz' ? (
                  <>
                    <View style={{width: '100%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 15,
                          marginBottom: 15,
                        }}>
                        {/* <TouchableOpacity
                          onPress={() => setNormalQuiz(!NotmalQuiz)}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {NotmalQuiz ? <CheckMark /> : <EmptyBox />}

                          <CustomText style={styles.quizText}>
                            Normal Quiz
                          </CustomText>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                          onPress={() => setFullTimeQuiz(!FullTimeQuiz)}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {FullTimeQuiz ? <CheckMark /> : <EmptyBox />}
                          <CustomText style={styles.quizText}>
                            Full Length Quiz
                          </CustomText>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => setunfinished(!unfinished)}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {unfinished ? <CheckMark /> : <EmptyBox />}
                          <CustomText style={styles.quizText}>
                            Unfinished Quiz
                          </CustomText>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {Quizdata.map(item => (
                      <QuizCard
                        item={item}
                        onPress={() =>
                          navigation.navigate('QuizStart', {QuizId: item.id})
                        }
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {TopicsData.map(item => (
                      <TouchableOpacity
                        onPress={() => {
                          SelectTopic(item.id),
                            navigation.navigate('TopicDetails', {
                              TopicId: item,
                            });
                        }}
                        style={{
                          height: 100,
                          backgroundColor:
                            selectedItem == item.id ? '#00ADEF' : '#E5F7FD',
                          width: '90%',
                          margin: 10,
                          borderRadius: 15,
                          paddingLeft: 15,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                          }}>
                          <View style={styles.TopicIcon}>
                            <Image
                              style={{height: '70%', width: '70%'}}
                              source={{
                                uri: item.image,
                              }}
                            />
                          </View>

                          <View>
                            <CustomText
                              style={[
                                styles.title,
                                {
                                  color:
                                    selectedItem == item.id
                                      ? '#FFF'
                                      : '#1E1E1E',
                                },
                              ]}>
                              {item.name}
                            </CustomText>
                            <CustomText
                              style={[
                                styles.QuizCount,
                                {
                                  color:
                                    selectedItem == item.id
                                      ? '#FFF'
                                      : '#1E1E1E',
                                },
                              ]}>
                              {item.quizcount} Quizzes
                            </CustomText>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
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
  quizText: {
    color: '#000',
    fontSize: 14,
    fontFamily: Font.regular,
    marginHorizontal: 5,
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

    // backgroundColor: 'red',
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
