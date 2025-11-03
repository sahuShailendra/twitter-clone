import postAPI from "../../api/postApi";
import { setPosts, addPost, updatePost, } from "../reducers/postSlice";

// 🟢 Create Post Action
export const createPost = (formData) => async (dispatch) => {
  try {
    const response = await postAPI.createPost(formData);
    dispatch(addPost(response.data.post));
  } catch (error) {
    console.error("Error creating post:", error);
  }     
};

// 🟢 Fetch Posts Action
export const fetchPosts = () => async (dispatch) => {
    try {
    const response = await postAPI.getAllPosts();
    dispatch(setPosts(response.data.posts));
    }catch (error) {
    console.error("Error fetching posts:", error);
  }
}