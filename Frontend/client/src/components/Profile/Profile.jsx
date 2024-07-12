import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchUserChannelProfile, toggleSubscription } from "../../api/api";
import { AiOutlineClose } from "react-icons/ai";


function Profile() {
  const { username } = useParams();
  const { user } = useAuth();
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);

  useEffect(() => {
    const getChannelData = async () => {
      try {
        const data = await fetchUserChannelProfile(username);
        setChannelData(data);
        setSubscriptionStatus(data.isSubscribed);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching channel data");
        setLoading(false);
      }
    };
    getChannelData();
  }, [username]);

  useEffect(() => {
    if (!location.pathname.includes("/profile") && user) {
      navigate(`/profile/${username}/profile`);
    }
  }, [location, navigate, username, user]);

  const handleToggleSubscription = async () => {
    if (subscribing) return;

    setSubscribing(true);
    try {
      await toggleSubscription(channelData._id);
      setSubscriptionStatus(!subscriptionStatus);
    } catch (error) {
      setError(error.message || "Error toggling subscription");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {user ? (
        <div className="channel-profile bg-slate-200 ml-60 p-3">
          <div className="relative">
            <img
              src={channelData.coverImage}
              alt="Cover"
              className="cover-image w-full h-52 object-cover rounded-3xl p-2"
            />
            <div className="relative">
              <div className="container mx-auto p-2 absolute left-0 right-0 -bottom-0 transform translate-y-1/2">
                <div className="profile-details flex items-center justify-start px-6 py-4 bg-white rounded-2xl mx-4 shadow-lg ">
                  <img
                    src={channelData.avatar}
                    alt="Avatar"
                    className="avatar w-24 h-24 rounded-full border-2 border-orange-500 p-1"
                  />
                  <div className="ml-4 flex flex-col w-1/2">
                    <h1 className="text-3xl font-semibold">
                      {channelData.fullName}
                    </h1>
                    <h2 className="text-lg text-gray-400">
                      @{channelData.username}
                    </h2>
                    <div className="flex font-semibold">
                      <p className="mr-5">
                        Subscribers: {channelData.subscribersCount}
                      </p>
                      <p>
                        Subscribed to: {channelData.channelsSubscribeToCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end w-1/2">
                    <button
                      onClick={handleToggleSubscription}
                      className={`${
                        subscriptionStatus
                          ? "bg-gray-200 text-black"
                          : "bg-red-500 text-white"
                      } px-3 py-2 rounded-full`}
                      disabled={subscribing}
                    >
                      {subscribing
                        ? "Processing..."
                        : subscriptionStatus
                        ? "Subscribed"
                        : "Subscribe"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-details flex items-center justify-center border-b-2 p-1 bg-white rounded-2xl mx-6 shadow-lg mt-20">
            <Link
              to={`/profile/${username}/profile`}
              className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl mr-1 text-center"
            >
              Profile
            </Link>
            <Link
              to={`/profile/${username}/videos`}
              className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl mx-1 text-center"
            >
              Videos
            </Link>
            <Link
              to={`/profile/${username}/playlists`}
              className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl ml-1 text-center"
            >
              Playlists
            </Link>
          </div>
          {/* <div className="profile-details flex items-center justify-center border-b-2 p-1 bg-white rounded-2xl mx-6 shadow-lg mt-24">
            <Link
              to={`/profile/${username}/profile`}
              className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-xl mr-2 text-center"
            >
              Profile
            </Link>
            <Link
              to={`/profile/${username}/videos`}
              className="w-1/3 bg-red-500 hover:bg-red-600 text-white py-1 rounded-xl mx-1 text-center"
            >
              Video
            </Link>
            <Link
              to={`/profile/${username}/playlists`}
              className="w-1/3 bg-green-500 hover:bg-green-600 text-white py-1 rounded-xl ml-2 text-center"
            >
              Playlist
            </Link>
          </div> */}

          <div className="content-container p-4">
            <Outlet />
          </div>
        </div>
      ) : (
        <>
          <p className="py-4 text-center">
            Login or Register to see user profile
          </p>
          <div className="flex justify-center items-center gap-2 w-5/5">
            <Link
              to="/login"
              className="bg-blue-600 text-white py-2 px-4 rounded-3xl hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white py-2 px-4 rounded-3xl hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
