import {createSlice} from '@reduxjs/toolkit';

const IapSlice = createSlice({
  name: 'IapInformationReducer',
  initialState: {
    Iap: {},
  },
  reducers: {
    storeIapInformation: (state, action) => {
      return {
        ...state,
        Iap: action.payload,
      };
    },
  },
});

const {actions, reducer} = IapSlice;
export const {storeIapInformation} = actions;
export default reducer;
