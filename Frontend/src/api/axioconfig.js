import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,   // 👈 allows cookies to be sent with every request
})

export default API


//.env example
// VITE_API_BASE_URL=https://twitter-clone-tx31.onrender.com