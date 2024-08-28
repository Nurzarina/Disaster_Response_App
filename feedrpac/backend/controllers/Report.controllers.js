import Report from "../models/Report.model.js";
import { config as configDotenv } from "dotenv";
import { reverseGeocode } from "../utils/ReverseGeocode.js";

configDotenv();
// require('dotenv').config();
// const app = express();


// CreateReport backend controller
export const CreateReport = async (req, res) => {
  const { name, disastertype, location, description, phone, severity } = req.body;
  try {
    // Fetch city and state based on the provided coordinates
    const { city, state } = await reverseGeocode(location.coordinates);

    // Create a new report with the retrieved city and state information
    const newReport = new Report({
      name,
      disastertype,
      location,
      city,
      state,
      description,
      phone,
      severity,
    });

    // Save the new report to the database
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error details:', error); // Log the error details
    res.status(500).json({ error: 'Failed to create report' });
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
