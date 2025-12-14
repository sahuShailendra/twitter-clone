import userAPI from "../../api/userApi";
import { setLoading } from "../reducers/postSlice";
import {
  setUser,
  setAllUsers,
  setOtherProfile,
  removeuser,
  updateOtherProfileFollowState
} from "../reducers/userSlice";

export const currentUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await userAPI.loginUser(data);
    if (response.data.success) {
      dispatch(setUser(response.data.user));
    }
  } catch (error) {
    console.log("Error in currentUser action:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

//fetch other user profile
export const fetchOtherProfile = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));   // API start

    const response = await userAPI.getUserProfileById(userId);
    console.log("Fetched other profile response:", response.data.data[0]);
    dispatch(setOtherProfile(response.data.data[0]));

  } catch (error) {
    dispatch(setError(error.message));
    console.error("Error fetching other profile:", error);
  } finally {
    dispatch(setLoading(false));  // API end
  }
};

//toggle follow user
export const toggleFollowUser = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await userAPI.toggleFollowUser(userId);
    console.log("Toggle follow response:", response.data);
    if (response.data.success) {
      dispatch(updateOtherProfileFollowState(response.data));
    }
}catch (error) {
    console.error("Error toggling follow:", error);
  } finally {
    dispatch(setLoading(false));
}
};