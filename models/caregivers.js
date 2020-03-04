/*
 ===============================================================================
 =
 = Caregivers Schema
 =
 ===============================================================================
 */

const mongoose = require('mongoose');
const Review = require('./reviews.js')

const careGiverSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        webSite: String,
        contact: {
            firstName: String,
            lastName: String,
        },
        description: { type: String, required: true },
        takingNewClients: { type: Boolean, default: false },
        services: Array,
        rating: { type: Number, max: 5 },
        reviews : [ Review.schema ]
    },
    { timestamps: true }
);

const Caregiver = mongoose.model('Caregiver', careGiverSchema)
module.exports = Caregiver;
