const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/auth');



// Get all users route
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err); // Log the error
        res.status(500).json({ message: 'Server error', error: err.message }); // Send the error message
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

router.put('/user/update', verifyToken, async (req, res) => {
    try {
        const { username, role, personalInfo } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { username, role, personalInfo }, { new: true });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
