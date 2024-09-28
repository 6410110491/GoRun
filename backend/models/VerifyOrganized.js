const mongoose = require('mongoose');

const VerifyOrganizedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    username: String,
    email: String,
    idCardImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    comment: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('VerifyOrganized', VerifyOrganizedSchema, 'verifyOrganized');
