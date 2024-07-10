import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const RegistrationForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("avatar", formData.avatar); // Append avatar file
      formDataToSend.append("coverImage", formData.coverImage); // Append cover image file

      const response = await register(formDataToSend);
      console.log("Registration successful:", response);
      // Handle successful registration, redirect, show success message, etc.
    } catch (error) {
      console.error("Registration error:", error.message);
      // Handle registration error, show error message, etc.
    }
  };

  return (
    <div className="bg-slate-200 text-white flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="" className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="mt-1 block w-full px-3 py-2 
                    border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-transparent text-gray-700"
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="mt-1 block w-full px-3 py-2 
                    border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-transparent text-gray-700"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 
                    border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-transparent text-gray-700"
              required
            />
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full px-3 py-2 
                    border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-transparent text-gray-700"
            />
          </div>
          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700"
            >
              Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full px-3 py-2 
                    border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-transparent text-gray-700"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md 
                hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            &nbsp; Login
          </a>
        </p>
      </div>
    </div>
    // <div>
    //   <h2>Registration</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       name="fullName"
    //       value={formData.fullName}
    //       onChange={handleChange}
    //       placeholder="Full Name"
    //       required
    //     />
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       placeholder="Email"
    //       required
    //     />
    //     <input
    //       type="text"
    //       name="username"
    //       value={formData.username}
    //       onChange={handleChange}
    //       placeholder="Username"
    //       required
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       placeholder="Password"
    //       required
    //     />
    //     <input type="file" name="avatar" onChange={handleChange} accept="image/*" required />
    //     <input type="file" name="coverImage" onChange={handleChange} accept="image/*" />
    //     <button type="submit">Register</button>
    //   </form>
    // </div>
  );
};

export default RegistrationForm;
