import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const asyncStore = await AsyncStorage.getAll();
  return asyncStore || [];
});

export const contactsAdapter = createEntityAdapter();

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsAdapter.getInitialState({
    loading: false
  }),
  reducers: {
    addContact: contactsAdapter.addOne,
    removeContact: contactsAdapter.removeOne,
    removeAllContacts: contactsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      contactsAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  selectById: selectContactById,
  selectIds: selectContactIds,
  selectEntities: selectContactEntities,
  selectAll: selectAllContacts,
  selectTotal: selectTotalContacts
} = contactsAdapter.getSelectors((state) => state.contacts);

export default contactsSlice.reducer;

export const { addContact, removeAllContacts, removeContact } = contactsSlice.actions;
