import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'userInformationReducer',
  initialState: {
    userInfo: {},
  },
  reducers: {
    storeUserInformation: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
});

const {actions, reducer} = counterSlice;
export const {storeUserInformation} = actions;
export default reducer;
