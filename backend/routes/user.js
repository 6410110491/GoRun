const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

router.get('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.username);
    } catch (err) {
        console.error('Error fetching user by email:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
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

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        // ค้นหาผู้ใช้จากอีเมล
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "ไม่พบบัญชีผู้ใช้" });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        const resetToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("reset_token", resetToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        });

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        res.json({ resetLink });

    } catch (error) {
        console.error("Error in /forgot-password:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error: error.message });
    }
});

router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        // ตรวจสอบว่า token ถูกต้องหรือไม่
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ตั้งรหัสผ่านใหม่ให้ผู้ใช้
        user.password = bcrypt.hashSync(password, 10); // ใช้ bcrypt เพื่อเข้ารหัสรหัสผ่าน
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});



module.exports = router;
