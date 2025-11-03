import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userSlice.jsx"
import postReducer from "./reducers/postSlice.jsx"

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
    }
})

export default store;