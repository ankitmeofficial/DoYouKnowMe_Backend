const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

// In-memory fallback message store
const inMemoryMessages = [];

const handleContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Please provide name, email, and message.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Please provide a valid email address.',
      });
    }

    const newMessageData = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || 'Portfolio Contact Form Submission',
      message,
      createdAt: new Date(),
    };

    let savedMessage = newMessageData;

    // Save to Mongo DB if connection is established
    try {
      if (ContactMessage.db && ContactMessage.db.readyState === 1) {
        const contactDoc = new ContactMessage({
          name,
          email,
          subject: newMessageData.subject,
          message,
        });
        savedMessage = await contactDoc.save();
      } else {
        inMemoryMessages.push(newMessageData);
      }
    } catch {
      inMemoryMessages.push(newMessageData);
    }

    // Optional Nodemailer dispatch
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_NOTIFICATION_EMAIL || 'ankitmeofficial@gmail.com',
          subject: `Portfolio Inquiry: ${newMessageData.subject}`,
          html: `
            <h3>New Portfolio Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${newMessageData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr />
            <p>Sent at: ${new Date().toLocaleString()}</p>
          `,
        });
      } catch (mailError) {
        console.error('Nodemailer notice: Failed to send email alert:', mailError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully.',
      data: savedMessage,
    });
  } catch (error) {
    console.error('Contact Submission Error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your message.',
    });
  }
};

const getContactMessages = async (req, res) => {
  try {
    let messages = inMemoryMessages;
    if (ContactMessage.db && ContactMessage.db.readyState === 1) {
      messages = await ContactMessage.find().sort({ createdAt: -1 });
    }
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch {
    return res.status(200).json({
      success: true,
      count: inMemoryMessages.length,
      data: inMemoryMessages,
    });
  }
};

module.exports = {
  handleContactSubmission,
  getContactMessages,
};
