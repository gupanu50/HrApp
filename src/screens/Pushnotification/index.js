import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    sound: true,
    alert: true,
    badge: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('the old token', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('the new token', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
        //     let body = {
        //       token_no: fcmToken,
        //     };
        //     await postData('api/getAddToken', body);
      }
    } catch (error) {
      console.log('error getting token', error);
    }
  }
};

export const notificationListener = async () => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: `default`,
    name: `Default Channel`,
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    notificationPressActionEventListener(remoteMessage);
  });

  messaging().onMessage(async remoteMessage => {
    // console.log('received in foreground', remoteMessage);
    try {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          sound: 'default',
          lightUpScreen: true,
          largeIcon:
            remoteMessage.notification.android?.imageUrl || 'ic_launcher',

          style: {
            //   type: AndroidStyle.BIGPICTURE,
            //   picture: remoteMessage.notification.android.imageUrl,
            type: AndroidStyle.BIGTEXT,
            text: remoteMessage.notification.body || '',
          },
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          sound: 'default',
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
          },
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  });

  notifee.onForegroundEvent(({type, detail}) => {
    // console.log('onForegroundEvent', JSON.stringify(detail));
    // if (type === EventType.PRESS) {
    //   navigation.navigate('PlantScreen', {
    //     plant: detail?.notification?.data,
    //     showPlant: true,
    //   });
    // }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        notificationPressActionEventListener(remoteMessage);
      }
    });
};

export const notificationPressActionEventListener = async notification => {
  try {
    // if (type === EventType.PRESS) {
    // navigation.navigate('PlantScreen', {
    //   plant: notification?.data,
    //   showPlant: true,
    // });
    // }
  } catch (error) {
    console.log('Error in navigation', error);
  }
  return null;
};
