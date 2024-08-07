const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');


// เส้นทางสำหรับการสร้างงานใหม่
router.post('/events', async (req, res) => {
    try {
        // ค้นหาผู้ใช้ตาม owner_id
        const user = await User.findById(req.body.owner_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // สร้างเหตุการณ์ใหม่
        const newEvent = new Event({
            owner: [
                {
                    owner_id: user._id,
                    username: user.username
                }
            ],
            eventName: req.body.eventName,
            sportType: req.body.sportType,
            location: req.body.location
        });

        // บันทึกเหตุการณ์ใหม่ลงในฐานข้อมูล
        await newEvent.save();

        // เพิ่มเหตุการณ์ในข้อมูลของผู้ใช้
        user.eventOwner.push({
            event_id: newEvent._id,
            eventName: newEvent.eventName
        });

        // บันทึกการอัปเดตของผู้ใช้
        await user.save();

        res.status(201).json({ message: 'Create event successfully', event: newEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// เส้นทางสำหรับการดึงข้อมูลงานทั้งหมด
router.get('/events', verifyToken, async (req, res) => {
    try {
        const userEvents = await Event.find({ 'owner.owner_id': req.user._id });
        res.status(200).json(userEvents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/events/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        // Verify if the authenticated user is the owner of the event
        if (!event.owner.some(owner => owner.owner_id.equals(req.user._id))) {
            return res.status(403).json({ error: 'Unauthorized access to event' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/events/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        // Verify if the authenticated user is the owner of the event
        if (!event.owner.some(owner => owner.owner_id.equals(req.user._id))) {
            return res.status(403).json({ error: 'Unauthorized access to event' });
        }
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/events/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        // Verify if the authenticated user is the owner of the event
        if (!event.owner.some(owner => owner.owner_id.equals(req.user._id))) {
            return res.status(403).json({ error: 'Unauthorized access to event' });
        }
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
