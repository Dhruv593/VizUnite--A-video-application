import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { healthcheck } from "../controllers/healthcheck.contoller.js";

const router = Router()

router.route('/healthcheck').get(healthcheck)

export default router