import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-slate-300 text-black w-60 h-screen fixed left-0 top-0 py-20 flex flex-col -z-10 border-r-2 border-black">
      <NavLink to="/" className="px-4 py-2 text-md font-semibold bg-white rounded-full my-1 mx-3 shadow-md">Home</NavLink>
      <NavLink to="/liked-videos" className="px-4 py-2 text-md font-semibold bg-white rounded-full my-1 mx-3 shadow-md">Liked Videos</NavLink>
      <NavLink to="/history" className="px-4 py-2 text-md font-semibold bg-white rounded-full my-1 mx-3 shadow-md">History</NavLink>
      <NavLink to="/my-content" className="px-4 py-2 text-md font-semibold bg-white rounded-full my-1 mx-3 shadow-md">My Content</NavLink>
      <NavLink to="/collections" className="px-4 py-2 text-md font-semibold bg-white rounded-full my-1 mx-3 shadow-md">Playlist</NavLink>
      <NavLink to="/subscribers" className="px-4 py-2 text-md font-semibold bg-white rounded-full my-1 mx-3 shadow-md">Tweets</NavLink>
      {/* <div className="mt-auto">
        <NavLink to="/support" className="px-4 py-2 hover:bg-gray-700">Support</NavLink>
        <NavLink to="/settings" className="px-4 py-2 hover:bg-gray-700">Settings</NavLink>
      </div> */}
    </div>
  );
};

export default Sidebar;
