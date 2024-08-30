import express from 'express';
import { signup, login, logout, getMe, update } from '../controllers/Auth.controllers.js';
import { protectRoute } from '../middleware/protectRoute.js';


// Use the imported functions as needed

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update', update);


export default router;