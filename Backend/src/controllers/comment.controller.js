import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: -1 },
  };

  try {
    const aggregateQuery = Comment.aggregate([
      {
        $match: {
          video: new mongoose.Types.ObjectId(videoId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
        },
      },
      { $unwind: "$ownerDetails" },
      {
        $project: {
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          "ownerDetails.username": 1,
          "ownerDetails.avatar": 1,
        },
      },
    ]);

    const comments = await Comment.aggregatePaginate(aggregateQuery, options);

    return res
      .status(200)
      .json(
        new ApiResponse(200, comments, "Comments fetched successfully")
      );
  } catch (error) {
      throw new ApiError(500, error?.message || "Cannot fetch comments")
  }
  
});

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body
  const { videoId } = req.params;

  if (!content?.trim()) {

    throw new ApiError(400, "Content is required")
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID")
  }

  try {
    const comment = await Comment.create({
      content,
      video: videoId,
      owner: req.user._id
    })

    return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"))

  } catch (error) {
    throw new ApiError(500, error?.message || "Cannot add comment")
  }
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const { content } = req.body

  if (!content?.trim()) {
    throw new  ApiError(400, "Content is required")
  }

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment ID")
  }

  try {
    const comment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
        owner: req.user._id
      },
      { 
        content 
      },
      {
        new: true
      }
    )

    if (!comment) {
      throw new ApiError(404, "Comment not found or you're not authorized to update it")
    }

    return res
    .status(200)
    .json(
      new ApiResponse(200, comment, "Comment Updated Succesfully")
    )

  } catch (error) {
    throw new ApiError(500, error?.message || "Cannot update comment")
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID")
  }

  try {
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      owner: req.user._id
    })

    if (!comment) {
      throw new ApiError(404, "Comment not found or you're not authorized to delete it")
    }

    return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Comment deleted successfully")
    )

  } catch (error) {
    throw new ApiError(500, error?.message || "Cannot delete comment")
  }
});

export { getVideoComments, addComment, updateComment, deleteComment };
