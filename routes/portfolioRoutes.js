const express = require('express');
const router = express.Router();
const { checkHealth, getPortfolioOverview } = require('../controllers/portfolioController');

router.get('/health', checkHealth);
router.get('/overview', getPortfolioOverview);

module.exports = router;
