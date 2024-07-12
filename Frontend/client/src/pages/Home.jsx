import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import VideoList from "../components/VideoList/VideoList";

function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="bg-slate-200 text-white">
      {user ? (
        <>
          <div className="ml-60">
            <VideoList />
          </div>
        </>
      ) : (
        <div>
          <div className="h-screen flex flex-col justify-center items-center bg-slate-200 text-black">
            <h1 className="text-4xl font-semibold  text-center">
              Welcome to VizUnite!
            </h1>
            <p className="text-black mb-5 bg-white p-2 rounded-3xl">Discover. Create. Share.</p>
            <p className="text-md mb-4">
            "Join our community to watch amazing videos and share your own creations."
            </p>
            <p className="text-xl font-semibold mb-4 text-center">Sign up now to start exploring and uploading, <br />
            Log in to dive into the action!</p>
            <div className="flex justify-between items-center gap-2 w-5/5">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
