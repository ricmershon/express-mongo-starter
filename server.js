/*
 ===============================================================================
 ===============================================================================
 =
 = Project 2: Caregivers Portal
 = Module: server.js
 = Created: 02-Mar-2020
 = Created by: Ric Mershon
 =
 ===============================================================================
 ===============================================================================
 */

/*
 ===============================================================================
 = DEPENDENCIES
 ===============================================================================
 */

require('newrelic')
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
// const mongodbURI = process.env.MONGODBURI || 'mongodb://localhost:27017/caregivers';
const mongodbURI =  'mongodb://localhost:27017/caregivers';

/*
 ===============================================================================
 = MIDDLEWARE
 ===============================================================================
 */

app.use(methodOverride('_method'));     // Allow POST, PUT and DELETE from a form.
app.use(express.urlencoded({ extended: false }));
                                        // Populates req.body with parsed info
                                        // from forms.
app.use(express.static('public'));      // Public folder for static assets.
app.use(express.json());                // Parses JSON.

// app.use(
//     session({
//         secret: process.env.SECRET,     // Radom string to prevent hacking
//         //
//         // More info for the following at
//         // https://www.npmjs.com/package/express-session#resave
//         //
//         resave: false,                  // Default
//         saveUninitialized: false        // Default
//     })
// )

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
        // useCreateIndex: true,
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
// app.use('/sessions', require('./controllers/sessions_controller.js'))
app.use('/users', require('./controllers/users_controller.js'))

/*
 ===============================================================================
 = Define root route
 ===============================================================================
 */

// app.get('/' , (req, res) => {
//     res.send('Hello World!');
// });

app.get('/', (req, res) => res.redirect('/caregivers'));

/*
 ===============================================================================
 = Listener
 ===============================================================================
*/

app.listen(PORT, () => console.log('Listening on port', PORT));
