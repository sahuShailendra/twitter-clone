import postAPI from "../../api/postApi";
import { setPosts, addUserPost, setLoading, setUserPosts } from "../reducers/postSlice";
import { setUser } from "../reducers/userSlice";

// 🟢 Create Post Action
export const createPost = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log("Creating post with data:", formData.get("content"), formData.get("file"));
    const response = await postAPI.createPost(formData);
    dispatch(addUserPost(response.data.post));
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    dispatch(setLoading(false));
  }    
};

// 🟢 Fetch Posts Action
export const fetchPosts = () => async (dispatch) => {
    try {
    dispatch(setLoading(true));  
    const response = await postAPI.getAllPosts();
    dispatch(setPosts(response.data.data));
    }catch (error) {
    console.error("Error fetching posts:", error);
  }finally {
    dispatch(setLoading(false));
  }
}

// get user posts action
export const fetchUserPosts = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await postAPI.getPostsByUser(userId);
    console.log("Fetched user posts:", response.data.data);
    dispatch(setUserPosts(response.data.data));
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }finally {
    dispatch(setLoading(false));
  }
};