import React, { useState } from "react";

const Videocard = ({ video, handleThumbnailClick, formatDuration }) => {
  const handleClick = () => {
    handleThumbnailClick(video); // Pass the video object to the parent component
    setSelectedVideo(video); // Set the selected video in the parent component's state
  };

  return (
    <div className="relative bg-slate-100 p-1/5 rounded-lg shadow-lg">
      <img
        src={video.thumbnailFile}
        alt={video.title}
        className="w-full h-48 object-cover rounded cursor-pointer"
        onClick={handleClick} // Call handleClick on thumbnail click
      />
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        {formatDuration(video.duration)}
      </div>
      <div className="px-2">
        <h2 className="text-lg font-bold mt-2 text-black">{video.title}</h2>
        <p className="text-gray-500 text-sm mt-1">
          {new Date(video.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-500 text-sm mt-1">{video.views} Views</p>
      </div>
    </div>
  );
};

export default Videocard;
