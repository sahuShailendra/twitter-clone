import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // current login user data
  allUsers: [], // sabhi users
  otherProfile: null, // kisi dusre user ka profile
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setOtherProfile: (state, action) => {
      state.otherProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeuser: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setAllUsers, setUser, setOtherProfile, setLoading, setError, removeuser } = userSlice.actions;
