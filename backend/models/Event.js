const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    owner: [{
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }],

    participant: {
        participant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EventParticipant'
        },
    },

    coverPicture: { // รูปภาพหน้าปก
        type: String,
    },
    bannerPicture: { // รูปภาพแบนเนอร์
        type: String,
    },
    status: {   //สถานะเปิดรับสมัครของงานกีฬา
        type: Boolean,
        default: true
    },


    organization: { // ชื่อองค์กร
        type: String,
    },
    eventName: { // ชื่องาน
        type: String,
        required: true // จำเป็นต้องมีค่า
    },
    sportType: { // ประเภทกีฬา
        type: String,
        required: true // จำเป็นต้องมีค่า
    },
    location: { // สถานที่จัดงาน
        type: String,
        required: true // จำเป็นต้องมีค่า
    },
    eventDate: { // วันที่แข่งขัน
        type: Date,
    },
    eventTime: { // เวลาการแข่งขัน
        type: String,
    },
    registrationOpenDate: { // วันที่เปิดรับสมัคร
        type: Date,
    },
    registrationCloseDate: { // วันที่ปิดรับสมัคร
        type: Date,
    },
    maxParticipants: { // จำนวนรับสมัคร
        type: Number,
    },
    competitionDetails:
        [
            {
                raceType: { // ระยะทาง
                    type: String,
                },
                registrationFee: { // ค่าสมัคร
                    type: Number,
                },
            }
        ]
    ,


    generalInfo: { // ข้อมูลทั่วไป
        type: String,
    },
    objectives: { // วัตถุประสงค์
        type: String,
    },
    eventHighlights: { // ความน่าสนใจของงาน
        type: String,
    },
    prize: { // รางวัล
        type: [String],
    },
    whatToReceive: { // สิ่งที่จะได้รับ
        type: [String],
    },
    route: { // เส้นทางการแข่งขัน
        type: [String],
    },
    map: {  //พิกัด
        lat: { type: Number },
        lng: { type: Number }
    },
    accommodation: { // ที่พัก/โรงแรม
        type: [String],
    },
    foodStalls: { // ร้านอาหาร
        type: [String],
    },


    product: {
        shirt: {
            type: [String],
        },
        shirtsize: {
            type: [String],
        },
        etc: {
            type: [String],
        }
    },
    etcInfo: { // ข้อมูลอื่นๆ
        type: String,
    },
    shippingFee: {
        type: Number,
    },


    paymentInfo: {
        bankName: { // ชื่อธนาคาร
            type: String,
        },
        accountNumber: { // เลขที่บัญชี
            type: String,
        },
        accountName: { // ชื่อบัญชี
            type: String,
        },
        promptPayImage: { // พร้อมเพย์
            type: String,
        },
    },

    onsiteStatus: {
        type: Boolean,
        default: false
    },
    shippingStatus: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema, 'events'); 
