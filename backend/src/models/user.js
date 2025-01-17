const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat', // Refers to the Chat model
    },
  ],
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
