import React from "react";
import { useForm } from "react-hook-form";
import XIcon from "@mui/icons-material/X";
import { Link, useNavigate } from "react-router-dom";
import userAPI from "../api/userApi";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // API call ya Redux dispatch kar sakte ho yahan
    try{
      const response = await userAPI.registerUser(data);
      console.log("Registration successful:", response);
      if(response.data.success){
        navigate("/login");
      }
    }catch(err){
      console.error("Registration failed:", err);
    }

  };

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
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Only letters, numbers & underscores allowed",
                },
              })}
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          you have already account?{" "}
          <Link to="/login" href="#" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
