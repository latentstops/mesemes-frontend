import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";

/*interface UserData {
  id: number;
  name: string;
}*/

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const asyncStore = await AsyncStorage.getAll();
  return asyncStore || [];
});

export const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false
  }),
  reducers: {
    addUser: usersAdapter.addOne,
    removeAllUsers: usersAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers
} = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;

export const { addUser, removeAllUsers } = usersSlice.actions;
