import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SetUser, UserState } from '../../@types/types';

const initialState: UserState = {
  user: {
    name: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
