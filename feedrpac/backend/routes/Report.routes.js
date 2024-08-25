import express from 'express';
import { CreateReport, GetReport } from '../controllers/Report.controllers.js';

// Use the imported functions as needed

const router = express.Router();

router.get('', GetReport);
router.post('', CreateReport);

export default router;