import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import CustomText from '../../comman/CustomText';
import Arrow from '../../../asset/image/svg/arrowright.svg';
import Font from '../../comman/Font';
import Point from '../../../asset/image/svg/PointIcon.svg';
import Inpro from '../../../asset/image/svg/InComplete.svg';
import Comp from '../../../asset/image/svg/Completed.svg';
import Question from '../../../asset/image/svg/QuestionIcon.svg';
import DocIcon from '../../../asset/image/svg/DocIcon.svg';

export default function QuizCard({navigation, onPress, item}) {
  console.log('quiz list', item);
  return (
    <TouchableOpacity style={styles.quizcardbox} onPress={onPress}>
      <View style={{height: 140, width: 130, overflow: 'hidden'}}>
        {item.quizStatus !== '' ? (
          <View
            style={{
              width: 100,
              position: 'absolute',
              zIndex: 99,
              backgroundColor: '#feed50',
              margin: 5,
              padding: 5,
              transform: [{translateX: -25}, {rotate: '-45deg'}],
            }}>
            <CustomText
              style={{fontSize: 10, marginHorizontal: 8, color: '#00ADEF'}}>
              {item.quizStatus == 'completed' ? 'Completed' : ' InComplete '}
            </CustomText>
          </View>
        ) : null}

        <Image
          style={{height: '100%', width: '100%', borderRadius: 10}}
          source={{uri: item.image}}
        />
      </View>
      <View
        style={{
          height: 'auto',
          width: '100%',
          paddingLeft: 20,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '35%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomText
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.heading}>
            {item.name}
          </CustomText>
          {/* {item.quizstatus ? (
            // <View
            //   style={{
            //     backgroundColor: '#00ADEF',
            //     borderRadius: 10,
            //     marginHorizontal: 5,
            //     padding: 5,
            //   }}>
            //   <CustomText style={styles.Status}>
            //     {item.quizstatus == 'completed' ? 'Completed' : ' Inprocess '}
            //   </CustomText>
            // </View>
          ) : null} */}
        </View>

        {item.topicname ? (
          <CustomText
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.subheading}>
            {item.topicname}
          </CustomText>
        ) : null}

        <View style={{justifyContent: 'center'}}>
          {/* <Arrow marginLeft={10} /> */}
          {/* <View style={{flexDirection: 'row'}}> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Question height={20} width={20} />
            <CustomText style={styles.errotext}>
              {item.assign_question} Questions
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <DocIcon height={20} width={20} />
            <CustomText style={styles.errotext}>
              {/* {item.total_min > 0 ? 'Non Timed' : 'Timed'} */}
              {item.quiz_status == 1
                ? item.total_min == 0
                  ? 'Non Timed'
                  : 'Timed'
                : 'Full length Quiz'}
            </CustomText>
          </View>
          {/* </View> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Point height={20} width={20} />
            <CustomText style={styles.errotext}>
              {item.total_score} Points
            </CustomText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Status: {
    fontFamily: Font.regular,
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    // marginHorizontal: 15,
  },
  errotext: {
    color: '#1E1E1E',
    fontFamily: Font.bold,
    fontSize: 14,
  },
  subheading: {
    fontFamily: Font.regular,
    color: '#626262',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    width: 180,
  },
  heading: {
    fontFamily: Font.regular,
    color: '#1E232C',
    fontSize: 16,
    width: 190,
  },
  quizcardbox: {
    borderWidth: 1,
    borderColor: '#9C9C9C',

    minHeight: 110,
    maxHeight: 'auto',
    width: '95%',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    margin: 5,
  },
});
