import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const userId = req.user._id

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }
    const subscription = await Subscription.findOne({
        subscriber: userId,
        channel: channelId
    })

    if (subscription) {
        await subscription.deleteOne()
        return res
        .status(200)
        .json(new ApiResponse(200, "Subscription deleted successfully"))
    } else {
        await Subscription.create({
            subscriber: userId,
            channel: channelId
        })
        return res
        .status(200)
        .json(new ApiResponse(200, "Subscribed to channel"))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    const subscribers = await Subscription.find({
        channel: channelId
    }).populate('subscriber', 'name')

    return res
    .status(200)
    .json(new ApiResponse(200, subscribers, "Subscribers fetched successfully"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    const userId = req.user._id

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const subscriptions = await Subscription.find({
        subscriber: subscriberId
    }).populate('channel', 'fullName')

    return res
    .status(200)
    .json(new ApiResponse(200, subscriptions.map(sub => sub.channel), "Subscribed channels fetched successfully"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}