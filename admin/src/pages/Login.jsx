import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../context/adminContext.jsx";

const Login = () => {
    const  { aToken,setAtoken } = useContext(AdminContext)
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const { data } = await axios.post(
        "http://localhost:4500/api/admin/login",
        { email, password }
      );
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAtoken(data.token);
        setEmail("");
        setPassword("");
        toast.success("Login successful!");
      } else {
        toast.error("Error logging in");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.Login_backround})` }}
    >
      {/* Dark overlay for background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login Form Container */}
      <div className="z-30 m-30 h-100 flex flex-col items-center justify-center px-6 py-8 space-y-6 bg-opacity-10 rounded-lg max-w-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/3 border-2 border-white 
transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-105">
        <p className="text-4xl font-bold text-white">Login</p>
        <div className="w-full p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              type="email"
              placeholder="Enter Username"
              className="w-full p-3 border font-bold text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50"
            />
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border font-bold text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50"
            />
            <button
              type="submit"
              className="w-full p-3 bg-purple-800 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
