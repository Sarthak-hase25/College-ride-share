const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const { isAuthenticated } = require('../middleware/auth');

// All routes require authentication
router.use(isAuthenticated);

// Create ride
router.get('/create', rideController.showCreateRide);
router.post('/create', rideController.createRide);

// List rides
router.get('/', rideController.listRides);

// My rides & bookings
router.get('/my-rides', rideController.myRides);
router.get('/my-bookings', rideController.myBookings);

// Ride details
router.get('/:id', rideController.showRideDetails);

// Book ride
router.post('/:id/book', rideController.bookRide);

// Cancel ride (driver)
router.post('/:id/cancel', rideController.cancelRide);

// Cancel booking (passenger)
router.post('/:id/cancel-booking', rideController.cancelBooking);

module.exports = router;