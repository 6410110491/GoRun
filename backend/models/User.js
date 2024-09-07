const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: Array,
    },
    registerMethod: {
        type: String,
        enum: ['website', 'google'],
        required: true
    },
    personalInfo: {
        gender: {
            type: String,
        },
        birthDate: {
            type: Date
        },
        profilePicture: {
            type: String // URL or base64 string of the image
        },
        phoneNumber: {
            type: String,
        },
        idCardNumber: {
            type: String,
            unique: true, // Optional: Ensure ID card number uniqueness
            sparse: true
        },
        bloodType: {
            type: String,
        },
        nationality: {
            type: String,
        },
        chronicDiseases: {
            type: [String], // Array of strings to list multiple diseases
        }
    },
    address: {
        address: {
            type: String,
        },
        subDistrict: {
            type: String,
        },
        district: {
            type: String,
        },
        province: {
            type: String,
        },
        postalCode: {
            type: String,
        }
    },
    eventOwner: [{
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },
        eventName: String
    }],
    newsOwner: [{
        news_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'News'
        },
        newsTitle: String
    }],

}, {
    timestamps: true
});


module.exports = mongoose.model('User', UserSchema, 'users');