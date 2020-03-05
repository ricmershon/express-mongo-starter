/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: users.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 = Description: Defines the Users schema.
 =
 ===============================================================================
 ===============================================================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: String
})

const User = mongoose.model('User', userSchema);
module.exports = User;
