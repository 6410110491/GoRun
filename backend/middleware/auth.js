const User = require('../models/User');
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        // ดึง token จากคุกกี้
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No Token, Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = verifyToken;
