const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            email,
            password: await bcrypt.hash(password, 10)
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during user registration:', err); // Log the error
        res.status(500).json({ message: 'Server error', error: err.message }); // Send the error message
    }
});

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

module.exports = router;
