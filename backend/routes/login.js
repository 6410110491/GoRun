const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'secret');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/userinfo', verifyToken, async (req, res) => {
    try {
        // Access user information from req.user (populated by verifyToken middleware)
        const user = req.user;

        // Exclude sensitive information from the response
        const { password, ...userInfo } = user.toObject(); // Remove password from the response

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/protected', verifyToken, (req, res) => {
    // เข้าถึงข้อมูลผู้ใช้ผ่าน req.user
    res.json({ message: 'This route is use token', user: req.user });
});

module.exports = router;
