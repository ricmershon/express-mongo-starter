/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: users_controllers.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 = Description: Contains routes for creating new users.
 =
 ===============================================================================
 ===============================================================================
 */

/*
 ===============================================================================
 = Dependencies and Configuration
 ===============================================================================
 */

const bcrypt = require('bcrypt')
const express = require ('express')
const users = express.Router()
const User = require('../models/users.js')

/*
 ===============================================================================
 = New (GET) Route - shows the new user form.
 ===============================================================================
 */

users.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: `New User`})
})


/*
 ===============================================================================
 = Create (POST) Route - create new user.
 ===============================================================================
 */

users.post('/', (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        if (err) {
            console.log(err);
        } else {
            console.log('User is created', createdUser);
            res.redirect('/')
        }
    })
})

module.exports = users;
