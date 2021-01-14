
const express = require("express");
const orderRoute = express.Router();
const dishDB = require("../db/helpers/dish_helper");
const orderDB = require("../db/helpers/order_helper");
const dishOrderDB = require("../db/helpers/dish_orders_helper");
// const twilioHelper = require("../db/helpers/twilio_helper");
const { createOrderId } = require("../db/helpers/order_helper");
const { createDishOrder } = require("../db/helpers/dish_orders_helper");
// const { twilio } = require("../routes/twilio");


module.exports = (db) => {
  const orderDatabaseHelpers = orderDB(db);
  const dishOrderDatabaseHelpers = dishOrderDB(db);
  // const twilioDatabaseHelpers = twilioHelper(db);
  orderRoute.post("/", (req, res) => {
    // req.body contains an object that the key item is dishes_id and the value is quantity.
    console.log('body', req.body)

    // Twilio integration will most likely be in here


    // First thing to do is to create an order
    // insert into table orders returning star
    // after insertion, you will get the order_id that you've just inserted
    // loop through the req.body obj and for every key/value pair insert into dish_orders with order_id from the previous query
    // create a new query in the helper to add the dish id to be associated with the order id.  add both these values into dish_orders
    // res.redirect to the /order/:id
    let keys = Object.keys(req.body).slice(0, Object.keys(req.body).length-1);
    console.log('keys:', keys);
    const phone_number = req.body.phoneNumber
    let newId;

    orderDatabaseHelpers.createOrderId(phone_number).then((orderId) => {
      console.log('Order ID:', orderId);
      newId = orderId.rows[0].id;
      for (let key of keys) {
        const quantity = req.body[key]
        console.log('quantity:', quantity, 'newId:', newId, 'key:', key)
        console.log('typeof quantity:', typeof quantity, 'typeof newId:', typeof newId, 'typeof key:', typeof key)
        dishOrderDatabaseHelpers.createDishOrder(parseInt(quantity), parseInt(newId), parseInt(key)).then((result) => {
          console.log('result is:', result);
          //call fucntion that returns the max time of the dish in an order
          // call twilio keys
          // twilioDatabaseHelpers.twilioHelper(phoneNumber, orderId, maxTime)
        });
      }

      res.redirect(`/orders/${newId}`)
    });

    // look into promise.all (there is a function that will run all the promises at the same time.)
  });

  orderRoute.get("/:id", (req, res) => {
    // select * from orders, join dish_orders, join dishes,
    // where order_id is = req.params.id
    // const orderId = req.params.id
    // const createOrderReciept = function (orderId) {
    //   return db.query(`SELECT *
    //                   FROM orders
    //                   JOIN dish_orders ON orders.id = order_id
    //                   JOIN dishes ON dishes.id = dish_id
    //                   WHERE order_id = $1
    //                   ;`, [orderId] )
    // }
    // return { createOrderReciept };
    res.render('order_show')
  })



  return orderRoute;
};


