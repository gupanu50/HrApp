import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../comman/Header';
import Font from '../../comman/Font';
import {Colors} from '../../comman/Theme';
import CustomText from '../../comman/CustomText';
import {GetFunction} from '../../comman/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {errorToast, successToast} from '../../comman/TostModal';

export default function index({navigation}) {
  // const Notification = [
  //   {
  //     day: 'Today',
  //     message: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium',
  //   },
  //   {
  //     message: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium',
  //   },
  //   {
  //     message: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium',
  //   },
  //   {
  //     message: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium',
  //   },
  //   {
  //     message: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium',
  //   },
  //   {
  //     day: 'Yesterday',
  //     message: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium',
  //   },
  //   {
  //     message: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium',
  //   },
  //   {
  //     message:
  //       'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsium dsfsdfdsfklsd fhdskf dsjkfhksdfkdjfhkjdshfhkfdlsk jfljsdlfjldsjfljdsflsdlfsdljdslf jsdlfj',
  //   },
  // ];
  const [Notification, setnotification] = useState([]);

  useEffect(() => {
    getNotificaton();
  }, []);
  const getNotificaton = async () => {
    let url = `getmessage`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log('result', result);
    if (result.success) {
      const Data = result.data?.messagedata;
      generateItems(Data);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  function groupedDays(messages) {
    return messages.reduce((acc, el, i) => {
      var dates = el.date?.split(' ');
      // console.log(dates, 'oooo');
      const messageDay = moment(dates[0])?.format('ll');
      if (acc[messageDay]) {
        return {...acc, [messageDay]: acc[messageDay].concat([el])};
      }
      return {...acc, [messageDay]: [el]};
    }, {});
  }
  function generateItems(messages) {
    const days = groupedDays(messages);

    const sortedDays = Object.keys(days).sort(
      (x, y) => moment(x, 'YYYY-MM-DD').unix() - moment(y, 'YYYY-MM-DD').unix(),
    );

    const items = sortedDays.reduce((acc, date) => {
      const sortedMessages = days[date].sort(
        (x, y) => new Date(x.created_at) - new Date(y.created_at),
      );
      return acc.concat([{type: 'day', date, idDate: date}, ...sortedMessages]);
    }, []);
    setnotification(items);
    // dispatch(setAllMessageList(items));
    console.log(items);
  }
  const renderItem = ({item}) => {
    return (
      <>
        {item.type === 'day' ? (
          <CustomText style={styles.heading}>
            {moment(item.idDate).calendar({
              sameDay: 'LT',
              nextDay: '[Tomorrow]',
              nextWeek: 'dddd',
              lastDay: '[Yesterday]',
              lastWeek: '[Last] dddd',
              sameElse: 'DD/MM/YYYY',
            })}
          </CustomText>
        ) : null}
        {item.message ? (
          <View style={styles.container}>
            <CustomText
              style={{
                fontSize: 14,
                color: Colors.default,
                fontFamily: Font.regular,
              }}>
              {item.message}
            </CustomText>
          </View>
        ) : null}
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        NoIcon={true}
        HeaderName={'Notification'}
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
        {Notification.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Notification}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <CustomText style={[styles.headingtexttip, {textAlign: 'center'}]}>
            No Notificaton Found
          </CustomText>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headingtexttip: {
    // alignSelf: 'center',
    marginTop: 20,
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Font.regular,
  },
  container: {
    minHeight: 50,
    maxHeight: 'auto',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 5,
    padding: 10,
  },
  time: {
    color: '#989CA1',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: Font.regular,
    marginTop: 5,
  },
  titile: {
    color: '#222325',
    fontSize: 12,
    fontFamily: Font.samibold,
  },
  amount: {
    color: '#F11616',
    fontSize: 16,
    fontFamily: Font.regular,
    fontWeight: '400',
  },
  paymentcontain: {
    backgroundColor: '#FFF',
    height: 60,
    width: '100%',
    marginTop: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  heading: {
    marginTop: 20,
    color: '#161B1D',
    fontSize: 15,
    fontFamily: Font.samibold,
  },
});
