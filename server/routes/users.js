import express from 'express';
import User from '../models/User.js';
import  auth  from '../middleware/auth.js';

const router = express.Router();

router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/recommendations', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('friends');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = user.friends.map(friend => friend._id);
    const userInterests = user.interests;

    const recommendations = await User.aggregate([
      {
        $match: {
          _id: { $nin: [...friendIds, userId] }, // Exclude current user and friends
          interests: { $in: userInterests },    // At least one common interest
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          interests: 1,
          mutualInterestsCount: {
            $size: { $setIntersection: ['$interests', userInterests] }
          }
        }
      },
      { $sort: { mutualInterestsCount: -1 } }, // Sort by number of mutual interests
      { $limit: 10 } // Limit to 10 recommendations
    ]);

    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/all-users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Excluding the password field
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

