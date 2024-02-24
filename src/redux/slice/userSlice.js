import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    hasCompletedOnboarding: false,
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setOnboardingCompletion: (state, action) => {
      state.hasCompletedOnboarding = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthentication, setOnboardingCompletion } = userSlice.actions;

export default userSlice.reducer;
