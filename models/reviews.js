/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: reviews.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 = Description: Defines the Reviews schema.
 =
 ===============================================================================
 ===============================================================================
*/

const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
    {
        text: String,
        postedBy: String,
        rating: { type: Number, max: 5 }
    }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;
