import mongoose, {isValidObjectId} from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import paginate from "mongoose-aggregate-paginate-v2";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc",  userId } = req.query

    const filter = {}

    if (query) {
        filter.title = new RegExp(query, "i")
    }
    if (userId) {
        filter.userId = userId
    }

    const sort = { [sortBy]: sortType === "asc" ? 1 : -1 };

    const options = { 
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort
    }

    try {
        
        const aggregate = Video.aggregate([{ $match: filter }, { $sort: sort }]);
        const videos = await Video.aggregatePaginate(aggregate, options);

        return res
        .status(200)
        .json(new ApiResponse(videos, "Videos fetched successfully"))

    } catch (error) {
        throw new ApiError(500, error?.message || "can not fetch video")
    }
})

const publishAVideo = asyncHandler(async (req, res) => {

    const { title, description} = req.body
    const videoFile = req.files?.videoFile[0]
    const thumbnailFile = req.files?.thumbnailFile[0]

    if (!videoFile || !thumbnailFile) {
        throw new ApiError(400, "Video and thumbnail files are required");
    }

    try {
        
        const videoUpload = await uploadOnCloudinary(videoFile.path, videoFile.filename);
        const thumbnailUpload = await uploadOnCloudinary(thumbnailFile.path, thumbnailFile.filename);

        const video = await Video.create({
            title,
            description,
            videoFile: videoUpload.url,
            thumbnailFile: thumbnailUpload.url,
            duration: videoUpload.duration,
            owner: req.user._id
        })

        return res
        .status(201)
        .json(new ApiResponse(201, video, "Video published successfully"))

    } catch (error) {
        throw new ApiError(500, error?.message || "Error occured during publishing video")
    }
    
})

const getVideoById = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId).populate("owner", "fullName username avatar")

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    const update = req.body
    if(req.files){
        if (req.files.videoFile && req.files.videoFile.length > 0) {
            const { path: videoPath, filename: videoFilename } = req.files.videoFile[0];
            const videoUploadResult = await uploadOnCloudinary(videoPath, videoFilename);
      
            update.videoFile = videoUploadResult.url;
            update.duration = videoUploadResult.duration;
          }
      
          if (req.files.thumbnailFile && req.files.thumbnailFile.length > 0) {
            const { path: thumbnailPath, filename: thumbnailFilename } = req.files.thumbnailFile[0];
            const thumbnailUploadResult = await uploadOnCloudinary(thumbnailPath, thumbnailFilename);
      
            update.thumbnailFile = thumbnailUploadResult.url;
          }
    }

    const updatedVideo = await Video.findByIdAndUpdate(videoId, update, {new:true})
    
    return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    await Video.findByIdAndDelete(videoId)
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video Deleted Successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    video.isPublished = !video.isPublished
    await video.save()

    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video published status updated successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}