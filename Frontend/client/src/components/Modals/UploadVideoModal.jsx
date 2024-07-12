import React, { useState, useEffect } from "react";
import { uploadVideo } from "../../api/api";
import { AiOutlineClose } from "react-icons/ai";

function UploadVideoModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
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

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");
    setShowAlert(false);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnailFile", thumbnailFile);

    try {
      await uploadVideo(formData);
      setSuccessMessage("Video Uploaded Successfully");
      setShowAlert(true);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="w-2/5 bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
        {showAlert && (
          <div className="bg-green-500 text-white px-4 py-2 absolute top-0 left-0 right-0 text-center">
            {successMessage}
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Video</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-gray-700" size={24} />
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Video File</label>
            <input
              type="file"
              onChange={handleVideoFileChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              accept="video/*"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Thumbnail File</label>
            <input
              type="file"
              onChange={handleThumbnailFileChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              accept="image/*"
              required
            />
          </div>
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
                  Uploading...
                </div>
              ) : (
                "Upload"
              )}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideoModal;
