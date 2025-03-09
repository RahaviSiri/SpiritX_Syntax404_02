import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets.js";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { backendURL, setUToken, uToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + "/api/user/register", {
          name,
          userName,
          password,
        });
        if (data.success) {
          localStorage.setItem("uToken", data.token);
          setUToken(data.token);
          navigate("/");
          setName("");
          setUserName("");
          setPassword("");
        } else {
          toast.error(data.message);
          setName("");
          setUserName("");
          setPassword("");
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/user/login", {
          userName,
          password,
        });
        if (data.success) {
          localStorage.setItem("uToken", data.token);
          setUToken(data.token);
          navigate("/");
          setUserName("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center my-12 min-h-[80vh]"
      style={{
        backgroundImage: `url(${assets.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
      }}
    >
      {state === "Sign Up" ? (
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
          <p className="text-3xl font-semibold text-center text-gray-800 mb-4">Create Account</p>
          <p className="text-lg text-center text-gray-600 mb-6">Please sign up to get players</p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="userName" className="text-sm font-medium text-gray-700">Your Username</label>
                <input
                  id="userName"
                  type="text"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-purple-500 transition duration-300"
            >
              Create Account
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-purple-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
          <p className="text-3xl font-semibold text-center text-gray-800 mb-4">Login</p>
          <p className="text-lg text-center text-gray-600 mb-6">Please login to get players</p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="userName" className="text-sm font-medium text-gray-700">Enter Username</label>
                <input
                  id="userName"
                  type="text"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-purple-500 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-purple-600 cursor-pointer hover:underline"
            >
              SignUp here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
