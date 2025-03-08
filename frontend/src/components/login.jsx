import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
          phone,
        });
        if (data.success) {
          localStorage.setItem("uToken", data.token);
          setUToken(data.token);
          navigate("/");
          setName("");
          setUserName("");
          setPassword("");
          setPhone("");
        } else {
          toast.error(data.message);
          setName("");
          setUserName("");
          setPassword("");
          setPhone("");
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
    <div className="flex items-center justify-center my-12 min-h-[80vh]">
      {state === "Sign Up" ? (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg ">
          <p className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Create Account
          </p>
          <p className="text-sm text-center text-gray-600 mb-6">
            Please sign up get players
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Your Username
                </label>
                <input
                  id="userName"
                  type="text"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tell"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-purple-300 transition duration-300"
            >
              Create Account
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-purple-500 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <p className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Login
          </p>
          <p className="text-sm text-center text-gray-600 mb-6">
            Please login to get players
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Enter Username
                </label>
                <input
                  id="userName"
                  type="text"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-800 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-primary-dark transition duration-300"
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
