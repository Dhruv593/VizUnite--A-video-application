import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchUserChannelProfile } from "../../api/api";
import VideoList from "../VideoList/VideoList";
import Videocard from "../Videocard";

function UserVideo() {
  const { username } = useParams();
  const { user } = useAuth();
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const getChannelData = async () => {
      try {
        const data = await fetchUserChannelProfile(username);
        setChannelData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching channel data");
        setLoading(false);
      }
    };
    getChannelData();
  }, [username]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleThumbnailClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="channel-profile bg-slate-200">
        {selectedVideo ? (
          <div className="">
            <button
              onClick={() => setSelectedVideo(null)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-3xl"
            >
              Go Back
            </button>
            <video
              controls
              width="100%"
              src={selectedVideo.videoFile}
              className="mt-4 rounded-2xl"
              autoPlay
            ></video>
            <h2 className="text-black text-xl font-bold">
              {selectedVideo.title}
            </h2>
            <p className="text-black mt-1">{selectedVideo.description}</p>
            <p className="text-black text-sm mt-1">
              {selectedVideo.views} Views
            </p>
            <p className="text-black text-sm mt-1">
              {new Date(selectedVideo.createdAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="videos grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
            {channelData.uploadedVideos.map((video) => (
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

export default UserVideo;
