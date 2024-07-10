import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";

const router = Router()

router.use(verifyJWT)

router.route('/create-playlist').post(createPlaylist)
router.route('/user/:userId').get(getUserPlaylists)
router.route('/:playlistId').get(getPlaylistById)
router.route('/:playlistId/videos/:videoId').post(addVideoToPlaylist)
router.route('/:playlistId/videos/:videoId').delete(removeVideoFromPlaylist)
router.route('/:playlistId').delete(deletePlaylist)
router.route('/update/:playlistId').patch(updatePlaylist)
export default router