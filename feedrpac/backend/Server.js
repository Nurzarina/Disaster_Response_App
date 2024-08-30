import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/Auth.routes.js';
import reportRoutes from './routes/Report.routes.js';       //Use of alias to import default function.
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json()); // middleware to parse JSON request bodies.
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded request bodies.
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',                // Vite FrontEnd URL.
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE'],
    credentials: true,                              // To resolve issue of OPTIONS request.
}));

app.use('/api/auth',authRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB()
});