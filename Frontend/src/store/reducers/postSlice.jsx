import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // add new post at top
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    removePost: (state, action) => {
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

export const { setPosts, addPost, updatePost, removePost, setLoading, setError } =
  postSlice.actions;

export default postSlice.reducer;