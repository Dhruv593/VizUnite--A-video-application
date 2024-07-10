import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const channelObjectId = new mongoose.Types.ObjectId(channelId);

    const totalVideos = await Video.countDocuments({ owner: channelObjectId });
    const totalSubscribers = await Subscription.countDocuments({ channel: channelObjectId });
    const videos = await Video.find({ owner: channelObjectId });
    
    const videoIds = videos.map(video => video._id);
    const totalLikes = await Like.countDocuments({ video: { $in: videoIds } });

    
    const totalViews = videos.reduce((sum, video) => {
        // console.log(`Video: ${video.title}, Views: ${video.views}`);
        return sum + video.views;
    }, 0);

    const stats = {
        totalVideos,
        totalSubscribers,
        totalLikes,
        totalViews
    };

    return res.status(200).json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const channelObjectId = new mongoose.Types.ObjectId(channelId);

    const videos = await Video.find({ owner: channelObjectId });

    return res.status(200).json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export {
    getChannelStats,
    getChannelVideos
};
