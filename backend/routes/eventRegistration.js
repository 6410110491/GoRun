const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration'); // โมเดล EventRegistration
const verifyToken = require('../middleware/auth');
const User = require('../models/User');
const Event = require('../models/Event');

// Route สำหรับลงทะเบียนผู้สมัครใหม่และเพิ่มไปยัง EventRegistration
router.post('/register/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const registrationData = req.body;
        const user = await User.findById(req.body.user_id);
        const event = await Event.findById(eventId)

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // ตรวจสอบว่ามี user_id ใน registrationData หรือไม่
        if (!registrationData.user_id) {
            return res.status(400).json({ message: 'user_id is required' });
        }

        // ตรวจสอบว่ามี EventRegistration สำหรับ eventId นี้หรือไม่
        let eventRegistration = await EventRegistration.findOne({ event_id: eventId });

        if (!eventRegistration) {
            // สร้าง EventRegistration ใหม่ถ้ายังไม่มี
            eventRegistration = new EventRegistration({
                event_id: eventId,
                registrations: []
            });
        }

        // ตรวจสอบว่ามีผู้ใช้งานใน registrations หรือไม่
        const existingRegistrationIndex = eventRegistration.registrations.findIndex(reg => reg.user_id.toString() === registrationData.user_id.toString());

        if (existingRegistrationIndex !== -1) {
            // ถ้ามีข้อมูลของผู้ใช้งานคนนี้อยู่แล้ว ให้แก้ไขข้อมูลเดิม
            eventRegistration.registrations[existingRegistrationIndex] = { ...eventRegistration.registrations[existingRegistrationIndex], ...registrationData };
        } else {
            // ถ้าไม่มีข้อมูลให้เพิ่มข้อมูลผู้สมัครใหม่ลงใน registrations array
            eventRegistration.registrations.push(registrationData);
        }

        // บันทึกการลงทะเบียนใน EventRegistration
        await eventRegistration.save();

        // ตรวจสอบว่าผู้ใช้ได้ลงทะเบียนเหตุการณ์นี้แล้วหรือไม่
        const alreadyRegistered = user.eventRegistered.some(event => event.event_id.toString() === eventId);

        if (!alreadyRegistered) {
            // เพิ่มเหตุการณ์ในข้อมูลของผู้ใช้
            user.eventRegistered.push({
                event_id: eventId,
                eventName: event.eventName
            });

            // บันทึกการอัปเดตของผู้ใช้
            await user.save();
        }

        res.status(201).json({ message: 'User registered successfully', registration: registrationData });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});


