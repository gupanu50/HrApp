import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import PageLoader from '../../comman/PageLoader';
import Header from '../../comman/Header';
import SearchBox from '../../comman/SearchBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateFunction} from '../../comman/Api';
import QuizCard from '../Auth/QuizCard';
import CustomText from '../../comman/CustomText';
import Font from '../../comman/Font';

export default function FullLengthQuiz({navigation}) {
  const [isloading, setloading] = useState(false);
  const [isSearQuiz, SearQuiz] = useState('');
  const [Quizdata, setQuizData] = useState([]);
  useEffect(() => {
    getFullQuiztype();
  }, []);
  const getFullQuiztype = async () => {
    let url = `getsuggestiondata`;
    let data = new FormData();
    data.append('search', isSearQuiz || '');
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    console.log('fullLengthQuiz', result);
    if (result.success) {
      const Data = result.data?.quizdata;
      let FilterData = Data?.filter(i => i.quiz_status !== '1');
      console.log('FilterData', FilterData);
      setQuizData(FilterData);
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
            HeaderName={'Full Length Quiz'}
            textcolor={'#FFF'}
            onPress={() => navigation.goBack()}
          />
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 20}}>
              <SearchBox
                value={isSearQuiz}
                onChangeText={text => SearQuiz(text)}
                placeholder={'Employee management'}
                onPress={() => getFullQuiztype()}
              />
            </View>
            <View style={[styles.quizarea]}>
              {Quizdata.length > 0 ? (
                <>
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
                <CustomText style={styles.quizText}>No Data Found</CustomText>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  quizarea: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    paddingVertical: 20,

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
  quizText: {
    color: '#000',
    fontSize: 14,
    fontFamily: Font.regular,
    marginHorizontal: 5,
  },
});
