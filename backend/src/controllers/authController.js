const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register User Controller
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
}

// Login User Controller
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token (valid for 1 hour)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      'here_is_the_secret..1234',  // You should replace this with your actual secret key
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful',token, user });
    console.log("perfect")
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
