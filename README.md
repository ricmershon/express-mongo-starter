# Portal for Children of Aging Parents
Online resource for children of aging parents.

## Designer and Engineer
Ric Mershon

## Background
After three years of experience managing the care of my elderly parents I've been unable to find a single resource for the caregivers of elderly that addresses all the issues for caregivers.

'Yelp' for caregivers.

See the [project markdown](https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/SEIR-Waverider/tree/master/projects/project_2) for more information.
## Accessing the Application

Got to https://rmersh-express-mongo-example.herokuapp.com/.

## Notable Features

1. Built with Node.js backend tools.
2. Uses a central server file, server.js, as an entry point for the applications. Defines all the dependencies, configuration, middleware, database opertaions and controllers needed for the app to run. Defines the root route and sets up the listener for the html port.
3. Uses public folder for css and images.
4. Uses partials for head, nav and footer elements.
5. Incorporates a mobile first and responsive design using Bootstrap.
6. Sticky menu bar.

## MongoDB Schemas
There are schemas for `caregivers`, `users` and `reviews`.

### Caregiver Schema
```
const careGiverSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        webSite: String,
        contact: {
            firstName: String,
            lastName: String,
        },
        description: { type: String, required: true },
        takingNewClients: { type: Boolean, default: false },
        services: Array,
        rating: { type: Number, max: 5 },
        reviews : [ Review.schema ]
    },
    { timestamps: true }
);
```
### Reviews Schema
```
const reviewSchema = new mongoose.Schema(
    {
        text: String,
        postedBy: String,
        rating: { type: Number, max: 5 }
    }
)
```
### Users Schema
```
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: String
})
```

## Routes
There are routes for `caregivers`, `reviews`, `sessions` and `users`.

### Caregivers Routes

| Action | URL | HTTP Verb | Description |
| ------ |---  | --------- | ----------- |
| Index | /caregivers | GET | Displays all caregivers |
| New | /caregivers/new | GET | Displays new caregiver form |
| Create | /caregivers | POST | Creates new caregiver |
| Show | /caregivers/:id | GET | Shows an individual caregiver's information |
| Edit | /caregivers/:id/edit | GET | Displays the edit caregiver form |
| Update | /caregivers/:id | PUT | Changes caregiver with info from Edit action |
| Destroy | /caregivers/:id | DELETE | Deletes a caregiver |

#### Additional Routes for Setup and Reset

| Action | URL | HTTP Verb | Description |
| ------ |---  | --------- | ----------- |
| Seed | /caregivers/seed | GET | Seeds database |
| Remove | /caregivers/remove | GET | Resets database |

### Reviews Routes

| Action | URL | HTTP Verb | Description |
| ------ |---  | --------- | ----------- |
| New | /caregivers/:id/reviews/new | GET | Display review form |
| Create | /caregivers/:id/reviews | POST | Creates new review |

### User Routes

| Action | URL | HTTP Verb | Description |
| ------ |---  | --------- | ----------- |
| New | /users/new | GET | Displays new user form |
| Create | /users | POST | Creates new user |

### Session Routes

| Action | URL | HTTP Verb | Description |
| ------ |---  | --------- | ----------- |
| New | /sessions/new | GET | Displays login form |
| Create | /sessions | POST | Creates new session after successful login |
| Destroy | /sessions | DELETE | Logs user out and deletes session |


## Layout Details and Approach
Layout done with Bootstrap.

### Partials
Several partials are used:

* `head.ejs` - for the head of all ejs/html files.
* `nav.ejs` - for the dynamic navigation bar. Changes based on session state.
* `footer.ejs` - for the footer, which still needs work.

## Technologies used:

* [Express](https://expressjs.com/) - backend framework for Node.js.
* [method-override](https://www.npmjs.com/package/method-override) - to use HTTP verbs PUT and DELETE where not otherwise supported by the client.
* [MongoDB](https://www.mongodb.com/) - a general purpose, document-based, distributed database.
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
* [express-session](https://www.npmjs.com/package/express-session) - middleware for creating sessions.
* [dotenv](https://www.npmjs.com/package/dotenv) - for loading environment variables from a .env file into process.env.
* [Bootstrap](https://getbootstrap.com/) - for a responsive, mobile-first layout.


## Known Issues
* Proper handling of failed logins.
* .env issues.
* Review routes in a separate file.

## Additional Functionality/Routes/User Types
* User
* Care manager
* Care provider
* Events
* Blog entries
* living communities
* Law issues
* Financial issues
* Moving services
* News related to seniors
* Doctors
* Newsletter
* Message board

## Areas for Improvement
* Clean up footer.
* General navigation.
* A lot of additional functionality.
* Would like to understand better how to incorporate code into objects.

## Acknowledgements
Thanks Brendan!
