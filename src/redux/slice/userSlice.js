import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    hasCompletedOnboarding: false,
    hasCompletedRegistration: false,
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setOnboardingCompletion: (state, action) => {
      state.hasCompletedOnboarding = action.payload;
    },
    setCompletedRegistration: (state, action) => {
      state.hasCompletedRegistration = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthentication,
  setOnboardingCompletion,
  setCompletedRegistration,
} = userSlice.actions;

export default userSlice.reducer;
