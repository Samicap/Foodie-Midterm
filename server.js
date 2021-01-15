// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const dishDB     = require('./db/helpers/dish_helper')
const twilio     = require('twilio');
const { sendSMS } = require('./utils/twilio');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const dishDatabaseHelpers = dishDB(db);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// ============================================================Twilio stuff==============
// const accountSid = process.env.TWILIO_ID;
// const authToken = process.env.TWILIO_TOKEN;
// const client = new twilio(accountSid, authToken);

// const body = "Hello";
// const serverTelephoneNumber = '+12898094247';
// const userTelephoneNumber = '+16472824669';

// const sendSMS = function () {

//   client.messages.create({
//   body,
//   from: serverTelephoneNumber,
//   to: userTelephoneNumber
//   })
//   .then(message => console.log(message.sid))
//   .catch(error => console.log(error))
// }


//===========================================================================================


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  dishDatabaseHelpers.getAllDishes().then(data => {
    const dishes = data.rows;
    const templateVars = {"dishes": dishes};
    sendSMS('hi', '+12898094247', '+16472824669')
    res.render("startpage", templateVars);

  })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
