const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware/auth');


// Route to authenticate and log in a user
router.post('/login', async (req, res) => {
    try {
        // Check if the email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Store user info in session
        req.session.user = {
            id: user._id,
            email: user.email
        };
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Logout route to destroy session
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Could not log out, please try again' });
            }
            res.status(200).json({ message: 'Logged out successfully' });
        });
    } else {
        res.status(400).json({ error: 'No session to destroy' });
    }
});

router.get('/userinfo', verifyToken, (req, res) => {
    try {
        // Exclude sensitive information from the response
        const { password, ...userInfo } = req.user.toObject(); // req.user should be populated by verifySession

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/auth/status', (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
});

module.exports = router;
