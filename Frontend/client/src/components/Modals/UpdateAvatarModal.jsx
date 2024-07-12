import React, { useState, useEffect } from "react";
import { updateAvatarImage } from "../../api/api";
import { AiOutlineClose } from "react-icons/ai";

function UpdateAvatarModal({ isOpen, onClose }) {
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeout;
    if (showAlert) {
      timeout = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showAlert]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
    setAvatarPreview(URL.createObjectURL(file));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");
    setShowAlert(false);

    const formData = new FormData()
    formData.append('avatar', avatarImage)

    try {
      await updateAvatarImage(formData);
      setSuccessMessage("Avatar Image Updated successfully!");
      setShowAlert(true);
      onClose()
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg">
        {showAlert && (
          <div className="bg-green-500 text-white px-4 py-2 absolute top-0 left-0 right-0 text-center">
            {successMessage}
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Avatar</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-gray-700" size={24} />
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700">Avatar</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              accept="image/*"
              required
            />
          </div>
          {avatarPreview && (
            <div className="mb-4">
              <img src={avatarPreview} alt="Avatar Preview" className="w-full h-auto rounded" />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default UpdateAvatarModal;
