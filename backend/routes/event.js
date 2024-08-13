const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');


// เส้นทางสำหรับการสร้างงานใหม่
router.post('/events', async (req, res) => {
    try {
        const user = await User.findById(req.body.owner_id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const newEvent = new Event({
            owner: {
                owner_id: user._id,
                username: user.username
            },
            eventName: req.body.eventName,
            sportType: req.body.sportType,
            location: req.body.location,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            registrationOpenDate: req.body.registrationOpenDate,
            registrationCloseDate: req.body.registrationCloseDate,
            maxParticipants: req.body.maxParticipants,
            raceCategory: req.body.raceCategory,
            distance: req.body.distance,
            registrationFee: req.body.registrationFee,
            generalInfo: req.body.generalInfo,
            objectives: req.body.objectives,
            eventHighlights: req.body.eventHighlights,
            prize: req.body.prize,
            whatToReceive: req.body.whatToReceive,
            route: req.body.route,
            map: req.body.map,
            accommodation: req.body.accommodation,
            foodStalls: req.body.foodStalls
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
        console.log('Error:', error.message);
        res.status(400).json({ error: error.message });
    }
});




// เส้นทางสำหรับการดึงข้อมูลงานทั้งหมด
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// เส้นทางสำหรับการดึงข้อมูลงานทั้งหมดของผู้ใช้
router.get('/events/me', verifyToken, async (req, res) => {
    try {
        const events = await Event.find({ 'owner.owner_id': req.user._id });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
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
