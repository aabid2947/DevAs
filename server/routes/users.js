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
    const recommendations = await User.aggregate([
      { $match: { _id: { $nin: [...friendIds, userId] } } },
      { $lookup: {
          from: 'users',
          localField: 'friends',
          foreignField: '_id',
          as: 'mutualFriends'
        }
      },
      { $project: {
          username: 1,
          email: 1,
          mutualFriendsCount: { $size: { $setIntersection: ['$mutualFriends._id', friendIds] } }
        }
      },
      { $sort: { mutualFriendsCount: -1 } },
      { $limit: 10 }
    ]);

    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

