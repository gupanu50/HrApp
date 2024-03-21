import {View, Text, AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigationRef';
import Login from '../screens/Auth/Login';
import Splash from '../screens/Auth/Splash';
import Signup from '../screens/Auth/Signup';
import ChangesPassword from '../screens/Auth/ChangesPassword';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Varification from '../screens/Auth/Varification';
import Home from '../screens/Home/Home';
import Discover from '../screens/Home/Discover';
import QuizStart from '../screens/Home/QuizStart';
import Question from '../screens/Questions/Question';
import Success from '../screens/Auth/Success';
import Subscription from '../screens/Payment/Subscription';
import PaymentHistory from '../screens/Payment/PaymentHistory';
import Profile from '../screens/Profile/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import ChangeProfilePassword from '../screens/Profile/ChangeProfilePassword';
import LeaderBoard from '../screens/LeaderBoard.js/LeaderBoard';
import CheckAnswer from '../screens/Questions/CheckAnswer';
import IncorrectAns from '../screens/Questions/IncorrectAns';
import Tips from '../screens/Questions/Tips';
import ImageQuestion from '../screens/Questions/ImageQuestion';
import ImageTextquestion from '../screens/Questions/ImageTextquestion';
import TopicDetails from '../screens/Home/TopicDetails';
import Notificaton from '../screens/Notification/index';
import StripPayment from '../screens/Payment/StripPayment';
import {
  notificationListener,
  requestUserPermission,
} from '../screens/Pushnotification';

import WellCome from '../screens/Auth/WellCome';
import FlashCard from '../screens/Flashcards/FlashCard';
import Manage from '../screens/Flashcards/Manage';
import CardAnswer from '../screens/Flashcards/CardAnswer';
import Badge from '../screens/Profile/Badge';
import WarmUpStart from '../screens/Home/WarmUpStart';
import WarmUpQuestion from '../screens/Questions/WarmUpQuestion';
import SubscriptionStrip from '../screens/Payment/SubscriptionStrip';
import WarmupIncorrectAns from '../screens/Questions/WarmupIncorrectAns';
import FullLengthQuiz from '../screens/Home/FullLengthQuiz';
import FirstQuiz from '../screens/Auth/FirstQuiz';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  useEffect(() => {
    // AppState.addEventListener('change', e => handleAppStateChange(e));
    requestUserPermission();
    notificationListener();
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FirstQuiz"
          component={FirstQuiz}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangesPassword"
          component={ChangesPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Varification"
          component={Varification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Discover"
          component={Discover}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuizStart"
          component={QuizStart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Question"
          component={Question}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangeProfilePassword"
          component={ChangeProfilePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckAnswer"
          component={CheckAnswer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IncorrectAns"
          component={IncorrectAns}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tips"
          component={Tips}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageQuestion"
          component={ImageQuestion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageTextquestion"
          component={ImageTextquestion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TopicDetails"
          component={TopicDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notificaton"
          component={Notificaton}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StripPayment"
          component={StripPayment}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="WellCome"
          component={WellCome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FlashCard"
          component={FlashCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manage"
          component={Manage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CardAnswer"
          component={CardAnswer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Badge"
          component={Badge}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WarmUpStart"
          component={WarmUpStart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WarmUpQuestion"
          component={WarmUpQuestion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubscriptionStrip"
          component={SubscriptionStrip}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WarmupIncorrectAns"
          component={WarmupIncorrectAns}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FullLengthQuiz"
          component={FullLengthQuiz}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
