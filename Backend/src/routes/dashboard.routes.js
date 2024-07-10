import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js";

const router = Router()
router.use(verifyJWT)

router.route('/stats/:channelId').get(getChannelStats)
router.route('/videos/:channelId').get(getChannelVideos)


export default router