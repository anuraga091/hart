// basicDetailsReducer.js
import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// You can add asynchronous actions here if needed (e.g., API requests).

// Selectors
export const selectBasicDetails = (state) => state.basicDetails;

export const selectBasicDetailById = (id) =>
  createSelector([selectBasicDetails], (basicDetails) =>
    basicDetails.find((detail) => detail.id === id)
  );

// You can create additional selectors as needed.

