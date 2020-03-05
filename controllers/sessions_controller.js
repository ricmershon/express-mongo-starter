/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: sessions_controllers.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 = Description: Contains routes for managing user sessions.
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
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

/*
 ===============================================================================
 = New (GET) Route - displays login form.
 ===============================================================================
 */

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs',
        { currentUser: req.session.currentUser, tabTitle: `Login` }
    )
})

/*
 ===============================================================================
 = Create (POST) Route - creates the new session with successful login.
 ===============================================================================
 */

sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err)
        } else if (!foundUser) {
            res.send('<a  href="/">Sorry, no user found </a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/')
            } else {
                res.send('<a href="/"> password does not match </a>')
            }
        }
    })
})

/*
 ===============================================================================
 = Destroy (DELETE) Route - logs out and deletes the session.
 ===============================================================================
 */

sessions.delete('/', (req, res) => {
    console.log('Inside sessions delete route.');
    req.session.destroy(() => {
        res.redirect('/sessions/new')
    })
})

module.exports = sessions
