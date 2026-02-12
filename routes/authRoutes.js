const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest, isAuthenticated } = require('../middleware/auth');
const Ride = require('../models/ride');

// Signup routes
router.get('/signup', isGuest, authController.showSignup);
router.post('/signup', isGuest, authController.signup);

// Login routes
router.get('/login', isGuest, authController.showLogin);
router.post('/login', isGuest, authController.login);

// Logout route
router.get('/logout', authController.logout);

// Dashboard route with stats
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const offeredRides = await Ride.countDocuments({ driver: req.session.userId });
        const bookedRides = await Ride.countDocuments({ passengers: req.session.userId });
        
        res.render('pages/dashboard', { 
            title: 'Dashboard',
            offeredRides,
            bookedRides
        });
    } catch (error) {
        res.render('pages/dashboard', { 
            title: 'Dashboard',
            offeredRides: 0,
            bookedRides: 0
        });
    }
});

module.exports = router;