import React from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white text-black p-2 flex justify-between items-center sticky top-0 z-50 border-b-2 border-black px-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-2xl  text-black p-1">VizUnite</span>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <input
              type="text"
              placeholder="Search"
              className="w-80 bg-slate-200 text-black px-4 py-2 rounded-full mr-4"
            />

            <Link to='/profile' className="flex shadow rounded-full overflow-hidden mr-2 bg-blue-600 hover:bg-blue-700 p-1">
              <img
                src={user.avatar}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-orange-500 shrink-0"
              />

              
                <button className=" text-white pr-4 pl-2 rounded-3xl w-full">
                  Profile
                </button>
              
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-3xl"
            >
              Logout
            </button>
          </>
        ) : (
          <input
            type="text"
            placeholder="Search"
            className="w-80 bg-slate-200 text-black px-4 py-2 rounded-full mr-4"
          />
        )}

        {/* <button className="bg-purple-600 px-4 py-2 rounded mr-2">Log in</button>
        <button className="bg-purple-600 px-4 py-2 rounded">Sign up</button> */}
      </div>
    </nav>
  );
};

export default Header;
