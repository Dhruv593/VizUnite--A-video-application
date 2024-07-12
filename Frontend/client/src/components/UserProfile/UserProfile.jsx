import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import ChangePassword from "../Modals/ChangePassword";
import UpdateAccountDetailsModal from "../Modals/UpdateAccountDetailsModal";
import UpdateAvatarModal from "../Modals/UpdateAvatarModal";
import UpdateCoverImageModal from "../Modals/UpdateCoverImageModal";
function UserProfile() {
  const { user } = useAuth();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isUpdateAccountDetailsModalOpen, setIsUpdateAccountDetailsModalOpen] =
    useState(false);
  const [isUpdateAvatarModalOpen, setIsUpdateAvatarModalOpen] = useState(false);
  const [isUpdateCoverImageModalOpen, setIsUpdateCoverImageModalOpen] = useState(false)

  return (
    <div className="bg-slate-200">
      <div className="px-2">
        <h1 className="text-xl font-semibold my-3 text-black">User Details</h1>
        <div className="bg-white text-black shadow-lg rounded-lg p-4">
          <p className="text-lg">Full Name: {user.fullName}</p>
          <p className="text-lg">Username: {user.username}</p>
          <p className="text-lg">Email: {user.email}</p>
          <p className="text-sm text-gray-500 mt-2">
            Account since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-5">
          <button
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none mr-4"
          >
            Update Password
          </button>

          <button
            onClick={() => setIsUpdateAvatarModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none mr-4"
          >
            Update Avatar
          </button>

          <button onClick={() => setIsUpdateCoverImageModalOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none mr-4">
            Update Cover Image
          </button>
          <button
            onClick={() => setIsUpdateAccountDetailsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            Edit Details
          </button>
        </div>
        <ChangePassword
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
        <UpdateAccountDetailsModal
          isOpen={isUpdateAccountDetailsModalOpen}
          onClose={() => setIsUpdateAccountDetailsModalOpen(false)}
        />
        <UpdateAvatarModal
          isOpen={isUpdateAvatarModalOpen}
          onClose={() => setIsUpdateAvatarModalOpen(false)}
        />
        <UpdateCoverImageModal isOpen={isUpdateCoverImageModalOpen} onClose={() => setIsUpdateCoverImageModalOpen(false)}/>
      </div>
    </div>
  );
}

export default UserProfile;
