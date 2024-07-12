import React, {useState} from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import uploadIcon from '../../assets/video-upload-fill.png'
import UploadVideoModal from "../Modals/UploadVideoModal";
import { FaCaretDown } from 'react-icons/fa'

const Header = () => {
  const { user, logout } = useAuth();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeDropdown();
  };



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

            <button onClick={() => setIsUploadModalOpen(true)} className="flex justify-center items-center shadow rounded-full overflow-hidden mr-2 bg-green-600 hover:bg-green-700 p-1">
              <img
                src={uploadIcon}
                alt=""
                className="w-8 h-8 p-1 mx-2 shrink-0"
              />

              
                <div className=" text-white pr-4 rounded-3xl w-full">
                  Upload
                </div>
                
              
            </button>
            {/* <Link to={`/profile/${user.username}/profile`} className="flex shadow rounded-full overflow-hidden mr-2 bg-blue-600 hover:bg-blue-700 p-1">
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
            </button> */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center shadow rounded-full overflow-hidden bg-blue-600 hover:bg-blue-700 p-1"
              >
                <img
                  src={user.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-white shrink-0"
                />
                <FaCaretDown className="text-white mx-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-1">
                  <Link
                    to={`/profile/${user.username}/profile`}
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
      <UploadVideoModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </nav>
  );
};

export default Header;
