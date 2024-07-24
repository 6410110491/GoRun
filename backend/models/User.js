const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '', // กำหนดให้มีค่าเริ่มต้นเป็น string ว่าง
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
