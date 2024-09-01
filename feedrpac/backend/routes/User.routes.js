import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { followUnfollowUser, getProfileByUsername, getSuggestedProfiles, updateUserProfile, getUserSidebar } from '../controllers/User.controllers.js';

const router = express.Router();

router.get("/", protectRoute, getUserSidebar)
router.get("/profiles/:username", protectRoute, getProfileByUsername)
router.get("/suggested", protectRoute, getSuggestedProfiles)
router.post("/follow/:id", protectRoute, followUnfollowUser)
router.post("/update", protectRoute, updateUserProfile)


export default router;
