import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import {v2 as cloudinary} from 'cloudinary';
// Import routes
import authRoutes from './routes/Auth.routes.js';
import userRoutes from './routes/User.routes.js';
import postRoutes from './routes/Post.routes.js';
import notificationRoutes from './routes/Notification.routes.js';
import messageRoutes from './routes/Message.routes.js';
import reportRoutes from './routes/Report.routes.js';       //Use of alias to import default function.
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

// Initialize Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json()); // middleware to parse JSON request bodies.
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded request bodies.
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',                    // Vite FrontEnd server.
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE'],
    credentials: true,                                  // Allow cookies to be sent from BackEnd
}));

app.use('/api/auth',authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB()
});