import {applyMiddleware, combineReducers, createStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import messageReducer from './message';
import usersReducer from './users';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  message: messageReducer,
  users: usersReducer
});

const middleware = getDefaultMiddleware({
  serializableCheck: false
});

const reducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(reducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

/*export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;*/