// Route สำหรับแก้ไขข้อมูลการลงทะเบียน
router.patch('/register/:eventId/:registrationId', async (req, res) => {
    try {
        const { eventId, registrationId } = req.params;
        const updateData = req.body;

        // ค้นหาข้อมูลการลงทะเบียน
        const eventRegistration = await EventRegistration.findOne({
            event_id: eventId,
            'registrations._id': registrationId
        });

        if (!eventRegistration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // ค้นหาฟิลด์ registrations ที่ตรงกับ registrationId
        const registration = eventRegistration.registrations.id(registrationId);

        // อัปเดตเฉพาะฟิลด์ที่ระบุใน updateData
        Object.keys(updateData).forEach(key => {
            registration[key] = updateData[key]; // อัปเดตเฉพาะฟิลด์ที่ถูกส่งมา
        });

        // บันทึกการอัปเดตในฐานข้อมูล
        await eventRegistration.save();

        res.status(200).json(eventRegistration);
    } catch (error) {
        console.error('Error updating registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




// Route สำหรับดึงข้อมูลการลงทะเบียนทั้งหมดของ event
router.get('/register/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;

        // ค้นหาการลงทะเบียนทั้งหมดสำหรับ event ที่ระบุ
        const eventRegistration = await EventRegistration.findOne({ event_id: eventId });

        if (!eventRegistration) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(eventRegistration);
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// เส้นทางสำหรับการดึงข้อมูลงานทั้งหมดของผู้ใช้
router.get('/register/detail/me', verifyToken, async (req, res) => {
    try {
        // ตรวจสอบว่า user ผ่านการยืนยันตัวตนหรือไม่
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // ข้อมูลที่ดึงมาจาก req.user.eventRegistered
        const eventRegistered = req.user.eventRegistered || [];

        // ดึงข้อมูลการลงทะเบียนเพิ่มเติมจาก EventRegistration
        const eventRegistrations = await EventRegistration.find({
            'registrations.user_id': user._id
        });

        // สร้าง array สำหรับเก็บข้อมูลที่รวมกัน
        const combinedEventData = [];

        // ตรวจสอบ event_id ที่อยู่ใน eventRegistered
        eventRegistered.forEach(event => {
            // ค้นหาข้อมูลการลงทะเบียนของ event_id นี้ใน eventRegistrations
            const eventRegistration = eventRegistrations.find(registration => registration.event_id.toString() === event.event_id.toString());

            if (eventRegistration) {
                // ค้นหาผู้สมัครของผู้ใช้ใน registrations
                const userDetails = eventRegistration.registrations.filter(r => r.user_id.toString() === user._id.toString());

                // ถ้ามีข้อมูลผู้สมัครที่ตรงกับ user_id นี้
                if (userDetails.length > 0) {
                    // เพิ่มข้อมูล event และ userDetails ลงไปใน combinedEventData
                    combinedEventData.push({
                        event_id: event.event_id,
                        eventName: event.eventName,
                        _id: event._id,
                        userDetails: userDetails // ข้อมูลของผู้สมัครใน event นี้
                    });
                }
            }
        });

        // เรียงข้อมูลตามวันที่ registrationDate โดยให้วันที่ล่าสุดอยู่ด้านบนสุด
        const sortedEventData = combinedEventData.sort((a, b) => {
            const dateA = a.userDetails[0].registrationDate ? new Date(a.userDetails[0].registrationDate) : null;
            const dateB = b.userDetails[0].registrationDate ? new Date(b.userDetails[0].registrationDate) : null;

            // ถ้าข้อมูล registrationDate ไม่พบ ให้ให้ event นั้นอยู่ด้านบนสุด
            if (!dateA && !dateB) return 0;
            if (!dateA) return -1;  // ถ้า dateA เป็น null ให้ event นี้อยู่บนสุด
            if (!dateB) return 1;   // ถ้า dateB เป็น null ให้ event นี้อยู่บนสุด

            return dateB - dateA;  // เปรียบเทียบวันที่ของแต่ละ event
        });

        // ส่งข้อมูลที่รวมกันกลับไปใน response
        res.status(200).json(sortedEventData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route สำหรับดึงข้อมูลการลงทะเบียนที่เฉพาะเจาะจง
router.get('/register/:eventId/:userId', verifyToken, async (req, res) => {
    try {
        const { eventId, userId } = req.params;

        // ค้นหาเอกสาร EventRegistration ที่มี event_id ตรงกับ eventId และ registrations ที่มี user_id ตรงกับ userId
        const eventRegistration = await EventRegistration.findOne({
            event_id: eventId,
            'registrations.user_id': userId  // ใช้เพื่อค้นหาการลงทะเบียนที่มี user_id ตรงกับ userId ใน registrations array
        });

        // ตรวจสอบว่าพบเอกสาร EventRegistration หรือไม่
        if (!eventRegistration) {
            return;
        }

        // ดึงข้อมูลการลงทะเบียนที่ต้องการจาก registrations array
        const registration = eventRegistration.registrations.find(reg => reg.user_id.toString() === userId);

        // ตรวจสอบว่าพบข้อมูลการลงทะเบียนของผู้ใช้หรือไม่
        if (!registration) {
            return;
        }

        res.status(200).json(registration);
    } catch (error) {
        console.error('Error fetching registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});





module.exports = router;
