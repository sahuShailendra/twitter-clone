import API from "./axioconfig";

const postAPI = {
  // 🟢 Create Post
  createPost: async (formData) => {
    return await API.post("/api/posts/post/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 🟡 Update Post
  updatePost: async (id, formData) => {
    return await API.put(`/api/posts/post/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 🔴 Delete Post
  deletePost: async (id) => {
    return await API.delete(`/api/posts/post/delete/${id}`);
  },

  // 🔵 Get All Posts
  getAllPosts: async () => {
    return await API.get("/api/posts/post/allposts");
  },

  // 🟣 Get Single Post
  getSinglePost: async (id) => {
    return await API.get(`/api/posts/post/${id}`);
  },

  // 🟢 Get Posts by User
  getPostsByUser: async (id) => {
    return await API.get(`/api/posts/post/user/${id}`);
  },

  // 🟡 Get Posts by Following
  getPostsByFollowing: async () => {
    return await API.get("/api/posts/post/following");
  },

  // ❤️ Like or Unlike Post
  toggleLike: async (id) => {
    return await API.post(`/api/posts/post/like/${id}`);
  },
};

export default postAPI;
