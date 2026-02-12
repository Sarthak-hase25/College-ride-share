const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { isAuthenticated } = require('../middleware/auth');

// All routes require authentication
router.use(isAuthenticated);

// Profile routes
router.get('/', profileController.showProfile);
router.post('/update', profileController.updateProfile);
router.post('/change-password', profileController.changePassword);

module.exports = router;