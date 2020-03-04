/*
 ===============================================================================
 =
 = Reviews Schema
 =
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
