/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const menuRoute  = express.Router();
const dishDB = require('../db/helpers/dish_helper');

module.exports = (db) => {
  menuRoute.get('/', (req, res) => {
    dishDatabaseHelpers.getAllDishes();
  });

  // menuRoute.post("/", (req, res) => {
  //   // access the user input to the cart.  is this an object?  or a Database access query?

  // })
  return menuRoute;

};


