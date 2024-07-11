import React, { useEffect, useState } from "react";
import { fetchAllVideos } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Videocard from "../Videocard";

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const loadVideos = async () => {
        try {
          const response = await fetchAllVideos({ page: 1, limit: 10 });
          setVideos(response);
          setLoading(false);
          console.log("Videos fetched successfully");
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      loadVideos();
    }
  }, [user, navigate]);

  const handleThumbnailClick = (video) => {
    setSelectedVideo(video);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Videos</h1> */}
      {selectedVideo ? (
        <div className="h-screen">
          <button 
            onClick={() => setSelectedVideo(null)} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-3xl"
          >
            Go Back
          </button>
          <video controls width="100%" src={selectedVideo.videoFile} className="mt-4 rounded-2xl" autoPlay></video>
          <h2 className="text-black text-xl font-bold">{selectedVideo.title}</h2>
          <p className="text-black mt-1">{selectedVideo.description}</p>
          <p className="text-black text-sm mt-1">{selectedVideo.views} Views</p>
          <p className="text-black text-sm mt-1">{new Date(selectedVideo.createdAt).toLocaleString()}</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(videos) &&
            videos.map((video) => (
              <Videocard
                  key={video._id}
                  video={video}
                  handleThumbnailClick={handleThumbnailClick}
                  formatDuration={formatDuration}
                />
            ))}
        </div>
      )}
    </div>
  );
}

export default VideoList;


