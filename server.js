const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const path = require('path');


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Make user available in all templates
app.use((req, res, next) => {
    res.locals.user = req.session.userId ? {
        id: req.session.userId,
        name: req.session.userName
    } : null;
    next();
});

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.get('/', (req, res) => {
    res.render('pages/home', { title: 'College Ride Share' });
});

app.use('/', authRoutes);
app.use('/rides', rideRoutes);
app.use('/profile', profileRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});