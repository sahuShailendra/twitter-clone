import API from "./axioconfig";

const userAPI = {
  // User Registration
  registerUser: async (userData) => {
    return await API.post("/api/auth/user/register", userData);
  },
  // User Login
  loginUser: async (loginData) => {
    return await API.post("/api/auth/user/login", loginData);
  },
  // User Logout
  logoutUser: async () => {
    return await API.post("/api/auth/user/logout");
  },
  // Get My Profile
  getMyProfile: async () => {
    return await API.get("/api/auth/user/myprofile");
  },
  // Update User Profile
  updateUserProfile: async (updatedData) => {
    return await API.put("/api/auth/user/update", updatedData);
  },
  // Get All Users
  getAllUsers: async () => {
    return await API.get("/api/auth/user/allusers");
  },
  // Follow/Unfollow User
  toggleFollowUser: async (userId) => {
    return await API.post(`/api/auth/user/follow/${userId}`);
  },
  // Get User Profile by ID
  getUserProfileById: async (userId) => {
    return await API.get(`/api/auth/user/userprofile/${userId}`);
  },
};

export default userAPI;
