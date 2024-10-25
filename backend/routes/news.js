const express = require('express');
const router = express.Router();
const User = require('../models/User');
const News = require('../models/News')
const verifyToken = require('../middleware/auth');

// เส้นทางสำหรับการสร้างงานใหม่
router.post('/news', async (req, res) => {
    try {
        const user = await User.findById(req.body.owner_id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const newNews = new News({
            owner: {
                owner_id: user._id,
                username: user.username
            },
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        });

        // บันทึกเหตุการณ์ใหม่ลงในฐานข้อมูล
        await newNews.save();

        // เพิ่มเหตุการณ์ในข้อมูลของผู้ใช้
        user.newsOwner.push({
            news_id: newNews._id,
            newsName: newNews.newsName
        });

        // บันทึกการอัปเดตของผู้ใช้
        await user.save();

        res.status(201).json({ message: 'Create news successfully', news: newNews });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// เส้นทางสำหรับการดึงข้อมูลงานทั้งหมด
router.get('/news', async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/news/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/news/:id', verifyToken, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'news not found' });
        }
        // Verify if the authenticated user is the owner of the news
        if (!news.owner.some(owner => owner.owner_id.equals(req.user._id))) {
            return res.status(403).json({ error: 'Unauthorized access to news' });
        }
        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/news/:id', verifyToken, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'news not found' });
        }
        // Verify if the authenticated user is the owner of the news
        if (!news.owner.some(owner => owner.owner_id.equals(req.user._id))) {
            return res.status(403).json({ error: 'Unauthorized access to news' });
        }
        await News.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;