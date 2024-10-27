const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" });
            }

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // ใช้ secure ใน production เท่านั้น
                sameSite: 'Strict', // ช่วยป้องกัน XSS
                maxAge: 24 * 60 * 60 * 1000 // อายุคุกกี้ 1 วัน
            });

            res.json({ message: 'Login successful', user: { email: user.email, role: user.role } });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login/google', async (req, res) => {
    try {
        const { tokenId } = req.body;
        if (!tokenId) {
            return res.status(400).json({ error: 'Token ID is required' });
        }

        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                username: name,
                email,
                personalInfo: {
                    profilePicture: picture
                },
                registerMethod: 'google'
            });
            await user.save();
        }

        // ที่นี่สามารถสร้าง token และตั้งค่าคุกกี้ได้
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Logged in successfully', user: { email: user.email, role: user.role } });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            res.clearCookie('token');
            res.clearCookie('connect.sid');
            return res.status(200).json({ message: 'Logged out successfully' });
        } else {
            res.status(401).json({ error: 'No active session' });
        }
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/auth/status', (req, res) => {
    const token = req.cookies.token;
    res.status(200).json({ isAuthenticated: !!token });
});

module.exports = router;
