import {User} from '../models/User.model.js';

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id)
    .select('-password -refreshToken -classRoomEnrolledIn -classRoomOwned -solvedQuestions -contestsParticipated');
    
    res
    .status(200)
    .json({user: user});
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};