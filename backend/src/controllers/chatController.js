const Chat = require('../models/Chat');
const User = require('../models/User');

const Chat = require('../models/Chat');
const User = require('../models/User');

// Create a new chat
async function createChat(req, res) {
  const { userIds, message } = req.body;

  try {
    // Ensure all participants exist
    const participants = await User.find({ _id: { $in: userIds } });
    if (participants.length !== userIds.length) {
      return res.status(400).json({ message: 'Some users not found' });
    }

    // Create a new chat
    const chat = new Chat({
      participants: userIds,
      messages: [
        {
          sender: req.userId, // Assuming `req.userId` is set via authentication middleware
          text: message,
        },
      ],
    });

    await chat.save();

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Error creating chat', error: err.message });
  }
}

module.exports = { createChat };
