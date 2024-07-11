import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchUserChannelProfile } from "../../api/api";
import VideoList from "../VideoList/VideoList";
import Videocard from "../Videocard";

function UserChannelProfile() {
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
    <div className="channel-profile bg-slate-200 ml-60">
      <img
        src={channelData.coverImage}
        alt="Cover"
        className="cover-image w-full h-48 object-cover"
      />
      <div className="container mx-auto p-2">
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
            <button className="bg-gray-200 text-black px-3 py-2 rounded-full">
              Subscribed
            </button>
          ) : (
            <button className="bg-red-500 text-white px-3 py-2 rounded-full">
              Subscribe
            </button>
          )}
        </div>
      </div>


      <div className="profile-details flex items-center justify-center border-b-2 p-2 bg-white rounded-2xl m-6 shadow-lg">
        <button className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-xl mr-2">
          Videos
        </button>
        <button className="w-1/3 bg-green-500 hover:bg-green-600 text-white py-1 rounded-xl mx-1">
          Tweets
        </button>
        <button className="w-1/3 bg-red-500 hover:bg-red-600 text-white py-1 rounded-xl ml-2">
          Playlists
        </button>
      </div>

        { selectedVideo ? (
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
          <div className="videos grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
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
    </div>
  );
}

export default UserChannelProfile;
