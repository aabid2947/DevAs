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

// Middleware
app.use(cors());
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

