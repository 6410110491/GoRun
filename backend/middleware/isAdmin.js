const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    try {
        // ตรวจสอบว่าผู้ใช้งานเข้าสู่ระบบแล้วหรือไม่
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Unauthorized: No session found' });
        }

        // ค้นหาผู้ใช้งานโดยใช้ ID จาก session
        const user = await User.findById(req.session.user.id);

        // ตรวจสอบว่าผู้ใช้งานมีอยู่หรือไม่
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // ตรวจสอบว่าผู้ใช้งานมีบทบาทเป็น Admin หรือไม่
        if (user.role !== 'admin' && user.role !== 'superuser') {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }

        // ถ้าผ่านการตรวจสอบให้ไปยัง middleware หรือ route handler ถัดไป
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = isAdmin;
