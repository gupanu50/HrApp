import {combineReducers} from 'redux';

// // here we will import our all reducers
import userInformationReducer from './UserInformations';
import IapInformationReducer from './IapInformations';
import WellComeInformation from './WellComeInformation';

export default combineReducers({
  userInfo: userInformationReducer,
  IapInfo: IapInformationReducer,
  WelCome: WellComeInformation,
});
