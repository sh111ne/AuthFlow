import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  user: {
    name: string;
    email: string;
    // isVerified: boolean;
  };
};

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    // isVerified: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
