const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: String,
        required: [true, 'Please provide pickup location'],
        trim: true
    },
    to: {
        type: String,
        required: [true, 'Please provide destination'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Please provide ride date']
    },
    time: {
        type: String,
        required: [true, 'Please provide ride time']
    },
    seats: {
        type: Number,
        required: [true, 'Please provide available seats'],
        min: [1, 'At least 1 seat must be available'],
        max: [6, 'Maximum 6 seats allowed']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price per seat'],
        min: [0, 'Price cannot be negative']
    },
    vehicleType: {
        type: String,
        required: [true, 'Please provide vehicle type'],
        enum: ['Car', 'Bike', 'Auto', 'SUV']
    },
    vehicleNumber: {
        type: String,
        required: [true, 'Please provide vehicle number'],
        uppercase: true
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ride', rideSchema);