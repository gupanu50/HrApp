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
import {errorToast, successToast} from '../../comman/TostModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function PaymentHistory({navigation}) {
  const [planHistory, setPlanHistory] = useState([]);
  useEffect(() => {
    getPaymentHistory();
  }, []);
  const getPaymentHistory = async () => {
    let url = `getpaymenthistory`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    console.log(result, 'history');
    if (result.success) {
      const Data = result.data?.data;
      setPlanHistory(Data);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        HeaderName={'Payment History'}
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
        <CustomText style={styles.heading}>Recent Transactions</CustomText>
        {planHistory.length > 0 ? (
          <FlatList
            data={planHistory}
            renderItem={({item}) => {
              return (
                <View style={styles.paymentcontain}>
                  <View>
                    <CustomText style={styles.titile}>
                      {item.packagename}
                    </CustomText>
                    <CustomText style={styles.time}>
                      {moment(item.created_at).format('lll')}
                    </CustomText>
                  </View>
                  <CustomText style={styles.amount}>${item.amount}</CustomText>
                </View>
              );
            }}
          />
        ) : (
          <CustomText style={styles.heading}>No Transactions Found</CustomText>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
