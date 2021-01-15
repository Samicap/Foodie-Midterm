module.exports = (db) => {
  const createOrderReceipt = function (orderId) {
        return db.query(`SELECT *
                        FROM orders
                        JOIN dish_orders ON orders.id = order_id
                        JOIN dishes ON dishes.id = dish_id
                        WHERE order_id = $1
                        ;`, [orderId] )
      }
      // console.log('Order receipt:', createOrderReceipt);
      return { createOrderReceipt };
};


