const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration'); // โมเดล EventRegistration

// Route สำหรับลงทะเบียนผู้สมัครใหม่และเพิ่มไปยัง EventRegistration
router.post('/register/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const registrationData = req.body;

        // ตรวจสอบว่ามี EventRegistration สำหรับ eventId นี้หรือไม่
        let eventRegistration = await EventRegistration.findOne({ event_id: eventId });

        if (!eventRegistration) {
            // สร้าง EventRegistration ใหม่ถ้ายังไม่มี
            eventRegistration = new EventRegistration({
                event_id: eventId,
                registrations: []
            });
        }

        // เพิ่มข้อมูลผู้สมัครใหม่ลงใน registrations array
        eventRegistration.registrations.push(registrationData);

        // บันทึกการลงทะเบียนใน EventRegistration
        await eventRegistration.save();

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

        // ค้นหาและอัปเดตข้อมูลการลงทะเบียน
        const eventRegistration = await EventRegistration.findOneAndUpdate(
            { event_id: eventId, 'registrations._id': registrationId },
            { $set: { 'registrations.$': updateData } },
            { new: true }
        );

        if (!eventRegistration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

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

// Route สำหรับลบการลงทะเบียน
router.delete('/event-registration/:eventId/:registrationId', async (req, res) => {
    try {
        const { eventId, registrationId } = req.params;

        // ลบการลงทะเบียนที่ระบุ
        const eventRegistration = await EventRegistration.findOneAndUpdate(
            { event_id: eventId },
            { $pull: { registrations: { _id: registrationId } } },
            { new: true }
        );

        if (!eventRegistration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        res.status(200).json(eventRegistration);
    } catch (error) {
        console.error('Error deleting registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
