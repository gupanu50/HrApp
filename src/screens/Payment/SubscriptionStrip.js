import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../comman/Header';
import {Colors, DefaultImages} from '../../comman/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../../asset/image/svg/SubIcon.svg';
import History from '../../../asset/image/svg/HistorySee.svg';
import CustomText from '../../comman/CustomText';
import SubRight from '../../../asset/image/svg/subRight.svg';
import Font from '../../comman/Font';
import Button from '../../comman/Button';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorToast, successToast} from '../../comman/TostModal';
import Modal from 'react-native-modal';
import {GetFunction, Create_Token, UpdateFunction} from '../../comman/Api';
import PageLoader from '../../comman/PageLoader';
import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
  withIAPContext,
  purchaseProduct,
  init,
} from 'react-native-iap';
import {CardField, createToken, useStripe} from '@stripe/stripe-react-native';
const errorLog = ({message, error}) => {
  console.error('An error happened', message, error);
};

const isIos = Platform.OS === 'ios';

//product id from appstoreconnect app->subscriptions
const subscriptionSkus = Platform.select({
  ios: ['HRMonthly_sub'],
});

const SubscriptionStrip = ({navigation}) => {
  const userinfo = useSelector(state => state?.userInfo?.userInfo?.data);
  const [SubDetails, setsubDetails] = useState('');
  const [isloading, setloading] = useState(true);
  const [loading, setButtonLoading] = useState(false);
  const [isCardDetails, setCardDetails] = useState('');
  const [CurrentPlan, setCurrentPlan] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getPurchaserArea();
  }, []);
  const getPurchaserArea = async () => {
    let url = `subscriptiondata`;
    const token = await AsyncStorage.getItem('Token');
    const result = await GetFunction(url, token);
    // console.log(result);
    if (result.success) {
      const Data = result.data;
      setsubDetails(Data.subscriptiondata);
      if (Data.subscription_packageid) {
        setCurrentPlan(Data.subscription_packageid);
      }

      // successToast(result.data?.message);

      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };

  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();
  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({message: 'handleGetPurchaseHistory', error});
    }
  };

  // useEffect(() => {
  //   handleGetPurchaseHistory();
  // }, [connected]);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({skus: subscriptionSkus});
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
      navigation.navigate('Home');
    }
  }, [connected, purchaseHistory, subscriptions]);

  const handleBuySubscription = async productId => {
    try {
      await requestSubscription({
        sku: productId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({message: `[${error.code}]: ${error.message}`, error});
      } else {
        errorLog({message: 'handleBuySubscription', error});
      }
    }
  };

  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            if (Platform.OS === 'ios') {
              const isTestEnvironment = __DEV__;

              const appleReceiptResponse = await validateReceiptIos(
                {
                  'receipt-data': receipt,
                  password: '266e76660a7f4748ac9b976df0f5d406',
                },
                isTestEnvironment,
              );

              //if receipt is valid
              if (appleReceiptResponse) {
                const {status} = appleReceiptResponse;
                if (status) {
                  navigation.navigate('Home');
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
  /////strip paymnet working
  const stripe = useStripe();

  const handlePayment = async () => {
    if (!stripe) {
      console.error('Stripe SDK has not loaded yet.');
      return;
    }

    try {
      const token = await createToken({...isCardDetails, type: 'Card'});
      console.log('Token:', token.token?.id);
      let CardToken = token.token?.id;
      setButtonLoading(true);
      Choose_Plan(CardToken);
    } catch (error) {
      console.error('Error creating card token:', error);
    }
  };

  const Choose_Plan = async CardToken => {
    const token = await AsyncStorage.getItem('Token');
    let url = `stripepayment`;
    let data = new FormData();
    data.append('subscriptionid', CurrentPlan);
    data.append('token', CardToken);
    const result = await UpdateFunction(data, url, token);
    // console.log(result, 'plan');
    if (result.success) {
      const Data = result.data;
      setOpenModal(false);
      getPurchaserArea();
      setButtonLoading(false);
      successToast(result.data?.message);
    } else {
      setOpenModal(false);
      errorToast(result.data?.message);
      setButtonLoading(false);
    }
  };
  ////// strip working ///

  return (
    <SafeAreaView style={{backgroundColor: Colors.default, flex: 1}}>
      {isloading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <>
          <Header
            HeaderName={'Subscription Plan'}
            textcolor={'#FFF'}
            onPress={() => navigation.goBack()}
          />
          <ScrollView
            style={customStyle.mainContain}
            showsVerticalScrollIndicator={false}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#00ADEF', '#002299']}
              style={customStyle.profileView}>
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
                  }}>
                  <Image source={DefaultImages.DefautProfile} />
                </View>
                <View style={{paddingLeft: 20, width: '30%'}}>
                  <CustomText
                    style={customStyle.username}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {userinfo.first_name} {userinfo.last_name}
                  </CustomText>
                  <CustomText
                    style={customStyle.usemail}
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
                  <CustomText style={customStyle.PaymentHistory}>
                    Payment History
                  </CustomText>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            {SubDetails?.map(item => {
              return (
                <TouchableOpacity
                  style={[
                    customStyle.SubView,
                    {
                      borderColor:
                        CurrentPlan == item.id ? Colors.default : '#fff',
                    },
                  ]}
                  onPress={() => {
                    setCurrentPlan(item.id), setOpenModal(!openModal);
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
                      <CustomText style={customStyle.Standard}>
                        {item.name}
                      </CustomText>
                      <CustomText style={customStyle.amount}>
                        ${item.cost}
                        <CustomText style={customStyle.month}>
                          /month
                        </CustomText>
                      </CustomText>
                    </View>
                  </View>
                  <View style={[customStyle.righticnon, {marginBottom: 20}]}>
                    <CustomText style={customStyle.Quizzes}>
                      Quizzes : {item.number_of_quiz}
                    </CustomText>

                    <SubRight />
                  </View>
                  <View style={customStyle.righticnon}>
                    <CustomText style={customStyle.Quizzes}>
                      Validity: {item.tenure}
                    </CustomText>
                    <SubRight />
                  </View>
                  <CustomText
                    style={[
                      customStyle.Quizzes,
                      {paddingLeft: 20, marginTop: 15},
                    ]}>
                    {item.description}
                  </CustomText>
                  <CustomText style={customStyle.remaining}>
                    {item.remaining_quiz} Quizzes remaining
                  </CustomText>
                  {CurrentPlan == item.id ? (
                    <CustomText style={customStyle.Current}>
                      Current plan
                    </CustomText>
                  ) : (
                    <CustomText style={customStyle.Current}></CustomText>
                  )}
                </TouchableOpacity>
              );
            })}

            <View style={{height: 20}} />
          </ScrollView>
        </>
      )}
      <Modal
        testID={'modal'}
        isVisible={openModal}
        onSwipeComplete={() => setOpenModal(false)}
        onBackdropPress={() => setOpenModal(false)}
        style={customStyle.view}>
        <View style={{padding: 20, backgroundColor: '#FFF'}}>
          <CustomText style={customStyle.cardhead}>
            Enter your Card Details
          </CustomText>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
              borderWidth: 1,
              borderColor: Colors.default,
            }}
            onCardChange={cardDetails => setCardDetails(cardDetails)}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
          <Button
            loader={loading}
            buttonName={'Upgrade'}
            onPress={() => handlePayment()}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default withIAPContext(SubscriptionStrip);

const customStyle = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
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
  righticnon: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between',
    width: '95%',
  },
  cardhead: {
    marginVertical: 20,
    // alignSelf: 'center',
    color: '#9C9C9C',
    fontFamily: Font.regular,
    fontSize: 16,
  },
  Current: {
    marginVertical: 20,
    alignSelf: 'center',
    color: '#9C9C9C',
    fontFamily: Font.regular,
    fontSize: 16,
  },

  remaining: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#00ADEF',
    fontSize: 18,
    fontFamily: Font.samibold,
  },
  Quizzes: {
    color: '#1C2348',
    fontFamily: Font.regular,
    fontSize: 15,
    fontWeight: '500',
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
});
