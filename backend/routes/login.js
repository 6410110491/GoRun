const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // เปลี่ยนเป็น Client ID ของคุณ

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

router.post('/login/google', async (req, res) => {
    try {
        const { tokenId } = req.body;
        if (!tokenId) {
            return res.status(400).json({ error: 'Token ID is required' });
        }

        // Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID // ใช้ Client ID จาก .env
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            // Create a new user if not exists
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

        // Store user info in session
        req.session.user = {
            id: user._id,
            email: user.email
        };
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Server Error:', error); // Log error to the server console
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Logout route to destroy session
router.post('/logout', async (req, res) => {
    try {
        if (req.session.user) {
            const { registerMethod } = req.session.user;

            if (registerMethod === 'google') {
                // รหัสที่ต้องการเรียก API Google SignOut
                const userKey = req.session.user.email; // ใช้ email หรือ userId ตามที่ Google API ต้องการ
                const accessToken = req.session.accessToken; // ต้องให้ access token สำหรับ Google API

                await axios.post(`https://admin.googleapis.com/admin/directory/v1/users/${userKey}/signOut`, {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
            }

            // ทำการล็อกเอาท์ในเซิร์ฟเวอร์ของคุณ
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to logout' });
                }
                res.status(200).json({ message: 'Logged out successfully' });
            });
        } else {
            res.status(401).json({ error: 'No active session' });
        }
    } catch (error) {
        console.error('Logout error:', error);
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
