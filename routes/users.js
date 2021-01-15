/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const menuRoute = express.Router();
const dishDB = require("../db/helpers/dish_helper");
// const dishOrderDB = require("../db/helpers/dish_orders_helper");

module.exports = (db) => {
  const dishOrderDatabaseHelpers = dishDB(db);
  menuRoute.get("/", (req, res) => {
    dishOrderDatabaseHelpers.getAllDishes();
  });




  return menuRoute;
};
