const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route to register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            registerMethod: req.body.registerMethod
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const createAdminUser = async () => {
    const adminData = {
        username: process.env.USERADMIN,
        email: process.env.EMAILADMIN, // ตั้งชื่อผู้ใช้งาน
        password: process.env.PASSWORDADMIN, // รหัสผ่านที่ต้องการ
        role: 'admin', // ระบุเป็น admin หรือ superuser
        registerMethod: 'website' // ระบุว่าเป็นการลงทะเบียนด้วยตนเอง
    };

    try {
        // เข้ารหัสรหัสผ่าน
        const salt = await bcrypt.genSalt(10);
        adminData.password = await bcrypt.hash(adminData.password, salt);

        // สร้างผู้ใช้งานในฐานข้อมูล
        const existingUser = await User.findOne({ username: adminData.username });
        if (existingUser) {
            console.log('Admin user already exists');
            return;
        }

        const adminUser = new User(adminData);
        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

// เรียกใช้ฟังก์ชันนี้เมื่อแอปพลิเคชันเริ่มต้น
createAdminUser();

module.exports = router;
