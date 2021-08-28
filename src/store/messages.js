import {
  createAsyncThunk,
  createEntityAdapter, createSelector,
  createSlice
} from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from '../api';
/*interface MessageData {
  id: number;
  publicMessage: string;
  privateMessage: string;
}*/

export const createMessageThunk = createAsyncThunk('messages/createMessage', async ({ publicMessage, privateMessage, receiverPublicKey }) => {
  const createMessageResponse = await api.createMessage({ publicMessage, privateMessage, receiverPublicKey });
  const result = { ...createMessageResponse, receiverPublicKey, id: Date.now(), sent: true };
  console.log({createMessageResult: result});
  return result;
});

export const getPrivateMessageThunk = createAsyncThunk('messages/getPrivateMessage', async ({ publicMessage, senderPublicKey }) => {
  const createMessageResponse = await api.getPrivateMessage({ publicMessage, senderPublicKey });
  const result = { ...createMessageResponse, senderPublicKey, id: Date.now(), received: true };
  console.log({getPrivateMessage: JSON.stringify(result, null, 2)});
  return result;
});


export const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState([]),
  reducers: {
    createMessage: messagesAdapter.addOne,
    removeMessage: messagesAdapter.removeOne,
    removeAllMessages: messagesAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(createMessageThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMessageThunk.fulfilled, (state, action) => {
      console.log({action});
      messagesAdapter.addOne(state, {...action.payload, timestamp: Date.now()});
      state.loading = false;
    });
    builder.addCase(createMessageThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getPrivateMessageThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrivateMessageThunk.fulfilled, (state, action) => {
      if(action.payload?.error) return;
      messagesAdapter.addOne(state, {...action.payload, timestamp: Date.now()});
      state.loading = false;
    });
    builder.addCase(getPrivateMessageThunk.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  selectEntities: selectMessageEntities,
  selectAll: selectAllMessages,
  selectTotal: selectTotalMessages,
} = messagesAdapter.getSelectors((state) => state.messages);

export const selectMessagesBySenderId = createSelector(
    state => state.selectedMessageId,
    selectAllMessages,
    (selectedMessageId, messages) => {
      return messages?.filter( message => message?.senderPublicKey === selectedMessageId );
    }
);

export default messagesSlice.reducer;

export const { removeAllMessages, removeMessage } = messagesSlice.actions;
export { createMessageThunk as createMessage, getPrivateMessageThunk as getPrivateMessage };