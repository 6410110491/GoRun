const express = require('express');
const router = express.Router();
const User = require('../models/User');
const VerifyOrganized = require('../models/VerifyOrganized');
const isAdmin = require('../middleware/isAdmin');

router.post('/verifyOrganized', async (req, res) => {
    try {
        // ตรวจสอบว่ามีฟิลด์ user ใน request body
        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // สร้าง VerifyOrganized ใหม่
        const newVerify = new VerifyOrganized({
            user_id: user._id,
            username: user.username,
            email: user.email,
            idCardImage: req.body.idCardImage,
            status: req.body.status || 'pending', // กำหนดค่าเริ่มต้นเป็น 'pending' ถ้าไม่มีการส่งค่ามา
            comment: req.body.comment
        });

        // บันทึกในฐานข้อมูล
        await newVerify.save();

        // ส่งคำตอบกลับไป
        res.status(200).json({ message: 'Send Verify Organized Successfully', verify: newVerify });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/verifyOrganized', isAdmin, async (req, res) => {
    try {
        // ค้นหา VerifyOrganized ทั้งหมด
        const verify = await VerifyOrganized.find();

        // ส่งคำตอบกลับไป
        res.status(200).json(verify);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:userId/verifyOrganized', isAdmin, async (req, res) => {
    const userId = req.params.userId;
    try {
        const verify = await VerifyOrganized.findByIdAndUpdate(userId, req.body, { new: true });

        if (!verify) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(verify);
    } catch (error) {
        console.error(error); // เพิ่มการบันทึกข้อผิดพลาด
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
