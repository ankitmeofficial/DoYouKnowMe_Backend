const express = require('express');
const router = express.Router();
const { handleContactSubmission, getContactMessages } = require('../controllers/contactController');

router.post('/', handleContactSubmission);
router.get('/messages', getContactMessages);

module.exports = router;
