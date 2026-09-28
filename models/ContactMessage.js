const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    default: 'Portfolio Contact Form Submission',
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread',
  },
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
