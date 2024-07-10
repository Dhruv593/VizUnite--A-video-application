import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user._id

    if (!isValidObjectId) {
        throw new ApiError(400, "Invalid video ID")
    }

    const like = await Like.findOne({
        video: videoId,
        likedBy: userId
    })

    if (like) {
        await like.deleteOne({_id: like._id})
        return res
        .status(200)
        .json(new ApiResponse(200, null, "Video like removed successfully"))
    } else {
        await Like.create({
            video: videoId,
            likedBy: userId
        })

        return res
        .status(200)
        .json(new ApiResponse(200, "Video like added successfully"))
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const userId = req.user._id

    if (!isValidObjectId) {
        throw new ApiError(400, "Invalid comment ID")
    }

    const like = await Like.findOne({ comment: commentId, likedBy: userId });

    if (like) {
        await like.deleteOne({ _id: like._id })
        return res
        .status(200)
        .json(new ApiResponse(200, null, 'Comment like removed'));
    } else {
        await Like.create({ comment: commentId, likedBy: userId })

        return res
        .status(201)
        .json(new ApiResponse(201, 'Comment liked'));
    } 

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const userId = req.user._id

    if (!isValidObjectId) {
        throw new ApiError(400, "Invalid comment ID")
    }

    const like = await Like.findOne({ tweet: tweetId, likedBy: userId });

    if (like) {
        await like.deleteOne({_id: like._id});
        return res
        .status(200)
        .json(new ApiResponse(200, null, 'Tweet like removed'));
    } else {
        await Like.create({ tweet: tweetId, likedBy: userId });
        return res
        .status(201)
        .json(new ApiResponse(201, 'Tweet liked'));
    }

})

const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const likes = await Like.find({likedBy: userId, video: {
        $exists: true
    }}).populate('video')

    const likedVideos = likes.map(like => like.video)

    return res
    .status(200)
    .json(new ApiResponse(200, likedVideos, 'Liked videos'))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}