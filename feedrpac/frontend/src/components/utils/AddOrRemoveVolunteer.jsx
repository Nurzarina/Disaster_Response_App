import { Button } from 'react-bootstrap';
import axios from 'axios';
import axiosInstance from '../tobackend/axiosInstance';

// Function to handle volunteer actions (add/remove)
export const handleVolunteerAction = async (reportId, userId, action) => {
    try {
        const response = await axiosInstance.post(`http://localhost:5050/api/reports/${reportId}/volunteer`, {
            userId,
            action,
        });

        // Handle successful response
        alert(response.data.message);
    } catch (error) {
        // Handle error response
        console.error("Error during volunteer action:", error.response?.data?.error || error.message);
        alert("An error occurred. Please try again.");
    }
};

// Start Volunteering Button Component
export const StartVolunteeringButton = ({ reportId, userId }) => {
    return (
        <Button onClick={() => handleVolunteerAction(reportId, userId, 'add')}>
            <b>Start Volunteering</b>
        </Button>
    );
};

// Stop Volunteering Button Component
export const StopVolunteeringButton = ({ reportId, userId }) => {
    return (
        <Button onClick={() => handleVolunteerAction(reportId, userId, 'remove')} variant="warning">
            <b>Stop Volunteering</b>
        </Button>
    );
};
