import React from "react";
import { useForm } from "react-hook-form";
import XIcon from "@mui/icons-material/X";
import { Link, useNavigate } from "react-router-dom"
import { currentUser } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // On Submit
  const onSubmit = async(data) => {
    console.log("Login Data:", data);
    dispatch(currentUser(data))
  };

  // Redirect if user is logged in
  React.useEffect(() => {
    if (user) {
      console.log("User logged in, navigating to home:", user);
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-[#16181c] rounded-2xl shadow-lg border border-gray-800">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <XIcon sx={{ fontSize: 60, color: "white" }} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-8">
          Sign in to Twitter
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to='/Signup' className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
