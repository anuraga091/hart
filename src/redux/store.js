import { configureStore, combineReducers } from '@reduxjs/toolkit';
//import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import basicDetailsReducer from './reducer/basicDetailsSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer from './slice/userSlice'
//import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['basicDetails'],

};

// Combine your reducers
const rootReducer = combineReducers({
  basicDetails: basicDetailsReducer,
  user: userReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export const persistor = persistStore(store);