const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Show profile page
exports.showProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        
        if (!user) {
            return res.redirect('/login');
        }

        res.render('pages/profile', {
            title: 'My Profile',
            user,
            error: null,
            success: null
        });
    } catch (error) {
        res.redirect('/dashboard');
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, phone, college } = req.body;
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/login');
        }

        // Check if email is being changed and if it's already taken
        if (email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.render('pages/profile', {
                    title: 'My Profile',
                    user,
                    error: 'Email already in use',
                    success: null
                });
            }
        }

        // Update user
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.college = college;
        
        await user.save();

        // Update session name
        req.session.userName = name;

        res.render('pages/profile', {
            title: 'My Profile',
            user,
            error: null,
            success: 'Profile updated successfully!'
        });
    } catch (error) {
        const user = await User.findById(req.session.userId);
        res.render('pages/profile', {
            title: 'My Profile',
            user,
            error: error.message,
            success: null
        });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/login');
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.render('pages/profile', {
                title: 'My Profile',
                user,
                error: 'Current password is incorrect',
                success: null
            });
        }

        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            return res.render('pages/profile', {
                title: 'My Profile',
                user,
                error: 'New passwords do not match',
                success: null
            });
        }

        // Check minimum length
        if (newPassword.length < 6) {
            return res.render('pages/profile', {
                title: 'My Profile',
                user,
                error: 'Password must be at least 6 characters',
                success: null
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.render('pages/profile', {
            title: 'My Profile',
            user,
            error: null,
            success: 'Password changed successfully!'
        });
    } catch (error) {
        const user = await User.findById(req.session.userId);
        res.render('pages/profile', {
            title: 'My Profile',
            user,
            error: error.message,
            success: null
        });
    }
};