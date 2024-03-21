import {createSlice} from '@reduxjs/toolkit';

const WellComeSlice = createSlice({
  name: 'WelComePageReducer',
  initialState: {
    status: false,
  },
  reducers: {
    storeWellComeInfo: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

const {actions, reducer} = WellComeSlice;
export const {storeWellComeInfo} = actions;
export default reducer;
