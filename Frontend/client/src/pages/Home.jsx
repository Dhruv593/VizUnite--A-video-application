import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import VideoList from "../components/VideoList/VideoList";

function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="bg-slate-300 text-white ml-60">
      {/* <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg text-center"> */}
        {user ? (
          <>
            <VideoList />
            {/* <p className="text-xl mb-4">Hi, {user.fullName}</p> */}
            {/* <Link to="/all-videos">
              <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mb-2'>
                All Videos
              </button>
            </Link> */}

            {/* <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
            >
              Logout
            </button> */}
          </>
        ) : (
          <div className="h-screen flex flex-col justify-center items-center bg-slate-300 text-black">
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
        )}
      {/* </div> */}
    </div>
    // <div>
    //   <h1>Home</h1>
    //   {user ? (
    //     <>
    //       <p>Hi, {user.fullName}</p>
    //       <button onClick={logout}>Logout</button>
    //     </>
    //   ):(
    //     <>
    //     <p>Please login or register.</p>
    //     <Link to="/login" className="text-[#ae7aff] hover:underline">Login here</Link>
    //     <Link to="/register" className="text-[#ae7aff] hover:underline">Register</Link>
    //     </>
    //   )}
    // </div>
  );
}

export default Home;
