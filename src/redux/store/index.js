import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducers';

const persistConfig = {
  timeout: 2000,
  key: 'appStateVer_54',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const enhancer = compose(applyMiddleware(ReduxThunk));

export default function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  return {store, persistor};
}
