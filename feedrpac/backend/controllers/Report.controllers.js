import Report from "../models/Report.model.js";
import User from "../models/User.model.js";
import { config as configDotenv } from "dotenv";
import { reverseGeocode } from "../lib/utils/ReverseGeocode.js";

configDotenv();
// require('dotenv').config();
// const app = express();


// CreateReport backend controller
export const createReport = async (req, res) => {
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
export const getReport = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching reports', details: error });
    }
};

// This controller find report by reportId.
export const getReportDetails = async (req, res) => {
    try {
        const reportId = req.params.reportId;
  
      // Fetch report details from the database
      const report = await Report.findById(reportId);
  
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
  
      // Send report details in the response
      res.json(report);
    } catch (error) {
      console.error('Error fetching report details:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const addOrRemoveVolunteerFromReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { userId, action } = req.body;

        // Find the report by ID
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (action === 'add') {
            // Check if the user is already a volunteer for this report
            const isAlreadyVolunteer = report.volunteers.includes(userId);
            if (isAlreadyVolunteer) {
                return res.status(400).json({ error: "User is already a volunteer for this report" });
            }

            // Add the user to the volunteers array
            report.volunteers.push(userId);
            await report.save();

            // Add the report to the user's ongoingMission array
            const mission = {
                missionId: reportId,
                status: 'ongoing',
                startDate: new Date(),
            };
            user.ongoingMission.push(mission);
            await user.save();

            res.status(200).json({ message: "Volunteer added successfully", report });

        } else if (action === 'remove') {
            // Check if the user is not a volunteer for this report
            const isVolunteer = report.volunteers.includes(userId);
            if (!isVolunteer) {
                return res.status(400).json({ error: "User is not a volunteer for this report" });
            }

            // Remove the user from the volunteers array
            report.volunteers.pull(userId);
            await report.save();

            // Remove the report from the user's ongoingMission array
            const missionIndex = user.ongoingMission.findIndex(m => m.missionId.toString() === reportId);
            if (missionIndex !== -1) {
                const completedMission = user.ongoingMission[missionIndex];
                completedMission.status = 'completed';
                completedMission.stopDate = new Date();
                
                // Move the completed mission to prevMission
                user.prevMission.push(completedMission);
                user.ongoingMission.splice(missionIndex, 1); // Remove from ongoingMission
                await user.save();
                
                res.status(200).json({ message: "Volunteer removed and mission updated successfully", report });
            } else {
                res.status(404).json({ error: "Mission not found in ongoingMission" });
            }

        } else {
            res.status(400).json({ error: "Invalid action. Use 'add' or 'remove'." });
        }
    } catch (error) {
        console.log("Error in addOrRemoveVolunteerFromReport controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};




