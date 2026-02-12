const User = require('../models/User');

// Show signup page
exports.showSignup = (req, res) => {
    res.render('pages/signup', { 
        title: 'Sign Up',
        error: null 
    });
};

// Handle signup
exports.signup = async (req, res) => {
    try {
        const { name, email, phone, college, password, confirmPassword } = req.body;

        // Validation
        if (password !== confirmPassword) {
            return res.render('pages/signup', {
                title: 'Sign Up',
                error: 'Passwords do not match'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('pages/signup', {
                title: 'Sign Up',
                error: 'Email already registered'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            college,
            password
        });

        // Set session
        req.session.userId = user._id;
        req.session.userName = user.name;

        res.redirect('/dashboard');
    } catch (error) {
        res.render('pages/signup', {
            title: 'Sign Up',
            error: error.message
        });
    }
};

// Show login page
exports.showLogin = (req, res) => {
    res.render('pages/login', { 
        title: 'Login',
        error: null 
    });
};

// Handle login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('pages/login', {
                title: 'Login',
                error: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('pages/login', {
                title: 'Login',
                error: 'Invalid email or password'
            });
        }

        // Set session
        req.session.userId = user._id;
        req.session.userName = user.name;

        res.redirect('/dashboard');
    } catch (error) {
        res.render('pages/login', {
            title: 'Login',
            error: 'Something went wrong. Please try again.'
        });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/');
    });
};