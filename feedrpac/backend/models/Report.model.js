import mongoose, { Schema, model } from 'mongoose';
import User from './User.model.js';
import moment from 'moment-timezone';

// The 12 fields of the object to be stored into database or retrieved from the database:
// name
// disastertype
// location Array
// city
// state
// description
// phone
// severity
// volunteers
// status
// createdAt & updatedAt

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
    location: {                                         // Location as GeoJSON object
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    severity: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High', 'Critical'],         // Severity levels
    },
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                                        // Reference to User model
    }],
    status: {
        type: String,
        required: true,
        enum: ['ongoing', 'completed'],
        default: 'ongoing',                                  // Default status when a new disaster is reported
    },
}, { timestamps: true });                                   // Adds `createdAt` and `updatedAt` fields

reportSchema.index({ location: "2dsphere" });                // Ensure the location is indexed as a 2dsphere for geospatial queries (e.g., finding reports within a certain radius).

const Report = model('Report', reportSchema);

export default Report;