import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-200 h-screen ml-60">
      <div>
        {user ? (
          <>
            {/* Banner with cover image */}
            <img
              src={user.coverImage}
              alt=""
              className="w-full h-48 object-cover"
            />

            {/* User information section */}
            <div className="flex items-center justify-between border-b-2  px-6 py-4 bg-white rounded-2xl m-6 shadow-lg">
              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full border-2 border-orange-500 p-1"
              />

              {/* User details */}
              <div className="ml-4 flex-1">
                <h1 className="text-3xl font-semibold">{user.fullName}</h1>
                <h1 className="text-lg text-gray-400">@{user.username}</h1>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-4">
                <Link to={`/c/${user.username}`}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none ">
                    View Channel
                  </button>
                </Link>
                <Link to="">
                  <button className="bg-green-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none ">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>

            {/* Additional user details */}
            <div className="px-6 py-2">
              <h1 className="text-xl font-semibold mb-2 text-black">
                User Details
              </h1>
              <div className="bg-white text-black shadow-lg rounded-lg p-4">
                <p className="text-lg">Full Name: {user.fullName}</p>
                <p className="text-lg">Username: {user.username}</p>
                <p className="text-lg">Email: {user.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Account since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-5">
                <Link to="">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none mr-4">
                    Update Password
                  </button>
                </Link>
                <Link to="">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none mr-4">
                    Update Avatar
                  </button>
                </Link>
                <Link to="">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none ">
                    Update Cover Image
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
          <p className="py-4 text-center">Login or Register to see user profile</p>
          <div className="flex justify-center items-center gap-2 w-5/5">
              <Link
                to="/login"
                className="bg-blue-600 text-white py-2 px-4 rounded-3xl hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
              Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white py-2 px-4 rounded-3xl hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
