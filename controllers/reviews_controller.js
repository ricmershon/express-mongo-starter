/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: reviews_controllers.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 ===============================================================================
 ===============================================================================
 */

/*
 ===============================================================================
 =
 = DEPENDENCIES, CONFIGURATION AND AUTHENTICATION
 =
 ===============================================================================
 */

const express = require('express')
const Review = require('../models/reviews.js')
const reviews = express.Router()

const isAuthenticated = (req, res, next) => {
    console.log(req.session);
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

/*
 ===============================================================================
 =
 = ROUTES
 =
 ===============================================================================
 */

/*
 ===============================================================================
 = New (GET) Route
 ===============================================================================
 */

reviews.get('/caregivers/:id/reviews/new', isAuthenticated, (req, res) => {
    console.log(`Inside Review New (GET) Route.`);
    res.render('reviews/new.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: `New Caregiver`
    })
})

/*
 ===============================================================================
 = Create (POST) Route
 ===============================================================================
 */

reviews.post('/:id', isAuthenticated, (req, res) => {
    console.log(`Inside Review Create (POST) Route.`);
    Caregiver.create(req.body, (error, createdCareGiver) => {
        if (error) {
            console.log(`There was an error creating new caregiver record: ${error}`);
        } else {
            res.redirect('/caregivers');
        }
    })
})

/*
 =======================================
 =
 = END ROUTES
 =
 =======================================
 */

/*
 ===============================================================================
 =
 = Make reviews router functions available to other server components.
 =
 ===============================================================================
 */

module.exports = reviews;
