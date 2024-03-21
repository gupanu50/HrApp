import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Font from '../../comman/Font';
import {DefaultImages, Colors} from '../../comman/Theme';
import Button from '../../comman/Button';
import Header from '../../comman/Header';
import CustomText from '../../comman/CustomText';
import Logo from '../../../asset/image/svg/TipsLogo.svg';
import Close from '../../../asset/image/svg/modalClose.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateFunction} from '../../comman/Api';
import {useSelector} from 'react-redux';
import {errorToast, successToast} from '../../comman/TostModal';
import Modal from 'react-native-modal';

export default function CheckAnswer({navigation, route}) {
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  const {QuizId, TitleName} = route.params;
  const [isloading, setloading] = useState(true);
  const [isResult, setResult] = useState('');
  const [Tips, setTips] = useState([]);
  const [showHight, OpenHight] = useState('');
  const [HighlightModal, setHighlightOpen] = useState(false);

  const Data = [
    {
      id: '1',
      desc: 'Do your research',
    },
    {
      id: '2',
      desc: 'Get your sequence right',
    },
    {
      id: '3',
      desc: 'Tip heading',
    },
  ];

  useEffect(() => {
    getAlltypeQuestion();
  }, []);
  const getAlltypeQuestion = async () => {
    let url = `userquizscore`;
    let data = new FormData();
    data.append('quizid', QuizId);
    data.append('userid', userinfo.id);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    console.log(result);
    if (result.success) {
      const Data = result.data?.data;
      // successToast(result.data?.message);
      setTips(result.data?.tipsdata);
      setResult(Data);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  return (
    <ImageBackground source={DefaultImages.BackGround} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          HeaderName={TitleName}
          textcolor={Colors.default}
          onPress={() => navigation.navigate('Home')}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{padding: 20, bottom: 20}}>
          <View
            style={{
              width: '100%',
              //   height: 250,
              backgroundColor: '#f1f0d3',
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <Logo height={150} width={150} />
            <CustomText style={styles.yourscore}>
              Your Score {isResult.score}/100
            </CustomText>
            <CustomText style={styles.attemptques}>
              No. of Questions attempted {isResult.attempt_question}/
              {isResult.assign_question}
            </CustomText>
            <CustomText style={styles.incorrect}>
              No. of Incorrect Questions {isResult.incorrect_question}
            </CustomText>
            <CustomText style={[styles.incorrect, {marginTop: 5}]}>
              Average score of the quiz {isResult.averageScore}%
            </CustomText>
            <CustomText style={[styles.incorrect, {marginTop: 5}]}>
              You have done 50% better than your last exam, Your previous score
              was
              <CustomText style={[styles.incorrect, {color: Colors.default}]}>
                {''} 50/100
              </CustomText>
            </CustomText>
            <Button
              buttonName={
                isResult.incorrect_question == 0 ? 'Back Home' : 'Check Answers'
              }
              btnwidth={'50%'}
              onPress={() => {
                isResult.incorrect_question == 0
                  ? navigation.navigate('Home')
                  : navigation.navigate('IncorrectAns', {QuizIdnew: QuizId});
              }}
            />
          </View>
          <CustomText
            style={styles.attemptques}
            onPress={() => setHighlightOpen(true)}>
            Highlighted words of this quiz
          </CustomText>
          {Tips.length > 0 ? (
            <>
              <CustomText style={styles.headingtext}>
                You have attempted {isResult.incorrect_question} wrong answers,
                would you like to check their answers?
              </CustomText>
              <CustomText style={styles.headingtexttip}>Tips</CustomText>
            </>
          ) : null}

          {Tips.length > 0 ? (
            Tips.map(item => (
              <View
                style={[
                  styles.tipsview,
                  {height: showHight == item.id ? 'auto' : 120},
                ]}>
                <CustomText style={styles.tipsHead}>{item.heading}</CustomText>
                <CustomText
                  numberOfLines={showHight == item.id ? null : 3}
                  ellipsizeMode={showHight == item.id ? null : 'tail'}
                  style={styles.tipsdesc}>
                  {item.description}
                </CustomText>
                <TouchableOpacity
                  onPress={() =>
                    // OpenHight(item.id)
                    navigation.navigate('Tips', {qid: item})
                  }>
                  <CustomText style={styles.tipsmore}>
                    {/* {showHight == item.id ? 'read less' : 'read more'} */}
                    read more
                  </CustomText>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <CustomText style={[styles.headingtexttip, {textAlign: 'center'}]}>
              No Tips Found
            </CustomText>
          )}
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={HighlightModal}
        onSwipeComplete={() => setHighlightOpen(false)}
        onBackdropPress={() => setHighlightOpen(false)}
        style={{margin: 0, paddingHorizontal: 20, backgroundColor: '#FFF'}}>
        <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingBottom: 15,

              borderBottomWidth: 1,
              borderColor: '#D2D2D2',
            }}>
            <CustomText style={styles.allQuestion}>
              Highlighted words of this quiz
            </CustomText>
            <TouchableOpacity onPress={() => setHighlightOpen(false)}>
              <Close height={40} width={40} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={Data}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <CustomText style={styles.HighlightText}>
                    {item.id}.
                  </CustomText>
                  <CustomText style={[styles.HighlightText, {marginLeft: 3}]}>
                    {item.desc}
                  </CustomText>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  HighlightText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontStyle: Font.regular,
  },
  allQuestion: {
    color: '#00ADEF',
    fontWeight: '700',
    fontFamily: Font.regular,
    fontSize: 18,
  },
  incorrect: {
    color: '#1E1E1E',
    fontFamily: Font.regular,
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
  },
  yourscore: {
    color: '#00ADEF',
    fontFamily: Font.regular,
    fontWeight: '700',
    fontSize: 16,
  },
  attemptques: {
    color: '#00ADEF',
    fontFamily: Font.regular,
    fontWeight: '700',
    fontSize: 16,
    marginVertical: 5,
    alignSelf: 'center',
  },
  tipsmore: {
    color: '#00ADEF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Font.regular,
    textAlign: 'right',
    marginTop: 5,
  },
  tipsdesc: {
    color: '#97999B',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Font.regular,
  },
  tipsHead: {
    color: '#161B1D',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Font.regular,
    marginBottom: 8,
  },
  tipsview: {
    margin: 5,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
  },
  headingtexttip: {
    // alignSelf: 'center',
    marginTop: 20,
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Font.regular,
  },
  headingtext: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Font.regular,
  },
});
