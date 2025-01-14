import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.model.js';
import { verifyGoogleToken } from '../Config/google_auth.js';

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = newUser.generateAuthToken();
    res.status(201).json({ token, user: newUser });
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

    const token = user.generateAuthToken();
    res.json({ token, user });
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
    // console.log(user);
    if (!user) {
        user = await User.create({
          username: googleUser.given_name,
          email: googleUser.email,
          password: googleUser.sub,
      });
      await user.save();
    }

    // const jwtToken = user.generateAuthToken(); // Generate your app's token
    res.json({ user }); // Send the token to the frontend
  } catch (err) {
    res.status(400).json({ message: 'Google authentication failed', error: err });
  }
};


// Logout user
export const logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
