# Portal for Children of Again Parents
Online resource for children of aging parents.

## Designer and Engineer
Ric Mershon

## Background
See the [project markdown](https://git.generalassemb.ly/Software-Engineering-Immersive-Remote/SEIR-Waverider/tree/master/projects/project_2) for more information.
## Accessing the Application

Got to https://rmersh-express-mongo-example.herokuapp.com/.

## Notable Features

1. Built with Node.js backend tools.
2. Uses a central server file, server.js, as an entry point for the applications. Defines all the dependencies, configuration, middleware, database opertaions and controllers needed for the app to run. Defines the root route and sets up the listener for the html port.
3. Uses public folder for css and images.
4. Uses partials for head, nav and footer elements.
5. Incorporates responsive design.
6. Sticky menu bar

## Routes
There are routes for `caregivers`, `reviews`, `sessions` and `users`.

### Caregivers Routes

| Action | URL | HTTP Verb |
| ------ |---  | --------- |
| Index | /caregivers | GET |
| New | /caregivers/new | GET |
| Create | /caregivers | POST |
| Show | /caregivers/:id | GET |
| Edit | /caregivers/:id/edit | GET |
| Update | /caregivers/:id | PUT |
| Destroy | /caregivers/:id | DELETE |

#### Additional Routes for Setup and Reset

| Action | URL | HTTP Verb |
| ------ |---  | --------- |
| Seed | /caregivers/seed | GET |
| Remove | /caregivers/remove | GET |

### Reviewers Routes

| Action | URL | HTTP Verb |
| ------ |---  | --------- |
| New | /caregivers/:id/reviews/new | GET |
| Create | /caregivers/:id/reviews | POST |

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

* [Express](https://expressjs.com/) backend framework for Node.js.
* [method-override](https://www.npmjs.com/package/method-override) to use HTTP verbs PUT and DELETE where not otherwise supported by the client.
* [MongoDB](https://www.mongodb.com/) - a general purpose, document-based, distributed database.
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
* [express-session](https://www.npmjs.com/package/express-session) - middleware for creating sessions.
* [dotenv](https://www.npmjs.com/package/dotenv) for loading environment variables from a .env file into process.env.
* [Bootstrap](https://getbootstrap.com/) - For a responsive, mobile-first layout.


## Known Issues
* Slight movement of the header text on the top right when data is displayed.
* Top of the submenu disappears when the window is scrolled all the way to the bottom.

## Areas for Improvement

### User Interface
* For context, I would like to see the country and category sections have their hover changes remain while stories are displayed.

### JavaScript
More work could be done to put code into objects.

## Acknowledgements
Thank you to King Arthur for advice, guidance, support and chocolate chip cookie recipes!!!

Karolin for the dotted notebook recommendation.
