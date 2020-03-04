/*
 ===============================================================================
 =
 = Caregivers Schema
 =
 ===============================================================================
 */

const mongoose = require('mongoose');
const careGiverSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        contact: {
            firstName: String,
            lastName: String,
        },
        description: { type: String, required: true },
        takingNewClients: { type: Boolean, default: false },
        rating: { type: Number, max: 5 },
        reviews : [{
            text: String,
            postedBy: String,
            rating: { type: Number, max: 5 }
        }]
    },
    { timestamps: true }
);

const Caregiver = mongoose.model('Caregiver', careGiverSchema)
module.exports = Caregiver;
