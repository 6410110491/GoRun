const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    registrations: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        profilePicture: {
            type: String,
        },
        username: {
            type: String
        },
        gender: {
            type: String
        },
        birthDate: {
            type: Date
        },
        idCardNumber: {
            type: String
        },
        email: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        nationality: {
            type: String
        },
        bloodType: {
            type: String,
        },
        chronicDiseases: {
            type: String,
        },

        address: {
            type: String
        },
        subDistrict: {
            type: String
        },
        district: {
            type: String
        },
        province: {
            type: String
        },
        zipCode: {
            type: String
        },

        sportType: {
            type: String
        },
        raceType: {
            type: String
        },
        registrationFee: {
            type: Number
        },
        shirt: {
            type: String,
        },
        shirtSize: {
            type: String
        },
        etc: {
            type: String,
        },

        nameShip: {
            type: String
        },
        lastNameShip: {
            type: String
        },
        phoneNumberShip: {
            type: String
        },
        addressShip: {
            type: String
        },
        subDistrictShip: {
            type: String
        },
        districtShip: {
            type: String
        },
        provinceShip: {
            type: String
        },
        zipCodeShip: {
            type: String
        },

        slipImage: {
            type: String
        },
        datePay: {
            type: Date
        },
        timePay: {
            type: String
        },

        status: {
            type: String,
            enum: ['pending', 'pending payment', 'approved', 'rejected'],
            default: 'pending payment'
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
        paymentSlipDate: {
            type: Date
        },
        completionDate: {
            type: Date
        },

        comment: {
            type: String
        },

        shippingChoice: {
            type: String,
        },
    }],

}, { timestamps: true });

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
