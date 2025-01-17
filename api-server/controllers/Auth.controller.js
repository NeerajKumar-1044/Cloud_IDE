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
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const AccessToken = await GenerateToken(user?._id);
    
    res
    .cookie('AccessToken', AccessToken, options)
    .json({ newUser });

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const AccessToken = await GenerateToken(user?._id);
    
    res
    .cookie('AccessToken', AccessToken, options)
    .json({ user });

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

    console.log("user already exists:- ");
    if (!user) {
        user = await User.create({
          username: googleUser.given_name,
          email: googleUser.email,
          password: process.env.PASSWORD_KEY
      });
      await user.save();
    }

    const AccessToken = await GenerateToken(user?._id);
    
    res
    .cookie('AccessToken', AccessToken, options)
    .json({ user });

  } catch (err) {
    res.status(400).json({ message: 'Google authentication failed', error: err });
  }
};


// Logout user
export const logoutUser = async(req, res) => {

  const userid = req.user._id;
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


