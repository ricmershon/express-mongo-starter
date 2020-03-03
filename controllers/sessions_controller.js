const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

module.exports = sessions;

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs',
        { currentUser: req.session.currentUser, tabTitle: `Login` }
    )
})

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

sessions.delete('/', (req, res) => {
    console.log('Inside sessions delete route.');
    req.session.destroy(() => {
        res.redirect('/sessions/new')
    })
})

module.exports = sessions
