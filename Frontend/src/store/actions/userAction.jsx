import userAPI from "../../api/userApi";
import {
  setUser,
  setAllUsers,
  setOtherProfile,
  removeuser,
} from "../reducers/userSlice";

export const currentUser = (data) => async (dispatch) => {
  try {
    console.log("Dispatching currentUser action with data:", data);
    const response = await userAPI.loginUser(data);
    console.log("Login response:", response.data);
    if (response.data.success) {
      dispatch(setUser(response.data.user));
    }
  } catch (error) {
    console.log("Error in currentUser action:", error);
  }
};
