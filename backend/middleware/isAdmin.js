const User = require('../models/User');
const jwt = require('jsonwebtoken')

const isAdmin = async (req, res, next) => {
    try {
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

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = isAdmin;
