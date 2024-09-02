import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createReport, getReport, addOrRemoveVolunteerFromReport } from '../controllers/Report.controllers.js';

// Use the imported functions as needed

const router = express.Router();

router.get('', getReport);
router.post('', createReport);
router.post('/:reportId/volunteer', protectRoute, addOrRemoveVolunteerFromReport);         // Route to add or remove a volunteer from a report

export default router;