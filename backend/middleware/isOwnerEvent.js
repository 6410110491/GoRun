const User = require('../models/User');
const Event = require('../models/Event');

const isOwnerEvent = async (req, res, next) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Unauthorized: No session found' });
        }

        // ค้นหาผู้ใช้งานโดยใช้ ID จาก session
        const user = await User.findById(req.session.user.id);

        // ตรวจสอบว่าผู้ใช้งานมีอยู่หรือไม่
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // ตรวจสอบว่าผู้ใช้งานเป็น Admin หรือ Superuser
        if (user.role === 'admin' || user.role === 'superuser') {
            return next(); // อนุญาตให้เข้าถึงถ้าเป็น Admin หรือ Superuser
        }

        // ค้นหา event ที่ระบุ
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // ตรวจสอบการเป็นเจ้าของ event
        if (!event.owner.some(owner => owner.owner_id.equals(user._id))) {
            return res.status(403).json({ error: 'Unauthorized access to event' });
        }

        // ถ้าผ่านการตรวจสอบ ให้ไปยัง middleware หรือ route handler ถัดไป
        next();
    } catch (error) {
        // จัดการข้อผิดพลาดที่อาจเกิดขึ้น
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = isOwnerEvent;
