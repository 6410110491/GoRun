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
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/userinfo/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/user/update', verifyToken, async (req, res) => {
    try {
        const { username, role, personalInfo, address } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { username, role, personalInfo, address }, { new: true });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/user/update/', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/:userId/update/', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
