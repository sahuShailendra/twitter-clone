import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,  createBrowserRouter } from 'react-router-dom'
import Feed from './Components/Feed.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
