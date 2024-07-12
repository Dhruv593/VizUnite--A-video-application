import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-60 h-screen fixed left-0 top-0 py-20 flex flex-col border-r-2 border-gray-300 shadow-xl p-4">
          <Link
            to="/"
            className="px-4 py-2 text-lg font-semibold bg-white text-black rounded-full my-2 shadow-md hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to="/liked-videos"
            className="px-4 py-2 text-lg font-semibold bg-white text-black rounded-full my-2 shadow-md hover:bg-gray-200"
          >
            Liked Videos
          </Link>
          <Link
            to="/history"
            className="px-4 py-2 text-lg font-semibold bg-white text-black rounded-full my-2 shadow-md hover:bg-gray-200"
          >
            History
          </Link>
          <Link
            to={`/profile/${user.username}/videos`}
            className="px-4 py-2 text-lg font-semibold bg-white text-black rounded-full my-2 shadow-md hover:bg-gray-200"
          >
            My Content
          </Link>
          <Link
            to="/collections"
            className="px-4 py-2 text-lg font-semibold bg-white text-black rounded-full my-2 shadow-md hover:bg-gray-200"
          >
            Playlist
          </Link>
          <Link
            to="/subscribers"
            className="px-4 py-2 text-lg font-semibold bg-white text-black rounded-full my-2 shadow-md hover:bg-gray-200"
          >
            Tweets
          </Link>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default Sidebar;
