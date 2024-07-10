import React, { useEffect, useState } from "react";
import { fetchAllVideos } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
        <div>
          <button 
            onClick={() => setSelectedVideo(null)} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-3xl"
          >
            Go Back
          </button>
          <video controls width="100%" src={selectedVideo.videoFile} className="mt-4" autoPlay></video>
          <h2 className="text-black text-xl font-bold">{selectedVideo.title}</h2>
          <p className="text-black mt-1">{selectedVideo.description}</p>
          <p className="text-black text-sm mt-1">{selectedVideo.views} Views</p>
          <p className="text-black text-sm mt-1">{new Date(selectedVideo.createdAt).toLocaleString()}</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(videos) &&
            videos.map((video) => (
              <div key={video._id} className="relative bg-gray-200 p-1/5 rounded-lg shadow-lg">
                <img 
                  src={video.thumbnailFile} 
                  alt={video.title} 
                  className="w-full h-48 object-cover rounded cursor-pointer"
                  onClick={() => handleThumbnailClick(video)}
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
                <div className="px-2">
                <h2 className="text-lg font-bold mt-2 text-black">{video.title}</h2>
                {/* <p className="text-gray-400 mt-1">{video.description}</p> */}
                <p className="text-gray-500 text-sm mt-1">{new Date(video.createdAt).toLocaleString()}</p>
                <p className="text-gray-500 text-sm mt-1">{video.views} Views</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
    // <div className="-z-10">
    //   <h1>Videos</h1>
    //   {selectedVideo ? (
    //     <div>
    //       <h2>{selectedVideo.title}</h2>
    //       <video controls width="100%" src={selectedVideo.videoFile}></video>
    //       <button onClick={() => setSelectedVideo(null)}>Close</button>
    //     </div>
    //   ) : (
    //     <ul>
    //       {Array.isArray(videos) &&
    //         videos.map((video) => (
    //           <li key={video._id}>
    //             <h2>{video.title}</h2>
    //             <p>{video.description}</p>
    //             <img 
    //             src={video.thumbnailFile} 
    //             alt={video.title}
    //             style={{cursor: 'pointer'}}
    //             onClick={() => handleThumbnailClick(video)} />
    //           </li>
    //         ))}
    //     </ul>
    //   )}
    // </div>
  );
}

export default VideoList;
