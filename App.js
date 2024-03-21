import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/redux/store';
import TimeProvider from './src/comman/TimeProvider';
import VersionCheck from 'react-native-version-check';

export default function App({navigation}) {
  const {store, persistor} = configureStore();
  useEffect(() => {
    CheckAppUpdate();
  }, []);
  const CheckAppUpdate = async () => {
    VersionCheck.needUpdate().then(res => {
      console.log(res, 'check version');
      if (res.isNeeded) {
        Alert.alert(
          'Hold on!',
          'There is updated version on app store do you want to update',
          [
            {
              text: 'YES',
              onPress: () => {
                Linking.openURL(res.storeUrl);
              },
            },
          ],
        );
      }
    });
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <TimeProvider>
          <Navigation />
        </TimeProvider>

        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
}
