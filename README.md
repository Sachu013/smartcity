# Smart Public Grievance Management Platform

A modern full-stack application for efficient civic issue resolution.

## Features
- **Citizen Portal**: Report issues with AI categorization and track resolution progress.
- **Admin Dashboard**: Analytics, metrics, and complaint management for municipal authorities.
- **AI Module**: Automated categorization and department assignment.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Axios, Lucide-React, Chart.js.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Auth**: JWT, Bcrypt.js.

## Getting Started

### Prerequisites
- Node.js installed.
- MongoDB instance (local or Atlas).

### Installation

#### 1. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartcity
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
Run the server:
```bash
npm start
```

#### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Deployment
- **Frontend**: Vercel / Netlify.
- **Backend**: Render / Railway.