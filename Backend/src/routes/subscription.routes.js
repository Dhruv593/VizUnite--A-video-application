import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller.js";

const router = Router()

router.use(verifyJWT)

router.route('/subscriber/:channelId').post(toggleSubscription)
router.route('/subscribers/:channelId').get(getUserChannelSubscribers)
router.route('/subscription/:subscriberId').get(getSubscribedChannels)

export default router