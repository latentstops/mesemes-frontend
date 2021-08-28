import { applyMiddleware, combineReducers, createStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import messagesReducer from './messages';
import contactsReducer from './contacts';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  keys: (state = {}, action) => {
    if( action.type === 'GET_KEYS' ){
      const { payload: { publicKey, privateKey, } } = action;
      return {
        publicKey,
        privateKey,
        id: publicKey
      };
    }
    return state;
  },
  messages: messagesReducer,
  contacts: contactsReducer,
  selectedContactId: (state = null, action) => {
    if( action.type === 'SELECT_CONTACT' ) {
      return action.payload
    }
    return state;
  }
});

const middleware = getDefaultMiddleware({
  serializableCheck: false
});

const reducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(reducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

/*export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;*/
