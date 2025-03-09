import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { UserContext } from "@/context/UserContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

export default function PersonalProfile() {
  const [user, setUser] = useState(null);
  const { backendURL, uToken } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/get-user-data`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      });
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error("Error in fetching user");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [uToken]);

  if (!user) {
    // Show a loading message or spinner while the user data is being fetched
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: `url(${assets.ProfileBg})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row p-8 transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.02]">

        {/* Left Section - Profile Picture & Greeting */}
        <div className="flex flex-col items-center text-center md:w-1/3 mb-6 md:mb-0">
          <div className="relative group">
            <img
              src={user.profilePicture || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} // Default profile picture if user doesn't have one
              alt="User Avatar"
              className="w-40 h-40 rounded-full border-4 border-purple-800 shadow-lg transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h2 className="text-3xl font-bold text-purple-900 mt-4">
            Hi, {user.userName} 👋
          </h2>
          <p className="text-gray-500 text-sm mt-2">Welcome back to MoraSpirit11!</p>
        </div>

        {/* Right Section - User Info Grid */}
        <div className="flex-1 p-6 mt-2 md:mt-0">
          <h3 className="text-2xl font-semibold text-gray-700">User Information</h3>
          <hr className="my-4 border-gray-300" />

          {/* Grid Layout for Username, Email, Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h4 className="font-semibold text-purple-900">Username</h4>
              <p className="text-gray-600">{user.userName}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h4 className="font-semibold text-purple-900">Email</h4>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h4 className="font-semibold text-purple-900">Contact</h4>
              <p className="text-gray-600">{user.contact}</p>
            </div>
          </div>

          {/* Initial Budget Below Grid */}
          <div className="mt-6 p-6 bg-purple-800 text-white rounded-xl shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">Your Initial Budget 💸</h4>
              <p className="text-2xl font-bold mt-1">$ 9,000,000</p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
      </div>
    </section>
  );
}
