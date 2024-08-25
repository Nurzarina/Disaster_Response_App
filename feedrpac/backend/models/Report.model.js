import mongoose, { Schema, model } from 'mongoose';
import User from './User.model.js';
import moment from 'moment-timezone';

// The fields of the object to be stored into database or retrieved from the database.
const reportSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    disastertype: {
        type: String,
        required: true,
        enum: [
            'Flood', 'Fire', 'Tsunami', 'Tornado', 'Earthquake', 'Volcano Eruption', 'Landslide', 'Drought'
        ], // Limited to only these 8 disaster types for now.
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    severity: {
        type: String,
        required: true,
        enum: ['low', 'moderate', 'high', 'critical'], // Severity levels
    },
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',        // Import User model
    }],
    status: {
        type: String,
        required: true,
        enum: ['ongoing', 'completed'],
        default: 'ongoing', // Default status when a new disaster is created
    }
}, { timestamps: true });   // Adds `createdAt` and `updatedAt` fields

reportSchema.index({ location: "2dsphere" });                // Ensure the location is indexed as a 2dsphere for geospatial queries (e.g., finding reports within a certain radius).

const Report = model('Report', reportSchema);

export default Report;