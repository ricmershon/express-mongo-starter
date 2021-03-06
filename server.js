/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: server.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 = Description: Entry point for the Caregivers Portal application. Defines all
 = the dependencies, configuration, middleware, database operations and
 = controllers needed for the app to run. Defines the root route and sets
 = up the listener for the html port.
 =
 ===============================================================================
 ===============================================================================
 */

/*
 ===============================================================================
 = DEPENDENCIES
 ===============================================================================
 */

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const session = require('express-session')

/*
 ===============================================================================
 = CONFIGURATION
 ===============================================================================
 */

require('dotenv').config();
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT || 3000; // Allows use of Heroku's or local port.
// const mongodbURI = 'mongodb://localhost:27017/caregivers';
const mongodbURI = process.env.MONGODBURI;

/*
 ===============================================================================
 = MIDDLEWARE
 ===============================================================================
 */

app.use(methodOverride('_method'));     // Allow POST, PUT and DELETE from a form.
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));      // Public folder for static assets.
app.use(express.json());                // Parses JSON.

app.use(
    session({
        secret: process.env.SECRET,     // Radom string to prevent hacking
        resave: false,                  // Default
        saveUninitialized: false
    })
)

/*
 ===============================================================================
 = DATABASE
 ===============================================================================
 */

mongoose.connect(
    mongodbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => {
        console.log('Connection with mongod established at', mongodbURI)
    }
)

//
// Callbacks for error or disconnected states on database.
//

db.on('error', (err) => console.log('Mongod is not running.', err));
db.on('connected', () => console.log('Mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('Mongod disconnected.'));
db.on('open' , () => {});

/*
 ===============================================================================
 = Controllers
 ===============================================================================
 */

app.use('/caregivers', require('./controllers/caregivers_controller.js'))
app.use('/sessions', require('./controllers/sessions_controller.js'))
app.use('/users', require('./controllers/users_controller.js'))
app.use('/reviews', require('./controllers/reviews_controller.js'))

/*
 ===============================================================================
 = Define root route
 ===============================================================================
 */

app.get('/', (req, res) => res.redirect('/caregivers'));

/*
 ===============================================================================
 = Listener
 ===============================================================================
*/

app.listen(PORT, () => console.log('Listening on port', PORT));
