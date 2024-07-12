import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const LoginForm = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      console.log("Login successful:", response);
      // Handle successful login, redirect, show success message, etc.
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle login error, show error message, etc.
    }
  };

  return (
    <div className="bg-slate-200 text-white flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
      <div className="flex justify-center mb-2">
          <img src={logo} alt="" className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="e.g. xyz@gmail.com"
              className="mt-1 block w-full px-3 py-2 
                    border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-transparent text-gray-700"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 
                    border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-transparent text-gray-700"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md 
                hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            &nbsp; Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
