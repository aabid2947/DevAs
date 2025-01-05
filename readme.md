# Friend Connect - MERN Stack Social Network

A full-stack social networking application built with the MERN stack that enables users to connect, manage friendships, and discover new connections through an intelligent recommendation system.

## Features

- 👤 **User Authentication**
  - Secure signup/login with JWT
  - Password encryption
  - Protected routes

- 🔍 **Friend Management**
  - Search for other users
  - Send/receive friend requests 
  - Accept/reject friend requests
  - View friends list
  - Unfriend functionality

- 🎯 **Smart Recommendations**
  - Friend suggestions based on mutual connections
  - Interest-based recommendations
  - Real-time updates

- 💅 **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design
  - Dark mode theme
  - Loading states & error handling

## Tech Stack

- **Frontend:**
  - React.js with Hooks
  - Context API for state management
  - React Query for data fetching
  - TailwindCSS for styling
  - React Router for navigation

- **Backend:** 
  - Node.js & Express.js
  - MongoDB with Mongoose
  - JWT authentication
  - RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
    git clone https://github.com/yourusername/friend-connect.git


2.Install frontend dependencies:
    cd client
    npm install

3.Install backend dependencies:
    cd ../server
    npm install

4.Create a .env file in the server directory:
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

5.Start the development servers:
    Backend
        cd server
        npm run dev

    Frontend:
        cd client
        npm run dev

API Endpoints
    -Authentication
        -POST /api/auth/register - Register new user
        -POST /api/auth/login - Login user
    -Users
        -GET /api/users/search - Search users
        -GET /api/users/recommendations - Get friend recommendations
    -Friends
        -POST /api/friends/request - Send friend request
        -GET /api/friends/requests - Get friend requests
        -POST /api/friends/accept - Accept friend request
        -POST /api/friends/reject - Reject friend request
        -GET /api/friends/list - Get friends list

Contributing
    -Fork the repository
    -Create your feature branch (git checkout -b feature/AmazingFeature)
    -Commit your changes (git commit -m 'Add some AmazingFeature')
    -Push to the branch (git push origin feature/AmazingFeature)
    -Open a Pull Request

License
    This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
    UI Components from shadcn/ui
    Icons from Lucide

