import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controller.js";

const router = Router()

router.use(verifyJWT)

router.route('/add-comment/:videoId').post(addComment)
router.route('/get-video-comments/:videoId').get(getVideoComments)
router.route('/update-comment/:commentId').patch(updateComment)
router.route('/delete-comment/:commentId').delete(deleteComment)

export default router