import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router()

router.use(verifyJWT)

router.route('/videos/:videoId/like').put(toggleVideoLike)
router.route('/comments/:commentId/like').put(toggleCommentLike)
router.route('/tweets/:tweetId/like').put(toggleTweetLike)

router.route('/videos/liked').get(getLikedVideos)


export default router