import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';

import {
  PurchaseError,
  getProducts,
  initConnection,
  requestPurchase,
  requestSubscription,
  useIAP,
  validateReceiptIos,
  withIAPContext,
} from 'react-native-iap';
import Header from '../../comman/Header';
import {Colors, DefaultImages} from '../../comman/Theme';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Font from '../../comman/Font';
import CustomText from '../../comman/CustomText';
import History from '../../../asset/image/svg/HistorySee.svg';
import Icon from '../../../asset/image/svg/SubIcon.svg';
import SubRight from '../../../asset/image/svg/subRight.svg';
import PageLoader from '../../comman/PageLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateFunction} from '../../comman/Api';
import {successToast} from '../../comman/TostModal';
import {months} from 'moment';

const errorLog = ({message, error}) => {
  console.error('An error happened', message, error);
};

const isIos = Platform.OS === 'ios';

const Subscription = ({navigation}) => {
  //product id from appstoreconnect app->subscriptions

  //useIAP - easy way to access react-native-iap methods to
  //get your products, purchases, subscriptions, callback
  //and error handlers.
  const {
    connected,
    products,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
    getAvailablePurchases,
  } = useIAP();

  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  const IapData = useSelector(state => state?.IapInfo.Iap);
  const subscriptionSkus = Platform.select({
    ios: IapData.innerId,
  });

  const [loading, setLoading] = useState(false);
  const [SubDetails, setsubDetails] = useState([]);
  const [CurrentPlan, setCurrentPlan] = useState('');

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({message: 'handleGetPurchaseHistory', error});
    }
  };

  useEffect(() => {
    handleGetPurchaseHistory();
  }, [connected]);

  const handleGetSubscriptions = async IapId => {
    await initConnection();

    try {
      const newdata = await getProducts({skus: subscriptionSkus});
      setsubDetails(newdata);
    } catch (error) {
      errorLog({message: 'handleGetSubscriptions', error});
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);

  useEffect(() => {
    // ... listen if connected, purchaseHistory and subscriptions exist
    if (
      purchaseHistory.find(
        x => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
      )
    ) {
      // navigation.navigate('Home');
    }
  }, [connected, purchaseHistory, subscriptions]);

  const handleBuySubscription = async productId => {
    try {
      console.log(productId);
      let resp = await requestSubscription({
        sku: productId,
      });
      // console.log('purchase', resp);
      SaveTranstion(resp, CurrentPlan);

      console.log(CurrentPlan);
      // navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log('error');
      if (error instanceof PurchaseError) {
        console.log('first', {
          message: `[${error.code}]: ${error.message}`,
          error,
        });
      } else {
        console.log('Second', {message: 'handleBuySubscription', error});
      }
    }
  };

  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      console.log('purchase', purchase);
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt;
          console.log('receipt', receipt);
          if (receipt) {
            if (Platform.OS === 'ios') {
              const isTestEnvironment = __DEV__;

              //send receipt body to apple server to validete
              const appleReceiptResponse = await validateReceiptIos(
                {
                  'receipt-data': receipt,
                  password: IapData.key,
                },
                isTestEnvironment,
              );

              //if receipt is valid
              if (appleReceiptResponse) {
                const {status} = appleReceiptResponse;
                if (status) {
                  // navigation.navigate('Home');
                }
              }

              return;
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  const SaveTranstion = async (resp, CurrentPlan) => {
    const Amount = parseFloat(
      CurrentPlan.localizedPrice?.replace(/[^0-9.]/g, ''),
    );
    const ValidTime = CurrentPlan?.description?.split('valid').pop();

    console.log(CurrentPlan);
    let token = await AsyncStorage.getItem('Token');
    let url = `iospayment`;
    let data = new FormData();
    data.append('packageName', CurrentPlan.title);
    data.append('subscriptionId', resp.transactionId);
    data.append('transactionid', resp.transactionId);
    data.append('cost', Amount);
    data.append('tanure', ValidTime);
    let result = await UpdateFunction(data, url, token);
    console.log('SaveData', result);
    if (result.success) {
      successToast(result.data?.message);
      navigation.navigate('Home');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.default}}>
      <Header
        HeaderName={'Subscription Plan'}
        textcolor={'#FFF'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.mainContain}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00ADEF', '#002299']}
          style={styles.profileView}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}
            onPress={() => navigation.navigate('PaymentHistory')}>
            <View
              style={{
                height: '100%',
                // alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
                // height: 100,
              }}>
              <Image
                // style={{height: '100%', width: '100%'}}
                source={DefaultImages.DefautProfile}
                // source={{uri: userinfo.profile_pic}}
              />
            </View>
            <View style={{paddingLeft: 20, width: '30%'}}>
              <CustomText
                style={styles.username}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {userinfo.first_name} {userinfo.last_name}
              </CustomText>
              <CustomText
                style={styles.usemail}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {userinfo.email}
              </CustomText>
            </View>
            <View
              style={{
                backgroundColor: '#FFF',
                width: 130,
                height: 25,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 25,
              }}>
              <History />
              <CustomText style={styles.PaymentHistory}>
                Payment History
              </CustomText>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        {SubDetails.length > 0 ? (
          <>
            {SubDetails?.map(item => {
              return (
                <TouchableOpacity
                  style={[
                    styles.SubView,
                    {
                      borderColor:
                        CurrentPlan.productId == item.productId
                          ? Colors.default
                          : '#fff',
                    },
                  ]}
                  onPress={() => {
                    setLoading(true);
                    setCurrentPlan(item);
                    handleBuySubscription(item.productId);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      //   paddingHorizontal: 20,
                      paddingVertical: 20,
                    }}>
                    <Icon />
                    <View style={{paddingHorizontal: 15}}>
                      <CustomText style={styles.Standard}>
                        {item.title}
                      </CustomText>
                      <CustomText style={styles.amount}>
                        {item.localizedPrice}
                        <CustomText style={styles.month}>/month</CustomText>
                      </CustomText>
                    </View>
                  </View>
                  {/* <View style={[styles.righticnon, {marginBottom: 20}]}>
                <CustomText style={styles.Quizzes}>
                  Quizzes : {item.number_of_quiz}
                </CustomText>

                <SubRight />
              </View>
              <View style={styles.righticnon}>
                <CustomText style={styles.Quizzes}>
                  Validity: {item.tenure}
                </CustomText>
                <SubRight />
              </View> */}
                  <CustomText
                    style={[styles.Quizzes, {paddingLeft: 20, marginTop: 15}]}>
                    {/* {item.description} */}
                    You will get access to over 700 realistic practice questions
                    including 2 full-length exams, flashcards, and answer
                    rationale.
                  </CustomText>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Colors.default,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      margin: 15,
                    }}>
                    {CurrentPlan.productId == item.productId ? (
                      <PageLoader color={'#FFF'} />
                    ) : (
                      <CustomText style={styles.remaining}>
                        Subscribe
                      </CustomText>
                    )}
                  </View>

                  {/* {CurrentPlan == item.id ? (
                <CustomText style={styles.Current}>Current plan</CustomText>
              ) : (
                <CustomText style={styles.Current}></CustomText>
              )} */}
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <PageLoader color={'#00ADEF'} />
          </View>
        )}

        <View style={{height: 20}} />
        {/* ///////// */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default withIAPContext(Subscription);

const styles = StyleSheet.create({
  Current: {
    marginVertical: 20,
    alignSelf: 'center',
    color: '#9C9C9C',
    fontFamily: Font.regular,
    fontSize: 16,
  },
  remaining: {
    // alignSelf: 'center',
    // marginTop: 20,
    color: '#FFF',
    fontSize: 18,
    fontFamily: Font.samibold,
  },
  Quizzes: {
    color: '#1C2348',
    fontFamily: Font.regular,
    fontSize: 15,
    fontWeight: '500',
  },
  righticnon: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between',
    width: '95%',
  },
  month: {
    color: '#A4A5AA',
    fontFamily: Font.regular,
    fontSize: 12,
  },
  amount: {
    color: '#1C2348',
    fontFamily: Font.bold,
    fontSize: 25,
  },

  Standard: {
    color: '#1C2348',
    fontSize: 16,
    fontFamily: Font.samibold,
  },
  SubView: {
    borderWidth: 1,
    width: '100%',
    marginTop: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    // backgroundColor: 'red',
  },
  profileView: {
    width: '100%',
    // backgroundColor: '#00ADEF',
    height: 80,
    borderRadius: 20,
  },
  mainContain: {
    backgroundColor: '#F2F6FF',
    flex: 1,
    marginVertical: 10,
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  usemail: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: Font.regular,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Font.samibold,
  },
  PaymentHistory: {
    color: '#1E1E1E',
    fontSize: 11,
    fontFamily: Font.samibold,
    marginLeft: 5,
  },
  container: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    paddingLeft: 8,
    paddingBottom: 3,
    textAlign: 'center',
    color: 'black',
  },
  box: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    shadowColor: 'rgba(0, 0, 0, 0.45)',
    shadowOffset: {height: 16, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'mediumseagreen',
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  specialTag: {
    color: 'white',
    backgroundColor: 'crimson',
    width: 125,
    padding: 4,
    fontWeight: 'bold',
    fontSize: 12,
    borderRadius: 7,
    marginBottom: 2,
  },
});
