import { createSlice } from '@reduxjs/toolkit';

const basicDetailsSlice = createSlice({
  name: 'basicDetails',
  initialState: [],
  reducers: {
    addBasicDetail: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateBasicDetail: (state, action) => {
      const { id, updatedDetail } = action.payload;
      const existingDetail = state.find((detail) => detail.id === id);
      //console.log(existingDetail)
      if (existingDetail) {
        Object.assign(existingDetail, updatedDetail);
      }
    },
    deleteBasicDetail: (state, action) => {
      const idToDelete = action.payload;
      const indexToDelete = state.findIndex((detail) => detail.id === idToDelete);
      if (indexToDelete !== -1) {
        state.splice(indexToDelete, 1);
      }
    },
    logout: (state, action) => {
      return [];
    },
  },
});

export const { addBasicDetail, updateBasicDetail, deleteBasicDetail, logout } = basicDetailsSlice.actions;

const basicDetailsReducer = basicDetailsSlice.reducer
export default basicDetailsReducer;
