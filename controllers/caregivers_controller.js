/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: caregivers_controllers.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 = Description: Contains routes for managing all the functionality of the
 = application not related to users, sessions and reviews.
 =
 = NOTE: review routes are in this module temporarily.
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
const Caregiver = require('../models/caregivers.js')
const careGiverSeed = require('../models/seed.js')
const careGivers = express.Router()

const isAuthenticated = (req, res, next) => {
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
 = Index (GET) Route - displays all caregivers.
 ===============================================================================
 */

careGivers.get('/', (req, res) => {
    console.log(`Inside Index (GET) Route.`);
    Caregiver.find({}, (error, allCareGivers) => {
        res.render('caregivers/index.ejs', {
            careGivers: allCareGivers,
            currentUser: req.session.currentUser,
            tabTitle: `Home`
        })
    })
})

/*
 ===============================================================================
 = Seed (GET) Route
 ===============================================================================
 */

careGivers.get('/seed', isAuthenticated, (req, res) => {
    console.log(`Inside Seed (GET) Route.`);
    Caregiver.create(careGiverSeed, (error, data) => {
        if (error) {
            console.log(`There was an error seeding the database: ${error}`);
        } else {
            console.log('Database successfully seeded.');
        }
    })
    res.redirect('/caregivers');
})

/*
 ===============================================================================
 = Remove (GET) Route
 ===============================================================================
 */

careGivers.get('/remove', isAuthenticated, (req, res) => {
    console.log(`Inside Remove (GET) Route.`);
    Caregiver.deleteMany({}, (error) => {
        console.log(`Caregiver collection removed.`);
    })
    res.redirect('/caregivers');
})

/*
 ===============================================================================
 = New (GET) Route - display new caregiver form
 ===============================================================================
 */

careGivers.get('/new', isAuthenticated, (req, res) => {
    console.log(`Inside New (GET) Route.`);
    res.render('caregivers/new.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: `New Caregiver`
    })
})

/********************************************************************************
 for reviews - couldn't get this to work in another contoller file.
 ******************************************************************************/

careGivers.get('/:id/reviews/new', isAuthenticated, (req, res) => {
    console.log(`Inside Review New (GET) Route.`);
    Caregiver.findById(req.params.id, (error, foundCareGiver) => {
        res.render('reviews/new.ejs', {
            careGiver: foundCareGiver,
            currentUser: req.session.currentUser,
            tabTitle: `New Review`
        })
    })
})

careGivers.post('/:id/reviews', isAuthenticated, (req, res) => {
    console.log(`Inside Review Create (POST) Route. Rating is: ${req.body.rating} `);
    Caregiver.findByIdAndUpdate(req.params.id, {
        $push: {
            reviews: {
                text: req.body.review,
                postedBy: req.body.postedBy,
                rating: req.body.rating
            }
        }
    },
    { new: true }, (error, updatedCareGiver) => {
        if (error) {
            console.log(`There is an error in the database through the update route: ${error}.`);
        } else {
            console.log('No error on database push');
            res.redirect('/caregivers')
        }
    })
})

/**********************************
 end for reviews
 **********************************/

/*
 ===============================================================================
 = Create (POST) Route - creates new caregiver
 ===============================================================================
 */

careGivers.post('/', isAuthenticated, (req, res) => {
    console.log(`Inside Create (POST) Route.`);
    if (req.body.takingNewClients === 'on') {
        req.body.takingNewClients = true
    } else {
        req.body.takingNewClients = false
    }
    Caregiver.create(req.body, (error, createdCareGiver) => {
        if (error) {
            console.log(`There was an error creating new caregiver record: ${error}`);
        } else {
            res.redirect('/caregivers');
        }
    })
})

/*
 ===============================================================================
 = Show (GET) Route - shows an individual caregiver's information
 ===============================================================================
 */

careGivers.get('/:id', isAuthenticated, (req, res) => {
    console.log(`Inside Show (GET) Route.`);
    Caregiver.findById(req.params.id, (error, foundCareGiver) => {
        res.render('caregivers/show.ejs', {
            careGiver: foundCareGiver,
            currentUser: req.session.currentUser,
            tabTitle: foundCareGiver.name
        })
    })
})


/*
 ===============================================================================
 = Edit (GET) Route - display the edit caregiver form
 ===============================================================================
 */

careGivers.get('/:id/edit', isAuthenticated, (req, res) => {
    console.log(`Inside Edit (GET) Route.`);
    Caregiver.findById(req.params.id, (error, foundCareGiver) => {
        if (error) {
            console.log(`There is an error in the database through the edit route: ${error}.`)
        } else {
            res.render('caregivers/edit.ejs', {
                careGiver: foundCareGiver,
                currentUser: req.session.currentUser,
                tabTitle: 'Update Caregiver Entry'
            })
        }
    })
})


/*
 ===============================================================================
 = Update (PUT) Route -
 ===============================================================================
 */

careGivers.put('/:id', isAuthenticated, (req, res) => {
    console.log(`Inside Update (PUT) Route.`);
    console.log(req.body);
    if (req.body.takingNewClients === 'on') {
        req.body.takingNewClients = true
    } else {
        req.body.takingNewClients = false
    }
    Caregiver.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedCareGiver) => {
        if (error) {
            console.log(`There is an error in the database through the update route: ${error}.`)
        } else {
            res.redirect('/caregivers/')
        }
    })
})

/*
 ===============================================================================
 = Destroy (DELETE) Route
 ===============================================================================
 */

careGivers.delete('/:id', isAuthenticated, (req, res) => {
    console.log(`Inside Detroy (DELETE) Route.`);
    Caregiver.findByIdAndRemove(req.params.id, (err, deletedCareGiver) => {
        if (err) {
            console.log('There was an error deleting the care giver.');
        } else {
            res.redirect('/caregivers')
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
 = Make careGivers router functions available to other server components.
 =
 ===============================================================================
 */

module.exports = careGivers;
