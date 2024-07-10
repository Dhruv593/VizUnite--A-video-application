import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";

const router = Router();
// router.use(verifyJWT);

router.route("/upload").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  publishAVideo
);

router.route("/all-videos").get(verifyJWT, getAllVideos);
router.route("/get-video/:videoId").get(verifyJWT, getVideoById);
router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus);
router.route("/update/:videoId").patch(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  updateVideo
);
router.route("/delete/:videoId").delete(verifyJWT, deleteVideo);

export default router;
