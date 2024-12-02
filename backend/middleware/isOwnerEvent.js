const User = require('../models/User');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken')


const isOwnerEvent = async (req, res, next) => {
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

        if (user.role === 'admin') {
            return next();
        }

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (!event.owner.some(owner => owner.owner_id.equals(user._id))) {
            return res.status(403).json({ error: 'Unauthorized access to event' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = isOwnerEvent;
