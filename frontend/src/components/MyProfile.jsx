import React from "react";

export default function PersonalProfile() {
  const user = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    contact: "+1234567890",
    initialBudget: "$500,000",
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row p-8 transition-all duration-500 hover:shadow-2xl">

        {/* Left Section - Profile Picture & Greeting */}
        <div className="flex flex-col items-center text-center md:w-1/3 mb-6 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="User Avatar"
            className="w-40 h-40 rounded-full border-4 border-purple-500 shadow-lg transition-transform duration-300 hover:scale-105 mt-8" // Increased size and margin
          />
          <h2 className="text-2xl font-bold text-purple-700 mt-4">
            Hi, {user.username} 👋
          </h2>
        </div>

        {/* Right Section - User Info Grid */}
        <div className="flex-1 p-6 mt-2 md:mt-0">
          <h3 className="text-xl font-semibold text-gray-700">User Information</h3>
          <hr className="my-4 border-gray-300" />

          {/* Grid Layout for Username, Email, Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold">Username</h4>
              <p className="text-gray-500">{user.username}</p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div>
              <h4 className="font-semibold">Contact</h4>
              <p className="text-gray-500">{user.contact}</p>
            </div>
          </div>

          {/* Initial Budget Below Grid */}
          <div className="mt-6 p-4 bg-purple-100 text-purple-700 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold">Your Initial Budget 💸</h4>
            <p className="text-xl font-bold">{user.initialBudget}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
