# Disaster Response App

## Overview

This project is a Disaster Response App developed as part of a Full Stack Developer bootcamp. The app connects volunteers to disaster victims in real-time, allowing for faster and more organized disaster response efforts.

The app is built using the MERN stack (MongoDB, Express.js, React, Node.js) and features real-time updates and insights for volunteers, focusing on disaster areas and related needs.

## Features

- Real-time connection between volunteers and disaster victims
- Dashboard page which displays current emergencies and their locations on a map
- Disaster Insight Cards displaying disaster updates and affected areas
- User Missions page displaying missions the volunteer is currently joining and past missions
- User Profile page displaying users details
- Responsive UI with dynamic updates using React
- RESTful API built with Express.js and Node.js

## Technologies

- **Frontend**: Vite, React, JavaScript, Bootstrap, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: Cloudinary (for image uploads), JWT (for authentication), OpenStreetMap API (for map)


## Getting Started

### Prerequisites

- **Node.js** installed (v12 or later)
- **MongoDB** running locally or through a cloud provider like MongoDB Atlas
- **Git** for cloning the repository

### Installation


#### 1. Clone the repository

```bash
git clone https://github.com/Nurzarina/Disaster_Response_App.git
cd Disaster_Response_App/feedrpac
```


#### 2. Install dependencies

There are two parts to the app: the backend and frontend.

**Backend Setup**
```bash
npm install
```

**Frontend Setup**
```bash
cd frontend
npm install
```


#### 3. Set up Environment Variables

You need to create two .env files, one for the server-side and one for the client-side.

**Backend** .env **Setup:**
1. In the feedrpac folder, create a file named .env.
2. Add the following environment variables in the .env file:
  ```bash
  # .env file for the server
  
  PORT=5050  # Or any port you'd prefer
  MONGO_URI=your_mongodb_connection_string
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  JWT_SECRET=your_jwt_secret
  ```

**Frontend** .env **Setup:**
1. In the feedrpac/frontend folder, create a file named .env.
2. Add the following environment variables in the .env file:
  ```bash
   # .env file for the client

  VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
  VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```
Make sure to replace the values with your actual credentials (e.g., MongoDB URI, Cloudinary details, etc.).


#### 4. Run the app

Once the dependencies are installed, start the backend and frontend servers.

**Starting the Backend**

```bash
cd ..
npm run dev
```

The backend will be running on http://localhost:5050.

**Starting the Frontend**

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm run dev
```

The frontend will be running on http://localhost:5173/


### Status
The app is still in development, and certain features may not be fully operational yet. However, the key functionalities, such as the 'Disaster Insight Cards,' are fully functional.


