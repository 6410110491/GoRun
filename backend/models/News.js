const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    owner: {
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    title: { // หัวข้อข่าวสาร
        type: String, // ชนิดข้อมูลเป็นสตริง
        required: true // จำเป็นต้องมีค่า
    },
    description: { // ข้อมูลข่าวสาร
        type: String, // ชนิดข้อมูลเป็นสตริง
        required: true // จำเป็นต้องมีค่า
    },
    image: { // รูป
        type: String, // เก็บ URL ของรูปภาพหรือ path ของไฟล์
        required: false // ไม่จำเป็นต้องมีค่า
    }
}, {
    timestamps: true // เพิ่มข้อมูล timestamp อัตโนมัติ เช่น createdAt และ updatedAt
});

module.exports = mongoose.model('News', NewsSchema, 'news');
