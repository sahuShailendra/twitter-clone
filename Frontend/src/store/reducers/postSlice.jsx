import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    userPosts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addUserPost: (state, action) => {
      state.userPosts.unshift(action.payload);
      state.posts.unshift(action.payload); // add new post at top
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    removeUserPost: (state, action) => {
      state.userPosts = state.userPosts.filter((p) => p._id !== action.payload);
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, addUserPost, setUserPosts, removeUserPost, setLoading, setError } =
  postSlice.actions;

export default postSlice.reducer;