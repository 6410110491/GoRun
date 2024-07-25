const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Find the user based on session data
        const user = await User.findById(req.session.user.id);

        if (!user) {
            return res.status(401).json({ error: 'Invalid session' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = verifyToken;
