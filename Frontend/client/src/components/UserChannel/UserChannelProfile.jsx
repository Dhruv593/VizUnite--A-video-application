import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchUserChannelProfile } from "../../api/api";

function UserChannelProfile() {
  const { username } = useParams();
  const { user } = useAuth();
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    console.log("Thumbnail clicked", video);
  };

  return (
    <div className="channel-profile bg-slate-200 h-screen ml-60">
      <img
        src={channelData.coverImage}
        alt="Cover"
        className="cover-image w-full h-48 object-cover"
      />
      <div className="profile-details flex items-center justify-start border-b-2  px-6 py-4 bg-white rounded-2xl m-6 shadow-lg">
        <img
          src={channelData.avatar}
          alt="Avatar"
          className="avatar w-24 h-24 rounded-full border-2 border-orange-500 p-1"
        />
        <div className="ml-4 flex flex-col w-1/2">
          <h1 className="text-3xl font-semibold">{channelData.fullName}</h1>
          <h2 className="text-lg text-gray-400">@{channelData.username}</h2>
          <div className="flex font-semibold">
            <p className="mr-5">Subscribers: {channelData.subscribersCount}</p>
            <p>Subscribed to: {channelData.channelsSubscribeToCount}</p>
          </div>
        </div>

        <div className="flex justify-end w-1/2">
          {channelData.isSubscribed ? (
            <button className="bg-gray-200 text-black px-3 py-2 rounded-full">Subscribed</button>
          ) : (
            <button className="bg-red-500 text-white px-3 py-2 rounded-full">Subscribe</button>
          )}
        </div>
      </div>
      <div className="videos">
        {channelData.uploadedVideos.map((video) => (
          <div
            key={video._id}
            className="relative bg-slate-100 p-1/5 rounded-lg shadow-lg"
          >
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
              <h2 className="text-lg font-bold mt-2 text-black">
                {video.title}
              </h2>
              {/* <p className="text-gray-400 mt-1">{video.description}</p> */}
              <p className="text-gray-500 text-sm mt-1">
                {new Date(video.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm mt-1">{video.views} Views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserChannelProfile;
