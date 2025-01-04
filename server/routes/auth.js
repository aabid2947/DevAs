import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = '6b4d9f73f8f4e87c1a7c4f9e3c18f0ed3c9d8c7fa206ad2b6989a2d0e6a7e5a6';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user.id },JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('login beging');
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('login Success');

    const token = jwt.sign({ id: user.id },JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

