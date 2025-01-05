import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import friendRoutes from './routes/friends.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all domains or specific ones to access the API
const corsOptions = {
  origin: ['http://localhost:5173', 'https://client-by6mzkrhx-aabid2947s-projects.vercel.app'], // Add allowed frontends here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // The allowed HTTP methods
  credentials: true, // Allow cookies to be included in requests
};

// Middleware
app.use(cors(corsOptions)); // Use the CORS middleware

app.use(express.json());


const mongostring = process.env.MONGODB_URI;
console.log(mongostring)
// Database connection
mongoose.connect(mongostring)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

