import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.model.js';
import { verifyGoogleToken } from '../Config/google_auth.js';


const options = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
};

const GenerateToken = async (userid) => {
  const user =await User.findById(userid);
  const AccessToken = await user.generateAccessToken();
  const RefreshToken = await user.generateRefreshToken();
  user.refreshToken = RefreshToken;
  await user.save({ validateBeforeSave: false });

  return AccessToken;
}

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ 
      username: name, 
      email: email, 
      password: password,
    });
    await newUser.save();

    const AccessToken = await GenerateToken(newUser?._id);
    
    const user = await User.findById(newUser?._id)
    .select('-password -refreshToken -classRoomEnrolledIn -classRoomOwned -solvedQuestions -contestsParticipated');

    res
    .status(201)
    .cookie('AccessToken', AccessToken, options)
    .json({user});

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const AccessToken = await GenerateToken(user?._id);
    const loggedInUser = await User.findById(user?._id)
    .select('-password -refreshToken -classRoomEnrolledIn -classRoomOwned -solvedQuestions -contestsParticipated');
    
    res
    .status(200)
    .cookie('AccessToken', AccessToken, options)
    .json({ loggedInUser });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Google authentication
export const googleAuth = async (req, res) => {
  console.log("googleAuth");
  const { token } = req.body;
  // console.log(token);
  try {
    const googleUser = await verifyGoogleToken(token); // Verify the token
    // console.log(googleUser);
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
        user = await User.create({
          username: googleUser.given_name,
          email: googleUser.email,
          password: process.env.PASSWORD_KEY
      });
      await user.save();
    }else{
      console.log("user already exists:- ");
    }

    const AccessToken = await GenerateToken(user?._id);

    const CreatedUser = await User.findById(user?._id)
    .select('-password -refreshToken -classRoomEnrolledIn -classRoomOwned -streak -solvedQuestions -contestsParticipated');
    console.log("sending data");

    res
    .cookie('AccessToken', AccessToken, options)
    .json({ user: CreatedUser });

  } catch (err) {
    res.status(400).json({ message: 'Google authentication failed', error: err });
  }
};


// Logout user
export const logoutUser = async(req, res) => {

  const userid = req?.user?._id;
  try {
    await User.findByIdAndUpdate(userid, { refreshToken: '' }, { new: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error, Failed to remove session:-', error });
  }

  res
  .status(200)
  .clearCookie('AccessToken')
  .json({ message: 'Logged out successfully 🫤' });
};


