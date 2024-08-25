import Report from "../models/Report.model.js";
import { config as configDotenv } from "dotenv";

configDotenv();
// require('dotenv').config();
// const app = express();


// Add new reports to database.
export const CreateReport = async (req, res) => {
    const newReport = new Report(req.body);
    try {
        await newReport.save();
        res.status(201).send(newReport);
    } catch (error) {
        res.status(400).send({ error: 'Error saving report', details: error });
    }
};

// Get reports from database.
export const GetReport = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching reports', details: error });
    }
};




// app.post('/reports', async (req, res) => {
//     const newReport = new Report(req.body);
//     try {
//         await newReport.save();
//         res.status(201).send(newReport);
//     } catch (error) {
//         res.status(400).send({ error: 'Error saving report', details: error });
//     }
// });



// app.get('/reports', async (req, res) => {
//     try {
//         const reports = await Report.find();
//         res.status(200).json(reports);
//     } catch (error) {
//         res.status(500).send({ error: 'Error fetching reports', details: error });
//     }
// });
