const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    owner: [{
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String    
    }],
    eventName: { // ชื่องาน
        type: String, // ชนิดข้อมูลเป็นสตริง
        required: true // จำเป็นต้องมีค่า
    },
    sportType: { // ประเภทกีฬา
        type: String, // ชนิดข้อมูลเป็นสตริง
        required: true // จำเป็นต้องมีค่า
    },
    location: { // สถานที่จัดงาน
        type: String, // ชนิดข้อมูลเป็นสตริง
        required: true // จำเป็นต้องมีค่า
    },
    eventDate: { // วันที่แข่งขัน
        type: Date, // ชนิดข้อมูลเป็นวันที่
    },
    eventTime: { // เวลาการแข่งขัน
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    registrationOpenDate: { // วันที่เปิดรับสมัคร
        type: Date, // ชนิดข้อมูลเป็นวันที่
    },
    registrationCloseDate: { // วันที่ปิดรับสมัคร
        type: Date, // ชนิดข้อมูลเป็นวันที่
    },
    maxParticipants: { // จำนวนรับสมัคร
        type: Number, // ชนิดข้อมูลเป็นตัวเลข
    },
    raceCategory: { // รุ่นการแข่งขัน
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    distance: { // ระยะทาง
        type: Number, // ชนิดข้อมูลเป็นตัวเลข
    },
    registrationFee: { // ค่าสมัคร
        type: Number, // ชนิดข้อมูลเป็นตัวเลข
    },
    generalInfo: { // ข้อมูลทั่วไป
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    objectives: { // วัตถุประสงค์
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    eventHighlights: { // ความน่าสนใจของงาน
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    prize: { // รางวัล
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    whatToReceive: { // สิ่งที่จะได้รับ
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    route: { // เส้นทางการแข่งขัน
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    map: { // แผนที่ตำแหน่งการจัดงาน
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    accommodation: { // ที่พัก/โรงแรม
        type: String, // ชนิดข้อมูลเป็นสตริง
    },
    foodStalls: { // ร้านอาหาร
        type: String, // ชนิดข้อมูลเป็นสตริง
    }
}, {
    timestamps: true // เพิ่มข้อมูล timestamp อัตโนมัติ เช่น createdAt และ updatedAt
});

module.exports = mongoose.model('Event', EventSchema, 'events'); // ส่งออกโมเดล Event โดยใช้สคีมา EventSchema และกำหนดชื่อคอลเลคชั่นเป็น 'events'
