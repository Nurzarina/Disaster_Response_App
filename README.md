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

**2. Install dependencies**

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

**3. Run the app**

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

**Note**
The app is still in development, and certain features may not be fully operational yet. However, the key functionalities, such as the 'Disaster Insight Cards,' are fully functional.
